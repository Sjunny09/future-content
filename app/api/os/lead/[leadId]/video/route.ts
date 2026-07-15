import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/scan/db"
import { magOsActie } from "@/lib/scan/osAuth"

export const runtime = "nodejs"

// Slaat de persoonlijke-video-link (Loom of STACK) op bij de laatste LoomVideo
// van een lead en markeert hem als verstuurd. Toegang via de fc_os-cookie
// (browser) of een Bearer-token (SCAN_ACTION_SECRET) vanuit de OS.
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
    return NextResponse.json({ fout: "Ongeldig." }, { status: 400 })
  }
  const url =
    body && typeof body === "object" && "url" in body
      ? String((body as { url: unknown }).url).trim()
      : ""

  if (!url || !/^https?:\/\//i.test(url)) {
    return NextResponse.json({ fout: "Geef een geldige https-link." }, { status: 400 })
  }

  // Pak de meest recente video-taak van deze lead (of maak er een als die mist).
  const bestaand = await db.loomVideo.findFirst({
    where: { leadId },
    orderBy: { createdAt: "desc" },
  })

  if (bestaand) {
    await db.loomVideo.update({
      where: { id: bestaand.id },
      data: { loomUrl: url, verstuurdOp: new Date() },
    })
  } else {
    await db.loomVideo.create({
      data: {
        leadId,
        loomUrl: url,
        verstuurdOp: new Date(),
        deadline: new Date(),
      },
    })
  }

  return NextResponse.json({ ok: true })
}
