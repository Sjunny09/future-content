import { cookies } from "next/headers"
import { db } from "@/lib/scan/db"
import { OsLogin, VideoForm } from "./ui"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const GOLD = "#C9A96E"
const INK = "#1A1A18"
const BORDER = "#E5E0D8"
const MUTED = "#6B7280"
const BG = "#FAFAF8"

type Analyse = { branche?: string; niche?: string; kansen?: { titel?: string }[] } | null

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

function videoStatus(deadline: Date | null, verstuurdOp: Date | null): { tekst: string; kleur: string } {
  if (verstuurdOp) return { tekst: `verstuurd ${dt(verstuurdOp)}`, kleur: "#4E7A51" }
  if (!deadline) return { tekst: "geen deadline", kleur: MUTED }
  const urenOver = (new Date(deadline).getTime() - Date.now()) / 36e5
  if (urenOver < 0) return { tekst: "deadline verstreken", kleur: "#B8472A" }
  if (urenOver < 6) return { tekst: `nog ${Math.round(urenOver)}u`, kleur: "#B8472A" }
  return { tekst: `nog ${Math.round(urenOver)}u`, kleur: INK }
}

export default async function OsPage() {
  const token = (await cookies()).get("fc_os")?.value
  const ok = process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN
  if (!ok) return <OsLogin />

  const leads = await db.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: {
      scans: { orderBy: { startedAt: "desc" }, take: 1 },
      loomVideos: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  })

  const th: React.CSSProperties = {
    textAlign: "left", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase",
    color: MUTED, fontWeight: 600, padding: "0 14px 10px",
  }
  const td: React.CSSProperties = {
    padding: "14px", borderTop: `1px solid ${BORDER}`, fontSize: 13.5, verticalAlign: "top",
  }

  return (
    <main style={{ background: BG, minHeight: "100vh", padding: "40px 28px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: MUTED, fontWeight: 600 }}>
              Future Content OS
            </div>
            <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: 30, marginTop: 4 }}>Leads uit de Quickscan</h1>
          </div>
          <div style={{ fontSize: 13, color: MUTED }}>{leads.length} leads · bron: Neon</div>
        </header>

        {leads.length === 0 ? (
          <p style={{ color: MUTED, fontSize: 15, padding: "40px 0" }}>
            Nog geen leads. Zodra iemand de Quickscan afrondt, verschijnt die hier.
          </p>
        ) : (
          <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 14, padding: "20px 8px 8px", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 820 }}>
              <thead>
                <tr>
                  <th style={th}>Bedrijf</th>
                  <th style={th}>Contact</th>
                  <th style={th}>Scan-kans</th>
                  <th style={th}>Binnen</th>
                  <th style={th}>24u-video</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => {
                  const scan = lead.scans[0]
                  const video = lead.loomVideos[0]
                  const analyse = (scan?.analyseJson ?? null) as Analyse
                  const bedrijf = lead.bedrijfsnaam || (scan ? domein(scan.url) : "—")
                  const kans = analyse?.kansen?.[0]?.titel || analyse?.branche || "—"
                  const vs = video ? videoStatus(video.deadline, video.verstuurdOp) : { tekst: "—", kleur: MUTED }
                  return (
                    <tr key={lead.id}>
                      <td style={td}>
                        <div style={{ fontWeight: 600 }}>{bedrijf}</div>
                        {scan && <a href={scan.url} target="_blank" rel="noreferrer" style={{ color: GOLD, fontSize: 12 }}>{domein(scan.url)}</a>}
                      </td>
                      <td style={td}>
                        <div>{lead.naam || "—"}</div>
                        <div style={{ color: MUTED, fontSize: 12 }}>{lead.email}</div>
                        {lead.telefoon && <div style={{ color: MUTED, fontSize: 12 }}>{lead.telefoon}</div>}
                      </td>
                      <td style={{ ...td, maxWidth: 220 }}>
                        <div>{kans}</div>
                        {analyse?.branche && <div style={{ color: MUTED, fontSize: 12 }}>{analyse.branche}</div>}
                      </td>
                      <td style={td}>{dt(lead.createdAt)}</td>
                      <td style={{ ...td, minWidth: 280 }}>
                        <div style={{ color: vs.kleur, fontSize: 12, fontWeight: 600, marginBottom: 7 }}>{vs.tekst}</div>
                        <VideoForm
                          leadId={lead.id}
                          bestaandeUrl={video?.loomUrl ?? null}
                          verstuurd={Boolean(video?.verstuurdOp)}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        <p style={{ color: MUTED, fontSize: 12, marginTop: 18 }}>
          Bron van waarheid = Neon (Postgres). De oude Google-Sheet-push staat uit. Beveiligd met ADMIN_TOKEN.
        </p>
      </div>
    </main>
  )
}
