# Logboek correcties blogs 015 t/m 034 (ai-posts-1.ts, ai-posts-2.ts, Infographic.tsx)

7 oktober 2026. Bron: `docs/factcheck-2026-10-07/rapport-blogs-011-020.md` (015-020), `rapport-blogs-021-030.md`, `rapport-blogs-031-040.md` (031-034). Niet gecommit, niet gebouwd.

## Wijzigingen

### 015 ai-voor-mkb-waar-begin-je-echt (Infographic.tsx, `AiVolwassenheid`)
- Oud: title "De vier assen van de AI-Quickscan", caption "De quickscan scoort je bedrijf op deze vier assen en laat zien waar de meeste winst zit."
- Nieuw: title "Waar staat jouw bedrijf met AI?", caption "Voorbeeld van vier aandachtspunten. De quickscan kijkt naar je website en je antwoorden en geeft je drie concrete kansen."
- Reden: ONJUIST. De live quickscan scoort niet op vier assen maar levert site-analyse, adaptieve vragen en exact drie kansen (`SCAN-ARCHITECTUUR.md` r.8, r.19, r.32: `ANALYSE_TOOL` dwingt exact 3 kansen af). De scores 3/2/3/4 zijn nu als voorbeeld gelabeld. Data (assen, scores) ongewijzigd.

### 016 chatgpt-claude-gemini-welk-taalmodel-past-bij-jouw-bedrijf
- Oud: "Het houdt toon beter vast, gokt minder en levert tekst die ik minder hoef te herschrijven."
- Nieuw: "In mijn ervaring houdt het de toon beter vast, gokt het minder en levert het tekst die ik minder hoef te herschrijven."
- Reden: GEEN BRON. "Gokt minder" is een vergelijkende uitspraak over hallucinaties zonder algemene bron; nu als John's eigen ervaring geformuleerd (rapport-blogs-011-020, 016 #1). Inhoud verder gelijk gehouden.

