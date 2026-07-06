import { db } from "@/lib/scan/db"

export type MailLogInvoer = {
  leadId?: string | null
  scanJobId?: string | null
  ontvanger: string
  richting: "naar_lead" | "naar_john"
  soort: "resultaten" | "john_notificatie" | "herinnering" | "video"
  onderwerp: string
  status: "verstuurd" | "mislukt" | "overgeslagen"
  detail?: string
}

// Legt vast welke mails de funnel verstuurt (of bewust overslaat), zodat John
// in /os per lead ziet wat er gebeurd is. Fail-soft: een mislukte log mag de
// mail-flow zelf nooit breken.
export async function logMail(invoer: MailLogInvoer): Promise<void> {
  try {
    await db.mailLog.create({
      data: {
        leadId: invoer.leadId ?? null,
        scanJobId: invoer.scanJobId ?? null,
        ontvanger: invoer.ontvanger,
        richting: invoer.richting,
        soort: invoer.soort,
        onderwerp: invoer.onderwerp,
        status: invoer.status,
        detail: invoer.detail ?? null,
      },
    })
  } catch (err) {
    console.error("[maillog] loggen faalde", err)
  }
}
