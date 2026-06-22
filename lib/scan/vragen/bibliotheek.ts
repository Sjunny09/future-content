// Bibliotheek van ±30 vragen. Haiku kiest per scan 5 relevante vragen.
// Vraag 6 is altijd EMAIL_NAAM (zie 03_ceo_synthese.md §1.5).
//
// Bronnen: 02_team_rapporten.md §7 (Adaptive Question Engineer, vraagbibliotheek).

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
  titel: "Waar stuur ik de video naartoe?",
  helptekst:
    "Binnen 24 uur stuur ik je een korte video met wat ik zag. Geen nieuwsbrief.",
}

export const VRAGEN_BIBLIOTHEEK: Vraag[] = [
  // ── Bevestiging (B1-B3)
  {
    id: "B1",
    thema: "bevestiging",
    type: "enkelkeuze",
    titel: "Ik zag dat jullie vooral {{hoofdactiviteit|dat wat op de site staat}} doen — klopt dat nog?",
    opties: ["Ja, dat klopt", "Deels — zit nog meer aan vast", "Nee, dat is veranderd"],
  },
  {
    id: "B2",
    thema: "bevestiging",
    type: "enkelkeuze",
    titel: "Werken jullie vooral voor particulieren of voor bedrijven?",
    opties: ["Vooral particulieren", "Vooral bedrijven", "Ongeveer gelijk verdeeld"],
  },
  {
    id: "B3",
    thema: "bevestiging",
    type: "enkelkeuze",
    titel: "Is dat nog steeds waar jullie omzet vandaan komt, of verschuift het?",
    opties: ["Nog steeds zo", "Aan het verschuiven", "Al behoorlijk veranderd"],
  },

  // ── Dagelijkse frustratie (F1-F7)
  {
    id: "F1",
    thema: "frustratie",
    type: "open",
    titel: "Wat kost je deze week het meeste tijd dat je liever niet doet?",
  },
  {
    id: "F2",
    thema: "frustratie",
    type: "open",
    titel: "Welke taken komen elke week terug en voelen herhalend?",
  },
  {
    id: "F3",
    thema: "frustratie",
    type: "enkelkeuze",
    titel: "Hoe vaak werk je 's avonds door aan administratie?",
    opties: ["Nooit", "1-2 keer per week", "3-4 keer per week", "Bijna elke avond"],
  },
  {
    id: "F4",
    thema: "frustratie",
    type: "enkelkeuze",
    titel: "Wat vreet de meeste tijd?",
    opties: ["Offertes schrijven", "Planning rondkrijgen", "Communicatie met klanten", "Facturatie", "Iets anders"],
  },
  {
    id: "F5",
    thema: "frustratie",
    type: "open",
    titel: "Als je één taak kon laten verdwijnen, welke zou dat zijn?",
  },
  {
    id: "F6",
    thema: "frustratie",
    type: "enkelkeuze",
    titel: "Hoeveel uur per week ben je kwijt aan herhalende vragen van klanten?",
    opties: ["Minder dan 1 uur", "1-3 uur", "3-6 uur", "Meer dan 6 uur"],
  },
  {
    id: "F7",
    thema: "frustratie",
    type: "open",
    titel: "Is er een specifieke dag of moment in de week waarop je vastloopt?",
  },

  // ── Klantkant (K1-K5)
  {
    id: "K1",
    thema: "klantkant",
    type: "meerkeuze",
    titel: "Waar komen klantvragen vooral binnen? (max 3)",
    opties: ["Via formulier op site", "Via mail", "Via telefoon", "Via WhatsApp", "Via LinkedIn of social", "Via doorverwijzing"],
  },
  {
    id: "K2",
    thema: "klantkant",
    type: "enkelkeuze",
    titel: "Hoe snel reageer je meestal op een offerte-aanvraag?",
    opties: ["Binnen een paar uur", "Zelfde dag", "Binnen 1-2 dagen", "Soms blijft het langer liggen"],
  },
  {
    id: "K3",
    thema: "klantkant",
    type: "enkelkeuze",
    titel: "Krijg je vaak dezelfde vragen van verschillende klanten?",
    opties: ["Ja, regelmatig", "Af en toe", "Nee, elke klant is anders"],
  },
  {
    id: "K4",
    thema: "klantkant",
    type: "open",
    titel: "Hoe maak je nu een offerte — vanaf niks, op basis van een template, of iets anders?",
  },
  {
    id: "K5",
    thema: "klantkant",
    type: "meerkeuze",
    titel: "Waar komen nieuwe klanten vooral vandaan? (max 3)",
    opties: ["Via de site", "Via mond-tot-mond", "Via Google", "Via social media", "Via een partner of doorverwijzer", "Anders"],
  },

  // ── Operatie (O1-O5)
  {
    id: "O1",
    thema: "operatie",
    type: "open",
    titel: "Hoe plan je je week nu — in een agenda, op papier, in je hoofd?",
  },
  {
    id: "O2",
    thema: "operatie",
    type: "enkelkeuze",
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
    type: "enkelkeuze",
    titel: "Gebruik je nu één systeem voor klantinfo, of zit het verspreid?",
    opties: ["Eén systeem, alles netjes op z'n plek", "Twee of drie systemen", "Vooral in mail en WhatsApp", "Echt versnipperd"],
  },
  {
    id: "O5",
    thema: "operatie",
    type: "open",
    titel: "Hoe ziet jullie week eruit qua klantafspraken buiten kantoor?",
  },

  // ── Groei-ambitie (G1-G4)
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
    id: "G3",
    thema: "groei",
    type: "enkelkeuze",
    titel: "Is groeien een doel, of is rust belangrijker?",
    opties: ["Groeien is het doel", "Rust en stabiliteit", "Allebei een beetje"],
  },
  {
    id: "G4",
    thema: "groei",
    type: "enkelkeuze",
    titel: "Ben je bereid iets in je werkwijze te veranderen als het duidelijk tijd scheelt?",
    opties: ["Ja, graag", "Ja, mits niet te ingewikkeld", "Liever niet — routine werkt voor mij"],
  },

  // ── Tools (T1-T4)
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
    type: "enkelkeuze",
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
    type: "enkelkeuze",
    titel: "Als iets 'extra software' heet, ben je dan geneigd 'nee' te zeggen?",
    opties: ["Ja, meteen", "Hangt ervan af", "Nee, ik sta open voor nieuwe tools"],
  },

  // ── Gesprek-voorbereiding (V1-V3)
  {
    id: "V1",
    thema: "voorbereiding",
    type: "enkelkeuze",
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
    type: "enkelkeuze",
    titel: "Beslis je zelf, of is er iemand die meebeslist?",
    opties: ["Ik beslis zelf", "Samen met een compagnon of partner", "Via een team of board"],
  },

  // ── Wens (WENS) — welke richting past best bij deze ondernemer?
  {
    id: "WENS",
    thema: "wens",
    type: "enkelkeuze",
    titel: "Waar denk je dat de grootste winst voor jou zit?",
    opties: ["video-content", "chatbot-automatisering", "onboarding-flow", "nog-niet-zeker"],
    helptekst: "Geen verplichting, John gebruikt dit om zijn video-analyse scherp te richten.",
  },
]

export function vindVraag(id: string): Vraag | undefined {
  if (id === "EMAIL") return EMAIL_NAAM_VRAAG
  return VRAGEN_BIBLIOTHEEK.find((v) => v.id === id)
}