### 017 5-fouten-die-ondernemers-maken-met-chatgpt
- Oud: "Negen van de tien keer ligt het niet aan het model, maar aan hoe het gevraagd wordt."
- Nieuw: "Meestal ligt het niet aan het model, maar aan hoe het gevraagd wordt."
- Reden: GEEN BRON. Leest als 90%, er is geen meting (017 #1).

### 018 10-ai-tools-die-elk-mkb-bedrijf-moet-kennen
- Oud: "Dat valt onder die laatste rij, maar dan helemaal toegespitst op een specifieke zaak."
- Nieuw: "Dat valt onder de chatbot-rij, maar dan helemaal toegespitst op een specifieke zaak."
- Reden: ONJUIST (interne tegenspraak). De laatste rij is de automatiseringstool, de chatbot staat een rij erboven (018 #1). Het voorstel uit het rapport ("gekoppeld aan hun boekingssysteem") niet overgenomen, want dat is een nieuwe eigen claim.

### 019 wat-is-een-goede-ai-prompt-7-voorbeelden
- Oud (h2): "De formule: rol, context, format"
- Nieuw (h2): "De formule: rol, context, taak, format"
- Oud (p): "Een sterke prompt bestaat uit drie delen. Eerst de rol: wie moet het model zijn. Dan de context: wat is de situatie en voor wie. En tot slot het format: in welke vorm wil je het antwoord. Combineer die drie en je krijgt meteen bruikbaardere tekst."
- Nieuw (p): "Een sterke prompt bestaat uit vier delen. Eerst de rol: wie moet het model zijn. Dan de context: wat is de situatie en voor wie. Dan de taak: wat moet er precies gebeuren. En tot slot het format: in welke vorm wil je het antwoord. Combineer die vier en je krijgt meteen bruikbaardere tekst."
- Reden: ONJUIST (tegenspraak met de eigen infographic `prompt-formule`, die vier delen toont: Rol, Context, Taak, Format, `Infographic.tsx` r.125-131) (019 #1).

### 020 hoeveel-tijd-bespaart-ai-je-echt-een-eerlijke-rekensom
- Oud (lijst): "Ongeveer 30 procent sneller met AI als assistent", "Dat is bijna 2 uur winst per week"
- Nieuw (lijst): "Ongeveer een derde minder tijd met AI als assistent", "Dat is ongeveer 2 uur winst per week"
- Reden: ONJUIST (rekenfout/interne tegenspraak). De tekst rekent 6 naar 4 uur = 2 uur = een derde; 30% van 6 uur is 1,8 uur, en "30 procent sneller" is iets anders dan 30% minder tijd (020 #1, eigen berekening rapport). Vierde regel ("Op jaarbasis tikt dat flink aan") klopt en is ongemoeid gelaten.

### 020 infographic `tijdwinst` (Infographic.tsx, `Tijdwinst`)
- Oud: E-mail en communicatie 40, Offertes en documenten 30, Planning en administratie 25, Rapportage en analyse 50; caption "Illustratieve indicatie van tijdwinst op repeterend werk. Echte cijfers verschillen per bedrijf."
- Nieuw: 35, 30, 25, 35; caption "Illustratief voorbeeld, geen meting. Op repeterend werk win je in mijn ervaring vaak een kwart tot een derde. Echte cijfers verschillen per bedrijf."
- Reden: GEEN BRON + interne tegenspraak. Twee balken (40% en 50%) lagen boven de "kwart tot een derde" die de blog zelf realistisch noemt (020 #2). De twee uitschieters afgekapt op de bovengrens 35% uit het voorstel van het rapport, de rest ongewijzigd, en het onderschrift zegt nu expliciet dat het geen meting is. Alternatief voor John (niet gedaan, want dat is meer dan data): de balken vervangen door één bandbreedte "25-35%".

### 024 ai-automatisering-wat-kun-je-nu-echt-bouwen-voor-je-bedrijf
- Oud: "Voor Köningsdag in Reusel maakte ik een ticketsysteem met online betaling, zodat de organisatie niet meer met losse lijstjes en contant geld hoefde te werken."
- Nieuw: "Voor Köningsdag in Reusel maakte ik een aanmeldsysteem met een online formulier en Google Sheets, waarna deelnemers hun ticket per mail kregen. Zo hoefde de organisatie niet meer met losse lijstjes te werken."
- Reden: ONJUIST volgens John's eigen bronnen. Op 8-12-2025 bestond alleen de versie van 2025: "Vorig jaar had ik al iets gebouwd met Google Sheets en een online intake-formulier, waarna ze een mail kregen en het ticket werd verstuurd" (`docs/REVIEW-interview-uitkomsten.md`, vraag 3) en "Vorig jaar deed ik dit met Google Sheets en handmatige mails" (`lib/constants.ts` r.730). De online betaling via Mollie is van april 2026 (024 #1). "Contant geld" geschrapt, want de 2025-versie had geen online betaling. Bewust in het midden gelaten of die mail automatisch of handmatig ging: interview ("kleine automation") en constants ("handmatige mails") spreken elkaar daar tegen. Let op: zet John deze blog later op een datum na april 2026, dan kan de Mollie-versie weer terug.

### 025 beste-ai-model-2025-eindejaarsvergelijking
- Oud: "Voor 80 procent van wat een ondernemer wil doen, maakt de keuze nauwelijks uit."
- Nieuw: "Voor het meeste wat een ondernemer wil doen, maakt de keuze nauwelijks uit."
- Reden: GEEN BRON. Percentage zonder onderzoek erachter (025 #1).
- Oud: "Ik gebruik het zelf het meest voor het bouwen van mijn Flask-bedrijfssysteem en voor schrijfwerk ..."
- Nieuw: "Ik gebruik het zelf het meest voor het bouwen van mijn eigen bedrijfssysteem en voor schrijfwerk ..."
- Reden: VEROUDERD. De Flask-app is sinds 16-7-2026 legacy, het bedrijfssysteem draait als Next.js-OS (`aios-os-plan/NACHTPLAN-2026-07-16.md` r.14 en r.23) (025 #6). Zonder techniekwoord klopt de zin op elke datum. Of het systeem er op 15-12-2025 al was: zie open punten.

### 026 ai-ervaringen-ondernemer-2025
- Oud: "Mijn eigen Flask-bedrijfssysteem voor uren, facturen en BTW. Ik bespaar er elke maand uren mee en hou eindelijk overzicht."
- Nieuw: "Mijn eigen bedrijfssysteem voor uren, facturen en BTW. Ik bespaar er elke maand uren mee en hou eindelijk overzicht."
- Reden: VEROUDERD, zelfde bron als 025 (026 #2). "Ik bespaar er elke maand uren mee" is een eigen claim en blijft staan: zie open punten.

### 029 meest-gebruikte-ai-apps-nederland
- Oud (intro, laatste zin): "Hier is mijn overzicht van de tien die in Nederland het meest gebruikt worden, met per stuk waar je ze voor inzet."
- Nieuw: "Uit [onderzoek van Telecompaper](https://www.emerce.nl/nieuws/chatgpt-populairste-aitool-onder-nederlandse-consumenten) onder 1.800 Nederlanders blijkt dat ChatGPT met afstand het meest gebruikt wordt (41 procent), gevolgd door Copilot (13 procent) en Gemini (8 procent). Hier is mijn overzicht van tien AI-apps die ik ondernemers aanraad, met per stuk waar je ze voor inzet."
- Reden: GEEN BRON. Er bestaat geen Nederlandse top 10 van AI-apps (029 #1, #7, #8). Bron zelf nagelezen op 7-10-2026: Emerce 5-8-2025, Telecompaper-panel van 1.800 consumenten, "41 procent van de Nederlandse consumenten geeft aan de tool daadwerkelijk in te zetten. Copilot en Gemini volgen met respectievelijk 13 en 8 procent." De link rendert via `renderRichText` in `app/blog/[slug]/page.tsx`.
- Oud: "Otter en vergelijkbare tools: gesprekken en vergaderingen automatisch uitwerken tot een verslag."
- Nieuw: "Een transcriptietool die Nederlands verstaat: gesprekken en vergaderingen automatisch uitwerken tot een verslag. Let op: Otter, een bekende naam, verwerkt geen Nederlands."
- Reden: ONJUIST voor een Nederlandse lezer. Otter transcribeert Engels, Spaans, Frans, Duits, Japans en Chinees, geen Nederlands (029 #2: https://subanana.com/nl/blog/otter-alternatieven, 12-8-2026; zelf nagezocht 7-10-2026 via https://www.sally.io/blog/otter-ai-in-dutch en https://vexascribe.com/compare/best-transcription-software-for-dutch-audio). Geen vervangende toolnaam (Amberscript, Teams) ingevuld, want dat zou een aanbeveling van John zijn die hij niet gaf.
- NIET aangeraakt: de titel "De 10 meest gebruikte AI-apps in Nederland" en de slug. Die bevatten dezelfde GEEN BRON-claim en spreken de nieuwe intro nu tegen. Zie open punten.

### 030 beste-ai-tools-2026
- Oud: "De meeste daarvan bestaan niet meer of doen er niet meer toe."
- Nieuw: "Veel daarvan zijn alweer verdwenen of doen er niet meer toe."
- Reden: GEEN BRON. "De meeste" leest als telling, die is er niet (030 #1).

### 033 claude-sonnet-5-uit
- Oud: "Nee, niet per se. Als je al met Claude werkt, profiteer je vaak automatisch van de nieuwe versie. Je hoeft niets te installeren of om te bouwen."
- Nieuw: "Nee, niet per se. Werk je in de Claude-app, dan krijg je de nieuwe versie vanzelf en hoef je niets te installeren. Draait er een eigen koppeling op de API, dan moet die wel worden omgezet naar het nieuwe model."
- Reden: feit over de tool, deels onjuist (rapport: KLOPT deels, 033 #6). In claude.ai werd Sonnet 5 het standaardmodel, maar een API-koppeling roept een vaste model-ID aan en moet worden omgezet (https://www.anthropic.com/news/claude-sonnet-5, 30-6-2026). Klopt los van de publicatiedatum. De rest van deze blog wacht op de datumkeuze.

Totaal: 15 correcties in 11 blogs (015, 016, 017, 018, 019, 020, 024, 025, 026, 029, 030, 033; 015 en 020 deels via `Infographic.tsx`). Syntax van alle drie de bestanden gecontroleerd met de TypeScript-transpiler (geen build gedraaid). Geen em-dash, en-dash of puntkomma in de toegevoegde regels.

## Niet gewijzigd

### WACHT OP DATUMKEUZE (9)
1. **018** titel "10 AI-tools die elk MKB-bedrijf in 2025 moet kennen": klopte op 27-10-2025, wordt fout als de blog een echte datum (juni 2026) krijgt. Bovendien titel, dus buiten mandaat. Rapportvoorstel: "10 soorten AI-tools die elk MKB-bedrijf moet kennen".
2. **021** "De afgelopen week kwamen Grok 4.1 ... en Gemini 3 ... uit" op 17-11-2025: Gemini 3 kwam 18-11-2025. Datum naar 19-11-2025 of later.
3. **025** intro "Aan het einde van 2025 krijg ik bijna wekelijks de vraag ... Ik gebruik ze alle drie elke dag in mijn werk voor het MKB in de Kempen": botst met het interview (na januari 2026 pas echt in AI).
4. **026** hele blog "Mijn AI-jaar 2025": "Ik bouwde dingen die echt werken voor ondernemers in de Kempen" botst met het interview (tot januari 2026 bij BTT).
5. **027** "omdat ik er als bouwer middenin zit" (29-12-2025): zelfde spanning.
6. **032** "Köningsdag in Reusel met een eigen ticketsysteem dat de drukte aankan" (2-2-2026): het systeem dateert van april 2026 en "de drukte aankan" is nooit gemeten. Ook JOHN BEVESTIGT.
7. **033** titel en intro "Claude Sonnet 5 is uit" op 9-2-2026: Sonnet 5 kwam 30-6-2026. Op 9 februari was Sonnet 4.5 de nieuwste, 4.6 volgde 17-2-2026.
8. **033** "Ik gebruik Sonnet zelf veel ... Het verschil dat ik merk is ...": ervaring met Sonnet 5 kan op 9-2-2026 niet bestaan. Ook JOHN BEVESTIGT.
9. **033** "De nieuwe versie is merkbaar sneller" en de lijstregel "Sneller antwoord": "sneller" is geen officiële Anthropic-claim (wel langere en complexere taken). Pas oppakken samen met de datum, want de titel zegt ook "sneller".

Kanttekening bij 024: als John die blog naar na april 2026 verzet, mag de Mollie-versie met online betaling terug in de zin.

### WACHT OP AANBODKEUZE (0)
Geen prijzen, pakketten, garanties of aanbodstappen in blogs 015 t/m 034.

### JOHN BEVESTIGT (21)
1. **015** "Ik bouwde een systeem dat mijn uren, facturen en BTW grotendeels automatisch verwerkt" (6-10-2025). De Flask-app bestond, het OS is van juli 2026. Deed de Flask-app in oktober 2025 al btw?
2. **016** "Ik gebruik ze alle drie".
3. **018** restaurant-chatbot "die zelf tafels reserveert": klant of demo? `lib/constants.ts` r.733 zegt "Voor een klant", `docs/REVIEW-open-secties.md` r.18 zegt "restaurant-chatbot (demo)".
4. **020** "vaak rond een kwart tot een derde" (ervaring, ligt binnen onderzoek op taakniveau).
5. **020** "Toen ik mijn administratie deels automatiseerde met een eigen systeem voor uren, facturen en BTW" (10-11-2025).
6. **021** "Mijn advies blijft hetzelfde als een jaar geleden".
7. **022** schrijfervaring met Opus 4.5 (toon, herhaling, nuance).
8. **023** "in de loop van dit jaar van ChatGPT naar Claude gegaan" (overstap in 2025?).
9. **023** "Het gokt minder en geeft eerder aan als iets onzeker is" (staat als ervaring in een lijst).
10. **024** restaurant-chatbot (klant of demo, bestond hij op 8-12-2025?).
11. **024** "eerst de uren, toen de facturen, toen de BTW" (volgorde en tijdstip).
12. **026** "Ik bespaar er elke maand uren mee" (niet gemeten).
13. **026** restaurant-chatbot "zodat de telefoon minder vaak rinkelt": effect kan alleen bij een live klant gemeten zijn.
14. **026** Köningsdag-ticketsysteem: verdedigbaar als de 2025-versie bedoeld is, geen betaling toevoegen.
15. **026** "ik bouwde te vaak iets voordat een klant ja had gezegd ... dagen in iets dat niemand afnam": John's coach-afspraken corrigeren dit verhaal juist (O2Plus offerte, Groot Speijck vroeg zelf om een demo).
16. **026** trading-bot-analyse.
17. **028** restaurant-chatbot in twee versies (eerst FAQ, daarna reserveren), live of demo, en bestond hij begin januari 2026?
18. **030** "Een transcriptietool ... Bespaart elke week tijd" (eigen gebruik).
19. **031** "De tekst die je nu leest is zo ontstaan".
20. **032** "Concrete voorbeelden uit de regio": restaurant-chatbot als regionale zaak, John's eigen bedrijfssysteem als "een ondernemer" uit de regio, en "een bedrijf dat klantvragen automatisch laat sorteren" (in het interview aanbod, geen opgeleverd project).
21. **034** "Ik denk niet in welk abonnement heb ik, ik denk in welke taak heb ik" (werkwijze, geen probleem).

### Buiten mandaat, voor John
- **029 titel en slug** "De 10 meest gebruikte AI-apps in Nederland": GEEN BRON en nu in tegenspraak met de gecorrigeerde intro. Rapportvoorstel: titel "10 AI-apps die ik ondernemers aanraad". Slug laten staan (links).
- **Rapport zegt KLOPT met kanttekening, niet aangepast:** 016 infographic `model-vergelijking` ("Beste schrijfwerk" is een superlatief, "Lange documenten" staat bij Claude terwijl de tekst Gemini sterk noemt in grote hoeveelheden informatie); 017 "gratis chatvenster" (ook betaald Plus traint standaard mee, en voor klantgegevens is een verwerkersovereenkomst nodig); 022 Anthropic positioneert Opus 4.5 vooral voor code en agents; 031 "meest waarschijnlijk" is een vereenvoudiging; 032 Veldhoven is geen Kempengemeente.
- **Taal 018:** "categorieen", "programmas", "productfotos" (trema en apostrof ontbreken).
