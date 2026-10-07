# Factcheck blogs 001 t/m 010

Gecontroleerd op 7 oktober 2026. Oordeel steeds tegen de publicatiedatum van de blog. Geen infographic-verwijzingen in deze tien blogs.

Algemene kanttekening: de vroegste commit in de website-repo (`fc-rebrand`, branch `nieuwe-huisstijl`) is van 24-02-2026, terwijl deze blogs gedateerd zijn tussen februari en november 2025. Prijzen en pakketten zijn daarom getoetst aan de huidige stand van `lib/constants.ts`, niet aan de stand op de publicatiedatum.

## 001_meer-bezichtigingen-met-video-2025.md
Publicatiedatum 2025-02-12.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Woningen met video krijgen gemiddeld 40% meer kliks op Funda" | GEEN BRON | Geen bron gevonden voor 40% bij funda. Funda zelf noemt (volgens zoekfragment van https://www.funda.nl/voormakelaars/artikel-makelaar/waarom-video-op-funda-belangrijk-is/, pagina zelf achter botcheck, geraadpleegd 07-10-2026) dat voor één op de vier funda-gebruikers een video doorslaggevend is om een bezichtiging te plannen, en een gemiddelde kijkratio van 78%. Het vaak geciteerde "403% meer reacties" (searchlab.nl) is een Amerikaans cijfer zonder herleidbare studie, niet gebruiken. | "Volgens funda is een video voor één op de vier woningzoekers zelfs doorslaggevend om wel of niet een bezichtiging te plannen." (John: open eerst zelf de funda-pagina en check het cijfer letterlijk.) |
| 2 | "In 3 seconden bepalen ze of ze klikken of scrollen" (excerpt) en "De beslissing om te klikken of niet neemt hij in minder dan 3 seconden" | GEEN BRON | Geen funda-specifieke meting gevonden. Algemeen feed-onderzoek van Facebook (2016) meet 1,7 seconde per item op mobiel, maar dat gaat over sociale feeds, niet over funda: https://www.marketingdive.com/news/facebook-why-mobile-video-ads-must-work-fast/446217/ | "Kopers scrollen razendsnel door funda. In een paar seconden bepalen ze of ze klikken." |
| 3 | "De gemiddelde koper bekijkt tientallen woningen per sessie" | GEEN BRON | Niets gevonden. | "Een koper bekijkt in één avond al snel heel wat woningen." of schrappen |
| 4 | "Verkopers ervaren makelaars met video als professioneler en kiezen hen eerder" | GEEN BRON | Staat onder de kop "Wat de cijfers zeggen" maar er staat geen cijfer of bron bij. Het rondgaande "73% van de huiseigenaren kiest eerder een makelaar met video" is een oud Amerikaans NAR-cijfer, niet Nederlands en niet herleidbaar tot een actuele studie. | "Een video laat een verkoper meteen zien hoe jij zijn woning gaat presenteren." |
| 5 | "Kopers die een video bekeken zijn beter voorbereid op de bezichtiging" | GEEN BRON | Ook onder "Wat de cijfers zeggen", zonder cijfer of bron. | Kop wijzigen in "Wat video oplevert" zodat de lijst niet als meting leest. |
| 6 | "Video wint altijd" (excerpt) | GEEN BRON | Absolute bewering, niet te onderbouwen. | "Video geeft je advertentie een voorsprong." |
| 7 | Quote: "Iedere keer weer verrast hoe mooi het resultaat is. Hij denkt ontzettend goed mee en echt niets is voor hem te veel." | KLOPT (inhoud), citaat niet letterlijk | Google-review van Anita Fiers (Pit Makelaars), in repo: `lib/constants.ts` r. 396 en `app/makelaars/page.tsx` r. 581. Origineel: "Iedere keer weer zijn we verrast hoe mooi het resultaat is van de video's die John maakt. Hij denkt ontzettend goed mee, komt keer op keer met nieuwe creatieve ideeën en echt niets is voor hem te veel." | Letterlijk citeren met naam, zoals op /makelaars: "Iedere keer weer zijn we verrast hoe mooi het resultaat is van de video's die John maakt. Hij denkt ontzettend goed mee en echt niets is voor hem te veel." (Anita Fiers, Pit Makelaars, Google-review). Weglating eventueel met (...) aangeven. |

