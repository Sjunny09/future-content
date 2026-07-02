import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/scan/db"
import { stripeClient } from "@/lib/scan/betaling/stripe"
import {
  PILOT_BEDRAG_CENT,
  PILOT_OMSCHRIJVING,
  siteUrl,
} from "@/lib/scan/betaling/mollie"
import { reportError } from "@/lib/scan/observability/logger"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const Payload = z.object({ jobId: z.string().min(1).max(50) }).strict()

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ fout: "Ongeldig verzoek." }, { status: 400 })
  }

  const parsed = Payload.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ fout: "Ongeldig verzoek." }, { status: 400 })
  }

  const stripe = stripeClient()
  const basis = siteUrl()
  if (!stripe || !basis) {
    return NextResponse.json(
      {
        fout: "Kaart-betaling is nog niet ingesteld. Probeer iDEAL of mail John rechtstreeks.",
      },
      { status: 503 },
    )
  }

  const job = await db.scanJob.findUnique({
    where: { id: parsed.data.jobId },
    select: {
      id: true,
      status: true,
      lead: { select: { id: true, email: true, naam: true } },
    },
  })
  if (!job || !job.lead) {
    return NextResponse.json({ fout: "Niet gevonden." }, { status: 404 })
  }
  if (job.status !== "completed") {
    return NextResponse.json(
      { fout: "Scan is nog niet afgerond." },
      { status: 409 },
    )
  }

  try {
    const sessie = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: job.lead.email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: PILOT_BEDRAG_CENT,
            product_data: {
              name: PILOT_OMSCHRIJVING,
              description: `${PILOT_OMSCHRIJVING} - ${job.lead.naam ?? job.lead.email}`,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${basis}/scan/pilot/${job.id}/gelukt?stripe=1`,
      cancel_url: `${basis}/scan/pilot/${job.id}`,
      metadata: {
        jobId: job.id,
        leadId: job.lead.id,
      },
    })

    if (!sessie.id || !sessie.url) {
      return NextResponse.json(
        { fout: "Stripe gaf geen checkout-URL terug." },
        { status: 502 },
      )
    }

    await db.payment.create({
      data: {
        provider: "stripe",
        providerId: sessie.id,
        bedragCent: PILOT_BEDRAG_CENT,
        status: "pending",
        omschrijving: PILOT_OMSCHRIJVING,
        leadId: job.lead.id,
      },
    })

    return NextResponse.json({ checkoutUrl: sessie.url }, { status: 200 })
  } catch (err) {
    reportError(err, {
      waar: "stripe/start",
      jobId: job.id,
      leadId: job.lead.id,
    })
    return NextResponse.json(
      { fout: "Betaling kon niet gestart worden. Probeer iDEAL." },
      { status: 502 },
    )
  }
}
