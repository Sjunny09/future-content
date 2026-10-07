# Factcheck blogs 051 t/m 060

Gecontroleerd op 7 oktober 2026. Geen van deze tien blogs heeft een `[infographic: ...]`-regel, dus Infographic.tsx is voor deze batch niet van toepassing.

## 051_claude-of-chatgpt-welke-ai-kies-je.md
Publicatiedatum 16-06-2026. Gecontroleerde beweringen: 6.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Anthropic's sterkste modellen heten op dit moment Opus 4.8 en Fable 5, met Haiku 4.5 als de snelle, goedkope variant voor simpele klusjes." | VEROUDERD | Huidige line-up: https://platform.claude.com/docs/en/models/overview (geraadpleegd 07-10-2026): Fable 5.1, Opus 5.5, Sonnet 5.5, Haiku 4.5; Fable 5 en Opus 4.8 staan nu onder "Legacy". Opus 4.8 uitgebracht 28-05-2026: https://technews.tw/2026/05/29/anthropic-introduces-claude-opus-4-8/. Fable 5 gelanceerd rond 10-06-2026 en op 12-06-2026 wereldwijd offline gehaald na een Amerikaanse exportrichtlijn, terug vanaf 01-07-2026: https://appwrite.io/blog/post/claude-fable-5-and-mythos-5-access-suspended en https://www.atcyrus.com/stories/when-is-fable-coming-back | Op 16 juni klopten de namen, maar Fable 5 was op dat moment voor niemand bruikbaar (offline sinds 12 juni). Nu achterhaald. Voorstel: "Anthropic's sterkste modellen heten op dit moment Fable 5.1 en Opus 5.5, met Sonnet 5.5 als snelle allrounder en Haiku 4.5 als goedkope variant voor simpele klusjes." Tijdlozer alternatief: "Anthropic brengt meerdere modellen uit: een zwaar model voor complex werk en een snelle, goedkope variant voor simpele klusjes." Let op: Haiku 4.5 heeft retirement "not sooner than 15-10-2026", dus ook die naam kan binnenkort verschuiven. |
| 2 | "Bij Claude begint een instapabonnement bijvoorbeeld rond de 20 dollar per maand." | KLOPT | https://claude.com/pricing (07-10-2026): Pro $20 p/m maandelijks, $17 p/m bij jaarbetaling, excl. btw | Optioneel: "rond de 20 dollar per maand, exclusief btw". |
| 3 | "Wil je de zwaarste versie met meer ruimte en snelheid, dan zit je richting de 200 dollar per maand." | KLOPT | https://claude.com/pricing (07-10-2026): Max 5x $100, Max 20x $200; bevestigd in https://suprmind.ai/hub/claude/pricing/claude-max-pricing/ | Geen wijziging nodig. Eventueel: "tussen de 100 en 200 dollar per maand". |
| 4 | "ChatGPT en Gemini kennen een vergelijkbare opbouw: een gratis of goedkope laag voor de meeste dagelijkse taken, en een duurdere laag" | KLOPT | ChatGPT: Free, Go $8, Plus $20, Pro $100/$200 (https://www.cometapi.com/chatgpt-pricing-2026-free-vs-go-vs-plus-vs-pro/, 2026). Google: Free, AI Plus ca. $7,99, AI Pro $19,99, AI Ultra $99,99/$199,99 sinds Google I/O 19-05-2026 (https://engadget.com/2176060/the-google-ai-ultra-plan-now-starts-at-100-a-month) | Geen wijziging nodig. |
| 5 | "Gemini, van Google, ... Het zit er steeds directer in ingebouwd [Gmail, Docs en Drive]" | KLOPT | https://workspaceupdates.googleblog.com/2025/01/expanding-google-ai-to-more-of-google-workspace.html (januari 2025): Gemini standaard in Workspace Business- en Enterprise-abonnementen, in Gmail, Docs, Drive, Sheets, Meet | Geen wijziging nodig. |
| 6 | "Ook bij beeld, video en audio is Gemini sterk." | NIET KUNNEN VERIFIËREN | Vergelijkende kwaliteitsclaim, niet objectief meetbaar | Laten staan als mening, of concreter: "Google heeft ook eigen modellen voor beeld en video, zoals Veo." (dan wel even checken welke versie actueel is). |

## 052_wat-is-een-ai-agent-en-wat-levert-het-op.md
Publicatiedatum 19-06-2026. Gecontroleerde beweringen: 4.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Dat kost al snel een uur, soms meer." (tijd voor een offerte) | GEEN BRON | Geen meting of onderzoek gevonden; komt ook terug in blog 057 ("een uur tot anderhalf uur") | "Dat kost al snel een flink deel van je avond." of John's eigen gemeten tijd noemen: "Bij mij kostte dat ongeveer een uur." |
| 2 | "Ik heb daarvoor zelf ... een agent gebouwd die offertes maakt: hij stelt een paar korte vragen over de klant, het project en de uren, en zet daarna zelf de offerte netjes klaar in de juiste opmaak." | EIGEN CLAIM | Deels ondersteund: in `00-future-content/os/scripts/` staan `maak-offerte-kl16.ts`, `maak-overeenkomst.ts` en `archiveer-getekende-offertes.ts`, en de skill `klant-pdf` maakt offertes. Of het werkt zoals beschreven (een paar korte vragen, dan klaar) is niet vastgesteld | John bevestigen. Klopt het niet letterlijk: "Ik heb daarvoor zelf een offerte-flow gebouwd die mijn gegevens en tarieven ophaalt en de offerte in de juiste opmaak klaarzet." |
| 3 | "Van een uur naar een paar minuten, en de opmaak klopt elke keer." | EIGEN CLAIM | Geen meting gevonden in `00-future-content/` | Alleen laten staan als John dit zelf zo ervaart; anders "Van een uur naar een kwartier controleren" of het getal schrappen. |
| 4 | "Ik bouw dit soort agents zelf, en ik beheer ze ook zelf" | EIGEN CLAIM | Consistent met de werkwijze op de eigen site (`lib/constants.ts`, METHOD_STEPS stap 04: "dan bouw ik het én houd ik het draaiend") | Geen wijziging nodig, mits John het bevestigt. |

## 053_is-mijn-klantdata-veilig-bij-ai.md
Publicatiedatum 23-06-2026. Gecontroleerde beweringen: 5.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Een stemopname zelf is een verwerking van biometrische gegevens, en onder de AVG valt dat in een strengere categorie dan een gewoon tekstbestand of e-mailadres." | ONJUIST | AVG art. 4 lid 14 en art. 9 lid 1 (https://eur-lex.europa.eu/eli/reg/2016/679/oj): een stem is pas een biometrisch gegeven als hij via een specifieke technische verwerking wordt gebruikt om iemand uniek te identificeren, en valt pas dan onder de bijzondere categorie van art. 9. EDPB Guidelines 02/2021 over spraakassistenten (v2.0, 07-07-2021, https://www.edpb.europa.eu/system/files/2021-03/edpb_guidelines_022021_virtual_voice_assistants_adopted-public-consultation_en.pdf): pas "using voice data to identify the user" is biometrische verwerking | "Een stemopname is een persoonsgegeven, net als een naam of e-mailadres, maar wel een gevoelig soort: er zit vaak meer in dan je denkt, zoals gezondheid, emotie of vertrouwelijke afspraken. Gebruik je de stem om iemand te herkennen, dan gaat het om biometrische gegevens en gelden onder de AVG nog strengere regels." |
| 2 | "Zet de instelling uit die jouw gegevens gebruikt om het model verder te trainen" | KLOPT | https://www.anthropic.com/news/updates-to-our-consumer-terms (28-08-2025): bij Claude Free, Pro en Max is training een instelling die je zelf kiest; zakelijke voorwaarden (Team, Enterprise, API) vallen erbuiten. ChatGPT en Gemini hebben een vergelijkbare instelling voor consumentenaccounts | Geen wijziging nodig. |
| 3 | "Kies een tool met een verwerkersovereenkomst, niet alleen een gratis consumentenversie" | KLOPT | Zelfde bron: consumentenabonnementen (ook betaalde, zoals Claude Pro) vallen onder consumentenvoorwaarden; een verwerkersovereenkomst hoort bij de zakelijke abonnementen (art. 28 AVG) | Scherper: "Kies een zakelijk abonnement met een verwerkersovereenkomst. Ook een betaald persoonlijk abonnement valt meestal onder consumentenvoorwaarden." |
| 4 | "Jij bent verantwoordelijk voor de gegevens van je klanten, ook als je ze in een AI-tool plakt" | KLOPT | AVG art. 24 en 28 (https://eur-lex.europa.eu/eli/reg/2016/679/oj): de ondernemer blijft verwerkingsverantwoordelijke, de AI-aanbieder is verwerker | Geen wijziging nodig. |
| 5 | "Ik hoor ook weleens dezelfde oplossing voorbijkomen: een bedrijf koopt een aparte laptop voor het AI-werk" | EIGEN CLAIM | Niet te controleren | John bevestigen. |

## 054_wat-ai-niet-kan-en-waarom-dat-goed-is.md
Publicatiedatum 26-06-2026. Gecontroleerde beweringen: 3.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Of je nu met Opus 4.8 werkt of met Fable 5: sneller en preciezer, zeker, maar het ziet nog steeds niet wat jij niet opschrijft." | VEROUDERD | https://platform.claude.com/docs/en/models/overview (07-10-2026): actueel zijn Fable 5.1 en Opus 5.5; Opus 4.8 en Fable 5 zijn legacy. Op de publicatiedatum (26-06) was Fable 5 bovendien wereldwijd offline (12-06 tot 01-07-2026): https://appwrite.io/blog/post/claude-fable-5-and-mythos-5-access-suspended | Tijdloos maken: "Ook het nieuwste model verandert daar niets aan: sneller en preciezer, zeker, maar het ziet nog steeds niet wat jij niet opschrijft." Wil je toch namen: "Of je nu met Opus 5.5 werkt of met Fable 5.1". |
| 2 | "Ik liet een AI een contentstrategie uitwerken ... De AI bouwde een strategie die professioneel klopte, maar niet wie ik was." | EIGEN CLAIM | Niet gezocht buiten `00-future-content/`; daar niet aangetroffen | John bevestigen. |
| 3 | "Er bestaan tools die volledig automatisch blijven posten, dag in dag uit" | KLOPT | Algemeen bekend: planningstools met AI-generatie en automatische publicatie (bijvoorbeeld via de Meta- en LinkedIn-API's) | Geen wijziging nodig. |

## 055_ai-voor-vakmensen-werk-je-met-je-handen.md
Publicatiedatum 30-06-2026. Gecontroleerde beweringen: 3. Geen getallen, modellen, prijzen of wetgeving in deze blog.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Een vraag die ik daarom vaak hoor is kort en duidelijk: ik werk met mijn handen, dus ik haak hier nu echt af." en "ik repareer klassieke auto's, dat wordt lastig voor AI" | EIGEN CLAIM | Geciteerde reacties van ondernemers; bron niet aangetroffen in `00-future-content/` | John bevestigen dat dit echte reacties zijn (bijvoorbeeld uit LinkedIn-reacties of de scan). Zo niet: "Een reactie die ik me goed kan voorstellen" in plaats van "die ik vaak hoor". |
| 2 | "Monteur: een offerte voor een onderhoudsbeurt staat al klaar op basis van het kenteken en de vorige factuur." | KLOPT | Technisch haalbaar: RDW Open Data geeft voertuiggegevens op kenteken (https://opendata.rdw.nl, geraadpleegd 07-10-2026) | Geen wijziging nodig. |
| 3 | "Als [AI-specialist die langskomt bij je bedrijf] bouw en beheer ik de zaken eromheen" | EIGEN CLAIM | Consistent met de werkwijze op de eigen site (`lib/constants.ts`, METHOD_STEPS) | Geen wijziging nodig. |

## 056_iemand-die-ai-implementeert-bij-je-bedrijf-brabant.md
Publicatiedatum 03-07-2026. Gecontroleerde beweringen: 6.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "dezelfde stappen die ook op de pagina [werkwijze](/werkwijze) staan, in de volgorde waarin het bij mij ook echt gaat" met daarna Stap 3 "een offerte, en ik bouw het" en Stap 4 "ik beheer het ook" | ONJUIST | Eigen site, `fc-rebrand/lib/constants.ts` METHOD_STEPS, zo sinds commit abf9b09 van 02-07-2026 (dus al vóór publicatie): 01 Kennismaking, 02 Workshop op locatie, 03 "Vervolg, je tweede brein", 04 "Offerte, bouwen en beheren". De blog slaat de tweede-brein-stap over en splitst bouwen en beheren in twee stappen | Stap 3 vervangen door "Stap 3: je tweede brein. Na de workshop kiezen we samen de plannen die de meeste tijd opleveren, en leggen we de kennis over jouw bedrijf vast als basis waar alles op draait." en stap 4 laten heten "Stap 4: een offerte, ik bouw het en ik beheer het". Of de verwijzing schrappen: "Hier is het eerlijke antwoord, in de volgorde waarin het bij mij gaat." |
| 2 | "Het begint met bellen, appen, of me gewoon uitnodigen voor een bak koffie. ... Kost je niets" | KLOPT | Eigen site, `app/werkwijze/page.tsx`: "Een half uur, gratis." | Geen wijziging nodig. |
| 3 | "Aan het eind van die dag lever ik geen adviesrapport op papier, maar een werkend proof of concept, gebouwd op jullie eigen data." | KLOPT | Eigen site, METHOD_STEPS stap 02: "Aan het eind lever ik een werkend proof of concept op met jullie eigen data." | Geen wijziging nodig (John bevestigt dat dit in de praktijk ook in één dag lukt). |
| 4 | "Je vult je website in en krijgt binnen een paar minuten drie concrete AI-kansen voor je eigen bedrijf." | KLOPT | `fc-rebrand/SCAN-ARCHITECTUUR.md`: URL invullen, minimaal 30 s wachtscherm, 5 tot 8 adaptieve vragen plus e-mailadres, eindscherm met exact 3 kansen | Vollediger: "Je vult je website in, beantwoordt een paar korte vragen en krijgt binnen een paar minuten drie concrete AI-kansen voor je eigen bedrijf." |
| 5 | "Als AI-specialist met een lokale basis ken ik de bedrijven in deze regio" | EIGEN CLAIM | Niet te controleren | Voorzichtiger: "ken ik de regio en de manier van zakendoen hier". |
| 6 | "Ik blijf beheerder van wat ik bouw: updates, onderhoud, aanpassingen" | EIGEN CLAIM | Consistent met eigen site (`app/werkwijze/page.tsx`: "Jij gebruikt, ik beheer") | Geen wijziging nodig. |

## 057_ai-voor-offertes-sneller-offreren.md
Publicatiedatum 07-07-2026. Gecontroleerde beweringen: 6. Zoekactie naar onderzoek over offertetijd in het mkb leverde niets bruikbaars op (alleen uurtarief-onderzoek van Teamleader/MT Sprout), dus alle getallen hieronder zijn GEEN BRON.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | Titel: "AI voor je offertes: van een uur naar tien minuten" | GEEN BRON | Geen meting of onderzoek gevonden; blog 052 zegt over dezelfde offerte "van een uur naar een paar minuten", dus de twee blogs spreken elkaar ook licht tegen | "AI voor je offertes: van typen naar controleren" of, als John het zelf gemeten heeft, zijn eigen getal met "bij mij". |
| 2 | "Vraag een ondernemer hoe lang hij over een offerte doet en je krijgt bijna altijd hetzelfde antwoord: een half uurtje. Ga je het echt bijhouden, dan blijkt het een uur tot anderhalf uur te zijn." | GEEN BRON | Geen bron gevonden | "Vraag een ondernemer hoe lang hij over een offerte doet en hij zegt meestal: een half uurtje. Ga je het echt bijhouden, dan valt dat vaak flink hoger uit." |
| 3 | "En dat vijf tot tien keer per week." | GEEN BRON | Geen bron gevonden; sterk branche-afhankelijk | "En dat meerdere keren per week." |
| 4 | "In tijd is dat misschien tien procent van het werk. De andere negentig procent doe je elke keer opnieuw." | GEEN BRON | Geen bron; staat er wel met "misschien" als schatting | "In tijd is dat maar een klein deel van het werk. De rest doe je elke keer opnieuw." |
| 5 | "je voelt binnen twee weken of het scheelt" | GEEN BRON | Geen bron; aannemelijk als vuistregel | Laten staan als vuistregel of: "je merkt snel of het scheelt". |
| 6 | "Dat kan een custom instructie zijn, een template in je bestaande pakket, of een klein systeem dat aan je administratie hangt." | KLOPT | ChatGPT (custom instructions, Projects/GPTs), Claude (Projects met instructies) en Gemini (Gems) bieden dit allemaal | Geen wijziging nodig. |

## 058_mailbox-automatiseren-met-ai.md
Publicatiedatum 11-07-2026. Gecontroleerde beweringen: 3. Geen modellen, prijzen of wetgeving in deze blog.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "dan win je niet alleen die minuten maar ook de tijd die je kwijt bent om weer in je werk te komen. Dat is bij de meeste ondernemers een groter getal dan de mailtijd zelf" | GEEN BRON | Het mechanisme klopt: onderzoek van Gloria Mark (UC Irvine, CHI 2005 "No Task Left Behind?" en CHI 2008 "The Cost of Interrupted Work") laat zien dat terugkeren naar onderbroken werk gemiddeld ruim 23 minuten duurt, inclusief tussendoor ander werk (samenvatting: https://news.gallup.com/businessjournal/23146/too-many-interruptions-work.aspx). Dat het "bij de meeste ondernemers" groter is dan de mailtijd zelf, is niet gemeten | "dan win je niet alleen die minuten maar ook de tijd die je kwijt bent om weer in je werk te komen. Onderzoek van de Universiteit van Californië laat zien dat terugkeren naar onderbroken werk gemiddeld ruim twintig minuten duurt." |
| 2 | "Sorteren op wat het is ... daar is AI opvallend goed in." | KLOPT | Gmail en Outlook bieden ingebouwde AI-categorisering en samenvattingen van draden (Gemini in Gmail, Copilot in Outlook); zie https://workspaceupdates.googleblog.com/2025/01/expanding-google-ai-to-more-of-google-workspace.html | Geen wijziging nodig. |
| 3 | "Een AI die zelfstandig afspraken verzet of facturen doorzet, gaat een keer iets doen wat je niet had gewild." | NIET KUNNEN VERIFIËREN | Voorspelling/advies, niet toetsbaar | Laten staan als advies. |

## 059_ai-voor-je-administratie-bonnen-facturen-uren.md
Publicatiedatum 15-07-2026. Gecontroleerde beweringen: 4.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Een verkeerd geboekte uitgave vind je pas terug bij de btw-aangifte, en dan mag je drie maanden terugzoeken waar het misging." | KLOPT | https://www.belastingdienst.nl/wps/wcm/connect/nl/btw/content/wijziging-aangiftetijdvak-btw (geraadpleegd 07-10-2026): de meeste ondernemers doen per kwartaal aangifte; maand en jaar komen ook voor | Optioneel nauwkeuriger: "en bij een kwartaalaangifte mag je dan drie maanden terugzoeken". |
| 2 | "Een foto van een bon uitlezen: leverancier, bedrag, btw, datum, en de juiste kostenpost voorstellen" | KLOPT | Standaardfunctie in boekhoudpakketten (bijv. Moneybird, e-Boekhouden, Exact) en in John's eigen OS (`00-future-content/os/scripts/bon_verwerken.py`) | Geen wijziging nodig. |
| 3 | "Bankregels koppelen aan openstaande facturen, ook als het bedrag niet exact matcht" | KLOPT | Bestaat in boekhoudpakketten en in John's eigen OS (bankvoorstellen / koppel_bankregel) | Geen wijziging nodig. |
| 4 | "Een voorstel dat je met één klik bevestigt kost je vijf seconden" / "een klant waar je twintig gratis uren in hebt gestopt" | NIET KUNNEN VERIFIËREN | Illustratieve getallen, geen meting | Laten staan als voorbeeld; eventueel "een paar seconden". |

## 060_ai-training-voor-je-team-wat-moet-erin.md
Publicatiedatum 19-07-2026. Gecontroleerde beweringen: 4.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "In een team van tien zitten meestal drie groepen. Een paar mensen zijn al bezig ... De grootste groep heeft het één keer geprobeerd ... En er is bijna altijd iemand die er principieel niet aan wil." | GEEN BRON | Geen onderzoek gevonden dat deze verdeling onderbouwt | "In de meeste teams die ik zie, zitten drie groepen." (dan is het John's eigen waarneming) |
| 2 | "Bijna elk bedrijf dat ik spreek heeft inmiddels wel iemand op een AI-cursus gehad." | EIGEN CLAIM | Niet te controleren | John bevestigen, of "Veel bedrijven die ik spreek". |
| 3 | "Er zijn ook regelingen die scholing in het MKB ondersteunen." (met link naar SLIM-subsidie) | KLOPT | SLIM-regeling 2026: mkb-tijdvakken 07-04 t/m 04-05-2026 en 19-08 t/m 07-09-2026 (https://www.sra.nl/nieuws/004501/2026/08/slim-subsidie-mkb-vanaf-19-augustus, 04-08-2026; https://www.sra.nl/nieuws/259001/2026/04/aanvraag-slim-eerste-tijdvak-uiterlijk-4-mei-2026); samenwerkingsverbanden 22-06 t/m 20-07-2026; aparte SLIM-scholingssubsidie voor werkgevers 26-05 t/m 31-12-2026 (https://www.hezelburcht.com/nieuws/slim-subsidie-openstelling-samenwerkingsverbanden-uitgesteld-en-wijzigingen-scholingssubsidie/, 08-06-2026). De blog noemt terecht geen percentages of data | Geen wijziging nodig. Let op: het mkb-tijdvak 2026 is op 07-09-2026 gesloten; de gelinkte blog `slim-subsidie-aanvragen` (014) kan daardoor verouderde data bevatten. |
| 4 | "Als vijf mensen elk twee uur per week winnen, is dat tien uur per week." | KLOPT | Rekensom; staat er als rekenvoorbeeld, niet als belofte | Geen wijziging nodig. |

## Samenvatting

44 beweringen gecontroleerd in 10 blogs. Geen infographics in deze batch.

| Oordeel | Aantal |
|---|---|
| KLOPT | 19 |
| ONJUIST | 2 |
| VEROUDERD | 2 |
| GEEN BRON | 8 |
| EIGEN CLAIM | 10 |
| NIET KUNNEN VERIFIËREN | 3 |

**De 3 ernstigste problemen:**

1. **053, AVG en stemopnames (ONJUIST).** "Een stemopname zelf is een verwerking van biometrische gegevens" klopt juridisch niet. Volgens AVG art. 4 lid 14 en art. 9 is een stem pas een biometrisch gegeven, en pas dan een bijzonder persoonsgegeven, als je hem gebruikt om iemand uniek te identificeren. Een blog die AVG-advies geeft, moet hier precies zijn. De vervangende zin staat in de tabel.
2. **051 en 054, modelnamen (VEROUDERD).** Opus 4.8 en Fable 5 zijn inmiddels legacy. De actuele line-up is Fable 5.1, Opus 5.5, Sonnet 5.5 en Haiku 4.5. Fable 5 was op beide publicatiedata bovendien wereldwijd offline (12 juni tot 1 juli 2026). Advies: schrijf deze passages tijdloos, zonder versienummers, anders verouderen ze bij elke release opnieuw.
3. **056, werkwijze (ONJUIST tegenover de eigen site).** De blog zegt dat hij "dezelfde stappen" volgt als /werkwijze, maar slaat de stap "tweede brein" over. Die stap stond al sinds 2 juli op de site, één dag vóór publicatie. Een lezer die doorklikt, ziet twee verschillende werkwijzen. Daarnaast is 057 de blog met de meeste getallen zonder bron: de titel "van een uur naar tien minuten", "een uur tot anderhalf uur", "vijf tot tien keer per week" en 10/90 procent. De titel botst ook met blog 052, waar dezelfde offerte "van een uur naar een paar minuten" gaat.
