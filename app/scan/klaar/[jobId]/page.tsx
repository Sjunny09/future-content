import Image from "next/image"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { db } from "@/lib/scan/db"
import { ExitIntentModal } from "@/components/scan/ExitIntentModal"
import { KansenStagger } from "@/components/scan/KansenStagger"
import { AiDisclaimer } from "@/components/scan/AiDisclaimer"
import { DirectContact } from "@/components/scan/DirectContact"
import { OpmerkingVeld } from "@/components/scan/OpmerkingVeld"
import { PriceIndicator } from "@/components/PriceIndicator"
import { BOOKING } from "@/lib/constants"
import { mockActief } from "@/lib/scan/mock"
import type { SiteAnalyse } from "@/lib/scan/claude"

type Params = Promise<{ jobId: string }>

const FOTO_PAD = "/images/john-lightbulb.png"

function domeinUit(url: string): string | null {
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`)
    return u.hostname.replace(/^www\./, "")
  } catch {
    return null
  }
}

export default async function KlaarPagina({ params }: { params: Params }) {
  const { jobId } = await params

  const job = await db.scanJob.findUnique({
    where: { id: jobId },
    select: {
      id: true,
      status: true,
      url: true,
      analyseJson: true,
      diepteStatus: true,
      lead: { select: { naam: true, email: true } },
    },
  })

  if (!job) notFound()

  if (job.status !== "completed") {
    redirect(`/scan/bezig/${jobId}`)
  }

  const voornaam = job.lead?.naam?.split(" ")[0] ?? null
  const calUrl = `https://${BOOKING.calHost}/${BOOKING.calUser}/${BOOKING.calEvent}?embed=true&theme=light`
  const analyse = (job.analyseJson ?? null) as SiteAnalyse | null
  const domein = domeinUit(job.url)
  const kansen = Array.isArray(analyse?.kansen) ? analyse.kansen.slice(0, 3) : []
  const diepteVoltooid = job.diepteStatus === "voltooid"

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10 lg:h-screen lg:justify-center lg:overflow-hidden lg:py-8">
      <ExitIntentModal calUrl={calUrl} />

      {mockActief() && (
        <div
          className="mb-4 shrink-0 rounded-md border px-3 py-2 text-xs font-medium"
          style={{ borderColor: "var(--color-scan-error)", color: "var(--color-scan-error)" }}
        >
          Testmodus actief (SCAN_MOCK=1): dit is nepdata van een verzonnen
          installatiebedrijf, niet de echte analyse van deze site.
        </div>
      )}

      {/* Compacte kop: naam + branche-regel, geen ruimteverspilling op desktop */}
      <div className="shrink-0">
        <h1
          className="text-3xl leading-tight md:text-4xl"
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontWeight: 500,
            color: "var(--color-scan-drukinkt)",
          }}
        >
          Dankjewel{voornaam ? `, ${voornaam}` : ""}.
        </h1>
        {analyse?.branche && (
          <p
            className="mt-2 text-sm leading-relaxed md:text-base"
            style={{ color: "var(--color-scan-muted)" }}
          >
            Dit zag mijn AI-scan{domein ? ` bij ${domein}` : ""}: {analyse.branche}
          </p>
        )}
      </div>

      {/* Drie kolommen op desktop, alles binnen één viewport:
          links John op het contact-blok, midden het rapport, rechts de vervolgstap
          + het opmerkingenveld. Op mobiel stapelt alles in leesvolgorde. */}
      <div className="mt-6 flex flex-1 flex-col gap-8 lg:mt-8 lg:grid lg:min-h-0 lg:grid-cols-[28%_1fr_30%] lg:items-stretch lg:gap-8">
        {/* LINKS: liever direct contact, met John die op de bovenrand van het
            blok leunt. De foto staat op mobiel uit; daar telt de tekst. */}
        <div className="order-3 flex flex-col lg:order-none lg:min-h-0">
          <div className="relative hidden h-40 shrink-0 lg:block xl:h-52">
            <Image
              src={FOTO_PAD}
              alt="John Lavrijsen, Future Content"
              fill
              sizes="28vw"
              className="object-contain object-bottom"
            />
          </div>
          <div className="lg:-mt-px lg:min-h-0 lg:overflow-y-auto">
            <DirectContact />
          </div>
        </div>

        {/* MIDDEN: de drie kansen (het rapport). */}
        <div className="order-1 flex flex-col gap-6 lg:order-none lg:min-h-0 lg:overflow-y-auto">
          {kansen.length > 0 && (
            <section>
              <p
                className="text-xs uppercase tracking-[0.2em]"
                style={{ color: "var(--color-scan-muted)" }}
              >
                Drie plekken waar AI je hier kan helpen
              </p>
              <div className="mt-4">
                <KansenStagger kansen={kansen} />
              </div>
            </section>
          )}

          {job.lead?.email && (
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-scan-muted)" }}
            >
              Je persoonlijke video komt binnen 24 uur naar {job.lead.email}.
            </p>
          )}
        </div>

        {/* RECHTS: de vervolgstap (uitgebreide scan) + eerlijk prijsblok +
            het opmerkingenveld. Het gesprek plannen zit links bij DirectContact
            ("Plan een half uur met mij"), dus hier geen tweede afspraak-CTA. */}
        <div className="order-2 flex flex-col gap-4 lg:order-none lg:min-h-0 lg:overflow-y-auto">
          {diepteVoltooid ? (
            <div
              className="rounded-2xl border p-5"
              style={{
                borderColor: "var(--color-scan-border)",
                backgroundColor: "var(--color-scan-linnen)",
              }}
            >
              <p className="text-base font-semibold" style={{ color: "var(--color-scan-drukinkt)" }}>
                Je deed de uitgebreide scan, top.
              </p>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-scan-muted)" }}>
                Plan gerust een half uur met me om het live te bespreken.
              </p>
            </div>
          ) : (
            <div
              className="rounded-2xl border p-5"
              style={{
                borderColor: "var(--color-scan-border)",
                backgroundColor: "var(--color-scan-linnen)",
              }}
            >
              <p className="text-base font-semibold" style={{ color: "var(--color-scan-drukinkt)" }}>
                Wat levert dit voor jouw bedrijf concreet op?
              </p>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-scan-muted)" }}>
                Doe de uitgebreide scan, 10 tot 15 minuten, en eindig direct in
                een afspraak. Gratis en vrijblijvend.
              </p>
              <Link
                href={`/scan/diepte/${jobId}`}
                className="mt-4 inline-flex items-center gap-2 rounded-md px-5 py-3 text-base font-medium text-white"
                style={{ backgroundColor: "var(--color-scan-terracotta)" }}
              >
                Start de uitgebreide scan
              </Link>
            </div>
          )}

          {/* Eerlijk over de trede na het gesprek: het proof of concept. */}
          <div
            className="rounded-2xl border p-5"
            style={{ borderColor: "var(--color-scan-border)" }}
          >
            <p className="text-sm font-semibold" style={{ color: "var(--color-scan-drukinkt)" }}>
              En daarna?
            </p>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-scan-muted)" }}>
              De stap na het gesprek is een proof of concept:{" "}
              <PriceIndicator item="proofOfConcept" prefix="" />. Ik draai een
              halve dag mee op locatie, interview je mensen en verzamel data
              uit je bedrijf. Daarna ga ik thuis aan de slag en binnen een week
              ligt er een proof of concept met wat het jouw bedrijf oplevert in
              tijd of geld.
            </p>
          </div>

          {/* Vrij opmerkingenveld, slaat op naar de database (John ziet het in de OS) */}
          <OpmerkingVeld jobId={jobId} />
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 lg:mt-4 lg:shrink-0">
        <p
          className="text-center text-xs"
          style={{ color: "var(--color-scan-muted)" }}
        >
          Future Content · Bladel · KvK 86880675
        </p>
        <AiDisclaimer className="max-w-2xl text-center" />
      </div>
    </main>
  )
}
