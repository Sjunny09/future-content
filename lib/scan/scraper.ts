import * as cheerio from "cheerio"
import { stripPII } from "@/lib/scan/pii-filter"

// Wat Claude straks binnenkrijgt. Bewust plat — geen nested HTML, geen DOM.
export type SiteData = {
  url: string
  title: string | null
  description: string | null
  h1: string | null
  hoofdtekst: string // eerste ~6000 chars leesbare tekst, PII-gestript
  quotes: string[] // 3-6 korte sprekende zinnen uit de tekst
  bron: "jina" | "cheerio"
}

const MAX_TEKST = 6000
const JINA_TIMEOUT_MS = 15_000          // snelle engine (tier 1)
const JINA_BROWSER_TIMEOUT_MS = 25_000  // volledige browser-engine (tier 2, dieper graven)
const CHEERIO_TIMEOUT_MS = 12_000

export async function haalSiteDataOp(url: string): Promise<SiteData> {
  const [primair, alt] = hostVarianten(url)
  let laatsteFout: unknown = new Error("scrape-mislukt")

  // Tier 1 (standaard, snel): Jina snelle engine op beide host-varianten, dan
  // Cheerio. Vangt verreweg de meeste sites in een paar seconden. De host-
  // variant (www eraf/erop) redt sites met een scheef TLS-cert of redirect op
  // maar één variant (zoals www.allplayzwembaden.nl, ongeldig cert op www).
  const tier1: Array<() => Promise<SiteData>> = [() => scrapeMetJina(primair, {})]
  if (alt) tier1.push(() => scrapeMetJina(alt, {}))
  tier1.push(() => scrapeMetCheerio(primair))
  if (alt) tier1.push(() => scrapeMetCheerio(alt))

  // Tier 2 (dieper graven): Jina met de volledige browser-engine, die JS rendert
  // en de cache negeert. Trager, maar kraakt sommige zware sites die tier 1 niet
  // lukt. Alleen op de primaire host, om de totale wachttijd te beperken.
  const tier2: Array<() => Promise<SiteData>> = [
    () => scrapeMetJina(primair, { engine: "browser" }),
  ]

  for (const poging of [...tier1, ...tier2]) {
    try {
      return await poging()
    } catch (e) {
      laatsteFout = e
    }
  }
  throw laatsteFout
}

// Geeft [primaire-url, alternatieve-url] terug, waarbij de alternatieve de
// www-variant omdraait. undefined als er geen zinnige variant is.
function hostVarianten(url: string): [string, string | undefined] {
  try {
    const u = new URL(url)
    const alt = new URL(url)
    alt.hostname = u.hostname.startsWith("www.")
      ? u.hostname.slice(4)
      : `www.${u.hostname}`
    const a = u.toString()
    const b = alt.toString()
    return b === a ? [a, undefined] : [a, b]
  } catch {
    return [url, undefined]
  }
}

async function scrapeMetJina(
  url: string,
  opts: { engine?: "browser" },
): Promise<SiteData> {
  const browser = opts.engine === "browser"
  const timeoutMs = browser ? JINA_BROWSER_TIMEOUT_MS : JINA_TIMEOUT_MS
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), timeoutMs)

  try {
    const headers: Record<string, string> = {
      Accept: "text/plain",
      "X-Return-Format": "markdown",
      // X-With-Generated-Alt spaart tokens op images die we toch niet gebruiken.
      "X-With-Generated-Alt": "false",
    }
    // Tier 1 draait ANONIEM (gratis). De JINA_API_KEY is schaars (John vult 'm
    // niet bij) en wordt daarom pas in tier 2 ingezet, als de gratis route al
    // gefaald is. Tier 2 gebruikt tegelijk de volledige browser-engine (rendert
    // JS, negeert cache). Zo verbruiken we de key alleen wanneer het anders niet lukt.
    if (browser) {
      const apiKey = process.env.JINA_API_KEY
      if (apiKey) headers.Authorization = `Bearer ${apiKey}`
      headers["X-Engine"] = "browser"
      headers["X-No-Cache"] = "true"
    }

    const res = await fetch(`https://r.jina.ai/${url}`, {
      signal: ctrl.signal,
      headers,
    })

    if (!res.ok) {
      throw new Error(`jina-http-${res.status}`)
    }

    const markdown = await res.text()
    if (markdown.trim().length < 80) {
      throw new Error("jina-te-leeg")
    }

    return parseJinaMarkdown(url, markdown)
  } finally {
    clearTimeout(t)
  }
}

