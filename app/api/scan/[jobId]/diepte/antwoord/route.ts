import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/scan/db"
import { volgendeDiepteVraag } from "@/lib/scan/diepte"
import type { Vraag } from "@/lib/scan/vragen/bibliotheek"
import type { SiteAnalyse } from "@/lib/scan/claude"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const Payload = z
  .object({
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
  // Deze route verwerkt uitsluitend diepe vragen (prefix "DV").
  if (!parsed.data.vraagId.startsWith("DV")) {
    return NextResponse.json({ fout: "Ongeldige vraag." }, { status: 400 })
  }

  const job = await db.scanJob.findUnique({
    where: { id: jobId },
    select: {
      id: true,
      status: true,
      analyseJson: true,
      diepteStatus: true,
      diepteVragenJson: true,
      antwoorden: {
        select: { vraagId: true, vraagTitel: true, waarde: true },
        orderBy: { createdAt: "asc" },
      },
    },
  })
  if (!job) {
    return NextResponse.json({ fout: "Niet gevonden." }, { status: 404 })
  }
  if (job.status !== "completed" || job.diepteStatus === "voltooid") {
    return NextResponse.json(
      { fout: "Diepe scan staat niet open." },
      { status: 409 },
    )
  }

  // Idempotent: zelfde diepe vraag al beantwoord (dubbelklik/refresh) -> niet
  // opnieuw inserten.
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
  const diepAntwoordIds = new Set(
    antwoorden.filter((a) => a.vraagId.startsWith("DV")).map((a) => a.vraagId),
  )

  const analyse = (job.analyseJson ?? null) as SiteAnalyse | null
  const gesteldeVragen: Vraag[] = Array.isArray(job.diepteVragenJson)
    ? (job.diepteVragenJson as unknown as Vraag[])
    : []

  const volgende = await volgendeDiepteVraag({
    analyse,
    antwoorden,
    gesteldeVragen,
    diepAntwoordIds,
  })

  if (!volgende) {
    return NextResponse.json({ ok: true, klaar: true }, { status: 200 })
  }

  if (!gesteldeVragen.some((v) => v.id === volgende.id)) {
    await db.scanJob.update({
      where: { id: jobId },
      data: {
        diepteVragenJson: [...gesteldeVragen, volgende] as unknown as object,
      },
    })
  }

  return NextResponse.json({ ok: true, volgende }, { status: 200 })
}
