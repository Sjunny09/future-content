import Anthropic from "@anthropic-ai/sdk"
import type { SiteData } from "@/lib/scan/scraper"

// Model-keuzes vastgelegd in 03_ceo_synthese.md §1.8:
//  - Sonnet 4.6 → hoofdanalyse (branche, niche, tone, 3 kansen)
//  - Haiku 4.5  → observatie-regels tijdens de wachttijd (Sprint 2)
//                 + vraagselectie uit bibliotheek (Sprint 3)
const MODEL_ANALYSE = "claude-sonnet-4-6"
const MODEL_OBSERVATIES = "claude-haiku-4-5"

let clientSingleton: Anthropic | null = null

function client(): Anthropic {
  if (!clientSingleton) {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) throw new Error("ANTHROPIC_API_KEY ontbreekt")
    // Zero Data Retention staat server-side aan op de productie-key (zie
    // 03_ceo_synthese.md §4.1). Client-zijde hoeft niets extra's te doen.
    clientSingleton = new Anthropic({ apiKey })
  }
  return clientSingleton
}

// ─────────────────────────────────────────
// Hoofdanalyse (Sonnet 4.6, tool-use, caching)
// ─────────────────────────────────────────

export type SiteAnalyse = {
  branche: string
  niche: string
  tone: string
  kansen: Array<{ titel: string; beschrijving: string }>
}

const ANALYSE_SYSTEEM = `Je bent John Lavrijsen — eigenaar van Future Content. Je kijkt naar de website van een Nederlands MKB-bedrijf en noteert wat je opvalt.

Je werkt precies, in John's stem: rustig, nuchter, ik-vorm, tutoyeren, geen jargon. Je belooft niets dat je niet kan waarmaken. Je schrijft Nederlands.

Je output gaat via de tool \`schrijf_analyse\`. Dit zijn de velden:

- branche: één korte zin die benoemt in welke branche dit bedrijf zit ("aannemersbedrijf, gespecialiseerd in verbouwingen"). Geen SBI-codes.
- niche: één korte zin die noemt waarin dit bedrijf specifiek anders is dan de rest van zijn branche. Als je het niet kunt vaststellen: schrijf dat eerlijk op.
- tone: twee à drie zinnen over hoe de teksten op de site klinken (formeel/informeel, zakelijk/warm, jij/u, technisch/toegankelijk). Wees concreet.
- kansen: precies drie AI-toepassingen die voor dít bedrijf concreet zin hebben. Geen generieke lijsten. Per kans:
    - titel: maximaal 8 woorden, doe-woord vooraan ("Offertes uit intake-formulier laten schrijven")
    - beschrijving: 2-3 zinnen die uitleggen wat het doet, waarom het voor dít bedrijf past, en welk concreet proces er sneller/beter van wordt. Benoem wat het scheelt (tijd of geld); een orde van grootte mag als de site er aanleiding toe geeft.
    - De kans geeft het WAT en WAAROM, nooit het HOE. Geen stappenplan, geen toolnamen, geen inrichting: de prioritering en de aanpak zijn precies waar het gesprek met John voor is. Concreet genoeg dat de lezer denkt "die snapt mijn bedrijf", niet zo compleet dat hij er zelf mee wegloopt.

Vangrails:
- Nooit het woord "wij" gebruiken — John werkt alleen.
- Nooit iets verzinnen dat niet in de site staat. Als de site weinig zegt: noteer dat in niche of tone.
- Geen marketing-copy. Dit is een analyse die John straks voorleest in een Loom-video.
- Geen stappenplannen of toolnamen in de kansen: wel het wat en waarom, niet het hoe.
- Geen em-dashes (—) of en-dashes (–). Gebruik een komma, punt of dubbele punt.`

const ANALYSE_TOOL: Anthropic.Tool = {
  name: "schrijf_analyse",
  description: "Leg de analyse van de website vast in gestructureerde vorm.",
  input_schema: {
    type: "object",
    properties: {
      branche: {
        type: "string",
        description: "Eén korte zin over de branche van dit bedrijf.",
      },
      niche: {
        type: "string",
        description: "Eén korte zin over waarin dit bedrijf anders is.",
      },
      tone: {
        type: "string",
        description: "Twee à drie zinnen over de tone of voice.",
      },
      kansen: {
        type: "array",
        minItems: 3,
        maxItems: 3,
        items: {
          type: "object",
          properties: {
            titel: { type: "string" },
            beschrijving: { type: "string" },
          },
          required: ["titel", "beschrijving"],
        },
      },
    },
    required: ["branche", "niche", "tone", "kansen"],
  },
}

