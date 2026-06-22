"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { track } from "@/lib/scan/analytics/plausible"

type StatusRespons = {
  jobId: string
  status: string
  observaties: string[]
  klaar: boolean
  gefaald: boolean
}

const SLIDE_DUUR_MS = 7_000

export function ScanInProgress({ jobId }: { jobId: string }) {
  const router = useRouter()
  const [observaties, setObservaties] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const [fout, setFout] = useState<string | null>(null)
  const klaarRef = useRef(false)

  // Polling
  useEffect(() => {
    let actief = true
    let timeoutId: ReturnType<typeof setTimeout>

    async function tick() {
      try {
        const res = await fetch(`/api/scan/${jobId}/status`, {
          cache: "no-store",
        })
        if (!res.ok) throw new Error("status-fout")
        const data = (await res.json()) as StatusRespons
        if (!actief) return

        // Houd referentie stabiel als inhoud gelijk is, anders reset de
        // 7s-slide-timer elke 1.5s-poll en loopt de index nooit door.
        setObservaties((vorige) => {
          const nieuw = data.observaties ?? []
          if (
            vorige.length === nieuw.length &&
            vorige.every((v, i) => v === nieuw[i])
          ) {
            return vorige
          }
          return nieuw
        })

        if (data.gefaald) {
          setFout("Ik kom niet door je site heen. Probeer het zo nog eens.")
          return
        }

        if (data.klaar) {
          if (!klaarRef.current) track("scan_ready")
          klaarRef.current = true
          return
        }

        timeoutId = setTimeout(tick, 1500)
      } catch {
        if (!actief) return
        setFout("Geen verbinding. Probeer het opnieuw.")
      }
    }

    tick()
    return () => {
      actief = false
      clearTimeout(timeoutId)
    }
  }, [jobId])

  // Slide-rotatie: elke 7s door naar de volgende observatie.
  // Bij klaar + laatste slide → redirect naar vragen.
  useEffect(() => {
    if (observaties.length === 0) return

    const tussenpoos = setInterval(() => {
      setIndex((huidig) => {
        const volgend = huidig + 1
        if (volgend >= observaties.length) {
          if (klaarRef.current) {
            router.push(`/scan/vragen/${jobId}`)
          }
          return observaties.length - 1
        }
        return volgend
      })
    }, SLIDE_DUUR_MS)

    return () => clearInterval(tussenpoos)
  }, [observaties, jobId, router])

  const huidige = observaties[index] ?? "Een moment…"

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6">
      <div
        className="mb-10 h-1 w-32 overflow-hidden rounded-full"
        style={{ backgroundColor: "var(--color-scan-border)" }}
      >
        <div
          className="h-full animate-pulse"
          style={{
            backgroundColor: "var(--color-scan-terracotta)",
            width: "60%",
          }}
        />
      </div>

      <div className="flex min-h-[6rem] w-full items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={`${index}-${huidige}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center text-2xl leading-relaxed md:text-3xl"
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontWeight: 400,
              color: "var(--color-scan-drukinkt)",
            }}
          >
            {huidige}
          </motion.p>
        </AnimatePresence>
      </div>

      {fout && (
        <p
          className="mt-8 text-center text-sm"
          style={{ color: "var(--color-scan-error)" }}
        >
          {fout}
        </p>
      )}
    </main>
  )
}
