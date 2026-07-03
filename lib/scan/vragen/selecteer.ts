import Anthropic from "@anthropic-ai/sdk"
import type { SiteAnalyse } from "@/lib/scan/claude"
import {
  EMAIL_NAAM_VRAAG,
  VRAGEN_BIBLIOTHEEK,
  vindVraag,
  type Vraag,
} from "@/lib/scan/vragen/bibliotheek"

// Adaptieve, branche-gebonden vraagselectie. B1 wordt vooraf gepersonaliseerd
// (kiesEersteVraag). Daarna BEDENKT Haiku na elk antwoord de volgende vraag
// helemaal op maat van het bedrijf (titel + type + opties), zodat de vragen
// per branche kloppen. De vaste bibliotheek blijft alleen als vangnet.
const MODEL_SELECTIE = "claude-haiku-4-5"

let clientSingleton: Anthropic | null = null
function client(): Anthropic {
  if (!clientSingleton) {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) throw new Error("ANTHROPIC_API_KEY ontbreekt")
    clientSingleton = new Anthropic({ apiKey })
  }
  return clientSingleton
}

// ─────────────────────────────────────────
// Slot 1 — B1 personaliseren
// ─────────────────────────────────────────

const B1_FALLBACK_TITEL =
  "Ik heb je site even bekeken, klopt het beeld dat ik kreeg nog?"

const B1_SYSTEEM = `Je schrijft één korte openingsvraag voor John's quickscan. John heeft net de website van een MKB-bedrijf bekeken en wil bevestigen wat het bedrijf doet.

Regels:
- Vorm: "Ik zag dat jullie vooral X doen, klopt dat nog?" waarbij X een concrete activiteit is uit de niche/branche ("warmtepompen installeren", "een cafe runnen", "trouwfilms maken").
- Max 16 woorden. Nederlands, tutoyeren, geen jargon, geen em-dashes.
- Als de branche te vaag is om concreet te maken: gebruik een neutrale formulering, verzin niks.

Output uitsluitend via de tool schrijf_opener met het veld titel.`

const B1_TOOL: Anthropic.Tool = {
  name: "schrijf_opener",
  description: "Schrijf de gepersonaliseerde openingsvraag.",
  input_schema: {
    type: "object",
    properties: {
      titel: { type: "string", description: "De openingsvraag, max 16 woorden." },
    },
    required: ["titel"],
  },
}

export async function kiesEersteVraag(analyse: SiteAnalyse): Promise<Vraag[]> {
  const b1 = vindVraag("B1")
  if (!b1) return [EMAIL_NAAM_VRAAG]

  try {
    const response = await client().messages.create({
      model: MODEL_SELECTIE,
      max_tokens: 200,
      system: [{ type: "text", text: B1_SYSTEEM, cache_control: { type: "ephemeral" } }],
      tools: [B1_TOOL],
      tool_choice: { type: "tool", name: "schrijf_opener" },
      messages: [
        {
          role: "user",
          content: [`branche: ${analyse.branche}`, `niche: ${analyse.niche}`].join("\n"),
        },
      ],
    })
    const blok = response.content.find(
      (b): b is Anthropic.ToolUseBlock => b.type === "tool_use",
    )
    const titel = (blok?.input as { titel?: string })?.titel?.trim()
    if (titel && titel.length >= 8 && titel.length <= 160 && !titel.includes("{{")) {
      return [{ ...b1, titel }]
    }
  } catch {
    // val terug op de neutrale opener
  }
  return [{ ...b1, titel: B1_FALLBACK_TITEL }]
}

// ─────────────────────────────────────────
// Slot 2+ — bedenk de volgende vraag op maat van de branche
// ─────────────────────────────────────────

type AntwoordKort = { vraagId: string; vraagTitel: string; waarde: unknown }

