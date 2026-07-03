// Plausible wrapper. Alle scan-events gaan door deze helper zodat we op
// één plek kunnen zien wat er getrackt wordt (en makkelijk kunnen swappen).
//
// Werkt alleen in de browser — op server/edge is het een no-op. Als het
// Plausible-script niet geladen is (bv. dev zonder NEXT_PUBLIC_PLAUSIBLE_DOMAIN)
// ook silent no-op: we willen nooit dat missing analytics een flow breekt.

export type ScanEvent =
  | "scan_start"
  | "scan_ready"
  | "vraag_1_klaar"
  | "vraag_6_klaar"
  | "pilot_geboekt"
  | "gesprek_geboekt"
  | "scan_afgerond"
  | "formulier_verstuurd"
  | "cal_geladen"

type PlausibleFn = (
  event: string,
  options?: { props?: Record<string, string | number | boolean> },
) => void

declare global {
  interface Window {
    plausible?: PlausibleFn
  }
}

export function track(
  event: ScanEvent,
  props?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return
  const fn = window.plausible
  if (typeof fn !== "function") return
  try {
    fn(event, props ? { props } : undefined)
  } catch {
    // Analytics mag nooit een flow breken.
  }
}
