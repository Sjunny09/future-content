/**
 * Testmodus voor de scan. Actief bij SCAN_MOCK=1, nooit in productie.
 *
 * Ontwerp (zie TESTMODUS.md): de mock zit op de laagst mogelijke seam. Alleen
 * de twee betaalde externe stappen worden gefaket: de scrape en de LLM-calls.
 * Alles stroomafwaarts (pipeline, statusovergangen, database-rows, polling,
 * componenten) blijft 100% echt. Er worden dus WEL echte ScanJob- en
 * Answer-rows geschreven.
 *
 * Synchroon-garantie: elke fixture is expliciet getypeerd met het ECHTE
 * return-type van de echte functie (import type). Verandert de scan-structuur
 * zonder dat de fixtures meegaan, dan faalt `npm run build`. Dat is bewust.
 */

import type { SiteData } from "@/lib/scan/scraper"
import type { SiteAnalyse } from "@/lib/scan/claude"
import type { Vraag } from "@/lib/scan/vragen/bibliotheek"
import type { Diagnose } from "@/lib/scan/diepte"

// ─────────────────────────────────────────
// Aan/uit en tempo
// ─────────────────────────────────────────

export function mockActief(): boolean {
  // Nooit in productie, wat er ook in de env staat. Dit is de harde grendel.
  if (process.env.NODE_ENV === "production") return false
  return process.env.SCAN_MOCK === "1"
}

type Stap = "scrape" | "observaties" | "analyse" | "vraag" | "diagnose"

// "snel" (standaard): vlot doorklikken. "echt": realistische duur per stap,
// zodat je het wachtscherm en de fase-teksten in echt tempo ziet langslopen.
const TEMPO_SNEL: Record<Stap, number> = {
  scrape: 300,
  observaties: 400,
  analyse: 1200,
  vraag: 250,
  diagnose: 400,
}
const TEMPO_ECHT: Record<Stap, number> = {
  scrape: 4_000,
  observaties: 2_500,
  analyse: 18_000,
  vraag: 1_500,
  diagnose: 4_000,
}

export async function mockVertraging(stap: Stap): Promise<void> {
  const tempo = process.env.SCAN_MOCK_SPEED === "echt" ? TEMPO_ECHT : TEMPO_SNEL
  await new Promise((r) => setTimeout(r, tempo[stap]))
}

// ─────────────────────────────────────────
// Fixtures: scrape en analyse
// ─────────────────────────────────────────

export function mockSiteData(url: string): SiteData {
  return {
    url,
    title: "Installatiebedrijf Jansen | Warmtepompen en airco in de Kempen",
    description:
      "Installatiebedrijf Jansen installeert en onderhoudt warmtepompen, airco's en zonneboilers voor woningen en bedrijfspanden in de Kempen.",
    h1: "Duurzaam verwarmen zonder gedoe",
    hoofdtekst:
      "Installatiebedrijf Jansen is een familiebedrijf uit Bladel met acht monteurs. " +
      "We installeren warmtepompen, airco's en zonneboilers bij woningen en bedrijfspanden in de hele Kempen. " +
      "Van eerste advies tot onderhoud: je krijgt bij ons een vast aanspreekpunt. " +
      "Onze planning loopt via de telefoon en de mail, en offertes maken we op basis van een bezoek aan huis. " +
      "Klanten waarderen ons om de korte lijnen en het nakomen van afspraken. " +
      "Voor storingen hebben we een aparte servicedienst die binnen 24 uur langskomt.",
    quotes: [
      "Van eerste advies tot onderhoud: je krijgt bij ons een vast aanspreekpunt.",
      "Klanten waarderen ons om de korte lijnen en het nakomen van afspraken.",
      "Voor storingen hebben we een aparte servicedienst die binnen 24 uur langskomt.",
    ],
    bron: "cheerio",
  }
}

