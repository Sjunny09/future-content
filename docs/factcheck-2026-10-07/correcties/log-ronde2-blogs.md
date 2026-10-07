# Correctielog ronde 2 blogs (7 oktober 2026)

Na commit 0b2e657 (blogdatums gelijk aan de echte publicatie) en John's besluiten van 7 oktober. Bestanden: `lib/blog.ts` en `lib/blog/ai-posts-1.ts` t/m `ai-posts-5.ts`. Datums, titels en slugs niet aangeraakt. De post `telefoonfilmpje-sprookje-waar-ai-de-mist-in-ging` en de zeven posts van 2026-10-07 zijn nagelopen op de besluiten en bleven ongewijzigd.

Niet gecommit. `npx tsc --noEmit -p .` geeft geen fouten.

## Telling

- Tekst klopt niet met de nieuwe datum: 14
- Sonnet 5 tegen de release van 30 juni 2026: 7
- Köningsdag eigen festival en restaurant-chatbot als demo: 3
- Köningsdag is John's eigen festival: 3
- Restaurant-chatbot was een demo: 3
- Geen opgezegde abonnementen: 3
- Aanbod volgt het geldende model: 20
- Totaal: 53

## Wijzigingen per soort

### Tekst klopt niet met de nieuwe datum

1. **meer-bezichtigingen-met-video-2025**
   - Oud: "{ type: "h2", text: "De realiteit van Funda in 2025" }"
   - Nieuw: "{ type: "h2", text: "De realiteit van Funda" }"
   - Reden: Blog staat op 25-2-2026, "in 2025" las als het lopende jaar. Zonder jaartal klopt de kop op elke datum.

2. **2025-terugblik-wat-werkte**
   - Oud: "Hier is wat ik dit jaar leerde uit tientallen shoots"
   - Nieuw: "Hier is wat ik in 2025 leerde uit tientallen shoots"
   - Reden: Blog staat op 25-2-2026, "dit jaar" zou nu 2026 betekenen terwijl de terugblik over 2025 gaat.

3. **grok-4-1-en-gemini-3-de-ai-race-versnelt**
   - Oud: "De afgelopen week kwamen Grok 4.1 van xAI en Gemini 3 van Google vrijwel achter elkaar uit. Voor wie het volgt voelt het als een wapenwedloop."
   - Nieuw: "In november 2025 kwamen Grok 4.1 van xAI en Gemini 3 van Google binnen een week vrijwel achter elkaar uit. Voor wie het volgt voelde het als een wapenwedloop."
   - Reden: Blog staat op 22-6-2026. Grok 4.1 kwam 17-11-2025, Gemini 3 op 18-11-2025, dus niet "de afgelopen week".

4. **claude-opus-4-5-waarom-dit-model-anders-schrijft**
   - Oud: "Anthropic bracht Claude Opus 4.5 uit, en als iemand die veel met deze modellen schrijft viel me direct iets op."
   - Nieuw: "Anthropic bracht in november 2025 Claude Opus 4.5 uit. Inmiddels zijn er nieuwere versies, maar wat me bij deze versie opviel als iemand die veel met deze modellen schrijft, geldt nog steeds."
   - Reden: Blog staat op 22-6-2026, Opus 4.5 kwam 24-11-2025 en is op die datum al opgevolgd (Opus 4.7 dit voorjaar, zie blog 043). Tekst deed alsof het model net uit was.

5. **van-chatgpt-naar-claude-waarom-ik-overstapte-voor-schrijfwerk**
   - Oud: "Voor schrijfwerk ben ik in de loop van dit jaar van ChatGPT naar Claude gegaan,"
   - Nieuw: "Voor schrijfwerk ben ik van ChatGPT naar Claude gegaan,"
   - Reden: Blog staat op 22-6-2026. "Dit jaar" schreef op de oude datum (december 2025) over 2025 en zou nu 2026 betekenen. Het moment van de overstap is niet vastgelegd (JOHN BEVESTIGT), dus jaartal weggelaten.

6. **beste-ai-model-2025-eindejaarsvergelijking**
   - Oud: "Aan het einde van 2025 krijg ik bijna wekelijks de vraag: John, welk AI-model moet ik nou kiezen? GPT-5.2, Claude of Gemini? Ik gebruik ze alle drie elke dag in mijn werk voor het MKB in de Kempen. Hier is mijn eerlijke stand van zaken, zonder marketingpraat."
   - Nieuw: "Aan het einde van 2025 kreeg ik steeds vaker de vraag: John, welk AI-model moet ik nou kiezen? GPT-5.2, Claude of Gemini? Dit is mijn eerlijke stand van zaken van eind 2025, zonder marketingpraat. De modellen hebben inmiddels nieuwere versies, maar de manier van kiezen is niet veranderd."
   - Reden: Blog staat op 22-6-2026. De intro sprak in de tegenwoordige tijd over eind 2025, en GPT-5.2 is op die datum opgevolgd door GPT-5.4 en GPT-5.5. De zin "Ik gebruik ze alle drie elke dag" gekoppeld aan eind 2025 botste met het interview (pas na januari 2026 echt in AI), dus geschrapt. Excerpt zegt al "Ik gebruik ze allemaal in mijn werk" in de tegenwoordige tijd.

