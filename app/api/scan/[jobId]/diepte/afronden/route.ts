import { NextRequest, NextResponse, after } from "next/server"
import { db } from "@/lib/scan/db"
import { genereerDiagnose } from "@/lib/scan/diepte"
import { notifyTelegram } from "@/lib/scan/notifyTelegram"
import { reportError } from "@/lib/scan/observability/logger"
import type { SiteAnalyse } from "@/lib/scan/claude"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type Params = Promise<{ jobId: string }>

export async function POST(
  _req: NextRequest,
  { params }: { params: Params },
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
      diepteStatus: true,
      analyseJson: true,
      antwoorden: {
        select: { vraagId: true, vraagTitel: true, waarde: true },
        orderBy: { createdAt: "asc" },
      },
    },
  })
  if (!job) {
    return NextResponse.json({ fout: "Niet gevonden." }, { status: 404 })
  }
  // Idempotent: al voltooid -> niets opnieuw doen.
  if (job.diepteStatus === "voltooid") {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  await db.scanJob.update({
    where: { id: jobId },
    data: { diepteStatus: "voltooid" },
  })

  // Diagnose op de achtergrond (blokkeert de bezoeker niet). Dit is John's
  // voorbereiding op het gesprek: bouw vs training vs zelf.
  const analyse = (job.analyseJson ?? null) as SiteAnalyse | null
  const antwoorden = job.antwoorden
  after(async () => {
    try {
      const diagnose = await genereerDiagnose({ analyse, antwoorden })
      if (diagnose) {
        await db.scanJob.update({
          where: { id: jobId },
          data: { diagnoseJson: diagnose as unknown as object },
        })
      }
    } catch (err) {
      reportError(err, { waar: "diepte/afronden/diagnose", jobId })
    }
    // Telegram-ping ná de diagnose, zodat het bouw/training/zelf-advies mee
    // kan in het bericht. Faalt de diagnose, dan pingt 'ie alsnog zonder advies.
    try {
      await notifyTelegram(jobId, "diepte")
    } catch (err) {
      reportError(err, { waar: "diepte/afronden/notifyTelegram", jobId })
    }
  })

  return NextResponse.json({ ok: true }, { status: 200 })
}
