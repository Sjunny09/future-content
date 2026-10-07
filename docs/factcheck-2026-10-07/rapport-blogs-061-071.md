# Factcheck blogs 061 t/m 071

Gecontroleerd op 7 oktober 2026. Beoordeeld tegen de publicatiedatum van elke blog. Geen van de elf blogs bevat een `[infographic: ...]`-regel, dus Infographic.tsx is voor deze batch niet van toepassing. Alle interne bloglinks (`/blog/...`) en paginalinks (`/werkwijze`, `/trainingen`) in deze batch verwijzen naar een bestaande blog of route.

## 061_waarom-ai-projecten-in-het-mkb-stuklopen.md
Publicatiedatum 2026-07-23. Weinig toetsbare feiten; vooral ervaring en advies.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Bouw je daarop, dan valt het systeem om op de dertig procent die daar niet in past." | GEEN BRON | Geen bron gevonden; het percentage wordt als gegeven gebracht. | "Bouw je daarop, dan valt het systeem om op het deel van de gevallen dat daar niet in past." |
| 2 | "Daarom loop ik bij een nieuw traject altijd een aantal echte gevallen door in plaats van alleen het proces te bespreken." | EIGEN CLAIM | Strookt met John's vastgelegde werkregel in de portfolio-CLAUDE.md ("Ook wat de klant zelf over zijn proces zegt is een hypothese", 27-07-2026), maar "altijd" kan alleen John bevestigen. | Laten staan als John het bevestigt. |
| 3 | "Een systeem dat na twee weken één taak echt oplost" / "Eén taak, twee weken, een meetbaar verschil" | EIGEN CLAIM | Werkwijze van John (tweewekenhorizon). Let op: de gelinkte blog 042 spreekt van "een proces, een week". | Kies één termijn over de blogs heen, of schrijf "binnen een paar weken". |

## 062_van-losse-prompt-naar-werkend-systeem.md
Publicatiedatum 2026-07-27. Geen getallen, modellen, prijzen of wetgeving.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | Excerpt: "zit in vier dingen die niks met prompten te maken hebben" tegenover tekst: "Die drie extra onderdelen zijn saai" | ONJUIST (interne telling) | Eigen tekst: de body noemt drie onderdelen naast de prompt; de bulletlijst noemt er vier, maar de eerste ("De instructie staat ergens vast") gaat juist wel over de prompt. | Excerpt: "Een goede prompt is leuk voor één keer. Het verschil met een systeem dat elke week draait, zit in drie dingen die niks met prompten te maken hebben." |
| 2 | "Waar iets bouwen vroeger weken developertijd kostte, is een werkend eerste systeem nu vaak een kwestie van dagen." | EIGEN CLAIM | Ervaringsclaim van John; geen externe bron. | Laten staan als John het bevestigt. |
| 3 | "Dat kost een middag en het haalt de grootste variatie er al uit." | EIGEN CLAIM | Inschatting, niet gemeten. | Laten staan of "Dat is een kwestie van een paar uur." |

## 063_ai-in-de-bouw-en-installatie.md
Publicatiedatum 2026-07-31.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Op een set van negen bladen klopte het bij drie niet." | KLOPT | Portfolio-CLAUDE.md, routingregel "Klant-contactmoment", vastgelegd 27-07-2026: de titelblokdatum "faalde op 3 van de 9 bladen omdat het titelblok stil blijft staan terwijl de revisieletter doorloopt". Klant wordt in de blog niet genoemd, dus geen klantmap geopend. | Geen wijziging. |
| 2 | "dat titelblok blijft soms staan terwijl de revisieletter gewoon doorloopt" | KLOPT | Zelfde bron als #1. | Geen wijziging. |
| 3 | "Dit is een valkuil waar ik zelf tegenaan ben gelopen." | EIGEN CLAIM | Bevestigd door dezelfde vastlegging; John kan beslissen of hij deze klantervaring (anoniem) publiek wil maken. | Laten staan na akkoord van John. |
| 4 | "daar komt geen AI aan te pas en dat gaat de eerste jaren ook niet gebeuren" | NIET KUNNEN VERIFIËREN | Voorspelling, niet toetsbaar. | Laten staan als mening, of "en dat verwacht ik ook niet op korte termijn". |