7. **ai-ervaringen-ondernemer-2025**
   - Oud: "2025 was voor mij het jaar waarin AI van speeltje naar werkpaard ging."
   - Nieuw: "Nu 2026 al half voorbij is, kijk ik terug op 2025, het jaar waarin AI voor mij van speeltje naar werkpaard ging."
   - Reden: Blog staat op 22-6-2026 en is een jaarterugblik. Opening maakt de terugblik expliciet.

8. **ai-ervaringen-ondernemer-2025**
   - Oud: "{ type: "h2", text: "Wat ik meeneem naar 2026" }"
   - Nieuw: "{ type: "h2", text: "Wat ik meenam naar 2026" }"
   - Reden: Blog staat midden in 2026, toekomende tijd klopte niet meer.

9. **ai-ervaringen-ondernemer-2025**
   - Oud: "De ondernemers die dit jaar het meest van AI profiteerden,"
   - Nieuw: "De ondernemers die in 2025 het meest van AI profiteerden,"
   - Reden: "Dit jaar" zou op 22-6-2026 over 2026 gaan, de terugblik gaat over 2025.

10. **ai-trends-2026**
   - Oud: "Iedereen doet voorspellingen rond de jaarwisseling, dus laat ik er ook een paar doen. Niet om indruk te maken, maar omdat ik er als bouwer middenin zit. Dit zijn zeven dingen die ik in 2026 verwacht, met beide voeten op de grond."
   - Nieuw: "Rond de jaarwisseling doet iedereen voorspellingen. Ik doe het halverwege het jaar, als je al kunt zien welke kant het op gaat. Niet om indruk te maken, maar omdat ik er als bouwer middenin zit. Dit zijn zeven dingen die ik voor de rest van 2026 verwacht, met beide voeten op de grond."
   - Reden: Blog staat op 22-6-2026, de intro deed alsof hij rond de jaarwisseling geschreven was.

11. **ai-trends-2026**
   - Oud: "2025 was het jaar van praten met AI. 2026 wordt het jaar dat AI dingen doet."
   - Nieuw: "2025 was het jaar van praten met AI. 2026 is het jaar dat AI dingen gaat doen."
   - Reden: Op 22-6-2026 is 2026 al bezig, "wordt" klopte niet meer.

12. **ai-trends-2026**
   - Oud: "In 2026 wordt de vraag niet meer kan het, maar levert het iets op."
   - Nieuw: "In 2026 is de vraag niet meer kan het, maar levert het iets op."
   - Reden: Zelfde reden, 2026 is op de publicatiedatum al half om.

13. **ai-agents-uitgelegd**
   - Oud: "waarom dit het belangrijkste woord van 2026 wordt."
   - Nieuw: "waarom dit het belangrijkste woord van 2026 is."
   - Reden: Blog staat op 22-6-2026, 2026 is al bezig.

14. **gpt-5-4-getest-voor-ondernemers**
   - Oud: "Daarom heb ik GPT-5.4 een week lang op echt werk losgelaten."
   - Nieuw: "Daarom heb ik GPT-5.4 na de release in maart een week lang op echt werk losgelaten."
   - Reden: Blog staat op 22-6-2026, GPT-5.4 kwam 5-3-2026. Met "in maart" is duidelijk wanneer de test was. Het oude open punt (test in vier dagen) is door de nieuwe datum opgelost.

### Sonnet 5 tegen de release van 30 juni 2026

