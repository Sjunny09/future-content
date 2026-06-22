# Bouwplan — 4 sprints + John's checklist

Alle bouw gebeurt in `/Users/johnlavrijsen/Documents/AI - Cursor/Website - FutureContent/future-content/`. Het bestaande werk in `companykick/` rondom de intake-module wordt eerst teruggedraaid (zie Sprint 0).

**Totaal tijdsinschatting:** 4 werkweken (een sprint per week), inclusief reviews en polishing. Dit is John's realistische "ik wil hem live hebben voor eind mei" tempo, niet een agency-tempo.

---

## Sprint 0 — Rollback + fundament (0,5 week)

**Doel:** foutief werk opruimen, nieuwe repo-plumbing opzetten.

### Rollback companykick/
Alle scan-gerelateerde bestanden uit `CMS - SiteKick/companykick/` verwijderen:
- [ ] `prisma/schema.prisma` — `Prospect` model + `ProspectStatus` enum terugdraaien
- [ ] `prisma/migrations/20260421010000_prospect_intake/` directory weg
- [ ] `src/modules/intake/` complete directory weg
- [ ] `src/app/api/intake/` complete directory weg
- [ ] `src/app/scan/` complete directory weg
- [ ] Prisma `migrate reset` lokaal, dan `migrate dev` om de DB schoon te krijgen
- [ ] Commit: *"revert: haal intake/scan-werk uit companykick (verhuist naar future-content)"*

### Nieuwe fundering in future-content/
- [ ] Verify Next.js 16 + React 19 + Tailwind 4 zijn up-to-date (is al zo, alleen checken)
- [ ] `pnpm add prisma @prisma/client @anthropic-ai/sdk cheerio @upstash/ratelimit @upstash/redis zod` + dev: `pnpm add -D prisma`
- [ ] Prisma init — schema + eerste migratie met `Lead`, `ScanJob`, `Answer`, `Payment` tabellen
- [ ] `.env.local` template + `.env.example` in de repo committen (zonder secrets)
- [ ] Tailwind config: `theme.extend.colors` met `linnen`, `drukinkt`, `terracotta`; `fontFamily.serif: Fraunces`, `fontFamily.sans: IBM Plex Sans`
- [ ] `app/layout.tsx` aanpassen: next/font voor Fraunces + IBM Plex Sans, Plausible script tag
- [ ] Commit: *"chore: fundering voor scan-flow (deps, prisma, tailwind tokens, fonts)"*

**Definition of done:** `pnpm dev` draait, `/scan` geeft 404 (nog geen route), `prisma studio` toont lege tabellen.

---

## Sprint 1 — Landing + URL-input + disclaimer (1 week)

**Doel:** de bezoeker kan een URL invoeren en wordt doorgestuurd naar de scan-in-progress pagina. Backend accepteert + slaat op, maar scrape-logica is nog een stub.

### Bouwtaken
- [ ] `app/scan/page.tsx` — landingpagina
  - Hero: serif H1 *"Laat me even naar je bedrijf kijken."*, sans-subtitel (zie adviseur 1), foto John rechts-boven
  - URL-input + terracotta knop *"Start met mijn bedrijf"*
  - Disclaimer-tekst (29 woorden, zie `03_ceo_synthese.md §4.1`) onder input in `text-sm text-muted`
  - KvK + adres-footer (Bladel, KvK 93482641 — verify bij John)
  - Geen "AI"-bullets boven de vouw. Drie trust-chips *onder* de vouw: *"Geen rapport, werkend systeem"* / *"Binnen 24u een video terug"* / *"Privacy: AVG + ZDR"*
- [ ] `app/api/scan/start/route.ts`
  - `POST { url: string }` → Zod-validatie → SSRF-guard → rate-limit check → `ScanJob.create` status `queued` → returned `{ jobId }`
  - `waitUntil(analyseStarten(jobId))` — fire-and-forget (nog een stub in Sprint 1)
- [ ] `app/scan/bezig/[jobId]/page.tsx` — tussenscherm, toont nu alleen "even geduld…" + foto John. Polling-hook wordt Sprint 3.
- [ ] `app/api/scan/[jobId]/status/route.ts` — `GET` → returns `{ status, observaties: [], klaar: false }`
- [ ] `lib/url-guard.ts` — SSRF-validatie met URL-parser, IP-range blocklist, scheme-whitelist
- [ ] `lib/ratelimit.ts` — Upstash wrapper
- [ ] `lib/db.ts` — Prisma-client singleton

