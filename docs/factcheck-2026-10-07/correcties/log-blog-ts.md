# Logboek factcheck-correcties lib/blog.ts (blogs 001 t/m 014)

7 oktober 2026. Bestand: `00-future-content/website/fc-rebrand/lib/blog.ts`. Bronnen: `docs/factcheck-2026-10-07/rapport-blogs-001-010.md` en `rapport-blogs-011-020.md` (secties 011 t/m 014).
Toegepast met `scratchpad/fixes/apply_blog_ts.py` (elke oude tekst moest precies één keer voorkomen, anders stopt het script). Syntaxcheck: `typescript.transpileModule` gaf 0 diagnostics. Geen build gedraaid, niet gecommit.

36 vervangingen. Waar een rapportbron niet door mij geopend kon worden staat dat erbij.

## Wijzigingen

### 001 meer-bezichtigingen-met-video-2025

1. Excerpt
   - Oud: "In 3 seconden bepalen ze of ze klikken of scrollen. Video wint altijd. Hier is waarom."
   - Nieuw: "In een paar seconden bepalen ze of ze klikken of scrollen. Video geeft je advertentie een voorsprong. Hier is waarom."
   - Reden: GEEN BRON (3 seconden, geen funda-meting; "wint altijd" absoluut). Rapport 001 #2 en #6.
2. Alinea
   - Oud: "De gemiddelde koper bekijkt tientallen woningen per sessie. De beslissing om te klikken of niet neemt hij in minder dan 3 seconden."
   - Nieuw: "Een koper bekijkt in één avond al snel heel wat woningen. De beslissing om te klikken of niet neemt hij in een paar seconden."
   - Reden: GEEN BRON (tientallen per sessie, 3 seconden). Rapport 001 #2 en #3. Facebook-feedonderzoek gaat over social feeds, niet funda: https://www.marketingdive.com/news/facebook-why-mobile-video-ads-must-work-fast/446217/
3. Tussenkop
   - Oud: "Wat de cijfers zeggen"
   - Nieuw: "Wat video oplevert"
   - Reden: GEEN BRON, er staat geen enkel herleidbaar cijfer onder de kop. Rapport 001 #5.
4. Lijstpunt
   - Oud: "Woningen met video krijgen gemiddeld 40% meer kliks op Funda"
   - Nieuw: "Een woning met video valt op tussen de advertenties met alleen foto's"
   - Reden: GEEN BRON voor 40%. Het rapport stelt funda's eigen "één op de vier"-cijfer voor, maar dat komt uit een zoekfragment achter een botcheck en John moet het eerst zelf checken. Daarom zonder getal. Wil John het funda-cijfer: https://www.funda.nl/voormakelaars/artikel-makelaar/waarom-video-op-funda-belangrijk-is/
5. Lijstpunt
   - Oud: "Verkopers ervaren makelaars met video als professioneler en kiezen hen eerder"
   - Nieuw: "Een video laat een verkoper meteen zien hoe jij zijn woning gaat presenteren"
   - Reden: GEEN BRON (onderzoeksclaim zonder bron, het rondgaande 73% is een oud Amerikaans NAR-cijfer). Rapport 001 #4.
6. Quote
   - Oud: "Iedere keer weer verrast hoe mooi het resultaat is. Hij denkt ontzettend goed mee en echt niets is voor hem te veel."
   - Nieuw: "Iedere keer weer zijn we verrast hoe mooi het resultaat is van de video's die John maakt. Hij denkt ontzettend goed mee, komt keer op keer met nieuwe creatieve ideeën en echt niets is voor hem te veel."
   - Reden: citaat was niet letterlijk. Nu de eerste twee zinnen letterlijk uit de Google-review van Anita Fiers (`lib/constants.ts`, REVIEWS). Naam niet toegevoegd, de quote-weergave heeft geen veld daarvoor. Rapport 001 #7.

### 003 eerste-3-seconden-bepalen-alles

