import Anthropic from "@anthropic-ai/sdk"
import type { SiteAnalyse } from "@/lib/scan/claude"
import {
  EMAIL_NAAM_VRAAG,
  VRAGEN_BIBLIOTHEEK,
  vindVraag,
  type Vraag,
} from "@/lib/scan/vragen/bibliotheek"

// Adaptieve vraagselectie. B1 wordt vooraf gepersonaliseerd (kiesEersteVraag);
// daarna kiest Haiku na elk antwoord de volgende vraag (kiesVolgendeVraag),
// met code-verificatie en een deterministische fallback zodat de gebruiker
// nooit vastloopt. De server bepaalt wanneer het stopt (5 + email), niet de AI.
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

// Thema-caps over de hele scan. Frustratie en operatie mogen 2x, de rest 1x.
function capVoor(thema: Vraag["thema"]): number {
  return thema === "frustratie" || thema === "operatie" ? 2 : 1
}

function aantalThemaIn(thema: Vraag["thema"], ids: string[]): number {
  return ids.filter((id) => vindVraag(id)?.thema === thema).length
}

function capOk(thema: Vraag["thema"], gesteldeIds: string[]): boolean {
  return aantalThemaIn(thema, gesteldeIds) < capVoor(thema)
}

// ─────────────────────────────────────────
// Slot 1 — B1 personaliseren
// ─────────────────────────────────────────

const B1_FALLBACK_TITEL =
  "Ik heb je site even bekeken, klopt het beeld dat ik kreeg nog?"

const B1_SYSTEEM = `Je schrijft één korte openingsvraag voor John's quickscan. John heeft net de website van een MKB-bedrijf bekeken en wil bevestigen wat het bedrijf doet.

Regels:
- Vorm: "Ik zag dat jullie vooral X doen, klopt dat nog?" waarbij X een concrete activiteit is uit de niche/branche ("warmtepompen installeren", "trouwfilms maken", "diepvriesproducten verkopen").
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
  if (!b1) return [EMAIL_NAAM_VRAAG] // kan niet voorkomen, type-veiligheid

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
          content: [
            `branche: ${analyse.branche}`,
            `niche: ${analyse.niche}`,
          ].join("\n"),
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
// Slot 2-5 — kies de volgende vraag
// ─────────────────────────────────────────

type AntwoordKort = { vraagId: string; vraagTitel: string; waarde: unknown }

const VOLGENDE_SYSTEEM = `Je kiest ÉÉN volgende vraag voor John's quickscan. John stelt de scan aan een MKB-ondernemer. Je krijgt de site-analyse, de antwoorden tot nu toe, en de vragen die al gesteld zijn. Kies de meest relevante volgende vraag uit de aangeboden lijst, passend bij dit bedrijfstype en bij wat de ondernemer net zei.

Harde regels:
- Kies alleen een id uit de aangeboden "Beschikbare vragen". Kies NOOIT een al gestelde vraag, NOOIT B1, NOOIT EMAIL.
- Reageer op het laatste antwoord: wijst het op een operatie- of klantprobleem, verdiep daar; geeft het weinig, schakel naar een ander relevant thema.
- Zorg dat er minstens één operatie-vraag (O*) in de scan komt, en minstens één die de grootste AI-kans uit de analyse raakt. Als dat nog niet gebeurd is en het kan, prioriteer dat nu.
- Open vragen zijn zwaar: kies op slot 2 NOOIT een open vraag. Mik op maximaal 2 open vragen in de hele scan.
- Branche-heuristiek:
  * administratie-zwaar (offertes, facturen, boekhouding prominent) -> richting F4, O4.
  * klantcontact-zwaar (service, support, veel inkomende vragen) -> richting K3, K6.
  * merk, webshop of product (geen 1-op-1 dienstverlening) -> VERMIJD service-vragen zoals "waar komen klantvragen binnen"; kies eerder operatie, tools of wens.
