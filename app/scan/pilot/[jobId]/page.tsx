import { notFound, redirect } from "next/navigation"
import { db } from "@/lib/scan/db"
import { PilotStartKnop } from "@/components/scan/PilotStartKnop"
import { mollieClient, siteUrl } from "@/lib/scan/betaling/mollie"
import { stripeClient } from "@/lib/scan/betaling/stripe"

type Params = Promise<{ jobId: string }>

export default async function PilotPagina({ params }: { params: Params }) {
  const { jobId } = await params

  const job = await db.scanJob.findUnique({
    where: { id: jobId },
    select: {
      id: true,
      status: true,
      lead: { select: { naam: true } },
    },
  })
  if (!job) notFound()
  if (job.status !== "completed") {
    redirect(`/scan/bezig/${jobId}`)
  }

  const voornaam = job.lead?.naam?.split(" ")[0] ?? null
  const betalenActief = !!mollieClient() && !!siteUrl()
  const stripeActief = !!stripeClient() && !!siteUrl()

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
        Een pilotweek{voornaam ? `, ${voornaam}` : ""}.
      </h1>

      <p
        className="mt-6 text-lg leading-relaxed"
        style={{ color: "var(--color-scan-drukinkt)" }}
      >
        Voor €495 doe ik een volle week werk rond één concreet proces in jouw
        bedrijf. Maandag kies ik met je uit wat het wordt, donderdag staat er
        iets werkends, vrijdag lopen we het samen door. Geen adviesrapport,
        maar iets dat al draait.
      </p>

      <ul
        className="mt-8 space-y-3 text-base"
        style={{ color: "var(--color-scan-drukinkt)" }}
      >
        <li>• Één proces, end-to-end opgelost</li>
        <li>• Korte dagelijkse check-in (10 min per dag)</li>
        <li>• Volle eigendom: alles wat we bouwen is van jou</li>
        <li>• Refund als je vrijdag niet tevreden bent</li>
      </ul>

      <div className="mt-12">
        {betalenActief ? (
          <PilotStartKnop jobId={job.id} stripeActief={stripeActief} />
        ) : (
          <div
            className="rounded-md border p-4 text-sm"
            style={{
              borderColor: "var(--color-scan-border)",
              color: "var(--color-scan-muted)",
            }}
          >
            iDEAL-checkout wordt deze week opengezet. Mail John rechtstreeks op{" "}
            <a
              href="mailto:john@future-content.nl"
              className="underline underline-offset-4"
              style={{ color: "var(--color-scan-terracotta)" }}
            >
              john@future-content.nl
            </a>{" "}
            als je nu al wilt boeken.
          </div>
        )}
      </div>

      <p
        className="mt-6 text-xs"
        style={{ color: "var(--color-scan-muted)" }}
      >
        Totaal €495 inclusief btw. Je betaalt veilig via Mollie (iDEAL).
      </p>
    </main>
  )
}