## 064_wat-is-een-custom-gpt.md
Publicatiedatum 2026-08-04.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Een factuur aanmaken, een afspraak verzetten, een regel in je systeem wegschrijven: daar heb je een koppeling voor nodig, geen chatvenster. Dat is het verschil met een echte agent" | ONJUIST (onvolledig) | Een custom GPT kan zelf een koppeling hebben via "Actions" (OpenAPI-endpoints die de GPT tijdens het gesprek aanroept). Zie https://genai.byu.edu/creating-gpt-actions en https://www.unilink.us/blog/custom-gpts-guide-2026 (geraadpleegd 07-10-2026). De zin suggereert dat een custom GPT dat principieel niet kan. | "Een factuur aanmaken, een afspraak verzetten, een regel in je systeem wegschrijven: daarvoor moet de GPT via een koppeling (een zogeheten Action) bij je systeem kunnen, en dat vraagt technisch werk. Dan schuif je richting een echte agent." |
| 2 | "Je bouwt niks, je koppelt niks, en je bent binnen een uur klaar." / "de goedkoopste manier" | KLOPT, met kanttekening | Een custom GPT maken vereist een betaald ChatGPT-abonnement (Plus vanaf circa $20 per maand, of Business/Enterprise/Edu); gebruiken kan met een gratis account. Bron: https://www.unilink.us/blog/custom-gpts-guide-2026 en https://ai-toolbox.co/chatgpt-management-and-productivity/how-to-create-custom-gpts-walkthrough-2026 (geraadpleegd 07-10-2026). "Binnen een uur" is een eigen inschatting. | Toevoegen: "Je hebt wel een betaald ChatGPT-abonnement nodig om er een te maken; gebruiken kan ook met een gratis account." |
| 3 | "Er wordt niks getraind, er verandert niks aan het model." | KLOPT | Kennisbestanden worden in stukken geknipt, als embeddings geïndexeerd en tijdens het gesprek opgezocht; het model zelf wordt niet aangepast. https://community.openai.com/t/who-has-had-success-with-adding-many-or-large-documents-to-the-knowledge-section/498177 (geraadpleegd 07-10-2026; de officiële OpenAI-helppagina gaf een 403). | Geen wijziging. |
| 4 | "Een custom GPT kent de documenten die je erin hebt gezet op het moment dat je ze erin zette." | KLOPT | Kennisbestanden zijn geüploade bestanden (max. 20 per GPT, max. 512 MB per bestand), geen live koppeling. https://help.openai.com/en/articles/8555545-file-uploads-with-gpts-and-advanced-data-analysis-in-chatgpt (geraadpleegd 07-10-2026). | Geen wijziging. Eventueel toevoegen: "en je kunt er maximaal twintig bestanden in zetten". |

## 065_ai-voor-je-klantenservice.md
Publicatiedatum 2026-08-08.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Voor jou halveert de tijd per vraag." | GEEN BRON | Geen meting of onderzoek genoemd; geen betrouwbare bron gevonden voor precies een halvering bij een concept-met-menselijke-controle-opzet. | "Voor jou scheelt het per vraag een flink deel van de zoek- en typtijd." |
| 2 | "Als een vraag binnenkomt, kan AI in seconden ophalen wat er eerder met deze klant is besproken" | KLOPT (mits gekoppeld) | Technisch haalbaar als het systeem aan het klantdossier of de mailhistorie gekoppeld is; geen getal. | Geen wijziging, of "kan AI, als het aan je klantsysteem gekoppeld is, in seconden ophalen ..." |
| 3 | "Klantvragen bevatten bijna altijd persoonsgegevens." | KLOPT | Onder de AVG is al een naam of e-mailadres een persoonsgegeven (art. 4 lid 1 AVG), https://eur-lex.europa.eu/eli/reg/2016/679/oj (geraadpleegd 07-10-2026). | Geen wijziging. |

