import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/scan/db"
import { stuurLoomHerinnering } from "@/lib/scan/mail/stuurHerinnering"
import { reportError } from "@/lib/scan/observability/logger"
import { mailsNaarLeadsAan } from "@/lib/scan/settings"
import { logMail } from "@/lib/scan/mail/mailLog"
import { notifyOs } from "@/lib/scan/notifyOs"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Loom-scheduler. Vercel Cron roept dit ieder uur aan. We zoeken LoomVideo-
// rows die 20u of ouder zijn (sinds createdAt), nog niet verstuurd (verstuurdOp
// is null) en nog geen herinnering hebben gehad. Dan:
//   1. Stuur "morgen stuur ik 'm"-mail
//   2. Zet herinneringVerstuurd = true
//   3. Schuif deadline op naar 48u na de oorspronkelijke scan-afloop
//
// Beveiliging: Bearer-token check tegen CRON_SECRET. Zonder secret geen
// response die er anders uitziet — we vertellen crawlers niks.

const GRENS_MS = 20 * 60 * 60 * 1000 // 20 uur
const NIEUWE_DEADLINE_MS = 48 * 60 * 60 * 1000 // 48 uur totaal vanaf scan

// Tweede taak in deze cron: afgeronde scans opnieuw naar het OS duwen. De
// OS-route dedupt op scanLeadId, dus een herhaalde melding maakt geen tweede
// relatie aan. Daarmee heelt een storing van een paar uur zichzelf, zonder dat
// iemand het hoeft te merken. Aanleiding: 20 september 2026 bleek de bridge 72
// dagen stil te hebben gefaald.
const HERHAAL_VENSTER_MS = 7 * 24 * 60 * 60 * 1000

// Ondergrens: alleen scans van NA deze datum opnieuw aanbieden. Alles daarvoor
// is met de hand in het OS gezet (KL21 / Isotras) zonder scanLeadId, dus daar
// zou de dedup niet op matchen en zouden we een dubbele relatie maken. Zodra
// die oude leads netjes aan hun scan gekoppeld zijn, mag deze grens weg.
const HERHAAL_VANAF = new Date("2026-09-21T00:00:00Z")

async function herhaalOsBridge(): Promise<{ bekeken: number; gelukt: number }> {
  const vanaf = new Date(Math.max(Date.now() - HERHAAL_VENSTER_MS, HERHAAL_VANAF.getTime()))
  const jobs = await db.scanJob.findMany({
    where: {
      status: "completed",
      isTest: false,
      completedAt: { gte: vanaf },
      leadId: { not: null },
    },
    select: { id: true, diepteStatus: true },
    take: 50,
  })

  let gelukt = 0
  for (const job of jobs) {
    // ponytail: we bieden elke lead in het venster elke nacht opnieuw aan in
    // plaats van bij te houden welke al geland zijn. Dat is een handvol rijen
    // per nacht en scheelt een kolom. Wordt het volume groter, sla dan het
    // OS-ref op de ScanJob op en sla over wat al gelukt is.
    const ok = await notifyOs(job.id, job.diepteStatus === "voltooid" ? "diepte" : "quickscan")
    if (ok) gelukt++
  }
  return { bekeken: jobs.length, gelukt }
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (secret) {
    const header = req.headers.get("authorization")
    if (header !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: true }, { status: 200 })
    }
  }

  // Eerst de bridge-herhaling. Die staat bewust vóór de mail-schakelaar: of
  // John's leads het OS halen, mag niet afhangen van of de funnel mails stuurt.
  const bridge = await herhaalOsBridge()

  // Respecteer de mail-schakelaar uit /os: staat 'ie uit, dan sturen we ook
  // geen herinneringen naar leads.
  if (!(await mailsNaarLeadsAan())) {
    return NextResponse.json(
      { ok: true, gevonden: 0, verstuurd: 0, bridge, overgeslagen: "mail-schakelaar staat uit" },
      { status: 200 },
    )
  }

  const drempel = new Date(Date.now() - GRENS_MS)

  const kandidaten = await db.loomVideo.findMany({
    where: {
      verstuurdOp: null,
      herinneringVerstuurd: false,
      createdAt: { lte: drempel },
      // Geen herinneringen naar testleads of leads waarvoor mail uit staat.
      lead: { isTest: false, mailUit: false },
    },
    select: {
      id: true,
      createdAt: true,
      lead: { select: { id: true, email: true, naam: true } },
    },
    take: 50,
  })

  let verstuurd = 0
  for (const rij of kandidaten) {
    if (!rij.lead) continue
    const gelukt = await stuurLoomHerinnering({
      email: rij.lead.email,
      naam: rij.lead.naam,
    })
    await logMail({
      leadId: rij.lead.id,
      ontvanger: rij.lead.email,
      richting: "naar_lead",
      soort: "herinnering",
      onderwerp: "Korte heads-up over je video",
      status: gelukt ? "verstuurd" : "mislukt",
    })
    if (!gelukt) continue
    try {
      await db.loomVideo.update({
        where: { id: rij.id },
        data: {
          herinneringVerstuurd: true,
          deadline: new Date(rij.createdAt.getTime() + NIEUWE_DEADLINE_MS),
        },
      })
      verstuurd++
    } catch (err) {
      reportError(err, { waar: "cron/loom-herinnering", loomId: rij.id })
    }
  }

  return NextResponse.json(
    { ok: true, gevonden: kandidaten.length, verstuurd, bridge },
    { status: 200 },
  )
}
