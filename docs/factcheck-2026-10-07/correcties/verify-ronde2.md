# Verify ronde 2 (7 oktober 2026)

Onafhankelijke controle van `git diff HEAD` (21 bestanden) plus commit 0b2e657 (blogdatums), tegen John's zes besluiten van 7 oktober. Logboeken gelezen: `log-ronde2-paginas.md`, `log-ronde2-blogs.md`. Niet gecommit, niet gebuild.

## A. Volledigheid (hele repo: lib/, app/, components/, public/llms.txt)

Gezocht op: €5.000, 5.000, 15.000, ex BTW/excl bij €750, workshop met prijs als eerste stap, tweede brein als vaste stap, "voor een klant"/opdrachtgever bij Köningsdag, chatbot als klant of live, abonnement opgezegd/vervangen, Hasselt 5/9, Van Heertum, VideoFunda, marktonderzoek, proof of concept, COMPETITOR.

Schoon:
- Geen €5.000, geen Van Heertum, VideoFunda, marktonderzoek, COMPETITOR_COMPARE meer.
- 15.000 alleen samen met 8.500 (llms.txt:28, blog wat-kost-ai). Klopt met besluit 2.
- "ex BTW"/"excl. BTW" staat alleen nog bij video-pakketten (makelaars, social-media, llms.txt:76-77) en in de voorwaarden. Niet bij €750.
- Köningsdag overal "ons eigen festival" of "onze eigen Köningsdag". "opdrachtgever" alleen in de voorwaarden.
- Restaurant-chatbot overal "demo" (constants PROOF_POINTS, AI_WEDGES, horeca-branche, vijf blogs).
- Geen "verving vier abonnementen" of "opgezegd" meer. `constants.ts:316` ("Je betaalt voor vier abonnementen die eigenlijk één systeem zouden moeten zijn") is een pijnpunt van de lezer, geen claim over John. Blijft staan.
- Hasselt-huisnummer weg uit zichtbare tekst.

Restanten:
1. `lib/constants.ts:672` (VMS.strategie): "intake, een tweede brein voor je bedrijf, dan pas plannen kiezen, dan pas bouwen". Tweede brein als vaste stap. De constante wordt nergens gebruikt (dode code), dus niet zichtbaar. **Gerepareerd**: "Wat erna komt is elke keer hetzelfde: een werkende proef op je eigen werk, dan pas bouwen en beheren." De workshop als eerste stap blijft (besluit 6).
2. Hasselt-huisnummer zit nog in de URL `/portfolio/riethoven-hasselt-5` (slug, `constants.ts:488`), in `public/llms.txt:141` en in de bestandsnamen van video en poster. Niet gerepareerd: een slugwijziging breekt bestaande links en vraagt een redirect. **John beslist.**
3. "tweede brein" staat nog als core-module 02 (`constants.ts:820`, `/werkwijze` verdieping, llms.txt:45). Dat is een module van het platform, geen stap in het aanbod. Laten staan.
4. Workshop als eerste stap op `/boek` (regels 10, 29, 58) en `/voor/[branche]` regel 306, zonder prijs. Mag volgens besluit 6.

## B. Juistheid tegen de besluiten en /ai

Vergeleken met `app/ai/page.tsx` (FAQ regel 63, prijstrap, garantie) en `lib/constants.ts` (PRIJZEN, AI_PRIJS_TRAP, AI_GARANTIE, AI_WEDGES-FAQ).

Klopt:
- METHOD_STEPS 02 t/m 04 volgen AI_PRIJS_TRAP woord voor woord, met "inclusief btw" erbij (besluit 2).
- Branchepagina, werkwijze (pagina + metadata), scan-klaar, diepte-klaar, llms.txt, JSON-LD in layout.tsx: gratis scan, proef €750 incl. btw die van de bouwprijs af gaat, bouw €2.500 tot €8.500, beheer vanaf €250. Klopt.
- llms.txt: heel grote bouw €8.500 tot €15.000 (besluit 2). Training als los product "prijs op aanvraag" (besluit 6).
- De Tijd-terug-garantie op de pilotpagina en in drie branche-teksten is letterlijk AI_GARANTIE. Geen nieuwe garantie.
- PriceIndicator `item="proofOfConcept"` geeft €750, "inclusief btw" staat erachter. `PILOT_BEDRAG_CENT = 75000` en "Totaal €750 inclusief btw" op de pilotpagina kloppen daarmee.

