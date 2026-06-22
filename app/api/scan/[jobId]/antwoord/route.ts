import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/scan/db"
import { kiesVolgendeVraag } from "@/lib/scan/vragen/selecteer"
import { EMAIL_NAAM_VRAAG, type Vraag } from "@/lib/scan/vragen/bibliotheek"
import type { SiteAnalyse } from "@/lib/scan/claude"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Aantal inhoudelijke vragen voordat de email-vraag komt. De server is de enige
// autoriteit hierover (telt de Answer-rows), nooit de client.
const MAX_INHOUDELIJK = 5

const Payload = z
  .object({
    vraagIndex: z.number().int().min(0).max(10),
    vraagId: z.string().min(1).max(16),
    vraagTitel: z.string().min(1).max(500),
    waarde: z.union([
      z.string().max(2000),
      z.array(z.string().max(200)).max(6),
    ]),
  })
  .strict()

type Params = Promise<{ jobId: string }>
type AntwoordKort = { vraagId: string; vraagTitel: string; waarde: unknown }

export async function POST(
  req: NextRequest,
  { params }: { params: Params },
) {
  const { jobId } = await params
  if (!jobId || jobId.length > 50) {
    return NextResponse.json({ fout: "Ongeldig." }, { status: 400 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ fout: "Ongeldig verzoek." }, { status: 400 })
  }

  const parsed = Payload.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ fout: "Ongeldig verzoek." }, { status: 400 })
  }

  const job = await db.scanJob.findUnique({
    where: { id: jobId },
    select: {
      id: true,
      status: true,
      analyseJson: true,
      vragenJson: true,
      antwoorden: {
        select: { vraagId: true, vraagTitel: true, waarde: true },
        orderBy: { createdAt: "asc" },
      },
    },
  })
  if (!job) {
    return NextResponse.json({ fout: "Niet gevonden." }, { status: 404 })
  }
  if (job.status !== "ready" && job.status !== "answering") {
    return NextResponse.json(
      { fout: "Scan staat niet open voor antwoorden." },
      { status: 409 },
    )
  }

  // Idempotentie: zelfde vraag al beantwoord (dubbelklik/refresh) -> niet opnieuw
  // inserten. De staat hieronder is daar deterministisch op afgestemd.
  const reedsBeantwoord = job.antwoorden.some(
    (a) => a.vraagId === parsed.data.vraagId,
  )
  if (!reedsBeantwoord) {
    await db.answer.create({
      data: {
        scanJobId: jobId,
        vraagId: parsed.data.vraagId,
        vraagTitel: parsed.data.vraagTitel,
        waarde: parsed.data.waarde as unknown as object,
      },
    })
  }

  const antwoorden: AntwoordKort[] = reedsBeantwoord
    ? job.antwoorden
    : [
        ...job.antwoorden,
        {
          vraagId: parsed.data.vraagId,
          vraagTitel: parsed.data.vraagTitel,
          waarde: parsed.data.waarde,
        },
      ]
  const beantwoordeIds = new Set(antwoorden.map((a) => a.vraagId))
  const aantalBeantwoord = beantwoordeIds.size

  const gesteldeVragen: Vraag[] = Array.isArray(job.vragenJson)
    ? (job.vragenJson as unknown as Vraag[])
    : []
  const gesteldeIds = gesteldeVragen.map((v) => v.id)

  // Bepaal de volgende vraag.
  let volgende: Vraag
  const alGekozen = [...gesteldeVragen]
    .reverse()
    .find((v) => !beantwoordeIds.has(v.id))

  if (aantalBeantwoord >= MAX_INHOUDELIJK) {
    // Stop: na 5 inhoudelijke vragen komt altijd de email-vraag.
    volgende = EMAIL_NAAM_VRAAG
  } else if (alGekozen) {
    // Replay/dedup: er staat al een gekozen-maar-onbeantwoorde vraag klaar.
    volgende = alGekozen
  } else {
    const analyse = (job.analyseJson ?? null) as SiteAnalyse | null
    volgende = analyse
      ? await kiesVolgendeVraag({
          analyse,
          gesteldeIds,
          antwoorden,
          slot: aantalBeantwoord + 1,
        })
      : EMAIL_NAAM_VRAAG

    if (volgende.id !== "EMAIL" && !gesteldeIds.includes(volgende.id)) {
      await db.scanJob.update({
        where: { id: jobId },
        data: {
          vragenJson: [...gesteldeVragen, volgende] as unknown as object,
        },
      })
    }
  }

  if (job.status === "ready") {
    await db.scanJob.update({
      where: { id: jobId },
      data: { status: "answering" },
    })
  }

  return NextResponse.json({ ok: true, volgende }, { status: 200 })
}
