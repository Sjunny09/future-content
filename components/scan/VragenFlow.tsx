"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import type { Vraag } from "@/lib/scan/vragen/bibliotheek"
import { track } from "@/lib/scan/analytics/plausible"

type Antwoord = string | string[] | { naam: string; email: string }

type Props = {
  jobId: string
  vragen: Vraag[]
}

export function VragenFlow({ jobId, vragen }: Props) {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const [antwoorden, setAntwoorden] = useState<Record<number, Antwoord>>({})
  const [bezig, setBezig] = useState(false)
  const [fout, setFout] = useState<string | null>(null)

  const huidig = vragen[index]
  const totaal = vragen.length
  const laatste = index === totaal - 1
  const huidigAntwoord = antwoorden[index]
  const mag = heeftGeldigAntwoord(huidig, huidigAntwoord)

  function zetAntwoord(waarde: Antwoord) {
    setAntwoorden((h) => ({ ...h, [index]: waarde }))
  }

  async function terug() {
    if (index === 0 || bezig) return
    setFout(null)
    setIndex(index - 1)
  }

  async function volgende() {
    if (!mag || bezig) return
    setFout(null)
    setBezig(true)

    try {
      const waarde = antwoorden[index]

      if (laatste) {
        // Laatste vraag: email+naam → /compleet
        const contact = waarde as { naam: string; email: string }
        const res = await fetch(`/api/scan/${jobId}/compleet`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            naam: contact.naam,
            email: contact.email,
            vraagIndex: index,
            vraagId: huidig.id,
            vraagTitel: huidig.titel,
          }),
        })
        if (!res.ok) throw new Error("compleet-fout")
        track("vraag_6_klaar")
        router.push(`/scan/klaar/${jobId}`)
        return
      }

      const res = await fetch(`/api/scan/${jobId}/antwoord`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vraagIndex: index,
          vraagId: huidig.id,
          vraagTitel: huidig.titel,
          waarde,
        }),
      })
      if (!res.ok) throw new Error("antwoord-fout")
      if (index === 0) track("vraag_1_klaar")
      setIndex(index + 1)
    } catch {
      setFout("Ik kom er even niet door. Probeer het nog eens.")
    } finally {
      setBezig(false)
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-10">
      <Kop index={index} totaal={totaal} opTerug={terug} />

      <div className="mt-10 flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${index}-${huidig.id}`}
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
              waarde={huidigAntwoord}
              opWijzig={zetAntwoord}
              opEnter={volgende}
              uitgeschakeld={bezig}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          onClick={terug}
          disabled={index === 0 || bezig}
          className="text-sm underline underline-offset-4 disabled:opacity-30"
          style={{ color: "var(--color-scan-muted)" }}
        >
          ← Terug
        </button>

        <button
          type="button"
          onClick={volgende}
          disabled={!mag || bezig}
          className="rounded-md px-6 py-3 text-base font-medium text-white transition disabled:opacity-40"
          style={{ backgroundColor: "var(--color-scan-terracotta)" }}
        >
          {bezig ? "Even…" : laatste ? "Klaar, stuur de video" : "Volgende"}
        </button>
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

function Kop({
  index,
  totaal,
  opTerug,
}: {
  index: number
  totaal: number
  opTerug: () => void
}) {
  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={opTerug}
        disabled={index === 0}
        className="text-sm disabled:opacity-30"
        style={{ color: "var(--color-scan-muted)" }}
        aria-label="Terug"
      >
        ←
      </button>
      <p className="text-sm" style={{ color: "var(--color-scan-muted)" }}>
        {index + 1} van {totaal}
      </p>
      <span className="w-4" aria-hidden />
    </div>
  )
}

// ─────────────────────────────────────────
// Per-type velden
// ─────────────────────────────────────────

function VraagVeld({
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
          : { naam: "", email: "" }
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
      placeholder="Typ hier rustig — 1 à 2 zinnen is genoeg."
      className="w-full resize-none rounded-md border px-4 py-3 text-base focus:outline-none focus:ring-2"
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
  waarde: { naam: string; email: string }
  opWijzig: (waarde: { naam: string; email: string }) => void
  opEnter: () => void
  uitgeschakeld: boolean
}) {
  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        autoFocus
        value={waarde.naam}
        onChange={(e) => opWijzig({ ...waarde, naam: e.target.value })}
        disabled={uitgeschakeld}
        placeholder="Je voornaam"
        className="w-full rounded-md border px-4 py-3 text-base focus:outline-none"
        style={{
          borderColor: "var(--color-scan-border)",
          backgroundColor: "var(--color-scan-linnen)",
          color: "var(--color-scan-drukinkt)",
        }}
      />
      <input
        type="email"
        value={waarde.email}
        onChange={(e) => opWijzig({ ...waarde, email: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            opEnter()
          }
        }}
        disabled={uitgeschakeld}
        placeholder="je@bedrijf.nl"
        className="w-full rounded-md border px-4 py-3 text-base focus:outline-none"
        style={{
          borderColor: "var(--color-scan-border)",
          backgroundColor: "var(--color-scan-linnen)",
          color: "var(--color-scan-drukinkt)",
        }}
      />
    </div>
  )
}

// ─────────────────────────────────────────
// Validatie per vraag-type
// ─────────────────────────────────────────

function heeftGeldigAntwoord(
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
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(waarde.email.trim())
    return naamOk && emailOk
  }
  return false
}