export function mockAnalyse(): SiteAnalyse {
  return {
    branche: "installatiebedrijf, gespecialiseerd in warmtepompen en airco's",
    niche:
      "familiebedrijf met een eigen servicedienst en een vast aanspreekpunt per klant, dat is in deze branche niet vanzelfsprekend",
    tone:
      "De teksten zijn warm en direct, je-vorm, weinig jargon. Het leest als een bedrijf dat gewend is om bij mensen aan de keukentafel te zitten. Zakelijk waar het moet, persoonlijk waar het kan.",
    kansen: [
      {
        titel: "Offertes uit het adviesbezoek laten schrijven",
        beschrijving:
          "Na elk bezoek aan huis wordt nu handmatig een offerte gemaakt. Met een vast sjabloon en de aantekeningen van het bezoek kan dat grotendeels vanzelf. Dat scheelt per offerte zo een uur, en de klant heeft hem dezelfde dag nog.",
      },
      {
        titel: "Storingsmeldingen automatisch sorteren en inplannen",
        beschrijving:
          "De servicedienst belooft binnen 24 uur langs te komen. Meldingen komen nu per telefoon en mail binnen. Een slim formulier dat urgentie en regio meteen meepakt maakt de planning een stuk rustiger.",
      },
      {
        titel: "Onderhoudsklanten vanzelf laten terugkomen",
        beschrijving:
          "Warmtepompen en airco's hebben jaarlijks onderhoud nodig. Een automatische herinnering per klant, in jullie eigen toon, houdt de onderhoudsagenda vol zonder dat iemand lijstjes hoeft bij te houden.",
      },
    ],
  }
}

export function mockObservaties(): string[] {
  return [
    "Ik open je homepage en zie meteen waar jullie voor staan…",
    "Ik lees je teksten, die klinken warm en zonder poespas…",
    "Ik kijk naar je diensten, van advies tot storingsdienst…",
    "Me valt op dat jullie een vast aanspreekpunt beloven, dat is sterk.",
  ]
}

// ─────────────────────────────────────────
// Fixtures: vragenscript quickscan
// ─────────────────────────────────────────
//
// Deterministisch script dat ELK vraagtype dekt: enkelkeuze (B1), meerkeuze,
// open. Na 5 inhoudelijke vragen stopt het script (null = genoeg), dan volgt
// de email-stap uit de echte route. Totaal dus: 5 vragen + email. Handig om
// de voortgangsbalk tegen een bekend totaal te controleren.

export function mockEersteVraag(): Vraag[] {
  return [
    {
      id: "B1",
      thema: "bevestiging",
      type: "enkelkeuze",
      titel: "Als je nu naar je eigen site en werkweek kijkt, wat zit je het meest dwars?",
      opties: [
        "Te weinig aanvragen",
        "Offertes en administratie vreten tijd",
        "Planning is elke week een puzzel",
        "Eigenlijk niks, het loopt",
      ],
    },
  ]
}

const MOCK_VERVOLG: Vraag[] = [
  {
    id: "GEN2",
    thema: "operatie",
    type: "meerkeuze",
    titel: "Waar lekt bij jullie de meeste tijd weg?",
    opties: [
      "Offertes en mails schrijven",
      "Planning rondkrijgen",
      "Dezelfde klantvragen beantwoorden",
      "Administratie bijwerken",
      "Iets anders",
    ],
  },
  {
    id: "GEN3",
    thema: "klantkant",
    type: "meerkeuze",
    titel: "Hoe houden jullie klantafspraken nu bij?",
    opties: [
      "In mail en WhatsApp",
      "In een gedeelde agenda",
      "In een systeem of CRM",
      "Vooral in iemands hoofd",
    ],
  },
  {
    id: "GEN4",
    thema: "frustratie",
    type: "open",
    titel: "Welke taak zou je morgen het liefst kwijt zijn?",
  },
  {
    id: "GEN5",
    thema: "voorbereiding",
    type: "meerkeuze",
    titel: "Hoe snel wil je dat er iets verandert?",
    opties: ["Liefst deze maand", "Dit kwartaal", "Dit jaar", "Geen haast"],
  },
]

