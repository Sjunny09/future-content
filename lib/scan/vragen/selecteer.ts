import Anthropic from "@anthropic-ai/sdk"
import type { SiteAnalyse } from "@/lib/scan/claude"
import {
  EMAIL_NAAM_VRAAG,
  VRAGEN_BIBLIOTHEEK,
  vindVraag,
  type Vraag,
} from "@/lib/scan/vragen/bibliotheek"

// Haiku 4.5 kiest 5 vragen uit de bibliotheek; slot 6 is altijd email+naam.
// Zie 03_ceo_synthese.md §1.8 voor model-rationale.
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

const SYSTEEM = `Je kiest voor John 5 vragen uit een bibliotheek die hij aan een MKB-ondernemer gaat stellen. Slot 6 wordt later automatisch een email-vraag.

Regels:
- Slot 1 is altijd "B1" (bevestigingsvraag). Herschrijf de titel zodat "{{hoofdactiviteit|…}}" vervangen is door iets concreets uit de branche-omschrijving ("warmtepompen installeren", "fysiotherapie geven", etc). Gebruik geen jargon. Max 14 woorden. Werkwoord-vorm: "Ik zag dat jullie vooral X doen — klopt dat nog?".
- Slot 2-4: drie inhoudelijke vragen. Minstens één uit thema "frustratie" (F*). Minstens één die direct aansluit bij de grootste AI-kans. Max één per thema (behalve frustratie mag 2x).
- Slot 5: kies tussen V1 (urgentie) of T2 (AI-ervaring). V1 als ondernemer al praktisch lijkt, T2 als tone/kansen suggereren dat AI nieuw voor ze is.
- Geen G-vragen (groei) in slot 1-3.
- Als de site heel leeg is of de branche onduidelijk, kies conservatieve vragen uit frustratie + klantkant.

Output via tool \`kies_vragen\`. Geef 5 vraag-ids in volgorde. Titel-override alleen bij B1.`

const TOOL: Anthropic.Tool = {
  name: "kies_vragen",
  description: "Kies 5 vraag-ids en lever optioneel een titel-override voor B1.",
  input_schema: {
    type: "object",
    properties: {
      vragen: {
        type: "array",
        minItems: 5,
        maxItems: 5,
        items: {
          type: "object",
          properties: {
            id: { type: "string", description: "Vraag-id uit de bibliotheek, bv. B1, F1, K2" },
            titel_override: {
              type: "string",
              description: "Optionele gepersonaliseerde titel. Alleen bij B1 invullen.",
            },
          },
          required: ["id"],
        },
      },
    },
    required: ["vragen"],
  },
}

function bibliotheekSamenvatting(): string {
  return VRAGEN_BIBLIOTHEEK.map((v) => `- ${v.id} [${v.thema}] ${v.titel}`).join(
    "\n",
  )
}

export async function selecteerVragen(
  analyse: SiteAnalyse,
): Promise<Vraag[]> {
  const response = await client().messages.create({
    model: MODEL_SELECTIE,
    max_tokens: 1024,
    system: [
      {
        type: "text",
        text: SYSTEEM,
        cache_control: { type: "ephemeral" },
      },
    ],
    tools: [TOOL],
    tool_choice: { type: "tool", name: "kies_vragen" },
    messages: [
      {
        role: "user",
        content: [
          "SiteAnalyse:",
          `- branche: ${analyse.branche}`,
          `- niche: ${analyse.niche}`,
          `- tone: ${analyse.tone}`,
          `- kansen:`,
          ...analyse.kansen.map((k) => `  • ${k.titel}: ${k.beschrijving}`),
          "",
          "Bibliotheek:",
          bibliotheekSamenvatting(),
        ].join("\n"),
      },
    ],
  })

  const toolBlok = response.content.find(
    (blok): blok is Anthropic.ToolUseBlock => blok.type === "tool_use",
  )
  if (!toolBlok || toolBlok.name !== "kies_vragen") {
    throw new Error("haiku-gaf-geen-vragen-terug")
  }

  const input = toolBlok.input as {
    vragen: Array<{ id: string; titel_override?: string }>
  }

  const gekozen = resolveerVragen(input.vragen)

  // Slot 6 is altijd email+naam.
  return [...gekozen, EMAIL_NAAM_VRAAG]
}

function resolveerVragen(
  keuzes: Array<{ id: string; titel_override?: string }>,
): Vraag[] {
  const uit: Vraag[] = []
  const gezien = new Set<string>()

  for (const keuze of keuzes) {
    if (gezien.has(keuze.id)) continue
    const vraag = vindVraag(keuze.id)
    if (!vraag || vraag.id === "EMAIL") continue
    gezien.add(keuze.id)
    uit.push(
      keuze.titel_override && keuze.id === "B1"
        ? { ...vraag, titel: keuze.titel_override }
        : vraag,
    )
  }

  // Defensive: als Haiku minder dan 5 bruikbare ids gaf, vul aan met een veilige set.
  if (uit.length < 5) {
    const veilig = ["B1", "F1", "F4", "K1", "V1"]
    for (const id of veilig) {
      if (uit.length >= 5) break
      if (gezien.has(id)) continue
      const v = vindVraag(id)
      if (v) {
        uit.push(v)
        gezien.add(id)
      }
    }
  }

  return uit.slice(0, 5)
}
