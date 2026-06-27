import { NextRequest, NextResponse, after } from "next/server"
import { z } from "zod"
import { db } from "@/lib/scan/db"
import { stuurMails } from "@/lib/scan/mail/stuurMails"
import { notifyOs } from "@/lib/scan/notifyOs"
import { reportError } from "@/lib/scan/observability/logger"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const Payload = z
  .object({
    naam: z.string().min(2).max(80),
    email: z.string().email().max(200),
    telefoon: z
      .string()
      .max(40)
      .optional()
      .refine((v) => !v || v.replace(/\D/g, "").length >= 8, {
        message: "telefoon-ongeldig",
      }),
    vraagIndex: z.number().int().min(0).max(10),
    vraagId: z.string().min(1).max(16),
    vraagTitel: z.string().min(1).max(500),
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

  const naam = parsed.data.naam.trim()
  const email = parsed.data.email.trim().toLowerCase()
  const telefoon = parsed.data.telefoon?.trim() || undefined

  const job = await db.scanJob.findUnique({
    where: { id: jobId },
    select: { id: true, status: true },
  })
  if (!job) {
    return NextResponse.json({ fout: "Niet gevonden." }, { status: 404 })
  }
  if (job.status === "completed") {
    // Idempotent: tweede POST (bv. dubbelklik op knop) mag geen fout geven.
    return NextResponse.json({ ok: true }, { status: 200 })
  }
  if (job.status !== "ready" && job.status !== "answering") {
    return NextResponse.json(
      { fout: "Scan staat niet open voor afronden." },
      { status: 409 },
    )
  }

  // Upsert Lead — email is uniek, dus bestaande klant met nieuwe scan wordt
  // netjes gekoppeld zonder duplicaten.
  const lead = await db.lead.upsert({
    where: { email },
    update: { naam, ...(telefoon ? { telefoon } : {}) },
    create: { email, naam, telefoon },
    select: { id: true },
  })

  await db.answer.create({
    data: {
      scanJobId: jobId,
      vraagId: parsed.data.vraagId,
      vraagTitel: parsed.data.vraagTitel,
      waarde: { naam, email } as unknown as object,
    },
  })

  await db.scanJob.update({
    where: { id: jobId },
    data: {
      status: "completed",
      completedAt: new Date(),
      leadId: lead.id,
    },
  })

  // 24u-belofte: deadline vastzetten + herinnering-flag uit. De cron
  // (/api/cron/loom-herinnering) checkt op 20u mark of John al heeft
  // verstuurd, en zo niet: stuur "morgen stuur ik 'm"-mail en schuif
  // deadline naar 48u.
  const deadline = new Date(Date.now() + 24 * 60 * 60 * 1000)
  await db.loomVideo.create({
    data: {
      leadId: lead.id,
      deadline,
    },
  })

  // Fire-and-forget: mail naar John + bevestigingsmail naar klant.
  // Fout in mail-versturen mag de success-respons niet blokkeren.
  after(async () => {
    try {
      await stuurMails(jobId)
    } catch (err) {
      reportError(err, { waar: "compleet/stuurMails", jobId })
    }
    // Leads-bridge: ná mail, lead doorduwen naar Google Sheet (bron van waarheid).
    // Apart try/catch zodat mail-fouten notifyOs niet blokkeren en vice versa.
    try {
      await notifyOs(jobId)
    } catch (err) {
      reportError(err, { waar: "compleet/notifyOs", jobId })
    }
  })

  return NextResponse.json({ ok: true }, { status: 200 })
}
