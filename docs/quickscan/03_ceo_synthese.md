# CEO-synthese — harde beslissingen

Na de rapporten van het team van 10 bleven er tien open discussies over. Hieronder per conflict de afweging en de knoop die is doorgehakt. Daarna de definitieve tech-stack, visuele richting en de niet-onderhandelbare vangrails.

Datum synthese: 2026-04-21
Beslisser: CEO-agent, in opdracht van John Lavrijsen
Status: **definitief** — hiermee wordt Sprint 1 gestart

---

## 1. Conflict-resolutie (10 knopen)

### 1. Naam van het product
**Opties:** "AI-scan" (generiek), "De Maandagcheck" (intern/warm), geen productnaam (alleen John + Future Content).

**Keuze: geen productnaam op de landing.** "De Maandagcheck" wordt interne codenaam voor John. Op de pagina heet het simpelweg *"Laat me even naar je bedrijf kijken"* — een zin, geen merk.

**Waarom:** elke productnaam (zeker iets met "AI" of "scan") plaatst de flow in de categorie die we juist willen vermijden. Geen naam = geen verwachting = de openingscopy mag het werk doen.

### 2. Wat de bezoeker invult bij de start
**Opties:** (A) alleen URL, (B) bedrijfsnaam + URL, (C) URL + email voor we beginnen.

**Keuze: A — alleen URL.** Eén invoerveld, één knop. Email komt pas bij vraag 6.

**Waarom:** Funnel-agent had gelijk: elke extra vraag vooraf kost 10-15% conversie. De bedrijfsnaam halen we uit de scrape (title-tag, H1, footer). Als dat faalt vragen we het bij de eerste observatie-slide terug. De "Zuckerberg-trap" (eenmaal iets ingevuld, dan door) werkt ook met alleen URL.

### 3. Wat ziet de gebruiker tijdens de 35-45s wachttijd
**Opties:** (A) 4 statische pitch-slides "wat biedt Future Content", (B) dynamische observatie-slides met live-scrape-fragmenten, (C) combinatie.

**Keuze: B — dynamische observatie-slides.** De slides tonen werkelijke flarden van hun eigen site die net gescraped is. Voorbeeld-sequentie:
1. *"Ik lees je homepage…"* — toont H1 en eerste zin
2. *"Ik kijk naar je tonaliteit…"* — toont 3 quotes uit hun teksten
3. *"Ik zoek waar jullie over gaan…"* — toont services/producten die gevonden zijn
4. *"Eén ding valt me al op…"* — toont een eerste-indruk-observatie die Claude genereert tijdens de scrape

**Waarom:** Adviseur 1's "spiegelmoment" wordt hier al geactiveerd, niet pas aan het eind. De klant ziet zichzelf door John's ogen zodra hij de URL heeft ingevuld. Pitch-slides over Future Content zijn generiek en kosten aandacht — observatie-slides doen precies wat de belofte van de pagina is.

**Risico dat geaccepteerd is:** als de scrape mislukt (robots.txt, Cloudflare, JS-site) valt dit schema om. Fallback: één statische slide *"Ik kom nog niet door je site heen — vertel me in twee zinnen waar je bedrijf om draait"* met textarea. Daarna gewone vraag-flow.

### 4. Aantal vragen
**Opties:** 5 (hard), 6, 7, of 10-12 (Copy-agent).

**Keuze: 6 vragen.** Één meer dan het psychologische minimum, onder de rode vlag van Adviseur 1 (7-klif).

**Waarom:** 5 voelt dun (ondernemer denkt "dit kan geen goede analyse worden"), 7+ verliest mensen. 6 is genoeg om echt te personaliseren. De vragen zijn niet universeel — routing (Haiku) kiest per sessie welke 6 uit de bibliotheek van 32 relevant zijn.

### 5. Wanneer vragen we email
**Opties:** (A) direct bij start, (B) na vraag 1, (C) als voorlaatste/laatste vraag.

**Keuze: C — vraag 6 is email (+ naam).** Pas nadat de klant 5 inhoudelijke vragen heeft beantwoord vragen we hoe we de video kunnen sturen.

**Waarom:** email is een commitment-moment. Als we het vroeg vragen denken ze "deze wil gewoon m'n data". Als we het laat vragen is de ruilwaarde duidelijk: zij hebben tijd geïnvesteerd, wij beloven de Loom-video binnen 24u. De email voelt dan als een adres voor een cadeau, niet als een sales-lead.

### 6. Wat gebeurt er na de scan
**Opties:** (A) alleen video-belofte, (B) alleen €495 pilot-CTA, (C) gratis gesprek inplannen, (D) combinatie.

**Keuze: D in de volgorde video-belofte (primair) → €495 pilot-CTA (secundair, zelfde scherm) → gesprek alleen via exit-intent.**

