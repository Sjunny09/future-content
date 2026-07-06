# AI-scan Future Content: architectuur en opbouw

> **LIVE-status (5 juli 2026):** dit is DE live scan. Canoniek project `00-future-content/website/fc-rebrand/`, branch `nieuwe-huisstijl`, live op **future-content.nl + www** (Vercel-project `future-content`, huidige build `w61i6xzfq` = commit `69ab2ce`). Als John zegt "werk aan scan", is dit de codebase. De zustermap `future-content/` (branch `scan-op-future-content`) is DOOD.

Referentiedoc voor iedereen (mens of AI) die aan de scan werkt. Beschrijft hoe de scan is opgebouwd, zodat je niet eerst hoeft te reverse-engineeren. Houd dit bij als de scan structureel verandert.

## Wat de scan is
Een conversie-funnel voor Future Content. Bezoeker vult zijn website-URL in, krijgt een concreet AI-plan op maat. Doel: leads uit LinkedIn omzetten in een gesprek. Er zijn twee scans: de gratis QUICKSCAN (URL, wachtscherm, adaptieve vragen, e-mail, eindscherm met drie kansen) en de optionele UITGEBREIDE SCAN (diepere vragen, eindigt in een Cal.com-boeking).

## Stack en locatie
- Canoniek project: `00-future-content/website/fc-rebrand/`, branch `nieuwe-huisstijl`. De zustermap `future-content/` is DOOD, niet gebruiken.
- Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, framer-motion 12, Prisma + Neon Postgres, `@anthropic-ai/sdk` 0.110.0. Package manager npm. Scripts: `dev`, `build` (= `prisma generate && next build`), `start`. Geen lint- of test-script; TS-fouten komen via `npm run build`. Deploy via Vercel (git-integratie).
- Modellen: `claude-sonnet-4-6` (site-analyse + eind-diagnose), `claude-haiku-4-5` (voortgangsobservaties + vraagselectie). Alle LLM-calls gebruiken forced tool-use voor strikte JSON, met `cache_control: ephemeral` op de system-prompts. Extended thinking wordt bewust NIET gebruikt (Anthropic weigert thinking samen met forced tool-use).

## Quickscan, end-to-end
1. `/scan` (`app/scan/page.tsx`) toont `components/scan/StartScanForm.tsx`: alleen een website-URL. Submit POST naar `app/api/scan/start/route.ts`.
2. `start`-route: Zod-validatie + SSRF-guard (`valideerScanUrl`), rate-limit per IP-hash en per URL (Upstash, te bypassen met admin-cookie `fc_os` = `ADMIN_TOKEN`), maakt `ScanJob(queued)`, start de analyse op de achtergrond via Next 16 `after()` en geeft direct `{ jobId }` terug (201). Fire-and-forget: de HTTP-respons wacht niet op de AI.
3. Redirect naar `/scan/bezig/[jobId]` naar `components/scan/ScanInProgress.tsx`. Dit polt `app/api/scan/[jobId]/status/route.ts` elke 1,5s (max 3 retries, harde stop na 3 min), rouleert observatie-slides elke 7s (`SLIDE_DUUR_MS`), en toont een indeterminate voortgangsbalk (regel ~185-195). Redirect naar de vragen zodra `klaar` en de laatste slide getoond is.
4. Achtergrond-pipeline `lib/scan/jobs/analyseStarten.ts`: (a) `haalSiteDataOp(url)` scrapen; (b) parallel Haiku `genereerObservaties` (4 zinnen, 2-4s) en Sonnet `analyseerSite` (branche, niche, tone, exact 3 kansen, 15-25s); (c) na de analyse Haiku `kiesEersteVraag` voor de gepersonaliseerde openingsvraag B1; (d) kunstmatige vloer `MIN_WACHT_MS = 30_000` voordat de status op `ready` gaat.
5. `/scan/vragen/[jobId]` (`app/scan/vragen/[jobId]/page.tsx`, server) leest `vragenJson` + gegeven antwoorden, bepaalt resume-veilig de huidige vraag, rendert `components/scan/VragenFlow.tsx`. Per antwoord POST naar `app/api/scan/[jobId]/antwoord/route.ts`; de server slaat het `Answer` op en berekent synchroon de volgende vraag via Haiku (`kiesVolgendeVraag`, ~1-3s). Toont "Vraag {slot}".
6. Laatste stap is altijd `EMAIL_NAAM_VRAAG` (naam, e-mail, telefoon). POST naar `app/api/scan/[jobId]/compleet/route.ts`: upsert `Lead`, status `completed`, maakt een `LoomVideo`-rij met 24u-deadline, stuurt in `after()` mails (Resend) + `notifyOs` (leads-bridge naar het OS, zie de sectie hieronder) + `notifyTelegram`.
7. `/scan/klaar/[jobId]` (`app/scan/klaar/[jobId]/page.tsx`): het 3-koloms eindscherm. Links foto John, midden de drie kansen (`components/scan/KansenStagger.tsx`) + `OpmerkingVeld`, rechts de CTA-kolom (primair "Start de uitgebreide scan" of `DirectContact`). Plus `ExitIntentModal` met de Cal.com-boeking.