export function mockVolgendeVraag(slot: number): Vraag | null {
  // slot 2 t/m 5 komen uit het script, daarna is het genoeg (email volgt).
  const vraag = MOCK_VERVOLG.find((v) => v.id === `GEN${slot}`)
  return vraag ?? null
}

// ─────────────────────────────────────────
// Fixtures: vragenscript uitgebreide scan
// ─────────────────────────────────────────
//
// Acht diepe vragen (DV1 t/m DV8), alle typen gedekt. Zodra afronden mag
// (bijnaKlaar), stopt het script: de dieptescan telt dus precies 8 vragen.

const MOCK_DIEPTE: Vraag[] = [
  {
    id: "DV1",
    thema: "operatie",
    type: "enkelkeuze",
    titel: "Hoeveel uur per week gaat er nu in offertes zitten?",
    opties: ["Minder dan 2 uur", "2 tot 5 uur", "5 tot 10 uur", "Meer dan 10 uur"],
  },
  {
    id: "DV2",
    thema: "tools",
    type: "meerkeuze",
    titel: "Met welke systemen werken jullie dagelijks?",
    opties: ["Outlook of Gmail", "Een boekhoudpakket", "Een planningstool", "WhatsApp Business", "Iets anders"],
  },
  {
    id: "DV3",
    thema: "voorbereiding",
    type: "open",
    titel: "Wat hebben jullie al geprobeerd om dit makkelijker te maken?",
  },
  {
    id: "DV4",
    thema: "operatie",
    type: "enkelkeuze",
    titel: "Hoe vaak komt dit werk terug?",
    opties: ["Elke dag", "Een paar keer per week", "Een paar keer per maand", "Wisselt sterk"],
  },
  {
    id: "DV5",
    thema: "voorbereiding",
    type: "enkelkeuze",
    titel: "Wie beslist er mee over zoiets aanpakken?",
    opties: ["Ik beslis zelf", "Samen met een compagnon", "Een leidinggevende", "Weet ik nog niet"],
  },
  {
    id: "DV6",
    thema: "operatie",
    type: "meerkeuze",
    titel: "Wie in het bedrijf raakt dit werk allemaal?",
    opties: ["Alleen ik", "Kantoor", "De monteurs of buitendienst", "Ook onze klanten"],
  },
  {
    id: "DV7",
    thema: "voorbereiding",
    type: "enkelkeuze",
    titel: "Hoe snel zouden jullie hier iets aan willen doen?",
    opties: ["Zo snel mogelijk", "Binnen een paar maanden", "Ergens dit jaar", "Geen haast"],
  },
  {
    id: "DV8",
    thema: "wens",
    type: "open",
    titel: "Wat zou het opleveren als dit grotendeels vanzelf ging?",
  },
]

export function mockDiepteVraag(slot: number, bijnaKlaar: boolean): Vraag | null {
  if (bijnaKlaar) return null
  return MOCK_DIEPTE.find((v) => v.id === `DV${slot}`) ?? null
}

// ─────────────────────────────────────────
// Fixture: diagnose (intern, voor John)
// ─────────────────────────────────────────

export function mockDiagnose(): Diagnose {
  return {
    advies: "bouw",
    kop: "Hier ligt een concrete bouwkans: offertes automatiseren op hun eigen sjabloon.",
    onderbouwing:
      "Ze zijn wekelijks meer dan vijf uur kwijt aan offertes en de eigenaar beslist zelf. Het werk komt elke dag terug en raakt zowel kantoor als de monteurs. Ze hebben al eerder een tool geprobeerd, dus de drempel om iets nieuws te proberen is laag. Volume, urgentie en beslisser zitten alle drie goed.",
    signalen: [
      "Meer dan 5 uur per week aan offertes",
      "Beslist zelf, wil binnen een paar maanden iets veranderen",
      "Werkt nu versnipperd in mail en losse systemen",
    ],
    vervolg:
      "In het gesprek zou ik het proof of concept voorstellen: een halve dag meedraaien, dan binnen een week laten zien wat een offerte-generator hen aan tijd oplevert.",
  }
}
