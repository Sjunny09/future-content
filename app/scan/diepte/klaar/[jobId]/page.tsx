import { notFound, redirect } from "next/navigation"
import { db } from "@/lib/scan/db"
import { BOOKING } from "@/lib/constants"

type Params = Promise<{ jobId: string }>

export default async function DiepteKlaarPagina({ params }: { params: Params }) {
  const { jobId } = await params

  const job = await db.scanJob.findUnique({
    where: { id: jobId },
    select: {
      id: true,
      diepteStatus: true,
      lead: { select: { naam: true } },
    },
  })

  if (!job) notFound()
  if (job.diepteStatus !== "voltooid") {
    redirect(`/scan/diepte/${jobId}`)
  }

  const voornaam = job.lead?.naam?.split(" ")[0] ?? null
  const calConfigured = Boolean(BOOKING.calUser)
  const calSrc = `https://${BOOKING.calHost}/${BOOKING.calUser}/${BOOKING.calEvent}?embed=true&theme=light`

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-16">
      <h1
        className="text-4xl leading-tight md:text-5xl"
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontWeight: 500,
          color: "var(--color-scan-drukinkt)",
        }}
      >
        Top{voornaam ? `, ${voornaam}` : ""}, je bent erdoorheen.
      </h1>

      <p
        className="mt-6 text-lg leading-relaxed md:text-xl"
        style={{ color: "var(--color-scan-drukinkt)" }}
      >
        Je hebt de uitgebreide scan ingevuld. Plan hieronder direct een half uur
        met me, dan bespreken we live wat ik zag en wat voor jullie de slimste
        eerste stap is.
      </p>

      {calConfigured ? (
        <div
          className="mt-8 overflow-hidden rounded-2xl border bg-white"
          style={{ borderColor: "var(--color-scan-border)" }}
        >
          <iframe
            src={calSrc}
            title="Plan een afspraak"
            className="h-[560px] w-full sm:h-[600px] md:h-[640px]"
            style={{ border: "none" }}
          />
        </div>
      ) : (
        <p className="mt-8 text-sm" style={{ color: "var(--color-scan-muted)" }}>
          De agenda wordt hier geladen zodra Cal.com gekoppeld is. Ik neem zelf
          contact met je op om een moment te prikken.
        </p>
      )}

      <p
        className="mt-12 text-center text-xs"
        style={{ color: "var(--color-scan-muted)" }}
      >
        Future Content · Bladel · KvK 93482641
      </p>
    </main>
  )
}
