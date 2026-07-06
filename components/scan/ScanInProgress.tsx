"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { track } from "@/lib/scan/analytics/plausible"
import { AiDisclaimer } from "@/components/scan/AiDisclaimer"

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
  fase?: string
  voortgang?: number
}

const SLIDE_DUUR_MS = 7_000

// Fase-teksten in John's stem, onder de voortgangsbalk.
const FASE_LABEL: Record<string, string> = {
  scrapen: "Ik open je site",
  lezen: "Ik lees je site en kijk naar je aanbod",
  "plan-bouwen": "Ik bouw je plan",
  klaar: "Klaar, we gaan beginnen",
}

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
  const rustig = useReducedMotion()
  const [observaties, setObservaties] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const [fout, setFout] = useState<string | null>(null)
  const [analyse, setAnalyse] = useState<Analyse>(null)
  const [domein, setDomein] = useState<string | null>(null)
  const [seconden, setSeconden] = useState(0)
  const [voortgang, setVoortgang] = useState(0)
  const [fase, setFase] = useState<string>("scrapen")
  const [scrapeMislukt, setScrapeMislukt] = useState(false)
  const [handmatigGedaan, setHandmatigGedaan] = useState(false)
  const klaarRef = useRef(false)
  const redirectRef = useRef(false)
  const handmatigRef = useRef(false)

  // Seconden-teller voor de "duurt langer"-melding, zodat het scherm nooit
  // bevroren lijkt als de scrape traag is.
  useEffect(() => {
    const id = setInterval(() => setSeconden((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  // Polling. Twee vangnetten (go-live audit 2 juli):
  //   1. Een enkele netwerk-blip is niet meteen fataal: tot 3 pogingen
  //      opnieuw (met 3s tussenpoos) voordat de foutmelding verschijnt.
  //   2. Harde bovengrens van 3 minuten: als de scan dan nog niet klaar is,
  //      stoppen we met pollen en tonen we een nette fout i.p.v. eindeloos
  //      te blijven draaien.
  useEffect(() => {
    let actief = true
    let timeoutId: ReturnType<typeof setTimeout>
    let netwerkFouten = 0
    const gestartOp = Date.now()
    const MAX_WACHT_MS = 3 * 60_000

    async function tick() {
      if (Date.now() - gestartOp > MAX_WACHT_MS && !klaarRef.current) {
        setFout("Dit duurt langer dan het hoort. Probeer het zo nog eens.")
        return
      }
      try {
        const res = await fetch(`/api/scan/${jobId}/status`, {
          cache: "no-store",
        })
        if (!res.ok) throw new Error("status-fout")
        const data = (await res.json()) as StatusRespons
        if (!actief) return
        netwerkFouten = 0

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

        // Echte voortgang uit de timestamps; nooit terugspringen.
        if (typeof data.voortgang === "number") {
          const nieuw = data.voortgang
          setVoortgang((v) => Math.max(v, nieuw))
        }
        if (data.fase) setFase(data.fase)

        if (data.gefaald) {
          setFout("Het lukt me niet om je site automatisch te lezen.")
          setScrapeMislukt(true)
          track("scan_mislukt")
          return
        }

        if (data.klaar) {
          // Heeft de bezoeker net om handmatige opvolging gevraagd? Dan niet
          // alsnog doorsturen naar de vragen.
          if (handmatigRef.current) return
          if (!klaarRef.current) track("scan_ready")
          klaarRef.current = true
          setVoortgang(100)
          // Redirect hangt aan de echte 'klaar', niet aan de slide-rotatie.
          // Korte pauze zodat de balk zichtbaar vol loopt.
          if (!redirectRef.current) {
            redirectRef.current = true
            setTimeout(() => router.push(`/scan/vragen/${jobId}`), 1200)
          }
          return
        }

        timeoutId = setTimeout(tick, 1500)
      } catch {
        if (!actief) return
        netwerkFouten += 1
        if (netwerkFouten < 3) {
          // Eén hapering is geen reden om de scan af te breken.
          timeoutId = setTimeout(tick, 3000)
          return
        }
        setFout("Geen verbinding. Probeer het opnieuw.")
      }
    }

    tick()
    return () => {
      actief = false
      clearTimeout(timeoutId)
    }
  }, [jobId])

  // Slide-rotatie: elke 7s door naar de volgende observatie. De redirect
  // gebeurt in de polling zodra de scan echt klaar is (zie hierboven).
  useEffect(() => {
    if (observaties.length === 0) return

    const tussenpoos = setInterval(() => {
      setIndex((huidig) =>
        huidig + 1 >= observaties.length ? observaties.length - 1 : huidig + 1,
      )
    }, SLIDE_DUUR_MS)

    return () => clearInterval(tussenpoos)
  }, [observaties])

  const huidige = observaties[index] ?? "Een moment…"
  const kansen = (analyse?.kansen ?? []).slice(0, 3)
  const traag = seconden >= 30 && !klaarRef.current
  const heelTraag = seconden >= 60 && !klaarRef.current
  // Blijft 'scrapen' hangen na ~14s? Dan lukte de standaard-route niet en graven
  // we dieper. Toon de eerlijke melding + het gratis escape-luik.
  const worstelt =
    !fout && !klaarRef.current && fase === "scrapen" && seconden >= 14

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

      {/* Echte voortgang: determinate balk op basis van de scan-timestamps */}
      <div className="mb-3 w-full max-w-xs">
        <div
          className="relative h-1.5 w-full overflow-hidden rounded-full"
          style={{ backgroundColor: "var(--color-scan-border)" }}
        >
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ backgroundColor: "var(--color-scan-terracotta)" }}
            initial={{ width: "0%" }}
            animate={{ width: `${voortgang}%` }}
            transition={rustig ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>
      <p
        className="mb-10 text-xs uppercase tracking-[0.18em]"
        style={{ color: "var(--color-scan-muted)" }}
        aria-live="polite"
      >
        {FASE_LABEL[fase] ?? FASE_LABEL.scrapen}
      </p>

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

      {handmatigGedaan ? (
        <Bedankt />
      ) : (
        <>
          {traag && !fout && !worstelt && (
            <p
              className="mt-8 text-center text-sm"
              style={{ color: "var(--color-scan-muted)" }}
            >
              {heelTraag
                ? "Het duurt wat langer dan normaal, een grote site kost me meer tijd. Blijf nog heel even."
                : "Een grote site kost me wat meer leestijd, ik ben er bijna."}
            </p>
          )}

          {/* Standaard-route lukte niet: eerlijk melden dat ik dieper graaf, en
              meteen het gratis escape-luik aanbieden. */}
          {worstelt && (
            <div className="mt-8 w-full max-w-md">
              <p
                className="mb-4 text-center text-sm"
                style={{ color: "var(--color-scan-muted)" }}
              >
                Ik kom niet zomaar door je site heen. Ik probeer een andere route, dat kan even duren.
              </p>
              <OpvangKader
                jobId={jobId}
                onGedaan={() => {
                  handmatigRef.current = true
                  setHandmatigGedaan(true)
                }}
              />
            </div>
          )}

          {fout && (
            <div className="mt-8 flex w-full max-w-md flex-col items-center gap-4">
              <p
                className="text-center text-sm"
                style={{ color: "var(--color-scan-error)" }}
              >
                {fout}
              </p>
              {scrapeMislukt ? (
                <OpvangKader
                  jobId={jobId}
                  onGedaan={() => {
                    handmatigRef.current = true
                    setHandmatigGedaan(true)
                  }}
                />
              ) : (
                <Link
                  href="/scan"
                  className="rounded-md px-6 py-2.5 text-base font-medium text-white transition hover:opacity-90"
                  style={{ backgroundColor: "var(--color-scan-terracotta)" }}
                >
                  Opnieuw proberen
                </Link>
              )}
            </div>
          )}
        </>
      )}

      {kansen.length > 0 && (
        <AiDisclaimer className="mt-10 max-w-xl text-center" />
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

// Het gratis escape-luik: laat de bezoeker z'n gegevens achter zodat John de
// site handmatig analyseert. Verschijnt tijdens het diepe graven én als de scan
// helemaal niet lukt, zodat we het verkeer nooit verliezen.
function OpvangKader({
  jobId,
  onGedaan,
}: {
  jobId: string
  onGedaan: () => void
}) {
  const [naam, setNaam] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "bezig" | "fout">("idle")

  async function verstuur(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus("bezig")
    try {
      const res = await fetch(`/api/scan/${jobId}/handmatig`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ naam: naam || undefined, email }),
      })
      if (res.ok) {
        track("scan_handmatig")
        onGedaan()
      } else {
        setStatus("fout")
      }
    } catch {
      setStatus("fout")
    }
  }

  return (
    <div
      className="rounded-xl border px-5 py-4"
      style={{
        borderColor: "var(--color-scan-border)",
        backgroundColor: "var(--color-scan-linnen)",
      }}
    >
      <p
        className="mb-1 text-sm font-semibold"
        style={{ color: "var(--color-scan-drukinkt)" }}
      >
        Niet willen wachten?
      </p>
      <p
        className="mb-3 text-sm"
        style={{ color: "var(--color-scan-muted)" }}
      >
        Laat je gegevens achter, dan analyseer ik je site zelf. Gratis, binnen 24 uur.
      </p>
      <form onSubmit={verstuur} className="flex flex-col gap-2">
        <input
          value={naam}
          onChange={(e) => setNaam(e.target.value)}
          placeholder="Je naam (optioneel)"
          className="rounded-md border px-3 py-2 text-sm"
          style={{ borderColor: "var(--color-scan-border)", backgroundColor: "#fff" }}
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Je e-mailadres"
          className="rounded-md border px-3 py-2 text-sm"
          style={{ borderColor: "var(--color-scan-border)", backgroundColor: "#fff" }}
        />
        <button
          type="submit"
          disabled={status === "bezig"}
          className="rounded-md px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          style={{ backgroundColor: "var(--color-scan-terracotta)" }}
        >
          {status === "bezig" ? "Versturen…" : "Stuur mijn link, kijk zelf even"}
        </button>
        {status === "fout" && (
          <p className="text-xs" style={{ color: "var(--color-scan-error)" }}>
            Er ging iets mis, probeer het nog eens.
          </p>
        )}
      </form>
    </div>
  )
}

function Bedankt() {
  return (
    <div className="mt-8 max-w-md text-center">
      <p
        className="text-2xl"
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          color: "var(--color-scan-drukinkt)",
        }}
      >
        Top, ik kijk er zelf naar.
      </p>
      <p className="mt-2 text-sm" style={{ color: "var(--color-scan-muted)" }}>
        Je hoort binnen 24 uur van me, met wat ik op je site zie.
      </p>
    </div>
  )
}
