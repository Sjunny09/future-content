import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/scan/db"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

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
    select: { id: true, status: true },
  })
  if (!job) {
    return NextResponse.json({ fout: "Niet gevonden." }, { status: 404 })
  }
  if (
    job.status !== "ready" &&
    job.status !== "answering"
  ) {
    return NextResponse.json(
      { fout: "Scan staat niet open voor antwoorden." },
      { status: 409 },
    )
  }

  await db.answer.create({
    data: {
      scanJobId: jobId,
      vraagId: parsed.data.vraagId,
      vraagTitel: parsed.data.vraagTitel,
      waarde: parsed.data.waarde as unknown as object,
    },
  })

  if (job.status === "ready") {
    await db.scanJob.update({
      where: { id: jobId },
      data: { status: "answering" },
    })
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
