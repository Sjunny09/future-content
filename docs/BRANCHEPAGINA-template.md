# Branchepagina-template (generieke skelet)

> Basis-template voor de 7 branchepagina's onder `/voor/{branche-slug}/`. Elke pagina gebruikt deze 8 secties. Branche-specifieke inhoud staat tussen `{accolades}` en wordt per branche ingevuld uit `PLATFORM-bouwplan.md` (skin) + `2026-05-28 sessie-log` (branche-onderzoek).

Laatst bijgewerkt: 2026-05-28

---

## Drie toetsstenen (uit interview)

Elke regel op elke branchepagina moet voldoen aan:
1. **Professioneel + geregeld zonder John** (continuïteit, Bram als achtervang, overdraagbaarheid)
2. **Denkproces delen, niet conclusie verkopen** ("ik zie, ik denk, ik bouw" boven "wij geloven")
3. **Anti-LinkedIn-format** (geen icoonkaartjes-rij met deugd-claims, wel kleine concrete zinnen die alleen John kan schrijven)

Plus persona-test-lessen die hier expliciet worden geadresseerd:
- **Geen "smart mailbox + route-optimalisatie"-lijstjes** waar niemand zichzelf in herkent. Wel branche-eigen taal.
- **Prijs-anker** ergens op de pagina, anders haakt 60% af.
- **Tweede brein concreet maken** voor déze branche (geen abstractie).
- **Eerlijk over cases** ("ik bouw graag de eerste echte case met je") in plaats van hobbywerk als bewijs.

---

## URL-structuur

- `/voor/transport-en-logistiek/`
- `/voor/bouw-installatie-afbouw/`
- `/voor/autobedrijf-en-garages/`
- `/voor/glazenwasser-en-schoonmaak/`
- `/voor/makelaardij/`
- `/voor/horeca/`
- `/voor/evenementen-en-festivals/`

In de navigatie verschijnen ze onder een nieuwe `/voor/` ingang. Of als sub-menu onder "Voor wie?" naast Werkwijze, Trainingen, Videografie etc.

---

## De 8 secties

### Sectie 1: Hero (branche-specifiek)

**Doel**: bezoeker voelt binnen 2 seconden "dit is voor mij".

**Structuur**:

- Eyebrow (uppercase tracked, gold): **`AI voor {branche-naam-natuurlijk}`**
- H1 (Playfair, groot, tracking-tight): **`{branche-specifieke-claim}`** → één zin die alleen voor déze branche werkt, niet voor anderen
- Lead (Inter, 2-3 zinnen): **`{branche-specifieke-observatie}`** + verwijzing naar wat John concreet doet
- CTA's: primair "Plan een gesprek" (naar `/boek`) + secundair "Bekijk de werkwijze" (naar `/werkwijze`)
- Trust line onderaan (4 puntjes): zelfde 4 als homepage (Bladel, eigenaarschap, AVG, continuïteit)

**Voorbeelden van wat een goede H1 doet**:
- Voor transport: *"AI voor wat tussen je mailbox en je TMS valt."* (specifiek-genoeg-gat, niet "complete platform")
- Voor bouw: *"Je vakmensen typen niet. Dat hoeft ook niet meer."* (raakt de wijdverbreide app-weerstand)
- Voor glazenwasser: *"Je telefoon stopt met rinkelen tijdens het werk."* (gouden tip uit persona-test)

**Vermijden**:
- Generieke claims als "AI voor jouw bedrijf"
- Buzzwords (revolutie, transformatie)
- Em-dashes

---

### Sectie 2: Wat ik nu zie bij {branche} (observatie / denkproces)

**Doel**: laten zien dat John déze branche begrijpt. Persona's haakten af op generieke "smart mailbox"-lijstjes. Hier komt branche-eigen taal.

**Structuur**:

