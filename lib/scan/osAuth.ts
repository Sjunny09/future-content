import { cookies } from "next/headers"
import type { NextRequest } from "next/server"

// Gedeelde toegangscheck voor de /os-actieroutes (bellen, video-link, video-mail,
// mailUit, isTest, globale mail-schakelaar). Twee wegen naar binnen:
//
//   1. De bestaande browser-login: het fc_os-cookie moet gelijk zijn aan
//      ADMIN_TOKEN. Exact het gedrag van voorheen, ongewijzigd.
//   2. Server-to-server vanuit de Future Content OS: een Bearer-token in de
//      Authorization-header, gelijk aan SCAN_ACTION_SECRET.
//
// Fail-closed: de Bearer-weg telt alléén als SCAN_ACTION_SECRET gezet is. Is die
// leeg, dan bestaat die weg niet en blijft alleen de cookie over. Een ontbrekende
// of onjuiste header geeft nooit toegang.
export async function magOsActie(req: NextRequest): Promise<boolean> {
  // 1. Cookie (bestaand gedrag).
  const admin = process.env.ADMIN_TOKEN
  if (admin) {
    const cookie = (await cookies()).get("fc_os")?.value
    if (cookie === admin) return true
  }

  // 2. Bearer (nieuw). Alleen actief als het secret gezet is → fail-closed.
  const secret = process.env.SCAN_ACTION_SECRET
  if (secret) {
    const header = req.headers.get("authorization")
    if (header === `Bearer ${secret}`) return true
  }

  return false
}
