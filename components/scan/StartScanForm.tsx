"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { track } from "@/lib/scan/analytics/plausible"

export function StartScanForm() {
  const router = useRouter()
  const [url, setUrl] = useState("")
  const [bezig, setBezig] = useState(false)
  const [fout, setFout] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (bezig) return
    setFout(null)
    setBezig(true)

    try {
      const res = await fetch("/api/scan/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { fout?: string }
        setFout(data.fout ?? "Er ging iets mis. Probeer het nog eens.")
        setBezig(false)
        return
      }

      const { jobId } = (await res.json()) as { jobId: string }
      track("scan_start")
      router.push(`/scan/bezig/${jobId}`)
    } catch {
      setFout("Geen verbinding. Probeer het nog eens.")
      setBezig(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-xl">
      <label
        htmlFor="scan-url"
        className="mb-2 block text-sm"
        style={{ color: "var(--color-scan-muted)" }}
      >
        Je website
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="scan-url"
          name="url"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="bijv. jebedrijf.nl"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={bezig}
          required
          className="flex-1 rounded-md border bg-white px-4 py-3.5 text-base outline-none transition focus:border-[var(--color-scan-terracotta)] focus:ring-2 focus:ring-[var(--color-scan-terracotta)]/20 disabled:opacity-60"
          style={{
            borderColor: "var(--color-scan-border)",
            color: "var(--color-scan-drukinkt)",
          }}
        />
        <button
          type="submit"
          disabled={bezig || !url.trim()}
          className="rounded-md px-6 py-3.5 text-base font-medium transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            backgroundColor: "var(--color-scan-terracotta)",
            color: "#FAF9F5",
          }}
        >
          {bezig ? "Een moment…" : "Start met mijn bedrijf"}
        </button>
      </div>

      {fout && (
        <p
          className="mt-3 text-sm"
          style={{ color: "var(--color-scan-error)" }}
          role="alert"
        >
          {fout}
        </p>
      )}
    </form>
  )
}