**Schermopbouw eindpagina:**
- Bovenin: *"Dankjewel [voornaam]. Binnen 24 uur stuur ik je een korte video."* (hero)
- Daaronder: *"Wil je vooruit? Voor €495 doe ik een pilotweek rondom één concreet proces. Ik bouw, jij kijkt mee, eind van de week staat er iets."* — met iDEAL-knop
- Exit-intent: als de muis naar de tab gaat → *"Of wil je het eerst even bellen? Plan 20 min."* → Cal.com-embed

**Waarom:** Adviseur 2 was scherp — gratis gesprek als eerste optie is de dood. Maar pilot-CTA als énige optie na de scan voelt te pushy voor mensen die nog moeten "bezinken". Video-belofte is de warme hand, pilot-CTA is de hardere hand ernaast, gesprek vangt de twijfelaars. Drie trappen, één scherm.

### 7. Hoe runnen we de 35-45s scrape+analyse zonder timeout
**Opties:** (A) synchrone request (durft niet op Hobby, wel op Pro), (B) async job-queue met polling, (C) edge-streaming.

**Keuze: B — async job-queue met status-polling.**

**Architectuur:**
- `POST /api/scan/start` → creëert job, returned `jobId`, start background work (fire-and-forget via `waitUntil`)
- `GET /api/scan/[jobId]/status` → polled elke 1.5s door de client
- Background: scrape (Jina primair → cheerio fallback) → Claude Sonnet analyse → schrijft naar Neon
- Client poll → switches per status (`scraping` → `analysing` → `ready`) → drijft observatie-slides aan

**Waarom:** synchrone request op Vercel Pro (60s max) werkt in theorie, maar één trage scrape (8s) + trage Claude-call (20s) + edge-cases = timeouts in productie. Async schaalt ook beter als we straks 50 scans/dag doen. Extra bonus: de slides kunnen natuurlijk op de polling-status reageren, waardoor de timing organisch voelt.

### 8. Welke Claude-modellen + hoe prompt-caching
**Opties:** (A) alleen Sonnet voor alles, (B) Sonnet hoofdanalyse + Haiku vraagselectie + Haiku observatie-regels.

**Keuze: B — gelaagd model-gebruik met prompt-caching.**

- **claude-sonnet-4-6**: hoofdanalyse (branche, niche, huisstijl, drie AI-kansen). Krijgt de volledige scrape. Tool-use met strict JSON-schema. Systeem-prompt (±1.200 tokens) is gecached.
- **claude-haiku-4-5**: vraagselectie uit de bibliotheek van 32 (kiest 6 o.b.v. branche + profiel). Ook gebruikt voor de 3-4 observatie-regels tijdens de wachttijd. Snel + goedkoop.
- **Prompt-caching**: systeem-prompts van beide modellen in `cache_control: ephemeral`. Bij elke nieuwe scan hetzelfde systeem-prompt → cache-hit op Anthropic-zijde → 90% kostenreductie op die tokens.

**Waarom:** Sonnet voor alles is overkill op vraagselectie (kost kwartje i.p.v. cent, 3x langzamer). Haiku voor alles is te dom voor de hoofdanalyse (mist nuance). Gescheiden models = juiste tool voor de juiste klus, en caching maakt het 24/7 betaalbaar.

### 9. Visuele taal (fonts, kleuren, componenten)
**Opties:** (A) GT Sectra + Söhne + neutral-palette (premium, betaald), (B) Fraunces + IBM Plex Sans + warm-aarde (gratis, 90% dezelfde vibe), (C) Inter + huidige paarse Sitekick-styling (gevaarlijk — lijkt op elke SaaS).

**Keuze: B — Fraunces + IBM Plex Sans + warm-aarde palet.**

**Palet:**
- `#F4F1EA` linnen — hoofdachtergrond
- `#1C1B17` drukinkt-zwart — body-tekst en headlines
- `#B8472A` gebrand terracotta — enige accent (knoppen, progress, linkjes)
- Geen gradient. Geen paars. Geen schaduwen met kleur.

**Typografie:**
- **Fraunces** (serif, gratis, Google Fonts) — headlines, display. Heeft dezelfde warmte als GT Sectra.
- **IBM Plex Sans** (sans, gratis, Google Fonts) — body, UI, labels. Nette humanist sans.

**Componenten:**
- Geen shadcn-default look. Radix primitives + eigen Tailwind. Ronde hoeken klein (`rounded-md`, niet `rounded-2xl`).
- Foto John rechts-boven op elke stap (klein, rond, zwart-wit). Dezelfde foto door de hele flow → continuïteit.
- Geen iconen voor decoratie. Alleen functionele iconen (pijl, check, laden).

