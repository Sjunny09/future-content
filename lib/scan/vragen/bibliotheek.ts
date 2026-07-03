// Vragenpool voor de adaptieve Quickscan. B1 staat altijd op slot 1 (vooraf
// gekozen tijdens de analyse). Daarna kiest de AI na elk antwoord de volgende
// vraag uit deze pool (zie selecteer.ts). De email-vraag is altijd slot 6.
//
// Bronnen: 02_team_rapporten.md §7 + vragen-audit juni 2026.

export type VraagType = "enkelkeuze" | "meerkeuze" | "open" | "email-naam"

export type Vraag = {
  id: string // "B1" | "F1" | … | "EMAIL"
  thema:
    | "bevestiging"
    | "frustratie"
    | "klantkant"
    | "operatie"
    | "groei"
    | "tools"
    | "voorbereiding"
    | "contact"
    | "wens"
  type: VraagType
  titel: string
  opties?: string[]
  helptekst?: string
}

export const EMAIL_NAAM_VRAAG: Vraag = {
  id: "EMAIL",
  thema: "contact",
  type: "email-naam",
  titel: "Laat je gegevens achter en krijg direct toegang tot je persoonlijke resultaten.",
  helptekst:
    "Als bonus stuur ik je binnen 24 uur een persoonlijke video met wat ik zag. Geen nieuwsbrief.",
}

