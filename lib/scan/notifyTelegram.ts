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
import type { SiteAnalyse } from "@/lib/scan/claude"
import type { Diagnose } from "@/lib/scan/diepte"

type Soort = "quickscan" | "diepte"

export async function notifyTelegram(jobId: string, soort: Soort): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) {
    console.info("[telegram] TELEGRAM_BOT_TOKEN of _CHAT_ID ontbreekt; overgeslagen", { jobId })
    return
  }

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

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: regels,
        disable_web_page_preview: true,
      }),
    })
    if (!res.ok) {
      const tekst = await res.text().catch(() => "")
      console.error("[telegram] niet-ok", { jobId, status: res.status, tekst })
    }
  } catch (err) {
    console.error("[telegram] call faalde", { jobId, err })
  }
}
