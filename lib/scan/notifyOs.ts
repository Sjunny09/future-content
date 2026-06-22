/**
 * Leads-bridge: stuurt een afgeronde scan naar Future Content OS (Flask).
 *
 * Contract met Flask:
 *   POST {SCAN_TO_OS_URL}   (bv. https://os.future-content.nl/leads/van-scan)
 *   Headers: X-FC-Secret: {SCAN_TO_OS_WEBHOOK_SECRET}
 *   Body: { bedrijf, contactpersoon, email, telefoon, interesse, opmerkingen }
 *
 * Bron van waarheid = Google Sheet (via Flask). Neon blijft de operationele
 * scan-store (jobs, vragen, mail-history), maar leads vloeien door naar Sheet.
 *
 * Fail-soft: als env ontbreekt of call faalt, loggen en doorgaan. De scan-
 * ervaring van de bezoeker mag hier NOOIT van afhangen.
 */

import { db } from "@/lib/scan/db"
import type { SiteAnalyse } from "@/lib/scan/claude"

type SiteData = {
  title?: string
  description?: string
}

function domeinUit(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

function bedrijfsnaamUit(siteData: SiteData | null, url: string): string {
  const titel = siteData?.title?.trim()
  if (titel && titel.length <= 80) return titel
  return domeinUit(url)
}

function interesseUit(
  analyse: SiteAnalyse | null,
  antwoorden: Array<{ vraagId: string; waarde: unknown }>,
): string {
  // Voorkeur: expliciet antwoord op "Wat wil je ermee doen?" (vraagId "WENS").
  // Zie B1-branding voor definitieve ID; fallback blijft AI-observatie.
  const wens = antwoorden.find((a) => a.vraagId === "WENS")
  if (wens) {
    if (typeof wens.waarde === "string") return wens.waarde
    if (Array.isArray(wens.waarde)) return wens.waarde.join(", ")
  }
  if (analyse?.kansen?.[0]?.titel) return analyse.kansen[0].titel
  return ""
}

export async function notifyOs(jobId: string): Promise<void> {
  const url = process.env.SCAN_TO_OS_URL
  const secret = process.env.SCAN_TO_OS_WEBHOOK_SECRET
  if (!url || !secret) {
    console.info("[notifyOs] SCAN_TO_OS_URL of _WEBHOOK_SECRET ontbreekt; overgeslagen", { jobId })
    return
  }

  const job = await db.scanJob.findUnique({
    where: { id: jobId },
    include: {
      lead: true,
      antwoorden: { select: { vraagId: true, waarde: true } },
    },
  })
  if (!job || !job.lead) return

  const siteData = (job.siteDataJson ?? null) as SiteData | null
  const analyse = (job.analyseJson ?? null) as SiteAnalyse | null

  const payload = {
    bedrijf: bedrijfsnaamUit(siteData, job.url),
    contactpersoon: job.lead.naam ?? "",
    email: job.lead.email,
    telefoon: job.lead.telefoon ?? "",
    interesse: interesseUit(analyse, job.antwoorden),
    opmerkingen: `Scan ${job.id} · ${job.url}`,
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-FC-Secret": secret,
      },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const tekst = await res.text().catch(() => "")
      console.error("[notifyOs] OS-response niet-ok", { jobId, status: res.status, tekst })
      return
    }
    const data = (await res.json().catch(() => ({}))) as { lcode?: string; bestond?: boolean }
    console.info("[notifyOs] lead doorgegeven", { jobId, lcode: data.lcode, bestond: data.bestond })
  } catch (err) {
    console.error("[notifyOs] call faalde", { jobId, err })
  }
}
