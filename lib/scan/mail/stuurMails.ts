import { Resend } from "resend"
import { db } from "@/lib/scan/db"
import { BOOKING } from "@/lib/constants"
import type { SiteAnalyse } from "@/lib/scan/claude"
import { mailsNaarLeadsAan } from "@/lib/scan/settings"
import { logMail } from "@/lib/scan/mail/mailLog"

// Mail-adressen in één punt — makkelijker te veranderen later.
const VAN = "Future Content <scan@future-content.nl>"
const JOHN = process.env.SCAN_NOTIFY_EMAIL ?? "john@future-content.nl"
// scan@ is alleen een verzendadres (Resend), geen postbus. Antwoorden van klanten
// laten we daarom in John's Roundcube-inbox landen via Reply-To.
const ANTWOORD_NAAR = process.env.SCAN_REPLY_TO ?? "hello@future-content.nl"

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
  } else if (job.lead.mailUit) {
    await logMail({ leadId, scanJobId: job.id, ontvanger: job.lead.email, richting: "naar_lead", soort: "resultaten", onderwerp: leadOnderwerp, status: "overgeslagen", detail: "mail uit voor deze lead" })
  } else {
    try {
      await resend.emails.send({
        from: VAN,
        replyTo: ANTWOORD_NAAR,
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

// ─────────────────────────────────────────
// Video-mail (handmatig getriggerd vanuit /os)
// ─────────────────────────────────────────

export type VideoMailResultaat = { ok: boolean; fout?: string }

// Stuurt de persoonlijke-video-mail naar de lead, logt hem in de MailLog (zodat
// John in /os ziet wanneer de video eruit ging) en stempelt LoomVideo.verstuurdOp
// op het echte verzendmoment. loomUrl mag meegegeven worden; anders pakt hij de
// laatst opgeslagen link van de lead.
export async function stuurVideoMail(
  leadId: string,
  opts: { loomUrl?: string; persoonlijkBericht?: string } = {},
): Promise<VideoMailResultaat> {
  const resend = client()
  if (!resend) return { ok: false, fout: "RESEND_API_KEY ontbreekt" }

  const lead = await db.lead.findUnique({ where: { id: leadId } })
  if (!lead) return { ok: false, fout: "Lead niet gevonden" }

  const bestaand = await db.loomVideo.findFirst({
    where: { leadId },
    orderBy: { createdAt: "desc" },
  })

  const meegegeven = opts.loomUrl?.trim()
  const geldigMeegegeven =
    meegegeven && /^https?:\/\//i.test(meegegeven) ? meegegeven : null
  const loomUrl = geldigMeegegeven ?? bestaand?.loomUrl ?? null
  if (!loomUrl) {
    return { ok: false, fout: "Geen video-link. Plak eerst de Loom-link." }
  }

  // Nieuwe of gewijzigde link meteen vastleggen op de video-taak.
  let taakId = bestaand?.id ?? null
  if (geldigMeegegeven && geldigMeegegeven !== bestaand?.loomUrl) {
    if (bestaand) {
      await db.loomVideo.update({
        where: { id: bestaand.id },
        data: { loomUrl: geldigMeegegeven },
      })
      taakId = bestaand.id
    } else {
      const nieuw = await db.loomVideo.create({
        data: { leadId, loomUrl: geldigMeegegeven, deadline: new Date() },
      })
      taakId = nieuw.id
    }
  }

  const onderwerp = "Je persoonlijke video staat klaar"
  try {
    await resend.emails.send({
      from: VAN,
      replyTo: ANTWOORD_NAAR,
      to: lead.email,
      subject: onderwerp,
      text: bouwVideoMail({
        naam: lead.naam,
        loomUrl,
        persoonlijkBericht: opts.persoonlijkBericht?.trim() || null,
      }),
    })
    // Stempel het echte verzendmoment op de video-taak.
    if (taakId) {
      await db.loomVideo.update({
        where: { id: taakId },
        data: { verstuurdOp: new Date() },
      })
    }
    await logMail({
      leadId,
      ontvanger: lead.email,
      richting: "naar_lead",
      soort: "video",
      onderwerp,
      status: "verstuurd",
    })
    return { ok: true }
  } catch (err) {
    console.error("[mail] video-mail faalde", { leadId, err })
    await logMail({
      leadId,
      ontvanger: lead.email,
      richting: "naar_lead",
      soort: "video",
      onderwerp,
      status: "mislukt",
      detail: err instanceof Error ? err.message : String(err),
    })
    return { ok: false, fout: "Versturen mislukte, probeer opnieuw." }
  }
}

function bouwVideoMail(ctx: {
  naam: string | null
  loomUrl: string
  persoonlijkBericht: string | null
}): string {
  const voornaam = ctx.naam?.split(" ")[0]
  const aanhef = voornaam ? `Hoi ${voornaam},` : `Hoi,`
  const boekUrl = `https://${BOOKING.calHost}/${BOOKING.calUser}/${BOOKING.calEvent}`
  const regels: string[] = [aanhef, ``]
  if (ctx.persoonlijkBericht) {
    regels.push(ctx.persoonlijkBericht, ``)
  }
  regels.push(
    `Zoals beloofd, hier je persoonlijke video. Geen mail vol tekst, gewoon ik die even met je door de site loopt en zeg wat ik zou doen als ik bij jullie aan tafel zat.`,
    ``,
    `Bekijk 'm hier: ${ctx.loomUrl}`,
    ``,
    `Duurt een minuutje. Geen haast, geen verplichting. Spreekt het je aan, dan kletsen we een keer verder. Je mag ook gewoon deze mail beantwoorden.`,
    ``,
    `Al overtuigd? Plan direct ${BOOKING.duration} met me in: ${boekUrl}`,
    ``,
    `Tot snel,`,
    `John`,
    ``,
    `-`,
    `Future Content · future-content.nl`,
  )
  return regels.join("\n")
}

function formatWaarde(waarde: unknown): string {
  if (typeof waarde === "string") return waarde
  if (Array.isArray(waarde)) return waarde.join(", ")
  if (waarde && typeof waarde === "object") return JSON.stringify(waarde)
  return String(waarde)
}
