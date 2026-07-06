import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { stuurVideoMail } from "@/lib/scan/mail/stuurMails"

export const runtime = "nodejs"

// Stuurt de persoonlijke-video-mail naar de lead vanuit /os. De mail komt van
// scan@ met Reply-To naar John's inbox, wordt gelogd in de MailLog en stempelt
// het echte verzendmoment op de video-taak. Beveiligd met de fc_os-cookie.
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ leadId: string }> },
) {
  const token = (await cookies()).get("fc_os")?.value
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ fout: "Geen toegang." }, { status: 401 })
  }

  const { leadId } = await params

  let body: unknown = {}
  try {
    body = await req.json()
  } catch {
    // Lege body is prima: dan pakt hij de opgeslagen link zonder persoonlijk bericht.
  }
  const obj = (body && typeof body === "object" ? body : {}) as {
    url?: unknown
    persoonlijkBericht?: unknown
  }
  const loomUrl = typeof obj.url === "string" ? obj.url : undefined
  const persoonlijkBericht =
    typeof obj.persoonlijkBericht === "string" ? obj.persoonlijkBericht : undefined

  const resultaat = await stuurVideoMail(leadId, { loomUrl, persoonlijkBericht })
  if (!resultaat.ok) {
    return NextResponse.json({ fout: resultaat.fout ?? "Mislukt." }, { status: 400 })
  }
  return NextResponse.json({ ok: true })
}