## Uitgebreide scan, end-to-end
- Vereist een afgeronde quickscan (`completed`). `/scan/diepte/[jobId]` rendert `components/scan/DiepteFlow.tsx` (hergebruikt de `VraagVeld`-switch, geen e-mailstap want gegevens zijn al binnen). Toont "Verdieping {slot}". Tussen vragen toont `app/scan/diepte/[jobId]/loading.tsx` een laadscherm.
- Per antwoord POST naar `app/api/scan/[jobId]/diepte/antwoord/route.ts`; volgende vraag via Haiku (`kiesDiepteVraag` in `lib/scan/diepte.ts`).
- Afronden: POST naar `app/api/scan/[jobId]/diepte/afronden/route.ts`, status `voltooid`, genereert in `after()` een interne diagnose via Sonnet (`genereerDiagnose`: `advies` = bouw / training / zelf, plus onderbouwing) en pingt Telegram + OS. De diagnose is intern (voor John), de klant ziet die niet.
- `/scan/diepte/klaar/[jobId]` (`app/scan/diepte/klaar/[jobId]/page.tsx`): eindscherm met drie voorbereidingspunten en een ingebedde Cal.com-iframe. Hier eindigt de flow organisch in de boeking.

## Modellen en prompts (waar ze leven)
Alle prompts zijn inline string-constanten.
- Site-analyse (Sonnet): `lib/scan/claude.ts`, `ANALYSE_SYSTEEM` (~35-52), tool `ANALYSE_TOOL` (~54-88, dwingt exact 3 kansen af). User-prompt = `formatteerSiteData` (PII-gestript).
- Observaties (Haiku): `lib/scan/claude.ts`, `OBSERVATIES_SYSTEEM` (~138-153). Exact 4 zinnen, nooit de woorden AI/analyse/scan/tool.
- Openingsvraag B1 (Haiku): `lib/scan/vragen/selecteer.ts`, `B1_SYSTEEM` (~33-40).
- Adaptieve vervolgvraag quickscan (Haiku): `lib/scan/vragen/selecteer.ts`, `VOLGENDE_SYSTEEM` (~91-102), tool `VOLGENDE_TOOL` (~104-129) met de `genoeg`-boolean.
- Vervolgvraag uitgebreide scan (Haiku): `lib/scan/diepte.ts`, `DIEPTE_SYSTEEM` (~43-56).
- Eind-diagnose (Sonnet): `lib/scan/diepte.ts`, `DIAGNOSE_SYSTEEM` (~231-240), tool `DIAGNOSE_TOOL` (~242-266).
- Vangnet-vragenpool: `lib/scan/vragen/bibliotheek.ts` (`VRAGEN_BIBLIOTHEEK` ~25 vragen, `EMAIL_NAAM_VRAAG`, type `VraagType`). Wordt alleen gebruikt als een AI-call faalt.

## Vraag-logica (aantal en types)
- Vraagtypes (in `VraagVeld`-switch, `VragenFlow.tsx` ~207): `enkelkeuze` (radio, 1 keuze), `meerkeuze` (max 3 opties), `open` (textarea, max 500 tekens), `email-naam` (alleen quickscan, altijd laatste). Geen sliders.
- Vragen zijn grotendeels AI-gegenereerd op maat van de branche (id `GEN{slot}` of `DV{slot}`); de bibliotheek is vangnet.
- Aantal is dynamisch, de server is de enige autoriteit (telt `Answer`-rows). Quickscan (`antwoord/route.ts`): `BASIS_VRAGEN = 5`, `MAX_TOTAAL = 8`; na 5 basisvragen mag de AI alleen nog doorvragen bij een vaag antwoord, anders e-mail; de AI stopt zelf met `genoeg=true`. Netto ~5 tot 8 vragen + e-mail. Uitgebreide scan (`diepte.ts`): `MIN_DIEPTE = 8`, `MAX_DIEPTE = 14`; onder 8 wordt `genoeg` genegeerd, boven 14 hard stoppen.

