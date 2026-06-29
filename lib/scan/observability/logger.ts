// Centrale error-reporter voor de scan-flow. Scrubt PII (email/tel/postcode)
// voordat er iets gelogd wordt. Eén ingang zodat we straks 1-op-1 naar
// Sentry kunnen swappen zonder alle callsites aan te passen.
//
// Zolang SENTRY_DSN ontbreekt → console.error met gescrubde payload.
// Wanneer DSN er is, vervang dit met `Sentry.captureException(scrub(err), { extra: scrub(ctx) })`.

const PII_REGEX: Array<{ re: RegExp; vervang: string }> = [
  { re: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, vervang: "[EMAIL]" },
  { re: /\b(?:\+?31[\s-]?|0)6[\s-]?\d{2}[\s-]?\d{2}[\s-]?\d{2}[\s-]?\d{2}\b/g, vervang: "[TEL]" },
  { re: /\b\d{4}\s?[A-Z]{2}\b/g, vervang: "[PC]" },
]

function scrubString(s: string): string {
  let uit = s
  for (const { re, vervang } of PII_REGEX) uit = uit.replace(re, vervang)
  return uit
}

function scrub(waarde: unknown, diepte = 0): unknown {
  if (diepte > 4) return "[depth-limit]"
  if (typeof waarde === "string") return scrubString(waarde)
  if (waarde instanceof Error) {
    return {
      name: waarde.name,
      message: scrubString(waarde.message),
      stack: waarde.stack ? scrubString(waarde.stack) : undefined,
    }
  }
  if (Array.isArray(waarde)) return waarde.map((v) => scrub(v, diepte + 1))
  if (waarde && typeof waarde === "object") {
    return Object.fromEntries(
      Object.entries(waarde).map(([k, v]) => [k, scrub(v, diepte + 1)]),
    )
  }
  return waarde
}

export function reportError(
  err: unknown,
  context: Record<string, unknown> = {},
): void {
  const schoneErr = scrub(err)
  const schoneCtx = scrub(context)
  console.error("[scan:error]", schoneErr, schoneCtx)
}
