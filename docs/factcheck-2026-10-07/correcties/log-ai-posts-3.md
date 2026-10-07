# Logboek correcties lib/blog/ai-posts-3.ts (blogs 035 t/m 046)

Uitgevoerd 7 oktober 2026. Bron: docs/factcheck-2026-10-07/rapport-blogs-031-040.md (035 t/m 040) en rapport-blogs-041-050.md (041 t/m 046). Geen build gedraaid, niet gecommit.

## Wijzigingen

### 035 gemini-3-1-google-workspace-kantoor

1. Excerpt
   - Oud: "Google bouwt zijn nieuwste model rechtstreeks in Gmail en Docs."
   - Nieuw: "Google heeft Gemini 3.1 uitgebracht, en Gemini zit al in Gmail en Docs."
   - Reden: NIET KUNNEN VERIFIËREN (rapport #4), de fout zit in de excerpt zelf. De aankondiging van Gemini 3.1 Pro (19-2-2026) noemt Gmail en Docs niet: https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/ . Ook nodig om tegenspraak met de gecorrigeerde intro te voorkomen. Titel niet aangeraakt.
2. Intro
   - Oud: "dan staat de nieuwste AI van Google sinds kort gewoon in je Gmail en Docs."
   - Nieuw: "dan zit Gemini gewoon in je Gmail en Docs, en die assistent krijgt steeds nieuwere modellen."
   - Reden: ONJUIST (rapport #2). Gemini zit sinds 2024 in Gmail en Docs, sinds januari 2025 zonder losse add-on: https://9to5google.com/2025/01/15/google-workspace-price-increase-2025/
3. Alinea "Voor een MKB-kantoor..."
   - Oud: "maar de tien minuten die je per dag bespaart op mails die je toch al moest beantwoorden. Tel dat op over een week en je hebt een halve middag terug."
   - Nieuw: "maar de minuten die je elke dag bespaart op mails die je toch al moest beantwoorden. Over een week tikt dat aan."
   - Reden: ONJUIST, rekenfout (10 min x 5 werkdagen = 50 minuten, geen halve middag) en "tien minuten" heeft geen bron (rapport #1).
4. Alinea "Voor wie is dit echt interessant?"
   - Oud: "maar omdat het de saaie eerste 80 procent doet en jij de laatste 20 procent verfijnt. Dat is precies de verhouding waarin AI op kantoor het meeste oplevert."
   - Nieuw: "maar omdat het de saaie eerste versie maakt en jij die verfijnt. Dat is precies de rolverdeling waarin AI op kantoor het meeste oplevert."
   - Reden: GEEN BRON (rapport #3), het percentage leest als meting. "verhouding" werd "rolverdeling" omdat er geen getallen meer staan.

### 036 5-ai-fouten-die-je-bedrijf-geld-kosten

Geen wijzigingen (alleen een EIGEN CLAIM, zie open punten).

### 037 gpt-5-4-getest-voor-ondernemers

Geen wijzigingen. "Een week lang" hangt af van de datum (zie open punten).

### 038 wat-kun-je-echt-bouwen-met-ai-6-voorbeelden

5. Tussenkop voorbeeld 4
   - Oud: "4. Een ticketsysteem dat live een evenement draaide"
   - Nieuw: "4. Een ticketsysteem voor een evenement"
   - Reden: zelfde fout als de bullet hieronder (rapport #1). Zonder deze aanpassing spreekt de kop de gecorrigeerde bullet tegen.
6. Bullet ticketsysteem
   - Oud: "Het draaide live tijdens het evenement zelf, onder echte druk."
   - Nieuw: "De verkoop liep tot een paar dagen voor het evenement en het systeem leverde daarna de lijst voor de catering."
   - Reden: ONJUIST volgens John's eigen bronnen (uitzondering op EIGEN CLAIM). De verkoop sloot hard op 23 april 2026 15:00, het evenement was 27 april 2026 (03-klanten/koningsdag-reusel/README.md r.7 en r.21). Na sluiting ging er een Excel-lijst naar de broodjesleverancier (docs/REVIEW-interview-uitkomsten.md, vraag 3). Dat het evenement na de publicatiedatum (16-3-2026) valt, is niet opgelost: zie WACHT OP DATUMKEUZE.
7. Voorbeeld 5, voice-orchestrator
   - Oud: "Een van de leukste dingen die ik bouwde is een voice-orchestrator. Ik praat hardop met de AI, en ondertussen gaan achtergrond-agenten voor mij aan het onderzoek. Terwijl ik gewoon doorpraat over een idee, wordt het werk al gedaan. Dat klinkt futuristisch, maar het draait gewoon op mijn eigen opzet."
   - Nieuw: "Een van de leukste experimenten was een voice-orchestrator. Ik praatte hardop met de AI, en ondertussen gingen achtergrond-agenten voor mij aan het onderzoek. Terwijl ik gewoon doorpraatte over een idee, werd het werk al gedaan. Dat klinkt futuristisch, maar het draaide gewoon op mijn eigen opzet."
   - Reden: VEROUDERD (rapport #9). Volgens John's eigen werkregels (pattern 63 in de portfolio-CLAUDE.md) is de voice-orchestrator in mei 2026 gestopt, dus "het draait" klopt nu niet. De verleden tijd klopt zowel op de publicatiedatum als nu, dus de correctie hangt niet van de datum af.

### 039 ai-en-avg-waar-moet-mkb-op-letten

Geen wijzigingen, rapport vond geen fouten.

### 040 beste-ai-tools-voor-zzp-en-kleine-teams

Geen wijzigingen (alleen een EIGEN CLAIM, zie open punten).

### 041 hoe-begin-je-met-ai-geen-techneut

Geen wijzigingen (alleen een EIGEN CLAIM, zie open punten).

### 042 ai-automatisering-een-proces-een-week

Geen wijzigingen (werkwijze en aanbod, zie open punten).

### 043 gpt-5-5-vs-claude-opus-4-7-voorjaarsvergelijking

8. Intro, update-regel vooraan toegevoegd
   - Oud: "Dit voorjaar kwamen twee zwaargewichten vrijwel tegelijk uit: ..."
   - Nieuw: "Update oktober 2026: inmiddels zijn er nieuwere modellen. Het advies hieronder, kies op gebruik en niet op scorelijst, geldt nog steeds. Dit voorjaar kwamen twee zwaargewichten vrijwel tegelijk uit: ..."
   - Reden: VEROUDERD (rapport #3), hangt niet van de publicatiedatum af. Opvolgers sinds september 2026, onder meer GPT-6 Astra (3-9-2026): https://news.bgov.com/artificial-intelligence/openai-rolls-out-gpt-6-astra-model-with-cyber-guardrails-1 . Bewust geen modelnamen in de tekst gezet, omdat de Claude-opvolger in het rapport alleen een secundaire bron heeft. Als losse regel in de intro gezet en niet als apart blok, omdat het intro-blok bovenaan rendert.
9. Alinea "Het verschil is kleiner dan de marketing zegt"
   - Oud: "Voor 90 procent van het MKB-werk, mails, teksten, samenvattingen, ideeen, doen ze het allebei goed."
   - Nieuw: "Voor het meeste MKB-werk, zoals mails, teksten, samenvattingen en ideeën, doen ze het allebei goed."
   - Reden: GEEN BRON (rapport #1), geen onderzoek gevonden dat de 90 procent onderbouwt.

### 044 toekomst-van-ai-mkb-van-tool-naar-teamlid

10. Alinea "Van antwoord naar actie"
   - Oud: "Ik bouwde zelf al een voice-orchestrator waarbij ik hardop praat terwijl achtergrond-agenten het onderzoek doen. Terwijl ik praat, wordt het werk gedaan."
   - Nieuw: "Ik bouwde zelf al een voice-orchestrator waarbij ik hardop praatte terwijl achtergrond-agenten het onderzoek deden. Terwijl ik praatte, werd het werk gedaan."
   - Reden: EIGEN CLAIM die volgens John's eigen bron niet meer klopt (rapport #1): de voice-orchestrator is in mei 2026 gestopt (pattern 63, portfolio-CLAUDE.md). Alleen de tijd aangepast, de rest van de zin en "Dat is een voorproefje van waar het heen gaat." blijven staan. Verleden tijd klopt op de publicatiedatum en nu.

### 045 te-snelle-ai-brochure-regie-houden

Geen wijzigingen (alleen EIGEN CLAIM, zie open punten).

### 046 vier-fouten-mkb-beginnen-met-ai

Geen wijzigingen (alleen EIGEN CLAIM, zie open punten).

## Niet gewijzigd: open punten

### WACHT OP DATUMKEUZE

- 036: "tot ik vier tools verving door een eigen systeem" op 2-3-2026, terwijl de factuurmodule op 24-6-2026 nog preview-only was. Ook JOHN BEVESTIGT (welke vier).
- 037: "Daarom heb ik GPT-5.4 een week lang op echt werk losgelaten." GPT-5.4 kwam uit op 5-3-2026, publicatie 9-3-2026 is vier dagen later. Opties: "de eerste dagen na de release" of datum naar 12-3-2026 of later.
- 038: hele blog (16-3-2026) beschrijft het Köningsdag-ticketsysteem (evenement 27-4-2026, verkoop sloot 23-4-2026) als al gedraaid. Ook de bewering dat het systeem "facturen maakt" (factuurmodule 24-6-2026 nog preview-only) en dat de quickscan live stond (vroegste bewijs 27-5-2026) passen niet bij 16 maart.
- 040: "eigen systeem dat uren, facturen en BTW automatiseert" op 30-3-2026, zelfde tijdlijnprobleem als 036 en 038.
- 041 t/m 046 algemeen (rapport, opmerking buiten de tabellen): 041 t/m 044 staan pas in git vanaf 22-6-2026, niet vast te stellen of ze op de genoemde datum online stonden.

### WACHT OP AANBODKEUZE

- 042: weeksprint als werkwijze ("Ik werk in sprints van een week", "een proces, een week, een meetbaar resultaat") en de indeling Dag 1 t/m Dag 5. Strijdig met /werkwijze (vier stappen) en /ai (proef van €750, daarna maatwerk). Ook in titel en excerpt. Rapport-voorstel: "Ik begin altijd met één proces en een snel, meetbaar resultaat, en pas daarna het volgende." en de dagindeling als voorbeeld brengen.

### JOHN BEVESTIGT

- 036 #1: welke vier abonnementen zijn vervangen, en sinds wanneer.
- 038 #2: wanneer het ticketsysteem live ging.
- 038 #3: "kregen een geldig ticket". De case-pagina spreekt van een bevestiging, niet in de code gecontroleerd of er een ticket werd verstuurd. Voorstel: "Bezoekers betaalden vooraf via iDEAL en kregen direct een bevestiging."
- 038 #5: stond de quickscan in maart 2026 al live?
- 038 #6 en #7: eigen systeem dat uren, facturen, BTW en leads doet, en welke vier abonnementen zijn opgezegd.
- 038 #8: horeca-chatbot staat intern omschreven als demo. Voorstel: "Als demo voor de horeca bouwde ik een chatbot die ..."
- 038 #10: "CafeRadar" heet elders op de site "Caferadar" (naam gelijktrekken, geen feitelijke fout).
- 038 #11: "zes dingen die ik zelf met AI heb gebouwd", waarvan minstens één demo.
- 040 #1: eigen systeem en vier opgezegde abonnementen.
- 041 #1: "ik ben het zelf ook niet [techneut]" naast "4 jaar als business engineer" in STRATEGIE-2026.md. Voorstel: "Ik ben ondernemer en heb het zelf ook door te doen geleerd, niet via een opleiding."
- 042 #1 en #2: is de weeksprint en de dagindeling echt hoe John werkt (zie ook AANBODKEUZE).
- 044 #2: "De dingen die ik twee jaar geleden zelf deed, lopen nu deels vanzelf."
- 045 #1 t/m #3: brochure-anekdote. Alleen de kern staat in een LinkedIn-concept, het telefoontje van de makelaar, de uitbouw en de toon zijn nergens vastgelegd. Bevestigen of schrappen/herschrijven als "Stel je voor dat ...".
- 046 #2: excerpt "de vier fouten die ik bij elk eerste gesprek tegenkom" is absoluut. Voorstel: "in eerste gesprekken het vaakst tegenkom".

### Overig bewust niet gewijzigd (oordeel KLOPT met kanttekening)

- 035 #5: optionele toevoeging dat Workspace duurder werd door Gemini. Niet nodig, bewering klopt.
- 037 #4: "dwaalt minder af ... houdt instructies beter vast" staat al onder "Wat merk je in de praktijk?" en leest dus als ervaring.
- 037 #7 en 043 #5: optionele toevoeging dat GPT-5.4/5.5 alleen in betaalde ChatGPT-abonnementen zat. Bewering in de blog klopt.
- 046 #1: "kan een boete kosten als het uitlekt". Klopt in strekking, de AP spreekt al van een datalek bij het invoeren. Rapport-voorstel ligt klaar als John het scherper wil.