Kanttekeningen (niet gerepareerd, geen besluitconflict):
1. /ai en AI_PRIJS_TRAP zeggen "€750" zonder btw-vermelding, de rest van de site "€750 inclusief btw". Geen tegenspraak, wel ongelijk.
2. Blog `iemand-die-ai-implementeert-bij-je-bedrijf-brabant` (ai-posts-4.ts:259 en verderop): de proef wordt beschreven als "Daarvoor kom ik bij jou op kantoor of in de zaak" en "kom ik gewoon fysiek langs voor de proef". Dat was de beschrijving van de oude workshop. Op /ai en de pilotpagina staat niets over een bezoek op locatie, en de scanpagina's zijn in dezelfde ronde juist ontdaan van "halve dag mee op locatie". Nieuwe belofte over de vorm van de proef. **John beslist** of de proef op locatie is.
3. Zelfde blog en `ai-automatisering-een-proces-een-week`: de weeksprint is eruit gehaald als "besluit John". Dat besluit staat niet in de zes besluiten van vandaag; het agent leidt het af uit besluit 2 en een open punt uit ronde 1 (log-ai-posts-3, 042). De titel noemt de week niet meer, de slug (`...-een-week`) nog wel. **John bevestigt.**
4. `/makelaars` kaarttitel "Sneller verkopen" werd "Compleet beeld vooraf". Het paginalog noemt dit besluit 7, maar het staat niet in de zes besluiten die ik kreeg. **John bevestigt.**

Feitencontrole nieuwe blogclaims:
- Sonnet 5 (aankondiging Anthropic, 30-6-2026, nagelezen): "plant taken, gebruikt tools zoals browsers en terminals", "close to Opus 4.8, but at lower prices", standaardmodel voor Free en Pro. Klopt. **Fout gevonden**: de blog zei "vanaf 1 juli" standaardmodel; Anthropic zegt "from today" (30 juni). **Gerepareerd**: datum weggehaald (ai-posts-2.ts:216).
- Let op: het blogagent schrapte "sneller" omdat het "geen claim van Anthropic" zou zijn. Anthropic schrijft wel: "gets our users to answers noticeably faster". Het schrappen is niet fout, de reden in het log wel. De oude titel "sneller en slimmer" had dus kunnen blijven.
- Köningsdag-details (Mollie, lunch 27 april 2026, verkoop dicht 23 april) kloppen met `03-klanten/koningsdag-reusel/README.md`. "contant geld" staat niet in de README, wel al eerder in een andere blog ("geen kassarij met los geld").

## C. Ongevraagde wijzigingen (niets teruggedraaid, John beslist)

1. **Eerste-klant-korting geschrapt** op alle zes branches met zo'n tekst (`constants.ts` casusAanbod transport, vastgoed, glazenwasser, bouw, garage, horeca): "mijn eerste paying klant krijgt de workshop terug als korting op de bouwfase".
2. **Branche-eigen garanties en kortingen vervangen** door de Tijd-terug-garantie, en die verdwijnen dus mee met punt 1:
   - glazenwasser: "6 maanden beheer op 50% van het normale tarief"
   - bouw/installatie: "WhatsApp-bot draait binnen 3 weken of het werk is gratis"
   - garage: "AI-receptionist draait binnen 4 weken of de eerste 3 maanden beheer zijn gratis"
   Het paginalog noemt "één garantie: die van /ai" als besluit; dat staat niet in de zes besluiten die ik kreeg.
3. **Dashboard-belofte weg**: `/over` ("maandelijks beheer met dashboard"), branchepagina ("Het maandbedrag zie je vooraf op een dashboard, inclusief wat het je oplevert", plus "credits"), `/trainingen` ("3 maanden maandelijks beheer met dashboard").
4. **`/trainingen` pakketinhoud veranderd**: "Workshop + Intake" heet nu "Workshop + werkende proef". Weg: "intake-sessie van 2 uur", "eerste opzet tweede brein", "concrete bouw-roadmap op papier". In het derde pakket werd "3 maanden maandelijks beheer" (zat in de pakketprijs) "3 maanden beheer, vanaf €250 per maand", wat leest alsof het beheer apart betaald wordt. Prijs blijft "Op aanvraag".
5. **Branchepagina**: de SLIM-zin en "drie concrete kansen op papier" zijn weg uit het blok "Een halve dag op locatie". Volgt uit besluit 2 (die €750-workshop ex btw botste), maar de training als voordeur had ook kunnen blijven met "prijs op aanvraag" (besluit 6).
6. **TRAINING-bullet** (`constants.ts`): "Afsluiting met een werkend proof of concept op jullie eigen data" werd "drie concrete kansen op papier". Past bij besluit 6 (training los van de betaalde proef) en bij /trainingen.
7. **Blogtitels toch gewijzigd**, terwijl `log-ronde2-blogs.md` zegt "Titels niet gewijzigd, John beslist":
   - `10-ai-tools-die-elk-mkb-bedrijf-moet-kennen`: "in 2025" weg
   - `claude-sonnet-5-uit`: "sneller en slimmer, wat merk jij?" werd "wat verandert er voor jou?"
   - `ai-automatisering-een-proces-een-week`: "een week" weg uit de titel (slug houdt "een-week"), plus de linktekst in `van-losse-prompt-naar-werkend-systeem` (ai-posts-5.ts)
   Log en diff lopen hier uiteen. Slugs zijn ongewijzigd.
