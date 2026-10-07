# Factcheck blogs 031 t/m 040

Gecontroleerd op 7 oktober 2026. Oordelen tegen de publicatiedatum van elke blog.

## 031_ai-en-eigen-schrijfstijl.md
Publicatiedatum 2026-01-26. Geen infographic. Weinig toetsbare feiten; 3 beweringen gecontroleerd.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Een taalmodel kiest standaard de meest gemiddelde formulering. Het pakt wat statistisch het meest waarschijnlijk is." | KLOPT | Vereenvoudiging van next-token-voorspelling; in de praktijk wordt er gesampled (temperature) en is het model na training bijgestuurd, dus "meest waarschijnlijk" is niet letterlijk elke keer zo. Voor een lekenblog verdedigbaar. | Eventueel: "Een taalmodel kiest standaard een formulering die statistisch voor de hand ligt." |
| 2 | "ik laat bijvoorbeeld nooit een gedachtestreepje toe" | KLOPT | Bevestigd in John's eigen schrijfregels (`~/.claude/CLAUDE.md`: "Geen em-dashes onder welke voorwaarde dan ook"). | geen |
| 3 | "De tekst die je nu leest is zo ontstaan: AI hielp structureren, ik bepaalde de toon." | EIGEN CLAIM | Niet te toetsen. | John bevestigen. |

## 032_ai-specialist-kempen-brabant.md
Publicatiedatum 2026-02-02. Geen infographic. 6 beweringen gecontroleerd.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Concrete voorbeelden uit de regio: Een restaurant met een chatbot die reserveringen aanneemt" | EIGEN CLAIM | `00-future-content/website/fc-rebrand/docs/REVIEW-open-secties.md` r.18 noemt het een "restaurant-chatbot (demo)". Er is in 00-future-content geen restaurantklant in de regio gevonden die hem draait. De kop "uit de regio" suggereert een echte lokale zaak. | "Voorbeelden van wat ik bouw: een chatbot voor een restaurant die in het gesprek meteen een tafel reserveert." (of John bevestigt een echte regionale klant) |
| 2 | "Een lokaal evenement zoals Köningsdag in Reusel met een eigen ticketsysteem dat de drukte aankan." | EIGEN CLAIM | Case-pagina `app/cases/ticketsysteem-koningsdag/page.tsx` en interview (`docs/REVIEW-interview-uitkomsten.md` r.187-193) bevestigen het ticketsysteem met Mollie. Tijdlijn: het systeem was voor Koningsdag 27 april 2026 en de verkoop sloot 23 april 2026 (`03-klanten/koningsdag-reusel/README.md` r.7, r.21). Op de publicatiedatum (2-2-2026) had het zich dus nog niet bewezen; "dat de drukte aankan" is bovendien nooit gemeten. | "Köningsdag in Reusel, met een eigen ticketsysteem waarin bezoekers vooraf hun ticket kochten en meteen betaalden." |
| 3 | "Een ondernemer met een eigen bedrijfssysteem voor uren, facturen en BTW" | EIGEN CLAIM | Het OS (os.future-content.nl) doet uren, facturen en btw; dit is John's eigen systeem, geen klant uit de regio. Onder de kop "uit de regio" leest het als een klantvoorbeeld. | "Mijn eigen bedrijfssysteem voor uren, facturen en BTW, zodat de administratie geen avonden meer kost." |
| 4 | "Een bedrijf dat klantvragen automatisch laat sorteren en voorbereiden" | EIGEN CLAIM | Niet bevestigd als gebouwd regionaal voorbeeld binnen 00-future-content (de "smart mailbox" staat in het interview als aanbod, niet als opgeleverd project). | John bevestigen, of formuleren als mogelijkheid: "Een bedrijf kan klantvragen automatisch laten sorteren en voorbereiden." |
| 5 | "Een ondernemer in Bladel, Reusel of Veldhoven" (onder kop over de Kempen) | KLOPT | Veldhoven hoort niet bij de vijf Kempengemeenten (Bergeijk, Bladel, Eersel, Oirschot, Reusel-De Mierden), wel bij het historische Kempenland. https://organisaties.overheid.nl/27965426/Samenwerking_Kempengemeenten (geraadpleegd 7-10-2026) | Optioneel: "Een ondernemer in Bladel, Reusel of Eersel" |
| 6 | "En ik woon om de hoek." / "iemand die om de hoek woont" | KLOPT | John woont in Bladel (Kempengemeente). | geen |