7. Excerpt
   - Oud: "Je hebt precies 3 seconden om iemand te stoppen met scrollen. Daarna haken ze af. Dit zijn de hooks die wél werken."
   - Nieuw: "Je hebt een paar seconden om iemand te laten stoppen met scrollen. Dit zijn de hooks die wél werken."
   - Reden: GEEN BRON, te stellig. Facebook-data: van wie de eerste 3 seconden kijkt, kijkt 65% minstens 10 seconden. https://www.marketingdive.com/news/facebook-why-mobile-video-ads-must-work-fast/446217/ Rapport 003 #1. Titel ("De eerste 3 seconden bepalen alles") niet aangeraakt.

### 004 ai-content-wie-staat-voor-de-camera

8. Excerpt
   - Oud: "Maar het éne wat AI niet kan: jouw gezicht, jouw stem, jouw verhaal. En dat is precies wat converteert."
   - Nieuw: "Het kan inmiddels zelfs je gezicht en stem nabootsen, maar niet jouw echte verhaal en de mensen die jou kennen. En dat is precies wat converteert."
   - Reden: ONJUIST. In mei 2025 kon AI gezicht en stem al nabootsen (HeyGen Digital Twin, stemklonen via ElevenLabs). https://www.heygen.com/avatar Rapport 004 #1.
9. Intro
   - Oud: "Maar er is één ding dat AI nog altijd niet kan repliceren: jij."
   - Nieuw: "Sommige bootsen zelfs je gezicht en stem na. Maar jouw echte verhaal en het vertrouwen van mensen die jou kennen, dat kan AI niet namaken."
   - Reden: ONJUIST, zelfde bron als hierboven. Rapport 004 #1.

### 005 video-vs-advertenties-wat-werkt-beter

10. Excerpt
    - Oud: "Veel MKB'ers geven maandelijks honderden euro's uit aan Meta-advertenties."
    - Nieuw: "Veel MKB'ers stoppen elke maand geld in Meta-advertenties."
    - Reden: GEEN BRON voor het bedrag. Rapport 005 #4.
11. Lijstpunt
    - Oud: "Bereik dat niet stopt als je budget stopt"
    - Nieuw: "Bereik dat niet meteen wegvalt als je budget stopt"
    - Reden: GEEN BRON, te stellig (een post krijgt het meeste bereik in de eerste dagen). Rapport 005 #3.
12. Lijstpunt
    - Oud: "Hogere conversie op je contactpagina (warm verkeer vs koud)"
    - Nieuw: "Wie je al kent via je video's, neemt sneller contact op"
    - Reden: GEEN BRON, leest als gemeten conversie. Rapport 005 #2.
13. Lijstpunt
    - Oud: "Lagere kosten per lead over tijd"
    - Nieuw: "Op termijn betaal je minder per aanvraag, omdat je niet voor elk bereik hoeft te betalen"
    - Reden: GEEN BRON, leest als gemeten kostencijfer. Rapport 005 #1.

### 007 van-nul-naar-viral-anatomie

14. Alinea
    - Oud: "werkt het 'achter-de-schermen' format ongelooflijk goed."
    - Nieuw: "werkt het 'achter-de-schermen' format vaak goed."
    - Reden: GEEN BRON, geen meting. Rapport 007 #1.

### 008 vastgoedvideo-funda-proof

15. Lijstpunt
    - Oud: "Formaat: 16:9 horizontaal (breedbeeldfoto)"
    - Nieuw: "Formaat: 16:9 horizontaal (breedbeeld)"
    - Reden: "breedbeeldfoto" klopt niet voor video. Rapport 008 #5.
16. Lijstpunt
    - Oud: "Bestandsformaat: MP4 (H.264 codec)"
    - Nieuw: "Bestandsformaat: MP4 (H.264) is de veiligste keuze, al accepteert Funda ook andere formaten"
    - Reden: ONJUIST als eis, funda accepteert o.a. WMV, AVI, MOV, MKV, WebM. Rapport 008 #2.
17. Lijstpunt
    - Oud: "Maximale bestandsgrootte: afhankelijk van uploadmethode"
    - Nieuw: "Maximale bestandsgrootte: 1 GB"
    - Reden: ONJUIST (te vaag), funda-helpdesk noemt 1024 MB. Rapport 008 #1. Let op: bron is een zoekfragment van https://help.fundadesk.nl/s/article/360021764979-Wat-zijn-de-specificaties-voor-een-video . Ik kreeg die pagina zelf ook niet geladen (Salesforce-laadscherm) en vond het via WebSearch niet terug. Dus niet door mij gecontroleerd: John, check dit en punt 16 even op de helpdesk.
