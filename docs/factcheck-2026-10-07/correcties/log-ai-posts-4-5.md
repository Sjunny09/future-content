# Logboek correcties ai-posts-4.ts en ai-posts-5.ts (blogs 047 t/m 071)

Datum: 7 oktober 2026. Bron: docs/factcheck-2026-10-07/rapport-blogs-041-050.md, -051-060.md, -061-071.md.
Niet aangeraakt: slug "telefoonfilmpje-sprookje-waar-ai-de-mist-in-ging", date-velden, titels, slugs. Geen build gedraaid, niet gecommit.

## Wijzigingen

### 047 ai-implementeren-in-je-bedrijf-waar-begin-je
Geen wijzigingen (alleen EIGEN CLAIM-punten, zie open punten).

### 048 ben-ik-geen-it-er-is-ai-iets-voor-mij
1. Oud: "Een agent bouwen klinkt technisch, maar komt in de kern neer op een prompt invoeren: een duidelijke instructie in normale taal, met de context die erbij hoort."
   Nieuw: "Een agent aansturen klinkt technisch, maar komt in de kern neer op een duidelijke instructie in normale taal, met de context die erbij hoort."
   Reden: ONJUIST. Een agent bouwen is meer dan een prompt (koppelingen, rechten, tools) en botst met het eigen aanbod op /ai (bouw als maatwerk, app/ai/page.tsx r.63). Voorstel rapport 041-050, 048 #1.