## 066_je-eigen-documenten-aan-ai-koppelen.md
Publicatiedatum 2026-08-12.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "dan komen die er alle vier in en dan kiest het systeem er willekeurig een" | ONJUIST (technisch) | Een retrieval-systeem kiest niet willekeurig: het haalt de stukken op die qua betekenis het meest op de vraag lijken, en dat kunnen stukken uit meerdere versies tegelijk zijn, die het model dan mengt. Dat is algemeen hoe retrieval met embeddings werkt (vectorsearch op gelijkenis), zie https://community.openai.com/t/who-has-had-success-with-adding-many-or-large-documents-to-the-knowledge-section/498177 (geraadpleegd 07-10-2026). Het punt van de alinea blijft overeind. | "dan komen die er alle vier in, en welke versie in het antwoord terechtkomt hangt af van welke tekst het meest op de vraag lijkt. Soms mengt hij ze zelfs." |
| 2 | "zonder eigenaar veroudert het binnen een half jaar zonder dat iemand het merkt" | GEEN BRON | Termijn is een inschatting zonder bron. | "zonder eigenaar veroudert het ongemerkt." |
| 3 | "Je documenten worden in stukken geknipt en zo opgeslagen dat er op betekenis gezocht kan worden" / "je kunt laten tonen uit welk document het antwoord komt" | KLOPT | Beschrijving van retrieval-augmented generation met bronvermelding; standaardfunctie in o.a. Copilot, Gemini en NotebookLM. | Geen wijziging. |

## 067_ai-voor-planning-en-logistiek.md
Publicatiedatum 2026-08-16. Geen getallen met bron, modellen, prijzen of wetgeving.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Leg je de geplande tijd naast de werkelijk geboekte uren, dan zie je binnen een uur waar je structureel te krap of te ruim zit." | EIGEN CLAIM | Inschatting; hangt af van hoe de uren zijn vastgelegd. | Laten staan als John het bevestigt, of "dan zie je snel waar ...". |
| 2 | "Begin met het naast elkaar leggen van wat je plande en wat het werd, over een half jaar aan gegevens. Dat kost een dag" | EIGEN CLAIM | Inschatting. Let op: botst licht met #1 ("binnen een uur"). | Eén termijn kiezen, bijvoorbeeld "Dat is meestal in een dag gedaan." en bij #1 "dan zie je snel ...". |
| 3 | "In bijna elk bedrijf staat er in de planning een standaardduur die niemand ooit heeft nagerekend." | EIGEN CLAIM | Ervaringsclaim, geen onderzoek. | "In veel bedrijven staat er ..." |

## 068_wat-is-een-uur-tijdwinst-waard.md
Publicatiedatum 2026-08-20.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Mensen onderschatten repetitief werk consequent." | GEEN BRON | Als algemene wetmatigheid gebracht; geen onderzoek genoemd en geen betrouwbare bron gevonden die dit specifiek voor repetitief werk aantoont. | "In mijn ervaring onderschatten mensen hoeveel tijd repetitief werk kost." |
| 2 | "Als iemand je vertelt dat AI je twintig procent tijd bespaart, vraag dan waar dat getal vandaan komt. Meestal is het antwoord: uit een onderzoek van een partij die AI verkoopt." | GEEN BRON | "Meestal" is een generalisatie zonder telling. Het getal twintig procent is hier een voorbeeld, geen bewering. | "... Vaak is het antwoord: uit een onderzoek van een partij die AI verkoopt." |
| 3 | "Bij bijna iedereen valt dat getal hoger uit dan verwacht" | EIGEN CLAIM | Ervaring van John, niet gemeten. | "Bij de meeste mensen valt dat getal hoger uit dan verwacht" |
| 4 | "Dat verschil maal de frequentie is je winst per week." | KLOPT | Rekenkundig juist (tijd nu min tijd straks inclusief controle, maal aantal keer per week). | Geen wijziging. |

