"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import type { Vraag } from "@/lib/scan/vragen/bibliotheek"
import { track } from "@/lib/scan/analytics/plausible"
import { WhatsAppRondje } from "./WhatsAppRondje"

export type Antwoord = string | string[] | { naam: string; email: string; telefoon: string }

export type VoortgangInfo = {
  huidige: number
  geschatTotaal: number
  isLaatste: boolean
}

// Eerlijke fractie voor de balk: nooit 100% suggereren voordat de laatste
// stap er echt is. De parent bewaakt dat de balk nooit terugloopt.
export function voortgangFractie(v: VoortgangInfo): number {
  if (v.isLaatste) return 0.95
  return Math.min(v.huidige / Math.max(v.geschatTotaal, 1), 0.95)
}

type Props = {
  jobId: string
  eersteVraag: Vraag
  startSlot?: number
}

export function VragenFlow({ jobId, eersteVraag, startSlot = 1 }: Props) {
  const router = useRouter()
  const [huidig, setHuidig] = useState<Vraag>(eersteVraag)
  const [slot, setSlot] = useState(startSlot)
  const [antwoord, setAntwoord] = useState<Antwoord | undefined>(undefined)
  const [bezig, setBezig] = useState(false)
  const [fout, setFout] = useState<string | null>(null)
  // Startschatting: ~5 vragen + email. De server stuurt bij elk antwoord de
  // echte stand mee; de balk loopt nooit terug.
  const [fractie, setFractie] = useState(() =>
    Math.min((startSlot - 1) / 6, 0.95),
  )

  const isEmail = huidig.type === "email-naam"
  const mag = heeftGeldigAntwoord(huidig, antwoord)

  function zetAntwoord(waarde: Antwoord) {
    setAntwoord(waarde)
  }

  async function volgende() {
    if (!mag || bezig) return
    setFout(null)
    setBezig(true)

    try {
      if (isEmail) {
        // Laatste vraag: email+naam → /compleet
        const contact = antwoord as { naam: string; email: string; telefoon: string }
        const res = await fetch(`/api/scan/${jobId}/compleet`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            naam: contact.naam,
            email: contact.email,
            telefoon: contact.telefoon,
            vraagIndex: slot - 1,
            vraagId: huidig.id,
            vraagTitel: huidig.titel,
          }),
        })
        if (!res.ok) throw new Error("compleet-fout")
        track("vraag_6_klaar")
        track("scan_afgerond")
        router.push(`/scan/klaar/${jobId}`)
        return
      }

      const res = await fetch(`/api/scan/${jobId}/antwoord`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vraagIndex: slot - 1,
          vraagId: huidig.id,
          vraagTitel: huidig.titel,
          waarde: antwoord,
        }),
      })
      if (!res.ok) throw new Error("antwoord-fout")
      const data = (await res.json()) as {
        volgende?: Vraag
        voortgang?: VoortgangInfo
      }
      if (!data.volgende) throw new Error("geen-volgende")

      if (slot === 1) track("vraag_1_klaar")
      if (data.voortgang) {
        const nieuw = voortgangFractie(data.voortgang)
        setFractie((oud) => Math.max(oud, nieuw))
      }
      setHuidig(data.volgende)
      setSlot(slot + 1)
      setAntwoord(undefined)
    } catch {
      setFout("Ik kom er even niet door. Probeer het nog eens.")
    } finally {
      setBezig(false)
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-10">
      <Kop
        label={isEmail ? "Laatste stap" : `Vraag ${slot}`}
        fractie={isEmail ? 0.95 : fractie}
        sublabel={isEmail ? undefined : "nog een paar vragen"}
      />

      <div className="mt-10 flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={huidig.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <h2
              className="text-2xl leading-snug md:text-3xl"
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 500,
                color: "var(--color-scan-drukinkt)",
              }}
            >
              {huidig.titel}
            </h2>

            {huidig.helptekst && (
              <p
                className="text-sm"
                style={{ color: "var(--color-scan-muted)" }}
              >
                {huidig.helptekst}
              </p>
            )}

            <VraagVeld
              vraag={huidig}
              waarde={antwoord}
              opWijzig={zetAntwoord}
              opEnter={volgende}
              uitgeschakeld={bezig}
            />

            {/* Alleen bij de eerste vraag: liever direct appen dan de vragen doen */}
            {slot === 1 && (
              <div
                className="mt-2 border-t pt-6"
                style={{ borderColor: "var(--color-scan-border)" }}
              >
                <WhatsAppRondje />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex flex-col items-end gap-2">
        <button
          type="button"
          onClick={volgende}
          disabled={!mag || bezig}
          className="rounded-md px-6 py-3 text-base font-medium text-white transition disabled:opacity-40"
          style={{ backgroundColor: "var(--color-scan-terracotta)" }}
        >
          {bezig
            ? "Momentje…"
            : isEmail
              ? "Laat mijn resultaten zien"
              : "Volgende"}
        </button>
        <Microstatus
          zichtbaar={bezig && !isEmail}
          tekst="Ik kijk even naar je antwoord en pak de volgende vraag."
        />
      </div>

      {fout && (
        <p
          className="mt-4 text-center text-sm"
          style={{ color: "var(--color-scan-error)" }}
        >
          {fout}
        </p>
      )}
    </main>
  )
}

