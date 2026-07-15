import { NextRequest, NextResponse } from "next/server"
import { zetMailsNaarLeads } from "@/lib/scan/settings"
import { magOsActie } from "@/lib/scan/osAuth"

export const runtime = "nodejs"

// Zet de automatische mails naar leads globaal aan of uit. Toegang via de
// fc_os-cookie (browser) of een Bearer-token (SCAN_ACTION_SECRET) vanuit de OS.
// Werkt direct, geen redeploy nodig.
export async function POST(req: NextRequest) {
  if (!(await magOsActie(req))) {
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
