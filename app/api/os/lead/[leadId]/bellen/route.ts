import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { db } from "@/lib/scan/db"

export const runtime = "nodejs"

// Slaat de bel-status + feedback van een lead op. Beveiligd met de fc_os-cookie.
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
  const b = (body ?? {}) as { gebeld?: unknown; belnotitie?: unknown }
  const gebeld = Boolean(b.gebeld)
  const belnotitie =
    typeof b.belnotitie === "string" ? b.belnotitie.slice(0, 4000) : undefined

  try {
    const bestaand = await db.lead.findUnique({
      where: { id: leadId },
      select: { gebeld: true },
    })
    if (!bestaand) {
      return NextResponse.json({ fout: "Lead niet gevonden." }, { status: 404 })
    }
    await db.lead.update({
      where: { id: leadId },
      data: {
        gebeld,
        // gebeldOp alleen (opnieuw) zetten op het moment dat 'gebeld' aangaat.
        ...(gebeld && !bestaand.gebeld ? { gebeldOp: new Date() } : {}),
        ...(gebeld ? {} : { gebeldOp: null }),
        ...(belnotitie !== undefined ? { belnotitie } : {}),
      },
    })
  } catch {
    return NextResponse.json({ fout: "Opslaan mislukt." }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