- Eyebrow: **`Wat ik nu zie`**
- H2 (Playfair, groot): **`{vraag-of-constatering-die-de-branche-aanspreekt}`**
- Body (2-3 alinea's lopende tekst, géén bullets, géén iconen): denkproces + observatie + concrete situatie

**Wat erin komt per branche** (uit branche-onderzoek in sessie-log):
- Welke 3-5 dagelijkse processen tijd vreten
- Welke bestaande systemen al gangbaar zijn (Plan&Go voor transport, Realworks voor makelaars, Formitable voor horeca etc.) → toont dat John weet wat er speelt
- Waar het echte gat zit (uit AI-witte-vlek-analyse per branche)

**Schrijfstijl**: lopende paragrafen, geen lijstjes. Anti-LinkedIn.

**Voorbeeld-opening** (transport): *"Plan&Go of Transplan staat bij de meeste MKB-transporteurs al ergens te draaien. Wat die systemen prima doen: ritplanning, factuuradministratie, boordcomputer-koppeling. Wat ze niet doen: ongestructureerde mail-orders openen, vrije-tekst-opmerkingen interpreteren, klant-vragen ('waar is mijn zending?') beantwoorden. Daar valt dagelijks tijd weg bij de planner en op de telefoon."*

---

### Sectie 3: Wat AI hier wel en niet voor je doet (eerlijke afbakening)

**Doel**: trust opbouwen door anti-verkoop. Persona-test toonde dat John's eerlijkheid raakt.

**Structuur**:

Twee kolommen tegenover elkaar (of in mobile: na elkaar), géén iconen:

| **Wat AI hier wel doet** | **Wat AI hier níét doet** |
|---|---|
| `{punt 1 - branche specifiek}` | `{punt 1 - eerlijke afbakening}` |
| `{punt 2}` | `{punt 2}` |
| `{punt 3}` | `{punt 3}` |

**Voorbeeld** (transport):

| Wel | Niet |
|---|---|
| Inkomende mail-orders herkennen en in je TMS-staging zetten | Je TMS vervangen of opnieuw bouwen |
| Klant-vragen (track-and-trace, capaciteit) classificeren en concept-antwoord opstellen | Beslissen over rij- en rusttijden of CMR-juridische zaken |
| Planning-uitloop bij ziekte voorstellen ter goedkeuring door je planner | De planner vervangen |

**Schrijftoon**: nuchter, kort, zonder marketing-taal. Past bij toetssteen 2 (denkproces, geen conclusie).

---

### Sectie 4: Mijn skin voor {branche} (concreet wat ik bouw)

**Doel**: concreet maken wat John in déze branche bouwt. De skin uit `PLATFORM-bouwplan.md`.

**Structuur**:

- Eyebrow: **`Mijn skin voor {branche}`**
- H2 (Playfair): **`{naam van de skin als 1 zin}`** → bv. "Een AI-laag bovenop je TMS, niet ernaast" of "Een klant-WhatsApp-assistent die je planning ook echt aanpast"
- Lead: 1-2 zinnen over wat de skin in essentie doet
- Daarna 3-5 modules van de skin als korte alinea's (geen iconen, geen kaarten). Per module:
  - Module-naam in vet
  - 1-2 zinnen wat hij doet voor deze branche
  - Optional: 1 sub-zin met concreet voorbeeld

**Voorbeeld** (transport):

> **Mijn skin voor transport en logistiek**
>
> Een AI-laag bovenop je bestaande TMS, niet ernaast
>
> Ik bouw geen TMS. Dat doen Plan&Go en Transplan al jarenlang en goed. Wat ik wel bouw is de laag eromheen, waar voor MKB-transporteurs dagelijks tijd weglekt.
>
> **Order-intake uit mail en PDF.** Ongestructureerde orders van klanten komen binnen, AI herkent ze, zet ze in een staging-tabel waar je planner met 1 klik op accepteren drukt. Plan&Go-koppeling vooraf afgestemd.
>
> **Klantmail-triage.** Track-and-trace, capaciteitsvragen, klachten worden gesorteerd en krijgen concept-antwoord op basis van data uit je TMS. Jouw kantoor drukt op verzenden.
>
> **Planning-copilot bij uitval.** Bij ziekmelding stelt AI een nieuwe ritvolgorde voor, jouw planner accepteert of past aan.

---

### Sectie 5: Hoe je skin past op het platform

**Doel**: uitleggen dat dit geen losse oplossing is maar onderdeel van een groter geheel, dat ook andere bedrijven gebruiken. Toont schaalbaarheid + vermindert "ik ben een experiment"-zorg.

**Structuur**:

- Eyebrow: **`Eén platform, jouw skin`**
- Lead: korte uitleg + visual

Voorstel-tekst:
> "Wat ik voor {branche} bouw deelt zijn fundament met wat ik voor andere MKB-bedrijven bouw. Acht core-modules die elke klant heeft: mailtriage, een tweede brein, een persoonlijke assistent voor jou als eigenaar, afspraak-herinneringen, en nog wat. Daar bovenop komt de {branche}-skin. Dezelfde fundamenten, andere skin per bedrijf. Daarom kan ik het sneller en goedkoper aanbieden dan een bureau dat elke keer vanaf nul begint."

Visual-slot: **diagram** met 8 core-blokjes onderaan + 1 grote skin-blok bovenop. Eén simpel beeld dat het hele platform-idee draagt. Type: 🎨 illustratie, te ontwerpen.

---

### Sectie 6: Een typische eerste stap

**Doel**: pad naar werken-met-John tonen. Persona-test: prijs is zwart gat, dit blok lost dat op.

**Structuur**:

- Eyebrow: **`Een eerste stap`**
- H2: **`Een halve dag, op locatie, vanaf €750`**
- 2-3 alinea's: workshop → intake → bouwen, met focus op WAT JE NA DIE HALVE DAG KRIJGT

**Voorbeeldtekst** (kan voor alle 7 branches generiek):

> "De meeste klanten beginnen met een workshop op locatie. Een halve dag, vanaf €750. We staren niet naar een scherm maar gaan samen aan de slag op jullie eigen taken. Aan het einde van de middag heb je drie concrete kansen op papier, ongeacht of je daarna met mij verder gaat.
>
> Wil je daarna bouwen, dan begint dat met een intake-sessie waarin we je proces in kaart brengen en een tweede brein voor je bedrijf opzetten. Daarna kiezen we welke modules uit mijn platform passen, met de {branche}-skin als basis. Eenmalige bouw plus maandelijks beheer en credits. Het maandbedrag zie je vooraf op een dashboard, inclusief wat het je oplevert."

**Prijs-anker**: workshop €750 expliciet noemen. Implementatie blijft "vanaf X per maand" zonder hard getal in V1 (John heeft hier nog geen vaste prijs). Toch al concreet genoeg om de drempel uit Persona-test op te lossen.

---

### Sectie 7: Eerlijk over de stand (Cases of belofte)

**Doel**: persona-test toonde dat "Koningsdag-ticketshop als bewijs voor transport" niet werkt. Eerlijk zijn over wat John al heeft gebouwd in déze branche, en bij geen case: een eerlijk aanbod.

**Twee varianten**, afhankelijk van of John al een case heeft in die branche:

**Variant A — wel een case** (nog van toepassing, zodra Cotrans/Pit toestemming geven):

- Eyebrow: **`Wat ik al bouwde in {branche}`**
- H2: **`{titel van de case}`**
- Body: 3-4 zinnen verhaal + 1 concrete uitkomst-zin
- Quote van de klant (indien beschikbaar)
- Visual-slot: screenshot of foto

**Variant B — nog geen case** (huidige situatie voor alle 7 branches):

- Eyebrow: **`Eerlijk over de stand`**
- H2: **`Voor {branche} heb ik dit specifiek nog niet voor een klant gebouwd.`**
- Body:

> "Ik ben hier transparant over. De skin voor {branche} heb ik in mijn platform staan en ik weet wat erin moet zitten, dankzij {korte verwijzing naar relevant bewijs: bv 'mijn jaren bij BTT als business engineer in de transportsector' voor transport, of 'mijn jaren videografie voor makelaars' voor makelaardij, of 'het ticketsysteem dat ik voor onze eigen Koningsdag bouwde' voor evenementen}. Wat ik nog niet heb is een levende case in {branche}.
>
> Mijn eerste klant in {branche} krijgt daarom de workshop terug als korting op de bouwfase. Geen experiment voor jou, wel mijn investering om de eerste case neer te zetten."

**Schrijftoon**: directe taal, geen marketing. Past bij toetssteen 2 (denkproces, geen conclusie). De aanbieding (workshop terugverdienen) is concreet en eerlijk.

---

### Sectie 8: Final CTA

**Doel**: één duidelijke vervolgactie. Zelfde drie-uitkomsten-framing als homepage.

**Structuur**:

- H2 (Playfair, groot): **`Een half uur, gratis. Daarna weet je een van drie dingen.`**
- Body: "Of je kunt zelf verder en ik wijs je de juiste richting. Of een workshop is voor jullie team de beste eerste stap. Of we gaan samen iets bouwen."
- Primaire CTA (gold pil): **`Plan een gesprek`** → `/boek`

---

## Wat per branche specifiek wordt ingevuld

Per branche heb ik een mini-checklist nodig (uit sessie-log van 2026-05-28):

| Variabele | Bron |
|---|---|
| {branche-naam-natuurlijk} | gegeven |
| {branche-specifieke-claim-hero} | uit branche-onderzoek + interview |
| {branche-specifieke-observatie-sectie-2} | uit "Kernprocessen" + "AI-witte-vlek" per branche |
| {3 wel / 3 niet AI-doet-sectie-3} | uit "Top 5 AI-bouwopportunities" + "Risico's" per branche |
| {skin-naam-zin-sectie-4} | uit `PLATFORM-bouwplan.md` skin-tabel |
| {3-5 module-alinea's voor de skin} | uit branche-onderzoek per branche |
| {korte verwijzing naar relevant bewijs in sectie 7} | uit interview-uitkomsten of platform-bouwplan |

## Designnotities (voor straks bij coderen)

- Layout: 1100px max content-width, met dark-section-rythm volgens `DESIGN.md`
- Sectie 5 (platform-visual) is de enige sectie met expliciet illustratie-slot — heeft eigen kaart
- Sectie 7 dark-section-variant (`#0F0F0D` achtergrond) om de "eerlijk over de stand"-zin te accentueren als gespreksmoment
- Geen iconen, geen kaarten-rijen, geen gradients (zie `DESIGN.md` Bans)

## Volgende stap

Akkoord op deze 8-sectie-skelet? Dan begin ik per branche in te vullen, in deze volgorde (van warmste tot koudste):

1. **Transport** — Cotrans-gesprek komt eraan, dus deze skin als eerste
2. **Makelaardij** — bestaande relatie, content-engine al in ontwikkeling
3. **Evenementen** — Koningsdag is bewijs, direct herbruikbaar
4. **Glazenwasser/schoonmaak** — sterke witte vlek, eigen bedrijfssysteem als blauwdruk
5. **Bouw/installatie/afbouw** — grootste markt, maar nog geen warme intro
6. **Autobedrijf** — sleeper-kandidaat
7. **Horeca** — lage fit, last in line
