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
const JINA_TIMEOUT_MS = 20_000
const CHEERIO_TIMEOUT_MS = 12_000

export async function haalSiteDataOp(url: string): Promise<SiteData> {
  // Jina eerst (beste kwaliteit). Faalt de eerste poging op een timeout, dan is
  // de kans groot dat Jina de pagina inmiddels gecachet heeft: één snelle retry
  // vangt de trage sites die net over de rand tikten (zoals allplayzwembaden.nl,
  // ~12s koud). Pas als ook dat mislukt vallen we terug op Cheerio.
  try {
    return await scrapeMetJina(url)
  } catch {
    try {
      return await scrapeMetJina(url)
    } catch {
      return await scrapeMetCheerio(url)
    }
  }
}

async function scrapeMetJina(url: string): Promise<SiteData> {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), JINA_TIMEOUT_MS)

  try {
    const res = await fetch(`https://r.jina.ai/${url}`, {
      signal: ctrl.signal,
      headers: {
        Accept: "text/plain",
        "X-Return-Format": "markdown",
        // Jina Reader werkt zonder key op gratis tier; X-With-Generated-Alt
        // spaart tokens op images we toch niet gebruiken.
        "X-With-Generated-Alt": "false",
      },
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
