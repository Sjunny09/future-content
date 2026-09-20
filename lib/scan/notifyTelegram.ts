/**
 * Telegram-ping naar John zodra er een nieuwe scan-lead binnen is. Snelle
 * heads-up op de telefoon, naast de mail (stuurMails) en de OS-bridge
 * (notifyOs). Doel: erop springen terwijl de lead nog warm is.
 *
 * Twee soorten:
 *   - "quickscan": iemand rondde de gratis quickscan af.
 *   - "diepte":    iemand rondde de uitgebreide scan af (heter; bevat het
 *                  bouw/training/zelf-advies als de diagnose al klaar is).
 *
 * Fail-soft: als env ontbreekt of de call faalt, loggen en doorgaan. De scan-
 * ervaring van de bezoeker mag hier NOOIT van afhangen.
 *
 * Env (zet in Vercel; hergebruikt de bestaande bot @Futurecntnt_bot):
 *   TELEGRAM_BOT_TOKEN
 *   TELEGRAM_CHAT_ID
 */

import { db } from "@/lib/scan/db"
import { telegramPing } from "@/lib/scan/telegramPing"
import type { SiteAnalyse } from "@/lib/scan/claude"
import type { Diagnose } from "@/lib/scan/diepte"

type Soort = "quickscan" | "diepte"

export async function notifyTelegram(jobId: string, soort: Soort): Promise<void> {
  const job = await db.scanJob.findUnique({
    where: { id: jobId },
    include: { lead: true },
  })
  if (!job || !job.lead) return

  const analyse = (job.analyseJson ?? null) as SiteAnalyse | null
  const diagnose =
    soort === "diepte" ? ((job.diagnoseJson ?? null) as Diagnose | null) : null

  const kop =
    soort === "diepte"
      ? "🔥 Uitgebreide scan afgerond"
      : "✨ Nieuwe quickscan"

  const regels = [
    kop,
    "",
    `Naam: ${job.lead.naam ?? "onbekend"}`,
    `E-mail: ${job.lead.email}`,
    job.lead.telefoon ? `Tel: ${job.lead.telefoon}` : null,
    `Site: ${job.url}`,
    analyse?.branche ? `Branche: ${analyse.branche}` : null,
    diagnose ? `Advies: ${diagnose.advies.toUpperCase()} — ${diagnose.kop}` : null,
  ]
    .filter(Boolean)
    .join("\n")

  await telegramPing(regels, { jobId })
}