## Datamodel (Prisma, `prisma/schema.prisma`, Neon Postgres)
- `ScanJob`: één rij per scan. `status` (enum: queued/scraping/analysing/ready/answering/completed/failed), `url`, `ipHash`, `siteDataJson`, `scrapeBron`, `observatiesJson`, `analyseJson`, `vragenJson`, `opmerking`, dieptevelden (`diepteStatus`, `diepteVragenJson`, `diagnoseJson`), `leadId`, en timestamps `startedAt`, `scrapedAt`, `analysedAt`, `readyAt`, `completedAt`. Die timestamps zijn genoeg voor een echte determinate voortgang, geen extra kolom nodig.
- `Lead`: `email` (uniek), naam, telefoon, `isTest` (testlead → test-tabblad + geen mail), `gebeld` + `gebeldOp` + `belnotitie` (bel-workflow in /os: gebeld ja/nee + feedback), `mailUit` (per-lead mail aan/uit), `geanonimiseerd` (18 maanden). `Answer`: één rij per beantwoorde vraag (`vraagId`, `vraagTitel`, `waarde` Json), cascade delete op `ScanJob`. `LoomVideo`: 24u-opvolging. `Payment`: Mollie/Stripe pilot.
- `ScanJob.isTest`: gezet in `start/route.ts` als de scan met de admin-cookie (`fc_os`) draait (John test zelf); propageert bij afronden naar `Lead.isTest` en onderdrukt de resultaten-mail.
- `MailLog`: één rij per mail die de funnel verstuurt of bewust overslaat (`richting` naar_lead/naar_john, `soort` resultaten/john_notificatie/herinnering, `status` verstuurd/mislukt/overgeslagen + `detail`). Gevoed door `lib/scan/mail/mailLog.ts`; getoond per lead in `/os`.
- `Setting`: key-value voor OS-schakelaars zonder redeploy. Nu `mails_naar_leads` (aan/uit), gelezen via `lib/scan/settings.ts`, bediend met de schakelaar in `/os`.
- Migraties: `20260421051833_init_scan`, `20260629104500_diepte_scan`, `20260703160000_add_opmerking_scan`, `20260705130000_leads_cockpit` (isTest + MailLog + Setting), `20260706100000_bel_mail_perlead` (gebeld/gebeldOp/belnotitie/mailUit op Lead).

## API-routes (`app/api/scan/`)
`start` (job aanmaken, achtergrondanalyse starten), `[jobId]/status` (polling), `[jobId]/antwoord` (quickscan-antwoord + volgende vraag, grenzen 5/8), `[jobId]/compleet` (e-mail/Lead + completed + notificaties), `[jobId]/diepte/antwoord` (diep antwoord + volgende), `[jobId]/diepte/afronden` (voltooid + Sonnet-diagnose), `[jobId]/opmerking` (vrije opmerking). Alle routes: `runtime = "nodejs"`, `dynamic = "force-dynamic"`.

## Componenten (`components/scan/` en `components/common/`)
`StartScanForm.tsx` (URL-form), `ScanInProgress.tsx` (wachtscherm/polling/slides/indeterminate balk), `VragenFlow.tsx` (quickscan-vragen + gedeelde `VraagVeld`/validatie `heeftGeldigAntwoord`), `DiepteFlow.tsx` (uitgebreide vragen), `KansenStagger.tsx` (drie kansen, gestaggerd, respecteert `useReducedMotion`), `DirectContact.tsx` (WhatsApp / Cal.com / koffie), `ExitIntentModal.tsx`, `OpmerkingVeld.tsx`, `AiDisclaimer.tsx`, `WhatsAppRondje.tsx`, `ContactIcons.tsx`. Canonieke afspraak-CTA: `components/common/BookingCTA.tsx` (varianten primary/secondary/text, placeholder-safe). Determinate-fill-patroon om te hergebruiken: `components/common/Infographic.tsx:67-68`.

## Design system (scan-flow)
Scan-tokens in `app/globals.css`: `--color-scan-linnen` #F3ECE0 (achtergrond), `--color-scan-drukinkt` #2A2218 (tekst), `--color-scan-terracotta` #B45F38 (accent, hover #964A2C), `--color-scan-muted` #6E6151, `--color-scan-border` #E4D8C6, `--color-scan-error` #8B2C1C. Koppen: `var(--font-fraunces)` (alias van Playfair), Georgia serif, weight 500. Body: `var(--font-plex)` (alias van Archivo). Scan-knoppen zijn plain `button`/`a` met `rounded-md px-6 py-3 text-base font-medium text-white` + inline terracotta-achtergrond (bewust NIET de shadcn Button). Animatie via framer-motion; conventie reveal `opacity 0 naar 1, y 8-14 naar 0`, `ease easeOut`, `useReducedMotion` gerespecteerd. Volledige filosofie: `DESIGN.md`. Huisstijl-bron: `future-content-huisstijl/HUISSTIJL.md`. Regels: geen gradient-tekst, geen em-dashes, geen paars/blauw AI-gradient.

