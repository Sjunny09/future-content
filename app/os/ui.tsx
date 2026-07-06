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

// Globale schakelaar: zet de automatische resultaten-mail naar leads aan of uit.
// Werkt direct (schrijft naar de Setting-tabel), geen redeploy nodig.
export function MailSchakelaar({ aan }: { aan: boolean }) {
  const [state, setState] = useState(aan)
  const [bezig, setBezig] = useState(false)

  async function toggle() {
    setBezig(true)
    const res = await fetch("/api/os/mail-schakelaar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ aan: !state }),
    })
    setBezig(false)
    if (res.ok) setState(!state)
  }

  return (
    <button
      onClick={toggle}
      disabled={bezig}
      title="Zet de automatische resultaten-mail naar leads aan of uit. Test-leads worden sowieso nooit gemaild."
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "9px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600,
        cursor: "pointer", border: `1px solid ${state ? "#4E7A51" : "#B8472A"}`,
        background: state ? "#EEF4EE" : "#F7EBE7", color: state ? "#2F5B33" : "#8B2C1C",
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: 8, background: state ? "#4E7A51" : "#B8472A" }} />
      {bezig ? "..." : `Mails naar leads: ${state ? "AAN" : "UIT"}`}
    </button>
  )
}

// Uitloggen uit /os: wist het fc_os-cookie en herlaadt naar het inlogscherm.
export function UitlogKnop() {
  const [bezig, setBezig] = useState(false)

  async function uitloggen() {
    setBezig(true)
    await fetch("/api/os/logout", { method: "POST" })
    window.location.reload()
  }

  return (
    <button
      onClick={uitloggen}
      disabled={bezig}
      style={{
        padding: "9px 12px", borderRadius: 8, fontSize: 12.5, fontWeight: 600,
        cursor: "pointer", border: `1px solid ${BORDER}`, background: "#fff", color: "#6E6151",
      }}
    >
      {bezig ? "..." : "Uitloggen"}
    </button>
  )
}

// Per lead: markeer als test (verhuist naar het test-tabblad) of terug naar
// actueel. Herlaadt zodat de lead meteen naar het juiste tabblad springt.
export function TestToggle({ leadId, isTest }: { leadId: string; isTest: boolean }) {
  const [bezig, setBezig] = useState(false)

  async function toggle() {
    setBezig(true)
    const res = await fetch(`/api/os/lead/${leadId}/test`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isTest: !isTest }),
    })
    if (res.ok) {
      window.location.reload()
    } else {
      setBezig(false)
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={bezig}
      style={{
        padding: "6px 12px", borderRadius: 7, fontSize: 12.5, fontWeight: 600,
        cursor: "pointer", border: `1px solid ${BORDER}`, background: "#fff",
        color: isTest ? "#2F5B33" : "#8B6B2C",
      }}
    >
      {bezig ? "..." : isTest ? "↩ Terug naar actueel" : "Markeer als test"}
    </button>
  )
}

// Bel-workflow per lead: markeer gebeld en schrijf feedback weg naar de lead.
export function BelBlok({
  leadId,
  gebeld: gebeldInit,
  belnotitie: notitieInit,
}: {
  leadId: string
  gebeld: boolean
  belnotitie: string | null
}) {
  const [gebeld, setGebeld] = useState(gebeldInit)
  const [notitie, setNotitie] = useState(notitieInit ?? "")
  const [status, setStatus] = useState<"idle" | "bezig" | "ok" | "fout">("idle")

  async function opslaan(nieuwGebeld: boolean) {
    setStatus("bezig")
    const res = await fetch(`/api/os/lead/${leadId}/bellen`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gebeld: nieuwGebeld, belnotitie: notitie }),
    })
    setStatus(res.ok ? "ok" : "fout")
    if (res.ok) setGebeld(nieuwGebeld)
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <button
          onClick={() => opslaan(!gebeld)}
          disabled={status === "bezig"}
          style={{
            padding: "6px 12px", borderRadius: 7, fontSize: 13, fontWeight: 700, cursor: "pointer",
            border: `1px solid ${gebeld ? "#4E7A51" : "#E4D8C6"}`,
            background: gebeld ? "#EEF4EE" : "#fff", color: gebeld ? "#2F5B33" : "#6E6151",
          }}
        >
          {gebeld ? "✓ Gebeld" : "Markeer als gebeld"}
        </button>
        {status === "ok" && <span style={{ color: "#4E7A51", fontSize: 12 }}>Opgeslagen</span>}
        {status === "fout" && <span style={{ color: "#B8472A", fontSize: 12 }}>Opslaan mislukt</span>}
      </div>
      <textarea
        value={notitie}
        onChange={(e) => setNotitie(e.target.value)}
        placeholder="Feedback na het bellen (blijft bij deze lead)..."
        rows={3}
        style={{
          width: "100%", padding: "9px 11px", border: "1px solid #E4D8C6", borderRadius: 8,
          fontSize: 13, fontFamily: "inherit", resize: "vertical", boxSizing: "border-box",
        }}
      />
      <div>
        <button
          onClick={() => opslaan(gebeld)}
          disabled={status === "bezig"}
          style={{
            padding: "7px 14px", borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: "pointer",
            border: "none", background: "#B45F38", color: "#fff",
          }}
        >
          {status === "bezig" ? "..." : "Feedback opslaan"}
        </button>
      </div>
    </div>
  )
}

// Mail-controle per lead: zet de automatische mails naar deze ene lead aan/uit.
export function MailPerLead({ leadId, mailUit: mailUitInit }: { leadId: string; mailUit: boolean }) {
  const [mailUit, setMailUit] = useState(mailUitInit)
  const [bezig, setBezig] = useState(false)

  async function toggle() {
    setBezig(true)
    const res = await fetch(`/api/os/lead/${leadId}/mail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // staat mail nu UIT, dan willen we 'm AAN zetten (en andersom)
      body: JSON.stringify({ mailAan: mailUit }),
    })
    setBezig(false)
    if (res.ok) setMailUit(!mailUit)
  }

  const aan = !mailUit
  return (
    <button
      onClick={toggle}
      disabled={bezig}
      style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        padding: "6px 12px", borderRadius: 7, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
        border: `1px solid ${aan ? "#4E7A51" : "#B8472A"}`,
        background: aan ? "#EEF4EE" : "#F7EBE7", color: aan ? "#2F5B33" : "#8B2C1C",
      }}
    >
      <span style={{ width: 7, height: 7, borderRadius: 7, background: aan ? "#4E7A51" : "#B8472A" }} />
      {bezig ? "..." : `Mails naar deze lead: ${aan ? "AAN" : "UIT"}`}
    </button>
  )
}
