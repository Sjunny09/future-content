import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { zetMailsNaarLeads } from "@/lib/scan/settings"

export const runtime = "nodejs"

// Zet de automatische mails naar leads globaal aan of uit. Beveiligd met de
// fc_os-cookie. Werkt direct, geen redeploy nodig.
export async function POST(req: NextRequest) {
  const token = (await cookies()).get("fc_os")?.value
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ fout: "Geen toegang." }, { status: 401 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    body = {}
  }
  const aan = Boolean(
    body && typeof body === "object" && "aan" in body &&
      (body as { aan: unknown }).aan,
  )

  await zetMailsNaarLeads(aan)
  return NextResponse.json({ ok: true, aan })
}
