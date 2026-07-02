/**
 * Leads-bridge: stuurt een afgeronde scan naar Future Content OS (Next.js).
 *
 * Contract met de OS-route (`os/app/api/leads/van-scan/route.ts`):
 *   POST {OS_BASE_URL}/api/leads/van-scan
 *   Headers: Authorization: Bearer {OS_WEBHOOK_SECRET}
 *   Body (additief, oude/kleine payload blijft ook werken):
 *     { scanLeadId, bedrijf, contactpersoon, email, telefoon, interesse,
 *       opmerkingen, type, url, branche, niche, tone, antwoorden, kansen }
 *
 * Env-vars nodig:
 *   OS_BASE_URL        — bv. https://os.future-content.nl (geen trailing slash)
 *   OS_WEBHOOK_SECRET   — zelfde secret als de OS-route (`OS_WEBHOOK_SECRET`)
 *
 * Fail-soft: als env ontbreekt of de call faalt, loggen en doorgaan. De scan-
 * ervaring van de bezoeker mag hier NOOIT van afhangen.
 */

import { db } from "@/lib/scan/db"
import type { SiteAnalyse } from "@/lib/scan/claude"

type SiteData = {
  title?: string
  description?: string
}

type ScanType = "quickscan" | "diepte"

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

function antwoordenAlsObject(
  antwoorden: Array<{ vraagId: string; vraagTitel?: string; waarde: unknown }>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const a of antwoorden) {
    out[a.vraagId] = a.vraagTitel ? { titel: a.vraagTitel, waarde: a.waarde } : a.waarde
  }
  return out
}

export async function notifyOs(jobId: string, type: ScanType = "quickscan"): Promise<void> {
  const base = process.env.OS_BASE_URL
  const secret = process.env.OS_WEBHOOK_SECRET
  if (!base || !secret) {
    console.info("[notifyOs] OS_BASE_URL of OS_WEBHOOK_SECRET ontbreekt; overgeslagen", { jobId })
    return
  }

  const job = await db.scanJob.findUnique({
    where: { id: jobId },
    include: {
      lead: true,
      antwoorden: { select: { vraagId: true, vraagTitel: true, waarde: true } },
    },
  })
  if (!job || !job.lead) return

  const siteData = (job.siteDataJson ?? null) as SiteData | null
  const analyse = (job.analyseJson ?? null) as SiteAnalyse | null

  const payload = {
    scanLeadId: job.id,
    bedrijf: bedrijfsnaamUit(siteData, job.url),
    contactpersoon: job.lead.naam ?? "",
    email: job.lead.email,
    telefoon: job.lead.telefoon ?? "",
    interesse: interesseUit(analyse, job.antwoorden),
    opmerkingen: `Scan ${job.id} · ${job.url}`,
    // Uitgebreid contract voor de leads-module (additief, zie OS-route).
    type,
    url: job.url,
    branche: analyse?.branche ?? null,
    niche: analyse?.niche ?? null,
    tone: analyse?.tone ?? null,
    antwoorden: antwoordenAlsObject(job.antwoorden),
    kansen: analyse?.kansen ?? [],
  }

  try {
    const res = await fetch(`${base}/api/leads/van-scan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const tekst = await res.text().catch(() => "")
      console.error("[notifyOs] OS-response niet-ok", { jobId, status: res.status, tekst })
      return
    }
    const data = (await res.json().catch(() => ({}))) as { ref?: string; status?: string }
    console.info("[notifyOs] lead doorgegeven", { jobId, ref: data.ref, status: data.status })
  } catch (err) {
    console.error("[notifyOs] call faalde", { jobId, err })
  }
}
