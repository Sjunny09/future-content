"use client"

import { useState } from "react"
import { SITE, BOOKING } from "@/lib/constants"
import { WhatsAppGlyph, AgendaGlyph, KoffieGlyph, MailGlyph } from "./ContactIcons"

// Vier manieren om na de quick scan direct contact te leggen:
//   1. WhatsApp  → wa.me met korte opener
//   2. Afspraak  → cal.eu (Cal.com)
//   3. Mail      → opent de mail met een korte, ingevulde vraag
//   4. Bak koffie → opent de mail met een warme, ingevulde uitnodiging
//
// Koffie-afbeelding (John levert aan): public/images/john-koffie.png
//   → vierkant/rond bruikbaar, valt terug op een koffie-glyph als 'ie ontbreekt.

const KOFFIE_FOTO = "/images/john-koffie.png"

const WA_TEKST =
  "Hoi John, ik deed net je AI-scan en werd nieuwsgierig. Kunnen we even sparren?"

const MAIL_ONDERWERP = "Naar aanleiding van je AI-scan"
const MAIL_BODY = `Hoi John,

Ik heb net je AI-scan gedaan en werd er wel nieuwsgierig van. Ik ben benieuwd wat dit concreet voor mijn bedrijf kan betekenen.

Groet,`

const KOFFIE_ONDERWERP = "Zullen we een keer koffie doen?"
const KOFFIE_BODY = `Hoi John,

Ik heb net je AI-scan gedaan en werd er nieuwsgierig van. Zullen we een keer een bak koffie doen om het te bespreken?

Groet,`

export function DirectContact() {
  const [fotoKapot, setFotoKapot] = useState(false)

  const waUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(WA_TEKST)}`
  const calUrl = `https://${BOOKING.calHost}/${BOOKING.calUser}/${BOOKING.calEvent}`
  const mailUrl = `mailto:${SITE.email}?subject=${encodeURIComponent(
    MAIL_ONDERWERP,
  )}&body=${encodeURIComponent(MAIL_BODY)}`
  const koffieUrl = `mailto:${SITE.email}?subject=${encodeURIComponent(
    KOFFIE_ONDERWERP,
  )}&body=${encodeURIComponent(KOFFIE_BODY)}`

  return (
    <div
      className="rounded-2xl border-2 p-5"
      style={{ borderColor: "var(--color-scan-terracotta)", backgroundColor: "rgba(184,71,42,0.05)" }}
    >
      <p className="text-base font-semibold" style={{ color: "var(--color-scan-terracotta)" }}>
        Liever direct contact?
      </p>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-scan-muted)" }}>
        Kies wat bij je past, ik reageer zelf.
      </p>

      <div className="mt-4 flex flex-col gap-2.5">
        {/* WhatsApp */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="plausible-event-name=WhatsApp-klik group flex items-center gap-3 rounded-md px-4 py-3.5 text-white shadow-sm transition hover:opacity-90"
          style={{ backgroundColor: "#25D366" }}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20">
            <WhatsAppGlyph className="h-5 w-5" />
          </span>
          <span className="text-sm font-semibold">Stuur me een appje</span>
        </a>

        {/* Afspraak via cal.eu */}
        <a
          href={calUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-md border px-4 py-3 transition hover:opacity-90"
          style={{ borderColor: "var(--color-scan-border)" }}
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{
              backgroundColor: "rgba(184,71,42,0.10)",
              color: "var(--color-scan-terracotta)",
            }}
          >
            <AgendaGlyph className="h-5 w-5" />
          </span>
          <span className="text-sm font-medium" style={{ color: "var(--color-scan-drukinkt)" }}>
            Plan direct een afspraak
          </span>
        </a>

        {/* Mail → mail met korte, ingevulde vraag */}
        <a
          href={mailUrl}
          className="group flex items-center gap-3 rounded-md border px-4 py-3 transition hover:opacity-90"
          style={{ borderColor: "var(--color-scan-border)" }}
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{
              backgroundColor: "rgba(184,71,42,0.10)",
              color: "var(--color-scan-terracotta)",
            }}
          >
            <MailGlyph className="h-5 w-5" />
          </span>
          <span className="text-sm font-medium" style={{ color: "var(--color-scan-drukinkt)" }}>
            Stuur me een mail
          </span>
        </a>

        {/* Bak koffie → mail met warme, ingevulde uitnodiging */}
        <a
          href={koffieUrl}
          className="group flex items-center gap-3 rounded-md border px-4 py-3 transition hover:opacity-90"
          style={{ borderColor: "var(--color-scan-border)" }}
        >
          <span
            className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full"
            style={{
              backgroundColor: "rgba(184,71,42,0.10)",
              color: "var(--color-scan-terracotta)",
            }}
          >
            {!fotoKapot ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={KOFFIE_FOTO}
                alt=""
                onError={() => setFotoKapot(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <KoffieGlyph className="h-5 w-5" />
            )}
          </span>
          <span>
            <span className="block text-sm font-medium" style={{ color: "var(--color-scan-drukinkt)" }}>
              Kom een keer koffie doen
            </span>
            <span className="block text-xs" style={{ color: "var(--color-scan-muted)" }}>
              Ik kom graag langs wanneer je in de buurt van Bladel woont
            </span>
          </span>
        </a>
      </div>
    </div>
  )
}