**Waarom:** GT Sectra + Söhne zijn beter maar kosten licenties. Fraunces + IBM Plex komt 90% van de weg en is gratis. Het warm-aarde palet is expliciet géén "AI-branding" — het is een handgedrukte letter-op-linnen vibe, wat past bij "John kijkt even mee", niet bij "onze AI analyseert".

### 10. Betaling (€495 pilotweek)
**Opties:** (A) Stripe only, (B) Mollie only, (C) Mollie primair + Stripe fallback.

**Keuze: C — Mollie iDEAL primair, Stripe kaarten als fallback.**

**Flow:**
- Knop "Start pilot voor €495" → Mollie checkout (iDEAL standaard-geselecteerd)
- Kleine link eronder: *"Liever met creditcard? Via Stripe."*
- Beide betalingen schrijven naar dezelfde `Payment` tabel in Neon, status `paid` triggert mail naar John ("Nieuwe pilot geboekt: [bedrijfsnaam]").

**Waarom:** NL MKB-DGA betaalt iDEAL. Stripe kaart-checkout is voor de <10% die kaart prefereert (expats, creditcard-gewoonte). Twee PSP's is meer werk, maar iDEAL is niet-onderhandelbaar voor NL doelgroep en Stripe-fallback is een half uurtje werk. Mollie is Nederlands, pricing is transparant (€0.29 per iDEAL), AVG/EU-compliant uit de doos.

---

## 2. Definitieve tech-stack

### Frontend
- **Next.js 16** (App Router, React Server Components waar mogelijk)
- **React 19**
- **Tailwind CSS 4** (met custom design-tokens, geen default theme)
- **Radix UI** primitives (dialog, dropdown, tooltip, progress)
- **motion/react** (framer-motion v11) voor slide-transities en progress-animaties
- **Fraunces** + **IBM Plex Sans** via `next/font/google`
- **Plausible** cookieless analytics (script in root layout)

### Backend / data
- **Neon Postgres** (EU-region, branching voor preview-deploys)
- **Prisma** ORM (schema in `prisma/schema.prisma`, migraties geautomatiseerd)
- **Upstash Redis** voor rate-limiting (`@upstash/ratelimit`) — 10 scans per IP per uur
- **Vercel Pro** hosting (EU-region pinned, 60s function timeout, `waitUntil` voor async)

### AI / scraping
- **Anthropic SDK** `@anthropic-ai/sdk`
  - `claude-sonnet-4-6` (hoofdanalyse, tool-use JSON, prompt-caching)
  - `claude-haiku-4-5` (vraagselectie + observatieregels)
  - **Zero Data Retention** aangezet (nodig voor AVG)
- **Jina Reader** (`https://r.jina.ai/{url}`) primaire scraper (markdown-output, handelt JS-rendering af)
- **cheerio** + native fetch als fallback-scraper (voor als Jina limiteert)
- **SSRF-guard**: URL-validator weigert private IP-ranges, localhost, file://

### Integraties extern
- **Mollie** iDEAL-betaling (`@mollie/api-client`)
- **Stripe** kaart-fallback (`stripe` SDK)
- **Cal.com** embed voor gesprek (`@calcom/embed-react`)
- **Resend** transactionele mail (EU-region, `resend` SDK) — bevestigings-mail + John's notificatie
- **Sentry** errors (met `beforeSend` PII-scrubber)

### DevOps
- **Vercel** preview-deploys op elke PR
- **GitHub Actions** voor lint + typecheck + Prisma-migrate-diff op PR
- **Neon branching** — elke preview krijgt eigen DB-branch
- **Environment-variabelen** in Vercel (EU-region) en lokaal in `.env.local` (nooit commit)

### Observability
- **Sentry** voor runtime errors (alle API routes gewrapt)
- **Plausible** voor funnel-events (scan-start, vraag-1-klaar, vraag-6-klaar, pilot-geboekt)
- **Neon**-queries voor funnel-analyse (stap-dropoff, gemiddelde sessieduur)

---

## 3. Visuele direction — eindbeeld

Als je de pagina een frame zou geven: een vel crèmepapier op een houten tafel, één zin in een warme serif, daaronder een invoerveld en een terracotta knop. Geen gradients, geen sparkles, geen chat-bubbles, geen floating labels. De hele flow voelt als één doorlopend document waar vragen op verschijnen en verdwijnen, niet als een web-app.

**Checklist "dit is goed":**
- [ ] Een collega kan de pagina niet onderscheiden van een handgemaakte landing door een designer
- [ ] Er staat nergens het woord "AI" boven de vouw (wel in disclaimer en FAQ)
- [ ] Er is geen enkele purple, geen sparkle-icoon, geen "Analyzing…"-tekst
- [ ] De scan-wachttijd voelt alsof John leest, niet alsof een tool draait
- [ ] Mobile-eerste ontwerp — 70% van NL MKB scrolt op telefoon tijdens de koffie

