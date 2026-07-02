import { BOOKING } from "@/lib/constants"

/**
 * Herbruikbare Cal.com-CTA. Eén bron van waarheid voor "plan een afspraak"
 * over de hele site heen (scan-flow, en straks ook landing/AI-pagina —
 * die worden door andere agenten aangesloten, dit component alleen bouwen).
 *
 * calUser/calEvent/calHost komen uit lib/constants.ts (BOOKING). Als
 * BOOKING.calUser leeg is, tonen we een duidelijk gemarkeerde fallback
 * i.p.v. een kapotte link — zie CAL_USERNAME_ONTBREEKT hieronder.
 */

const CAL_USERNAME_ONTBREEKT = !BOOKING.calUser

export const calBoekingUrl = CAL_USERNAME_ONTBREEKT
  ? null
  : `https://${BOOKING.calHost}/${BOOKING.calUser}/${BOOKING.calEvent}`

export const calEmbedUrl = CAL_USERNAME_ONTBREEKT
  ? null
  : `${calBoekingUrl}?embed=true&theme=light`

type Variant = "primary" | "secondary" | "text"

type Props = {
  label?: string
  variant?: Variant
  className?: string
  /** Extra context in de link voor analytics, bv. "hero", "scan-klaar". */
  bron?: string
}

const VARIANT_STYLES: Record<Variant, { className: string; style: React.CSSProperties }> = {
  primary: {
    className:
      "inline-flex items-center gap-2 rounded-md px-5 py-3 text-base font-medium text-white transition-opacity hover:opacity-90",
    style: { backgroundColor: "var(--color-scan-terracotta)" },
  },
  secondary: {
    className:
      "inline-flex items-center gap-2 rounded-md border px-5 py-3 text-base font-medium transition-colors hover:bg-black/[0.03]",
    style: {
      borderColor: "var(--color-scan-border)",
      color: "var(--color-scan-drukinkt)",
    },
  },
  text: {
    className: "inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline",
    style: { color: "var(--color-scan-terracotta)" },
  },
}

/**
 * "Direct een afspraak boeken" CTA. Placeholder-safe: als BOOKING.calUser
 * leeg is (CAL_USERNAME niet ingevuld), toont dit component een duidelijke
 * disabled-staat in plaats van een kapotte cal.com-link.
 */
export function BookingCTA({
  label = `Plan direct ${BOOKING.duration}`,
  variant = "primary",
  className,
  bron,
}: Props) {
  const { className: variantClass, style } = VARIANT_STYLES[variant]

  if (CAL_USERNAME_ONTBREEKT || !calBoekingUrl) {
    return (
      <span
        className={`${variantClass} cursor-not-allowed opacity-60 ${className ?? ""}`}
        style={style}
        title="CAL_USERNAME ontbreekt in lib/constants.ts (BOOKING.calUser) — koppel Cal.com eerst"
      >
        Agenda binnenkort beschikbaar
      </span>
    )
  }

  const href = bron ? `${calBoekingUrl}?utm_source=${encodeURIComponent(bron)}` : calBoekingUrl

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${variantClass} ${className ?? ""}`}
      style={style}
    >
      {label}
    </a>
  )
}
