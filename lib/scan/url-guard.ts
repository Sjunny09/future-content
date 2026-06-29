// SSRF + invoer-guard voor de scan-flow.
// Zie docs/quickscan/03_ceo_synthese.md §4.2.

const VERBODEN_HOSTS = [
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "::1",
]

const VERBODEN_SUFFIX = [
  ".internal",
  ".local",
  ".localhost",
]

// Private IP-ranges die we nooit scrapen.
function isPrivateIP(host: string): boolean {
  if (/^10\./.test(host)) return true
  if (/^192\.168\./.test(host)) return true
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(host)) return true
  if (/^169\.254\./.test(host)) return true   // link-local
  if (/^127\./.test(host)) return true
  if (/^fc00:/i.test(host)) return true        // IPv6 private
  if (/^fe80:/i.test(host)) return true        // IPv6 link-local
  return false
}

export type UrlValidatie =
  | { ok: true; url: URL }
  | { ok: false; reden: string }

export function valideerScanUrl(invoer: string): UrlValidatie {
  const schoon = invoer.trim()
  if (!schoon) return { ok: false, reden: "Lege URL" }
  if (schoon.length > 500) return { ok: false, reden: "URL te lang" }

  // Geef gebruiker het voordeel — `fysio-bladel.nl` mag ook zonder https://
  const metScheme = /^https?:\/\//i.test(schoon) ? schoon : `https://${schoon}`

  let url: URL
  try {
    url = new URL(metScheme)
  } catch {
    return { ok: false, reden: "Ongeldige URL" }
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return { ok: false, reden: "Alleen http(s) wordt ondersteund" }
  }

  const host = url.hostname.toLowerCase()

  if (VERBODEN_HOSTS.includes(host)) {
    return { ok: false, reden: "Deze URL kunnen we niet bezoeken" }
  }

  if (VERBODEN_SUFFIX.some((s) => host.endsWith(s))) {
    return { ok: false, reden: "Deze URL kunnen we niet bezoeken" }
  }

  if (isPrivateIP(host)) {
    return { ok: false, reden: "Deze URL kunnen we niet bezoeken" }
  }

  // Moet tenminste één punt hebben (anders geen geldige publieke domeinnaam)
  if (!host.includes(".")) {
    return { ok: false, reden: "Geen geldig domein" }
  }

  return { ok: true, url }
}

// Normalise naar canonieke vorm voor dedup / rate-limit-key.
export function canoniekeUrl(url: URL): string {
  return `${url.protocol}//${url.hostname}${url.pathname === "/" ? "" : url.pathname}`.toLowerCase()
}
