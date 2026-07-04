# Nachtrapport: AI-scan UX + leads-belscherm (4 juli 2026)

Alle zeven fases zijn af. Twee repo's aangeraakt: fc-rebrand (de scan) en os (het leads-dashboard). Geen push, geen deploy, geen schemawijziging, nergens. Alles staat in lokale commits die je per stap kunt terugkijken.

## Wat er per fase gebeurd is

### Fase 1: testmodus (commit 739ae3c + seams in 01d9977)
Je kunt de hele scan nu testen zonder API-credits en zonder echte site:

```
SCAN_MOCK=1 npm run dev
```

Optioneel `SCAN_MOCK_SPEED=echt` voor realistische duur per stap (scrape 4s, analyse 18s). Alleen de betaalde externe calls zijn gefaket (scrape plus alle LLM-calls); database, statusovergangen, routes en componenten draaien echt. De fixtures in `lib/scan/mock/index.ts` zijn getypeerd op de echte return-types: verandert de scan-structuur, dan faalt `npm run build` tot de fixtures meegaan. Uitleg en checklist: `lib/scan/mock/TESTMODUS.md`. Het mock-script is bekend terrein: 5 quickscan-vragen (alle typen) plus e-mail, en precies 8 diepte-vragen. De mock is hard uit zodra `NODE_ENV=production`.

Let op: ik kon `.env.local` niet aanpassen (afgeschermd in mijn omgeving), dus zet `SCAN_MOCK=1` gewoon inline voor het commando, zoals hierboven. Veiliger ook.

### Fase 2: adaptieve wachttijd + echte balk (commit 25f39af)
- Vloer van 30s naar 11s: de wachttijd is nu max(echt werk, 11s). Sonnet duurt meestal 15-25s, dus de vloer bijt alleen bij snelle sites.
- `/status` geeft nu `fase` en `voortgang` (0-100), berekend uit de bestaande timestamps. Geen schemawijziging.
- Het wachtscherm heeft een echte determinate balk met fase-tekst in jouw stem ("Ik open je site", "Ik lees je site en kijk naar je aanbod", "Ik bouw je plan"). De redirect hangt aan de echte klaar-status, niet meer aan de slide-rotatie.

### Fase 3: voortgang over de vragen (commit 7c76a12)
- Beide antwoord-routes sturen `{ huidige, geschatTotaal, isLaatste }` mee. De balk boven de vragen loopt nooit terug en suggereert nooit 100% voor de laatste stap.
- Tijdens de 1-3s vraagselectie: knop toont "Momentje…" plus een rustige microstatus ("Ik kijk even naar je antwoord en pak de volgende vraag.").

### Fase 4: vraagflow op micro-commitments (commit 01d9977)
- B1 is nu een 2-seconden-klik: enkelkeuze met 3-4 branche-specifieke opties over waar de schoen wringt, laatste optie altijd een eerlijke uitweg. Vangnet-B1 in `bibliotheek.ts` is meegegaan.
- `VOLGENDE_SYSTEEM` heeft een harde escalatieladder (vraag 2-3 alleen klikken, max één open vraag per scan, nooit als laatste) en elke vraag moet kwalificeren: pijn, urgentie, beslisser, richting bouw/training/zelf. Enkelkeuze is weer toegestaan naast meerkeuze.
- `DIEPTE_SYSTEEM`: volume en frequentie als goud benoemd (daar reken jij mee in het gesprek), kwalificatie richting bouw vs training aangescherpt.
- E-mailstap belooft eerlijk wat er gebeurt: "dan bel ik je binnen een dag, geen mailtrein". Ook als placeholder bij het telefoonveld.

### Fase 5: conversie-haak + prijs (commit 79b4ffa, prompt in 01d9977)
- Analyse-prompt: kansen geven het wat en waarom (inclusief wat het scheelt), nooit het hoe. Geen stappenplannen of toolnamen; dat is de reden voor het gesprek.
- Eindscherm quickscan: hoofdactie is nu het gratis halfuur (BookingCTA, gekoppeld aan kans 1: "Je grootste kans: ..."). De uitgebreide scan is de secundaire trede.
- Prijs-transparantie op beide eindschermen: rustig blok "En daarna?" met het proof of concept via `PriceIndicator` (`PRIJZEN.proofOfConcept`, nu 750). Copy in jouw woorden: halve dag meedraaien op locatie, interviewen, data verzamelen, binnen een week een proof of concept met wat het oplevert in tijd of geld. De Mollie pilot-tak (495) heb ik niet aangeraakt.

