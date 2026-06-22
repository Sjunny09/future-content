import { NextRequest, NextResponse } from "next/server"
import { PaymentStatus } from "@mollie/api-client"
import { db } from "@/lib/scan/db"
import { mollieClient } from "@/lib/scan/betaling/mollie"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Mollie webhook: POST met `id=tr_xxx` als form-data. Wij halen de actuele
// status bij Mollie op (never trust body payload) en synchroniseren de DB.
// Zie https://docs.mollie.com/overview/webhooks.
export async function POST(req: NextRequest) {
  const form = await req.formData().catch(() => null)
  const molliePaymentId = form?.get("id")
  if (typeof molliePaymentId !== "string" || !molliePaymentId.startsWith("tr_")) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const mollie = mollieClient()
  if (!mollie) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const payment = await mollie.payments.get(molliePaymentId)

  const dbPayment = await db.payment.findUnique({
    where: {
      provider_providerId: {
        provider: "mollie",
        providerId: molliePaymentId,
      },
    },
    select: { id: true, status: true },
  })
  if (!dbPayment) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  if (payment.status === PaymentStatus.paid) {
    await db.payment.update({
      where: { id: dbPayment.id },
      data: { status: "paid", paidAt: new Date() },
    })
  } else if (
    payment.status === PaymentStatus.failed ||
    payment.status === PaymentStatus.canceled ||
    payment.status === PaymentStatus.expired
  ) {
    await db.payment.update({
      where: { id: dbPayment.id },
      data: { status: "failed" },
    })
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