## 069_ai-die-je-al-betaalt-microsoft-365-google-workspace.md
Publicatiedatum 2026-08-24.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | Lijst "Wat er in de praktijk goed werkt": "Een verslag maken van een online overleg, met de actiepunten eruit" | ONJUIST (voor de basisabonnementen) | Microsoft: "Meeting summaries and recaps in Microsoft Teams" vallen onder de betaalde Microsoft 365 Copilot-licentie, niet onder het gratis Copilot Chat dat in de zakelijke abonnementen zit (https://support.microsoft.com/topic/understanding-the-different-microsoft-copilot-experiences-cfff4791-694a-4d90-9c9c-1eb3fb28e842, laatst bijgewerkt april 2026, geraadpleegd 07-10-2026). Google: "Take notes for me" in Meet zit in Business Standard en hoger, niet in Business Starter (https://support.google.com/mail/answer/13952129, geraadpleegd 07-10-2026). | "Een verslag maken van een online overleg, met de actiepunten eruit (bij Google vanaf Business Standard, bij Microsoft alleen met een betaalde Copilot-licentie)" |
| 2 | "Zoeken door je eigen mappen en mail op betekenis in plaats van op exacte woorden" | ONJUIST (voor Microsoft zonder Copilot-licentie) | Microsoft: "AI-powered Chat that can respond using your work data like files, emails, chats" vereist de betaalde Microsoft 365 Copilot-licentie (zelfde Microsoft-bron als #1). Die kost als Microsoft 365 Copilot Business $21 per gebruiker per maand voor organisaties tot 300 medewerkers, sinds 1 december 2025 (https://www.computerworld.com/article/4093224/ en https://primaryt.co.uk/m365-copilot-business/, geraadpleegd 07-10-2026). Bij Google zit een AI-overzicht in Gmail-zoeken al in Business Starter, Drive-zoeken met Gemini vanaf Business Standard (https://support.google.com/mail/answer/13952129). | "Zoeken door je eigen mappen en mail op betekenis (bij Microsoft alleen met de betaalde Copilot-licentie, bij Google deels al in het basispakket)" |
| 3 | "er zit waarschijnlijk al AI in het pakket dat je maandelijks betaalt" | KLOPT | Google neemt Gemini sinds januari 2025 op in alle Workspace Business- en Enterprise-abonnementen zonder add-on (https://workspaceupdates.googleblog.com/2025/01/expanding-google-ai-to-more-of-google-workspace.html, 15-01-2025). Microsoft 365 Copilot Chat zit zonder meerprijs in alle zakelijke Microsoft 365-abonnementen (Microsoft-bron bij #1). Per 1 juli 2026 zijn de Microsoft 365-zakelijke prijzen verhoogd, mede om extra Copilot Chat-functies (https://www.theregister.com/2025/12/05/microsoft_365_prices_up_2026, 05-12-2025). | Geen wijziging. Eventueel toevoegen: "Bij Microsoft is dat Copilot Chat; de volledige Copilot met toegang tot je eigen mail en bestanden is een betaalde uitbreiding." |
| 4 | "Samenvatten van lange mailwisselingen en documenten waar je halverwege instapt" | KLOPT, met kanttekening | Google: draadsamenvattingen in Gmail zitten in Business Starter; Gemini in Docs vanaf Business Standard (https://support.google.com/mail/answer/13952129). Microsoft: Copilot Chat kan documenten samenvatten en werkt sinds 2026 in Word, Excel, PowerPoint en Outlook met inbox- en agendabegrip (https://www.theregister.com/2025/12/05/microsoft_365_prices_up_2026); wat precies zonder betaalde licentie in Outlook kan, verschilt per bron en kon ik niet eenduidig vaststellen. | Geen wijziging nodig, of de algemene kanttekening bij #3 toevoegen. |
| 5 | "Omdat het in je bestaande omgeving draait, valt het onder de afspraken die je daar al voor hebt gemaakt over waar je gegevens staan en wie erbij kan." | KLOPT | Copilot Chat voor zakelijke accounts valt onder Microsoft's enterprise data protection (Microsoft-bron bij #1); Gemini in Workspace valt onder de Workspace-voorwaarden (Google-blog bij #3). | Geen wijziging. |
| 6 | "Bijna altijd betaalt men al voor Microsoft 365 of Google Workspace, en bijna altijd wordt de AI die daarin zit niet gebruikt." | EIGEN CLAIM | Ervaring van John. | "Meestal betaalt men al ... en vaak wordt de AI die daarin zit nauwelijks gebruikt." |
| 7 | "Bij veel bedrijven staat de functionaliteit uit omdat niemand hem heeft aangezet" | NIET KUNNEN VERIFIËREN | Bij Google staat Gemini voor Business-abonnementen standaard aan (beheerder kan uitzetten); bij Microsoft moet een beheerder Copilot Chat soms vastzetten of aanzetten. Hoe vaak het uit staat is niet gemeten. | "Bij sommige bedrijven staat de functionaliteit uit, of hij staat aan en niemand weet het." |

## 070_ai-en-je-personeel-verdwijnt-er-werk.md
Publicatiedatum 2026-08-28.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Reken er niet op dat je snel op loonkosten bespaart. Dat gebeurt in het MKB bijna nooit" | GEEN BRON | Gebracht als algemeen feit; geen onderzoek gevonden of genoemd. | "Reken er niet op dat je snel op loonkosten bespaart. Dat zie ik in het MKB zelden gebeuren" |
| 2 | "Voor een bedrijf dat moeilijk aan personeel komt, en dat zijn er nogal wat" | KLOPT, met kanttekening | De krapte neemt af: in het tweede kwartaal van 2026 waren er 95 vacatures per 100 werklozen (CBS, https://www.cbs.nl/nl-nl/nieuws/2026/31/werkloosheid-gedaald-in-tweede-kwartaal-2026, 30-07-2026). Per sector en functie blijft het voor veel bedrijven lastig. Vaag genoeg om te laten staan. | Geen wijziging, of "en in veel sectoren is dat nog steeds zo". |
| 3 | "In het MKB zie ik zelden dat er banen verdwijnen." | EIGEN CLAIM | Ervaring van John. | Laten staan als John het bevestigt. |
| 4 | "het verhaal dat klopt voor bedrijven van tien tot honderd man" | EIGEN CLAIM | Geen bron voor deze afbakening. | Laten staan of "voor de meeste MKB-bedrijven". |

## 071_passief-inkomen-website-google-adsense.md
Publicatiedatum 2026-09-01. Let op: categorie staat op "AI & Automatisering", terwijl het onderwerp vooral websites/inkomsten is (geen feitfout, wel opvallend).

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Zorg dat er minstens vijftien artikelen met echte inhoud op je site staan voordat je een account aanvraagt." | GEEN BRON | Google noemt geen minimumaantal artikelen, woorden, bezoekers of domeinleeftijd voor AdSense. Vijftien is een vuistregel uit blogs van derden (die noemen 15 tot 30). Bron: https://www.lilachbullock.com/how-many-blog-posts-before-applying-for-adsense/ en https://freeacademy.ai/lessons/adsense-requirements (geraadpleegd 07-10-2026). | "Google noemt geen minimumaantal artikelen, maar zorg dat er een flink aantal artikelen met echte inhoud op je site staat voordat je een account aanvraagt; in de praktijk hoor je vaak vijftien tot dertig." |
| 2 | "Het systeem heeft tijd nodig om te leren welke advertenties bij jouw onderwerp en jouw bezoekers passen. In de eerste maanden valt de opbrengst daardoor vaak tegen, en daarna kruipt hij langzaam omhoog." | GEEN BRON | Google's helpcentrum zegt alleen dat advertenties pas worden getoond nadat de crawler je pagina's heeft bekeken ("if we haven't yet crawled your site, we'll display no ads", https://support.google.com/adsense/answer/10196, geraadpleegd 07-10-2026). Een leerperiode van maanden waarin de opbrengst langzaam stijgt, staat nergens in Google's documentatie; forumbronnen spreken van dagen tot enkele weken (https://www.webmasterworld.com/forum89/12011.htm). | "In het begin zijn de advertenties soms minder goed afgestemd, omdat Google je pagina's eerst moet bekijken. Dat is meestal binnen dagen tot een paar weken bijgetrokken." |
| 3 | "Voor een Nederlandse zakelijke site praat je over een bedrag in de orde van een paar euro per duizend weergaven." | GEEN BRON | Geen openbare bron gevonden met AdSense-paginaweergave-RPM voor Nederlandstalige zakelijke sites; Google publiceert geen landgemiddelden. De blog presenteert het al als orde van grootte, dat is netjes. | Laten staan met de bestaande slag om de arm, of toevoegen: "Dat is een inschatting; Google publiceert hier geen cijfers over." |
| 4 | "wat voor een MKB-site in Nederland al netjes is" (over vijfduizend paginaweergaven per maand) | GEEN BRON | Geen benchmark gevonden. | "wat voor veel MKB-sites al netjes is" of schrappen. |
| 5 | "Eén doorverwijzing naar een tool die iemand jaren gebruikt, levert meer op dan duizenden banner-vertoningen." | GEEN BRON | Plausibel bij een RPM van een paar euro (duizenden vertoningen is dan tientallen euro's), maar afhankelijk van het affiliateprogramma; geen bron. | "Eén doorverwijzing naar een tool die iemand jaren gebruikt, levert vaak meer op dan duizenden banner-vertoningen." |
| 6 | "Stel dat je site vijfduizend paginaweergaven per maand haalt ... Dan zit je in de orde van twintig euro per maand. Wil je er tweehonderdvijftig euro per maand mee verdienen, dan heb je grofweg vijftigduizend weergaven per maand nodig." | KLOPT (rekenkundig) | Intern consistent: twintig euro op vijfduizend weergaven is ongeveer 4 euro per duizend; 250 euro op vijftigduizend is 5 euro per duizend. Beide passen bij "een paar euro". De onderliggende RPM blijft ongeverifieerd (zie #3). | Geen wijziging. Optioneel, sterker punt: "Bij twintig euro per maand duurt het bovendien drie à vier maanden voor je de uitbetaaldrempel van zeventig euro haalt." |
| 7 | "Je hoeft geen adverteerders te benaderen, de metingen lopen vanzelf en de uitbetaling ook." | KLOPT, met kanttekening | Uitbetaling gebeurt pas vanaf een saldo van €70 (AdSense-betalingsdrempel voor EUR, https://support.google.com/adsense/answer/1709871, geraadpleegd 07-10-2026), en na het invullen van betaal- en belastinggegevens. | "... en de uitbetaling ook, zodra je saldo boven de zeventig euro komt." |
| 8 | "het maakt je site trager, en trager laadt slechter in Google" | KLOPT | Laadsnelheid weegt mee via Core Web Vitals / page experience in Google Search (https://developers.google.com/search/docs/appearance/core-web-vitals). Het effect is beperkt ten opzichte van relevantie, maar de bewering klopt. | Geen wijziging. |
| 9 | "Google is er de laatste jaren steeds beter in geworden om massaal geproduceerde content te herkennen, en de sites die op die manier omhoog schoten zijn ook weer even hard gezakt." | KLOPT | Google voerde in maart 2024 het spambeleid "scaled content abuse" in, ongeacht of content door mensen of automatisering is gemaakt; in de eerste maand werden honderden AI-zware sites uit de index gehaald (837 van 49.345 gevolgde sites volgens Search Engine Journal). Bron: https://contentwriters.com/blog/googles-march-2024-algorithm-update/ en https://developers.google.com/search/docs/essentials/spam-policies (geraadpleegd 07-10-2026). | Geen wijziging. Kleine nuance kan: Google straft massaproductie, niet AI als zodanig. |
| 10 | "Bovendien komt zo'n site niet door de goedkeuring die hierboven genoemd staat." | KLOPT, met kanttekening | De meeste afwijzingen vallen onder "low value content" (dunne of onoriginele pagina's), wat massaal gegenereerde content raakt; een garantie dat elke AI-site wordt afgewezen is er niet. Bron: https://www.bump.it.com/blog/fix-adsense-low-value-content-rejection (geraadpleegd 07-10-2026). | "Bovendien loop je dan grote kans op een afwijzing wegens 'low value content'." |
| 11 | "Aanbevelingen van gereedschap ... met een affiliate-link erbij ... Voorwaarde: je noemt het gewoon" | KLOPT, met kanttekening | Het vermelden is niet alleen netjes maar verplicht: reclame moet herkenbaar zijn (Nederlandse Reclame Code, en de ACM handhaaft op misleiding). Bron: https://ondernemersplein.overheid.nl/wetten-en-regels/regels-voor-reclame/ (geraadpleegd 07-10-2026). | "Voorwaarde: je vermeldt duidelijk dat het een affiliate-link is, dat is ook wettelijk verplicht, en je beveelt niks aan dat je zelf niet zou nemen." |
| 12 | "het is de reden dat je op zakelijke sites die serieus klanten willen werven bijna nooit advertenties ziet" | EIGEN CLAIM | Observatie, niet gemeten. | Laten staan. |


## Samenvatting

50 beweringen gecontroleerd in 11 blogs (061 t/m 071). Geen infographics in deze batch.

| Oordeel | Aantal |
|---|---|
| KLOPT | 19 (waarvan 8 met kanttekening of voorwaarde) |
| EIGEN CLAIM | 13 |
| GEEN BRON | 11 |
| ONJUIST | 5 |
| NIET KUNNEN VERIFIËREN | 2 |
| VEROUDERD | 0 |

De drie ernstigste problemen:

1. **069 (AI die je al betaalt): twee functies die je bij Microsoft niet "al betaalt".** Een vergaderverslag met actiepunten en zoeken door je eigen mail en bestanden op betekenis vallen onder de betaalde Microsoft 365 Copilot-licentie ($21 per gebruiker per maand als Copilot Business), niet onder het gratis Copilot Chat. Bij Google zitten Meet-notulen en Gemini in Docs/Drive pas in Business Standard. Precies de belofte van de titel wordt hier deels niet waargemaakt.
2. **071 (AdSense): twee regels die als Google-eis klinken maar dat niet zijn.** "Minstens vijftien artikelen" is een vuistregel van derden; Google noemt geen minimum. En een leerperiode van "de eerste maanden" waarin de opbrengst langzaam stijgt, staat nergens in Google's documentatie. Daarnaast is de affiliate-vermelding wettelijk verplicht, niet alleen netjes.
3. **064 (custom GPT): "dat kan een custom GPT niet" klopt niet helemaal.** Een custom GPT kan via Actions wel een extern systeem aanroepen, dus de grens met een agent ligt minder hard dan de blog stelt. Ook ontbreekt dat je voor het maken van een custom GPT een betaald ChatGPT-abonnement nodig hebt.

Kleinere punten: in 062 zegt de excerpt "vier dingen" en de tekst "drie extra onderdelen"; in 066 kiest een retrievalsysteem niet "willekeurig" een versie; 061, 065, 068 en 070 bevatten elk een percentage of algemene wetmatigheid zonder bron ("dertig procent", "halveert de tijd", "onderschatten consequent", "bijna nooit loonkosten").
