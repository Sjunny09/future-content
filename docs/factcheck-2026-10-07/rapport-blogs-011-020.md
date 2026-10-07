# Factcheck blogs 011 t/m 020, future-content.nl

Gecontroleerd op 7 oktober 2026. Oordelen: KLOPT, ONJUIST, VEROUDERD, GEEN BRON, EIGEN CLAIM, NIET KUNNEN VERIFIËREN. Per blog staan ONJUIST en GEEN BRON bovenaan. Infographic-data uit `components/common/Infographic.tsx` is meegenomen waar de blog er een heeft.

## 011_2025-terugblik-wat-werkte.md
Publicatiedatum 2025-12-10. Geen infographic.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Video's zonder hook: 70% haakt af in de eerste seconde" | GEEN BRON | Geen bron gevonden voor 70% in de eerste seconde. Wat wel circuleert: 19,4% vertrekt binnen 10 seconden (NYT, via https://biomed20.ucsf.edu/2010/10/13/short-attention-spans-for-web-videos-nytimes-com, 2010) en 50-70% binnen de eerste 30 seconden (https://vidiq.com/blog/post/increase-audience-retention-youtube/, geraadpleegd 7-10-2026). 70% in één seconde is fors hoger dan elke gevonden meting. | "Video's zonder hook: in onze eigen statistieken haakt het grootste deel van de kijkers in de eerste seconden al af." |
| 2 | "Te lang (meer dan 90 seconden): dramatische daling in kijktijd" | GEEN BRON | Geen meting genoemd, geen onafhankelijke bron voor een breuk bij 90 seconden. | "Te lang: boven de anderhalve minuut zagen we de kijktijd in onze eigen video's duidelijk dalen." |
| 3 | "Vastgoedvideo's met drone: significant meer bezichtigingsaanvragen" | GEEN BRON | Alleen Amerikaanse marketingcijfers gevonden (bijv. "68% sneller verkocht", https://www.digitalcameraworld.com/news/aerial-real-estate-is-quick-drone-photos-will-help-sell-a-home-68-faster-says-study), geen meting voor Nederland of voor John's woningen. "Significant" suggereert een statistische meting. | "Vastgoedvideo's met drone: makelaars merkten meer reacties op woningen met luchtbeelden." (alleen als John dat zo van Pit terugkreeg, anders schrappen) |
| 4 | "Hier is wat ik dit jaar leerde uit tientallen shoots en honderden video's." | EIGEN CLAIM | Spanning met de site zelf: `lib/constants.ts` TRUST_STATS noemt "150+ Video's gemaakt" in totaal, niet honderden in één jaar. | "...uit tientallen shoots en meer dan honderd video's." (of het OS-aantal over 2025 erbij pakken) |
| 5 | "Korte how-to video's (30–45 sec): meest gedeeld" en "Persoonlijke video's ... hoogste engagement" | EIGEN CLAIM | Eigen waarneming zonder genoemde meting. Let op: de reeks staat met een en-dash (30–45); geen em-dash, dus toegestaan. | Laten staan als ervaring, of "in onze eigen accounts" toevoegen. |
| 6 | "accounts die wekelijks posten groeiden sneller dan accounts die sporadisch postten" | EIGEN CLAIM | Plausibel en breed gerapporteerd, maar niet gemeten op John's eigen klanten voor zover hier na te gaan. | Laten staan, eventueel "bij onze klanten" toevoegen. |

## 012_ai-content-laten-maken-dit-eerst.md
Publicatiedatum 2026-01-14. Geen infographic.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Bouw een bibliotheek van honderden minuten footage op" ... "dit wordt straks je trainingsdata" | ONJUIST | Voor een avatar of stemkloon is geen honderden minuten nodig. HeyGen Digital Twin: minimaal 15 seconden, aanbevolen circa 2 minuten (https://www.heygen.com/academy/avatars/how-to-create-a-Digital-Twin, geraadpleegd 7-10-2026). ElevenLabs Professional Voice Clone: minimaal 30 minuten audio, optimaal 2-3 uur (https://elevenlabs.io/docs/product-guides/voices/voice-cloning/professional-voice-cloning, geraadpleegd 7-10-2026). De onderbouwing "AI heeft trainingsdata nodig" klopt dus niet als reden voor honderden minuten. | "Een AI-avatar heeft maar een paar minuten opname nodig, maar wat hij zegt en hoe hij overkomt haal je uit je eigen materiaal. Bouw dus een bibliotheek op van echte video's waarin jouw stijl en verhalen zitten." |
| 2 | "Een AI-avatar die jou imiteert zonder dat er echte opnames van jou zijn, klinkt generiek" | ONJUIST (in opzet) | Een avatar die op jou lijkt kan niet bestaan zonder opnames van jou; de tools vragen altijd eerst een video of foto (zie HeyGen-bron hierboven). De zin beschrijft een situatie die niet voorkomt. | "Een AI-avatar op basis van een paar minuten opname kan je gezicht en stem nadoen, maar niet jouw verhalen en manier van uitleggen. Die moeten ergens vandaan komen." |
| 3 | "zodat hij over twee jaar een AI heeft die 24/7 voor hem werkt, in zijn eigen stem en stijl" | GEEN BRON | Voorspelling zonder onderbouwing; bovendien kan dat volgens bovenstaande bronnen nu al technisch, wat de "over twee jaar" ondergraaft. | "zodat hij straks een AI kan inzetten die in zijn eigen stem en stijl werkt, gevoed met echt materiaal." |
| 4 | "Er zijn nu tools die AI-video's genereren op basis van een tekst. Tools die een avatar maken die op jou lijkt. Tools die jouw stem klonen." | KLOPT | Tekst-naar-video (o.a. Runway, Sora, Veo), avatars (HeyGen, Synthesia), stemklonen (ElevenLabs) bestonden op 14-1-2026. Bronnen: zie HeyGen en ElevenLabs hierboven. | - |

## 013_trouwen-in-europa-2026.md
Publicatiedatum 2026-03-02. Geen infographic.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Wenen, Oostenrijk: voor stellen die van grandeur houden zonder vliegtuig. ... op een paar uur rijden van Nederland." | ONJUIST | Eindhoven-Wenen is hemelsbreed circa 860 km (eigen haversine-berekening op de coördinaten, 7-10-2026; een zoekresultaat noemde 884 km). Over de weg is dat ruim 1.000 km en naar schatting 10 uur rijden (routeplanner niet opgevraagd, niet gemeten). Dat is geen "paar uur". | "Wenen, Oostenrijk: voor stellen die van grandeur houden. Paleizen, tuinen en een stad met karakter, met de auto in een lange dag te bereiken of met de nachttrein vanuit Nederland." (nachttrein eerst checken bij NS International) of: "...op een dag rijden van Nederland." |
| 2 | "2026 is voor veel stellen het jaar waarop ze hun uitgestelde droombruiloft eindelijk laten plaatsvinden." | GEEN BRON | Geen bron gevonden voor een inhaalgolf in 2026; de bekende coronagolf van uitgestelde bruiloften lag in 2021-2022. | Schrappen, of: "Zomerse weekenden in populaire bestemmingen raken snel vol." |
| 3 | "Steeds meer stellen kiezen voor een bruiloft in Europa" (kop) en "Steeds meer Nederlandse stellen kiezen voor een trouwlocatie in Europa" (excerpt) | GEEN BRON | Wel trendartikelen (bijv. https://financialfocus.abnamro.nl/expertise/huwelijksmarkt-familie-tradities-en-prijskaartjes/, geraadpleegd 7-10-2026), geen cijfers die een stijging aantonen. Trustoo-onderzoek meldt juist dat veel Nederlanders een destination wedding te veel gedoe vinden (https://trustoo.nl/blog/nieuws/regionale-verschillen-in-trouwwensen/). | "Een bruiloft in Europa is voor veel Nederlandse stellen een serieuze optie geworden." |
| 4 | "Ik reis mee naar jullie locatie ... Ik kom naar jullie toe" | EIGEN CLAIM | Niet na te gaan of John al een buitenlandse bruiloft filmde; de site (`app/trouwen/page.tsx`) noemt "De Kempen en omgeving" als werkgebied. | John bevestigen. Heeft hij nog geen bruiloft in het buitenland gefilmd, dan is de tekst als aanbod prima, maar niet suggereren dat de review hierover gaat. |
| 5 | "[quote] John heeft onze trouwvideo gemaakt, waar wij super tevreden over waren. ..." | KLOPT (met kanttekening) | Komt overeen met de Google-review van Mandy Daniels in `lib/constants.ts` (REVIEWS, regel 404). Kanttekening: staat onder "Ik kom naar jullie toe" en wekt zo de indruk dat het een buitenlandse bruiloft betrof; dat staat niet in de review. | Bron erbij zetten: "Mandy, bruid (Google-review)" en de quote buiten de buitenland-alinea plaatsen. |
| 6 | "Oplevering binnen vier weken: een social edit van 60 tot 90 seconden en een volledige film", "via WeTransfer", "van de voorbereidingen tot de receptie" | KLOPT | Gelijk aan `app/trouwen/page.tsx` (regels 22, 117, 211-212, 256, 261). | - |
| 7 | "Côte d'Azur, Frankrijk: ... lavendelvelden in de Provence" | KLOPT (met kanttekening) | De lavendelvelden liggen landinwaarts (plateau van Valensole), niet aan de Côte d'Azur, en bloeien alleen eind juni tot half juli. Geen fout, wel twee regio's in één regel. | "Côte d'Azur en Provence, Frankrijk: villa's met terras aan zee, of in de zomer lavendelvelden en Provençaalse dorpjes in het binnenland." |

Taal buiten de factcheck, maar gaat live: "aanhält" (moet "aanhoudt") en "iconic" (moet "iconische").

## 014_slim-subsidie-aanvragen.md
Publicatiedatum 2026-04-14 (midden in het eerste tijdvak van 2026). Geen infographic. Deze blog heeft de zwaarste fouten van de batch, omdat een ondernemer erop kan handelen.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Check dat altijd bij de actuele voorwaarden van RVO, niet bij een oude blogpost." | ONJUIST | SLIM wordt niet door RVO uitgevoerd maar door Uitvoering van Beleid SZW (ministerie van SZW); aanvragen via mijnuitvoeringvanbeleidszw.nl. https://www.sra.nl/nieuws/259001/2026/04/aanvraag-slim-eerste-tijdvak-uiterlijk-4-mei-2026 (april 2026); https://www.hrpraktijk.nl/medewerker/opleiden-en-ontwikkelen/aanvraag-slim-subsidie-weer-geopend-tijdvak-start-op-7-april-2026/ | "Check dat altijd bij de actuele voorwaarden van Uitvoering van Beleid SZW (uitvoeringvanbeleidszw.nl), niet bij een oude blogpost." |
| 2 | "Er is een beperkt subsidieplafond. Op is op, ook binnen een aanvraagperiode." | ONJUIST | Er is een plafond, maar bij overtekening wordt geloot; het is geen wie-het-eerst-komt. Sinds 2026 ook voor samenwerkingsverbanden. https://www.sra.nl/nieuws/259001/2026/04/aanvraag-slim-eerste-tijdvak-uiterlijk-4-mei-2026 (april 2026) | "Er is een beperkt budget per ronde. Wordt er meer aangevraagd dan er is, dan wordt er geloot. Vroeg indienen geeft dus geen voorsprong, een complete aanvraag binnen de termijn wel." |
| 3 | "een AI-training kan daar onder omstandigheden onder vallen" (intro) en "Ook een AI-training kan daaronder vallen" (excerpt) | ONJUIST (misleidend) | De reguliere SLIM-regeling vergoedt de opleidingskosten zelf niet. Subsidiabel zijn: doorlichting met een opleidings- of ontwikkelplan, loopbaan- of ontwikkeladvies, het ontwikkelen of invoeren van een methode voor leren en ontwikkelen, en praktijkleerplaatsen. https://www.salarisvanmorgen.nl/2020/02/12/slim-regeling-vragen-en-antwoorden-over-mkb-subsidie/ ("Opleidingskosten zijn echter niet subsidiabel"); https://khn.nl/nieuws/de-slim-subsidie-vanaf-19-augustus-kun-je-m-weer-aanvragen (11-8-2026). De aparte SLIM-scholingssubsidie 2025-2027 vergoedt wel opleidingen, maar alleen die in de Ontwikkelpaden van tekortsectoren (techniek, bouw en energie, zorg en welzijn, kinderopvang, onderwijs, groen, ICT): https://www.samenvoordeklant.nl/sites/default/files/bestandsbijlage/SLIM_Scholingssubsidie_Voor_individuele_werkgevers_en_geregistreerde_gastouderbureaus-SZW.pdf. Een losse AI-workshop valt daar in de regel niet onder. | Intro: "Het is een subsidie van de overheid voor bedrijven die het leren en ontwikkelen van hun personeel structureel willen aanpakken. De training zelf wordt niet vergoed, maar bijvoorbeeld wel een doorlichting met een opleidingsplan of het invoeren van een manier van leren op de werkvloer, en daar kan AI een onderdeel van zijn." Excerpt: "De SLIM-subsidie helpt MKB-bedrijven het leren en ontwikkelen van personeel op te zetten. Wat er wel en niet onder valt, lees je hier." |
| 4 | "Denk aan een opleidingsplan, een loopbaanadviestraject, of een praktijkleerplaats." | KLOPT | Zelfde bronnen als #3. Loopbaan- of ontwikkeladvies is een vast bedrag van €700 per traject (SRA, april 2026). | - |
| 5 | "De regeling kent vaste aanvraagperiodes per jaar, niet doorlopend open." | KLOPT | 2026: individueel mkb 7 april tot 4 mei en een tweede ronde in augustus tot 7 september; samenwerkingsverbanden 8 juni tot 6 juli. SRA (april 2026), KHN (11-8-2026). | - |
| 6 | "Het exacte percentage en maximumbedrag verschilt per aanvraagronde en bedrijfsgrootte." | KLOPT (met kanttekening) | Standaard 60% van de subsidiabele kosten, maximaal €24.999 per individuele aanvraag; voor kleine ondernemingen (minder dan 50 werknemers) geldt een hoger percentage (KHN noemt maximaal 80%). Landbouw max €20.000. Het verschil zit vooral in grootte en type aanvrager, minder in de ronde. SRA (april 2026), KHN (11-8-2026). | "Het percentage hangt af van de grootte van je bedrijf: in de regel 60%, voor kleine bedrijven meer, tot een maximum van rond de €25.000 per aanvraag. Check de actuele cijfers altijd bij Uitvoering van Beleid SZW." |
| 7 | "SLIM staat voor Stimuleringsregeling Leren en ontwikkelen In MKB-ondernemingen." | KLOPT | Officieel: "Stimuleringsregeling leren en ontwikkelen in mkb-ondernemingen" (aangevuld met landbouw-, horeca- en recreatiesector). https://www.hrpraktijk.nl/... (april 2026) | - |
| 8 | "Ik ben geen subsidie-adviseur en beloof geen percentage of bedrag vooraf." | EIGEN CLAIM | Positionering, geen feit om te toetsen. | - |

Let op de categorie: deze blog staat onder "AI & Content", terwijl het over subsidie en training gaat. Geen factcheck-punt, wel een vindbaarheidspunt.

## 015_ai-voor-mkb-waar-begin-je-echt.md
Publicatiedatum 2025-10-06. Infographic: `ai-volwassenheid`.

Let op voor 015 t/m 020: deze zes AI-blogs dragen publicatiedatums van oktober en november 2025, maar het bestand `lib/blog/ai-posts-1.ts` komt voor het eerst voor in commit `cad55a3` van 22 juni 2026 (git log, gemeten 7-10-2026; het kan eerder ongecommit hebben bestaan). Beweringen over John's eigen werk lees ik daarom tegen de datum op de blog, en daar wringt het bij #2 hieronder.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | Infographic `ai-volwassenheid`: titel "De vier assen van de AI-Quickscan", onderschrift "De quickscan scoort je bedrijf op deze vier assen en laat zien waar de meeste winst zit." (assen: Gebruik en bewustzijn 3, Strategie en richtlijnen 2, Implementatie en adoptie 3, Resultaten en optimalisatie 4, op een schaal van 5) | ONJUIST | De live quickscan scoort niet op vier assen. Volgens `SCAN-ARCHITECTUUR.md` (fc-rebrand, live-status 5-7-2026) en de code in `lib/scan/` levert de quickscan een site-analyse, adaptieve vragen en precies drie kansen op; de vier assen of een 1-5-score komen nergens in `app/`, `lib/` of `components/` voor buiten de infographic zelf (grep 7-10-2026). De scores 3/2/3/4 zijn bovendien niet als voorbeeld gelabeld. | Infographic vervangen of herschrijven: titel "Waar staat jouw bedrijf met AI?", onderschrift "Voorbeeld van vier aandachtspunten. De quickscan kijkt naar je website en je antwoorden en geeft je drie concrete kansen." Of de infographic schrappen uit deze blog. |
| 2 | "Ik heb dit zelf gedaan met mijn eigen administratie. Ik bouwde een systeem dat mijn uren, facturen en BTW grotendeels automatisch verwerkt." | EIGEN CLAIM | Gedeeltelijk bevestigd: `00-future-content/README.md` beschrijft een "Python CLI + Flask webapp voor urenregistratie, facturen, BTW, kilometers" op Google Sheets; het huidige OS met btw-check en bankkoppeling dateert van juli 2026 (git log `00-future-content/os`, sprint 1 t/m 5, 15-16 juli 2026). Of het Flask-systeem op 6-10-2025 al zo ver was, is binnen mijn scope niet na te gaan. | John bevestigen dat de Flask-app in oktober 2025 al uren, facturen en btw deed. Anders: "Ik heb dit zelf gedaan met mijn eigen administratie. Ik bouwde een systeem dat mijn uren en facturen grotendeels automatisch verwerkt." |
| 3 | "Saai en herhalend is precies waar AI goed in is." | KLOPT | Breed onderschreven; zie ook de studies bij blog 020. | - |

## 016_chatgpt-claude-gemini-welk-taalmodel-past-bij-jouw-bedrijf.md
Publicatiedatum 2025-10-13. Infographic: `model-vergelijking`.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Het houdt toon beter vast, gokt minder en levert tekst die ik minder hoef te herschrijven." (over Claude) | GEEN BRON | "Gokt minder" is een vergelijkende uitspraak over hallucinaties. Benchmarks daarover wisselen per modelversie en per taak; er is geen bron die dit algemeen voor Claude tegenover ChatGPT en Gemini vaststelt. "Toon beter vasthouden" en "minder herschrijven" zijn John's ervaring. | "In mijn ervaring houdt het de toon beter vast en hoef ik de tekst minder te herschrijven." |
| 2 | "Gemini van Google leunt op alles wat je al in Gmail, Docs en Sheets doet." | KLOPT | Sinds 16-1-2025 zit Gemini in Gmail, Docs, Sheets, Drive, Meet e.a. binnen Workspace Business en Enterprise, met een prijsverhoging van circa $2 per gebruiker per maand. https://9to5google.com/2025/01/15/google-workspace-gemini-price-increase/ (15-1-2025) | - |
| 3 | "Het is ook handig bij het verwerken van grote hoeveelheden informatie in een keer." (Gemini) | KLOPT | Gemini 2.5 Pro (maart 2025) heeft een contextvenster van 1 miljoen tokens. https://www.datacamp.com/blog/gemini-2-5-pro (geraadpleegd 7-10-2026) | - |
| 4 | Infographic `model-vergelijking`: ChatGPT "Breed inzetbaar / Sterk in brainstorm / Veel integraties"; Claude "Beste schrijfwerk / Lange documenten / Nuance en toon"; Gemini "In Google Workspace / Multimodaal / Realtime info" | KLOPT (met kanttekening) | Geen getallen; als richtlijn verdedigbaar en zo gelabeld ("Algemene richtlijn, geen harde rangschikking"). Kanttekening: "Beste schrijfwerk" is een superlatief zonder bron, en "Lange documenten" staat bij Claude terwijl de blogtekst juist Gemini sterk noemt in grote hoeveelheden informatie. | "Beste schrijfwerk" vervangen door "Sterk in schrijfwerk"; "Lange documenten" ook bij Gemini zetten of bij Claude vervangen door "Lange teksten schrijven". |
| 5 | "Ik gebruik ze alle drie" | EIGEN CLAIM | Niet te toetsen. | - |

## 017_5-fouten-die-ondernemers-maken-met-chatgpt.md
Publicatiedatum 2025-10-20. Geen infographic.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Negen van de tien keer ligt het niet aan het model, maar aan hoe het gevraagd wordt." | GEEN BRON | Leest als een getal (90%), maar er is geen meting. | "Meestal ligt het niet aan het model, maar aan hoe het gevraagd wordt." |
| 2 | "Plak geen klantdossiers, wachtwoorden of gevoelige cijfers in een gratis chatvenster. ... Wil je met bedrijfsdata werken, kies dan een zakelijke variant met de juiste afspraken over je gegevens." | KLOPT (met kanttekening) | OpenAI traint standaard niet op data uit ChatGPT Team/Business, Enterprise en de API; bij Free, Plus en Pro staat training standaard aan tot je het uitzet. https://help.openai.com/en/articles/8983130-what-is-the-chatgpt-enterprise-and-team-data-policy en https://openai.com/policies/how-your-data-is-used-to-improve-model-performance/ (geraadpleegd 7-10-2026). Kanttekening: het risico zit niet alleen in "gratis"; een betaald Plus-abonnement traint ook standaard mee. En voor klantgegevens is onder de AVG een verwerkersovereenkomst nodig, niet alleen een zakelijk abonnement. | "Plak geen klantdossiers, wachtwoorden of gevoelige cijfers in een gratis of persoonlijk abonnement: daar kan je invoer standaard gebruikt worden om het model te trainen. Wil je met bedrijfsdata werken, kies dan een zakelijke variant met een verwerkersovereenkomst." |
| 3 | "Een taalmodel kan overtuigend onzin vertellen" / "Het verzint soms bronnen, jaartallen of citaten" | KLOPT | Hallucinaties zijn door OpenAI zelf gedocumenteerd ("Why language models hallucinate", https://openai.com/index/why-language-models-hallucinate/, 5-9-2025). | - |

## 018_10-ai-tools-die-elk-mkb-bedrijf-moet-kennen.md
Publicatiedatum 2025-10-27. Geen infographic.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Voor een restaurant bouwde ik bijvoorbeeld een chatbot die zelf tafels reserveert. Dat valt onder die laatste rij" | ONJUIST (interne tegenspraak) | De laatste rij in de lijst is "Een automatiseringstool die je losse programmas aan elkaar knoopt". Een chatbot hoort bij de rij erboven: "Een chatbot die veelgestelde vragen van klanten afvangt". | "Dat valt onder de chatbot-rij, maar dan helemaal toegespitst op één zaak en gekoppeld aan hun boekingssysteem." |
| 2 | "Voor een restaurant bouwde ik bijvoorbeeld een chatbot die zelf tafels reserveert." | EIGEN CLAIM | Staat ook als "bewijs" op de site (`lib/constants.ts` regel 301), maar daar zonder klantnaam; of dit een betalende klant, een demo of eigen product was, is binnen mijn scope niet na te gaan. Op 27-10-2025 moet het al gebouwd zijn geweest. | John bevestigen. Was het een demo: "Voor een restaurant bouwde ik bijvoorbeeld een demo van een chatbot die zelf tafels reserveert." |
| 3 | Titel: "10 AI-tools die elk MKB-bedrijf in 2025 moet kennen" | VEROUDERD | Klopte op de publicatiedatum; op 7-10-2026 staat er een jaartal van vorig jaar in de titel. Het stuk noemt alleen categorieën, dus de inhoud zelf is niet verouderd. | Titel: "10 soorten AI-tools die elk MKB-bedrijf moet kennen" (ook passender, want het zijn categorieën, geen tools). |
| 4 | "Tien categorieen" | KLOPT | Geteld: 3 + 3 + 4 = 10. | - |

Taal buiten de factcheck, maar gaat live: "categorieen", "programmas", "productfotos" zonder trema of apostrof (categorieën, programma's, productfoto's).

## 019_wat-is-een-goede-ai-prompt-7-voorbeelden.md
Publicatiedatum 2025-11-03. Infographic: `prompt-formule`.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Een sterke prompt bestaat uit drie delen. Eerst de rol ... Dan de context ... En tot slot het format" (kop: "De formule: rol, context, format") | ONJUIST (tegenspraak met eigen infographic) | De infographic `prompt-formule` direct onder dezelfde blog noemt vier delen: Rol, Context, Taak, Format, met onderschrift "Hoe completer deze vier, hoe beter het antwoord" (`Infographic.tsx` regels 125-131). De taak ontbreekt in de tekst, terwijl elk van de zeven voorbeelden juist een taak bevat. | Kop: "De formule: rol, context, taak, format". Tekst: "Een sterke prompt bestaat uit vier delen. Eerst de rol: wie moet het model zijn. Dan de context: wat is de situatie en voor wie. Dan de taak: wat moet er precies gebeuren. En tot slot het format: in welke vorm wil je het antwoord." |
| 2 | "Door een rol te geven, kiest het model de juiste toon." | KLOPT | Anthropic: "Setting a role in the system prompt focuses Claude's behavior and tone for your use case." https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices (geraadpleegd 7-10-2026) | - |
| 3 | "(7 voorbeelden)" | KLOPT | Geteld: zeven voorbeelden in de lijst. | - |

## 020_hoeveel-tijd-bespaart-ai-je-echt-een-eerlijke-rekensom.md
Publicatiedatum 2025-11-10. Infographic: `tijdwinst`.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Met AI als hulp doe je dat realistisch in ongeveer 4 uur" naast "Ongeveer 30 procent sneller met AI als assistent" en "bijna 2 uur winst per week" | ONJUIST (interne tegenspraak) | Van 6 naar 4 uur is 33% minder tijd en precies 2 uur; 30% van 6 uur is 1,8 uur. Bovendien betekent "30 procent sneller" strikt genomen iets anders dan 30% minder tijd (30% minder tijd = ruim 40% sneller). Eigen berekening. | Lijst: "6 uur repeterend schrijfwerk per week", "Ongeveer een derde minder tijd met AI als assistent", "Dat is ongeveer 2 uur winst per week", "Op jaarbasis is dat ruim 90 uur, bij 46 werkweken (dit is een voorbeeld, geen belofte)". |
| 2 | Infographic `tijdwinst`: E-mail en communicatie 40%, Offertes en documenten 30%, Planning en administratie 25%, Rapportage en analyse 50% | GEEN BRON | Gelabeld als "Illustratieve indicatie", maar zonder bron, en twee van de vier balken (40% en 50%) liggen boven de "kwart tot een derde" die de tekst zelf als realistisch noemt. Ter vergelijking: MIT-experiment Noy & Zhang (Science, 2023) vond 40% minder tijd op schrijftaakjes in een gecontroleerde test (https://getcoai.com/research-reports/mits-latest-study-chatgpt-transforms-writing-efficiency/); de St. Louis Fed mat bij gebruikers gemiddeld 5,4% van de totale werkuren (https://www.stlouisfed.org/on-the-economy/2025/feb/impact-generative-ai-work-productivity, februari 2025). | Getallen laten aansluiten op de tekst: alle vier tussen 25% en 35%, of de balken vervangen door een bandbreedte "25-35%" met onderschrift "Indicatie uit mijn eigen praktijk op repeterende taken. Echte cijfers verschillen per bedrijf." |
| 3 | "Dat is 2 uur per week, oftewel bijna een hele werkdag per maand." | KLOPT (met kanttekening) | Hangt af van het aantal werkweken. 2 uur x 46 werkweken / 12 = 7,7 uur per maand, dus bijna een werkdag; reken je met 52 weken, dan is het 8,7 uur, ruim een werkdag. Eigen berekening. | Mag blijven staan. |
| 4 | "Op dat soort taken kun je in mijn ervaring een flink deel van die tijd terugwinnen, vaak rond een kwart tot een derde." | EIGEN CLAIM | Als ervaring benoemd. Ligt binnen wat onderzoek op taakniveau laat zien (zie #3, 40% bij Noy & Zhang), maar ver boven het gemiddelde over alle werkuren (5,4%, St. Louis Fed). Dat onderscheid (per taak versus over je hele week) maakt de blog terecht. | Laten staan; eventueel de Noy & Zhang-studie als bron toevoegen. |
| 5 | "Online lees je dat AI je tien keer productiever maakt. Dat klopt niet" | KLOPT | Geen onderzoek gevonden dat een tienvoudige productiviteitswinst voor kantoorwerk laat zien; gemeten effecten liggen in de tientallen procenten per taak (zie #3). | - |
| 6 | "Toen ik mijn administratie deels automatiseerde met een eigen systeem voor uren, facturen en BTW" | EIGEN CLAIM | Zelfde als blog 015 #2: een Flask-app voor uren, facturen en btw bestond (`00-future-content/README.md`), het huidige OS dateert van juli 2026. Of dit op 10-11-2025 al zo was, niet na te gaan. | John bevestigen. |


## Samenvatting

49 beweringen gecontroleerd in 10 blogs (inclusief de infographics `ai-volwassenheid`, `model-vergelijking`, `prompt-formule` en `tijdwinst`).

| Oordeel | Aantal |
|---|---|
| ONJUIST | 10 |
| GEEN BRON | 9 |
| EIGEN CLAIM | 10 |
| KLOPT (waarvan 6 met kanttekening) | 19 |
| VEROUDERD | 1 |
| NIET KUNNEN VERIFIËREN | 0 |

De 3 ernstigste problemen:

1. **SLIM-blog (014) stuurt ondernemers de verkeerde kant op.** De regeling wordt uitgevoerd door Uitvoering van Beleid SZW, niet door RVO; bij overtekening wordt geloot in plaats van "op is op"; en de opleidingskosten zelf (dus ook een AI-training) vallen niet onder de reguliere SLIM-regeling. Wie hierop handelt, zoekt op de verkeerde site, haast zich voor niets en verwacht een vergoeding die er niet komt. Dit raakt ook John's eigen verkoopverhaal rond trainingen.
2. **Infographic `ai-volwassenheid` (015) beschrijft een quickscan die niet bestaat.** "De quickscan scoort je bedrijf op deze vier assen" klopt niet met de live scan, die drie kansen oplevert en geen 1-5-score op vier assen. Een bezoeker die de scan doet, ziet iets anders dan beloofd.
3. **Rekenwerk en formules die zichzelf tegenspreken (019, 020, 018).** De promptblog noemt drie delen terwijl de infographic eronder er vier toont; de tijdwinstblog rekent in de tekst met een derde en in de lijst met 30%, en de infographic toont tot 50% terwijl de tekst "een kwart tot een derde" realistisch noemt; de toolsblog plaatst de chatbot onder de verkeerde rij. Klein per stuk, maar juist een blog die "eerlijke rekensom" heet, moet kloppen.

Overige aandachtspunten: "70% haakt af in de eerste seconde" (011) heeft geen bron en ligt ver boven elke gevonden meting; "Wenen op een paar uur rijden" (013) is ongeveer 10 uur; blog 012 suggereert dat je honderden minuten footage nodig hebt voor een AI-avatar, terwijl HeyGen met 2 minuten werkt. De AI-blogs 015 t/m 020 hebben publicatiedatums in oktober en november 2025 maar kwamen pas in juni 2026 in de repo; de beweringen over John's eigen administratiesysteem (015, 020) moet hij daarom tegen die datums bevestigen.
