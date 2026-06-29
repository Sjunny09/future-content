"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { track } from "@/lib/scan/analytics/plausible"

type Kans = { titel: string; beschrijving?: string }
type Analyse = { branche?: string; niche?: string; kansen?: Kans[] } | null

type StatusRespons = {
  jobId: string
  status: string
  observaties: string[]
  klaar: boolean
  gefaald: boolean
  analyse?: Analyse
  url?: string
}

const SLIDE_DUUR_MS = 7_000

function domeinUit(url?: string): string | null {
  if (!url) return null
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`)
    return u.hostname.replace(/^www\./, "")
  } catch {
    return null
  }
}

export function ScanInProgress({ jobId }: { jobId: string }) {
  const router = useRouter()
  const [observaties, setObservaties] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const [fout, setFout] = useState<string | null>(null)
  const [analyse, setAnalyse] = useState<Analyse>(null)
  const [domein, setDomein] = useState<string | null>(null)
  const [seconden, setSeconden] = useState(0)
  const klaarRef = useRef(false)

  // Seconden-teller voor de "duurt langer"-melding, zodat het scherm nooit
  // bevroren lijkt als de scrape traag is.
  useEffect(() => {
    const id = setInterval(() => setSeconden((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

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
        // 7s-slide-timer elke poll en loopt de index nooit door.
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

        if (data.analyse) setAnalyse(data.analyse)
        if (data.url) setDomein(domeinUit(data.url))

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
  const kansen = (analyse?.kansen ?? []).slice(0, 3)
  const traag = seconden >= 30 && !klaarRef.current
  const heelTraag = seconden >= 60 && !klaarRef.current

  return (
    <main className="relative mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center overflow-hidden px-6 py-16">
      {/* Subtiele scan-sweep over het scherm, in de scan-stijl (één terracotta-accent) */}
      {!fout && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--color-scan-terracotta), transparent)",
            opacity: 0.18,
            filter: "blur(1px)",
          }}
          initial={{ top: "0%" }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Bedrijfsspecifiek: domein + branche, zodra de analyse er is */}
      <AnimatePresence>
        {(domein || analyse?.branche) && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-wrap items-center justify-center gap-2"
          >
            {domein && <Pill>{domein}</Pill>}
            {analyse?.branche && <Pill>{analyse.branche}</Pill>}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="relative mb-10 h-1 w-32 overflow-hidden rounded-full"
        style={{ backgroundColor: "var(--color-scan-border)" }}
      >
        <motion.div
          className="absolute inset-y-0 w-1/3 rounded-full"
          style={{ backgroundColor: "var(--color-scan-terracotta)" }}
          animate={{ x: ["-40%", "260%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
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

      {/* De 3 kansen bouwen zich op (titels), als teaser voor het rapport */}
      {kansen.length > 0 && (
        <div className="mt-12 w-full">
          <p
            className="mb-4 text-center text-xs uppercase tracking-[0.2em]"
            style={{ color: "var(--color-scan-muted)" }}
          >
            Wat ik alvast zie
          </p>
          <div className="flex flex-col gap-3">
            {kansen.map((k, i) => (
              <motion.div
                key={k.titel}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.5 }}
                className="flex items-center gap-3 rounded-xl border px-4 py-3"
                style={{
                  borderColor: "var(--color-scan-border)",
                  backgroundColor: "var(--color-scan-linnen)",
                }}
              >
                <span
                  className="text-sm font-bold"
                  style={{ color: "var(--color-scan-terracotta)" }}
                >
                  0{i + 1}
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--color-scan-drukinkt)" }}
                >
                  {k.titel}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {traag && !fout && (
        <p
          className="mt-8 text-center text-sm"
          style={{ color: "var(--color-scan-muted)" }}
        >
          {heelTraag
            ? "Het duurt wat langer dan normaal, een grote site kost me meer tijd. Blijf nog heel even."
            : "Ik lees je site grondig, dit kan tot een halve minuut duren."}
        </p>
      )}

      {fout && (
        <div className="mt-8 flex flex-col items-center gap-4">
          <p
            className="text-center text-sm"
            style={{ color: "var(--color-scan-error)" }}
          >
            {fout}
          </p>
          <Link
            href="/scan"
            className="rounded-md px-6 py-2.5 text-base font-medium text-white transition hover:opacity-90"
            style={{ backgroundColor: "var(--color-scan-terracotta)" }}
          >
            Opnieuw proberen
          </Link>
        </div>
      )}
    </main>
  )
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-full border px-3 py-1 text-xs font-medium"
      style={{
        borderColor: "var(--color-scan-border)",
        color: "var(--color-scan-drukinkt)",
        backgroundColor: "var(--color-scan-linnen)",
      }}
    >
      {children}
    </span>
  )
}