### Fase 6: leads-dashboard belklaar (fc-rebrand 6c8de48; os b955007)
- Brug: `notifyOs` stuurt nu ook de vrije opmerking van de lead en (bij diepte) de interne diagnose mee. Additief, oude payloads blijven werken.
- OS-route `van-scan`: accepteert die velden en slaat ze op ZONDER schemawijziging (piggyback in het `scanAntwoorden` Json-veld onder `_opmerking`/`_diagnose`). Belangrijke fix die ik onderweg vond: bij een bestaande lead (dedup) deed de route helemaal niks, waardoor de diepte-data nooit zou landen omdat de quickscan de relatie al had aangemaakt. Nu wordt een bestaande lead additief bijgewerkt, inclusief status-upgrade naar "afspraak staat" bij een diepte-scan.
- Leadslijst is een bellijst: "Vandaag bellen"-blok (nieuwe leads laatste 24 uur), tel-links, kolom "waar zit de pijn", sortering op warmte.
- Detailpagina is een belscherm: bovenaan bel-knop, voorgestelde openingszin (uit B1-pijn plus kans 1), de signalen pijn/urgentie/beslisser/richting, de interne diagnose (bij diepte) en de opmerking van de lead. Daaronder uitkomst-knoppen: afspraak gepland, terugbellen (met datum), niet bereikt, geen interesse. Elke uitkomst wordt een `Interactie`-rij (kanaal telefoon), de leadStatus beweegt mee binnen de bestaande enum. Videoscript-blok bestaat nog, maar staat onder het belblok.
- De os-map had GEEN git. Ik heb er een repo van gemaakt met eerst een beginstand-commit (2953492) en daarna de nachtrun-commit (b955007), zodat je een echte diff hebt. `.gitignore` dekt node_modules, .next, env-files.

## Verificatie: wat ik wel en niet kon testen

Wel gedaan:
- TypeScript-check op de eindstand van BEIDE repo's: groen (tsc --noEmit, exit 0, zelfde check die `npm run build` doet). Voor fc-rebrand tegen de echte Prisma-client-types van jouw machine.
- Alle logica handmatig nagelopen: monotone voortgang, replay/idempotentie, mock-totalen, dedup-pad in van-scan.

Niet gekund (eerlijk verhaal): ik draaide in een omgeving zonder toegang tot je env-files en zonder browser, dus `npm run dev` met echte database en de klik-door-test heb ik NIET kunnen doen. Ook de curl-test op de OS-brug met een TESTLEAD niet. Dat ligt bij jou, zie hieronder.

## Jouw checklist voor het live gaat

1. In fc-rebrand: `npm run build` (moet groen zijn) en daarna `SCAN_MOCK=1 npm run dev`. Klik de hele flow door: wachtscherm (eerste signaal binnen ~5s, balk loopt eerlijk vol, fase-teksten), 5 vragen plus e-mail (balk, microstatus, B1 als klikvraag), eindscherm (gesprek-CTA op kans 1, prijsblok, opmerkingveld). Test ook de dieptescan (8 vragen) en `SCAN_MOCK_SPEED=echt` voor het echte tempo.
2. OS lokaal draaien en een testpayload naar `/api/leads/van-scan` sturen (met `opmerking` en `diagnose` erin, bedrijfsnaam "TESTLEAD nachtrun") of gewoon de mock-flow afronden met OS_BASE_URL naar je lokale OS. Check bellijst en belscherm. De testlead daarna zelf weggooien.
3. Dan jouw echte acceptatie: één scan op de clone met echte credits, checken dat de vragen branche-specifiek zijn en de diagnose in de OS landt.
4. Live zetten doe jij (ik heb bewust niet gepusht).

## Wat nog jouw beslissing vraagt

- De 24-uurs videobelofte staat nog in de e-mailstap-copy naast de belbelofte. Twee beloftes is veel; wil je de video houden of laten vallen nu bellen de hoofdopvolging is?
- De vloer staat op 11s. Wil je hem nog lager (alles op echt tempo), zeg het, dat is één constante (`MIN_WACHT_MS`).
- De os-repo heeft nu git. Als je wil kan daar een remote bij (privé), maar dat is aan jou.

## Bewust overgeslagen

- Geen Plausible-events verwijderd of hernoemd; ook geen nieuwe toegevoegd (de bestaande dekken de flow, en ik wilde je dashboards niet vervuilen zonder overleg).
- De pilot-betaal-tak (495) en de ExitIntentModal heb ik niet aangeraakt: buiten scope en gevoelig voor conversie-verrassingen.
- `.env.local` niet aangepast (kon niet, hoeft ook niet: SCAN_MOCK inline).

## Commits op een rij

fc-rebrand (branch nieuwe-huisstijl):
- 8872e09 docs: nachtrun-opdracht en scan-architectuur
- 739ae3c testmodus (fixtures + TESTMODUS.md)
- 01d9977 mock-seams + vraagprompts (B1, escalatieladder, analyse-kansen)
- 25f39af vloer 11s + status fase/voortgang + wachtscherm-balk
- 7c76a12 voortgangsbalk vragen + microstatus + belbelofte
- 79b4ffa eindschermen gesprek-eerst + prijsblok
- 6c8de48 leads-brug: opmerking + diagnose mee naar OS

os (nieuwe repo, branch main):
- 2953492 beginstand (vangnet)
- b955007 leads: belklaar dashboard + brug-ontvangst
- 56806e6 gitignore: .DS_Store