// Kop met determinate voortgangsbalk. Eerlijk: de balk suggereert nooit 100%
// voordat de laatste stap er is, en loopt nooit terug (parent bewaakt dat).
export function Kop({
  label,
  fractie,
  sublabel,
}: {
  label: string
  fractie: number
  sublabel?: string
}) {
  const rustig = useReducedMotion()
  const procent = Math.round(Math.min(Math.max(fractie, 0), 1) * 100)
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <p className="text-sm" style={{ color: "var(--color-scan-muted)" }}>
          {label}
        </p>
        {sublabel && (
          <p className="text-xs" style={{ color: "var(--color-scan-muted)" }}>
            {sublabel}
          </p>
        )}
      </div>
      <div
        className="relative h-1 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: "var(--color-scan-border)" }}
        role="progressbar"
        aria-valuenow={procent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ backgroundColor: "var(--color-scan-terracotta)" }}
          initial={false}
          animate={{ width: `${procent}%` }}
          transition={rustig ? { duration: 0 } : { duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

// Rustige microstatus tijdens de 1-3s dat de volgende vraag wordt bedacht,
// zodat de wachttijd bewust voelt in plaats van een bevroren knop.
export function Microstatus({
  zichtbaar,
  tekst,
}: {
  zichtbaar: boolean
  tekst: string
}) {
  return (
    <AnimatePresence>
      {zichtbaar && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="text-xs"
          style={{ color: "var(--color-scan-muted)" }}
          aria-live="polite"
        >
          {tekst}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

// ─────────────────────────────────────────
// Per-type velden
// ─────────────────────────────────────────

export function VraagVeld({
  vraag,
  waarde,
  opWijzig,
  opEnter,
  uitgeschakeld,
}: {
  vraag: Vraag
  waarde: Antwoord | undefined
  opWijzig: (waarde: Antwoord) => void
  opEnter: () => void
  uitgeschakeld: boolean
}) {
  if (vraag.type === "enkelkeuze") {
    return (
      <Enkelkeuze
        opties={vraag.opties ?? []}
        waarde={typeof waarde === "string" ? waarde : ""}
        opWijzig={opWijzig}
        uitgeschakeld={uitgeschakeld}
      />
    )
  }
  if (vraag.type === "meerkeuze") {
    return (
      <Meerkeuze
        opties={vraag.opties ?? []}
        waarde={Array.isArray(waarde) ? waarde : []}
        opWijzig={opWijzig}
        uitgeschakeld={uitgeschakeld}
      />
    )
  }
  if (vraag.type === "open") {
    return (
      <OpenTekst
        waarde={typeof waarde === "string" ? waarde : ""}
        opWijzig={opWijzig}
        opEnter={opEnter}
        uitgeschakeld={uitgeschakeld}
      />
    )
  }
  return (
    <EmailNaam
      waarde={
        waarde && typeof waarde === "object" && "email" in waarde
          ? waarde
          : { naam: "", email: "", telefoon: "" }
      }
      opWijzig={opWijzig}
      opEnter={opEnter}
      uitgeschakeld={uitgeschakeld}
    />
  )
}

function Enkelkeuze({
  opties,
  waarde,
  opWijzig,
  uitgeschakeld,
}: {
  opties: string[]
  waarde: string
  opWijzig: (waarde: string) => void
  uitgeschakeld: boolean
}) {
  return (
    <div className="flex flex-col gap-3">
      {opties.map((optie) => {
        const actief = waarde === optie
        return (
          <button
            key={optie}
            type="button"
            disabled={uitgeschakeld}
            onClick={() => opWijzig(optie)}
            className="rounded-md border px-4 py-3 text-left text-base transition"
            style={{
              borderColor: actief
                ? "var(--color-scan-terracotta)"
                : "var(--color-scan-border)",
              backgroundColor: actief
                ? "rgba(184,71,42,0.06)"
                : "transparent",
              color: "var(--color-scan-drukinkt)",
            }}
          >
            {optie}
          </button>
        )
      })}
    </div>
  )
}

function Meerkeuze({
  opties,
  waarde,
  opWijzig,
  uitgeschakeld,
}: {
  opties: string[]
  waarde: string[]
  opWijzig: (waarde: string[]) => void
  uitgeschakeld: boolean
}) {
  function wissel(optie: string) {
    if (waarde.includes(optie)) {
      opWijzig(waarde.filter((o) => o !== optie))
      return
    }
    if (waarde.length >= 3) return
    opWijzig([...waarde, optie])
  }

  return (
    <div className="flex flex-col gap-3">
      {opties.map((optie) => {
        const actief = waarde.includes(optie)
        const vol = !actief && waarde.length >= 3
        return (
          <button
            key={optie}
            type="button"
            disabled={uitgeschakeld || vol}
            onClick={() => wissel(optie)}
            className="rounded-md border px-4 py-3 text-left text-base transition disabled:opacity-40"
            style={{
              borderColor: actief
                ? "var(--color-scan-terracotta)"
                : "var(--color-scan-border)",
              backgroundColor: actief
                ? "rgba(184,71,42,0.06)"
                : "transparent",
              color: "var(--color-scan-drukinkt)",
            }}
          >
            {actief ? "✓ " : ""}
            {optie}
          </button>
        )
      })}
      <p className="text-xs" style={{ color: "var(--color-scan-muted)" }}>
        Max 3 opties ({waarde.length}/3 gekozen)
      </p>
    </div>
  )
}

function OpenTekst({
  waarde,
  opWijzig,
  opEnter,
  uitgeschakeld,
}: {
  waarde: string
  opWijzig: (waarde: string) => void
  opEnter: () => void
  uitgeschakeld: boolean
}) {
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <textarea
      ref={ref}
      value={waarde}
      onChange={(e) => opWijzig(e.target.value.slice(0, 500))}
      onKeyDown={(e) => {
        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          opEnter()
        }
      }}
      disabled={uitgeschakeld}
      rows={4}
      placeholder="Typ hier rustig. 1 à 2 zinnen is genoeg."
      className="w-full resize-none rounded-md border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#B45F38]/30"
      style={{
        borderColor: "var(--color-scan-border)",
        backgroundColor: "var(--color-scan-linnen)",
        color: "var(--color-scan-drukinkt)",
      }}
    />
  )
}

function EmailNaam({
  waarde,
  opWijzig,
  opEnter,
  uitgeschakeld,
}: {
  waarde: { naam: string; email: string; telefoon: string }
  opWijzig: (waarde: { naam: string; email: string; telefoon: string }) => void
  opEnter: () => void
  uitgeschakeld: boolean
}) {
  const veldStyle = {
    borderColor: "var(--color-scan-border)",
    backgroundColor: "var(--color-scan-linnen)",
    color: "var(--color-scan-drukinkt)",
  }
  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        autoFocus
        autoComplete="given-name"
        value={waarde.naam}
        onChange={(e) => opWijzig({ ...waarde, naam: e.target.value })}
        disabled={uitgeschakeld}
        placeholder="Je voornaam"
        className="w-full rounded-md border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#B45F38]/30"
        style={veldStyle}
      />
      <input
        type="email"
        inputMode="email"
        autoComplete="email"
        value={waarde.email}
        onChange={(e) => opWijzig({ ...waarde, email: e.target.value })}
        disabled={uitgeschakeld}
        placeholder="je@bedrijf.nl"
        className="w-full rounded-md border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#B45F38]/30"
        style={veldStyle}
      />
      <input
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        value={waarde.telefoon}
        onChange={(e) => opWijzig({ ...waarde, telefoon: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            opEnter()
          }
        }}
        disabled={uitgeschakeld}
        placeholder="Telefoonnummer, zodat ik je kan bellen"
        className="w-full rounded-md border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#B45F38]/30"
        style={veldStyle}
      />
    </div>
  )
}

// ─────────────────────────────────────────
// Validatie per vraag-type
// ─────────────────────────────────────────

export function heeftGeldigAntwoord(
  vraag: Vraag,
  waarde: Antwoord | undefined,
): boolean {
  if (!waarde) return false
  if (vraag.type === "enkelkeuze") {
    return typeof waarde === "string" && waarde.length > 0
  }
  if (vraag.type === "meerkeuze") {
    return Array.isArray(waarde) && waarde.length > 0
  }
  if (vraag.type === "open") {
    return typeof waarde === "string" && waarde.trim().length >= 3
  }
  if (vraag.type === "email-naam") {
    if (typeof waarde !== "object" || Array.isArray(waarde)) return false
    const naamOk = waarde.naam.trim().length >= 2
    const email = waarde.email.trim()
    const emailOk =
      email.length >= 5 &&
      email.length <= 254 &&
      /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)
    // Telefoon is optioneel, maar als 't ingevuld is moet 't kloppen (>= 8 cijfers).
    const tel = waarde.telefoon.trim()
    const telOk = tel.length === 0 || tel.replace(/\D/g, "").length >= 8
    return naamOk && emailOk && telOk
  }
  return false
}
