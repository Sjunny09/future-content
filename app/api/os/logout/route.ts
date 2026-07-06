import { NextResponse } from "next/server"

export const runtime = "nodejs"

// Wist het fc_os-cookie zodat John kan uitloggen uit /os. Zelfde attributen
// als bij het inloggen, maar met maxAge 0 zodat de browser 'm meteen weggooit.
export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set("fc_os", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  })
  return res
}
