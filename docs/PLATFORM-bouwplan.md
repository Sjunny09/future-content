# Future Content — Modulair AI-platform bouwplan

> Bron-document voor het modulaire AI-platform van John Lavrijsen. Vastgesteld 2026-05-28 na branche-onderzoek (zie `REVIEW-interview-uitkomsten.md` en de 8 agent-rapporten in deze sessie). Geen one-off oplossingen, wel één platform met core-modules + branche-skins.

Laatst bijgewerkt: 2026-05-28

---

## Architectuur in één alinea

Het platform heeft een vaste **core** van 8 modules die voor elke klant nuttig zijn, en daarboven **branche-skins** die per branche extra modules en sjablonen toevoegen. Een nieuwe klant koopt de core + de skin van zijn branche. Hergebruik tussen klanten is daarom hoog, prijs per klant kan zakken naarmate het platform rijpt.

---

## De 8 core-modules

Elk core-module heeft een klein begin (MVP) en kan later groeien. Eerste opzet voor solo + Bram in 4-6 weken.

| # | Module | MVP-scope (eerste versie) |
|---|---|---|
| 1 | **Mail-triage & classificatie** | Inkomende mail labelen (offerteaanvraag/klacht/factuur/spam), samenvatten, doorzetten naar juiste mailbox of CRM-veld. |
| 2 | **Tweede brein (RAG)** | Gestructureerde kennislaag over processen, klanten en toon-of-voice. Klant kan natuurlijk vragen stellen aan eigen bedrijfsdata (mail, Drive, klantdocumenten). |
| 3 | **AI-chatbot op site (RAG)** | Chatwidget op klant-website, beantwoordt vragen uit eigen kennislaag, zet leads door. |
| 4 | **Persoonlijke assistent ondernemer** | Dagstart-rapport: prioriteit-mails, agenda-samenvatting, top-3 acties. |
| 5 | **Formulier-naar-CRM** | Webformulier → AI verrijkt (KvK, bedrijfsgrootte, signalen) → CRM-record + automatische taak. |
| 6 | **Afspraak-herinneringen** | T-24u en T-2u WhatsApp/SMS met bevestig- of reschedule-knop. |
| 7 | **Offerte-opvolg-agent** | Herinnert klant 3/7/14 dagen na offerte, past toon aan op eerder gesprek. |
| 8 | **Bon-/factuur-verwerking** | Foto bon → boekingsregel in Moneybird/Exact-staging. (Integreren met Klippa, niet zelf bouwen.) |

---

## 7 branche-skins (bovenop de core)

| Branche | Branche-specifieke skin (extra modules) | Onontgonnen voordeel |
|---|---|---|
| Transport en logistiek | **Order-intake-AI uit mail/PDF** + klantmail-triage + planning-copilot (geen vervanger TMS) | John's 4 jaar BTT-DNA |
| Bouw, installatie, afbouw | **WhatsApp-uren-bot** + voicememo-naar-offerte + foto-naar-werkbon + klant-update-bot | Vakman doet wat hij al doet, AI structureert |
| Autobedrijf en garages | **AI-receptionist** gekoppeld aan DMS-agenda (Autoflex/WinCar/CarSys) + lead-opvolging occasions + occasion-listings-generator + review-respons | 40% gemiste calls is BOVAG-pijnpunt 1 |
| Glazenwasser/schoonmaak | **Klant-WhatsApp-assistent met planning-mutatie** (verzetten, sleutels, herplan bij ziekte) | Niemand combineert tweerichtings-conversatie met planning-write |
| Makelaardij | **Content-engine-makelaardij**: video-opname → Funda-tekst + 3 social posts + brochure-PDF | John's video-DNA + bestaande relatie + content-engine in ontwikkeling |
| Horeca | **DM/mail-triage merger → reserveringssysteem** (Formitable/Resengo) + review-respons + no-show-bot | Bonnie dekt telefoon, niemand combineert DM + mail + WhatsApp |
| Evenementen | **Ticketshop-as-a-service** (Mollie-flow) + AI-FAQ-bot + vrijwilligers-planning | Koningsdag-build is direct herbruikbaar, kostenvoordeel €1,40 → €0,32 per ticket |

