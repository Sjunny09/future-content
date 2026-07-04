import Anthropic from "@anthropic-ai/sdk"
import type { SiteAnalyse } from "@/lib/scan/claude"
import type { Vraag } from "@/lib/scan/vragen/bibliotheek"

// De uitgebreide (diepte) scan: een tweede, diepere ronde adaptieve vragen na de
// quickscan. Haiku bedenkt elke vraag op maat (dieper dan de quickscan, gericht op
// kwalificatie), Sonnet maakt aan het eind de diagnose bouw/training/zelf voor John.
const MODEL_VRAGEN = "claude-haiku-4-5"
const MODEL_DIAGNOSE = "claude-sonnet-4-6"

// Aantal diepe vragen: minimaal MIN voordat de AI mag afronden, hard maximum MAX.
export const MIN_DIEPTE = 8
export const MAX_DIEPTE = 14

let clientSingleton: Anthropic | null = null
function client(): Anthropic {
  if (!clientSingleton) {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) throw new Error("ANTHROPIC_API_KEY ontbreekt")
    clientSingleton = new Anthropic({ apiKey })
  }
  return clientSingleton
}

type AntwoordKort = { vraagId: string; vraagTitel: string; waarde: unknown }

function formatteerWaarde(waarde: unknown): string {
  if (Array.isArray(waarde)) return waarde.join(", ")
  if (typeof waarde === "string") return waarde
  return JSON.stringify(waarde)
}

function formatteerAntwoorden(antwoorden: AntwoordKort[]): string[] {
  return antwoorden.length
    ? antwoorden.map((a) => `- ${a.vraagTitel}: ${formatteerWaarde(a.waarde)}`)
    : ["(nog geen)"]
}

// ─────────────────────────────────────────
// Diepe vraag bedenken (Haiku, tool-use)
// ─────────────────────────────────────────

const DIEPTE_SYSTEEM = `Je bedenkt de VOLGENDE vraag voor John's UITGEBREIDE scan: een tweede, diepere ronde nadat iemand de gratis quickscan al deed. Deze scan duurt 10-15 minuten en gaat veel dieper. Doel: John genoeg geven om in te schatten of hier een BOUW-kans ligt (een tool/automatisering bouwen), of dat een TRAINING genoeg is, of dat ze het ZELF kunnen.

Je krijgt de site-analyse (branche, niche, 3 kansen) en alle antwoorden tot nu toe (quickscan + diepte). Bedenk één concrete vervolgvraag op maat van dit bedrijf.

Harde regels:
- Ga DIEPER dan de quickscan. Niet opnieuw "wat kost tijd", maar doorvragen: hoe vaak gebeurt het, hoeveel uur per week, met welke tools/systemen nu, waar loopt het stuk, wat is al geprobeerd.
- Diep minstens een van de 3 kansen uit de analyse concreet uit (volume, frequentie, wie doet het nu, hoeveel tijd). Volume en frequentie zijn goud: daarmee kan John straks in het gesprek voorrekenen wat het oplevert in tijd of geld.
- Kwalificeer richting bouw vs training: vraag naar wie meebeslist, hoeveel mensen het raakt, hoe vaak het terugkomt, hoe snel ze iets willen veranderen, en of er een systeem is waar het op moet aansluiten. Veel volume plus een beslisser aan tafel wijst naar bouw; honger om te leren bij klein volume wijst naar training.
- Type: meestal "enkelkeuze" of "meerkeuze" met 3 tot 6 concrete, branche-relevante opties. Af en toe "open" voor iets dat echt tekst nodig heeft, nooit twee open vragen achter elkaar. De laatste optie van een keuzevraag mag "Iets anders" zijn.
- Bouw voort op het laatste antwoord. Stel nooit een vraag die al gesteld is (quickscan of diepte).
- Koos iemand "Iets anders" (of een vergelijkbare uitwijk-optie)? Dan is de EERSTVOLGENDE vraag altijd een doorvraag op precies dat punt, open of met concretere opties. Niet doorschakelen naar een ander onderwerp zolang dat "iets anders" niet ingevuld is.
- Nederlands, tutoyeren, geen jargon, geen verkooppraat, geen em-dashes. John's toon: nuchter, nieuwsgierig, op ooghoogte.
- Zet genoeg ALLEEN op true als je in het bericht expliciet leest dat afronden mag. Zolang die instructie er niet staat, bedenk je altijd een volgende vraag (nooit genoeg=true).

Output uitsluitend via de tool diepte_vraag.`

