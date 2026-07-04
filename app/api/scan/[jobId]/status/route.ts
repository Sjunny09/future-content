import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/scan/db"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type Params = Promise<{ jobId: string }>

export async function GET(
  _req: NextRequest,
  { params }: { params: Params }
) {
  const { jobId } = await params
  if (!jobId || jobId.length > 50) {
    return NextResponse.json({ fout: "Ongeldig." }, { status: 400 })
  }

  const job = await db.scanJob.findUnique({
    where: { id: jobId },
    select: {
      id: true,
      status: true,
      url: true,
      observatiesJson: true,
      analyseJson: true,
      startedAt: true,
      scrapedAt: true,
      analysedAt: true,
      readyAt: true,
    },
  })

  if (!job) {
    return NextResponse.json({ fout: "Niet gevonden." }, { status: 404 })
  }

  const klaar = job.status === "ready" || job.status === "completed"
  const { fase, voortgang } = berekenVoortgang({
    klaar,
    startedAt: job.startedAt,
    scrapedAt: job.scrapedAt,
    analysedAt: job.analysedAt,
  })

  return NextResponse.json(
    {
      jobId: job.id,
      status: job.status,
      url: job.url,
      observaties: Array.isArray(job.observatiesJson) ? job.observatiesJson : [],
      // Pas gevuld zodra Sonnet klaar is; daarvoor null (wachtscherm toont dan niets).
      analyse:
        job.analyseJson && typeof job.analyseJson === "object"
          ? job.analyseJson
          : null,
      klaar,
      gefaald: job.status === "failed",
      // Echte voortgang, afgeleid uit de bestaande timestamps. Monotoon per
      // fase (tijd loopt alleen vooruit); de client bewaakt daarnaast dat de
      // balk nooit terugspringt.
      fase,
      voortgang,
    },
    {
      headers: {
        // Tijdens polling geen caching — status verandert elke ~2s
        "Cache-Control": "no-store",
      },
    }
  )
}

// ─────────────────────────────────────────
// Voortgang uit timestamps (geen schemawijziging)
// ─────────────────────────────────────────
//
// Drie fases met elk een eigen bandbreedte op de balk. Binnen een fase loopt
// de voortgang mee met de verstreken tijd tegen een verwachte duur, en hij
// blijft net onder de bovengrens hangen tot de volgende timestamp er echt is.
// Zo is de balk eerlijk (gebaseerd op wat er werkelijk gebeurd is) en loopt
// hij nooit terug.

const FASE_TEKST = {
  scrapen: "scrapen",
  lezen: "lezen",
  planBouwen: "plan-bouwen",
  klaar: "klaar",
} as const

type FaseNaam = (typeof FASE_TEKST)[keyof typeof FASE_TEKST]

function ramp(
  sinds: Date | null,
  verwachtMs: number,
  van: number,
  tot: number,
): number {
  if (!sinds) return van
  const verstreken = Date.now() - sinds.getTime()
  const fractie = Math.max(0, Math.min(verstreken / verwachtMs, 1))
  // Blijf 1 punt onder de bovengrens tot de volgende fase echt begint.
  return Math.min(van + fractie * (tot - van), tot - 1)
}

function berekenVoortgang(args: {
  klaar: boolean
  startedAt: Date | null
  scrapedAt: Date | null
  analysedAt: Date | null
}): { fase: FaseNaam; voortgang: number } {
  const { klaar, startedAt, scrapedAt, analysedAt } = args

  if (klaar) {
    return { fase: FASE_TEKST.klaar, voortgang: 100 }
  }
  if (!scrapedAt) {
    // Site ophalen: normaal 2-8s, trage sites tot ~22s (Jina + Cheerio).
    return {
      fase: FASE_TEKST.scrapen,
      voortgang: Math.round(ramp(startedAt, 10_000, 4, 24)),
    }
  }
  if (!analysedAt) {
    // De grote leesbeurt (Sonnet, 15-25s): het leeuwendeel van de balk.
    return {
      fase: FASE_TEKST.lezen,
      voortgang: Math.round(ramp(scrapedAt, 22_000, 24, 86)),
    }
  }
  // Analyse klaar: openingsvraag bouwen plus eventueel de rest van de vloer.
  return {
    fase: FASE_TEKST.planBouwen,
    voortgang: Math.round(ramp(analysedAt, 8_000, 86, 100)),
  }
}
