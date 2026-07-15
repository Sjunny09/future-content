import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/scan/db"
import { magOsActie } from "@/lib/scan/osAuth"

export const runtime = "nodejs"

// Markeert een lead als test (of zet 'm terug naar actueel). Toegang via de
// fc_os-cookie (browser) of een Bearer-token (SCAN_ACTION_SECRET) vanuit de OS.
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
  const isTest = Boolean(
    body && typeof body === "object" && "isTest" in body &&
      (body as { isTest: unknown }).isTest,
  )

  try {
    await db.lead.update({ where: { id: leadId }, data: { isTest } })
  } catch {
    return NextResponse.json({ fout: "Lead niet gevonden." }, { status: 404 })
  }

  return NextResponse.json({ ok: true, isTest })
}
