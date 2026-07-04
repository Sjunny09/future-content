"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import type { Vraag } from "@/lib/scan/vragen/bibliotheek"
import {
  VraagVeld,
  heeftGeldigAntwoord,
  Kop,
  Microstatus,
  voortgangFractie,
  type Antwoord,
  type VoortgangInfo,
} from "@/components/scan/VragenFlow"

type Props = {
  jobId: string
  eersteVraag: Vraag
  startSlot?: number
}

// De uitgebreide scan: zelfde look als de quickscan-vragen, maar dieper en zonder
// email-stap (gegevens zijn al binnen). Eindigt met een afspraak inplannen.
export function DiepteFlow({ jobId, eersteVraag, startSlot = 1 }: Props) {
  const router = useRouter()
  const [huidig, setHuidig] = useState<Vraag>(eersteVraag)
  const [slot, setSlot] = useState(startSlot)
  const [antwoord, setAntwoord] = useState<Antwoord | undefined>(undefined)
  const [bezig, setBezig] = useState(false)
  const [fout, setFout] = useState<string | null>(null)
  // Startschatting: minstens 8 diepe vragen. Server stuurt de echte stand mee.
  const [fractie, setFractie] = useState(() =>
    Math.min((startSlot - 1) / 8, 0.95),
  )

  const mag = heeftGeldigAntwoord(huidig, antwoord)

  async function volgende() {
    if (!mag || bezig) return
    setFout(null)
    setBezig(true)

    try {
      const res = await fetch(`/api/scan/${jobId}/diepte/antwoord`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vraagId: huidig.id,
          vraagTitel: huidig.titel,
          waarde: antwoord,
        }),
      })
      if (!res.ok) throw new Error("antwoord-fout")
      const data = (await res.json()) as {
        volgende?: Vraag | null
        klaar?: boolean
        voortgang?: VoortgangInfo
      }

      if (data.voortgang) {
        const nieuw = voortgangFractie(data.voortgang)
        setFractie((oud) => Math.max(oud, nieuw))
      }

      if (data.klaar || !data.volgende) {
        // Klaar: afronden (zet status + maakt diagnose) en door naar de afspraak.
        const af = await fetch(`/api/scan/${jobId}/diepte/afronden`, { method: "POST" })
        if (!af.ok) throw new Error("afronden-fout")
        router.push(`/scan/diepte/klaar/${jobId}`)
        return
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
        label={`Verdieping ${slot}`}
        fractie={fractie}
        sublabel="nog een paar vragen"
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
              <p className="text-sm" style={{ color: "var(--color-scan-muted)" }}>
                {huidig.helptekst}
              </p>
            )}

            <VraagVeld
              vraag={huidig}
              waarde={antwoord}
              opWijzig={(waarde) => setAntwoord(waarde)}
              opEnter={volgende}
              uitgeschakeld={bezig}
            />
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
          {bezig ? "Momentje…" : "Volgende"}
        </button>
        <Microstatus
          zichtbaar={bezig}
          tekst="Ik kijk even naar je antwoord en denk de volgende vraag uit."
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
