import { db } from "@/lib/scan/db"
import { haalSiteDataOp } from "@/lib/scan/scraper"
import { analyseerSite, genereerObservaties } from "@/lib/scan/claude"
import { kiesEersteVraag } from "@/lib/scan/vragen/selecteer"
import { reportError } from "@/lib/scan/observability/logger"

// Minimum-duur uit 03_ceo_synthese.md §4.3: "Wachttijd 35-45s — als Claude
// sneller klaar is, houd de slides vast." Geeft de observatie-slides tijd
// om te landen en voelt menselijker dan een flits-resultaat.
const MIN_WACHT_MS = 30_000

// Initiële slides terwijl Jina nog bezig is. Overschreven zodra Haiku klaar is
// met site-specifieke observaties.
const START_OBSERVATIES = [
  "Ik open je website…",
  "Ik lees rustig mee…",
]

export async function analyseStarten(jobId: string): Promise<void> {
  const startTijd = Date.now()

  const job = await db.scanJob.findUnique({ where: { id: jobId } })
  if (!job) return

  try {
    await db.scanJob.update({
      where: { id: jobId },
      data: {
        status: "scraping",
        observatiesJson: START_OBSERVATIES,
      },
    })

    const siteData = await haalSiteDataOp(job.url)

    await db.scanJob.update({
      where: { id: jobId },
      data: {
        status: "analysing",
        scrapeBron: siteData.bron,
        siteDataJson: siteData as unknown as object,
        scrapedAt: new Date(),
      },
    })

    // Haiku + Sonnet parallel. Haiku is snel (2-4s) en schrijft observaties
    // zodra hij klaar is; Sonnet loopt daarna nog 15-25s door.
    const observatiesP = genereerObservaties(siteData).then(async (obs) => {
      await db.scanJob.update({
        where: { id: jobId },
        data: { observatiesJson: obs },
      })
    })

    const analyseP = analyseerSite(siteData).then(async (analyse) => {
      await db.scanJob.update({
        where: { id: jobId },
        data: {
          analyseJson: analyse as unknown as object,
          analysedAt: new Date(),
        },
      })
      // Adaptief: alleen de gepersonaliseerde openingsvraag (B1) staat vooraf
      // klaar. De rest kiest de AI per antwoord (zie /antwoord-route).
      const vragen = await kiesEersteVraag(analyse)
      await db.scanJob.update({
        where: { id: jobId },
        data: { vragenJson: vragen as unknown as object },
      })
    })

    await Promise.all([observatiesP, analyseP])

    const verstreken = Date.now() - startTijd
    if (verstreken < MIN_WACHT_MS) {
      await wacht(MIN_WACHT_MS - verstreken)
    }

    await db.scanJob.update({
      where: { id: jobId },
      data: {
        status: "ready",
        readyAt: new Date(),
      },
    })
  } catch (fout) {
    const bericht = fout instanceof Error ? fout.message : "onbekend"
    reportError(fout, { waar: "analyseStarten", jobId, url: job.url })
    await db.scanJob.update({
      where: { id: jobId },
      data: {
        status: "failed",
        scrapeFaaldeOp: bericht,
      },
    })
  }
}

function wacht(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