1. **claude-sonnet-5-uit**
   - Oud: "Er is een nieuwe Sonnet. Sneller, slimmer, scherper."
   - Nieuw: "Er is een nieuwe Sonnet. Slimmer, zelfstandiger, scherper."
   - Reden: "Sneller" is geen claim van Anthropic. Anthropic noemt Sonnet 5 het meest agentische Sonnet-model, dat taken zelf plant en minder toezicht nodig heeft (aankondiging 30-6-2026, https://www.anthropic.com/news/claude-sonnet-5).

2. **claude-sonnet-5-uit**
   - Oud: "Sneller, slimmer, beter in van alles."
   - Nieuw: "Slimmer, zelfstandiger, beter in van alles."
   - Reden: Zelfde reden als het excerpt.

3. **claude-sonnet-5-uit**
   - Oud: "De nieuwe versie is merkbaar sneller en gaat beter om met langere en ingewikkeldere taken. Voor wie veel met AI werkt, voelt dat als een collega die net wat scherper is geworden en minder vaak hoeft te worden bijgestuurd."
   - Nieuw: "Volgens [de aankondiging van Anthropic](https://www.anthropic.com/news/claude-sonnet-5) plant de nieuwe versie taken met meerdere stappen beter, kan hij zelf tools zoals een browser bedienen en heeft hij minder toezicht nodig dan Sonnet 4.6. Voor wie veel met AI werkt, moet dat voelen als een collega die net wat scherper is geworden en minder vaak hoeft te worden bijgestuurd."
   - Reden: "Merkbaar sneller" is eigen ervaring op de releasedag en geen officiële claim. Vervangen door wat Anthropic zelf zegt (meerstappentaken, tools zoals browser en terminal, minder toezicht dan Sonnet 4.6), met bron.

4. **claude-sonnet-5-uit**
   - Oud: "Ik gebruik Sonnet zelf veel voor het bouwen van oplossingen voor klanten. Het verschil dat ik merk is niet spectaculair, maar wel prettig: minder herhalen, nettere eerste versies, sneller resultaat."
   - Nieuw: "Hoe groot het verschil in je dagelijkse werk is, merk je pas na een paar weken gebruik. Op de dag van de release kan niemand dat eerlijk zeggen."
   - Reden: Opdracht: geen langdurige eigen ervaring met Sonnet 5 claimen op de releasedag (30-6-2026).

5. **claude-sonnet-5-uit**
   - Oud: "Sneller antwoord: minder wachten, vooral bij grotere taken zoals lange teksten of meerdere stappen achter elkaar."
   - Nieuw: "Meer zelf afhandelen: het model pakt grotere taken met meerdere stappen achter elkaar op, met minder tussenkomst van jou."
   - Reden: "Sneller" is geen officiële claim, zelfstandiger werken wel.

6. **claude-sonnet-5-uit**
   - Oud: "Gunstiger prijs-prestatie: je krijgt meer waarde voor hetzelfde, wat AI betaalbaarder maakt voor het MKB."
   - Nieuw: "Gunstiger prijs-prestatie: volgens Anthropic komt het op een aantal taken in de buurt van het zwaardere Opus-model, voor een lagere prijs."
   - Reden: Concreet gemaakt met wat Anthropic claimt: scores voor agentisch zoeken en computergebruik dicht bij Opus 4.8, geprijsd onder Opus.

7. **claude-sonnet-5-uit**
   - Oud: "Werk je in de Claude-app, dan krijg je de nieuwe versie vanzelf en hoef je niets te installeren."
   - Nieuw: "Werk je met een gratis account of Pro in de Claude-app, dan wordt de nieuwe versie vanaf 1 juli vanzelf je standaardmodel en hoef je niets te installeren."
   - Reden: Sonnet 5 werd per 1 juli 2026 het standaardmodel voor Free en Pro, voor Max, Team en Enterprise is het beschikbaar maar niet automatisch standaard.

### Köningsdag is John's eigen festival

1. **ai-ervaringen-ondernemer-2025**
   - Oud: "Een ticketsysteem voor Köningsdag in Reusel, gebouwd voor een lokaal evenement met een concrete deadline."
   - Nieuw: "Een ticketsysteem voor ons eigen festival Köningsdag Reusel, met een concrete deadline."
   - Reden: Besluit John: Köningsdag Reusel is zijn eigen festival, niet "een lokaal evenement" van een ander. Geen betaling toegevoegd, want het gaat hier over 2025 (toen formulier, Google Sheets en mail).

2. **ai-specialist-kempen-brabant**
   - Oud: "Een lokaal evenement zoals Köningsdag in Reusel met een eigen ticketsysteem dat de drukte aankan."
   - Nieuw: "Ons eigen festival Köningsdag Reusel, met een eigen ticketsysteem waarin bezoekers vooraf online betaalden."
   - Reden: Besluit John: eigen festival. "Dat de drukte aankan" is nooit gemeten. Op 22-6-2026 had de Mollie-versie (april 2026) gedraaid, dus vooraf online betalen klopt.

3. **wat-kun-je-echt-bouwen-met-ai-6-voorbeelden**
   - Oud: "Voor Köningsdag in Reusel bouwde ik een ticketsysteem met online betaling."
   - Nieuw: "Voor ons eigen festival Köningsdag Reusel bouwde ik een ticketsysteem met online betaling via Mollie."
   - Reden: Besluit John: eigen festival. Mollie toegevoegd als bron-feit (README koningsdag-reusel). Datumprobleem van 16-3-2026 is opgelost door de nieuwe datum 22-6-2026.

### Köningsdag eigen festival en restaurant-chatbot als demo

1. **ai-automatisering-wat-kun-je-nu-echt-bouwen-voor-je-bedrijf**
   - Oud: "Dat laatste is geen theorie. Voor een restaurant bouwde ik een chatbot die zelf tafels reserveert. Voor Köningsdag in Reusel maakte ik een aanmeldsysteem met een online formulier en Google Sheets, waarna deelnemers hun ticket per mail kregen. Zo hoefde de organisatie niet meer met losse lijstjes te werken."
   - Nieuw: "Dat laatste heb ik als demo gebouwd: een chatbot die voor een restaurant zelf tafels reserveert, om te laten zien hoe zoiets werkt. En voor ons eigen festival Köningsdag Reusel bouwde ik een ticketsysteem met online betaling via Mollie, voor de lunch op Koningsdag 27 april 2026. De verkoop sloot op 23 april, daarna ging de lijst met broodjeskeuzes naar de catering. Zo hoefde de organisatie niet meer met losse lijstjes en contant geld te werken."
   - Reden: Blog staat nu op 22-6-2026, dus de Mollie-versie (april 2026) bestond al: terug naar online betaling (bron 03-klanten/koningsdag-reusel/README.md: Mollie, Koningsdag 27-4-2026, verkoop sloot 23-4-2026 15:00). Köningsdag is John's eigen festival. De restaurant-chatbot was een demo, geen klantproject.

2. **ai-ervaringen-ondernemer-2025**
   - Oud: "Een restaurant-chatbot die reserveringen aanneemt en simpele vragen beantwoordt, zodat de telefoon minder vaak rinkelt tijdens de drukte."
   - Nieuw: "Een demo van een restaurant-chatbot die reserveringen aanneemt en simpele vragen beantwoordt, om te laten zien hoe zoiets werkt."
   - Reden: Besluit John: de restaurant-chatbot was een demo, geen klantproject en geen gemeten resultaat ("telefoon rinkelt minder").

3. **ai-specialist-kempen-brabant**
   - Oud: "Een restaurant met een chatbot die reserveringen aanneemt, zodat de telefoon minder rinkelt tijdens de service."
   - Nieuw: "Een demo van een chatbot voor een restaurant die reserveringen aanneemt, gebouwd om te laten zien hoe dat werkt."
   - Reden: Besluit John: demo, geen live klant, geen resultaat.

### Restaurant-chatbot was een demo

1. **10-ai-tools-die-elk-mkb-bedrijf-moet-kennen**
   - Oud: "Een paar van deze categorieën heb ik zelf ingevuld met maatwerk. Voor een restaurant bouwde ik bijvoorbeeld een chatbot die zelf tafels reserveert. Dat valt onder de chatbot-rij, maar dan helemaal toegespitst op een specifieke zaak."
   - Nieuw: "Een paar van deze categorieën heb ik zelf met maatwerk uitgewerkt. Als demo bouwde ik bijvoorbeeld een chatbot die voor een restaurant zelf tafels reserveert, om te laten zien hoe dat werkt. Dat valt onder de chatbot-rij, maar dan helemaal toegespitst op één soort zaak."
   - Reden: Besluit John: de restaurant-chatbot was een demo, geen klantproject.

2. **ai-agents-uitgelegd**
   - Oud: "Ik bouwde een restaurant-chatbot die reserveringen aanneemt. De eerste versie"
   - Nieuw: "Ik bouwde als demo een restaurant-chatbot die reserveringen aanneemt, om te laten zien hoe zoiets werkt. De eerste versie"
   - Reden: Besluit John: demo, geen klantproject.

3. **wat-kun-je-echt-bouwen-met-ai-6-voorbeelden**
   - Oud: "Voor de horeca bouwde ik een chatbot die niet alleen vragen beantwoordt,"
   - Nieuw: "Als demo voor de horeca bouwde ik een chatbot die niet alleen vragen beantwoordt,"
   - Reden: Besluit John: demo, geen klantproject (ook rapport 038 #8).

### Geen opgezegde abonnementen

1. **5-ai-fouten-die-je-bedrijf-geld-kosten**
   - Oud: "Stapel geen abonnementen die elkaar overlappen. Dat overkwam mij ook, tot ik vier tools verving door een eigen systeem."
   - Nieuw: "Stapel geen abonnementen die elkaar overlappen."
   - Reden: Besluit John: hij heeft geen abonnementen opgezegd, de claim dat zijn systeem vier tools verving is weg.

2. **wat-kun-je-echt-bouwen-met-ai-6-voorbeelden**
   - Oud: "Ik heb een eigen systeem gebouwd dat mijn uren bijhoudt, facturen maakt, de BTW klaarzet en leads beheert. Daarvoor betaalde ik vier losse abonnementen. Die heb ik allemaal opgezegd. Het scheelt me geld per maand en, belangrijker, het werkt precies zoals ik wil omdat ik het zelf heb ingericht."
   - Nieuw: "Ik heb een eigen systeem gebouwd dat mijn uren bijhoudt, facturen maakt, de BTW klaarzet en leads beheert. Het werkt precies zoals ik wil, omdat ik het zelf heb ingericht."
   - Reden: Besluit John: geen opgezegde abonnementen. Eigen systeem voor administratie mag blijven.

3. **beste-ai-tools-voor-zzp-en-kleine-teams**
   - Oud: "Ik ben zo ver gegaan dat ik mijn eigen systeem heb gebouwd dat uren, facturen en BTW automatiseert, waarmee ik vier abonnementen kon opzeggen."
   - Nieuw: "Ik ben zo ver gegaan dat ik mijn eigen systeem heb gebouwd dat uren, facturen en BTW automatiseert."
   - Reden: Besluit John: geen opgezegde abonnementen.

### Aanbod volgt het geldende model

1. **ai-automatisering-een-proces-een-week**
   - Oud: "Vergeet grote AI-transformaties die maanden duren. Ik werk in sprints van een week: een proces, een oplossing, een meetbaar resultaat. Dit is hoe die aanpak werkt."
   - Nieuw: "Vergeet grote AI-transformaties die maanden duren. Ik begin altijd met één proces en een snel, meetbaar resultaat, en pas daarna het volgende. Dit is hoe die aanpak werkt."
   - Reden: Besluit John: geen weeksprint als vaste werkwijze. Formulering uit het rapport-voorstel (log-ai-posts-3, WACHT OP AANBODKEUZE 042).

2. **ai-automatisering-een-proces-een-week**
   - Oud: "Daarom werk ik anders: een proces, een week, een meetbaar resultaat. En dan weer opnieuw."
   - Nieuw: "Daarom werk ik anders: één proces, een werkende proef die snel laat zien of het werkt, en een meetbaar resultaat. En dan het volgende."
   - Reden: Besluit John: weeksprint eruit, werkende proef erin.

3. **ai-automatisering-een-proces-een-week**
   - Oud: "{ type: "h2", text: "Waarom een week en niet een halfjaar?" }"
   - Nieuw: "{ type: "h2", text: "Waarom klein en snel, en niet een halfjaar?" }"
   - Reden: Besluit John: geen weeksprint.

4. **ai-automatisering-een-proces-een-week**
   - Oud: "Een korte sprint dwingt scherpte af. Je kunt in een week geen tien dingen tegelijk doen, dus je kiest het ene proces dat het meeste pijn veroorzaakt. Bovendien zie je snel of het werkt. Werkt het niet, dan heb je een week verloren, geen halfjaar."
   - Nieuw: "Een kleine, afgebakende stap dwingt scherpte af. Je kunt niet tien dingen tegelijk doen, dus je kiest het ene proces dat het meeste pijn veroorzaakt. Bovendien zie je snel of het werkt. Werkt het niet, dan ben je een paar weken kwijt, geen halfjaar."
   - Reden: Besluit John: geen weeksprint.

5. **ai-automatisering-een-proces-een-week**
   - Oud: "{ type: "h2", text: "Hoe zo'n week eruitziet" },
      { type: "ul", items: ["Dag 1: het proces in kaart brengen. Wat doe je nu, stap voor stap, en waar zit de tijdverspilling?", "Dag 2 en 3: bouwen. De simpelste versie die het probleem oplost, niet de mooiste.", "Dag 4: testen op echt werk. Niet op een demo, maar op je dagelijkse praktijk.", "Dag 5: meten en bijstellen. Hoeveel tijd bespaart het, en wat moet er nog beter?"] },"
   - Nieuw: "{ type: "h2", text: "Hoe dat eruitziet" },
      { type: "ul", items: ["Eerst het proces in kaart brengen. Wat doe je nu, stap voor stap, en waar zit de tijdverspilling?", "Dan bouwen. De simpelste versie die het probleem oplost, niet de mooiste.", "Testen op echt werk. Niet op een demo, maar op je dagelijkse praktijk.", "Meten en bijstellen. Hoeveel tijd bespaart het, en wat moet er nog beter?"] },
      { type: "p", text: "Bij mij begint dat met de gratis [AI-scan](/scan). Daarna volgt een werkende proef van €750 inclusief btw op je eigen werk, zodat je ziet dat het werkt voordat je de bouw betaalt. Ga je door, dan gaat dat bedrag van de bouwprijs af. De bouw zelf kost een vaste prijs tussen €2.500 en €8.500, afgesproken na de proef, en voor het beheer reken ik vanaf €250 per maand." },"
   - Reden: Besluit John: dagindeling als vaste weekplanning eruit, de stappen blijven als werkwijze. Het geldende aanbod (gratis scan, proef €750 incl. btw die van de bouwprijs af gaat, bouw €2.500 tot €8.500, beheer vanaf €250 per maand) toegevoegd zoals op /ai en in AI_WEDGES.

6. **ai-automatisering-een-proces-een-week**
   - Oud: "Na de sprint vergelijk je dat."
   - Nieuw: "Na de proef vergelijk je dat."
   - Reden: Besluit John: geen sprint.

7. **ai-automatisering-een-proces-een-week**
   - Oud: "Een week met een meetbaar resultaat verslaat een halfjaar met een mooie belofte."
   - Nieuw: "Een paar weken met een meetbaar resultaat verslaat een halfjaar met een mooie belofte."
   - Reden: Besluit John: geen weeksprint.

8. **ai-automatisering-een-proces-een-week**
   - Oud: "dan kijken we of het in een week op te lossen is."
   - Nieuw: "dan kijken we of een werkende proef het snel kan oplossen."
   - Reden: Besluit John: geen weeksprint, CTA volgt het model.

9. **te-snelle-ai-brochure-regie-houden**
   - Oud: "Wel: eerst een tweede brein bouwen voor het bedrijf waar ik voor werk."
   - Nieuw: "Wel: eerst de kennis van het bedrijf waar ik voor werk op een rij zetten."
   - Reden: Besluit John: de stap "tweede brein" hoort niet meer in het aanbod. De werkwijze (eerst gecontroleerde bedrijfskennis, dan AI) blijft.

10. **te-snelle-ai-brochure-regie-houden**
   - Oud: "Daarom bouw ik nu een tweede brein voordat ik iets bouw met AI."
   - Nieuw: "Daarom zet ik nu eerst de kennis van een bedrijf op een rij voordat ik iets bouw met AI."
   - Reden: Besluit John: geen "tweede brein" als stap.

11. **te-snelle-ai-brochure-regie-houden**
   - Oud: "Wil je AI gaan inzetten in je bedrijf maar zonder dezelfde fouten te maken? Plan een gesprek van 30 minuten. Ik laat je zien hoe een tweede brein voor jouw bedrijf eruit zou zien, en wat AI daarna voor jou kan doen."
   - Nieuw: "Wil je AI gaan inzetten in je bedrijf maar zonder dezelfde fouten te maken? Doe de gratis AI-scan of plan een gesprek van 30 minuten. Ik laat je zien welke kennis over jouw bedrijf eerst op een rij moet, en wat AI daarna voor jou kan doen."
   - Reden: Besluit John: CTA volgt het model (gratis scan als eerste stap), geen tweede brein als aanbod.

12. **wat-kost-ai-voor-een-mkb-bedrijf**
   - Oud: "Een agent die op maat gebouwd is: geen abonnement maar een bouwtraject, op aanvraag en per situatie"
   - Nieuw: "Een agent die op maat gebouwd is: een eenmalige bouwprijs plus een maandbedrag voor beheer, zie hieronder"
   - Reden: Besluit John: "geen abonnement, op aanvraag" botst met het geldende model (bouw plus beheer vanaf €250 per maand).

13. **wat-kost-ai-voor-een-mkb-bedrijf**
   - Oud: "Voor het bouwen en beheren van automatisering op maat ligt dat anders. Dat hangt af van wat er precies gebouwd moet worden en hoeveel processen het raakt, dus dat bespreken we altijd per bedrijf, op aanvraag."
   - Nieuw: "Voor het bouwen en beheren van automatisering op maat werkt het zo. Je begint met de gratis [AI-scan](/scan). Daarna volgt een werkende proef van €750 inclusief btw op je eigen werk, en dat bedrag gaat van de bouwprijs af als je doorgaat. De bouw zelf kost een vaste prijs tussen €2.500 en €8.500, afgesproken na de proef. Een heel grote bouw ligt tussen €8.500 en €15.000. Voor het beheer reken ik vanaf €250 per maand. Waar je precies uitkomt, hangt af van wat er gebouwd moet worden en hoeveel processen het raakt."
   - Reden: Besluit John: geldend aanbodmodel in plaats van "op aanvraag". Let op: de blog staat op 3-7-2026, de vaste bedragen zijn op 13-7-2026 besloten en staan sinds 14-7 op /ai. Op John's besluit toch doorgevoerd.

14. **iemand-die-ai-implementeert-bij-je-bedrijf-brabant**
   - Oud: "Hier is het eerlijke antwoord: dezelfde stappen die ook op de pagina [werkwijze](/werkwijze) staan, in de volgorde waarin het bij mij ook echt gaat."
   - Nieuw: "Hier is het eerlijke antwoord, in de volgorde waarin het bij mij ook echt gaat. Meer over mijn [werkwijze](/werkwijze) staat op een aparte pagina."
   - Reden: Rapport 056 #1: de blog volgde niet dezelfde stappen als /werkwijze (die pagina wordt tegelijk door een andere agent aangepast). Bewering "dezelfde stappen" weg, link blijft.

15. **iemand-die-ai-implementeert-bij-je-bedrijf-brabant**
   - Oud: "{ type: "h2", text: "Stap 1: een vrijblijvend gesprek" },
      { type: "p", text: "Het begint met bellen, appen, of me gewoon uitnodigen voor een bak koffie."
   - Nieuw: "{ type: "h2", text: "Stap 1: de gratis scan of een vrijblijvend gesprek" },
      { type: "p", text: "Het begint met de gratis [AI-scan](/scan), of met bellen, appen, of me gewoon uitnodigen voor een bak koffie."
   - Reden: Besluit John: het model begint met de gratis AI-scan.

16. **iemand-die-ai-implementeert-bij-je-bedrijf-brabant**
   - Oud: "{ type: "h2", text: "Stap 2: de workshop op locatie" },
      { type: "p", text: "Klikt het, dan volgt een workshop bij jou op kantoor of in de zaak. Geen praatje met slides:"
   - Nieuw: "{ type: "h2", text: "Stap 2: een werkende proef op je eigen werk" },
      { type: "p", text: "Klikt het, dan volgt een werkende proef van €750 inclusief btw. Daarvoor kom ik bij jou op kantoor of in de zaak. Geen praatje met slides:"
   - Reden: Besluit John: de tweede stap is de werkende proef van €750 inclusief btw, niet een losse workshop.

17. **iemand-die-ai-implementeert-bij-je-bedrijf-brabant**
   - Oud: "Aan het eind van die dag lever ik geen adviesrapport op papier, maar een werkend proof of concept, gebouwd op jullie eigen data. Je ziet die dag zelf of het werkt, voordat je ergens ja tegen zegt."
   - Nieuw: "Aan het eind lever ik geen adviesrapport op papier, maar een werkend proof of concept, gebouwd op jullie eigen data. Je ziet zelf of het werkt, voordat je ja zegt tegen de bouw. Ga je door, dan gaat de €750 van de bouwprijs af."
   - Reden: Besluit John: proef gaat van de bouwprijs af. "Aan het eind van die dag" weg, omdat de proef niet per se één dag is (rapport 056 #3).

18. **iemand-die-ai-implementeert-bij-je-bedrijf-brabant**
   - Oud: "dan krijg je een heldere offerte op basis van wat er in de workshop naar boven kwam, met bedragen in dezelfde orde van grootte als in [wat AI kost voor een mkb-bedrijf](/blog/wat-kost-ai-voor-een-mkb-bedrijf)."
   - Nieuw: "dan krijg je een heldere offerte met een vaste prijs op basis van wat er in de proef naar boven kwam, meestal tussen €2.500 en €8.500. Meer over de kosten lees je in [wat AI kost voor een mkb-bedrijf](/blog/wat-kost-ai-voor-een-mkb-bedrijf)."
   - Reden: Besluit John: bouwprijs €2.500 tot €8.500 benoemen, proef in plaats van workshop.

19. **iemand-die-ai-implementeert-bij-je-bedrijf-brabant**
   - Oud: "We spreken gewoon af hoe vaak we even bijpraten."
   - Nieuw: "Beheer kost vanaf €250 per maand, en we spreken gewoon af hoe vaak we even bijpraten."
   - Reden: Besluit John: beheer vanaf €250 per maand.

20. **iemand-die-ai-implementeert-bij-je-bedrijf-brabant**
   - Oud: "kom ik gewoon fysiek langs voor de workshop,"
   - Nieuw: "kom ik gewoon fysiek langs voor de proef,"
   - Reden: Besluit John: workshop als stap vervangen door de werkende proef.
## Titels die niet (meer) bij de datum passen

Niet gewijzigd, John beslist.

1. **10-ai-tools-die-elk-mkb-bedrijf-moet-kennen** (22-6-2026): "10 AI-tools die elk MKB-bedrijf in 2025 moet kennen". Staat midden in 2026. Rapportvoorstel: "10 soorten AI-tools die elk MKB-bedrijf moet kennen".
2. **claude-opus-4-5-waarom-dit-model-anders-schrijft** (22-6-2026): "Claude Opus 4.5 is er" doet alsof het model net uit is, terwijl het van november 2025 is en op 22-6 al opgevolgd. De intro zegt dat nu wel.
3. **beste-ai-model-2025-eindejaarsvergelijking** (22-6-2026): "GPT-5.2 vs Claude vs Gemini: de eindejaarsvergelijking" staat in juni, en GPT-5.2 is dan al opgevolgd door GPT-5.4 en GPT-5.5. De intro zegt nu dat het de stand van eind 2025 is.
4. **ai-trends-2026** (22-6-2026): "7 AI-voorspellingen voor 2026" voor een jaar dat al half om is. De intro is aangepast ("voor de rest van 2026"), de titel kan blijven als John dat goed vindt.
5. **ai-ervaringen-ondernemer-2025** (22-6-2026): "Mijn AI-jaar 2025" is een jaarterugblik die een half jaar na de jaarwisseling verschijnt. Klopt als terugblik, valt alleen laat.
6. **grok-4-1-en-gemini-3-de-ai-race-versnelt** (22-6-2026): titel klopt feitelijk, maar is nieuws van november 2025. De intro noemt nu de maand.
7. **claude-sonnet-5-uit** (30-6-2026): "sneller en slimmer". "Sneller" is geen officiële claim van Anthropic (wel: zelfstandiger, meerstappentaken, tools). In de tekst is "sneller" vervangen, in de titel niet.
8. **ai-automatisering-een-proces-een-week**: "een proces, een week, meetbaar resultaat" botst met John's besluit dat de weeksprint geen vaste werkwijze is. Tekst en excerpt volgen nu het model, de titel (en de linktekst in `van-losse-prompt-naar-werkend-systeem`, die de titel citeert) nog niet.

## Bewust niet gewijzigd, voor John

- **€750 inclusief btw.** Zo staat het in de blogs, volgens de opdracht. Op /ai, in `AI_PRIJS_TRAP` en in de AI_WEDGES-FAQ staat alleen "€750" zonder btw-vermelding. Even gelijktrekken.
- **€8.500 tot €15.000 voor een heel grote bouw** staat alleen in `wat-kost-ai-voor-een-mkb-bedrijf`. Op /ai staat dit bedrag niet (in `PRIJZEN` alleen het commentaar "enterprise ligt hoger").
- **wat-kost-ai-voor-een-mkb-bedrijf en iemand-die-ai-implementeert-bij-je-bedrijf-brabant staan op 3-7-2026**, de vaste bedragen zijn op 13-7-2026 besloten. Op John's besluit toch doorgevoerd, maar op de publicatiedatum bestonden die bedragen nog niet.
- **Eigen systeem voor uren, facturen en BTW op 22-6-2026** (ai-voor-mkb-waar-begin-je-echt, hoeveel-tijd-bespaart, ai-automatisering-wat-kun-je, wat-kun-je-echt-bouwen, beste-ai-tools-voor-zzp): het OS is van juli 2026 en de factuurmodule was op 24-6 nog preview. John's besluit laat "eigen systeem voor administratie" staan, dus niet aangeraakt.
- **ai-ervaringen-ondernemer-2025**: "Ik bouwde dingen die echt werken voor ondernemers in de Kempen" en "ik bouwde te vaak iets voordat een klant ja had gezegd" (JOHN BEVESTIGT uit ronde 1, botst met het interview en met de coach-afspraken over O2Plus en Groot Speijck). "Ik bespaar er elke maand uren mee" is niet gemeten.
- **grok-4-1-en-gemini-3**: "Mijn advies blijft hetzelfde als een jaar geleden" (juni 2025 was John volgens het interview nog niet met AI bezig).
- **toekomst-van-ai-mkb**: "De dingen die ik twee jaar geleden zelf deed" (JOHN BEVESTIGT uit ronde 1).
- **wat-kun-je-echt-bouwen**: "Bezoekers konden vooraf betalen en kregen een geldig ticket" (rapportvoorstel: "een bevestiging"). De zin "dat is het verschil tussen een leuke gimmick en iets dat echt werk uit handen neemt" staat nu achter een demo, leest prima maar John kan hem afzwakken.
- **slim-subsidie-aanvragen**: "de workshop en training zo beschrijven" laten staan, het is geen prijs of eerste stap.
- **Scan-omschrijving**: meerdere blogs zeggen dat de scan "binnen een paar minuten drie concrete AI-kansen" geeft (o.a. iemand-die-ai-implementeert, gemini-3-1, wat-kun-je-echt-bouwen). Op /ai staat nu "meestal binnen 24 uur een persoonlijke video". Buiten deze opdracht, wel strijdig met de huidige site.
- **koningsdag-reusel/README.md** noemt het project nog "Klant-cluster ... voor dezelfde klant (Stichting Köningsdag Reusel)". John's besluit gaat voor, README niet aangeraakt.
- **Opgeloste datumpunten uit ronde 1** zonder tekstwijziging: 021 (Gemini 3 was op 22-6-2026 al uit), 037 (testweek na 5 maart past nu, alleen "in maart" toegevoegd), 038 (Köningsdag in het verleden op 22-6), 041 t/m 050 (datum gelijk aan de eerste commit).
