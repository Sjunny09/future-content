import { Resend } from "resend"
import { db } from "@/lib/scan/db"
import { BOOKING } from "@/lib/constants"
import type { SiteAnalyse } from "@/lib/scan/claude"
import { mailsNaarLeadsAan } from "@/lib/scan/settings"
import { logMail } from "@/lib/scan/mail/mailLog"

// Mail-adressen in één punt — makkelijker te veranderen later.
const VAN = "Future Content <scan@future-content.nl>"
const JOHN = process.env.SCAN_NOTIFY_EMAIL ?? "john@future-content.nl"

let clientSingleton: Resend | null = null
function client(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  if (!clientSingleton) clientSingleton = new Resend(key)
  return clientSingleton
}

type AntwoordRij = {
  vraagTitel: string
  waarde: unknown
}

export async function stuurMails(jobId: string): Promise<void> {
  const resend = client()
  if (!resend) {
    console.info("[mail] RESEND_API_KEY ontbreekt — mails overgeslagen", {
      jobId,
    })
    return
  }

  const job = await db.scanJob.findUnique({
    where: { id: jobId },
    include: {
      lead: true,
      antwoorden: {
        orderBy: { createdAt: "asc" },
        select: { vraagTitel: true, waarde: true },
      },
    },
  })
  if (!job || !job.lead) return

  const analyse = (job.analyseJson ?? null) as SiteAnalyse | null
  const antwoorden = job.antwoorden
  const leadId = job.lead.id
  const mailsAan = await mailsNaarLeadsAan()

  // 1. Notificatie naar John — altijd, ook bij een testscan (John wil de
  //    heads-up en ziet zo dat de pijplijn werkt).
  const johnOnderwerp = `Nieuwe scan: ${job.lead.naam ?? "onbekend"} · ${job.url}`
  try {
    await resend.emails.send({
      from: VAN,
      to: JOHN,
      subject: johnOnderwerp,
      text: bouwJohnMail({
        naam: job.lead.naam,
        email: job.lead.email,
        telefoon: job.lead.telefoon,
        url: job.url,
        jobId: job.id,
        analyse,
        antwoorden,
      }),
    })
    await logMail({ leadId, scanJobId: job.id, ontvanger: JOHN, richting: "naar_john", soort: "john_notificatie", onderwerp: johnOnderwerp, status: "verstuurd" })
  } catch (err) {
    console.error("[mail] mail-naar-john faalde", { jobId, err })
    await logMail({ leadId, scanJobId: job.id, ontvanger: JOHN, richting: "naar_john", soort: "john_notificatie", onderwerp: johnOnderwerp, status: "mislukt", detail: err instanceof Error ? err.message : String(err) })
  }

  // 2. Resultaten-mail naar de lead — overslaan bij een testlead of als de
  //    mail-schakelaar in /os uit staat.
  const leadOnderwerp = "Je resultaten staan klaar"
  if (job.isTest) {
    await logMail({ leadId, scanJobId: job.id, ontvanger: job.lead.email, richting: "naar_lead", soort: "resultaten", onderwerp: leadOnderwerp, status: "overgeslagen", detail: "testlead" })
  } else if (!mailsAan) {
    await logMail({ leadId, scanJobId: job.id, ontvanger: job.lead.email, richting: "naar_lead", soort: "resultaten", onderwerp: leadOnderwerp, status: "overgeslagen", detail: "mail-schakelaar staat uit" })
  } else {
    try {
      await resend.emails.send({
        from: VAN,
        to: job.lead.email,
        subject: leadOnderwerp,
        text: bouwKlantMail({ naam: job.lead.naam, jobId: job.id }),
      })
      await logMail({ leadId, scanJobId: job.id, ontvanger: job.lead.email, richting: "naar_lead", soort: "resultaten", onderwerp: leadOnderwerp, status: "verstuurd" })
    } catch (err) {
      console.error("[mail] mail-naar-klant faalde", { jobId, err })
      await logMail({ leadId, scanJobId: job.id, ontvanger: job.lead.email, richting: "naar_lead", soort: "resultaten", onderwerp: leadOnderwerp, status: "mislukt", detail: err instanceof Error ? err.message : String(err) })
    }
  }
}

// ─────────────────────────────────────────
// Templates
// ─────────────────────────────────────────

function bouwJohnMail(ctx: {
  naam: string | null
  email: string
  telefoon: string | null
  url: string
  jobId: string
  analyse: SiteAnalyse | null
  antwoorden: AntwoordRij[]
}): string {
  const regels: string[] = []
  regels.push(`Nieuwe scan binnen.`)
  regels.push(``)
  regels.push(`Naam: ${ctx.naam ?? "onbekend"}`)
  regels.push(`Email: ${ctx.email}`)
  regels.push(`Telefoon: ${ctx.telefoon ?? "-"}`)
  regels.push(`Site: ${ctx.url}`)
  regels.push(`Job: ${ctx.jobId}`)
  regels.push(``)

  if (ctx.analyse) {
    regels.push(`── ANALYSE ──`)
    regels.push(`Branche: ${ctx.analyse.branche}`)
    regels.push(`Niche: ${ctx.analyse.niche}`)
    regels.push(``)
    regels.push(`Tone:`)
    regels.push(ctx.analyse.tone)
    regels.push(``)
    regels.push(`Drie kansen:`)
    for (const k of ctx.analyse.kansen) {
      regels.push(`• ${k.titel}`)
      regels.push(`  ${k.beschrijving}`)
    }
    regels.push(``)
  }

  regels.push(`── ANTWOORDEN ──`)
  for (const a of ctx.antwoorden) {
    regels.push(`Q: ${a.vraagTitel}`)
    regels.push(`A: ${formatWaarde(a.waarde)}`)
    regels.push(``)
  }

  regels.push(`Deadline Loom: binnen 24u.`)
  return regels.join("\n")
}

function bouwKlantMail(ctx: { naam: string | null; jobId: string }): string {
  const aanhef = ctx.naam ? `Hoi ${ctx.naam},` : `Hoi,`
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://future-content.nl"
  const resultatenUrl = `${site}/scan/klaar/${ctx.jobId}`
  const diepteUrl = `${site}/scan/diepte/${ctx.jobId}`
  const boekUrl = `https://${BOOKING.calHost}/${BOOKING.calUser}/${BOOKING.calEvent}`
  return [
    aanhef,
    ``,
    `Je resultaten staan klaar: ${resultatenUrl}`,
    ``,
    `Als bonus stuur ik je binnen 24 uur ook nog een korte, persoonlijke video waarin ik doorneem wat ik op de site zag, en wat ik zou doen als ik bij jullie aan tafel zat.`,
    ``,
    `Wil je eerst meer diepgang? Doe de uitgebreide scan, 10 tot 15 minuten, gratis: ${diepteUrl}`,
    `Al overtuigd? Plan direct ${BOOKING.duration} met me in: ${boekUrl}`,
    ``,
    `Als ik er langer dan 24 uur over doe, hoor je dat ook van me. Nooit stilte.`,
    ``,
    `Tot straks,`,
    `John`,
    ``,
    `Future Content · future-content.nl`,
  ].join("\n")
}

function formatWaarde(waarde: unknown): string {
  if (typeof waarde === "string") return waarde
  if (Array.isArray(waarde)) return waarde.join(", ")
  if (waarde && typeof waarde === "object") return JSON.stringify(waarde)
  return String(waarde)
}
