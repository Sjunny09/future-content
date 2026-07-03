import fs from "node:fs"
import path from "node:path"
import Image from "next/image"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { db } from "@/lib/scan/db"
import { ExitIntentModal } from "@/components/scan/ExitIntentModal"
import { KansenStagger } from "@/components/scan/KansenStagger"
import { AiDisclaimer } from "@/components/scan/AiDisclaimer"
import { DirectContact } from "@/components/scan/DirectContact"
import { OpmerkingVeld } from "@/components/scan/OpmerkingVeld"
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
          links de persoon (John), midden de oplossingen + het opmerkingenveld,
          rechts de knoppen. Op mobiel stapelt alles en mag er gescrold worden. */}
      <div className="mt-6 flex flex-1 flex-col gap-8 lg:mt-8 lg:grid lg:min-h-0 lg:grid-cols-[24%_1fr_30%] lg:items-stretch lg:gap-8">
        {/* LINKS: persoon. Asset volgt nog (/public/images/john-lightbulb.png);
            zolang die ontbreekt een rustig linnen vlak zodat de layout niet breekt. */}
        <div className="relative hidden overflow-hidden rounded-2xl lg:block">
          {heeftFoto ? (
            <div className="h-full w-full" style={{ backgroundColor: "#F3ECE0" }}>
              <Image
                src={FOTO_PAD}
                alt="John Lavrijsen, Future Content"
                fill
                sizes="24vw"
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

        {/* MIDDEN: de drie kansen (het rapport) + het opmerkingenveld. */}
        <div className="flex flex-col gap-6 lg:min-h-0 lg:overflow-y-auto">
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

          {/* Vrij opmerkingenveld, slaat op naar de database (John ziet het in de OS) */}
          <OpmerkingVeld jobId={jobId} />
        </div>

        {/* RECHTS: de knoppen. Uitgebreide scan als primaire route, daaronder
            de drie directe-contact-opties. */}
        <div className="flex flex-col gap-4 lg:min-h-0 lg:overflow-y-auto">
          {diepteVoltooid ? (
            <>
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
              <DirectContact />
            </>
          ) : (
            <>
              {/* Primair: uitgebreide scan (terracotta) */}
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
                  Doe de uitgebreide scan, 10 tot 15 minuten, en eindig direct in een
                  afspraak. Gratis en vrijblijvend.
                </p>
                <Link
                  href={`/scan/diepte/${jobId}`}
                  className="mt-4 inline-flex items-center gap-2 rounded-md px-5 py-3 text-base font-medium text-white"
                  style={{ backgroundColor: "var(--color-scan-terracotta)" }}
                >
                  Start de uitgebreide scan
                </Link>
              </div>

              {/* Secundair: liever gelijk contact, drie manieren */}
              <DirectContact />
            </>
          )}
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
