"use client"

import { useState } from "react"

// Vrij opmerkingenveld op de eindpagina. De klant kan hier context kwijt
// (bijzonderheden, een vraag, iets wat de scan niet ving). Slaat op naar de
// database via /api/scan/[jobId]/opmerking, zodat John het in de OS terugziet.
// Fail-soft: gaat opslaan mis, dan zien we een rustige melding, geen crash.

export function OpmerkingVeld({ jobId }: { jobId: string }) {
  const [tekst, setTekst] = useState("")
  const [status, setStatus] = useState<"idle" | "bezig" | "klaar" | "fout">("idle")

  async function opslaan() {
    if (!tekst.trim() || status === "bezig") return
    setStatus("bezig")
    try {
      const res = await fetch(`/api/scan/${jobId}/opmerking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opmerking: tekst.trim() }),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean }
      setStatus(res.ok && data.ok ? "klaar" : "fout")
    } catch {
      setStatus("fout")
    }
  }

  if (status === "klaar") {
    return (
      <div
        className="rounded-2xl border p-4"
        style={{
          borderColor: "var(--color-scan-border)",
          backgroundColor: "var(--color-scan-linnen)",
        }}
      >
        <p className="text-sm" style={{ color: "var(--color-scan-drukinkt)" }}>
          Dankjewel, ik heb je opmerking erbij genoteerd.
        </p>
      </div>
    )
  }

  return (
    <div>
      <label
        htmlFor="scan-opmerking"
        className="text-xs uppercase tracking-[0.2em]"
        style={{ color: "var(--color-scan-muted)" }}
      >
        Iets wat ik moet weten? (optioneel)
      </label>
      <textarea
        id="scan-opmerking"
        value={tekst}
        onChange={(e) => {
          setTekst(e.target.value.slice(0, 2000))
          if (status !== "idle") setStatus("idle")
        }}
        rows={3}
        placeholder="Een bijzonderheid, een vraag, of iets wat de scan niet ving."
        className="mt-2 w-full resize-none rounded-md border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#B45F38]/30"
        style={{
          borderColor: "var(--color-scan-border)",
          backgroundColor: "var(--color-scan-linnen)",
          color: "var(--color-scan-drukinkt)",
        }}
      />
      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="text-xs" style={{ color: "var(--color-scan-muted)" }}>
          {status === "fout" ? "Opslaan lukte even niet, probeer het nog eens." : ""}
        </span>
        <button
          type="button"
          onClick={opslaan}
          disabled={!tekst.trim() || status === "bezig"}
          className="rounded-md px-4 py-2 text-sm font-medium text-white transition disabled:opacity-40"
          style={{ backgroundColor: "var(--color-scan-terracotta)" }}
        >
          {status === "bezig" ? "Even…" : "Bewaar mijn opmerking"}
        </button>
      </div>
    </div>
  )
}
