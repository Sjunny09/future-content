import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/scan/db"
import { stuurLoomHerinnering } from "@/lib/scan/mail/stuurHerinnering"
import { reportError } from "@/lib/scan/observability/logger"
import { mailsNaarLeadsAan } from "@/lib/scan/settings"
import { logMail } from "@/lib/scan/mail/mailLog"

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

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (secret) {
    const header = req.headers.get("authorization")
    if (header !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: true }, { status: 200 })
    }
  }

  // Respecteer de mail-schakelaar uit /os: staat 'ie uit, dan sturen we ook
  // geen herinneringen naar leads.
  if (!(await mailsNaarLeadsAan())) {
    return NextResponse.json(
      { ok: true, gevonden: 0, verstuurd: 0, overgeslagen: "mail-schakelaar staat uit" },
      { status: 200 },
    )
  }

  const drempel = new Date(Date.now() - GRENS_MS)

  const kandidaten = await db.loomVideo.findMany({
    where: {
      verstuurdOp: null,
      herinneringVerstuurd: false,
      createdAt: { lte: drempel },
      // Geen herinneringen naar testleads.
      lead: { isTest: false },
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
    { ok: true, gevonden: kandidaten.length, verstuurd },
    { status: 200 },
  )
}
