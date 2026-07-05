import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { db } from "@/lib/scan/db"

export const runtime = "nodejs"

// Markeert een lead als test (of zet 'm terug naar actueel). Beveiligd met
// dezelfde fc_os-cookie als de rest van /os.
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ leadId: string }> },
) {
  const token = (await cookies()).get("fc_os")?.value
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
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