## 002_shoot-dag-maanden-content.md
Publicatiedatum 2025-03-05.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "In een shoot dag van 3–4 uur kun je makkelijk 6 tot 9 video-onderwerpen opnemen" | EIGEN CLAIM | Site (`lib/constants.ts` r. 63, 87, 111): shootmoment van 3-4 uur, opbrengst 1, 2 of 4 Reels per maand. Per kwartaalshoot dus 3 (Start) of 6 (Instagram Reels) video's. 9 komt in geen pakket voor. | John bevestigen. Passend bij de pakketten: "In een shootmoment van drie à vier uur nemen we makkelijk de video's voor een heel kwartaal op." |
| 2 | "Resultaat: 3–9 afgewerkte video's klaar voor publicatie" | EIGEN CLAIM | Spreekt bewering 1 in dezelfde blog tegen (6 tot 9 onderwerpen tegen 3 tot 9 video's). | "Resultaat: drie tot zes afgewerkte video's, klaar om te posten." (afstemmen op pakketten) |
| 3 | "één dag in de maand" (excerpt) en "één dag per maand volledig gericht op opnemen" tegenover titel "Eén shoot dag, drie maanden content" en "genoeg content voor een heel kwartaal" | EIGEN CLAIM | Interne tegenspraak: één dag per maand of één dag per kwartaal. Site: Start en Instagram Reels hebben 1 shootmoment per kwartaal, alleen Premium 1 per maand (`lib/constants.ts` r. 63, 87, 111). | Excerpt: "Met slimme content batching film je één keer per kwartaal en heb je drie maanden lang video's klaarstaan." |
| 4 | "Het algoritme van Instagram en TikTok beloont accounts die regelmatig posten. Niet accounts die de ene week vijf video's posten en de andere week niks." | KLOPT (als correlatie) | Buffer, consistent-posting-onderzoek over 100.000+ gebruikers op o.a. Instagram en TikTok, 29-01-2025: wekelijks posten gaf ruim 5x meer engagement per post dan sporadisch posten. https://buffer.com/resources/consistent-posting-study | Eventueel bron toevoegen: "Onderzoek van Buffer onder meer dan 100.000 accounts laat zien dat wie elke week post, per post vijf keer zoveel reacties krijgt als wie af en toe post." |

## 003_eerste-3-seconden-bepalen-alles.md
Publicatiedatum 2025-04-08.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Je hebt precies 3 seconden om iemand te stoppen met scrollen. Daarna haken ze af." (excerpt) | GEEN BRON | "Precies 3 seconden" en "daarna haken ze af" is te stellig. Facebook-data (2016): van wie de eerste 3 seconden kijkt, kijkt 65% minstens 10 seconden en 45% tot 30 seconden. Mensen haken dus niet allemaal af na 3 seconden. https://www.marketingdive.com/news/facebook-why-mobile-video-ads-must-work-fast/446217/ | "Je hebt een paar seconden om iemand te laten stoppen met scrollen. Dit zijn de hooks die wél werken." |
| 2 | "De gemiddelde kijker beslist in 1 tot 3 seconden of hij doorscrolt of blijft hangen." | KLOPT (met oude bron) | Facebook-onderzoek 2016: op mobiel kijkt men gemiddeld 1,7 seconde naar een item in de feed (desktop 2,5 s); Fors Marsh: herkenning al na 0,25 s. https://www.marketingdive.com/news/facebook-why-mobile-video-ads-must-work-fast/446217/ (2016) | Bron noemen: "Onderzoek van Facebook liet zien dat mensen op hun telefoon gemiddeld nog geen twee seconden naar een bericht kijken voordat ze doorscrollen." |

Overige inhoud (hooks, wat je niet moet doen) is advies, geen toetsbaar feit.

## 004_ai-content-wie-staat-voor-de-camera.md
Publicatiedatum 2025-05-14.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Maar het éne wat AI niet kan: jouw gezicht, jouw stem, jouw verhaal." (excerpt) en "Maar er is één ding dat AI nog altijd niet kan repliceren: jij." | ONJUIST | Op de publicatiedatum kon AI gezicht en stem wel nabootsen: HeyGen (Digital Twin, Avatar IV, voorjaar 2025) maakt een avatar van 3 tot 5 minuten beeld en kloont de stem; stemklonen bestond al langer (o.a. ElevenLabs). https://www.heygen.com/avatar en https://www.heygen.com/blog/heygen-august-2025-release | "AI kan je gezicht en stem inmiddels nabootsen, maar niet jouw echte verhaal en de mensen die jou kennen. En dat is precies wat converteert." |
| 2 | "Vertrouwen ontstaat niet door een gegenereerde avatar." | NIET KUNNEN VERIFIËREN | Mening die als feit leest; geen onderzoek gevonden dat dit meet. | "Ik geloof niet dat vertrouwen ontstaat door een gegenereerde avatar." |

De lijst "Wat AI wél kan doen" (captions, ondertitels vertalen, knippen op ritme, formaten aanpassen, inplannen) klopt; die functies bestonden in 2025 in gangbare tools. Taalfout: "rytme" moet "ritme" zijn. De quote ("over 3 jaar onzichtbaar concurreren") is een voorspelling zonder spreker; geen feit, wel onduidelijk van wie het citaat is.

## 005_video-vs-advertenties-wat-werkt-beter.md
Publicatiedatum 2025-06-10.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Lagere kosten per lead over tijd" | GEEN BRON | Geen onderzoek gevonden dat dit voor organische video bij lokaal MKB meet. | "Op termijn betaal je minder per aanvraag, omdat je niet voor elk bereik hoeft te betalen." of schrappen |
| 2 | "Hogere conversie op je contactpagina (warm verkeer vs koud)" | GEEN BRON | Plausibel marketingprincipe, maar geen meting bij genoemd. | "Wie je al kent via je video's, neemt sneller contact op." |
| 3 | "Bereik dat niet stopt als je budget stopt" | GEEN BRON | Organisch bereik stopt niet abrupt, maar een post krijgt het meeste bereik in de eerste dagen. "Niet stopt" is te stellig. | "Bereik dat niet meteen wegvalt als je budget stopt" |
| 4 | "Veel MKB'ers geven maandelijks honderden euro's uit aan Meta-advertenties." (excerpt) | GEEN BRON | Geen Nederlandse bron gevonden voor het advertentiebudget van MKB'ers. | "Veel MKB'ers stoppen elke maand geld in Meta-advertenties." |

## 006_content-batching-slimste-manier.md
Publicatiedatum 2025-07-09.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Afhankelijk van het pakket: gemiddeld 2 tot 4 uur." | EIGEN CLAIM | Site zegt bij alle drie de social-pakketten "3-4 uur op locatie, uitbreidbaar op verzoek" (`lib/constants.ts` r. 63, 87, 111). 2 uur komt niet voor. | "Reken op drie tot vier uur op locatie, en langer als dat nodig is." |
| 2 | "je plant één moment per maand voor alle opnames" en "Eén dag per maand. Maanden aan content. Dat is het model." en excerpt "Eén dag per maand is genoeg" | EIGEN CLAIM | Site: Start en Instagram Reels hebben één shootmoment per kwartaal, alleen Premium één per maand. | "Je plant één vast shootmoment, per maand of per kwartaal, en de rest van de tijd hoef je er niet aan te denken." |
| 3 | "Week 3-4: video's worden geedited en opgeleverd" | EIGEN CLAIM | Geen levertermijn voor social-pakketten gevonden in `lib/constants.ts`; vastgoed zegt "binnen 1 week". | John bevestigen. Spelling: "geëdit". |
| 4 | "We nemen alles op op jouw locatie. Geen studio (...) Ik kom naar jou toe." | EIGEN CLAIM | Past bij "op locatie" in de pakketten. | Geen wijziging. |
| 5 | "Het resultaat is grillig posten (...) En dat ziet het algoritme." | KLOPT (als correlatie) | Buffer, 29-01-2025: consistente posters krijgen ruim 5x meer engagement per post. https://buffer.com/resources/consistent-posting-study | Geen wijziging nodig. |

## 007_van-nul-naar-viral-anatomie.md
Publicatiedatum 2025-08-06.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Voor kleine en middelgrote bedrijven werkt het 'achter-de-schermen' format ongelooflijk goed." | GEEN BRON | Geen meting genoemd of gevonden. | "Voor kleine bedrijven werkt een kijkje achter de schermen vaak goed." |
| 2 | "Maar als je tientallen video's analyseert, zie je patronen." | EIGEN CLAIM | Suggereert dat John zelf tientallen virale video's analyseerde; niet te bevestigen in `00-future-content`. | John bevestigen, of: "Wie veel gedeelde video's naast elkaar legt, ziet patronen." |

De drie ingrediënten (herkenning, verrassing, waarde) lijken op bekende deelbaarheidsmodellen (o.a. Jonah Berger, Contagious) maar worden niet als onderzoek gepresenteerd; geen probleem. Het rekenvoorbeeld 500 tegen 50.000 weergaven is hypothetisch.

## 008_vastgoedvideo-funda-proof.md
Publicatiedatum 2025-09-03.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Maximale bestandsgrootte: afhankelijk van uploadmethode" | ONJUIST (te vaag) | Funda-helpdesk noemt een maximale bestandsgrootte van 1024 MB (1 GB). Bron: zoekfragment van https://help.fundadesk.nl/s/article/360021764979-Wat-zijn-de-specificaties-voor-een-video (pagina zelf niet te laden, geraadpleegd 07-10-2026). | "Maximale bestandsgrootte: 1 GB" |
| 2 | "Bestandsformaat: MP4 (H.264 codec)" als eis van Funda | ONJUIST (als eis) | Funda accepteert veel formaten: WMV, AVI, MPG, MP4, MOV, MKV, WebM en meer (zelfde helpdeskbron). MP4 is dus geen eis maar wel een veilige keuze. | "Bestandsformaat: MP4 (H.264) is de veiligste keuze, al accepteert funda ook andere formaten." |
| 3 | "Geen watermerken of tekst-overlays die het beeld blokkeren" als technische eis van Funda | NIET KUNNEN VERIFIËREN | Geen funda-regel over watermerken in video gevonden; helpdesk- en huisregelpagina's waren niet te openen. | Verplaatsen naar een eigen tip: "Houd het beeld vrij van grote logo's en tekst." |
| 4 | "Aanbevolen resolutie: 1080p (1920×1080)" | KLOPT (met kanttekening) | Funda toont video maximaal in 720p (1280×720); hoger uploaden mag, maar heeft geen effect op de weergave en verlengt alleen de upload (zelfde helpdeskbron). | "Resolutie: lever 1080p aan; funda toont video zelf in maximaal 720p." |
| 5 | "Formaat: 16:9 horizontaal (breedbeeldfoto)" | KLOPT | Funda-helpdesk: beeldverhouding 16:9, minimaal 609×343 pixels (zelfde bron). | "Formaat: 16:9 horizontaal (breedbeeld)". Het woord "breedbeeldfoto" klopt niet voor video. |
| 6 | "Vanaf €199." | KLOPT (huidige site, excl. btw) | `lib/constants.ts` r. 132 en `app/makelaars/layout.tsx` r. 7: Walkthrough €199 excl. btw per object. Prijs op 03-09-2025 niet te controleren (repo begint 24-02-2026). | "Vanaf €199 excl. btw." |
| 7 | "Elke video die ik oplevert is standaard Funda-proof: correct formaat, goede resolutie" | EIGEN CLAIM | Kanttekening: het Walkthrough-pakket laat de klant kiezen tussen 16:9 voor funda óf 9:16 voor social (`lib/constants.ts` r. 137). Een 9:16-video is niet funda-geschikt. | "Elke funda-video die ik oplever is standaard funda-proof." Taalfout: "oplevert" moet "oplever" zijn. |

## 009_verticale-video-nieuw-standaard.md
Publicatiedatum 2025-10-08.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "TikTok: uitsluitend verticaal, anders past je content letterlijk niet" | ONJUIST | TikTok ondersteunt liggende video en beloonde in 2023 zelfs liggende video's van meer dan 1 minuut met extra weergaven. https://www.socialmediatoday.com/news/tiktok-is-encouraging-some-creators-to-post-videos-in-landscape-format/705914/ (2023) | "TikTok: gebouwd voor verticaal; liggende video kan, maar vult het scherm niet" |
| 2 | "Instagram: Reels (9:16) krijgen 30-40% meer bereik dan vierkante of horizontale posts" | GEEN BRON | Geen bron voor 30-40% gevonden. Socialinsider (2025) meet een bereikratio van ca. 30,8% voor Reels tegen ca. 14,5% voor carrousels en 13,1% voor foto's, dus ruwweg het dubbele. https://www.fanpagekarma.com/insights/instagram-format-reach/ en Socialinsider-samenvattingen (2025) | "Instagram: Reels bereiken volgens Socialinsider gemiddeld ongeveer twee keer zoveel mensen als foto's en carrousels." (John: controleer het Socialinsider-rapport zelf voor je het citeert.) |
| 3 | "Meer dan 70% van alle video content wordt nu bekeken op een telefoon, in portretmodus." | GEEN BRON | Diverse verzamelsites noemen ruim 75% van de videoweergaven op mobiel (zonder herleidbaar primair onderzoek). Het deel "in portretmodus" is niet onderbouwd: niet alle mobiele weergaven zijn staand. | "Het grootste deel van alle video wordt inmiddels op een telefoon bekeken." |
| 4 | "YouTube Shorts: de snelst groeiende feature van YouTube, volledig verticaal" | NIET KUNNEN VERIFIËREN | Geen uitspraak van YouTube gevonden dat Shorts de snelst groeiende functie is. Wel gemeten: gemiddeld 200 miljard weergaven per dag (Neal Mohan, Cannes Lions, juni 2025), tegen 70 miljard in maart 2024. https://www.tubefilter.com/2025/06/18/youtube-shorts-200-billion-daily-views-google-veo-3-ai-neal-mohan/ | "YouTube Shorts: inmiddels gemiddeld 200 miljard weergaven per dag, volledig verticaal" |
| 5 | "LinkedIn: video posts gaan verticaal, ook voor B2B bereik" | KLOPT | LinkedIn testte sinds maart 2024 een verticale videofeed en breidde in 2025 de verticale weergave uit; video-uploads +36% op jaarbasis. https://techcrunch.com/2025/02/04/linkedin-amps-up-vertical-video-tools-as-uploads-jump-36 (04-02-2025) | Geen wijziging nodig. |
| 6 | "Maar in het Compleet pakket lever ik naast de horizontale walkthrough ook een verticale social teaser op" | KLOPT | `lib/constants.ts` r. 147-157: Compleet (€349 excl. btw) bevat walkthrough 16:9 plus verticale social teaser 9:16. | Geen wijziging. |
| 7 | "Bij Future Content film ik standaard in 9:16 voor social media content. Dat betekent dat elke video direct klaar is voor Instagram, TikTok en LinkedIn, zonder nabewerking of bijsnijden." | EIGEN CLAIM | Niet te bevestigen in `00-future-content`. | John bevestigen. |
| 8 | "Voor Funda gebruik ik nog altijd het horizontale 16:9 formaat." | KLOPT | Funda-helpdesk: beeldverhouding 16:9 (zie blog 008). | Geen wijziging. |

Taalfouten: "domante" moet "dominante" zijn; "het nieuwe standaard" moet "de nieuwe standaard" zijn (titel en kop).

## 010_lokale-zichtbaarheid-via-video.md
Publicatiedatum 2025-11-05.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Instagram en TikTok tonen content aan mensen in de buurt van waar het gefilmd is, zeker als je locatietags gebruikt. Een video gemaakt in Bladel of Veldhoven bereikt precies de mensen die ook in die regio wonen." | ONJUIST | Platforms kijken naar waar gepost en welke locatie getagd is, niet naar waar gefilmd is, en "precies de mensen in die regio" klopt niet. Instagram noemt kijktijd, likes per bereik en doorsturen als belangrijkste signalen, locatie niet (Mosseri, januari 2025, https://www.socialmediatoday.com/news/instagram-shares-algorithm-2025/738034/). TikTok's lokale "Nearby"-feed startte pas in december 2025 en alleen in het VK, Frankrijk, Duitsland en Italië, na de publicatiedatum en niet in Nederland voor zover gevonden (https://techcrunch.com/2025/12/04/tiktok-rolls-out-a-nearby-feed-to-display-local-content-in-select-countries, 04-12-2025). | "Met een locatietag word je vindbaar voor mensen die op die plek zoeken. Gebruik hem dus altijd, ook al bepaalt hij niet alleen wie je video ziet." |
| 2 | "Post op tijdstippen dat jouw doelgroep actief is (17:00–20:00 en 21:00–23:00)" | GEEN BRON | Geen onderzoek gevonden dat deze twee blokken noemt; de algemene onderzoeken (Buffer, Sprout Social, Hootsuite) geven per platform verschillende tijden. | "Post op momenten dat jouw doelgroep actief is. Je ziet die tijden in de statistieken van je eigen account." |
| 3 | "het algoritme van Instagram en TikTok beloont relevante, consistente content, niet wie het meeste betaalt" | KLOPT (voor organisch bereik) | Buffer 29-01-2025 (consistentie) en Mosseri januari 2025 (kijktijd, likes, doorsturen als signalen). Betaald bereik loopt via een aparte advertentieveiling. | Geen wijziging nodig. |
| 4 | "Gebruik lokale hashtags: #eindhoven #veldhoven #dekempen" | NIET KUNNEN VERIFIËREN (effect) | Socialinsider vond geen duidelijk verband tussen hashtags en verspreiding op Instagram (2022, 75 miljoen posts, via zoekfragment). Effect van lokale hashtags is niet gemeten. | "Lokale hashtags kunnen helpen bij vindbaarheid, maar verwacht er geen wonderen van." |

## Samenvatting

Gecontroleerde beweringen: 45 (alleen getallen, modellen, prijzen, platformfeiten, regelgeving en eigen claims; triviale juiste beweringen niet meegeteld). Wet- en regelgeving komt in deze tien blogs niet voor.

| Oordeel | Aantal |
|---|---|
| KLOPT | 11 |
| ONJUIST | 5 |
| VEROUDERD | 0 |
| GEEN BRON | 15 |
| EIGEN CLAIM | 10 |
| NIET KUNNEN VERIFIËREN | 4 |

De 3 ernstigste problemen in deze batch:

1. **Blog 001: "40% meer kliks op Funda" en een lijst onder de kop "Wat de cijfers zeggen" zonder één herleidbaar cijfer.** Dit is een vastgoedblog voor makelaars, precies de doelgroep die funda-cijfers kent. Vervang het door funda's eigen uitspraak (video doorslaggevend voor één op de vier woningzoekers), nadat John die op de funda-pagina zelf heeft gecontroleerd.
2. **Blog 008 presenteert onjuiste "technische eisen van Funda".** MP4 is geen eis (funda accepteert tientallen formaten), de bestandsgrootte is wel bekend (1 GB), de watermerkregel is niet als funda-eis te vinden en funda toont maximaal 720p. Een makelaar die de helpdesk erbij pakt, ziet dat meteen.
3. **Blog 009 en 010 bevatten platformfeiten die niet kloppen:** "TikTok uitsluitend verticaal" (TikTok ondersteunt en promootte liggende video) en "een video gemaakt in Bladel bereikt precies de mensen in die regio" (geen van beide platforms werkt zo; TikTok's lokale feed bestond op de publicatiedatum nog niet en is niet in Nederland gevonden). Daarnaast het Reels-cijfer van 30-40% zonder bron, terwijl gemeten onderzoek ongeveer het dubbele bereik geeft.

Daarnaast opvallend: blog 002 en 006 spreken zichzelf en de site tegen over het shootritme (één dag per maand tegenover één shootmoment per kwartaal bij twee van de drie pakketten) en de shootduur (2 tot 4 uur tegenover 3-4 uur op de site). John moet kiezen welke versie geldt. Blog 004 zegt dat AI je gezicht en stem niet kan nabootsen; dat was in mei 2025 al onjuist (HeyGen, stemklonen).