## 033_claude-sonnet-5-uit.md
Publicatiedatum 2026-02-09. Geen infographic. 6 beweringen gecontroleerd. **Kernprobleem: op de publicatiedatum bestond Claude Sonnet 5 nog niet.**

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | Titel en intro: "Claude Sonnet 5 is uit" (gepubliceerd 9 februari 2026) | ONJUIST | Sonnet 5 kwam uit op 30 juni 2026. https://www.anthropic.com/news/claude-sonnet-5 (30-6-2026); https://news.smol.ai/issues/26-06-30-sonnet5 (30-6-2026). Op 9 februari was Sonnet 4.5 de nieuwste Sonnet; Sonnet 4.6 volgde op 17 februari 2026 (https://www.anthropic.com/news/claude-sonnet-4-6). | Publicatiedatum verzetten naar 30 juni 2026 of later. Wil je de februari-datum houden, dan de blog ombouwen naar Sonnet 4.6 en dateren op 17 februari 2026 of later: "Claude Sonnet 4.6 is uit: sneller en slimmer, wat merk jij?" |
| 2 | "Ik gebruik Sonnet zelf veel voor het bouwen van oplossingen voor klanten. Het verschil dat ik merk is ... minder herhalen, nettere eerste versies" | ONJUIST | Ook een eigen claim. Een ervaring met Sonnet 5 kan op 9-2-2026 niet bestaan. Dat John Sonnet gebruikt klopt wel (de quickscan draait op Sonnet, `SCAN-ARCHITECTUUR.md` r.19). | Na verdatering: John bevestigen dat hij het verschil zelf heeft gemerkt. |
| 3 | "Sonnet is het middenmodel van Claude: een balans tussen snelheid en slimheid." | KLOPT | Anthropic positioneert Sonnet tussen Haiku en Opus. https://www.anthropic.com/news/claude-sonnet-5 | geen |
| 4 | "De nieuwe versie is merkbaar sneller en gaat beter om met langere en ingewikkeldere taken." | KLOPT (voor Sonnet 5, niet op 9-2) | Anthropic: Sonnet 5 rondt complexe taken af "where previous Sonnet models would stop short"; 1M-tokens context. https://www.anthropic.com/news/claude-sonnet-5 (30-6-2026). "Sneller" heb ik niet als officiële claim teruggevonden. | "De nieuwe versie gaat beter om met langere en ingewikkeldere taken." |
| 5 | "Gunstiger prijs-prestatie: je krijgt meer waarde voor hetzelfde" | KLOPT (voor Sonnet 5, na verdatering) | Bij lancering $3/$15 per miljoen tokens (gelijk aan 4.6) met introductieprijs $2/$10; sinds 10-8-2026 vast $2/$10. https://www.anthropic.com/news/claude-sonnet-5 ; https://news.smol.ai/issues/26-06-30-sonnet5 | Bij datum na 10 augustus 2026 kan het scherper: "en via de API is hij ook goedkoper geworden." |
| 6 | "Als je al met Claude werkt, profiteer je vaak automatisch van de nieuwe versie. Je hoeft niets te installeren of om te bouwen." | KLOPT (deels) | In claude.ai werd Sonnet 5 het standaardmodel voor Free en Pro (https://www.anthropic.com/news/claude-sonnet-5). Wie via de API of een eigen koppeling werkt, moet de model-ID zelf aanpassen. | "Werk je in de Claude-app, dan krijg je de nieuwe versie vanzelf. Draait er een eigen koppeling op de API, dan moet die worden omgezet naar het nieuwe model." |

## 034_multi-llm-werken.md
Publicatiedatum 2026-02-16. Geen infographic. 4 beweringen gecontroleerd; geen getallen of versienummers in de tekst.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Gemini: handig als je in Google werkt en informatie uit je eigen mail of documenten wil halen." | KLOPT | Gemini zit sinds januari 2025 in alle Workspace Business- en Enterprise-abonnementen, in Gmail, Docs, Sheets en Drive. https://9to5google.com/2025/01/15/google-workspace-price-increase-2025/ (15-1-2025) | geen |
| 2 | "Claude: sterk in lange teksten, code en redeneren. Mijn keuze voor schrijfwerk en bouwen." | KLOPT | Anthropic positioneert Claude op code en agentisch werk (https://www.anthropic.com/news/claude-sonnet-4-6, 17-2-2026). "Mijn keuze" is John's eigen voorkeur; de quickscan draait op Claude (`SCAN-ARCHITECTUUR.md`). | geen |
| 3 | "ChatGPT: snel, breed inzetbaar, goed voor brainstormen en eerste opzetten." | KLOPT | Algemene karakterisering, geen toetsbare claim. | geen |
| 4 | "Ik denk niet in welk abonnement heb ik, ik denk in welke taak heb ik." | EIGEN CLAIM | Werkwijze van John. | geen |

## 035_gemini-3-1-google-workspace-kantoor.md
Publicatiedatum 2026-02-23. Geen infographic. 8 beweringen gecontroleerd.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "de tien minuten die je per dag bespaart op mails ... Tel dat op over een week en je hebt een halve middag terug." | ONJUIST | Rekensom: 10 minuten x 5 werkdagen = 50 minuten, geen halve middag. Het getal "tien minuten" heeft bovendien geen bron. | "Niet de spectaculaire demo's, maar de minuten die je elke dag bespaart op mails die je toch al moest beantwoorden. Over een week tikt dat aan." (of: "een half uur per dag ... en je hebt een halve middag terug", alleen als John dat zelf gemeten heeft) |
| 2 | "dan staat de nieuwste AI van Google sinds kort gewoon in je Gmail en Docs" | ONJUIST | Gemini zit al sinds 2024 in Gmail en Docs, en sinds januari 2025 zonder losse add-on in de Business- en Enterprise-abonnementen. Dat is niet "sinds kort". https://9to5google.com/2025/01/15/google-workspace-price-increase-2025/ (15-1-2025) | "Als je kantoor al draait op Google Workspace, dan zit Gemini gewoon in je Gmail en Docs, en die assistent krijgt steeds nieuwere modellen." |
| 3 | "het de saaie eerste 80 procent doet en jij de laatste 20 procent verfijnt" | GEEN BRON | Vuistregel, geen meting. Leest als een feit door het percentage. | "omdat het de saaie eerste versie maakt en jij die verfijnt." |
| 4 | Titel/excerpt: "Gemini 3.1 en Google Workspace" / "Google bouwt zijn nieuwste model rechtstreeks in Gmail en Docs" | NIET KUNNEN VERIFIËREN | Gemini 3.1 Pro kwam op 19-2-2026 uit via de Gemini-app, NotebookLM, AI Studio, Vertex AI en Gemini Enterprise. De aankondiging noemt Gmail en Docs niet. https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/ (19-2-2026). Geen bron gevonden dat 3.1 op 23-2 in de zijpanelen van Gmail en Docs draaide. | "Google heeft Gemini 3.1 uitgebracht, en Gemini zit al in Gmail en Docs. Voor MKB-kantoren die met Workspace werken kan dat schelen, mits je weet wat het wel en niet doet." |
| 5 | "Geen extra abonnement bij een losse tool, geen nieuwe inlog." | KLOPT | Google stopte op 31-1-2025 met de losse Gemini-add-on; Gemini zit in de Workspace-abonnementen, wel tegen een hogere prijs (Business Standard van $12 naar $14 per gebruiker per maand). https://9to5google.com/2025/01/15/google-workspace-price-increase-2025/ | Eventueel toevoegen: "Het zit in je Workspace-abonnement, dat daarvoor wel iets duurder werd." |
| 6 | "In Gmail kan het een lange mailthread samenvatten of een concept-antwoord opstellen." | KLOPT | Gemini in Gmail: samenvatten en "Help me write". https://www.techradar.com/pro/you-cant-escape-it-now-gemini-is-officially-part-of-gmail-google-drive-docs-sheets-and-slides | geen |
| 7 | "In Docs schrijft het een eerste opzet, herschrijft het een alinea korter of haalt het de actiepunten uit een vergaderverslag." | KLOPT | Zelfde bron; Gemini in Docs ondersteunt opstellen, herschrijven en samenvatten. | geen |
| 8 | "Doe de gratis AI-quickscan op future-content.nl, dan kijk ik mee naar drie concrete kansen." | KLOPT | Quickscan eindigt met exact drie kansen (`website/fc-rebrand/SCAN-ARCHITECTUUR.md` r.8, r.19). | geen |

## 036_5-ai-fouten-die-je-bedrijf-geld-kosten.md
Publicatiedatum 2026-03-02. Geen infographic. 3 beweringen gecontroleerd; geen getallen of bronverwijzingen.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Dat overkwam mij ook, tot ik vier tools verving door een eigen systeem." | EIGEN CLAIM | De claim "verving vier abonnementen" staat consequent op de site (`lib/constants.ts` r.271, 331, 745) en in LinkedIn-posts, maar nergens in 00-future-content staat wélke vier. Tijdlijn: in `aios-os-plan/FUNDAMENT-EN-BOUWPLAN.md` (24-6-2026) was de factuurmodule nog "preview-only, klant hardcoded Pit Makelaars, geen PDF". Op 2-3-2026 is het systeem als vervanger van vier tools dus twijfelachtig. | John laten bevestigen welke vier abonnementen en sinds wanneer. Twijfel over de datum: "Dat overkwam mij ook. Inmiddels heb ik een eigen systeem gebouwd dat vier van die tools vervangt." en de blog later dateren. |
| 2 | "Veel basistaken kunnen prima met een gratis of goedkoop model." | KLOPT | ChatGPT, Claude en Gemini hebben gratis lagen; Claude Sonnet 4.6 werd op 17-2-2026 het standaardmodel op het gratis plan (https://www.anthropic.com/news/claude-sonnet-4-6). | geen |
| 3 | "Een dure enterprise-licentie heeft alleen zin als je de extra functies echt gebruikt." | KLOPT | Algemeen advies, niet tegenstrijdig met prijsopbouw van de grote aanbieders. | geen |

## 037_gpt-5-4-getest-voor-ondernemers.md
Publicatiedatum 2026-03-09. Geen infographic. 7 beweringen gecontroleerd.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Daarom heb ik GPT-5.4 een week lang op echt werk losgelaten." | ONJUIST | GPT-5.4 kwam uit op 5 maart 2026; tussen release en publicatie (9 maart) zitten vier dagen, geen week. https://en.wikipedia.org/wiki/GPT-5.4 (geraadpleegd 7-10-2026) | "Daarom heb ik GPT-5.4 de eerste dagen na de release op echt werk losgelaten." (of publicatiedatum naar 12 maart 2026 of later zetten) |
| 2 | Titel: "GPT-5.4 getest" en het bestaan van GPT-5.4 op 9-3-2026 | KLOPT | Release 5 maart 2026 als GPT-5.4 Thinking en GPT-5.4 Pro. https://en.wikipedia.org/wiki/GPT-5.4 | geen |
| 3 | "Elke paar maanden komt er een nieuwe versie van GPT" | KLOPT | GPT-5 (aug 2025), 5.1 (nov 2025), 5.2 (dec 2025), 5.4 (5-3-2026). https://en.wikipedia.org/wiki/GPT-5.4 | geen |
| 4 | "Het model dwaalt minder af bij langere opdrachten en houdt instructies beter vast." | KLOPT (deels) | OpenAI meldt 33% minder feitelijke fouten dan GPT-5.2 en betere prestaties op professioneel werk; ZDNET noemde juist "occasional prompt-following issues". https://en.wikipedia.org/wiki/GPT-5.4 | Als eigen ervaring laten staan, maar formuleren als ervaring: "In mijn test dwaalde het model minder af ..." |
| 5 | "Ook het verwerken van langere documenten gaat beter." | KLOPT | GPT-5.4 kwam op 5-3-2026 uit met een contextvenster van ruim 1 miljoen tokens (API). https://alternativeto.net/news/2026/3/openai-launches-gpt-5-4-with-pro-and-thinking-versions-1m-token-context-and-tool-search (maart 2026) | geen |
| 6 | "Het verzint nog steeds soms bronnen of details die mooi klinken maar niet bestaan." | KLOPT | Minder fouten (33% ten opzichte van 5.2), niet nul. https://en.wikipedia.org/wiki/GPT-5.4 | geen |
| 7 | Impliciet: lezers kunnen GPT-5.4 gebruiken | KLOPT (met kanttekening) | Op 9-3-2026 alleen voor betaalde ChatGPT-abonnementen; GPT-5.4 mini kwam pas op 17-3-2026 voor gratis gebruikers. https://en.wikipedia.org/wiki/GPT-5.4 | Toevoegen: "GPT-5.4 zit (nog) alleen in de betaalde ChatGPT-abonnementen." |

## 038_wat-kun-je-echt-bouwen-met-ai-6-voorbeelden.md
Publicatiedatum 2026-03-16. Geen infographic. 11 beweringen gecontroleerd. **Kernprobleem: de blog beschrijft op 16 maart een evenement van 27 april als al gebeurd.**

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Het draaide live tijdens het evenement zelf, onder echte druk." | ONJUIST | Het ticketsysteem was voor het Vorstelijk Verwenfestijn op Koningsdag 27 april 2026, dus ná de publicatiedatum. Bovendien sloot de verkoop hard op 23 april 2026 15:00; het systeem draaide niet tijdens het evenement. `03-klanten/koningsdag-reusel/README.md` r.7 en r.21. | "De verkoop liep tot een paar dagen voor het evenement en het systeem leverde daarna de lijst voor de catering." én publicatiedatum naar mei 2026 of later. |
| 2 | "Voor Köningsdag in Reusel bouwde ik een ticketsysteem met online betaling." | EIGEN CLAIM (tijdlijn) | Klopt inhoudelijk: PHP-ticketsysteem met Mollie-betaling, live URL (`03-klanten/koningsdag-reusel/README.md` r.5-9). Of het op 16-3-2026 al klaar was, staat niet in het dossier. | John bevestigen wanneer het live ging; anders publicatiedatum na 27 april 2026. |
| 3 | "Bezoekers konden vooraf betalen en kregen een geldig ticket." | EIGEN CLAIM | Vooraf betalen via Mollie klopt (README r.7). De case-pagina spreekt van "een bevestiging", niet van een ticket. Niet gecontroleerd in de code of er een ticket (bijv. QR) werd verstuurd. | "Bezoekers betaalden vooraf via iDEAL en kregen direct een bevestiging." |
| 4 | "Geen kassarij met los geld, geen handmatig bijhouden." | EIGEN CLAIM | Consistent met interview (`docs/REVIEW-interview-uitkomsten.md` r.191-193: Excel-lijst naar broodjesleverancier na sluiting). | geen |
| 5 | "Op future-content.nl staat een AI-quickscan ... benoemt drie concrete AI-kansen" | EIGEN CLAIM | Werking klopt: exact 3 kansen (`website/fc-rebrand/SCAN-ARCHITECTUUR.md` r.8, r.19). Vroegste bewijs dat hij live stond: interview 27-5-2026 ("AI-Quickscan, live op site"); de scan-code staat pas vanaf 22-6-2026 in git. Op 16-3-2026 niet aantoonbaar. | John bevestigen dat de scan in maart al live stond; anders publicatiedatum verzetten. |
| 6 | "Ik heb een eigen systeem gebouwd dat mijn uren bijhoudt, facturen maakt, de BTW klaarzet en leads beheert." | EIGEN CLAIM (tijdlijn twijfelachtig) | Het OS doet dit nu wel (os.future-content.nl). Maar op 24-6-2026 was de factuurmodule nog "preview-only, klant hardcoded Pit Makelaars, geen PDF" (`aios-os-plan/FUNDAMENT-EN-BOUWPLAN.md` r.83). In maart 2026 maakte het dus vrijwel zeker nog geen facturen. | John bevestigen; anders publicatiedatum na juli 2026. |
| 7 | "Daarvoor betaalde ik vier losse abonnementen. Die heb ik allemaal opgezegd." | EIGEN CLAIM | Claim staat consequent op de site (`lib/constants.ts` r.271, 331, 745), maar nergens staat welke vier. | John laten bevestigen welke vier. |
| 8 | "Voor de horeca bouwde ik een chatbot die ... meteen een tafel reserveert ... en het staat geboekt." | EIGEN CLAIM | Intern omschreven als "restaurant-chatbot (demo)" (`docs/REVIEW-open-secties.md` r.18). Geen echte horecaklant gevonden in 00-future-content. "Bouwde ik voor de horeca" suggereert een klant. | "Als demo voor de horeca bouwde ik een chatbot die ..." |
| 9 | "Een van de leukste dingen die ik bouwde is een voice-orchestrator ... het draait gewoon op mijn eigen opzet." | VEROUDERD | Bestond (`aios-os-plan/FUNDAMENT-EN-BOUWPLAN.md` r.86). Volgens John's werkregels (pattern 63 in de portfolio-CLAUDE.md) is de voice-orchestrator in mei 2026 doodgegaan; "het draait" klopt nu niet meer. Op 16-3-2026 niet te toetsen. | "Een van de leukste experimenten was een voice-orchestrator: ik praatte hardop met de AI terwijl achtergrond-agenten onderzoek deden." |
| 10 | "CafeRadar is een Android-app die laat zien hoe druk het is in cafes." | EIGEN CLAIM | Interview 27-5-2026: "eigen Android-app ... waar het te doen is in de kroegen. Volledig werkend op Android." (`docs/REVIEW-interview-uitkomsten.md` r.165). Schrijfwijze: elders "Caferadar". | geen, wel naam gelijktrekken met de rest van de site. |
| 11 | "Zes dingen die ik zelf met AI heb gebouwd" | EIGEN CLAIM | Zie hierboven; minstens één (chatbot) is een demo en één (Köningsdag) lag op de publicatiedatum nog in de toekomst. | geen |

## 039_ai-en-avg-waar-moet-mkb-op-letten.md
Publicatiedatum 2026-03-23. Geen infographic. 6 beweringen gecontroleerd. Geen fouten gevonden.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Als een externe partij persoonsgegevens voor jou verwerkt, hoort daar onder de AVG een verwerkersovereenkomst bij." | KLOPT | Art. 28 lid 3 AVG: verwerking door een verwerker wordt geregeld in een overeenkomst of andere rechtshandeling. https://eur-lex.europa.eu/eli/reg/2016/679/oj ; https://www.autoriteitpersoonsgegevens.nl/themas/basis-avg/avg-algemeen/verwerkersovereenkomst | geen |
| 2 | "Veel zakelijke AI-leveranciers bieden er een aan." | KLOPT | OpenAI, Anthropic (Commercial Terms) en Google Workspace bieden een Data Processing Addendum voor zakelijke klanten. https://openai.com/enterprise-privacy/ (pagina gaf 403 bij ophalen, bekend beleid); https://bitdefender.com/en-us/blog/hotforsecurity/anthropic-shifts-privacy-stance-lets-users-share-data-for-ai-training | geen |
| 3 | "De meeste serieuze zakelijke tools bieden een instelling of een variant waarbij jouw data niet wordt gebruikt voor training." | KLOPT | Anthropic: Claude for Work en API vallen buiten training; ChatGPT Business/Enterprise en API standaard geen training. Zelfde bronnen, (aug-sep 2025). | geen |
| 4 | "Bij de gratis consumentenversies is dat lang niet altijd het geval." | KLOPT | Claude Free/Pro/Max: sinds 28-9-2025 training als de gebruiker daarmee instemt, bewaartermijn tot vijf jaar; ChatGPT consument traint standaard tenzij je het uitzet. https://bitdefender.com/en-us/blog/hotforsecurity/anthropic-shifts-privacy-stance-lets-users-share-data-for-ai-training | geen |
| 5 | "Kies waar mogelijk een zakelijke variant met een verwerkersovereenkomst." | KLOPT | Volgt uit art. 28 AVG. | geen |
| 6 | "Houd bij welke tools je gebruikt, zodat je weet waar welke data staat." | KLOPT | Sluit aan op het register van verwerkingen (art. 30 AVG). Kleine bedrijven (<250 medewerkers) zijn daar deels van vrijgesteld, maar niet bij structurele verwerking van persoonsgegevens. https://eur-lex.europa.eu/eli/reg/2016/679/oj | geen |

## 040_beste-ai-tools-voor-zzp-en-kleine-teams.md
Publicatiedatum 2026-03-30. Geen infographic. 4 beweringen gecontroleerd; de blog noemt bewust geen merken of prijzen.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Ik ben zo ver gegaan dat ik mijn eigen systeem heb gebouwd dat uren, facturen en BTW automatiseert, waarmee ik vier abonnementen kon opzeggen." | EIGEN CLAIM (tijdlijn twijfelachtig) | Zelfde punt als 036 en 038: op 24-6-2026 was de factuurmodule nog "preview-only, klant hardcoded Pit Makelaars, geen PDF" (`aios-os-plan/FUNDAMENT-EN-BOUWPLAN.md` r.83). Welke vier abonnementen staat nergens. | John bevestigen; anders publicatiedatum na juli 2026. |
| 2 | "Een enkel abonnement op een van de grote modellen dekt het meeste af." | KLOPT | ChatGPT Plus, Claude Pro en Google AI Pro bieden elk tekst, samenvatten, bestanden en zoeken in één abonnement. Algemene uitspraak. | geen |
| 3 | "Voor social media plannen bestaan goedkope tools die posten automatiseren." | KLOPT | Bijvoorbeeld Buffer en Later hebben gratis of goedkope lagen. https://buffer.com/pricing | geen |
| 4 | "Voor beeld kun je AI gebruiken om concepten te maken, maar check altijd de rechten." | KLOPT | Terecht voorbehoud; auteursrecht op AI-beeld en licentievoorwaarden verschillen per tool. | geen |

## Samenvatting

58 beweringen gecontroleerd in 10 blogs. Geen van de tien blogs heeft een infographic.

| Oordeel | Aantal |
|---|---|
| KLOPT | 32 |
| ONJUIST | 6 |
| VEROUDERD | 1 |
| GEEN BRON | 1 |
| EIGEN CLAIM | 17 |
| NIET KUNNEN VERIFIËREN | 1 |

### De 3 ernstigste problemen

1. **033: "Claude Sonnet 5 is uit" staat op 9 februari 2026, maar Sonnet 5 kwam uit op 30 juni 2026** (https://www.anthropic.com/news/claude-sonnet-5). Op 9 februari was zelfs Sonnet 4.6 er nog niet (17-2-2026). De hele blog plus John's eigen gebruikservaring ermee is daardoor op die datum onmogelijk. Oplossing: verdateren naar 30 juni 2026 of later, of de blog ombouwen naar Sonnet 4.6 met datum vanaf 17 februari 2026.
2. **038 (en 032): het Köningsdag-ticketsysteem wordt beschreven alsof het al gedraaid had, vóór het evenement.** De blog van 16 maart zegt "Het draaide live tijdens het evenement zelf, onder echte druk", maar Koningsdag was op 27 april 2026 en de verkoop sloot op 23 april 2026 (`03-klanten/koningsdag-reusel/README.md`). Het systeem draaide dus ook niet tijdens het evenement. Hetzelfde tijdlijnprobleem speelt breder: blogs uit januari t/m maart 2026 noemen de quickscan (vroegste bewijs live: 27-5-2026) en een eigen systeem dat facturen maakt (factuurmodule op 24-6-2026 nog preview-only) als bestaand. Laat John de tijdlijn bevestigen of verzet de data van 036, 038 en 040.
3. **035: rekenfout en onjuiste "sinds kort".** "Tien minuten per dag ... over een week een halve middag" is 50 minuten. En Gemini zit al sinds 2024 in Gmail en Docs; dat Gemini 3.1 op 23 februari in Gmail en Docs draaide is niet terug te vinden (de aankondiging van 19-2-2026 noemt alleen de Gemini-app, NotebookLM, AI Studio, Vertex AI en Gemini Enterprise).

Ook het noemen waard: 037 zegt GPT-5.4 "een week lang" te hebben getest, terwijl tussen release (5-3-2026) en publicatie (9-3-2026) vier dagen zitten.

Bijvangst buiten de blogs: de case-pagina `app/cases/ticketsysteem-koningsdag/page.tsx` zegt dat het systeem "de verkoop op de dag zelf" verwerkte. Volgens het klantdossier sloot de verkoop op 23 april, dus ook die tekst verdient een check.
