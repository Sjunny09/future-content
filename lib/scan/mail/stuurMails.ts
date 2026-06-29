import { Resend } from "resend"
import { db } from "@/lib/scan/db"
import type { SiteAnalyse } from "@/lib/scan/claude"

// Mail-adressen in één punt — makkelijker te veranderen later.
const VAN = "Future Content <scan@futurecontent.nl>"
const JOHN = process.env.SCAN_NOTIFY_EMAIL ?? "john@futurecontent.nl"

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

  await Promise.all([
    resend.emails
      .send({
        from: VAN,
        to: JOHN,
        subject: `Nieuwe scan: ${job.lead.naam ?? "onbekend"} · ${job.url}`,
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
      .catch((err) => {
        console.error("[mail] mail-naar-john faalde", { jobId, err })
      }),

    resend.emails
      .send({
        from: VAN,
        to: job.lead.email,
        subject: "Dankjewel — binnen 24 uur stuur ik je de video",
        text: bouwKlantMail({ naam: job.lead.naam }),
      })
      .catch((err) => {
        console.error("[mail] mail-naar-klant faalde", { jobId, err })
      }),
  ])
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

function bouwKlantMail(ctx: { naam: string | null }): string {
  const aanhef = ctx.naam ? `Hoi ${ctx.naam},` : `Hoi,`
  return [
    aanhef,
    ``,
    `Dankjewel dat je de scan hebt gedaan. Ik ga er nu rustig mee zitten.`,
    ``,
    `Binnen 24 uur krijg je van mij een korte video waarin ik doorneem wat ik op de site zag, en wat ik zou doen als ik bij jullie aan tafel zat. Gewoon mijn eerlijke eerste indruk.`,
    ``,
    `Als ik er langer dan 24 uur over doe, hoor je dat ook van me. Nooit stilte.`,
    ``,
    `Tot straks,`,
    `John`,
    ``,
    `Future Content · futurecontent.nl`,
  ].join("\n")
}

function formatWaarde(waarde: unknown): string {
  if (typeof waarde === "string") return waarde
  if (Array.isArray(waarde)) return waarde.join(", ")
  if (waarde && typeof waarde === "object") return JSON.stringify(waarde)
  return String(waarde)
}
