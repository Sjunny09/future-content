"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { track } from "@/lib/scan/analytics/plausible"

// Exit-intent: als de muis naar de bovenrand van het venster vlucht (clientY
// onder 6px), laat dan één keer per sessie een modal zien met Cal-embed.
// Mobiel heeft geen hover, dus daar valt de modal niet in — voor mobiel
// is de Cal-link in de klaar-pagina de primaire route.
//
// Gedrag:
// - Alleen op desktop (geen touch-only)
// - Max 1x per sessie (sessionStorage flag)
// - 5s grace-period na page-load: niemand verlaat de pagina in de eerste
//   seconden behalve per ongeluk. Dat willen we niet triggeren.

type Props = {
  calUrl: string | null
}

const SESSIE_KEY = "fc:exit-intent:getoond"
const GRACE_MS = 5_000
const TOP_DREMPEL_PX = 6

export function ExitIntentModal({ calUrl }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!calUrl) return
    if (typeof window === "undefined") return

    // Touch-only device: skip.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return
    }

    // Al getoond deze sessie: skip.
    try {
      if (sessionStorage.getItem(SESSIE_KEY) === "1") return
    } catch {
      // sessionStorage kan ontbreken in private mode — laten we dan maar gaan.
    }

    const paginaLaadTijd = Date.now()

    function opMouseLeave(e: MouseEvent) {
      if (e.clientY > TOP_DREMPEL_PX) return
      if (Date.now() - paginaLaadTijd < GRACE_MS) return
      document.removeEventListener("mouseleave", opMouseLeave)
      try {
        sessionStorage.setItem(SESSIE_KEY, "1")
      } catch {
        // idem — niet kritisch.
      }
      setOpen(true)
    }

    document.addEventListener("mouseleave", opMouseLeave)
    return () => document.removeEventListener("mouseleave", opMouseLeave)
  }, [calUrl])

  function sluit() {
    setOpen(false)
  }

  // Cal.com embed stuurt een postMessage zodra er geboekt is. Daar
  // luisteren we naar — niet naar iframe-load, want dat gebeurt bij
  // openen, niet bij boeken.
  useEffect(() => {
    if (!open) return
    function opBericht(e: MessageEvent) {
      const data = e.data as { type?: unknown; namespace?: unknown } | null
      if (
        data &&
        typeof data === "object" &&
        typeof data.type === "string" &&
        (data.type === "bookingSuccessful" || data.type === "booking_successful")
      ) {
        track("gesprek_geboekt")
      }
    }
    window.addEventListener("message", opBericht)
    return () => window.removeEventListener("message", opBericht)
  }, [open])

  if (!calUrl) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={sluit}
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-intent-titel"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.99 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={sluit}
              aria-label="Sluit"
              className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-xl leading-none backdrop-blur hover:bg-white"
              style={{ color: "var(--color-scan-drukinkt)" }}
            >
              ×
            </button>

            <div className="px-6 pb-2 pt-8 sm:px-8">
              <h2
                id="exit-intent-titel"
                className="text-2xl md:text-3xl"
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontWeight: 500,
                  color: "var(--color-scan-drukinkt)",
                }}
              >
                Of wil je het eerst even bellen?
              </h2>
              <p
                className="mt-3 text-base"
                style={{ color: "var(--color-scan-drukinkt)" }}
              >
                Geen verkooppraatje. 20 minuten waarin ik kort vertel wat ik
                zag, en jij vertelt waar jullie nu staan.
              </p>
            </div>

            <div className="px-2 pb-4 sm:px-4">
              <iframe
                src={calUrl}
                title="Plan een kennismaking"
                loading="lazy"
                className="h-[520px] w-full rounded-md border-0"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