### Review-moment
- John loopt de flow door op z'n telefoon (Safari iOS). Check: voelt de opening-pagina zoals de adviseur schetste? Is de knop eigenbezittelijk ("mijn bedrijf"), niet generiek?
- Lighthouse: score ≥95 op performance + accessibility.

**Definition of done:** URL invoeren → redirect naar `/scan/bezig/[jobId]` → tussenscherm rendert → na 3s handmatig de DB-status op `ready` zetten → volgende scherm (nog stub) toont *"Klaar (stub)"*.

---

## Sprint 2 — Scrape + Claude-analyse + observatie-slides (1 week)

**Doel:** echte scrape + Claude-analyse draait, observatie-slides tonen live snippets van de site. Nog geen vragen-flow.

### Bouwtaken
- [ ] `lib/scraper.ts`
  - `scrapeMet Jina(url)`: fetch `https://r.jina.ai/{url}` → markdown
  - `scrapeMetCheerio(url)`: fallback — native fetch + cheerio → strip scripts/styles → return plain text
  - `haalSiteDataOp(url)`: orchestrator, probeer Jina, val terug op Cheerio, PII-filter eroverheen, return `SiteData` interface (zie `02_team_rapporten.md`)
- [ ] `lib/pii-filter.ts` — regex-strip voor email/tel/postcodes → `[REDACTED_*]`
- [ ] `lib/claude.ts`
  - `analyseerSite(siteData)` — Sonnet 4.6, tool-use met `SiteAnalyse`-schema, prompt-caching aan
  - `genereerObservaties(siteData)` — Haiku 4.5, genereert 3-4 korte observatie-regels voor de slides
  - Anthropic-client met ZDR-flag
- [ ] `lib/jobs/analyseStarten.ts` — de async job zelf:
  1. Update job → `status: scraping`
  2. Scrape
  3. Update job → `status: analysing`, schrijf 3-4 observaties in `job.observaties`
  4. Call Claude Sonnet → schrijf `analyse` JSON in `job.analyse`
  5. Update job → `status: ready`
- [ ] `app/scan/bezig/[jobId]/page.tsx` — echte component
  - `useScanStatus(jobId)` hook: polling elke 1.5s
  - Slide-component met Framer Motion fade in/out
  - Render: observatie-teksten uit polling-resultaat
  - Als `status === "ready"` → router.push naar `/scan/vragen/[jobId]`
- [ ] `app/api/scan/[jobId]/status/route.ts` — nu echt; returns `{ status, observaties, klaar }`

### Review-moment
- John test met 5 echte NL MKB-sites (aannemer, schilder, fysio, hoveniersbedrijf, groothandel). Iedere scrape moet werken, observaties moeten iets zinnigs zeggen.
- Check log: wachttijden liggen tussen 25-50s. Als korter: kunstmatig uitbreiden tot min 30s (`setTimeout` op de slides, niet op Claude).

**Definition of done:** URL invoeren → 35-45s slides met live-observaties → land op `/scan/vragen/[jobId]` met stub-vragenpagina.

---

## Sprint 3 — Vragen-flow + eindpagina + video-belofte (1 week)

**Doel:** de klant beantwoordt 6 vragen, geeft email, ziet dankpagina met CTA's.

### Bouwtaken
- [ ] `lib/vragen/bibliotheek.ts` — array van 32 vragen (zie `02_team_rapporten.md §Questions`)
- [ ] `lib/vragen/selecteer.ts` — Haiku-call die 6 vragen kiest o.b.v. `SiteAnalyse` (branche, niche, profiel)
- [ ] `lib/jobs/vragenVoorbereiden.ts` — roept Haiku na afloop van `analyseStarten`, schrijft gekozen vragen in `job.vragen`
- [ ] `app/scan/vragen/[jobId]/page.tsx`
  - Eén vraag per scherm
  - Vraag-types: enkelkeuze, meerkeuze, korte tekst, lang tekst
  - Progress "3 van 6"
  - Terug-knop werkt (stap--, geen re-fetch)
  - Enter-toets = door
  - Vraag 6 is altijd email + naam (overschrijft eventuele Haiku-keuze voor die slot)
  - Na vraag 6: POST naar `/api/scan/[jobId]/compleet`
