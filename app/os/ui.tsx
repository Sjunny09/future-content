"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

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
  const [bericht, setBericht] = useState("")
  const [mailStatus, setMailStatus] = useState<"idle" | "bezig" | "ok" | "fout">("idle")
  const [mailFout, setMailFout] = useState("")

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

  async function stuurMail() {
    if (!url.trim()) {
      setMailStatus("fout")
      setMailFout("Plak eerst de link.")
      return
    }
    if (!window.confirm("Video-mail nu naar de klant sturen?")) return
    setMailStatus("bezig")
    setMailFout("")
    const res = await fetch(`/api/os/lead/${leadId}/video-mail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, persoonlijkBericht: bericht }),
    })
    if (res.ok) {
      setMailStatus("ok")
    } else {
      const data = (await res.json().catch(() => ({}))) as { fout?: string }
      setMailStatus("fout")
      setMailFout(data.fout ?? "Versturen mislukte.")
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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
          {status === "bezig" ? "..." : status === "ok" ? "Opgeslagen" : verstuurd ? "Bijwerken" : "Link opslaan"}
        </button>
        {status === "fout" && <span style={{ color: "#B8472A", fontSize: 12 }}>Fout, check de link.</span>}
      </form>

      <textarea
        value={bericht}
        onChange={(e) => setBericht(e.target.value)}
        placeholder="Persoonlijk zinnetje bovenaan de mail (optioneel)"
        rows={2}
        style={{
          width: "100%", padding: "7px 10px", border: `1px solid ${BORDER}`,
          borderRadius: 7, fontSize: 13, resize: "vertical", fontFamily: "inherit",
        }}
      />
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={stuurMail}
          disabled={mailStatus === "bezig"}
          style={{
            padding: "7px 12px", background: INK, color: "#fff", border: "none",
            borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}
        >
          {mailStatus === "bezig" ? "Versturen..." : mailStatus === "ok" ? "Video-mail verstuurd" : "Stuur video-mail"}
        </button>
        {mailStatus === "ok" && (
          <span style={{ color: "#3F7A4E", fontSize: 12 }}>Staat nu bij Verstuurde mails.</span>
        )}
        {mailStatus === "fout" && <span style={{ color: "#B8472A", fontSize: 12 }}>{mailFout}</span>}
      </div>
    </div>
  )
}

// Periode-kiezer voor het dashboard: twee sleepbare knoppen (begin + eind) plus
// datum-invulvelden. Beide grenzen zijn instelbaar tussen minIso en maxIso (vandaag).
// De keuze komt als ?van=...&tot=... in de URL; de server haalt dan de cijfers voor
// die periode op. Tijdens slepen updatet alleen het label; navigeren bij loslaten,
// zodat we niet elke stap herladen. Het openstaande detail-paneel blijft behouden.
export function DatumBereik({
  minIso,
  maxIso,
  vanIso,
  totIso,
  detail,
}: {
  minIso: string
  maxIso: string
  vanIso: string
  totIso: string
  detail?: string
}) {
  const router = useRouter()
  const DAG = 86400000
  const parse = (iso: string) => {
    const [y, m, d] = iso.split("-").map(Number)
    return Date.UTC(y, m - 1, d)
  }
  const minMs = parse(minIso)
  const maxMs = parse(maxIso)
  const totaal = Math.max(1, Math.round((maxMs - minMs) / DAG))
  const clamp = (n: number) => Math.min(totaal, Math.max(0, n))

  const [vanIdx, setVanIdx] = useState(clamp(Math.round((parse(vanIso) - minMs) / DAG)))
  const [totIdx, setTotIdx] = useState(clamp(Math.round((parse(totIso) - minMs) / DAG)))

  const isoVan = (i: number) => new Date(minMs + i * DAG).toISOString().slice(0, 10)
  const fmt = (i: number) =>
    new Intl.DateTimeFormat("nl-NL", {
      day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
    }).format(new Date(minMs + i * DAG))

  const commit = (v: number, t: number) => {
    const staart = detail ? `&detail=${detail}` : ""
    router.push(`/os?tab=dashboard&van=${isoVan(v)}&tot=${isoVan(t)}${staart}`)
  }

  // Grenzen kunnen elkaar niet passeren: van <= tot.
  const opVan = (n: number) => setVanIdx(Math.min(clamp(n), totIdx))
  const opTot = (n: number) => setTotIdx(Math.max(clamp(n), vanIdx))

  const dagen = totIdx - vanIdx + 1
  const vanPct = (vanIdx / totaal) * 100
  const totPct = (totIdx / totaal) * 100

  const CARD = "#FBF8F2", BORDER2 = "#E4D8C6", INK2 = "#2A2218", MUTED2 = "#6E6151"
  const inputStijl: React.CSSProperties = {
    padding: "6px 8px", border: `1px solid ${BORDER2}`, borderRadius: 7, fontSize: 13,
    color: INK2, background: "#fff",
  }

  return (
    <div style={{ background: CARD, border: `1px solid ${BORDER2}`, borderRadius: 14, padding: "16px 18px", marginBottom: 16 }}>
      <style>{`
        .fc-dual { position: relative; height: 34px; }
        .fc-dual .track { position:absolute; top:15px; left:0; right:0; height:4px; background:#E4D8C6; border-radius:2px; }
        .fc-dual .fill { position:absolute; top:15px; height:4px; background:#B45F38; border-radius:2px; }
        .fc-dual input[type=range] { position:absolute; top:0; left:0; width:100%; height:34px; margin:0; background:none; -webkit-appearance:none; appearance:none; pointer-events:none; }
        .fc-dual input[type=range]::-webkit-slider-runnable-track { background:none; border:none; }
        .fc-dual input[type=range]::-moz-range-track { background:none; border:none; }
        .fc-dual input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; appearance:none; pointer-events:auto; height:18px; width:18px; margin-top:8px; border-radius:50%; background:#B45F38; border:2px solid #fff; box-shadow:0 1px 3px rgba(0,0,0,.28); cursor:pointer; }
        .fc-dual input[type=range]::-moz-range-thumb { pointer-events:auto; height:18px; width:18px; border-radius:50%; background:#B45F38; border:2px solid #fff; box-shadow:0 1px 3px rgba(0,0,0,.28); cursor:pointer; }
        .fc-dual input.van { z-index:4; }
        .fc-dual input.tot { z-index:5; }
      `}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
        <div style={{ fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", color: MUTED2, fontWeight: 700 }}>
          Periode
        </div>
        <div style={{ fontSize: 13.5, color: INK2 }}>
          <strong>{fmt(vanIdx)}</strong> tot <strong>{fmt(totIdx)}</strong>{" "}
          <span style={{ color: MUTED2 }}>· {dagen} {dagen === 1 ? "dag" : "dagen"}</span>
        </div>
      </div>

      <div className="fc-dual">
        <div className="track" />
        <div className="fill" style={{ left: `${vanPct}%`, right: `${100 - totPct}%` }} />
        <input
          className="van" type="range" min={0} max={totaal} value={vanIdx}
          onChange={(e) => opVan(Number(e.target.value))}
          onMouseUp={() => commit(vanIdx, totIdx)}
          onTouchEnd={() => commit(vanIdx, totIdx)}
          onKeyUp={() => commit(vanIdx, totIdx)}
        />
        <input
          className="tot" type="range" min={0} max={totaal} value={totIdx}
          onChange={(e) => opTot(Number(e.target.value))}
          onMouseUp={() => commit(vanIdx, totIdx)}
          onTouchEnd={() => commit(vanIdx, totIdx)}
          onKeyUp={() => commit(vanIdx, totIdx)}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: MUTED2, marginTop: 4 }}>
        <span>{fmt(0)}</span>
        <span>vandaag</span>
      </div>

      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginTop: 12 }}>
        <label style={{ fontSize: 12, color: MUTED2, display: "flex", alignItems: "center", gap: 6 }}>
          Van
          <input
            type="date" value={isoVan(vanIdx)} min={minIso} max={isoVan(totIdx)}
            onChange={(e) => {
              if (!e.target.value) return
              const nv = Math.min(clamp(Math.round((parse(e.target.value) - minMs) / DAG)), totIdx)
              setVanIdx(nv)
              commit(nv, totIdx)
            }}
            style={inputStijl}
          />
        </label>
        <label style={{ fontSize: 12, color: MUTED2, display: "flex", alignItems: "center", gap: 6 }}>
          tot
          <input
            type="date" value={isoVan(totIdx)} min={isoVan(vanIdx)} max={maxIso}
            onChange={(e) => {
              if (!e.target.value) return
              const nt = Math.max(clamp(Math.round((parse(e.target.value) - minMs) / DAG)), vanIdx)
              setTotIdx(nt)
              commit(vanIdx, nt)
            }}
            style={inputStijl}
          />
        </label>
      </div>
    </div>
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