const VOLGENDE_SYSTEEM = `Je bedenkt de VOLGENDE vraag voor John's quickscan, helemaal op maat van dit specifieke bedrijf. John stelt de scan aan een MKB-ondernemer. Je krijgt de site-analyse (branche, niche, kansen) en de antwoorden tot nu toe. Bedenk één concrete vraag met antwoordopties die voor precies deze branche kloppen.

Harde regels:
- De vraag EN de opties zijn branche-specifiek. Verplaats je in dit bedrijf. Een cafe krijgt geen "offertes schrijven" maar bijvoorbeeld "reserveringen, no-shows, personeel inroosteren, voorraad bestellen". Een makelaar krijgt vragen over bezichtigingen en opvolging. Een webshop over voorraad, retouren en klantvragen. Nooit opties die niet bij dit type bedrijf passen.
- Type: bij keuzevragen ALTIJD "meerkeuze" met 3 tot 6 concrete opties, zodat de klant meerdere dingen kan aanvinken (meerdere antwoorden zijn bij deze vragen bijna altijd waar). Hooguit een paar keer per scan "open" (open vragen zijn zwaar, nooit als tweede vraag). De laatste optie van een keuzevraag mag "Iets anders" zijn.
- Bouw voort op het laatste antwoord. Was dat vaag of partieel ("deels", "iets anders", "wisselt te veel"), maak de volgende vraag juist concreter en dieper op precies dat punt.
- Zorg dat de scan ergens de operatie raakt (waar tijd weglekt, welk werk steeds terugkomt) en minstens één keer aansluit op de grootste AI-kans uit de analyse.
- Richting het einde: één kwalificatie-vraag (wie beslist mee, wat houdt je tegen, of hoe snel wil je iets veranderen).
- Stel nooit dezelfde vraag twee keer. Geen jargon, geen verkoperige of defensieve toon. Nederlands, tutoyeren, geen em-dashes.
- Als er al genoeg gevraagd is om John een goed beeld te geven: zet genoeg=true, dan ronden we af.

Output uitsluitend via de tool volgende_vraag.`

const VOLGENDE_TOOL: Anthropic.Tool = {
  name: "volgende_vraag",
  description:
    "Bedenk de volgende vraag op maat van dit bedrijf, of geef met genoeg=true aan dat er genoeg gevraagd is.",
  input_schema: {
    type: "object",
    properties: {
      genoeg: {
        type: "boolean",
        description: "True als er genoeg gevraagd is om af te ronden. Dan worden de andere velden genegeerd.",
      },
      titel: { type: "string", description: "De volgende vraag, branche-specifiek, max ~16 woorden." },
      type: {
        type: "string",
        enum: ["meerkeuze", "open"],
        description: "Het type vraag. Keuzevragen zijn altijd meerkeuze zodat de klant meerdere opties kan aanvinken.",
      },
      opties: {
        type: "array",
        items: { type: "string" },
        description: "3 tot 6 concrete, branche-relevante opties. Alleen bij meerkeuze.",
      },
    },
    required: [],
  },
}

function formatteerWaarde(waarde: unknown): string {
  if (Array.isArray(waarde)) return waarde.join(", ")
  if (typeof waarde === "string") return waarde
  return JSON.stringify(waarde)
}

function bouwGegenereerdeVraag(
  input: { titel?: string; type?: string; opties?: string[] },
  slot: number,
): Vraag | null {
  const titel = input.titel?.trim()
  if (!titel || titel.length < 6 || titel.length > 200) return null

  if (input.type === "open") {
    return { id: `GEN${slot}`, thema: "operatie", type: "open", titel }
  }
  if (input.type === "enkelkeuze" || input.type === "meerkeuze") {
    const opties = (input.opties ?? [])
      .map((o) => (typeof o === "string" ? o.trim() : ""))
      .filter(Boolean)
      .slice(0, 6)
    if (opties.length < 2) return null
    // Keuzevragen zijn altijd meerkeuze: de klant mag meerdere opties aanvinken.
    return { id: `GEN${slot}`, thema: "operatie", type: "meerkeuze", titel, opties }
  }
  return null
}