**Belangrijke schrappingen** uit John's eerste ideeën, na onderzoek:
- Autobedrijf: APK-mail, werkplaatsplanning, parts-screening zitten al in DMS. Skip.
- Transport: "compleet platform" niet bouwen, te zwaar tegenover Plan&Go/Transplan met 20 jaar voorsprong. Bouw AI-laag bovenop hun TMS.
- Bouw: geen aparte app voor medewerkers. WhatsApp/voice gebruiken die ze toch al hebben.

---

## Onontgonnen NL-MKB-gaten (echte differentiators)

Uit het meta-onderzoek: vijf modules waar nog geen serieuze NL-MKB-speler zit, en die John kan claimen:

1. Urenstaten uit voicememo (transport, bouw, schoonmaak)
2. Foto-naar-werkbon (installatie, bouw, glazenwasser)
3. Materiaal-registratie via spraak (installatie, bouw)
4. WhatsApp-intake bot (installatie, autobedrijf, glazenwasser)
5. Bezichtigingen-cluster-planner (makelaardij)

Deze worden ingebouwd in de branche-skins waar ze passen.

---

## Bouwvolgorde

### Fase 1 — Core + transport-skin (eerste pilot)

**Pilot-klant**: Cotrans (transport). Belletje wordt deze week verwacht, anders neemt John zelf contact op.

**Te bouwen**:
- Vier core-modules: mail-triage, tweede brein, persoonlijke assistent, afspraak-herinneringen
- Transport-skin: order-intake-AI uit mail/PDF, klantmail-triage
- TMS-koppeling: kies één (Plan&Go of Transplan), word daarin specialist

**Doorlooptijd**: 4-6 weken voor MVP.

**Aandachtspunten**: Bram inschakelen voor TMS-koppeling-diepte. Pilot positioneren, geen productie-SLA in fase 1.

### Fase 2 — 2e branche-skin

Welke skin als 2e hangt af van wie het eerst ja zegt na Fase 1. Kandidaten in volgorde van warme intro:
- Makelaardij (bestaande relatie, content-engine al in ontwikkeling)
- Evenementen (Koningsdag-build direct herbruikbaar voor 2e evenement)
- Glazenwasser/schoonmaak (sterke witte vlek, eigen bedrijfssysteem als blauwdruk)

### Fase 3+ — Andere skins

Per branche bij wie het eerst aanhaakt. Geen volgorde vooraf vastleggen, vraag-gestuurd.

---

## Open beslissingen (parkeerplaats)

| Punt | Status | Volgende stap |
|---|---|---|
| Tech-stack voor core | Open | Beslissen in eerste week Fase 1: kandidaten n8n/Make + Anthropic/OpenAI + Supabase/Postgres + Resend |
| Prijsmodel | Open | Beslissen bij Cotrans-pitch: eenmalige bouw + maandelijks platform-fee + credits-doorbelasting |
| Bram's rol in Fase 1 | Open | Gesprek John ↔ Bram inplannen vóór Cotrans-pitch |
| Klant-eigenaarschap-afspraken | Open | Standaard-overdraagbaarheid-clausule opstellen vóór eerste contract |
| Modulair platform repo-structuur | Open | Initiele scaffold maken zodra core-modules vastgelegd zijn |

---

## Wat dit bouwplan betekent voor de website

- Homepage zet **de 8 core-modules** centraal als "wat ik bouw"
- 7 branchepagina's, elk met dezelfde core + branche-specifieke skin als hoofdverhaal
- Cotrans-pilot wordt na oplevering de eerste echte case op de transport-pagina (na akkoord van Cotrans)
- Tot dan: branchepagina's eerlijk over "ik bouw graag de eerste case met je" voor branches zonder klant

---

## Verwijzingen

- `REVIEW-interview-uitkomsten.md` — John's interview-bron + toetsstenen
- `REVIEW-open-secties.md` — visual-slots per pagina
- `HOMEPAGE-voorstel-v1.md` — eerste tekst-voorstel (wordt herzien op basis van dit bouwplan)
