import createMollieClient, { type MollieClient } from "@mollie/api-client"

// Eén Mollie client voor de hele app. Faalt stil als de key ontbreekt —
// de pilot-UI laat dan "betaling nog niet beschikbaar" zien.
let singleton: MollieClient | null = null

export function mollieClient(): MollieClient | null {
  const key = process.env.MOLLIE_API_KEY
  if (!key) return null
  if (!singleton) singleton = createMollieClient({ apiKey: key })
  return singleton
}

export const PILOT_BEDRAG_CENT = 75000
export const PILOT_OMSCHRIJVING = "Werkende proef Future Content"

// Site-URL voor redirects en webhooks. Fallback op Vercel-URL (preview
// deploys) zodat het op elke omgeving klopt.
export function siteUrl(): string | null {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
  )
}

// Mollie eist `x.xx` string-formaat met twee decimalen.
export function centenAlsEuroString(cent: number): string {
  return (cent / 100).toFixed(2)
}
