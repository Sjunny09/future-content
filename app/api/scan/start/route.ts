import { NextRequest, NextResponse } from "next/server"
import { after } from "next/server"
import { z } from "zod"
import { db } from "@/lib/scan/db"
import { valideerScanUrl, canoniekeUrl } from "@/lib/scan/url-guard"
import { ipLimiet, urlLimiet, hashIp } from "@/lib/scan/ratelimit"
import { analyseStarten } from "@/lib/scan/jobs/analyseStarten"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const Payload = z.object({ url: z.string().min(1).max(500) }).strict()

function haalIpOp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  const real = req.headers.get("x-real-ip")
  if (real) return real
  return "0.0.0.0"
}

export async function POST(req: NextRequest) {
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

  const validatie = valideerScanUrl(parsed.data.url)
  if (!validatie.ok) {
    return NextResponse.json({ fout: validatie.reden }, { status: 400 })
  }

  const ip = haalIpOp(req)
  const ipH = hashIp(ip)

  const ipCheck = await ipLimiet.limit(ipH)
  if (!ipCheck.success) {
    return NextResponse.json(
      { fout: "Teveel scans vanaf deze plek. Probeer het over een uurtje nog eens." },
      { status: 429 }
    )
  }

  const urlKey = canoniekeUrl(validatie.url)
  const urlCheck = await urlLimiet.limit(urlKey)
  if (!urlCheck.success) {
    return NextResponse.json(
      { fout: "Deze website is net gescand. Probeer het over 10 minuten nog eens." },
      { status: 429 }
    )
  }

  const job = await db.scanJob.create({
    data: {
      url: validatie.url.toString(),
      ipHash: ipH,
      status: "queued",
    },
    select: { id: true },
  })

  // Fire-and-forget: start de scrape+analyse op de achtergrond.
  // `after()` in Next 16 garandeert dat deze Promise blijft draaien nadat
  // de response verstuurd is (vervangt `waitUntil` voor app-router).
  after(async () => {
    try {
      await analyseStarten(job.id)
    } catch (err) {
      console.error("[scan] analyseStarten faalde", { jobId: job.id, err })
      await db.scanJob
        .update({
          where: { id: job.id },
          data: {
            status: "failed",
            scrapeFaaldeOp: err instanceof Error ? err.message : "onbekend",
          },
        })
        .catch(() => undefined)
    }
  })

  return NextResponse.json({ jobId: job.id }, { status: 201 })
}