### 049 wat-kost-ai-voor-een-mkb-bedrijf
1. Excerpt. Oud: "beginnen kan rond de 20 dollar per maand, serieus draaien rond de 200."
   Nieuw: "beginnen kan rond de 20 dollar per maand, een zwaar abonnement kost 100 tot 200."
   Reden: GEEN BRON voor "200 = serieus draaien" (rapport 049 #3). 100 tot 200 dollar is de prijs van Claude Max 5x/20x, https://claude.com/pricing (gelezen 7-10-2026).
2. Intro. Oud: "serieus doorpakken zit eerder rond de 200."
   Nieuw: "een zwaar abonnement voor één persoon kost 100 tot 200."
   Reden: zelfde als 1.
3. Kop (h2, geen titel). Oud: "Serieus draaien: reken op 200"
   Nieuw: "Serieus draaien: reken op meer"
   Reden: zelfde als 1, kop moet passen bij de gecorrigeerde alinea.
4. Oud: "... die op de achtergrond blijven draaien, loop je richting de 200 dollar per maand."
   Nieuw: "... die op de achtergrond blijven draaien, lopen de kosten op. Een team betaalt per gebruiker, bij Claude Team bijvoorbeeld 25 dollar per persoon per maand, en een zwaar abonnement voor één persoon kost 100 tot 200 dollar per maand ([prijzen Claude](https://claude.com/pricing))."
   Reden: GEEN BRON (rapport 049 #3). Claude Team $25 per gebruiker bij maandbetaling en Max vanaf $100, https://claude.com/pricing (zelf nagekeken 7-10-2026). Max 20x $200 volgens rapport 051 #3.
5. Oud: "Vier tools tussen de 20 en 50 dollar per maand: samen al snel 100 tot 150 dollar"
   Nieuw: "Vier tools tussen de 20 en 50 dollar per maand: samen 80 tot 200 dollar"
   Reden: ONJUIST, rekenfout (4 x 20 = 80, 4 x 50 = 200). Rapport 049 #1.
6. Oud: "Een agent die op gebruik draait: meestal een paar tot enkele tientallen dollars per maand, afhankelijk van hoeveel hij verwerkt"
   Nieuw: "Een agent die op gebruik draait: de kosten hangen af van hoeveel hij verwerkt, en bij kleine volumes is dat vaak beperkt"
   Reden: GEEN BRON, bedrag hangt volledig af van model en volume. Rapport 049 #4.
7. Oud: "Voor de tools hierboven geldt een vaste prijs die iedereen betaalt."
   Nieuw: "Voor standaardabonnementen betaal je een vaste prijs per maand."
   Reden: ONJUIST, spreekt de eigen lijst tegen (agent op gebruik heeft geen vaste prijs) en prijzen verschillen per land/btw. Rapport 049 #2, https://www.icreatemagazine.nl/nieuws/chatgpt-plus/
   Let op: de zinnen direct daarna ("... dus dat bespreken we altijd per bedrijf, op aanvraag") zijn NIET aangepast, zie WACHT OP AANBODKEUZE.

### 050 is-mijn-bedrijf-te-klein-voor-ai
Geen wijzigingen (alleen EIGEN CLAIM-punten).

### 051 claude-of-chatgpt-welke-ai-kies-je
1. Oud: "Anthropic's sterkste modellen heten op dit moment Opus 4.8 en Fable 5, met Haiku 4.5 als de snelle, goedkope variant voor simpele klusjes."
   Nieuw: "Anthropic brengt meerdere modellen uit: een zwaar model voor complex werk en een snelle, goedkope variant voor simpele klusjes."
   Reden: VEROUDERD. Opus 4.8 en Fable 5 zijn legacy, actueel zijn Fable 5.1, Opus 5.5, Sonnet 5.5, Haiku 4.5 (https://platform.claude.com/docs/en/models/overview, 7-10-2026). Bewust tijdloos (rapportalternatief) in plaats van de nieuwe namen: met "op dit moment" plus nieuwe namen onder een junidatum zou een datumprobleem ontstaan, en Haiku 4.5 kan na 15-10-2026 met pensioen.

### 052 wat-is-een-ai-agent-en-wat-levert-het-op
1. Oud: "Dat kost al snel een uur, soms meer."
   Nieuw: "Dat kost al snel een flink deel van je avond."
   Reden: GEEN BRON, geen meting of onderzoek. Rapport 051-060, 052 #1.
2. Oud: "Een uur dat je nu aan een offerte kwijt bent, wordt een paar minuten."
   Nieuw: "De tijd die je nu aan een offerte kwijt bent, wordt een paar minuten."
   Reden: zelfde ongebronde "een uur" als 1, over de lezer gebracht. Gelijkgetrokken met 1 zodat de blog consistent blijft. "Een paar minuten" is John's eigen ervaring, zie JOHN BEVESTIGT.

### 053 is-mijn-klantdata-veilig-bij-ai
1. Oud: "Een stemopname zelf is een verwerking van biometrische gegevens, en onder de AVG valt dat in een strengere categorie dan een gewoon tekstbestand of e-mailadres."
   Nieuw: "Een stemopname is een persoonsgegeven, net als een naam of e-mailadres, maar wel een gevoelig soort: er zit vaak meer in dan je denkt, zoals gezondheid, emotie of vertrouwelijke afspraken. Gebruik je de stem om iemand te herkennen, dan gaat het om biometrische gegevens en gelden onder de AVG nog strengere regels."
   Reden: ONJUIST. Een stem is pas biometrisch (en pas dan bijzonder persoonsgegeven) bij verwerking om iemand uniek te identificeren. AVG art. 4 lid 14 en art. 9 lid 1, https://eur-lex.europa.eu/eli/reg/2016/679/oj, en EDPB Guidelines 02/2021, https://www.edpb.europa.eu/system/files/2021-03/edpb_guidelines_022021_virtual_voice_assistants_adopted-public-consultation_en.pdf

### 054 wat-ai-niet-kan-en-waarom-dat-goed-is
1. Oud: "Ook het nieuwste model verandert daar niets aan. Of je nu met Opus 4.8 werkt of met Fable 5: sneller en preciezer, zeker, maar het ziet nog steeds niet wat jij niet opschrijft."
   Nieuw: "Ook het nieuwste model verandert daar niets aan: sneller en preciezer, zeker, maar het ziet nog steeds niet wat jij niet opschrijft."
   Reden: VEROUDERD, Opus 4.8 en Fable 5 zijn legacy (https://platform.claude.com/docs/en/models/overview, 7-10-2026). Tijdloos gemaakt volgens rapportvoorstel.

### 055 ai-voor-vakmensen-werk-je-met-je-handen
Geen wijzigingen (alleen EIGEN CLAIM-punten).

### 056 iemand-die-ai-implementeert-bij-je-bedrijf-brabant
Geen wijzigingen. Het ONJUIST-punt (stappen wijken af van /werkwijze) valt onder werkwijze/aanbod, zie WACHT OP AANBODKEUZE.

### 057 ai-voor-offertes-sneller-offreren
1. Oud: "Vraag een ondernemer hoe lang hij over een offerte doet en je krijgt bijna altijd hetzelfde antwoord: een half uurtje. Ga je het echt bijhouden, dan blijkt het een uur tot anderhalf uur te zijn."
   Nieuw: "Vraag een ondernemer hoe lang hij over een offerte doet en hij zegt meestal: een half uurtje. Ga je het echt bijhouden, dan valt dat vaak flink hoger uit."
   Reden: GEEN BRON, geen onderzoek naar offertetijd gevonden. Rapport 051-060, 057 #2.
2. Oud: "En dat vijf tot tien keer per week."
   Nieuw: "En dat meerdere keren per week."
   Reden: GEEN BRON, sterk branche-afhankelijk. 057 #3.
3. Oud: "In tijd is dat misschien tien procent van het werk. De andere negentig procent doe je elke keer opnieuw."
   Nieuw: "In tijd is dat maar een klein deel van het werk. De rest doe je elke keer opnieuw."
   Reden: GEEN BRON. 057 #4.

### 058 mailbox-automatiseren-met-ai
1. Oud: "Dat is bij de meeste ondernemers een groter getal dan de mailtijd zelf, en het is precies de reden waarom dit de moeite waard is."
   Nieuw: "Onderzoek van de Universiteit van Californië liet zien dat mensen na een onderbreking gemiddeld ruim twintig minuten nodig hebben voordat ze weer aan hun oorspronkelijke taak zitten ([interview met onderzoeker Gloria Mark bij Gallup](https://news.gallup.com/businessjournal/23146/too-many-interruptions-work.aspx)). Dat is precies de reden waarom dit de moeite waard is."
   Reden: GEEN BRON voor "bij de meeste ondernemers groter". Vervangen door gebronde meting. Zelf nagekeken op de Gallup-pagina (7-10-2026): "it was resumed, on average, in 23 minutes and 15 seconds". Rapport 058 #1.

### 059 ai-voor-je-administratie-bonnen-facturen-uren
Geen wijzigingen (alleen KLOPT en illustratieve getallen).

### 060 ai-training-voor-je-team-wat-moet-erin
1. Oud: "In een team van tien zitten meestal drie groepen."
   Nieuw: "In de meeste teams die ik zie, zitten drie groepen."
   Reden: GEEN BRON, geen onderzoek naar deze verdeling. Nu als eigen waarneming gebracht (zie ook JOHN BEVESTIGT). Rapport 060 #1.

### 061 waarom-ai-projecten-in-het-mkb-stuklopen
1. Oud: "dan valt het systeem om op de dertig procent die daar niet in past."
   Nieuw: "dan valt het systeem om op het deel van de gevallen dat daar niet in past."
   Reden: GEEN BRON, percentage als gegeven gebracht. Rapport 061-071, 061 #1.

### 062 van-losse-prompt-naar-werkend-systeem
1. Excerpt. Oud: "zit in vier dingen die niks met prompten te maken hebben."
   Nieuw: "zit in drie dingen die niks met prompten te maken hebben."
   Reden: ONJUIST, interne tegenspraak: de tekst zegt "Die drie extra onderdelen". Rapport 062 #1.

### 063 ai-in-de-bouw-en-installatie
Geen wijzigingen.

### 064 wat-is-een-custom-gpt
1. Oud: "Ook niet geschikt voor alles wat iets moet doen in plaats van iets moet vertellen. Een factuur aanmaken, een afspraak verzetten, een regel in je systeem wegschrijven: daar heb je een koppeling voor nodig, geen chatvenster. Dat is het verschil met een echte agent, waar meer over staat in [...]"
   Nieuw: "Ook minder geschikt voor alles wat iets moet doen in plaats van iets moet vertellen. Een factuur aanmaken, een afspraak verzetten, een regel in je systeem wegschrijven: daarvoor moet de GPT via een koppeling (een zogeheten Action) bij je systeem kunnen, en dat vraagt technisch werk. Dan schuif je richting een echte agent, waar meer over staat in [...]"
   Reden: ONJUIST (onvolledig). Een custom GPT kan via Actions externe systemen aanroepen. https://genai.byu.edu/creating-gpt-actions en https://www.unilink.us/blog/custom-gpts-guide-2026 (rapport 064 #1). "niet" naar "minder" zodat de inleidende zin niet meer stelt dat het principieel niet kan.
2. Oud: "Je bouwt niks, je koppelt niks, en je bent binnen een uur klaar."
   Nieuw: "Je bouwt niks, je koppelt niks, en je bent binnen een uur klaar. Je hebt wel een betaald ChatGPT-abonnement nodig om er een te maken, gebruiken kan ook met een gratis account."
   Reden: ontbrekend feit bij "goedkoopste manier": maken vraagt een betaald abonnement (Plus of zakelijk). https://www.unilink.us/blog/custom-gpts-guide-2026 en https://ai-toolbox.co/chatgpt-management-and-productivity/how-to-create-custom-gpts-walkthrough-2026 (rapport 064 #2).

### 065 ai-voor-je-klantenservice
1. Oud: "Voor jou halveert de tijd per vraag."
   Nieuw: "Voor jou scheelt het per vraag een flink deel van de zoek- en typtijd."
   Reden: GEEN BRON voor een halvering. Rapport 065 #1.

### 066 je-eigen-documenten-aan-ai-koppelen
1. Oud: "dan komen die er alle vier in en dan kiest het systeem er willekeurig een."
   Nieuw: "dan komen die er alle vier in, en welke versie in het antwoord terechtkomt hangt af van welke tekst het meest op de vraag lijkt. Soms mengt het systeem ze zelfs."
   Reden: ONJUIST (technisch). Retrieval kiest op gelijkenis, niet willekeurig. Rapport 066 #1, https://community.openai.com/t/who-has-had-success-with-adding-many-or-large-documents-to-the-knowledge-section/498177
2. Oud: "want zonder eigenaar veroudert het binnen een half jaar zonder dat iemand het merkt."
   Nieuw: "want zonder eigenaar veroudert het ongemerkt."
   Reden: GEEN BRON voor de termijn. Rapport 066 #2.

### 067 ai-voor-planning-en-logistiek
1. Oud: "dan zie je binnen een uur waar je structureel te krap of te ruim zit."
   Nieuw: "dan zie je snel waar je structureel te krap of te ruim zit."
   Reden: interne tegenspraak binnen de blog: dezelfde vergelijking (gepland naast werkelijk) "kost een dag" in de volgende sectie. Rapport 067 #1 en #2. "Dat kost een dag" is blijven staan (eigen inschatting, zie JOHN BEVESTIGT).

### 068 wat-is-een-uur-tijdwinst-waard
1. Oud: "Meestal is het antwoord: uit een onderzoek van een partij die AI verkoopt."
   Nieuw: "Vaak is het antwoord: uit een onderzoek van een partij die AI verkoopt."
   Reden: GEEN BRON, "meestal" is een generalisatie zonder telling. Rapport 068 #2.
2. Oud: "Mensen onderschatten repetitief werk consequent."
   Nieuw: "In mijn ervaring onderschatten mensen hoeveel tijd repetitief werk kost."
   Reden: GEEN BRON, gebracht als algemene wetmatigheid. Rapport 068 #1.

### 069 ai-die-je-al-betaalt-microsoft-365-google-workspace
1. Oud: "Een verslag maken van een online overleg, met de actiepunten eruit"
   Nieuw: "Een verslag maken van een online overleg, met de actiepunten eruit (bij Google vanaf Business Standard, bij Microsoft alleen met een betaalde Copilot-licentie)"
   Reden: ONJUIST voor de basisabonnementen. Teams-vergaderverslagen vallen onder de betaalde Microsoft 365 Copilot-licentie (https://support.microsoft.com/topic/understanding-the-different-microsoft-copilot-experiences-cfff4791-694a-4d90-9c9c-1eb3fb28e842), "Take notes for me" in Meet zit vanaf Business Standard (https://support.google.com/mail/answer/13952129). Rapport 069 #1.
2. Oud: "Zoeken door je eigen mappen en mail op betekenis in plaats van op exacte woorden"
   Nieuw: "Zoeken door je eigen mappen en mail op betekenis in plaats van op exacte woorden (bij Microsoft alleen met de betaalde Copilot-licentie, bij Google deels al in het basispakket)"
   Reden: ONJUIST voor Microsoft zonder Copilot-licentie. Zelfde Microsoft-bron. Google: AI-overzicht in Gmail-zoeken vanaf Business Starter, Drive-zoeken met Gemini vanaf Business Standard (https://support.google.com/mail/answer/13952129). Rapport 069 #2.

### 070 ai-en-je-personeel-verdwijnt-er-werk
1. Oud: "Dat gebeurt in het MKB bijna nooit, en als je daarop stuurt gaat het meestal mis."
   Nieuw: "Dat zie ik in het MKB zelden gebeuren, en als je daarop stuurt gaat het meestal mis."
   Reden: GEEN BRON, gebracht als algemeen feit. Nu als eigen waarneming. Rapport 070 #1.

### 071 passief-inkomen-website-google-adsense
1. Oud: "Zorg dat er minstens vijftien artikelen met echte inhoud op je site staan voordat je een account aanvraagt."
   Nieuw: "Google noemt zelf geen minimumaantal artikelen, maar zorg dat er een flink aantal artikelen met echte inhoud op je site staat voordat je een account aanvraagt."
   Reden: GEEN BRON als Google-regel. Google noemt geen minimum, vijftien is een vuistregel van derden (https://www.lilachbullock.com/how-many-blog-posts-before-applying-for-adsense/, https://freeacademy.ai/lessons/adsense-requirements). Getal weggelaten. Rapport 071 #1.
2. Oud: "Het systeem heeft tijd nodig om te leren welke advertenties bij jouw onderwerp en jouw bezoekers passen. In de eerste maanden valt de opbrengst daardoor vaak tegen, en daarna kruipt hij langzaam omhoog."
   Nieuw: "Advertenties worden pas goed afgestemd als Google je pagina's heeft bekeken. In het begin kan de opbrengst daardoor tegenvallen."
   Reden: GEEN BRON. Google's helpcentrum noemt alleen dat er pas advertenties komen na het crawlen (https://support.google.com/adsense/answer/10196), geen leerperiode van maanden. Termijn weggelaten (rapportvoorstel "dagen tot een paar weken" leunt alleen op een forum). Rapport 071 #2.
3. Oud: "dus zie dit als een orde van grootte en niet als een belofte."
   Nieuw: "dus zie dit als een orde van grootte en niet als een belofte. Google publiceert zelf geen gemiddelden."
   Reden: GEEN BRON voor "een paar euro per duizend weergaven", al wel als schatting gebracht. Eerlijkheidszin toegevoegd. Rapport 071 #3.
4. Oud: "wat voor een MKB-site in Nederland al netjes is."
   Nieuw: "wat voor veel MKB-sites al netjes is."
   Reden: GEEN BRON, geen benchmark gevonden. Rapport 071 #4.
5. Oud: "levert meer op dan duizenden banner-vertoningen. Voorwaarde: je noemt het gewoon, en je beveelt niks aan dat je zelf niet zou nemen."
   Nieuw: "levert vaak meer op dan duizenden banner-vertoningen. Voorwaarde: je vermeldt duidelijk dat het een affiliate-link is, dat is ook wettelijk verplicht, en je beveelt niks aan dat je zelf niet zou nemen."
   Reden: GEEN BRON voor "levert meer op" (rapport 071 #5), en de vermelding is wettelijk verplicht, niet alleen netjes: reclame moet herkenbaar zijn, https://ondernemersplein.overheid.nl/wetten-en-regels/regels-voor-reclame/ (rapport 071 #11).

Controle na afloop: geen em-dash, en-dash of puntkomma in de toegevoegde regels; tsc --noEmit op beide bestanden geeft geen syntaxfout; laatste post (telefoonfilmpje-sprookje-waar-ai-de-mist-in-ging) byte-gelijk aan het origineel. Geen npm run build gedraaid.

## Niet gewijzigd: open punten

### WACHT OP DATUMKEUZE (1)
1. 047 t/m 050: datums 2 t/m 12 juni 2026, maar de posts staan pas op 3 juli 2026 voor het eerst in git en bouwen op SERIE-PLAN.md van 2 juli (rapport 041-050, "Opmerking buiten de tabellen"). John beslist of de datums blijven.

### WACHT OP AANBODKEUZE (2)
1. 049 (rapport #5, VEROUDERD): lijstpunt "Een agent die op maat gebouwd is: geen abonnement maar een bouwtraject, op aanvraag en per situatie" en "dat bespreken we altijd per bedrijf, op aanvraag" botsen met de vaste bedragen op /ai sinds 14-7-2026 (proef €750, bouw €2.500 tot €8.500, beheer vanaf €250 per maand). "Geen abonnement" botst ook met dat maandbedrag. 056 stap 3 linkt hiernaar voor "bedragen in dezelfde orde van grootte".
2. 056 (rapport #1, ONJUIST tegenover eigen site): de blog zegt dezelfde stappen te volgen als /werkwijze, maar slaat stap 03 "Vervolg, je tweede brein" over en splitst bouwen en beheren in twee stappen (lib/constants.ts METHOD_STEPS).

### JOHN BEVESTIGT (27 die een besluit vragen, plus 7 die al kloppen met de site)
1. 047 #1: "Het zijn de drie taken die het vaakst terugkomen als ik met ondernemers hun week doorneem" (geen telling gevonden).
2. 047 #2: "Veel ondernemers zeggen tegen mij ..." (bron lijkt de KNAB-webinar-chat).
3. 048 #2: "Een vraag die ik regelmatig krijg" / "Een zorg die ik vaak hoor" (letterlijk uit de webinar-chat, één bron).
4. 049 #9: "Een vraag die ik regelmatig krijg" / "Een opmerking die ik vaak terugkrijg" (webinar-chat), idem intro "Een vraag die bijna iedereen me stelt".
5. 050 #1: "Die vraag hoor ik geregeld" (webinar-chat).
6. 052 #2: de offerte-agent die "een paar korte vragen stelt" en de offerte klaarzet, werkt die echt zo?
7. 052 #3: "Van een uur naar een paar minuten" (en "wordt een paar minuten"), eigen ervaring, niet gemeten.
8. 053 #5: "Ik hoor ook weleens ... een aparte laptop voor het AI-werk".
9. 054 #2: anekdote over de AI-contentstrategie die niet paste.
10. 055 #1: geciteerde reacties ("ik werk met mijn handen ...", "ik repareer klassieke auto's ...") en "die ik vaak hoor".
11. 056 #3: werkend proof of concept aan het eind van één workshopdag, lukt dat in de praktijk?
12. 056 #5: "ken ik de bedrijven in deze regio" (voorstel: "ken ik de regio en de manier van zakendoen hier").
13. 057 #1 TITEL: "AI voor je offertes: van een uur naar tien minuten" heeft geen bron en botst met 052 ("een paar minuten"). Titel niet aangeraakt, John kiest (bijv. "van typen naar controleren").
14. 060 #1: na correctie "In de meeste teams die ik zie, zitten drie groepen", klopt dit als eigen waarneming?
15. 060 #2: "Bijna elk bedrijf dat ik spreek heeft inmiddels wel iemand op een AI-cursus gehad".
16. 061 #2: "loop ik bij een nieuw traject altijd een aantal echte gevallen door".
17. 061 #3: "twee weken" als termijn, terwijl de gelinkte blog 042 "een proces, een week" zegt. Eén termijn kiezen over de blogs heen.
18. 062 #2: "weken developertijd ... nu vaak een kwestie van dagen".
19. 062 #3: "Dat kost een middag".
20. 063 #3: de (anonieme) klantervaring met de tekeningen publiek laten staan?
21. 067 #2: "Dat kost een dag" (half jaar aan gegevens vergelijken).
22. 067 #3: "In bijna elk bedrijf staat er in de planning een standaardduur die niemand ooit heeft nagerekend".
23. 068 #3: "Bij bijna iedereen valt dat getal hoger uit dan verwacht".
24. 069 #6: "Bijna altijd betaalt men al ... en bijna altijd wordt de AI die daarin zit niet gebruikt".
25. 070 #3: "In het MKB zie ik zelden dat er banen verdwijnen" (en 070 #1, nu ook als eigen waarneming geformuleerd).
26. 070 #4: "het verhaal dat klopt voor bedrijven van tien tot honderd man".
27. 071 #12: "op zakelijke sites die serieus klanten willen werven bijna nooit advertenties".
Al consistent met /ai of /werkwijze, geen actie nodig: 047 #3, 048 #3, 049 #10, 050 #2, 052 #4, 055 #3, 056 #6 (bouwen en beheren vanuit Bladel in heel Brabant).

### Bewust niet gewijzigd (buiten de opdracht, ter info)
- KLOPT met een optionele aanscherping: 049 #7 (dollars zonder btw, in NL ca. 22 tot 23 euro), 051 #2/#3, 053 #3, 056 #4, 059 #1, 064 #4, 065 #2, 069 #3/#4, 070 #2, 071 #7 (uitbetaaldrempel €70), 071 #9, 071 #10.
- NIET KUNNEN VERIFIËREN (mening of voorspelling): 051 #6, 058 #3, 059 #4, 063 #4, 069 #7.
- 057 #5 "je voelt binnen twee weken of het scheelt": GEEN BRON volgens rapport, maar staat er als vuistregel/advies en past bij John's tweewekenhorizon. Laten staan, eventueel "je merkt snel of het scheelt".