8. **JSON-LD** (`layout.tsx`): naam "AI proof of concept" werd "Werkende AI-proef" en er kwam een `priceSpecification` met `valueAddedTaxIncluded: true` bij. Klopt met besluit 2, wel een structuurtoevoeging.

Bewust gelaten zoals gevraagd: pilotpagina "Niet tevreden? Je krijgt je geld terug" naast de bouwgarantie.

Geen stijl- of opmaakwijzigingen gevonden buiten de tekst (makelaars-sectie weg is besluit 3, ongebruikte imports netjes mee opgeruimd).

## D. Datums (commit 0b2e657 plus tekst)

Methode gecontroleerd: datum = eerste commit van de slug (steekproef `git log -S`): slim-subsidie 2026-07-02, wat-kost-ai 2026-07-03, grok 2026-06-22, meer-bezichtigingen 2026-02-25, mailbox-automatiseren 2026-09-02. Klopt. Uitzondering op John's besluit: `claude-sonnet-5-uit` staat op 2026-06-30 (release), terwijl de eerste commit 2026-06-22 is. Zo besloten.

Besluit 5 (0b2e657): in `kopen-of-laten-bouwen` is de belofte "in een voorstel zet ik er ook bij wat je kant-en-klaar kunt kopen" vervangen door een verwijzing naar de scan of een gesprek. Klopt.

Steekproef op tekst tegen date-veld (17 blogs): 2025-terugblik-wat-werkte, meer-bezichtigingen-met-video-2025, trouwen-in-europa-2026, slim-subsidie-aanvragen, grok-4-1-en-gemini-3, claude-opus-4-5, chatgpt-claude-gemini, gemini-3-1-google-workspace, gpt-5-4-getest, meest-gebruikte-ai-apps, ai-trends-2026, beste-ai-model-2025, ai-ervaringen-ondernemer-2025, gpt-5-5-vs-claude-opus-4-7, claude-sonnet-5-uit, ai-automatisering-wat-kun-je-nu-echt-bouwen, claude-of-chatgpt. Plus een scan op tijdwoorden (vorige week, deze week, dit jaar, is uit, een jaar geleden, enz.) over alle posts.

Gerepareerd:
1. `grok-4-1-en-gemini-3-de-ai-race-versnelt` (22-6-2026, ai-posts-1.ts:155): "De benchmarks gaan omhoog, dat is de rode draad van dit jaar." De intro plaatst het nieuws in november 2025, dus "dit jaar" las als 2026. Nu: "dat was de rode draad van 2025."

Voor John (niet gerepareerd, oordeel):
2. Zelfde blog: "Mijn advies blijft hetzelfde als een jaar geleden". Al gemeld in het blogslog (juni 2025 was John nog niet met AI bezig).
3. `gemini-3-1-google-workspace-kantoor` (22-6-2026): excerpt "Google heeft Gemini 3.1 uitgebracht" leest als vers nieuws, Gemini 3.1 kwam in februari 2026.
4. `gpt-5-4-getest-voor-ondernemers` (22-6-2026): excerpt "Er is weer een nieuwe versie van GPT" terwijl GPT-5.5 op die datum al uit is. De intro zegt nu wel "na de release in maart".
5. `ai-ervaringen-ondernemer-2025`: noemt onder "dingen die echt landden" in 2025 het eigen bedrijfssysteem (OS is van juli 2026) en een demo-chatbot, en zegt twee alinea's later "een demo zonder opdracht is verloren tijd". Inhoudelijke spanning, al deels gemeld in het blogslog.
6. `gpt-5-5-vs-claude-opus-4-7-voorjaarsvergelijking` (22-6-2026) heeft een "Update oktober 2026"-zin in de intro. Bestond al vóór deze ronde. Een post met junidatum die over oktober praat is vreemd maar niet onjuist.

Geen "vorige week" of verlopen toekomst meer gevonden in de overige hits ("deze week" in vier-fouten, ai-implementeren en schaduw-ai is een opdracht aan de lezer, geen nieuwsverwijzing).

## E. Taal en TypeScript

- Toegevoegde regels in de diff (158 regels): geen em-dash, geen en-dash, geen puntkomma in zichtbare tekst (alleen een codecommentaar in `constants.ts`), geen u-vorm.
- Mijn drie reparaties: geen streepjes, geen puntkomma's.
- `npx tsc --noEmit -p .`: geen fouten (exit 0), na mijn reparaties.

## Wat ik wijzigde

1. `lib/blog/ai-posts-2.ts:216` "vanaf 1 juli" weg (feitelijk onjuist volgens de aankondiging).
2. `lib/blog/ai-posts-1.ts:155` "rode draad van dit jaar" werd "was de rode draad van 2025".
3. `lib/constants.ts:672` VMS.strategie zonder intake en tweede brein (dode code).