function parseJinaMarkdown(url: string, markdown: string): SiteData {
  // Jina geeft een kop-blok met Title: / URL Source: / Markdown Content: …
  const titleMatch = markdown.match(/^Title:\s*(.+)$/m)
  const descMatch = markdown.match(/^Description:\s*(.+)$/m)
  const contentSplit = markdown.split(/Markdown Content:\s*/i)
  const inhoud = (contentSplit[1] ?? markdown).trim()

  const eersteH1 = inhoud.match(/^#\s+(.+)$/m)?.[1] ?? null

  // Strip markdown syntax → leesbare tekst
  const platteTekst = inhoud
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // links → alleen tekst
    .replace(/[`*_#>]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()

  const hoofdtekst = stripPII(platteTekst).slice(0, MAX_TEKST)
  const quotes = kiesQuotes(hoofdtekst)

  return {
    url,
    title: titleMatch?.[1]?.trim() ?? null,
    description: descMatch?.[1]?.trim() ?? null,
    h1: eersteH1?.trim() ?? null,
    hoofdtekst,
    quotes,
    bron: "jina",
  }
}

async function scrapeMetCheerio(url: string): Promise<SiteData> {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), CHEERIO_TIMEOUT_MS)

  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; FutureContentScan/1.0; +https://future-content.nl/scan)",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "nl,en;q=0.8",
      },
    })

    if (!res.ok) {
      throw new Error(`cheerio-http-${res.status}`)
    }

    const html = await res.text()
    const $ = cheerio.load(html)

    // Weg met ruis
    $("script, style, noscript, svg, iframe, nav, footer, header").remove()

    const title = $("title").first().text().trim() || null
    const description =
      $('meta[name="description"]').attr("content")?.trim() ||
      $('meta[property="og:description"]').attr("content")?.trim() ||
      null
    const h1 = $("h1").first().text().trim() || null

    const body = $("main").text() || $("body").text()
    const platteTekst = body.replace(/\s+/g, " ").trim()
    const hoofdtekst = stripPII(platteTekst).slice(0, MAX_TEKST)
    // Zelfde drempel als Jina: een lege/JS-only site (HTTP 200 maar geen
    // leesbare tekst) moet falen, niet een rapport uit het niets opleveren.
    if (hoofdtekst.trim().length < 80) {
      throw new Error("cheerio-te-leeg")
    }
    const quotes = kiesQuotes(hoofdtekst)

    return {
      url,
      title,
      description,
      h1,
      hoofdtekst,
      quotes,
      bron: "cheerio",
    }
  } finally {
    clearTimeout(t)
  }
}

// Zoekt sprekende zinnen (40-180 chars, niet alleen cijfers/navi).
// Claude's observatie-slide gebruikt deze zinnen als "Ik kijk naar je toon…"
function kiesQuotes(tekst: string): string[] {
  const zinnen = tekst
    .split(/(?<=[.!?])\s+/)
    .map((z) => z.trim())
    .filter((z) => z.length >= 40 && z.length <= 180)
    .filter((z) => /[a-z]/.test(z))
    .filter((z) => !/^(home|contact|over ons|menu|cookies)/i.test(z))

  // Eerste 6 unieke
  const uniek: string[] = []
  for (const z of zinnen) {
    if (!uniek.includes(z)) uniek.push(z)
    if (uniek.length >= 6) break
  }
  return uniek
}
