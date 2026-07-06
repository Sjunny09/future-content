import type { Metadata } from "next"
import { cookies } from "next/headers"
import { db } from "@/lib/scan/db"
import { mailsNaarLeadsAan } from "@/lib/scan/settings"
import { OsLogin, VideoForm, MailSchakelaar, TestToggle, UitlogKnop, BelBlok, MailPerLead } from "./ui"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Interne backoffice: nooit indexeren.
export const metadata: Metadata = {
  title: "Future Content OS",
  robots: { index: false, follow: false },
}

const GOLD = "#B45F38"
const INK = "#2A2218"
const BORDER = "#E4D8C6"
const MUTED = "#6E6151"
const BG = "#F3ECE0"
const CARD = "#FBF8F2"

type Kans = { titel?: string; beschrijving?: string }
type Analyse = { branche?: string; niche?: string; tone?: string; kansen?: Kans[] } | null
type Diagnose = {
  advies?: string
  kop?: string
  onderbouwing?: string
  signalen?: string[]
  vervolg?: string
} | null

function domein(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

function dt(d: Date | null | undefined): string {
  if (!d) return "—"
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
  }).format(new Date(d))
}

// Hoe lang de bezoeker in de scan zat, uit de bestaande timestamps.
function duur(start?: Date | null, eind?: Date | null): string {
  if (!start || !eind) return "—"
  const sec = Math.max(0, Math.round((new Date(eind).getTime() - new Date(start).getTime()) / 1000))
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return m > 0 ? `${m} min ${s} sec` : `${s} sec`
}

function waardeTekst(w: unknown): string {
  if (Array.isArray(w)) return w.join(", ")
  if (typeof w === "string") return w
  if (w && typeof w === "object") return JSON.stringify(w)
  return String(w ?? "—")
}

function videoStatus(deadline: Date | null, verstuurdOp: Date | null): { tekst: string; kleur: string } {
  if (verstuurdOp) return { tekst: `video verstuurd ${dt(verstuurdOp)}`, kleur: "#4E7A51" }
  if (!deadline) return { tekst: "geen deadline", kleur: MUTED }
  const urenOver = (new Date(deadline).getTime() - Date.now()) / 36e5
  if (urenOver < 0) return { tekst: "deadline verstreken", kleur: "#B8472A" }
  return { tekst: `video nog ${Math.round(urenOver)}u`, kleur: urenOver < 6 ? "#B8472A" : INK }
}

const diagnoseKleur: Record<string, string> = {
  bouw: "#4E7A51",
  training: "#B45F38",
  zelf: MUTED,
}

function tabStijl(actief: boolean): React.CSSProperties {
  return {
    padding: "8px 14px",
    fontSize: 14,
    fontWeight: 600,
    color: actief ? INK : MUTED,
    borderBottom: actief ? `2px solid ${GOLD}` : "2px solid transparent",
    textDecoration: "none",
    marginBottom: -1,
  }
}

function mailSoortLabel(soort: string): string {
  if (soort === "resultaten") return "Resultaten-mail"
  if (soort === "john_notificatie") return "Notificatie aan jou"
  if (soort === "herinnering") return "Herinnering"
  return soort
}

function mailStatusPil(status: string): React.CSSProperties {
  const kleur = status === "verstuurd" ? "#4E7A51" : status === "mislukt" ? "#B8472A" : MUTED
  return {
    fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em",
    color: "#fff", background: kleur, padding: "1px 7px", borderRadius: 20,
  }
}

// De 24u-herinnering vuurt op createdAt + 20u, maar alleen als 'ie nog niet
// verstuurd is, John de video nog niet stuurde, en de lead niet test/mail-uit is.
function geplandeHerinnering(
  video: { createdAt: Date; herinneringVerstuurd: boolean; verstuurdOp: Date | null } | undefined,
  lead: { isTest: boolean; mailUit: boolean },
  mailsAan: boolean,
): Date | null {
  if (!video || video.herinneringVerstuurd || video.verstuurdOp) return null
  if (lead.isTest || lead.mailUit || !mailsAan) return null
  return new Date(new Date(video.createdAt).getTime() + 20 * 60 * 60 * 1000)
}