const DIEPTE_TOOL: Anthropic.Tool = {
  name: "diepte_vraag",
  description:
    "Bedenk de volgende diepe vraag op maat, of geef met genoeg=true aan dat er genoeg gevraagd is.",
  input_schema: {
    type: "object",
    properties: {
      genoeg: {
        type: "boolean",
        description: "True als er genoeg gevraagd is om af te ronden.",
      },
      titel: {
        type: "string",
        description: "De volgende vraag, branche-specifiek, dieper dan de quickscan.",
      },
      type: { type: "string", enum: ["enkelkeuze", "meerkeuze", "open"] },
      opties: {
        type: "array",
        items: { type: "string" },
        description: "3 tot 6 concrete opties (alleen bij enkelkeuze of meerkeuze).",
      },
    },
    required: [],
  },
}

function bouwDiepteVraag(
  input: { titel?: string; type?: string; opties?: string[] },
  slot: number,
): Vraag | null {
  const titel = input.titel?.trim()
  if (!titel || titel.length < 6 || titel.length > 200) return null
  if (input.type === "open") {
    return { id: `DV${slot}`, thema: "operatie", type: "open", titel }
  }
  if (input.type === "enkelkeuze" || input.type === "meerkeuze") {
    const opties = (input.opties ?? [])
      .map((o) => (typeof o === "string" ? o.trim() : ""))
      .filter(Boolean)
      .slice(0, 6)
    if (opties.length < 2) return null
    return { id: `DV${slot}`, thema: "operatie", type: input.type, titel, opties }
  }
  return null
}