export async function kiesVolgendeVraag(args: {
  analyse: SiteAnalyse
  gesteldeIds: string[]
  antwoorden: AntwoordKort[]
  slot: number
  alleenDoorvraag?: boolean
}): Promise<Vraag | null> {
  const { analyse, gesteldeIds, antwoorden, slot, alleenDoorvraag = false } = args

  try {
    const response = await client().messages.create({
      model: MODEL_SELECTIE,
      max_tokens: 400,
      system: [{ type: "text", text: VOLGENDE_SYSTEEM, cache_control: { type: "ephemeral" } }],
      tools: [VOLGENDE_TOOL],
      tool_choice: { type: "tool", name: "volgende_vraag" },
      messages: [
        {
          role: "user",
          content: [
            `Vraagnummer dat je nu bedenkt: ${slot}`,
            "",
            "SiteAnalyse:",
            `- branche: ${analyse.branche}`,
            `- niche: ${analyse.niche}`,
            `- tone: ${analyse.tone}`,
            "- kansen:",
            ...analyse.kansen.map((k) => `  • ${k.titel}: ${k.beschrijving}`),
            "",
            "Antwoorden tot nu toe:",
            ...(antwoorden.length
              ? antwoorden.map((a) => `- ${a.vraagTitel}: ${formatteerWaarde(a.waarde)}`)
              : ["(nog geen)"]),
            ...(alleenDoorvraag
              ? [
                  "",
                  "LET OP: er is al genoeg basis gevraagd. Stel alleen nog een vraag als het laatste antwoord echt om verdieping vraagt. Is dat niet zo, zet dan genoeg=true.",
                ]
              : []),
          ].join("\n"),
        },
      ],
    })

    const blok = response.content.find(
      (b): b is Anthropic.ToolUseBlock => b.type === "tool_use",
    )
    const input = (blok?.input ?? {}) as {
      genoeg?: boolean
      titel?: string
      type?: string
      opties?: string[]
    }

    if (input.genoeg) return null

    const vraag = bouwGegenereerdeVraag(input, slot)
    if (vraag) return vraag
  } catch {
    // val terug op de bibliotheek-vangnet
  }

  if (alleenDoorvraag) return null
  return kiesFallback(gesteldeIds, slot)
}

// ─────────────────────────────────────────
// Vangnet: vaste bibliotheek-vraag als de generatie faalt
// ─────────────────────────────────────────

function capVoor(thema: Vraag["thema"]): number {
  return thema === "frustratie" || thema === "operatie" ? 2 : 1
}

function aantalThemaIn(thema: Vraag["thema"], ids: string[]): number {
  return ids.filter((id) => vindVraag(id)?.thema === thema).length
}

function capOk(thema: Vraag["thema"], gesteldeIds: string[]): boolean {
  return aantalThemaIn(thema, gesteldeIds) < capVoor(thema)
}

function valideerKeuze(id: string, gesteldeIds: string[]): Vraag | null {
  if (!id || id === "B1" || id === "EMAIL" || gesteldeIds.includes(id)) return null
  const v = vindVraag(id)
  if (!v || !capOk(v.thema, gesteldeIds)) return null
  return v
}

function kiesFallback(gesteldeIds: string[], slot: number): Vraag {
  const prioriteit =
    slot >= 5
      ? ["V1", "V4", "V3", "O4", "F4", "K3"]
      : ["F4", "O4", "K3", "K6", "F1", "T2", "V1", "O2"]

  for (const id of prioriteit) {
    const v = valideerKeuze(id, gesteldeIds)
    if (v) return v
  }
  const rest = VRAGEN_BIBLIOTHEEK.filter(
    (v) => v.id !== "B1" && !gesteldeIds.includes(v.id) && capOk(v.thema, gesteldeIds),
  )
  if (rest.length > 0) return rest[0]
  return EMAIL_NAAM_VRAAG
}
