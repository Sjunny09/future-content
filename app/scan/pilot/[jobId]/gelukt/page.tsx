import { notFound } from "next/navigation"
import Link from "next/link"
import { PaymentStatus as MolliePaymentStatus } from "@mollie/api-client"
import { db } from "@/lib/scan/db"
import { mollieClient } from "@/lib/scan/betaling/mollie"
import { stripeClient } from "@/lib/scan/betaling/stripe"
import { PilotGeboektTracker } from "@/components/scan/PilotGeboektTracker"
import { reportError } from "@/lib/scan/observability/logger"

type Params = Promise<{ jobId: string }>

export const dynamic = "force-dynamic"

type Status = "paid" | "pending" | "failed"

export default async function GeluktPagina({ params }: { params: Params }) {
  const { jobId } = await params

  const job = await db.scanJob.findUnique({
    where: { id: jobId },
    select: {
      id: true,
      lead: { select: { id: true, naam: true, email: true } },
    },
  })
  if (!job || !job.lead) notFound()

  // Meest recente betaling van deze lead, ongeacht provider. Webhook heeft
  // de status waarschijnlijk al geüpdate; deze live-check is een safety-net
  // voor als iemand op de success-URL terechtkomt vóórdat de webhook door is.
  const dbBetaling = await db.payment.findFirst({
    where: { leadId: job.lead.id },
    orderBy: { createdAt: "desc" },
  })

  let status: Status = dbBetaling?.status === "paid" ? "paid" : "pending"

  if (dbBetaling) {
    const liveStatus =
      dbBetaling.provider === "mollie"
        ? await checkMollie(dbBetaling.providerId)
        : await checkStripe(dbBetaling.providerId)

    if (liveStatus) {
      status = liveStatus
      if (dbBetaling.status !== liveStatus) {
        try {
          await db.payment.update({
            where: { id: dbBetaling.id },
            data:
              liveStatus === "paid"
                ? { status: "paid", paidAt: new Date() }
                : liveStatus === "failed"
                  ? { status: "failed" }
                  : {},
          })
        } catch (err) {
          reportError(err, { waar: "gelukt/sync", paymentId: dbBetaling.id })
        }
      }
    }
  }

  const voornaam = job.lead.naam?.split(" ")[0] ?? null

  if (status === "paid") {
    return (
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
        <PilotGeboektTracker />
        <h1
          className="text-4xl leading-tight md:text-5xl"
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontWeight: 500,
            color: "var(--color-scan-drukinkt)",
          }}
        >
          Geboekt{voornaam ? `, ${voornaam}` : ""}.
        </h1>
        <p
          className="mt-6 text-lg leading-relaxed"
          style={{ color: "var(--color-scan-drukinkt)" }}
        >
          Betaling is binnen. Ik plan een kickoff-gesprek in en mail je voor
          het eind van de dag met een Cal-link om een tijdstip te kiezen.
        </p>
        <p
          className="mt-3 text-sm"
          style={{ color: "var(--color-scan-muted)" }}
        >
          Je krijgt altijd eerst de video die ik beloofd had, die komt
          ongewijzigd.
        </p>
      </main>
    )
  }

  if (status === "failed") {
    return (
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
        <h1
          className="text-3xl leading-tight md:text-4xl"
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontWeight: 500,
            color: "var(--color-scan-drukinkt)",
          }}
        >
          Betaling niet gelukt.
        </h1>
        <p
          className="mt-6 text-base leading-relaxed"
          style={{ color: "var(--color-scan-drukinkt)" }}
        >
          Geen zorg, er is niks afgeschreven. Probeer het opnieuw, of mail me
          direct.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href={`/scan/pilot/${jobId}`}
            className="rounded-md px-6 py-3 text-base font-medium text-white"
            style={{ backgroundColor: "var(--color-scan-terracotta)" }}
          >
            Opnieuw proberen
          </Link>
          <a
            href="mailto:john@future-content.nl"
            className="rounded-md border px-6 py-3 text-base"
            style={{
              borderColor: "var(--color-scan-border)",
              color: "var(--color-scan-drukinkt)",
            }}
          >
            Mail John
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
      <h1
        className="text-3xl leading-tight md:text-4xl"
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontWeight: 500,
          color: "var(--color-scan-drukinkt)",
        }}
      >
        Een moment, ik wacht op bevestiging van de bank.
      </h1>
      <p
        className="mt-6 text-base leading-relaxed"
        style={{ color: "var(--color-scan-drukinkt)" }}
      >
        Bij iDEAL kan het een paar seconden duren. Ververs deze pagina over
        een tel of twee.
      </p>
    </main>
  )
}

async function checkMollie(providerId: string): Promise<Status | null> {
  const mollie = mollieClient()
  if (!mollie) return null
  try {
    const mp = await mollie.payments.get(providerId)
    if (mp.status === MolliePaymentStatus.paid) return "paid"
    if (
      mp.status === MolliePaymentStatus.failed ||
      mp.status === MolliePaymentStatus.canceled ||
      mp.status === MolliePaymentStatus.expired
    ) {
      return "failed"
    }
    return "pending"
  } catch {
    return null
  }
}

async function checkStripe(providerId: string): Promise<Status | null> {
  const stripe = stripeClient()
  if (!stripe) return null
  try {
    const sessie = await stripe.checkout.sessions.retrieve(providerId)
    if (sessie.payment_status === "paid") return "paid"
    if (sessie.status === "expired") return "failed"
    return "pending"
  } catch {
    return null
  }
}