export async function kiesDiepteVraag(args: {
  analyse: SiteAnalyse
  antwoorden: AntwoordKort[]
  gesteldeIds: string[]
  slot: number
  bijnaKlaar?: boolean
}): Promise<Vraag | null> {
  const { analyse, antwoorden, slot, bijnaKlaar = false } = args

  const content = [
    `Diepe vraag die je nu bedenkt: nummer ${slot}`,
    "",
    "SiteAnalyse:",
    `- branche: ${analyse.branche}`,
    `- niche: ${analyse.niche}`,
    "- kansen:",
    ...analyse.kansen.map((k) => `  • ${k.titel}: ${k.beschrijving}`),
    "",
    "Antwoorden tot nu toe (quickscan + diepte):",
    ...formatteerAntwoorden(antwoorden),
    "",
    bijnaKlaar
      ? "Er is nu genoeg basis. Je mag afronden: zet genoeg=true als een volgende vraag echt niks meer toevoegt voor de bouw/training-inschatting. Anders nog een gerichte vraag."
      : "Er zijn nog te weinig vragen gesteld. Stel sowieso een volgende, diepere vraag en zet genoeg NIET op true.",
  ].join("\n")

  // Onder de ondergrens (bijnaKlaar=false) negeren we 'genoeg' en proberen we
  // desnoods een tweede keer, zodat de diepe scan nooit na één vraag stopt.
  const maxPogingen = bijnaKlaar ? 1 : 2
  for (let poging = 0; poging < maxPogingen; poging++) {
    try {
      const response = await client().messages.create({
        model: MODEL_VRAGEN,
        max_tokens: 400,
        system: [{ type: "text", text: DIEPTE_SYSTEEM, cache_control: { type: "ephemeral" } }],
        tools: [DIEPTE_TOOL],
        tool_choice: { type: "tool", name: "diepte_vraag" },
        messages: [{ role: "user", content }],
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
      // 'genoeg' telt alleen als afronden expliciet mag.
      if (bijnaKlaar && input.genoeg) return null
      const v = bouwDiepteVraag(input, slot)
      if (v) return v
    } catch {
      // probeer het eventueel nog een keer
    }
  }
  return null
}

// Vast vangnet: branche-neutrale, kwalificerende diepe vragen. Worden gebruikt
// als het AI-model (tijdelijk) niks bruikbaars teruggeeft, zodat de uitgebreide
// scan NOOIT vroegtijdig na één vraag stopt. Acht stuks: genoeg om de ondergrens
// te halen, ook als de AI helemaal niets levert.
const DIEPTE_VANGNET: Vraag[] = [
  { id: "DVF1", thema: "operatie", type: "enkelkeuze", titel: "Hoeveel tijd gaat er per week ongeveer zitten in het werk dat we net bespraken?", opties: ["Minder dan 2 uur", "2 tot 5 uur", "5 tot 10 uur", "Meer dan 10 uur"] },
  { id: "DVF2", thema: "tools", type: "open", titel: "Met welke systemen of tools doen jullie dit nu?" },
  { id: "DVF3", thema: "operatie", type: "enkelkeuze", titel: "Hoe vaak komt dit werk terug?", opties: ["Elke dag", "Een paar keer per week", "Een paar keer per maand", "Wisselt sterk"] },
  { id: "DVF4", thema: "operatie", type: "enkelkeuze", titel: "Hoeveel mensen binnen je bedrijf raakt dit werk?", opties: ["Alleen ik", "Een paar collega's", "Het hele team", "Ook onze klanten"] },
  { id: "DVF5", thema: "voorbereiding", type: "open", titel: "Wat heb je tot nu toe al geprobeerd om dit makkelijker te maken?" },
  { id: "DVF6", thema: "voorbereiding", type: "enkelkeuze", titel: "Wie beslist er mee over zoiets aanpakken?", opties: ["Ik beslis zelf", "Samen met collega's", "Een leidinggevende of eigenaar", "Weet ik nog niet"] },
  { id: "DVF7", thema: "voorbereiding", type: "enkelkeuze", titel: "Hoe snel zouden jullie hier iets aan willen veranderen?", opties: ["Zo snel mogelijk", "Binnen een paar maanden", "Ergens dit jaar", "Geen haast"] },
  { id: "DVF8", thema: "wens", type: "open", titel: "Wat zou het je opleveren als dit grotendeels vanzelf zou gaan?" },
]

function kiesDiepteVangnet(gesteldeIds: string[]): Vraag | null {
  return DIEPTE_VANGNET.find((v) => !gesteldeIds.includes(v.id)) ?? null
}

// Bepaalt de volgende diepe vraag gegeven de huidige staat. Persisteert NIET; de
// caller schrijft diepteVragenJson. Geeft null als de diepe scan klaar is.
export async function volgendeDiepteVraag(args: {
  analyse: SiteAnalyse | null
  antwoorden: AntwoordKort[]
  gesteldeVragen: Vraag[]
  diepAntwoordIds: Set<string>
}): Promise<Vraag | null> {
  const { analyse, antwoorden, gesteldeVragen, diepAntwoordIds } = args
  // Replay: laatst gestelde diepe vraag nog niet beantwoord -> die opnieuw tonen.
  const alGekozen = [...gesteldeVragen]
    .reverse()
    .find((v) => !diepAntwoordIds.has(v.id))
  if (alGekozen) return alGekozen

  const aantalDiep = diepAntwoordIds.size
  if (aantalDiep >= MAX_DIEPTE) return null

  const gesteldeIds = gesteldeVragen.map((v) => v.id)

  if (analyse) {
    const aiVraag = await kiesDiepteVraag({
      analyse,
      antwoorden,
      gesteldeIds,
      slot: aantalDiep + 1,
      bijnaKlaar: aantalDiep >= MIN_DIEPTE,
    })
    if (aiVraag) return aiVraag
  }

  // AI gaf niks bruikbaars (of geen analyse). Onder de ondergrens stoppen we
  // NOOIT: een vaste vangnet-vraag houdt de scan op gang tot minstens MIN_DIEPTE.
  if (aantalDiep < MIN_DIEPTE) return kiesDiepteVangnet(gesteldeIds)
  return null
}

// ─────────────────────────────────────────
// Diagnose: bouw vs training vs zelf (Sonnet, tool-use)
// ─────────────────────────────────────────

export type Diagnose = {
  advies: "bouw" | "training" | "zelf"
  kop: string
  onderbouwing: string
  signalen: string[]
  vervolg: string
}

const DIAGNOSE_SYSTEEM = `Je bent de strategisch adviseur van John (Future Content). Een prospect heeft net de uitgebreide scan ingevuld. Op basis van de site-analyse en alle antwoorden geef je John een korte, eerlijke inschatting voor het kennismakingsgesprek: is dit een BOUW-kans, is een TRAINING genoeg, of kunnen ze het ZELF?

Definities:
- "bouw": er is terugkerend, concreet werk dat een tool of automatisering rechtvaardigt, met genoeg volume en een beslisser die mee wil. Hier zit John's geld.
- "training": het team kan het met begeleiding zelf, of het volume is te klein voor een bouw, maar er is wel honger om met AI aan de slag te gaan.
- "zelf": ze kunnen met een paar tips zelf verder, er is nu geen passende opdracht.

Wees nuchter en eerlijk, geen verkooppraat. Dit is John's interne voorbereiding, in zijn stem (ik-vorm waar passend), Nederlands, geen em-dashes.

Output uitsluitend via de tool schrijf_diagnose.`

const DIAGNOSE_TOOL: Anthropic.Tool = {
  name: "schrijf_diagnose",
  description: "Leg de bouw/training/zelf-inschatting voor John vast.",
  input_schema: {
    type: "object",
    properties: {
      advies: { type: "string", enum: ["bouw", "training", "zelf"] },
      kop: { type: "string", description: "Eén zin: de kern van de inschatting." },
      onderbouwing: {
        type: "string",
        description: "3 tot 5 zinnen waarom, op basis van de antwoorden.",
      },
      signalen: {
        type: "array",
        items: { type: "string" },
        description: "Concrete signalen uit de antwoorden die het advies dragen.",
      },
      vervolg: {
        type: "string",
        description: "Wat John concreet zou voorstellen in het gesprek.",
      },
    },
    required: ["advies", "kop", "onderbouwing", "signalen", "vervolg"],
  },
}

export async function genereerDiagnose(args: {
  analyse: SiteAnalyse | null
  antwoorden: AntwoordKort[]
}): Promise<Diagnose | null> {
  const { analyse, antwoorden } = args
  try {
    const response = await client().messages.create({
      model: MODEL_DIAGNOSE,
      max_tokens: 1024,
      system: [{ type: "text", text: DIAGNOSE_SYSTEEM, cache_control: { type: "ephemeral" } }],
      tools: [DIAGNOSE_TOOL],
      tool_choice: { type: "tool", name: "schrijf_diagnose" },
      messages: [
        {
          role: "user",
          content: [
            "SiteAnalyse:",
            analyse ? `- branche: ${analyse.branche}` : "- (geen analyse)",
            analyse ? `- niche: ${analyse.niche}` : "",
            ...(analyse ? ["- kansen:", ...analyse.kansen.map((k) => `  • ${k.titel}: ${k.beschrijving}`)] : []),
            "",
            "Alle antwoorden (quickscan + uitgebreide scan):",
            ...formatteerAntwoorden(antwoorden),
          ]
            .filter(Boolean)
            .join("\n"),
        },
      ],
    })
    const blok = response.content.find(
      (b): b is Anthropic.ToolUseBlock => b.type === "tool_use",
    )
    if (blok?.name === "schrijf_diagnose") {
      return blok.input as Diagnose
    }
  } catch {
    // diagnose faalde -> null, John kan het gesprek alsnog op de antwoorden voorbereiden
  }
  return null
}