- Slot 5 (de laatste inhoudelijke): kies een voorbereiding-vraag (V1, V3 of V4) als die er nog niet is.
- Doorvragen: als het laatste antwoord vaag of partieel is ("deels, zit nog meer aan vast", "iets anders", "anders", "wisselt te veel"), stel dan EENMALIG een korte concrete doorvraag via het veld doorvraag (open vraag, max 14 woorden, John's tone, geen jargon) in plaats van een id te kiezen. Bijvoorbeeld na "deels, zit nog meer aan vast": "Wat zit er nog meer aan vast?". Stel nooit twee doorvragen achter elkaar.
- Geen jargon, geen verkoperige of defensieve toon.

Output via de tool kies_volgende_vraag: vul OF het veld id (uit de lijst) OF het veld doorvraag in.`

const VOLGENDE_TOOL: Anthropic.Tool = {
  name: "kies_volgende_vraag",
  description:
    "Kies een vraag-id uit de lijst, OF stel een korte doorvraag als het laatste antwoord vaag of partieel was.",
  input_schema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "Vraag-id uit de aangeboden lijst. Laat leeg als je een doorvraag stelt.",
      },
      doorvraag: {
        type: "string",
        description:
          "Een korte open doorvraag (max 14 woorden) die ingaat op het laatste antwoord. Alleen invullen als dat antwoord vaag of partieel was. Vul OF id OF doorvraag in, niet beide.",
      },
    },
  },
}

function beschikbareVragen(gesteldeIds: string[]): Vraag[] {
  return VRAGEN_BIBLIOTHEEK.filter(
    (v) =>
      v.id !== "B1" &&
      !gesteldeIds.includes(v.id) &&
      capOk(v.thema, gesteldeIds),
  )
}

function valideerKeuze(id: string, gesteldeIds: string[]): Vraag | null {
  if (!id || id === "B1" || id === "EMAIL" || gesteldeIds.includes(id)) return null
  const v = vindVraag(id)
  if (!v || !capOk(v.thema, gesteldeIds)) return null
  return v
}

export async function kiesVolgendeVraag(args: {
  analyse: SiteAnalyse
  gesteldeIds: string[]
  antwoorden: AntwoordKort[]
  slot: number
}): Promise<Vraag> {
  const { analyse, gesteldeIds, antwoorden, slot } = args
  const beschikbaar = beschikbareVragen(gesteldeIds)

  try {
    const response = await client().messages.create({
      model: MODEL_SELECTIE,
      max_tokens: 256,
      system: [{ type: "text", text: VOLGENDE_SYSTEEM, cache_control: { type: "ephemeral" } }],
      tools: [VOLGENDE_TOOL],
      tool_choice: { type: "tool", name: "kies_volgende_vraag" },
      messages: [
        {
          role: "user",
          content: [
            `Slot dat je nu kiest: ${slot} (5 = laatste inhoudelijke vraag)`,
            "",
            "SiteAnalyse:",
            `- branche: ${analyse.branche}`,
            `- niche: ${analyse.niche}`,
            `- tone: ${analyse.tone}`,
            "- kansen:",
            ...analyse.kansen.map((k) => `  • ${k.titel}: ${k.beschrijving}`),
            "",
            `Reeds gestelde vragen (niet opnieuw kiezen): ${gesteldeIds.join(", ") || "(geen)"}`,
            "",
            "Antwoorden tot nu toe:",
            ...(antwoorden.length
              ? antwoorden.map(
                  (a) =>
                    `- [${a.vraagId}] ${a.vraagTitel}: ${formatteerWaarde(a.waarde)}`,
                )
              : ["(nog geen)"]),
            "",
            "Beschikbare vragen (kies hier één id uit):",
            ...beschikbaar.map((v) => `- ${v.id} [${v.thema}] ${v.titel}`),
          ].join("\n"),
        },
      ],
    })
    const blok = response.content.find(
      (b): b is Anthropic.ToolUseBlock => b.type === "tool_use",
    )
    const input = (blok?.input ?? {}) as { id?: string; doorvraag?: string }

    // Doorvraag: alleen als het laatste antwoord vaag was, max 2 per scan,
    // nooit twee achter elkaar.
    const laatsteWasDoor =
      gesteldeIds[gesteldeIds.length - 1]?.startsWith("DOOR") ?? false
    const aantalDoor = gesteldeIds.filter((i) => i.startsWith("DOOR")).length
    const doorvraag = input.doorvraag?.trim()
    if (
      doorvraag &&
      doorvraag.length >= 6 &&
      doorvraag.length <= 160 &&
      !laatsteWasDoor &&
      aantalDoor < 2
    ) {
      return { id: `DOOR${slot}`, thema: "frustratie", type: "open", titel: doorvraag }
    }

    const gekozen = valideerKeuze(input.id ?? "", gesteldeIds)
    if (gekozen) return gekozen
  } catch {
    // val terug op de deterministische keuze
  }
  return kiesFallback(gesteldeIds, slot)
}

// Deterministische terugval: pakt de eerstvolgende bruikbare vraag uit een
// slot-bewuste prioriteitslijst. Garandeert dat er altijd een zinnige vraag is.
function kiesFallback(gesteldeIds: string[], slot: number): Vraag {
  const prioriteit =
    slot >= 5
      ? ["V1", "V4", "V3", "O4", "F4", "K3"]
      : ["F4", "O4", "K3", "K6", "F1", "T2", "V1", "O2"]

  for (const id of prioriteit) {
    const v = valideerKeuze(id, gesteldeIds)
    if (v) return v
  }
  // Ultieme terugval: eerste bruikbare vraag uit de pool.
  const rest = beschikbareVragen(gesteldeIds)
  if (rest.length > 0) return rest[0]
  // Mag in de praktijk niet voorkomen; dan sluiten we af met email.
  return EMAIL_NAAM_VRAAG
}

function formatteerWaarde(waarde: unknown): string {
  if (Array.isArray(waarde)) return waarde.join(", ")
  if (typeof waarde === "string") return waarde
  return JSON.stringify(waarde)
}
