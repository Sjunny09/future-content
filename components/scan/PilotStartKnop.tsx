"use client"

import { useState } from "react"

type Props = {
  jobId: string
  stripeActief: boolean
}

export function PilotStartKnop({ jobId, stripeActief }: Props) {
  const [bezigMet, setBezigMet] = useState<"ideal" | "card" | null>(null)
  const [fout, setFout] = useState<string | null>(null)

  async function start(provider: "mollie" | "stripe") {
    setFout(null)
    setBezigMet(provider === "mollie" ? "ideal" : "card")
    try {
      const res = await fetch(`/api/betaling/${provider}/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      })
      const data = (await res.json()) as
        | { checkoutUrl: string }
        | { fout: string }

      if (!res.ok || !("checkoutUrl" in data)) {
        const bericht = "fout" in data ? data.fout : "Betaling kon niet gestart worden."
        setFout(bericht)
        setBezigMet(null)
        return
      }

      window.location.href = data.checkoutUrl
    } catch {
      setFout("Geen verbinding. Probeer het zo nog eens.")
      setBezigMet(null)
    }
  }

  const bezig = bezigMet !== null

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => start("mollie")}
        disabled={bezig}
        className="rounded-md px-6 py-3 text-base font-medium text-white transition disabled:opacity-40"
        style={{ backgroundColor: "var(--color-scan-terracotta)" }}
      >
        {bezigMet === "ideal" ? "Even bezig…" : "Betaal €750 met iDEAL"}
      </button>

      {stripeActief && (
        <button
          type="button"
          onClick={() => start("stripe")}
          disabled={bezig}
          className="text-sm underline underline-offset-4 disabled:opacity-40"
          style={{ color: "var(--color-scan-muted)" }}
        >
          {bezigMet === "card" ? "Even bezig…" : "Of betaal met creditcard"}
        </button>
      )}

      {fout && (
        <p
          className="text-sm"
          style={{ color: "var(--color-scan-error)" }}
        >
          {fout}
        </p>
      )}
    </div>
  )
}
