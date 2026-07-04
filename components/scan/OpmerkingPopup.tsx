"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { OpmerkingVeld } from "./OpmerkingVeld"

// Popup rechtsonder op het quickscan-eindscherm: verschijnt 5 seconden na
// het laden en nodigt uit om een opmerking achter te laten. Zelfde veld en
// zelfde API als het inline OpmerkingVeld, alleen zichtbaarder.
// Eén keer per sessie per scan: na wegklikken (of tonen) niet blijven zeuren.

const TOON_NA_MS = 5_000

export function OpmerkingPopup({ jobId }: { jobId: string }) {
  const rustig = useReducedMotion()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const sleutel = `fc-opmerking-popup-${jobId}`
    try {
      if (sessionStorage.getItem(sleutel)) return
    } catch {
      // sessionStorage niet beschikbaar: popup gewoon één keer tonen
    }
    const timer = setTimeout(() => {
      setOpen(true)
      try {
        sessionStorage.setItem(sleutel, "getoond")
      } catch {
        // niks aan de hand
      }
    }, TOON_NA_MS)
    return () => clearTimeout(timer)
  }, [jobId])

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={rustig ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={rustig ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={rustig ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-4 right-4 z-40 w-[calc(100vw-2rem)] max-w-sm rounded-2xl border p-5 shadow-lg"
          style={{
            borderColor: "var(--color-scan-border)",
            backgroundColor: "var(--color-scan-linnen)",
          }}
          role="dialog"
          aria-label="Opmerkingen achterlaten"
        >
          <div className="flex items-start justify-between gap-3">
            <p
              className="text-base font-semibold"
              style={{ color: "var(--color-scan-drukinkt)" }}
            >
              Nog iets kwijt?
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Sluiten"
              className="rounded-md px-2 py-0.5 text-lg leading-none transition hover:opacity-70"
              style={{ color: "var(--color-scan-muted)" }}
            >
              &times;
            </button>
          </div>
          <p
            className="mt-1 text-sm leading-relaxed"
            style={{ color: "var(--color-scan-muted)" }}
          >
            Mocht je nog opmerkingen of vragen hebben, laat ze dan vooral hier
            achter. Ik neem ze mee.
          </p>
          <div className="mt-3">
            <OpmerkingVeld jobId={jobId} />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
