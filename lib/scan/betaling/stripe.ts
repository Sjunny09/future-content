import Stripe from "stripe"

// Stripe-client singleton. Fallback voor als Mollie/iDEAL faalt — zie
// 03_ceo_synthese.md §1.10 en bouwplan Sprint 4. Cards-only, geen iDEAL
// via Stripe (dat is Mollie's territorium).
let singleton: Stripe | null = null

export function stripeClient(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return null
  if (!singleton) {
    // apiVersion niet pinnen — laat Stripe-SDK de default kiezen die bij
    // deze versie hoort. Lagere kans op version-drift bij SDK-updates.
    singleton = new Stripe(key)
  }
  return singleton
}