- [ ] `app/api/scan/[jobId]/antwoord/route.ts` — `POST { vraagIndex, waarde }` → append aan `Answer`-table
- [ ] `app/api/scan/[jobId]/compleet/route.ts` — `POST` → markeer job `completed` → stuur mail naar John met samenvatting (Resend) → trigger welcome-mail naar klant
- [ ] `app/scan/klaar/[jobId]/page.tsx` — dankpagina
  - Hero: *"Dankjewel {voornaam}."*
  - Sub: *"Binnen 24 uur stuur ik je een korte video (max 2 min) waarin ik doorneem wat ik zag."*
  - Pilot-blok: terracotta knop *"Boek een pilotweek — €495"* → `/scan/pilot/[jobId]`
  - Exit-intent hook: `onMouseLeave` naar tab-rand → modal *"Of wil je het eerst even bellen?"* + Cal-embed
- [ ] `lib/mail/naarJohn.ts` — Resend template met alle data voor Loom-opname
- [ ] `lib/mail/naarKlant.ts` — warme bevestigingsmail in John's stem, niet corporate

### Review-moment
- 3 testflows end-to-end: één perfecte, één met rariteit (verkeerde email), één waar de gebruiker terug-knop gebruikt halverwege.
- Check: komt John's notificatie-mail aan binnen 5s na afloop? Bevat hij URL + antwoorden + 3 AI-kansen? Kan John in 2 min video opnemen op basis van die mail alleen?

**Definition of done:** complete flow van URL-invoer tot dankpagina werkt end-to-end. John krijgt bruikbare email met alle context. Klant krijgt bevestigings-mail.

---

## Sprint 4 — Pilot-checkout + exit-intent + polishing (1 week)

**Doel:** betaling werkt, exit-intent werkt, laatste bugs eruit, Sentry + Plausible productie-klaar, live.

### Bouwtaken
- [ ] `app/scan/pilot/[jobId]/page.tsx` — checkout-splash, knop *"Betaal met iDEAL"* → Mollie redirect
- [ ] `app/api/betaling/mollie/start/route.ts` — Mollie payment create, return checkout-URL
- [ ] `app/api/betaling/mollie/webhook/route.ts` — webhook handler → status check → bij `paid`: mail naar John + Cal-link naar klant
- [ ] `app/api/betaling/stripe/start/route.ts` — Stripe Checkout Session (cards only)
- [ ] `app/api/betaling/stripe/webhook/route.ts` — zelfde afloop
- [ ] `app/scan/pilot/[jobId]/gelukt/page.tsx` — bedankt + Cal-embed voor pilot-kickoff
- [ ] Exit-intent modal op `/scan/klaar/[jobId]` — Cal.com embed
- [ ] Plausible events: `scan_start`, `scan_ready`, `vraag_1_klaar`, `vraag_6_klaar`, `pilot_geboekt`, `gesprek_geboekt`
- [ ] Sentry wrapper op alle API routes, `beforeSend` scrubber voor email/tel
- [ ] AVG-pagina `/privacy` met volledige tekst + delete-route
- [ ] `app/api/privacy/verwijder/route.ts` — POST email → delete alle sessions met die email, bevestigingsmail
- [ ] Loom-belofte scheduler: cron-job die 20u na afloop checked of John al een Loom heeft verstuurd (via `leadFollowup` tabel-flag). Zo niet: stuur *"Morgen stuur ik 'm"* mail en verschuif deadline naar 48u.
- [ ] `/scan` opent **niet** op `www.futurecontent.nl` main — op eigen subdomein of in begin alleen direct-link. Pas na 10 succesvolle scans in productie promoten.

### Review-moment
- John doet één echte betaling met z'n eigen iDEAL → refund via Mollie dashboard.
- Exit-intent triggert eenmaal in Safari, eenmaal in Chrome.
- Sentry: test-error gooien vanuit een API route → Sentry laat het zien zonder PII in payload.

**Definition of done:** productie-URL werkt, eerste 3 externe testers (familie + Bouke) doorlopen hem zonder hulp, één pilot geboekt (geld echt binnen).

---

## John's checklist — buiten de code

Dit regelt John zelf, parallel aan de sprints. Niets hiervan kan de CEO-agent doen.

### Accounts + contracten (voor Sprint 1)
- [ ] **Vercel Pro** upgrade (€20/m) — nodig voor 60s timeout + EU-region pinning
- [ ] **Neon Postgres** — account + EU-region DB + branching aan + connection-string naar `.env.local`
- [ ] **Anthropic** — productie-credits + DPA-verzoek per mail + Zero Data Retention flag aan laten zetten op de prod-key
- [ ] **Jina Reader** — gratis tier werkt, upgrade naar paid als we >1k scans/maand doen
- [ ] **Upstash Redis** — gratis tier + EU-region + connection-string
- [ ] **Sentry** — gratis tier + DSN