export const VRAGEN_BIBLIOTHEEK: Vraag[] = [
  // ── Bevestiging (opener, altijd slot 1)
  {
    id: "B1",
    thema: "bevestiging",
    type: "enkelkeuze",
    titel: "Ik zag dat jullie vooral {{hoofdactiviteit|dat wat op de site staat}} doen, klopt dat nog?",
    opties: ["Ja, dat klopt", "Deels, zit nog meer aan vast", "Nee, dat is veranderd"],
  },
  {
    id: "B2",
    thema: "bevestiging",
    type: "meerkeuze",
    titel: "Werken jullie vooral voor particulieren of voor bedrijven?",
    opties: ["Vooral particulieren", "Vooral bedrijven", "Ongeveer gelijk verdeeld"],
  },

  // ── Dagelijkse frustratie
  {
    id: "F1",
    thema: "frustratie",
    type: "open",
    titel: "Wat kost je deze week het meeste tijd dat je liever niet doet?",
  },
  {
    id: "F4",
    thema: "frustratie",
    type: "meerkeuze",
    titel: "Wat vreet de meeste tijd?",
    opties: ["Offertes schrijven", "Planning rondkrijgen", "Communicatie met klanten", "Facturatie", "Iets anders"],
  },
  {
    id: "F5",
    thema: "frustratie",
    type: "open",
    titel: "Als je één taak kon laten verdwijnen, welke zou dat zijn?",
  },

  // ── Klantkant
  {
    id: "K1",
    thema: "klantkant",
    type: "meerkeuze",
    titel: "Waar komen klantvragen vooral binnen? (max 3)",
    opties: ["Via formulier op site", "Via mail", "Via telefoon", "Via WhatsApp", "Via LinkedIn of social", "Via doorverwijzing"],
  },
  {
    id: "K3",
    thema: "klantkant",
    type: "meerkeuze",
    titel: "Krijg je vaak dezelfde vragen van verschillende klanten?",
    opties: ["Ja, regelmatig", "Af en toe", "Nee, elke klant is anders"],
  },
  {
    id: "K4",
    thema: "klantkant",
    type: "open",
    titel: "Hoe maak je nu een offerte: vanaf niks, op basis van een template, of iets anders?",
  },
  {
    id: "K5",
    thema: "klantkant",
    type: "meerkeuze",
    titel: "Waar komen nieuwe klanten vooral vandaan? (max 3)",
    opties: ["Via de site", "Via mond-tot-mond", "Via Google", "Via social media", "Via een partner of doorverwijzer", "Anders"],
  },
  {
    id: "K6",
    thema: "klantkant",
    type: "meerkeuze",
    titel: "Hoeveel tijd per week ben je kwijt aan dezelfde klantvragen?",
    opties: ["Minder dan 1 uur", "1-3 uur", "3-6 uur", "Meer dan 6 uur"],
  },

  // ── Operatie (waar de automatisering zit)
  {
    id: "O1",
    thema: "operatie",
    type: "open",
    titel: "Hoe plan je je week nu: in een agenda, op papier, in je hoofd?",
  },
  {
    id: "O2",
    thema: "operatie",
    type: "meerkeuze",
    titel: "Wie doet de administratie?",
    opties: ["Ik zelf", "Een medewerker binnen het bedrijf", "Een externe boekhouder of VA", "Combinatie"],
  },
  {
    id: "O3",
    thema: "operatie",
    type: "open",
    titel: "Hoe houd je nu bij wat er is afgesproken met een klant?",
  },
  {
    id: "O4",
    thema: "operatie",
    type: "meerkeuze",
    titel: "Gebruik je nu één systeem voor klantinfo, of zit het verspreid?",
    opties: ["Eén systeem, alles netjes op z'n plek", "Twee of drie systemen", "Vooral in mail en WhatsApp", "Echt versnipperd"],
  },
  {
    id: "O6",
    thema: "operatie",
    type: "meerkeuze",
    titel: "Wie handelt deze terugkerende taken nu af?",
    opties: ["Vooral ik zelf", "Een vaste medewerker", "Verdeeld over het team", "Uitbesteed aan extern of VA"],
  },

  // ── Groei-ambitie (zelden, nooit in slot 1-3)
  {
    id: "G1",
    thema: "groei",
    type: "open",
    titel: "Waar wil je over 12 maanden staan met het bedrijf?",
  },
  {
    id: "G2",
    thema: "groei",
    type: "open",
    titel: "Wat houdt je nu tegen om die stap te zetten?",
  },
  {
    id: "G4",
    thema: "groei",
    type: "meerkeuze",
    titel: "Ben je bereid iets in je werkwijze te veranderen als het duidelijk tijd scheelt?",
    opties: ["Ja, graag", "Ja, mits niet te ingewikkeld", "Liever niet, routine werkt voor mij"],
  },

  // ── Tools (readiness + framing van de video)
  {
    id: "T1",
    thema: "tools",
    type: "meerkeuze",
    titel: "Welke tools gebruiken jullie dagelijks? (max 3)",
    opties: ["Microsoft 365 / Outlook", "Google Workspace", "WhatsApp Business", "Exact / Moneybird / ander boekhoudpakket", "Een CRM", "Iets anders"],
  },
  {
    id: "T2",
    thema: "tools",
    type: "meerkeuze",
    titel: "Heb je ooit met AI-tools gewerkt (ChatGPT, Copilot, Claude)?",
    opties: ["Ja, gebruik ik geregeld", "Af en toe geprobeerd", "Nee, nog niet"],
  },
  {
    id: "T3",
    thema: "tools",
    type: "open",
    titel: "Wie in het bedrijf is het meest digitaal handig?",
  },
  {
    id: "T4",
    thema: "tools",
    type: "open",
    titel: "Welke tool heb je ooit geprobeerd en weer laten vallen? Waarom?",
  },

  // ── Gesprek-voorbereiding + kwalificatie
  {
    id: "V1",
    thema: "voorbereiding",
    type: "meerkeuze",
    titel: "Hoe snel zou je willen dat er iets verandert?",
    opties: ["Liefst nu al", "Binnen een maand", "Binnen een kwartaal", "Dit jaar is goed"],
  },
  {
    id: "V2",
    thema: "voorbereiding",
    type: "open",
    titel: "Wat zou deze scan waardevol voor je maken?",
  },
  {
    id: "V3",
    thema: "voorbereiding",
    type: "meerkeuze",
    titel: "Beslis je zelf, of is er iemand die meebeslist?",
    opties: ["Ik beslis zelf", "Samen met een compagnon of partner", "Via een team of board"],
  },
  {
    id: "V4",
    thema: "voorbereiding",
    type: "meerkeuze",
    titel: "Wat houdt je vandaag het meest tegen?",
    opties: ["Tijd", "Geld", "Kennis", "Mankracht", "Niets concreets, het loopt wel"],
  },

  // ── Wens (welke richting past best)
  {
    id: "WENS",
    thema: "wens",
    type: "meerkeuze",
    titel: "Welk deel van je werk voelt het meest als hetzelfde kunstje, steeds opnieuw?",
    opties: ["Klantcommunicatie", "Planning en agenda", "Offertes en facturen", "Rapportage of administratie", "Wisselt te veel om te zeggen"],
    helptekst: "Helpt me jouw video scherper te richten.",
  },
]

export function vindVraag(id: string): Vraag | undefined {
  if (id === "EMAIL") return EMAIL_NAAM_VRAAG
  return VRAGEN_BIBLIOTHEEK.find((v) => v.id === id)
}