## Booking, CTA, analytics
Booking = Cal.com EU, één bron in `lib/constants.ts` `BOOKING` (cal.eu/futurecontent/30min). WhatsApp-nummer ook in `lib/constants.ts`. Dedicated pagina `/boek`. Plausible-events in `lib/scan/analytics/plausible.ts`: o.a. `scan_start`, `scan_ready`, `vraag_1_klaar`, `vraag_6_klaar`, `scan_afgerond`, `cal_geladen`, `gesprek_geboekt`, `formulier_verstuurd`. Betaal-tak (pilot 495 euro): `/scan/pilot/[jobId]` via Mollie iDEAL (+ optioneel Stripe).

## Prijs en aanbod (één bron)
- Proof of concept: 750 euro, bron `lib/constants.ts` `PRIJZEN.proofOfConcept` (weergave via `components/PriceIndicator.tsx`). Wat erin zit: John draait een halve dag mee op locatie, interviewt mensen, verzamelt data van het bedrijf. Daarna gaat hij thuis aan de slag en binnen een week ligt er een proof of concept met wat het dat bedrijf oplevert in tijd of geld.
- Keuze (4 juli 2026): de prijs WORDT benoemd in de scan-flow, maar alleen op de eindschermen (`/scan/klaar` en `/scan/diepte/klaar`), nooit tijdens de vragen. Reden: de prijs staat toch al op de site, eerlijkheid past bij de merkstem, en het filtert prijs-shoppers eruit voordat John belt. Het gratis halfuur-gesprek blijft de hoofdactie; de prijs is context bij de trede daarna. Altijd de constant gebruiken, nooit een bedrag hardcoden.
- De Mollie pilot-tak (495 euro) is een apart, ouder pad. Niet verwarren met het proof of concept en niet aanraken zonder opdracht.

## Leads-bridge en het OS leads-dashboard
De scan is stap 1; John belt de leads na. Het dashboard waarop hij dat doet leeft in een APARTE repo: `00-future-content/os/` (Next.js, eigen Prisma + eigen database).
- Verzendkant (deze repo): `lib/scan/notifyOs.ts` POST naar `{OS_BASE_URL}/api/leads/van-scan` met Bearer `OS_WEBHOOK_SECRET`. Payload: `scanLeadId, bedrijf, contactpersoon, email, telefoon, interesse, opmerkingen, type (quickscan/diepte), url, branche, niche, tone, antwoorden (object per vraagId), kansen`. Fail-soft: bij falen loggen en doorgaan, de bezoekerservaring hangt hier nooit van af. Aangeroepen vanuit `compleet/route.ts` (quickscan) en `diepte/afronden/route.ts` (diepte).
- Ontvangstkant (os-repo): `os/app/api/leads/van-scan/route.ts` maakt een `Relatie` (bron `scan`, ref-reeks KL, dedup op `scanLeadId` of e-mail) met velden `scanLeadType, scanUrl, scanBranche, scanNiche, scanTone, scanAntwoorden (Json), scanKansen (Json), leadStatus` (nieuw/video_gestuurd/afspraak_staat/omgezet/afgewezen; diepte start op `afspraak_staat`).
- Dashboard (os-repo): `os/app/leads/page.tsx` (lijst: datum, bedrijf, website, type, status) en `os/app/leads/[id]/page.tsx` (detail: scan-gegevens, antwoorden, 3 kansen, videoscript-generator via `genereerLeadScript` in `os/app/actions.ts`, mailto voor de Loom-link, status-dropdown). Het OS heeft ook een `Interactie`-model voor contactmomenten, bruikbaar voor belnotities zonder schemawijziging.
- Bekende gaten in de brug (juli 2026): `notifyOs` stuurt de vrije `opmerking` van de lead NIET mee (alleen "Scan {id} · {url}") en de interne diepte-diagnose (`diagnoseJson`: bouw/training/zelf + onderbouwing) OOK niet, terwijl dat precies is wat John wil zien voordat hij belt. De leadslijst toont geen telefoonnummer en geen pijn/kans, en het detail is ingericht op video sturen, niet op bellen.