### Betaling (voor Sprint 4)
- [ ] **Mollie** — account activeren, KvK koppelen, iDEAL aanvragen (5 werkdagen bij ING), API-keys naar `.env.local`
- [ ] **Stripe** — account activeren, KvK koppelen, cards-only mode, API-keys

### Mail (voor Sprint 3)
- [ ] **Resend** — account, domein `futurecontent.nl` verifiëren (MX + SPF + DKIM records bij je DNS-provider), EU-region
- [ ] Mail-aliasen: `john@futurecontent.nl` (al in gebruik), `privacy@futurecontent.nl` (nieuwe), `scan@futurecontent.nl` (voor transactional from-address)
- [ ] **Cal.com** — account + event-type "Pilot-kickoff (30 min)" + event-type "Korte kennismaking (20 min)" + embed-instellingen

### Content + assets (voor Sprint 1)
- [ ] **Foto John** — zwart-wit portret, zachte achtergrond, vierkant uit te snijden, 400x400 min. (kost een uurtje bij fotograaf of goede selfie op natuurlijk licht)
- [ ] **Loom** — account + extension geïnstalleerd + template-script voor de 2-min videos (max 120s, vaste opening "Hoi [voornaam], John hier…")
- [ ] **KvK-gegevens** — KvK-nummer 93482641 verifiëren, adres Bladel voor footer (privé-adres of PO-box?)
- [ ] **Privacybeleid** — concept-tekst met advocaat of template (bv. Monday Lawyers) — 2-3 uur werk eenmalig

### Processen (voor Sprint 3)
- [ ] **Reserveer 1 uur per werkdag** voor Loom-videos. Blokkeer het in agenda. Zonder dit tijdsblok sneuvelt de 24u-belofte.
- [ ] **Fallback-protocol** voor als John ziek/weg is: auto-mail template "Ik ben er even niet, morgen stuur ik je video" + wie kan backup leveren (niemand nu, dus gewoon 48u-schuif)
- [ ] **First-10-klanten rule**: eerste 10 scans persoonlijk bellen ná de Loom-video om te leren wat wel/niet landt. Dit is kwalitatief onderzoek, geen support.

### Launch (voor Sprint 4)
- [ ] **DNS** — `scan.futurecontent.nl` of `futurecontent.nl/scan` — kies één. Aanbeveling: `/scan` op main-domein, dan kan verkeer vanaf homepage naartoe stromen.
- [ ] **Geen promotie** totdat 10 interne tests zijn gelopen (John + Bouke + 3 familie + 5 bekenden met eigen MKB)
- [ ] **Eerste externe kanaal:** LinkedIn-post vanuit John's eigen profiel, één zinnetje + link. Niet in groepen, niet boosten. Laat het organisch landen.

---

## Risico's (en wat we doen als het misgaat)

| Risico | Kans | Mitigatie |
|---|---|---|
| Jina Reader wordt duur of stopt | Laag | Cheerio-fallback staat klaar vanaf Sprint 2 |
| Claude hallucineert branches onjuist | Midden | Tool-use JSON-schema + handmatige review eerste 20 analyses + prompt-tune |
| iDEAL-betaling faalt in productie | Laag | Stripe-fallback werkt, link staat zichtbaar onder Mollie-knop |
| Conversie lager dan 2% naar pilot | Hoog | Acceptabel in v1 — doel is *signaal* krijgen, niet volume. Iterate na 50 scans. |
| Loom-belofte niet gehaald | Hoog | Auto-"morgen"-mail + 48u harde cap + tijdblok in John's agenda |
| AVG-klacht / autoriteit | Laag | ZDR + PII-strip + 18mnd retentie + delete-route + art.6.1.f basis = sterke verdediging |

---

## Referenties

- `README.md` — index
- `01_briefing_en_adviseurs.md` — CEO-briefing + 2 adviseurs
- `02_team_rapporten.md` — 10 specialist-rapporten + code, prompts, vragenbibliotheek
- `03_ceo_synthese.md` — conflict-resolutie + tech-stack + vangrails

---

*Laatste update: 2026-04-21*
*Volgende stap: Sprint 0 — rollback companykick + fundament future-content. Na akkoord John start de CEO-agent Sprint 0.*
