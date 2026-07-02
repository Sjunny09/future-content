import fs from "node:fs"
import path from "node:path"
import Image from "next/image"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { db } from "@/lib/scan/db"
import { ExitIntentModal } from "@/components/scan/ExitIntentModal"
import { KansenStagger } from "@/components/scan/KansenStagger"
import { AiDisclaimer } from "@/components/scan/AiDisclaimer"
import { BOOKING } from "@/lib/constants"
import type { SiteAnalyse } from "@/lib/scan/claude"

type Params = Promise<{ jobId: string }>

const FOTO_PAD = "/images/john-lightbulb.png"

// Fallback-safe: de asset komt nog. Zolang 'm ontbreekt tonen we een
// transparant/subtiel placeholder-vlak in plaats van een gebroken layout.
function fotoAanwezig(): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", "images", "john-lightbulb.png"))
  } catch {
    return false
  }
}

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
  const heeftFoto = fotoAanwezig()

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10 lg:h-screen lg:justify-center lg:overflow-hidden lg:py-8">
      <ExitIntentModal calUrl={calUrl} />

      {/* Compacte kop: naam + branche-regel, geen ruimteverspilling op desktop */}
      <div>
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

      {/* Rapport-framing: dit is geen los lijstje, dit IS het rapport */}
      {kansen.length > 0 && (
        <p
          className="mt-5 text-base leading-relaxed md:mt-6 md:text-lg"
          style={{ color: "var(--color-scan-drukinkt)" }}
        >
          Hier volgt je rapport: wat er voor jouw branche mogelijk is met AI.
        </p>
      )}

      {/* Twee kolommen op desktop: foto links, kansen + video-vraag rechts.
          Alles past binnen één viewport (richtlijn 1440x900). Op mobiel
          stapelt alles en mag er gescrold worden. */}
      <div className="mt-6 flex flex-1 flex-col gap-8 lg:mt-8 lg:min-h-0 lg:flex-row lg:items-stretch">
        {/* Links: foto van John. Asset volgt nog (/public/images/john-lightbulb.png).
            Zolang die ontbreekt tonen we een rustig linnen placeholder-vlak,
            zodat de layout nooit breekt. */}
        <div className="relative hidden overflow-hidden rounded-2xl lg:block lg:w-[38%] lg:shrink-0">
          {heeftFoto ? (
            /* Transparante PNG: alleen op een licht vlak gebruiken (papier);
               op donker vallen de uitsnede-randen op. object-contain +
               object-bottom zodat John en de lamp volledig in beeld staan. */
            <div className="h-full w-full" style={{ backgroundColor: "#F3ECE0" }}>
              <Image
                src={FOTO_PAD}
                alt="John Lavrijsen, Future Content"
                fill
                sizes="38vw"
                className="object-contain object-bottom"
              />
            </div>
          ) : (
            <div
              className="h-full w-full"
              style={{
                backgroundColor: "var(--color-scan-linnen)",
                border: "1px solid var(--color-scan-border)",
              }}
              aria-hidden
            />
          )}
        </div>

        {/* Rechts: de drie kansen (staggered) + de video-vraag, zichtbaar
            zonder scrollen op desktop. */}
        <div className="flex flex-1 flex-col lg:min-h-0 lg:overflow-y-auto">
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

          {/* Rustige bevestigingsregel: de gegevens zijn al binnen (vraag 6 in
              de vragenflow), dus dit is geen tweede CTA, alleen een belofte
              die al loopt. FUNNEL-SPEC stap 2/3: gegevens-stap hoort vóór de
              resultaten, niet ernaast als concurrerende actie. */}
          {job.lead?.email && (
            <p
              className="mt-6 text-sm leading-relaxed"
              style={{ color: "var(--color-scan-muted)" }}
            >
              Je persoonlijke video komt binnen 24 uur naar {job.lead.email}.
            </p>
          )}

          {/* Opt-in voor de uitgebreide scan (gratis, eindigt in een afspraak) */}
          {diepteVoltooid ? (
            <div
              className="mt-4 rounded-2xl border p-5"
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
              <Link
                href={`/scan/diepte/klaar/${jobId}`}
                className="mt-4 inline-flex items-center gap-2 rounded-md px-5 py-3 text-base font-medium text-white"
                style={{ backgroundColor: "var(--color-scan-terracotta)" }}
              >
                Plan een afspraak
              </Link>
            </div>
          ) : (
            <div className="mt-4">
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-scan-muted)" }}
              >
                Wil je eerst meer diepgang, doe de uitgebreide scan. Al
                overtuigd? Plan direct een half uur.
              </p>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                {/* Primair: uitgebreide scan (terracotta, bestaande route/stijl) */}
                <div
                  className="rounded-2xl border p-5"
                  style={{
                    borderColor: "var(--color-scan-border)",
                    backgroundColor: "var(--color-scan-linnen)",
                  }}
                >
                  <p className="text-base font-semibold" style={{ color: "var(--color-scan-drukinkt)" }}>
                    Wil je weten wat dit voor jouw bedrijf concreet oplevert?
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

                {/* Secundair: direct plannen via Cal.com (outline, minder nadruk) */}
                <div
                  className="rounded-2xl border p-5"
                  style={{
                    borderColor: "var(--color-scan-border)",
                    backgroundColor: "transparent",
                  }}
                >
                  <p className="text-base font-semibold" style={{ color: "var(--color-scan-drukinkt)" }}>
                    Liever gelijk een gesprek?
                  </p>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-scan-muted)" }}>
                    Plan direct {BOOKING.duration} met me in, zonder eerst de
                    uitgebreide scan te doen.
                  </p>
                  <a
                    href={`https://${BOOKING.calHost}/${BOOKING.calUser}/${BOOKING.calEvent}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-md border px-5 py-3 text-base font-medium"
                    style={{
                      borderColor: "var(--color-scan-terracotta)",
                      color: "var(--color-scan-terracotta)",
                    }}
                  >
                    Plan direct een afspraak
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 lg:mt-4">
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