## Env-vars die de scan gebruikt
`ANTHROPIC_API_KEY` (verplicht), `DATABASE_URL` + `DIRECT_DATABASE_URL` (Neon), `ADMIN_TOKEN` (rate-limit-bypass via `fc_os`-cookie), `UPSTASH_REDIS_REST_URL` + `_TOKEN` + `IP_HASH_SALT` (rate-limit), `RESEND_API_KEY` + `SCAN_NOTIFY_EMAIL` (mail), `TELEGRAM_BOT_TOKEN` + `_CHAT_ID`, `OS_BASE_URL` + `OS_WEBHOOK_SECRET` (leads-bridge), `MOLLIE_API_KEY` + `STRIPE_SECRET_KEY`, `CRON_SECRET`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (analytics aan). Jina Reader werkt zonder key (anonieme tier, geknepen); optioneel `JINA_API_KEY` voor een veel hogere scrape-limiet. Upstash-vars ontbreken bewust in productie (DB-fallback rate-limit). Op de productie-Anthropic-key staat server-side Zero Data Retention.

## Waar de tijd zit (perf)
1. De kunstmatige vloer `MIN_WACHT_MS = 30_000` domineert de gevoelde introwachttijd; ook als alles in ~20s klaar is wordt de job tot 30s vastgehouden.
2. Sonnet `analyseerSite` (15-25s) is de traagste losse LLM-stap.
3. Scrape is de wildcard: normaal 2-8s. Twee tiers in `haalSiteDataOp` (`scraper.ts`): **tier 1** (snel) = Jina snelle engine (15s) op beide host-varianten + Cheerio (12s); de host-variant (www eraf/erop) redt sites met een scheef TLS-cert of redirect op maar één variant (aanleiding: www.allplayzwembaden.nl, ongeldig cert op www). **Tier 2** ("dieper graven", alleen als tier 1 faalt) = Jina met `X-Engine: browser` (25s, rendert JS, negeert cache). De optionele `JINA_API_KEY` is schaars (John vult 'm niet bij) en wordt daarom **alleen in tier 2** ingezet, niet op elke scan: tier 1 draait anoniem. Sommige zware JS-SPA's of bot-beveiligde sites blijven onleesbaar: dan grijpt het escape-luik (zie hieronder). **Bewust NIET gebouwd:** een web-zoek-fallback (bij een onleesbare site online uitzoeken wat het bedrijf doet) is getest en verworpen; LLM-web-search identificeert dubbelzinnige/generieke domeinnamen onbetrouwbaar (gokt zelfverzekerd het verkeerde bedrijf), en een verkeerde gok is erger dan een eerlijke melding. Een echt trage site kan tot ~80s scrape opvreten; de 3-min harde stop op het wachtscherm blijft het vangnet.
4. Falende scrape verliest de bezoeker NIET: `ScanInProgress` toont na ~14s "ik probeer een andere route" + een gratis escape-luik (`OpvangKader`) dat naar `app/api/scan/[jobId]/handmatig` post. Dat maakt alsnog een Lead (gekoppeld aan de mislukte scan, met opmerking) en pingt John (mail + Telegram). Zo blijft LinkedIn-verkeer een lead, ook bij een onleesbare site.
5. Rate-limit: Upstash staat NIET in productie, dus er is een DB-fallback in `start/route.ts` (max 6 scans/ipHash per uur, max 3 per URL per 10 min). John test met de `fc_os`-cookie en omzeilt beide.
4. Haiku-stappen (observaties, B1, elk vervolg) zijn goedkoop (~1-3s). De vervolgvraag is synchroon, dus de bezoeker voelt na elk antwoord 1-3s pauze.
5. De eind-diagnose (Sonnet, uitgebreide scan) draait in `after()` op de achtergrond, daar wacht de bezoeker nooit op.

## Bekende UX-gaten (de aanleiding voor de verbeterronde)
1. De 30s-vloer botst met "eerste signaal binnen 5-10s".
2. Geen determinate voortgangsbalk: alleen een indeterminate blokje op het wachtscherm en een "Vraag {n}"-teller zonder totaal.
3. Per antwoord 1-3s synchrone wachttijd (stotter).
4. De openingsvraag is een halfopen bevestiging, geen 2-seconden-klik (mist de micro-commitment).
5. Structureel lastig te testen: elke test kost echte API-credits en een echte site.
6. Het eindscherm zegt niet eerlijk wat de volgende stap kost (proof of concept 750 euro staat wel op de site maar niet in de flow) en belooft niet wat er gebeurt na het achterlaten van gegevens (John belt binnen een dag).
7. Het leads-dashboard in het OS is video-first ingericht terwijl John bel-first opvolgt: geen tel-link, geen belscript, geen kwalificatiesignalen op één scherm, en de diagnose plus lead-opmerking komen niet eens aan.
