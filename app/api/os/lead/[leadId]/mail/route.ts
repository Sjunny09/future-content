import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/scan/db"
import { magOsActie } from "@/lib/scan/osAuth"

export const runtime = "nodejs"

// Zet de automatische mails naar één specifieke lead aan of uit (mailUit).
// Toegang via de fc_os-cookie (browser) of een Bearer-token
// (SCAN_ACTION_SECRET) vanuit de OS.
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ leadId: string }> },
) {
  if (!(await magOsActie(req))) {
    return NextResponse.json({ fout: "Geen toegang." }, { status: 401 })
  }

  const { leadId } = await params

  let body: unknown
  try {
    body = await req.json()
  } catch {
    body = {}
  }
  // mailAan=true => mailUit=false. We sturen de gewenste eindstand als 'mailAan'.
  const mailUit = !Boolean(
    body && typeof body === "object" && "mailAan" in body &&
      (body as { mailAan: unknown }).mailAan,
  )

  try {
    await db.lead.update({ where: { id: leadId }, data: { mailUit } })
  } catch {
    return NextResponse.json({ fout: "Lead niet gevonden." }, { status: 404 })
  }

  return NextResponse.json({ ok: true, mailUit })
}
