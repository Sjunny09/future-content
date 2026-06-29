import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { db } from "@/lib/scan/db"
import { ExitIntentModal } from "@/components/scan/ExitIntentModal"
import type { SiteAnalyse } from "@/lib/scan/claude"

type Params = Promise<{ jobId: string }>

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
      lead: { select: { naam: true } },
    },
  })

  if (!job) notFound()

  if (job.status !== "completed") {
    redirect(`/scan/bezig/${jobId}`)
  }

  const voornaam = job.lead?.naam?.split(" ")[0] ?? null
  const calUrl = process.env.NEXT_PUBLIC_CAL_KENNISMAKING_URL ?? null
  const analyse = (job.analyseJson ?? null) as SiteAnalyse | null
  const domein = domeinUit(job.url)
  const kansen = Array.isArray(analyse?.kansen) ? analyse.kansen.slice(0, 3) : []
  const diepteVoltooid = job.diepteStatus === "voltooid"

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-20">
      <ExitIntentModal calUrl={calUrl} />
      <h1
        className="text-4xl leading-tight md:text-5xl"
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontWeight: 500,
          color: "var(--color-scan-drukinkt)",
        }}
      >
        Dankjewel{voornaam ? `, ${voornaam}` : ""}.
      </h1>

      {/* Het rapport: de beloning voor het achterlaten van de gegevens */}
      {analyse && (
        <section className="mt-10">
          <p
            className="text-xs uppercase tracking-[0.2em]"
            style={{ color: "var(--color-scan-muted)" }}
          >
            Dit zag ik{domein ? ` bij ${domein}` : ""}
          </p>

          {analyse.branche && (
            <p
              className="mt-3 text-lg leading-relaxed"
              style={{ color: "var(--color-scan-drukinkt)" }}
            >
              {analyse.branche}
            </p>
          )}
          {analyse.niche && (
            <p
              className="mt-2 text-base leading-relaxed"
              style={{ color: "var(--color-scan-muted)" }}
            >
              {analyse.niche}
            </p>
          )}

          {kansen.length > 0 && (
            <div className="mt-8">
              <p
                className="text-base font-semibold"
                style={{ color: "var(--color-scan-drukinkt)" }}
              >
                Drie plekken waar AI je hier kan helpen
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {kansen.map((k, i) => (
                  <div
                    key={k.titel}
                    className="rounded-xl border px-4 py-4"
                    style={{
                      borderColor: "var(--color-scan-border)",
                      backgroundColor: "var(--color-scan-linnen)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="text-sm font-bold"
                        style={{ color: "var(--color-scan-terracotta)" }}
                      >
                        0{i + 1}
                      </span>
                      <div>
                        <p
                          className="text-base font-semibold"
                          style={{ color: "var(--color-scan-drukinkt)" }}
                        >
                          {k.titel}
                        </p>
                        {k.beschrijving && (
                          <p
                            className="mt-1 text-sm leading-relaxed"
                            style={{ color: "var(--color-scan-muted)" }}
                          >
                            {k.beschrijving}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Opt-in voor de uitgebreide scan (gratis, eindigt in een afspraak) */}
      {diepteVoltooid ? (
        <div
          className="mt-10 rounded-2xl border p-6"
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
        <div
          className="mt-10 rounded-2xl border p-6"
          style={{
            borderColor: "var(--color-scan-border)",
            backgroundColor: "var(--color-scan-linnen)",
          }}
        >
          <p className="text-base font-semibold" style={{ color: "var(--color-scan-drukinkt)" }}>
            Wil je dat ik dieper kijk?
          </p>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-scan-muted)" }}>
            De uitgebreide scan duurt 10 tot 15 minuten en gaat veel dieper op je
            bedrijf in. Daarna weet je of er iets te bouwen valt of dat een training
            genoeg is, en plan je direct een half uur met me in om het live te
            bespreken. Gratis en vrijblijvend.
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

      <p
        className="mt-12 text-lg leading-relaxed md:text-xl"
        style={{ color: "var(--color-scan-drukinkt)" }}
      >
        Binnen 24 uur stuur ik je een korte video waarin ik dit met je doorneem,
        en wat ik zou doen als ik bij jullie aan tafel zat. Gewoon mijn eerlijke
        eerste indruk.
      </p>

      <p className="mt-4 text-sm" style={{ color: "var(--color-scan-muted)" }}>
        Als ik er langer over doe, hoor je dat ook. Nooit stilte.
      </p>

      <p
        className="mt-12 text-center text-xs"
        style={{ color: "var(--color-scan-muted)" }}
      >
        Future Content · Bladel · KvK 93482641
      </p>
    </main>
  )
}