---

## 4. Vangrails (niet-onderhandelbaar)

### 4.1 Privacy / AVG
- **Scraping-legitimatie:** art. 6.1.f gerechtvaardigd belang. Alleen publiek toegankelijke pagina's. Respect voor `robots.txt`. Geen pogingen tot login, geen cookies meesturen.
- **PII-filter vóór Claude:** voor elke gescrapte pagina loopt een regex over de tekst die emailadressen, telefoonnummers, BSN-patronen en adressen vervangt door `[REDACTED_EMAIL]` etc. Claude ziet die nooit.
- **Anthropic Zero Data Retention:** DPA getekend, ZDR-flag aan op de API-key. Claude bewaart prompts niet na respons.
- **Cookieloze analytics:** Plausible = geen cookie-banner nodig.
- **Disclaimer-tekst** onder de URL-input (29 woorden): *"Door te starten geef je toestemming dat wij je website publiek inlezen en via AI analyseren. Je gegevens gebruikt John persoonlijk voor jouw analyse, niets anders."*
- **Data-retentie:** scans + antwoorden 18 maanden, daarna automatisch geanonimiseerd (naam + email leeg, URL gehashed). Reden: ook na 18 maanden wil John analyses kunnen kruislezen.
- **Recht op verwijdering:** mail naar `privacy@futurecontent.nl` → binnen 72u. Route in de code voor delete-op-email staat klaar vanaf Sprint 1.

### 4.2 Security
- **SSRF:** URL-validator weigert `10.*`, `192.168.*`, `172.16-31.*`, `127.*`, `localhost`, `*.internal`, non-http(s) schemes.
- **Rate-limit:** 10 scan-starts per IP per uur (Upstash). Per URL max 1 scan per 10 minuten (anti-probe).
- **Zod `.strict()`** op alle API-input. Geen `any`, geen `z.unknown()` behalve waar echt nodig.
- **Env-vars** nooit in client-code. `NEXT_PUBLIC_*` prefix alleen voor Plausible domain en Cal-username.
- **Claude tool-use JSON:** altijd `tool_choice: { type: "tool", name: "..." }` voor hard-typed responses. Nooit free-form JSON-parsing.

### 4.3 Feel (de "geen AI"-vangrails)
- ❌ Geen sparkles, geen gradient-paars, geen chat-UI, geen typewriter-effect, geen "AI analyseert..." string zichtbaar.
- ❌ Geen chat-bubbles. De flow is vraag-per-stap, geen conversatie.
- ❌ Geen perfect-formele copy. Tutoyeren, ik-vorm John, soms een aanname die de klant mag corrigeren.
- ✅ Wachttijd 35-45s — als Claude sneller klaar is, houd de slides vast.
- ✅ Foto John op elke stap. Rechts-boven. Zwart-wit, consistent.
- ✅ Progress als "3 van 6", niet als percentage.
- ✅ Taal: "Ik blader er rustig doorheen" / "Kijk naar je toon" / "Noteer wat opvalt" — werkwoorden die een mens doet.

### 4.4 Operationeel
- **Loom-video binnen 24u:** harde belofte. Als John ziek/weg is, stuurt het systeem na 20u automatisch een "morgen stuur ik hem"-mail om de belofte te schuiven. Daarna binnen 48u. Nooit stilte.
- **Mollie-webhook:** bij geslaagde pilot-betaling → automatisch mail naar John + Cal.com-link in bevestigings-mail aan klant ("Plan hier je pilot-kickoff").
- **Gefaalde scrape:** nooit error-pagina. Altijd: *"Ik kom niet door je site heen — vertel me in twee zinnen waar je bedrijf om draait"* → gewone flow voortzetten.

---

## 5. Wat gaat NIET in versie 1

Expliciet buiten scope voor v1 (anders sneuvelt de deadline):

- Meertaligheid (NL only, geen EN-fallback)
- Account / login / dashboard voor de klant (email = commitment genoeg)
- Branche-benchmarks (Adviseur 1 had gelijk: zonder data is het onzin)
- Voice-input op vragen
- PDF-export van de analyse (Loom-video is het deliverable)
- Integraties met HubSpot / Pipedrive / externe CRM
- A/B-testing framework (eerst 50 scans verzamelen, dan optimaliseren)

Die ideeën staan in `docs/quickscan/backlog.md` voor later (nog niet aangemaakt, komt bij eerste leerpunt).

---

## 6. Vervolg

Zie `04_bouwplan.md` voor de 4 sprints en de checklist van wat John buiten de code regelt (accounts, DPA's, foto's).
