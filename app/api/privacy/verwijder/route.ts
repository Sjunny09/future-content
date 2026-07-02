import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"
import { db } from "@/lib/scan/db"
import { ipLimiet, hashIp } from "@/lib/scan/ratelimit"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const Payload = z
  .object({ email: z.string().email().max(200) })
  .strict()

function haalIpOp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "0.0.0.0"
  )
}

export async function POST(req: NextRequest) {
  // Rate-limit: hergebruik de IP-bucket van scan-starts. Genoeg voor legit
  // delete-verzoeken, blokkeert scrape-enumeratie.
  const ipH = hashIp(haalIpOp(req))
  const rate = await ipLimiet.limit(ipH)
  if (!rate.success) {
    return NextResponse.json(
      { fout: "Te veel verzoeken. Probeer het later nog eens." },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ fout: "Ongeldig verzoek." }, { status: 400 })
  }

  const parsed = Payload.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ fout: "Ongeldig e-mailadres." }, { status: 400 })
  }

  const email = parsed.data.email.trim().toLowerCase()

  const lead = await db.lead.findUnique({
    where: { email },
    select: { id: true, naam: true },
  })

  // Altijd 200: niet verklappen of een adres bestaat (anti-enumeratie).
  if (!lead) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  // Cascade-delete in juiste volgorde: ScanJob cascadeert Answers automatisch
  // (zie prisma schema), de rest laten we expliciet vallen.
  await db.$transaction([
    db.scanJob.deleteMany({ where: { leadId: lead.id } }),
    db.loomVideo.deleteMany({ where: { leadId: lead.id } }),
    db.payment.deleteMany({ where: { leadId: lead.id } }),
    db.lead.delete({ where: { id: lead.id } }),
  ])

  // Bevestigingsmail — stil overslaan als Resend niet configuraal is.
  const key = process.env.RESEND_API_KEY
  if (key) {
    try {
      const resend = new Resend(key)
      await resend.emails.send({
        from: "Future Content <privacy@future-content.nl>",
        to: email,
        subject: "Je gegevens zijn verwijderd",
        text: bouwBevestigingsmail(lead.naam),
      })
    } catch (err) {
      console.error("[privacy] bevestigingsmail faalde", { err })
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}

function bouwBevestigingsmail(naam: string | null): string {
  const aanhef = naam ? `Hoi ${naam.split(" ")[0]},` : `Hoi,`
  return [
    aanhef,
    ``,
    `Hierbij bevestig ik dat alle gegevens gekoppeld aan dit e-mailadres uit Future Content zijn verwijderd: scans, antwoorden en contactgegevens. Niets meer te vinden.`,
    ``,
    `Mocht je alsnog vragen hebben: stuur maar een mail.`,
    ``,
    `John, Future Content`,
  ].join("\n")
}