18. Lijstpunt
    - Oud: "Geen watermerken of tekst-overlays die het beeld blokkeren"
    - Nieuw: "Geen Funda-eis, wel een tip: houd het beeld vrij van grote logo's en tekst"
    - Reden: NIET KUNNEN VERIFIËREN als funda-eis, terwijl het onder de kop "De technische eisen van Funda" staat. Nu als eigen tip. Rapport 008 #3.

### 009 verticale-video-nieuw-standaard

19. Intro
    - Oud: "Meer dan 70% van alle video content wordt nu bekeken op een telefoon, in portretmodus."
    - Nieuw: "Het grootste deel van alle video wordt inmiddels op een telefoon bekeken."
    - Reden: GEEN BRON (70%, "in portretmodus" niet onderbouwd). Rapport 009 #3.
20. Lijstpunt
    - Oud: "Instagram: Reels (9:16) krijgen 30-40% meer bereik dan vierkante of horizontale posts"
    - Nieuw: "Instagram: Reels (9:16) bereiken gemiddeld meer mensen dan foto's en carrousels"
    - Reden: GEEN BRON voor 30-40%. Socialinsider meet ongeveer het dubbele bereik voor Reels, maar het rapport vraagt dat eerst zelf te checken, dus zonder getal. https://www.fanpagekarma.com/insights/instagram-format-reach/ Rapport 009 #2.
21. Lijstpunt
    - Oud: "TikTok: uitsluitend verticaal, anders past je content letterlijk niet"
    - Nieuw: "TikTok: gebouwd voor verticaal. Liggende video kan, maar vult het scherm niet"
    - Reden: ONJUIST, TikTok ondersteunt liggende video en promootte die in 2023. https://www.socialmediatoday.com/news/tiktok-is-encouraging-some-creators-to-post-videos-in-landscape-format/705914/ Rapport 009 #1.
22. Lijstpunt
    - Oud: "YouTube Shorts: de snelst groeiende feature van YouTube, volledig verticaal"
    - Nieuw: "YouTube Shorts: volledig verticaal en volgens YouTube-topman Neal Mohan goed voor [gemiddeld 200 miljard weergaven per dag](https://www.tubefilter.com/2025/06/18/youtube-shorts-200-billion-daily-views-google-veo-3-ai-neal-mohan/) (juni 2025)"
    - Reden: NIET KUNNEN VERIFIËREN ("snelst groeiend" als feit zonder bron). Vervangen door een gemeten getal met link. Bron door mij geopend op 7-10-2026: Mohan, Cannes Lions 18-6-2025, "Shorts now averages 200 billion daily views". Valt vóór de publicatiedatum 2025-10-08. Rapport 009 #4.

### 010 lokale-zichtbaarheid-via-video

