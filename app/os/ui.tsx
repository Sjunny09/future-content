"use client"

import { useState } from "react"

const GOLD = "#C9A96E"
const INK = "#1A1A18"
const BORDER = "#E5E0D8"

export function OsLogin() {
  const [token, setToken] = useState("")
  const [fout, setFout] = useState("")
  const [bezig, setBezig] = useState(false)

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setBezig(true)
    setFout("")
    const res = await fetch("/api/os/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
    setBezig(false)
    if (res.ok) {
      window.location.reload()
    } else {
      setFout("Onjuist wachtwoord.")
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: "120px auto", padding: 24 }}>
      <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: 26, marginBottom: 4 }}>
        Future Content OS
      </h1>
      <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 20 }}>Leads-overzicht. Even inloggen.</p>
      <form onSubmit={login}>
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="wachtwoord"
          autoFocus
          style={{
            width: "100%", padding: "11px 13px", border: `1px solid ${BORDER}`,
            borderRadius: 8, fontSize: 15, marginBottom: 12,
          }}
        />
        <button
          type="submit"
          disabled={bezig}
          style={{
            width: "100%", padding: "11px", background: INK, color: "#fff",
            border: "none", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer",
          }}
        >
          {bezig ? "Bezig..." : "Inloggen"}
        </button>
        {fout && <p style={{ color: "#B8472A", fontSize: 13, marginTop: 10 }}>{fout}</p>}
      </form>
    </div>
  )
}

export function VideoForm({
  leadId,
  bestaandeUrl,
  verstuurd,
}: {
  leadId: string
  bestaandeUrl: string | null
  verstuurd: boolean
}) {
  const [url, setUrl] = useState(bestaandeUrl ?? "")
  const [status, setStatus] = useState<"idle" | "bezig" | "ok" | "fout">("idle")

  async function opslaan(e: React.FormEvent) {
    e.preventDefault()
    setStatus("bezig")
    const res = await fetch(`/api/os/lead/${leadId}/video`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })
    setStatus(res.ok ? "ok" : "fout")
  }

  return (
    <form onSubmit={opslaan} style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Loom- of STACK-link plakken"
        style={{
          flex: "1 1 220px", padding: "7px 10px", border: `1px solid ${BORDER}`,
          borderRadius: 7, fontSize: 13,
        }}
      />
      <button
        type="submit"
        disabled={status === "bezig"}
        style={{
          padding: "7px 12px", background: verstuurd ? "#fff" : GOLD,
          color: verstuurd ? INK : "#fff", border: verstuurd ? `1px solid ${BORDER}` : "none",
          borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: "pointer",
        }}
      >
        {status === "bezig" ? "..." : status === "ok" ? "Opgeslagen" : verstuurd ? "Bijwerken" : "Markeer verstuurd"}
      </button>
      {status === "fout" && <span style={{ color: "#B8472A", fontSize: 12 }}>Fout, check de link.</span>}
    </form>
  )
}
