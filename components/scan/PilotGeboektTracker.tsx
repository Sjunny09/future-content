"use client"

import { useEffect } from "react"
import { track } from "@/lib/scan/analytics/plausible"

// Vuurt één Plausible-event ("pilot_geboekt") bij mount. Gebruikt op de
// gelukt-pagina, alleen gerenderd als Mollie de betaling heeft bevestigd.
// Omdat de server-component pas rendert bij status=paid, is dit voldoende
// om één event per succesvolle checkout te loggen.
export function PilotGeboektTracker() {
  useEffect(() => {
    track("pilot_geboekt")
  }, [])
  return null
}