23. Alinea
    - Oud: "Instagram en TikTok tonen content aan mensen in de buurt van waar het gefilmd is, zeker als je locatietags gebruikt. Een video gemaakt in Bladel of Veldhoven bereikt precies de mensen die ook in die regio wonen."
    - Nieuw: "Met een locatietag word je vindbaar voor mensen die op die plek zoeken. Gebruik hem dus altijd, ook al bepaalt hij niet alleen wie je video ziet."
    - Reden: ONJUIST. Instagram noemt locatie niet bij de belangrijkste signalen (https://www.socialmediatoday.com/news/instagram-shares-algorithm-2025/738034/), TikTok's Nearby-feed bestond op de publicatiedatum nog niet (https://techcrunch.com/2025/12/04/tiktok-rolls-out-a-nearby-feed-to-display-local-content-in-select-countries). Rapport 010 #1.
24. Lijstpunt
    - Oud: "Post op tijdstippen dat jouw doelgroep actief is (17:00–20:00 en 21:00–23:00)"
    - Nieuw: "Post op momenten dat jouw doelgroep actief is. Die tijden zie je in de statistieken van je eigen account"
    - Reden: GEEN BRON voor de twee tijdsblokken. Rapport 010 #2.

### 011 2025-terugblik-wat-werkte

25. Lijstpunt
    - Oud: "Video's zonder hook: 70% haakt af in de eerste seconde"
    - Nieuw: "Video's zonder hook: een groot deel van de kijkers haakt in de eerste seconden al af"
    - Reden: GEEN BRON, 70% in één seconde ligt ver boven elke gevonden meting. Het rapportvoorstel ("in onze eigen statistieken") heb ik niet overgenomen, want dat zou een eigen meting claimen die niet is nagegaan. Rapport 011 #1.

### 012 ai-content-laten-maken-dit-eerst

26. Alinea
    - Oud: "Een AI-avatar die jou imiteert zonder dat er echte opnames van jou zijn, klinkt generiek, ziet er nep uit en converteert niet."
    - Nieuw: "Een AI-avatar heeft maar een paar minuten opname van je nodig om je gezicht en stem na te doen, maar jouw verhalen en manier van uitleggen haalt hij daar niet uit. Die moeten ergens vandaan komen."
    - Reden: ONJUIST in opzet, zo'n avatar bestaat niet zonder opnames. HeyGen Digital Twin: minimaal 15 seconden, aanbevolen circa 2 minuten. https://www.heygen.com/academy/avatars/how-to-create-a-Digital-Twin Rapport 012 #2.
27. Lijstpunt
    - Oud: "Bouw een bibliotheek van honderden minuten footage op"
    - Nieuw: "Bouw een bibliotheek op van echte video's waarin jouw stijl en verhalen zitten"
    - Reden: ONJUIST, voor een avatar of stemkloon zijn geen honderden minuten nodig (zelfde HeyGen-bron, ElevenLabs PVC: 30 minuten tot 3 uur, https://elevenlabs.io/docs/product-guides/voices/voice-cloning/professional-voice-cloning). Rapport 012 #1. Het punt "Sla alle footage op in hoge kwaliteit, dit wordt straks je trainingsdata" is blijven staan, dat klopt op zichzelf.
28. Alinea
    - Oud: "zodat hij over twee jaar een AI heeft die 24/7 voor hem werkt, in zijn eigen stem en stijl."
    - Nieuw: "zodat hij straks een AI kan inzetten die in zijn eigen stem en stijl werkt, gevoed met echt materiaal."
    - Reden: GEEN BRON, voorspelling die bovendien technisch al kan. Rapport 012 #3.

### 013 trouwen-in-europa-2026

29. Excerpt
    - Oud: "Steeds meer Nederlandse stellen kiezen voor een trouwlocatie in Europa."
    - Nieuw: "Een trouwlocatie in Europa is voor veel Nederlandse stellen een serieuze optie geworden."
    - Reden: GEEN BRON voor een stijging. Rapport 013 #3.
30. Tussenkop
    - Oud: "Waarom steeds meer stellen kiezen voor een bruiloft in Europa"
    - Nieuw: "Waarom stellen kiezen voor een bruiloft in Europa"
    - Reden: GEEN BRON, zelfde trendclaim. Rapport 013 #3.
31. Lijstpunt Wenen
    - Oud: "Paleizen, tuinen en een stad met karakter, op een paar uur rijden van Nederland."
    - Nieuw: "Paleizen, tuinen en een stad met karakter, op een dag rijden van Nederland."
    - Reden: ONJUIST, Eindhoven-Wenen is ruim 1.000 km over de weg. "zonder vliegtuig" laten staan, dat klopt. Nachttrein-variant niet gebruikt (niet gecheckt). Rapport 013 #1.
32. Alinea beschikbaarheid
    - Oud: "2026 is voor veel stellen het jaar waarop ze hun uitgestelde droombruiloft eindelijk laten plaatsvinden. Zomerse weekenden ..."
    - Nieuw: "Zomerse weekenden ..." (eerste zin geschrapt)
    - Reden: GEEN BRON, de inhaalgolf van uitgestelde bruiloften lag in 2021-2022. Rapport 013 #2.

### 014 slim-subsidie-aanvragen

33. Excerpt
    - Oud: "De SLIM-subsidie helpt MKB-bedrijven bij scholing en ontwikkeling van personeel. Ook een AI-training kan daaronder vallen. Dit is wat je moet weten voor je een aanvraag start."
    - Nieuw: "De SLIM-subsidie helpt MKB-bedrijven het leren en ontwikkelen van personeel op te zetten. Wat er wel en niet onder valt, lees je hier."
    - Reden: ONJUIST (misleidend), de reguliere SLIM-regeling vergoedt opleidingskosten niet. https://www.salarisvanmorgen.nl/2020/02/12/slim-regeling-vragen-en-antwoorden-over-mkb-subsidie/ en https://khn.nl/nieuws/de-slim-subsidie-vanaf-19-augustus-kun-je-m-weer-aanvragen Rapport 014 #3.
34. Intro
    - Oud: "Het is een subsidie van de overheid voor bedrijven die willen investeren in de ontwikkeling van hun personeel, en een AI-training kan daar onder omstandigheden onder vallen."
    - Nieuw: "Het is een subsidie van de overheid voor bedrijven die het leren en ontwikkelen van hun personeel structureel willen aanpakken. De training zelf wordt niet vergoed, maar bijvoorbeeld wel een doorlichting met een opleidingsplan of het invoeren van een manier van leren op de werkvloer, en daar kan AI een onderdeel van zijn."
    - Reden: ONJUIST (misleidend), zelfde bronnen. Rapport 014 #3. Kanttekening: de aparte SLIM-scholingssubsidie 2025-2027 vergoedt wel opleidingen, maar alleen in tekortsectoren (o.a. ICT, techniek, zorg).
35. Lijstpunt
    - Oud: "Er is een beperkt subsidieplafond. Op is op, ook binnen een aanvraagperiode."
    - Nieuw: "Er is een beperkt budget per ronde. Wordt er meer aangevraagd dan er is, dan wordt er geloot. Vroeg indienen geeft dus geen voorsprong, een complete aanvraag binnen de termijn wel."
    - Reden: ONJUIST, bij overtekening wordt geloot. https://www.sra.nl/nieuws/259001/2026/04/aanvraag-slim-eerste-tijdvak-uiterlijk-4-mei-2026 (door mij bevestigd via zoekresultaat Knab-bieb). Rapport 014 #2.
36. Lijstpunt
    - Oud: "Check dat altijd bij de actuele voorwaarden van RVO, niet bij een oude blogpost."
    - Nieuw: "Check dat altijd bij de actuele voorwaarden van [Uitvoering van Beleid SZW](https://www.uitvoeringvanbeleidszw.nl/), niet bij een oude blogpost."
    - Reden: ONJUIST, SLIM wordt uitgevoerd door Uitvoering van Beleid SZW, niet RVO. URL door mij gecontroleerd (HTTP 200). Rapport 014 #1.

## Niet gewijzigd

### WACHT OP DATUMKEUZE (1)

- Algemeen, blogs 001 t/m 011: gedateerd februari t/m december 2025, terwijl de vroegste commit in de repo van 24-02-2026 is (rapport 001-010, kanttekening bovenaan). Geen `date`-veld aangeraakt. De correcties hierboven zijn zo gekozen dat ze bij beide datums kloppen. Eén aandachtspunt: het Shorts-getal in 009 (juni 2025) past bij de huidige datum 2025-10-08, maar zou bij een latere datum verouderen.

### WACHT OP AANBODKEUZE (5)

- 002 shoot-dag-maanden-content: shootritme en opbrengst. Excerpt en alinea zeggen "één dag per maand", titel en tekst zeggen "drie maanden content" en "een heel kwartaal". "6 tot 9 video-onderwerpen" tegenover "3–9 afgewerkte video's" spreekt zichzelf tegen, en 9 komt in geen pakket voor (site: 1 shootmoment per kwartaal bij Start en Instagram Reels, per maand bij Premium). Interne tegenspraak, maar de oplossing hangt aan het pakket, dus niet aangeraakt. Rapport 002 #1 t/m #3.
- 006 content-batching-slimste-manier: "gemiddeld 2 tot 4 uur" tegenover "3-4 uur op locatie" op de site, en "één moment per maand" (alinea, excerpt, cta "Eén dag per maand. Maanden aan content.") tegenover kwartaalshoots bij twee van de drie pakketten. Rapport 006 #1 en #2.
- 008 vastgoedvideo-funda-proof: cta "Vanaf €199." (site: €199 excl. btw, dus eventueel "excl. btw" erbij). Rapport 008 #6.
- 009 verticale-video-nieuw-standaard: Compleet pakket met verticale teaser (klopt nu met de site, maar hangt aan het aanbod). Rapport 009 #6.
- 014 slim-subsidie-aanvragen: alinea "Hoe ik hierin kan helpen" (de workshop en training zo beschrijven dat je een aanvraag kunt beoordelen). Na de correctie zegt de intro dat de training zelf niet vergoed wordt. Ook de alinea "Een training waarin je team leert werken met AI kan daar in bepaalde gevallen bij aansluiten" blijft staan. Geen harde tegenspraak, wel even naast elkaar lezen.

### JOHN BEVESTIGT (12)

- 006: levertermijn "Week 3-4: video's worden geedited en opgeleverd" (geen levertermijn voor social op de site). Rapport 006 #3.
- 007: "als je tientallen video's analyseert, zie je patronen" (suggereert eigen analyse). Rapport 007 #2.
- 008: "Elke video die ik oplevert is standaard Funda-proof", terwijl Walkthrough ook als 9:16 voor social kan. Voorstel rapport: "Elke funda-video die ik oplever ...". Rapport 008 #7.
- 009: "Bij Future Content film ik standaard in 9:16 voor social media content." Rapport 009 #7.
- 011: "uit tientallen shoots en honderden video's" tegenover "150+ Video's gemaakt" in totaal op de site. Rapport 011 #4.
- 011: "Te lang (meer dan 90 seconden): dramatische daling in kijktijd" (eigen waarneming zonder meting). Rapport 011 #2.
- 011: "Vastgoedvideo's met drone: significant meer bezichtigingsaanvragen" ("significant" suggereert statistiek, alleen laten staan als Pit dat zo terugkoppelde). Rapport 011 #3.
- 011: "Korte how-to video's (30–45 sec): meest gedeeld" en "Persoonlijke video's ...: hoogste engagement". Rapport 011 #5.
- 011: "accounts die wekelijks posten groeiden sneller dan accounts die sporadisch postten" (bij eigen klanten gemeten?). Rapport 011 #6.
- 013: "Ik reis mee naar jullie locatie" (site noemt De Kempen en omgeving als werkgebied). Rapport 013 #4.
- 013: quote van Mandy staat onder "Ik kom naar jullie toe" en wekt de indruk van een buitenlandse bruiloft. Rapport 013 #5.
- 014: "Ik ben geen subsidie-adviseur en beloof geen percentage of bedrag vooraf." (positionering, geen actie). Rapport 014 #8.

### Overig niet gewijzigd (buiten de opdracht, ter info)

- NIET KUNNEN VERIFIËREN, geen getal: 004 "Vertrouwen ontstaat niet door een gegenereerde avatar." (mening als feit, rapport stelt "Ik geloof niet dat ..." voor), 010 lokale hashtags (effect niet gemeten).
- KLOPT met kanttekening: 003 "beslist in 1 tot 3 seconden" (bron kan erbij), 008 funda toont video in maximaal 720p, 013 Côte d'Azur met lavendelvelden in de Provence (twee regio's in één regel), 014 percentage verschilt vooral per bedrijfsgrootte, minder per ronde.
- Quote zonder spreker: 004 ("over 3 jaar onzichtbaar concurreren").
- Taalfouten (gaan live, niet aangeraakt want geen feitfout): 004 "rytme" (ritme), 006 "geedited" (geëdit), 008 "oplevert" (oplever), 009 "domante" (dominante) en titel "het nieuwe standaard" (de nieuwe standaard, titel en slug niet aanraken zonder John), 013 "aanhält" (aanhoudt) en "iconic" (iconische).
- 014 staat in categorie "AI & Content" terwijl het over subsidie gaat (vindbaarheid, geen feitfout).
