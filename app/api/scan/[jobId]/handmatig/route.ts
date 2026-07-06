import { NextRequest, NextResponse, after } from "next/server"
import { z } from "zod"
import { db } from "@/lib/scan/db"
import { logMail } from "@/lib/scan/mail/mailLog"
import { Resend } from "resend"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Opvang bij een mislukte scan: de bezoeker kon niet automatisch gescand worden
// (site onleesbaar), maar laat gegevens achter zodat John handmatig opvolgt. Zo
// verliezen we het verkeer van bijvoorbeeld de LinkedIn-launch niet.
const Payload = z
  .object({
    naam: z.string().min(1).max(80).optional(),
    email: z.string().email().max(200),
    telefoon: z
      .string()
      .max(40)
      .optional()
      .transform((v) => v?.trim() || undefined),
  })
  .strict()

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

  const email = parsed.data.email.trim().toLowerCase()
  const naam = parsed.data.naam?.trim()
  const telefoon = parsed.data.telefoon

  const job = await db.scanJob.findUnique({
    where: { id: jobId },
    select: { id: true, url: true, isTest: true },
  })
  if (!job) {
    return NextResponse.json({ fout: "Niet gevonden." }, { status: 404 })
  }

  // Upsert de lead en koppel 'm aan de mislukte scan, zodat John 'm in /os ziet.
  const lead = await db.lead.upsert({
    where: { email },
    update: {
      ...(naam ? { naam } : {}),
      ...(telefoon ? { telefoon } : {}),
      ...(job.isTest ? { isTest: true } : {}),
    },
    create: { email, naam, telefoon, isTest: job.isTest },
    select: { id: true },
  })

  await db.scanJob.update({
    where: { id: jobId },
    data: {
      leadId: lead.id,
      opmerking:
        "[Automatisch] De scan kon deze site niet automatisch lezen. Lead vroeg om persoonlijke opvolging.",
    },
  })

  // John op de hoogte brengen (mail + Telegram). Fail-soft: de bezoeker mag
  // hier nooit een fout van zien.
  after(async () => {
    const JOHN = process.env.SCAN_NOTIFY_EMAIL ?? "john@future-content.nl"
    const onderwerp = `Handmatige lead (scan mislukt): ${naam ?? "onbekend"} · ${job.url}`
    const tekst = [
      `De scan kon deze site niet automatisch lezen, maar de bezoeker liet gegevens achter.`,
      ``,
      `Naam: ${naam ?? "onbekend"}`,
      `Email: ${email}`,
      `Telefoon: ${telefoon ?? "-"}`,
      `Site: ${job.url}`,
      ``,
      `Bel of mail deze persoon en kijk zelf even naar de site. Staat in /os onder Actueel.`,
    ].join("\n")

    const key = process.env.RESEND_API_KEY
    if (key) {
      try {
        await new Resend(key).emails.send({
          from: "Future Content <scan@future-content.nl>",
          to: JOHN,
          subject: onderwerp,
          text: tekst,
        })
        await logMail({ leadId: lead.id, scanJobId: job.id, ontvanger: JOHN, richting: "naar_john", soort: "john_notificatie", onderwerp, status: "verstuurd" })
      } catch (err) {
        await logMail({ leadId: lead.id, scanJobId: job.id, ontvanger: JOHN, richting: "naar_john", soort: "john_notificatie", onderwerp, status: "mislukt", detail: err instanceof Error ? err.message : String(err) })
      }
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID
    if (botToken && chatId) {
      try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: `⚠️ Handmatige lead (scan kon de site niet lezen)\n${naam ?? "onbekend"} · ${email}\n${job.url}`,
          }),
        })
      } catch {
        // fail-soft
      }
    }
  })

  return NextResponse.json({ ok: true })
}
