import { notFound, redirect } from "next/navigation"
import { db } from "@/lib/scan/db"
import { BOOKING } from "@/lib/constants"
import { AiDisclaimer } from "@/components/scan/AiDisclaimer"
import { PriceIndicator } from "@/components/PriceIndicator"

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
        Je hebt de uitgebreide scan ingevuld. Ik werk je antwoorden uit tot een
        persoonlijk rapport: dat ligt binnen een dag in je mail. Plan hieronder
        alvast een half uur met me, dan nemen we het samen door.
      </p>

      <div
        className="mt-8 rounded-2xl border p-6"
        style={{
          borderColor: "var(--color-scan-border)",
          backgroundColor: "rgba(0,0,0,0.02)",
        }}
      >
        <p
          className="text-base font-medium"
          style={{ color: "var(--color-scan-drukinkt)" }}
        >
          Zo haal je het meeste uit ons gesprek
        </p>
        <p
          className="mt-2 text-sm leading-relaxed"
          style={{ color: "var(--color-scan-drukinkt)" }}
        >
          Je hoeft niks voor te bereiden of uit te zoeken. Denk vooraf alleen even
          kort over deze drie dingen na, dan komen we samen sneller tot de kern:
        </p>
        <ul
          className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed"
          style={{ color: "var(--color-scan-drukinkt)" }}
        >
          <li>Waar lekt in jullie week de meeste tijd weg?</li>
          <li>Wat zou je het liefst makkelijker of vanzelf willen hebben?</li>
          <li>Wie beslist er bij jullie over zoiets mee?</li>
        </ul>
      </div>

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

      {/* Eerlijk over de stap na het gesprek: het proof of concept. */}
      <div
        className="mt-8 rounded-2xl border p-6"
        style={{ borderColor: "var(--color-scan-border)" }}
      >
        <p
          className="text-base font-medium"
          style={{ color: "var(--color-scan-drukinkt)" }}
        >
          Goed om te weten: het gesprek is gratis
        </p>
        <p
          className="mt-2 text-sm leading-relaxed"
          style={{ color: "var(--color-scan-muted)" }}
        >
          Willen we daarna samen verder, dan is de volgende stap meestal een
          proof of concept: <PriceIndicator item="proofOfConcept" prefix="" />.
          Ik draai een halve dag mee op locatie, interview je mensen en
          verzamel data uit je bedrijf. Daarna ga ik thuis aan de slag en
          binnen een week ligt er een proof of concept met wat het jouw
          bedrijf oplevert in tijd of geld.
        </p>
      </div>

      <div className="mt-12 flex flex-col items-center gap-3">
        <p
          className="text-center text-xs"
          style={{ color: "var(--color-scan-muted)" }}
        >
          Future Content · Bladel · KvK 86880675
        </p>
        <AiDisclaimer className="max-w-xl text-center" />
      </div>
    </main>
  )
}
