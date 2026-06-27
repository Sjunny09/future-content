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
      readyAt: true,
    },
  })

  if (!job) {
    return NextResponse.json({ fout: "Niet gevonden." }, { status: 404 })
  }

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
      klaar: job.status === "ready" || job.status === "completed",
      gefaald: job.status === "failed",
    },
    {
      headers: {
        // Tijdens polling geen caching — status verandert elke ~2s
        "Cache-Control": "no-store",
      },
    }
  )
}
