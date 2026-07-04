import Anthropic from "@anthropic-ai/sdk"
import type { SiteAnalyse } from "@/lib/scan/claude"
import {
  EMAIL_NAAM_VRAAG,
  VRAGEN_BIBLIOTHEEK,
  vindVraag,
  type Vraag,
} from "@/lib/scan/vragen/bibliotheek"
import {
  mockActief,
  mockEersteVraag,
  mockVolgendeVraag,
  mockVertraging,
} from "@/lib/scan/mock"

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

const B1_SYSTEEM = `Je schrijft de openingsvraag voor John's quickscan: een 2-seconden-klik. John heeft net de website van een MKB-bedrijf bekeken. De bezoeker moet in één oogopslag denken "ja, dat ben ik" en klikken, zonder na te hoeven denken of te typen.

Regels:
- De vraag gaat over waar de schoen wringt in hun werkweek, herkenbaar voor precies deze branche. Vorm bijvoorbeeld: "Als je naar je eigen [werkweek/zaak/planning] kijkt, wat zit je het meest dwars?"
- Titel: max 16 woorden. Erbij: 3 of 4 antwoordopties van elk max 6 woorden, branche-specifiek. Een cafe krijgt opties over no-shows en personeel, een installateur over offertes en planning, een makelaar over bezichtigingen en opvolging.
- De laatste optie is altijd een eerlijke uitweg zoals "Eigenlijk niks, het loopt".
- Geen huiswerk, geen jargon, niks om over na te denken. Nederlands, tutoyeren, geen em-dashes.
- Als de branche te vaag is: houd vraag en opties neutraal over tijd en terugkerend werk, verzin niks.

Output uitsluitend via de tool schrijf_opener met de velden titel en opties.`

const B1_TOOL: Anthropic.Tool = {
  name: "schrijf_opener",
  description: "Schrijf de gepersonaliseerde openingsvraag met klik-opties.",
  input_schema: {
    type: "object",
    properties: {
      titel: { type: "string", description: "De openingsvraag, max 16 woorden." },
      opties: {
        type: "array",
        minItems: 3,
        maxItems: 4,
        items: { type: "string" },
        description:
          "3 of 4 korte, branche-specifieke antwoordopties. De laatste is een eerlijke uitweg.",
      },
    },
    required: ["titel", "opties"],
  },
}

export async function kiesEersteVraag(analyse: SiteAnalyse): Promise<Vraag[]> {
  // Testmodus: deterministisch script in plaats van de betaalde call.
  if (mockActief()) {
    await mockVertraging("vraag")
    return mockEersteVraag()
  }
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
    const input = (blok?.input ?? {}) as { titel?: string; opties?: string[] }
    const titel = input.titel?.trim()
    const opties = (input.opties ?? [])
      .map((o) => (typeof o === "string" ? o.trim() : ""))
      .filter(Boolean)
      .slice(0, 4)
    if (
      titel &&
      titel.length >= 8 &&
      titel.length <= 160 &&
      !titel.includes("{{") &&
      opties.length >= 3
    ) {
      return [{ ...b1, titel, opties }]
    }
  } catch {
    // val terug op de neutrale opener uit de bibliotheek
  }
  return [b1]
}

// ─────────────────────────────────────────
// Slot 2+ — bedenk de volgende vraag op maat van de branche
// ─────────────────────────────────────────

type AntwoordKort = { vraagId: string; vraagTitel: string; waarde: unknown }

const VOLGENDE_SYSTEEM = `Je bedenkt de VOLGENDE vraag voor John's quickscan, helemaal op maat van dit specifieke bedrijf. John stelt de scan aan een MKB-ondernemer en gaat deze persoon straks BELLEN. Elke vraag moet dat belletje beter maken. Je krijgt de site-analyse (branche, niche, kansen) en de antwoorden tot nu toe.

Escalatieladder (hard):
- Vraag 2 en 3 zijn laagdrempelig klikken: "enkelkeuze" of "meerkeuze" met concrete opties. Nooit open, nooit huiswerk.
- Vanaf vraag 4 mag hooguit één open vraag in de hele scan, en alleen als de antwoorden tot nu toe betrokkenheid laten zien. De allerlaatste vraag is nooit een open vraag.
- Richting het einde altijd één kwalificatievraag: wie beslist mee, of hoe snel ze iets willen veranderen.

Elke vraag moet kwalificeren. Na de scan wil John weten: waar zit de pijn (welk werk vreet tijd), hoe urgent is het, wie beslist, en wijst dit richting iets bouwen, een training, of zelf doen. Een vraag die daar niks aan toevoegt stel je niet.

Harde regels:
- De vraag EN de opties zijn branche-specifiek. Verplaats je in dit bedrijf. Een cafe krijgt geen "offertes schrijven" maar bijvoorbeeld "reserveringen, no-shows, personeel inroosteren, voorraad bestellen". Een makelaar krijgt vragen over bezichtigingen en opvolging. Een webshop over voorraad, retouren en klantvragen. Nooit opties die niet bij dit type bedrijf passen.
- Type: "enkelkeuze" als er logisch één antwoord is (tempo, wie beslist), "meerkeuze" met 3 tot 6 opties als meerdere antwoorden waar kunnen zijn. De laatste optie van een keuzevraag mag "Iets anders" zijn.
- Bouw voort op het laatste antwoord. Was dat vaag of partieel ("deels", "wisselt te veel"), maak de volgende vraag juist concreter en dieper op precies dat punt.
- Koos iemand "Iets anders" (of een vergelijkbare uitwijk-optie)? Dan is de EERSTVOLGENDE vraag ALTIJD een doorvraag op dat "iets anders": kort en open ("Wat is dat bij jullie?") of een nieuwe keuzevraag met concretere opties. Nooit doorschakelen naar een ander onderwerp zolang dat "iets anders" niet ingevuld is; die uitzondering telt niet mee voor de regel van maximaal één open vraag.
- Zorg dat de scan ergens de operatie raakt (waar tijd weglekt, welk werk steeds terugkomt) en minstens één keer aansluit op de grootste AI-kans uit de analyse.
- Stel nooit dezelfde vraag twee keer. Geen jargon, geen verkoperige of defensieve toon. Nederlands, tutoyeren, geen em-dashes.
- Zet genoeg=true zodra pijn, urgentie en beslisser bekend zijn. Liever een vraag te weinig dan een vraag te veel, maar rond af op een klikvraag zodat het compleet voelt, niet abrupt.

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
        enum: ["enkelkeuze", "meerkeuze", "open"],
        description:
          "Het type vraag. Enkelkeuze als er logisch één antwoord is, meerkeuze als meerdere waar kunnen zijn, open alleen bij uitzondering.",
      },
      opties: {
        type: "array",
        items: { type: "string" },
        description: "3 tot 6 concrete, branche-relevante opties. Alleen bij keuzevragen.",
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
    return { id: `GEN${slot}`, thema: "operatie", type: input.type, titel, opties }
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

  // Testmodus: bekend script (5 vragen, alle typen), daarna genoeg.
  if (mockActief()) {
    await mockVertraging("vraag")
    return mockVolgendeVraag(slot)
  }

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
