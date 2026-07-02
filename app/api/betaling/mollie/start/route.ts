import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { PaymentMethod } from "@mollie/api-client"
import { db } from "@/lib/scan/db"
import {
  centenAlsEuroString,
  mollieClient,
  PILOT_BEDRAG_CENT,
  PILOT_OMSCHRIJVING,
  siteUrl,
} from "@/lib/scan/betaling/mollie"

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

  const mollie = mollieClient()
  const basis = siteUrl()
  if (!mollie || !basis) {
    return NextResponse.json(
      {
        fout: "Betalen is nog niet ingesteld. Laat John even weten dat je wil boeken.",
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

  const molliePayment = await mollie.payments.create({
    amount: {
      currency: "EUR",
      value: centenAlsEuroString(PILOT_BEDRAG_CENT),
    },
    description: `${PILOT_OMSCHRIJVING} - ${job.lead.naam ?? job.lead.email}`,
    redirectUrl: `${basis}/scan/pilot/${job.id}/gelukt`,
    webhookUrl: `${basis}/api/betaling/mollie/webhook`,
    metadata: {
      jobId: job.id,
      leadId: job.lead.id,
    },
    // iDEAL standaard voorgeselecteerd (zie 03_ceo_synthese.md §1.10).
    method: PaymentMethod.ideal,
  })

  await db.payment.create({
    data: {
      provider: "mollie",
      providerId: molliePayment.id,
      bedragCent: PILOT_BEDRAG_CENT,
      status: "pending",
      omschrijving: PILOT_OMSCHRIJVING,
      leadId: job.lead.id,
    },
  })

  const checkoutUrl = molliePayment.getCheckoutUrl()
  if (!checkoutUrl) {
    return NextResponse.json(
      { fout: "Mollie gaf geen checkout-URL terug." },
      { status: 502 },
    )
  }

  return NextResponse.json({ checkoutUrl }, { status: 200 })
}