export async function analyseerSite(siteData: SiteData): Promise<SiteAnalyse> {
  const stream = client().messages.stream({
    model: MODEL_ANALYSE,
    max_tokens: 2048,
    system: [
      {
        type: "text",
        text: ANALYSE_SYSTEEM,
        cache_control: { type: "ephemeral" },
      },
    ],
    tools: [ANALYSE_TOOL],
    tool_choice: { type: "tool", name: "schrijf_analyse" },
    // Geen `thinking: {type: "adaptive"}` — Anthropic weigert extended
    // thinking in combinatie met geforceerde tool-use (400 invalid_request).
    // Sonnet-4-6 is zonder thinking sterk genoeg voor deze strict-JSON taak.
    messages: [
      {
        role: "user",
        content: formatteerSiteData(siteData),
      },
    ],
  })

  const response = await stream.finalMessage()
  const toolBlok = response.content.find(
    (blok): blok is Anthropic.ToolUseBlock => blok.type === "tool_use",
  )
  if (!toolBlok || toolBlok.name !== "schrijf_analyse") {
    throw new Error("claude-gaf-geen-tool-use-terug")
  }
  const ruw = toolBlok.input as SiteAnalyse
  // Vangnet: strip em-/en-dashes uit alle klant-zichtbare tekst (John's regel).
  return {
    branche: zonderDash(ruw.branche),
    niche: zonderDash(ruw.niche),
    tone: zonderDash(ruw.tone),
    kansen: ruw.kansen.map((k) => ({
      titel: zonderDash(k.titel),
      beschrijving: zonderDash(k.beschrijving),
    })),
  }
}

// ─────────────────────────────────────────
// Observatie-regels (Haiku 4.5, tool-use)
// ─────────────────────────────────────────

const OBSERVATIES_SYSTEEM = `Je schrijft 4 korte observatie-zinnen die iemand te zien krijgt terwijl John's scan bezig is. Ze moeten voelen alsof John zelf door de site bladert en hardop denkt.

Regels:
- Exact 4 zinnen, in deze volgorde:
  1. Iets over de homepage (wat er als eerste opvalt)
  2. Iets over de toon van de teksten
  3. Iets over waar het bedrijf over gaat (diensten, producten, klanten)
  4. Een eerste indruk — één ding dat je al opvalt, iets persoonlijks
- Elke zin: 6-14 woorden, ik-vorm, Nederlands, tutoyeren.
- Beginnen met een werkwoord: "Ik lees…", "Ik kijk…", "Ik zie…", "Me valt op…".
- Nooit het woord "AI", "analyse", "scan" of "tool".
- Nooit iets beweren dat niet op de site staat.
- Geen em-dashes (—). Gebruik een komma of punt.
- Eindig zin 1-3 met "…" (John is nog bezig). Zin 4 eindigt normaal.

Output gaat via de tool \`schrijf_observaties\`.`

const OBSERVATIES_TOOL: Anthropic.Tool = {
  name: "schrijf_observaties",
  description: "Leg 4 observatie-zinnen vast.",
  input_schema: {
    type: "object",
    properties: {
      observaties: {
        type: "array",
        minItems: 4,
        maxItems: 4,
        items: { type: "string" },
      },
    },
    required: ["observaties"],
  },
}

export async function genereerObservaties(
  siteData: SiteData,
): Promise<string[]> {
  const response = await client().messages.create({
    model: MODEL_OBSERVATIES,
    max_tokens: 512,
    system: [
      {
        type: "text",
        text: OBSERVATIES_SYSTEEM,
        cache_control: { type: "ephemeral" },
      },
    ],
    tools: [OBSERVATIES_TOOL],
    tool_choice: { type: "tool", name: "schrijf_observaties" },
    messages: [
      {
        role: "user",
        content: formatteerSiteData(siteData),
      },
    ],
  })

  const toolBlok = response.content.find(
    (blok): blok is Anthropic.ToolUseBlock => blok.type === "tool_use",
  )
  if (!toolBlok || toolBlok.name !== "schrijf_observaties") {
    throw new Error("claude-gaf-geen-observaties-terug")
  }
  const input = toolBlok.input as { observaties: string[] }
  return input.observaties.map(zonderDash)
}

// ─────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────

// Em-dash en en-dash zijn verboden in klant-zichtbare tekst. De prompt vraagt
// er al om, dit is het vangnet: vervang door een komma zodat de zin blijft lopen.
function zonderDash(tekst: string): string {
  return tekst.replace(/\s*[—–]\s*/g, ", ").replace(/,\s*,/g, ",")
}

function formatteerSiteData(siteData: SiteData): string {
  const regels: string[] = []
  regels.push(`URL: ${siteData.url}`)
  if (siteData.title) regels.push(`Title: ${siteData.title}`)
  if (siteData.description) regels.push(`Description: ${siteData.description}`)
  if (siteData.h1) regels.push(`H1: ${siteData.h1}`)
  if (siteData.quotes.length > 0) {
    regels.push("")
    regels.push("Sprekende zinnen uit de site:")
    for (const q of siteData.quotes) regels.push(`- ${q}`)
  }
  regels.push("")
  regels.push("Hoofdtekst (PII-gestript):")
  regels.push(siteData.hoofdtekst)
  return regels.join("\n")
}
