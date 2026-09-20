import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Gezondheidscheck op de leads-bridge naar het OS.
 *
 * Waarom dit bestaat: op 20 september 2026 bleek dat de bridge 72 dagen lang
 * stil faalde. De code klopte, de env-waarden in productie niet, en er was
 * geen manier om dat van buitenaf te zien zonder een echte lead op te offeren.
 * Deze route meet het pad zoals productie het loopt: zelfde env, zelfde URL,
 * zelfde secret.
 *
 * Schrijft niets. We sturen expres een onleesbare body, dus de OS-route komt
 * nooit verder dan zijn eigen JSON-check:
 *   400 = gezond (URL klopt, secret wordt geaccepteerd)
 *   401 = secret klopt niet
 *   geen antwoord = OS_BASE_URL klopt niet of het OS ligt eruit
 *
 * Publiek bereikbaar, want er komt geen secret of klantgegeven in het antwoord
 * en het OS is toch al publiek benaderbaar. Wel gedempt op één echte meting per
 * minuut, zodat dit geen knopje wordt om het OS mee te bestoken.
 */

const DEMPING_MS = 60_000

type Uitslag = {
  ok: boolean
  os: string | null
  status: number | null
  uitleg: string
  gemetenOp: string
}

let laatste: Uitslag | null = null

function host(base: string | undefined): string | null {
  if (!base) return null
  try {
    return new URL(base).host
  } catch {
    return "onleesbare OS_BASE_URL"
  }
}

export async function GET() {
  if (laatste && Date.now() - Date.parse(laatste.gemetenOp) < DEMPING_MS) {
    return NextResponse.json(laatste, { status: 200 })
  }

  const base = process.env.OS_BASE_URL
  const secret = process.env.OS_WEBHOOK_SECRET

  if (!base || !secret) {
    laatste = {
      ok: false,
      os: host(base),
      status: null,
      uitleg: !base
        ? "OS_BASE_URL ontbreekt in deze omgeving"
        : "OS_WEBHOOK_SECRET ontbreekt in deze omgeving",
      gemetenOp: new Date().toISOString(),
    }
    return NextResponse.json(laatste, { status: 200 })
  }

  try {
    const res = await fetch(`${base}/api/leads/van-scan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
      },
      // Expres geen geldige JSON: de OS-route stopt dan na de auth-check.
      body: "bridge-check",
      signal: AbortSignal.timeout(10_000),
    })
    laatste = {
      ok: res.status === 400,
      os: host(base),
      status: res.status,
      uitleg:
        res.status === 400
          ? "bridge gezond: OS bereikbaar en secret geaccepteerd"
          : res.status === 401
            ? "OS bereikbaar, maar het secret wordt geweigerd"
            : `onverwacht antwoord van het OS (${res.status})`,
      gemetenOp: new Date().toISOString(),
    }
  } catch {
    laatste = {
      ok: false,
      os: host(base),
      status: null,
      uitleg: "OS niet bereikbaar vanaf productie (klopt OS_BASE_URL?)",
      gemetenOp: new Date().toISOString(),
    }
  }

  return NextResponse.json(laatste, { status: 200 })
}
