import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { db } from "@/lib/scan/db"
import { stripeClient } from "@/lib/scan/betaling/stripe"
import { reportError } from "@/lib/scan/observability/logger"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Stripe webhook: body MOET raw blijven voor signature-verificatie. Daarom
// `await req.text()` — niet `req.json()`. Zonder geldige signature → 400.
//
// We handelen drie events:
//   - checkout.session.completed  → als payment_status="paid" ⇒ mark paid
//   - checkout.session.async_payment_failed  → mark failed
//   - checkout.session.expired    → mark failed
// Alle andere events negeren we met 200 (Stripe stopt anders met retryen
// pas na 3 dagen — we willen ze wel snel laten rusten).

export async function POST(req: NextRequest) {
  const stripe = stripeClient()
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!stripe || !secret) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const signature = req.headers.get("stripe-signature")
  if (!signature) {
    return NextResponse.json({ fout: "geen signature" }, { status: 400 })
  }

  const rauw = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rauw, signature, secret)
  } catch (err) {
    reportError(err, { waar: "stripe/webhook/verify" })
    return NextResponse.json({ fout: "signature-mismatch" }, { status: 400 })
  }

  const relevant =
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_failed" ||
    event.type === "checkout.session.expired"
  if (!relevant) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const sessie = event.data.object as Stripe.Checkout.Session
  const sessieId = sessie.id
  if (!sessieId) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const dbPayment = await db.payment.findUnique({
    where: {
      provider_providerId: {
        provider: "stripe",
        providerId: sessieId,
      },
    },
    select: { id: true, status: true },
  })
  if (!dbPayment) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  try {
    if (
      event.type === "checkout.session.completed" &&
      sessie.payment_status === "paid"
    ) {
      await db.payment.update({
        where: { id: dbPayment.id },
        data: { status: "paid", paidAt: new Date() },
      })
    } else if (
      event.type === "checkout.session.async_payment_failed" ||
      event.type === "checkout.session.expired"
    ) {
      await db.payment.update({
        where: { id: dbPayment.id },
        data: { status: "failed" },
      })
    }
  } catch (err) {
    reportError(err, {
      waar: "stripe/webhook/update",
      sessieId,
      eventType: event.type,
    })
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
