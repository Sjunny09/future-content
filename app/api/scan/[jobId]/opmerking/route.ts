import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/scan/db"
import { reportError } from "@/lib/scan/observability/logger"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const Payload = z.object({ opmerking: z.string().max(2000) }).strict()

type Params = Promise<{ jobId: string }>

export async function POST(req: NextRequest, { params }: { params: Params }) {
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

  const opmerking = parsed.data.opmerking.trim().slice(0, 2000)

  const job = await db.scanJob.findUnique({
    where: { id: jobId },
    select: { id: true },
  })
  if (!job) {
    return NextResponse.json({ fout: "Niet gevonden." }, { status: 404 })
  }

  try {
    await db.scanJob.update({
      where: { id: jobId },
      data: { opmerking: opmerking || null },
    })
  } catch (err) {
    // Fail-soft: vóór de DB-migratie bestaat de kolom nog niet. Dan geen crash,
    // maar een nette ok:false zodat de UI een rustige melding kan tonen.
    reportError(err, { waar: "opmerking/update", jobId })
    return NextResponse.json({ ok: false }, { status: 200 })
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
