import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

// Eenvoudige token-gate voor /os (de leads-view). Eén gedeeld wachtwoord uit
// ADMIN_TOKEN. Geen user-systeem nodig: alleen John kijkt hier.
export async function POST(req: NextRequest) {
  const token = process.env.ADMIN_TOKEN
  if (!token) {
    return NextResponse.json(
      { fout: "ADMIN_TOKEN niet ingesteld op de server." },
      { status: 500 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ fout: "Ongeldig." }, { status: 400 })
  }

  const ingevoerd =
    body && typeof body === "object" && "token" in body
      ? String((body as { token: unknown }).token)
      : ""

  if (ingevoerd !== token) {
    return NextResponse.json({ fout: "Onjuist wachtwoord." }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set("fc_os", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 dagen
  })
  return res
}