export default async function OsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const token = (await cookies()).get("fc_os")?.value
  const ok = process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN
  if (!ok) return <OsLogin />

  const rawTab = (await searchParams).tab
  const tab = rawTab === "test" ? "test" : rawTab === "dashboard" ? "dashboard" : "actueel"

  // ── Dashboard-tab: scan-funnel-cijfers uit Neon (read-only aggregaties) ──
  if (tab === "dashboard") {
    const now = new Date()
    const startVandaag = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekGeleden = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const [
      actueelCount, testCount, scansGestart, scansAfgerond, scansMislukt,
      analyseGelukt, diepteVoltooid, leadsGebeld, scansVandaag, scansWeek,
    ] = await Promise.all([
      db.lead.count({ where: { isTest: false } }),
      db.lead.count({ where: { isTest: true } }),
      db.scanJob.count({ where: { isTest: false } }),
      db.scanJob.count({ where: { isTest: false, status: "completed" } }),
      db.scanJob.count({ where: { isTest: false, status: "failed" } }),
      db.scanJob.count({ where: { isTest: false, status: { in: ["ready", "answering", "completed"] } } }),
      db.scanJob.count({ where: { isTest: false, diepteStatus: "voltooid" } }),
      db.lead.count({ where: { isTest: false, gebeld: true } }),
      db.scanJob.count({ where: { isTest: false, startedAt: { gte: startVandaag } } }),
      db.scanJob.count({ where: { isTest: false, startedAt: { gte: weekGeleden } } }),
    ])
    const pct = (a: number, b: number) => (b > 0 ? Math.round((a / b) * 100) : 0)
    const tegels: { label: string; waarde: number; sub: string }[] = [
      { label: "Scans gestart", waarde: scansGestart, sub: "sinds de start (echt, excl. test)" },
      { label: "Analyse gelukt", waarde: analyseGelukt, sub: `${pct(analyseGelukt, scansGestart)}% van gestart` },
      { label: "Scans afgerond", waarde: scansAfgerond, sub: `${pct(scansAfgerond, scansGestart)}% van gestart` },
      { label: "Leads (contact)", waarde: actueelCount, sub: `${pct(actueelCount, scansGestart)}% van gestart` },
      { label: "Uitgebreide scan", waarde: diepteVoltooid, sub: "diepte voltooid" },
      { label: "Gebeld", waarde: leadsGebeld, sub: `van ${actueelCount} leads` },
      { label: "Mislukt bij scrape", waarde: scansMislukt, sub: `${pct(scansMislukt, scansGestart)}% van gestart` },
      { label: "Vandaag gestart", waarde: scansVandaag, sub: `deze week: ${scansWeek}` },
    ]
    const tegelLabel: React.CSSProperties = {
      fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase",
      color: MUTED, fontWeight: 700, marginBottom: 8,
    }
    return (
      <main style={{ background: BG, minHeight: "100vh", padding: "40px 20px", color: INK }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <header style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: MUTED, fontWeight: 600 }}>
              Future Content OS
            </div>
            <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: 30, marginTop: 4 }}>Scan-funnel</h1>
          </header>

          <div style={{ display: "flex", gap: 6, marginBottom: 20, borderBottom: `1px solid ${BORDER}` }}>
            <a href="/os" style={tabStijl(false)}>Actueel · {actueelCount}</a>
            <a href="/os?tab=test" style={tabStijl(false)}>Test · {testCount}</a>
            <a href="/os?tab=dashboard" style={tabStijl(true)}>Dashboard</a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
            {tegels.map((t) => (
              <div key={t.label} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "18px" }}>
                <div style={tegelLabel}>{t.label}</div>
                <div style={{ fontSize: 34, fontWeight: 800, lineHeight: 1, fontFamily: "var(--font-playfair)" }}>{t.waarde}</div>
                <div style={{ fontSize: 12.5, color: MUTED, marginTop: 6 }}>{t.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "16px 18px" }}>
            <div style={tegelLabel}>De trechter</div>
            <div style={{ fontSize: 14, lineHeight: 1.7 }}>
              {scansGestart} gestart → {analyseGelukt} analyse gelukt → {scansAfgerond} afgerond → {actueelCount} leads → {diepteVoltooid} uitgebreide scan → {leadsGebeld} gebeld
            </div>
          </div>

          <p style={{ color: MUTED, fontSize: 12, marginTop: 18 }}>
            Bron = Neon (Postgres), read-only. De trechter begint bij een gestarte scan (URL ingevuld); wie de /scan-pagina alleen opende zonder te starten zit niet in de database (dat is Plausible-data). Test-scans staan apart in het Test-tabblad. Beveiligd met ADMIN_TOKEN.
          </p>
        </div>
      </main>
    )
  }

  const isTestFilter = tab === "test"

  const [leads, actueelCount, testCount, mailsAan] = await Promise.all([
    db.lead.findMany({
      where: { isTest: isTestFilter },
      orderBy: { createdAt: "desc" },
      take: 200,
      include: {
        scans: {
          orderBy: { startedAt: "desc" },
          take: 1,
          include: {
            antwoorden: {
              orderBy: { createdAt: "asc" },
              select: { vraagId: true, vraagTitel: true, waarde: true, createdAt: true },
            },
          },
        },
        loomVideos: { orderBy: { createdAt: "desc" }, take: 1 },
        mailLogs: { orderBy: { createdAt: "desc" }, take: 12 },
      },
    }),
    db.lead.count({ where: { isTest: false } }),
    db.lead.count({ where: { isTest: true } }),
    mailsNaarLeadsAan(),
  ])

  const label: React.CSSProperties = {
    fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase",
    color: MUTED, fontWeight: 700, marginBottom: 6,
  }

  return (
    <main style={{ background: BG, minHeight: "100vh", padding: "40px 20px", color: INK }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16, gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: MUTED, fontWeight: 600 }}>
              Future Content OS
            </div>
            <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: 30, marginTop: 4 }}>Leads uit de Quickscan</h1>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <MailSchakelaar aan={mailsAan} />
            <UitlogKnop />
          </div>
        </header>

        <div style={{ display: "flex", gap: 6, marginBottom: 20, borderBottom: `1px solid ${BORDER}` }}>
          <a href="/os" style={tabStijl(tab === "actueel")}>Actueel · {actueelCount}</a>
          <a href="/os?tab=test" style={tabStijl(tab === "test")}>Test · {testCount}</a>
          <a href="/os?tab=dashboard" style={tabStijl(false)}>Dashboard</a>
        </div>

        {leads.length === 0 ? (
          <p style={{ color: MUTED, fontSize: 15, padding: "40px 0" }}>
            {tab === "test"
              ? "Nog geen test-leads. Scans die je zelf doet terwijl je in /os bent ingelogd, komen hier."
              : "Nog geen leads. Zodra iemand de Quickscan afrondt, verschijnt die hier."}
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {leads.map((lead) => {
              const scan = lead.scans[0]
              const video = lead.loomVideos[0]
              const analyse = (scan?.analyseJson ?? null) as Analyse
              const diagnose = (scan?.diagnoseJson ?? null) as Diagnose
              const bedrijf = lead.bedrijfsnaam || (scan ? domein(scan.url) : "—")
              const vs = video ? videoStatus(video.deadline, video.verstuurdOp) : { tekst: "—", kleur: MUTED }
              const antwoorden = scan?.antwoorden ?? []
              const diepAntw = antwoorden.filter((a) => a.vraagId.startsWith("DV"))
              const gepland = geplandeHerinnering(video, lead, mailsAan)

              return (
                <details key={lead.id} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, overflow: "hidden" }}>
                  {/* Samenvattingsregel (klik om uit te klappen) */}
                  <summary style={{ listStyle: "none", cursor: "pointer", padding: "16px 18px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 16px" }}>
                    <span style={{ fontWeight: 700, fontSize: 15, minWidth: 160 }}>{bedrijf}</span>
                    <span style={{ color: MUTED, fontSize: 13 }}>{lead.naam || "—"}</span>
                    <span style={{ color: MUTED, fontSize: 13 }}>{dt(lead.createdAt)}</span>
                    {scan?.diepteStatus === "voltooid" && (
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: GOLD, padding: "2px 8px", borderRadius: 20 }}>
                        uitgebreide scan
                      </span>
                    )}
                    {lead.gebeld && (
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#2F5B33", background: "#DCEBDD", padding: "2px 8px", borderRadius: 20 }}>
                        gebeld
                      </span>
                    )}
                    <span style={{ marginLeft: "auto", color: vs.kleur, fontSize: 12, fontWeight: 600 }}>{vs.tekst}</span>
                  </summary>

                  {/* Uitgeklapt: het volledige prospect-onderzoek */}
                  <div style={{ borderTop: `1px solid ${BORDER}`, padding: "18px", display: "grid", gap: 18 }}>
                    {/* Contact + site + tijd */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
                      <div>
                        <div style={label}>Contact</div>
                        <div>{lead.naam || "—"}</div>
                        <div style={{ color: MUTED, fontSize: 13 }}>
                          <a href={`mailto:${lead.email}`} style={{ color: INK }}>{lead.email}</a>
                        </div>
                        {lead.telefoon && (
                          <div style={{ color: MUTED, fontSize: 13 }}>
                            <a href={`tel:${lead.telefoon}`} style={{ color: INK }}>{lead.telefoon}</a>
                          </div>
                        )}
                      </div>
                      <div>
                        <div style={label}>Website</div>
                        {scan ? (
                          <a href={scan.url} target="_blank" rel="noreferrer" style={{ color: GOLD, fontWeight: 600, wordBreak: "break-all" }}>
                            {domein(scan.url)} ↗
                          </a>
                        ) : "—"}
                      </div>
                      <div>
                        <div style={label}>Tijd in de scan</div>
                        <div>{duur(scan?.startedAt, scan?.completedAt)}</div>
                        <div style={{ color: MUTED, fontSize: 12 }}>
                          {antwoorden.length} antwoorden{diepAntw.length > 0 ? ` · ${diepAntw.length} uit de diepe scan` : ""}
                        </div>
                      </div>
                    </div>

                    {/* Bellen + feedback */}
                    <div>
                      <div style={label}>Bellen</div>
                      <BelBlok leadId={lead.id} gebeld={lead.gebeld} belnotitie={lead.belnotitie} />
                    </div>

                    {/* AI-analyse */}
                    {analyse && (
                      <div>
                        <div style={label}>Wat de AI zag</div>
                        {analyse.branche && <div style={{ fontSize: 14 }}>{analyse.branche}</div>}
                        {analyse.niche && <div style={{ color: MUTED, fontSize: 13, marginTop: 2 }}>{analyse.niche}</div>}
                        {Array.isArray(analyse.kansen) && analyse.kansen.length > 0 && (
                          <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: 13 }}>
                            {analyse.kansen.slice(0, 3).map((k, i) => (
                              <li key={i} style={{ marginBottom: 3 }}>
                                <strong>{k.titel}</strong>
                                {k.beschrijving ? <span style={{ color: MUTED }}> — {k.beschrijving}</span> : null}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}

                    {/* Alle vragen + antwoorden */}
                    {antwoorden.length > 0 && (
                      <div>
                        <div style={label}>Vragen en antwoorden</div>
                        <div style={{ display: "grid", gap: 8 }}>
                          {antwoorden.map((a, i) => (
                            <div key={i} style={{ fontSize: 13, borderLeft: `2px solid ${a.vraagId.startsWith("DV") ? GOLD : BORDER}`, paddingLeft: 10 }}>
                              <div style={{ color: MUTED }}>
                                {a.vraagId.startsWith("DV") ? "◆ " : ""}{a.vraagTitel}
                              </div>
                              <div style={{ fontWeight: 600 }}>{waardeTekst(a.waarde)}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Opmerking van de klant */}
                    {scan?.opmerking && (
                      <div>
                        <div style={label}>Opmerking van de klant</div>
                        <div style={{ fontSize: 14, background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "10px 12px", whiteSpace: "pre-wrap" }}>
                          {scan.opmerking}
                        </div>
                      </div>
                    )}

                    {/* Diagnose uit de uitgebreide scan (jouw gespreksvoorbereiding) */}
                    {diagnose?.advies && (
                      <div>
                        <div style={label}>Diagnose (uit de uitgebreide scan)</div>
                        <div style={{ display: "inline-block", fontSize: 12, fontWeight: 700, color: "#fff", background: diagnoseKleur[diagnose.advies] ?? GOLD, padding: "3px 10px", borderRadius: 20, textTransform: "uppercase" }}>
                          {diagnose.advies}
                        </div>
                        {diagnose.kop && <div style={{ marginTop: 8, fontSize: 14, fontWeight: 600 }}>{diagnose.kop}</div>}
                        {diagnose.onderbouwing && <div style={{ marginTop: 4, fontSize: 13, color: MUTED }}>{diagnose.onderbouwing}</div>}
                        {diagnose.vervolg && <div style={{ marginTop: 6, fontSize: 13 }}><strong>Vervolg:</strong> {diagnose.vervolg}</div>}
                      </div>
                    )}

                    {/* 24u-video */}
                    <div>
                      <div style={label}>24u-video</div>
                      <div style={{ color: vs.kleur, fontSize: 12, fontWeight: 600, marginBottom: 7 }}>{vs.tekst}</div>
                      <VideoForm
                        leadId={lead.id}
                        bestaandeUrl={video?.loomUrl ?? null}
                        verstuurd={Boolean(video?.verstuurdOp)}
                      />
                    </div>

                    {/* Mail naar deze lead */}
                    <div>
                      <div style={label}>Mail naar deze lead</div>
                      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                        <MailPerLead leadId={lead.id} mailUit={lead.mailUit} />
                        <span style={{ fontSize: 12.5, color: MUTED }}>
                          {gepland ? `Gepland: herinnering rond ${dt(gepland)}` : "Geen mail gepland"}
                        </span>
                      </div>
                    </div>

                    {/* Verstuurde mails */}
                    {lead.mailLogs.length > 0 && (
                      <div>
                        <div style={label}>Verstuurde mails</div>
                        <div style={{ display: "grid", gap: 5 }}>
                          {lead.mailLogs.map((m) => (
                            <div key={m.id} style={{ fontSize: 12.5, display: "flex", gap: 8, alignItems: "baseline", flexWrap: "wrap" }}>
                              <span style={mailStatusPil(m.status)}>{m.status}</span>
                              <span style={{ fontWeight: 600 }}>{mailSoortLabel(m.soort)}</span>
                              <span style={{ color: MUTED }}>
                                {m.richting === "naar_john" ? "naar jou" : `naar ${m.ontvanger}`}
                              </span>
                              {m.detail && <span style={{ color: MUTED }}>· {m.detail}</span>}
                              <span style={{ color: MUTED, marginLeft: "auto" }}>{dt(m.createdAt)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Test-markering */}
                    <div style={{ display: "flex", justifyContent: "flex-end", borderTop: `1px solid ${BORDER}`, paddingTop: 12 }}>
                      <TestToggle leadId={lead.id} isTest={lead.isTest} />
                    </div>
                  </div>
                </details>
              )
            })}
          </div>
        )}

        <p style={{ color: MUTED, fontSize: 12, marginTop: 18 }}>
          Bron van waarheid = Neon (Postgres). De oude Google-Sheet-push staat uit. Beveiligd met ADMIN_TOKEN. Klik een lead open voor het volledige onderzoek.
        </p>
      </div>
    </main>
  )
}
