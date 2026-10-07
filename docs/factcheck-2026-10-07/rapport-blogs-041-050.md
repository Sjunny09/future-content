# Factcheck blogs 041 t/m 050

Gecontroleerd op 7 oktober 2026. Oordelen tegen de publicatiedatum van elke blog. Geen bestanden in de website-repo gewijzigd. Geen van deze tien blogs bevat een [infographic]-regel.

## 041_hoe-begin-je-met-ai-geen-techneut.md
Publicatiedatum 2026-04-06.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "En je hoeft echt geen techneut te zijn, ik ben het zelf ook niet, ik ben een ondernemer die dingen bouwt door te doen." | EIGEN CLAIM | 00-future-content/STRATEGIE-2026.md r.319 noemt "mijn 4 jaar als business engineer"; John bouwt zelf het OS, de scan en agents. Lezers kunnen "geen techneut" ongeloofwaardig vinden naast de rest van de site. | "Je hoeft echt geen techneut te zijn. Ik ben ondernemer en heb het zelf ook door te doen geleerd, niet via een opleiding." (John bevestigt welke formulering klopt) |
| 2 | "Doe de gratis AI-quickscan op future-content.nl" | KLOPT | Route `app/scan/` bestaat in fc-rebrand; /ai-pagina: "Je begint met de gratis AI-scan" (app/ai/page.tsx r.63), gecontroleerd 7-10-2026 | geen |

Verder geen toetsbare getallen, modellen of prijzen in deze blog.

## 042_ai-automatisering-een-proces-een-week.md
Publicatiedatum 2026-04-13.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Ik werk in sprints van een week: een proces, een oplossing, een meetbaar resultaat." en "Daarom werk ik anders: een proces, een week, een meetbaar resultaat." | EIGEN CLAIM | Strijdig met de eigen site: /werkwijze (lib/constants.ts r.719-722) beschrijft vier stappen (kennismaking, workshop op locatie met proof of concept, tweede brein, offerte/bouwen/beheren) zonder weeksprint; /ai (app/ai/page.tsx r.63) noemt een proef van €750 en daarna maatwerk. Gecontroleerd 7-10-2026. | Als de weeksprint niet (meer) de echte werkwijze is: "Ik begin altijd met één proces en een snel, meetbaar resultaat, en pas daarna het volgende." John bevestigt of de weeksprint een echt aanbod is. |
| 2 | Dag 1 t/m Dag 5-indeling ("Dag 1: het proces in kaart brengen ... Dag 5: meten en bijstellen") | EIGEN CLAIM | Nergens in 00-future-content als werkwijze vastgelegd. | Alleen laten staan als John zo werkt; anders formuleren als voorbeeld: "Zo zou zo'n week eruit kunnen zien:" |

Geen externe getallen of bronnen in deze blog.

## 043_gpt-5-5-vs-claude-opus-4-7-voorjaarsvergelijking.md
Publicatiedatum 2026-04-27.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Voor 90 procent van het MKB-werk, mails, teksten, samenvattingen, ideeen, doen ze het allebei goed." | GEEN BRON | Geen onderzoek gevonden dat dit percentage onderbouwt. | "Voor het meeste MKB-werk, zoals mails, teksten, samenvattingen en ideeën, doen ze het allebei goed." |
| 2 | "Dit voorjaar kwamen twee zwaargewichten vrijwel tegelijk uit: GPT-5.5 en Claude Opus 4.7." | KLOPT | Claude Opus 4.7: 16 april 2026, https://www.anthropic.com/news/claude-opus-4-7 (gelezen 7-10-2026). GPT-5.5: 23 april 2026, https://cryptobriefing.com/openai-releases-gpt-55-outperforming-gpt-54-for-paid-chatgpt-users/ en https://framia.converge.ai/page/en-US/news/gpt-5-5-release-date (openai.com gaf 403, dus secundaire bronnen) | Eventueel concreet maken: "Half april kwamen ze binnen een week na elkaar uit: Claude Opus 4.7 op 16 april en GPT-5.5 op 23 april." |
| 3 | Hele vergelijking als actueel advies ("Twee topmodellen", "Mijn praktische advies") | VEROUDERD | Op 7-10-2026 zijn er opvolgers: GPT-6 Astra (3 september 2026), https://news.bgov.com/artificial-intelligence/openai-rolls-out-gpt-6-astra-model-with-cyber-guardrails-1 ; Claude Opus 5.5 (september 2026, alleen secundaire bron: https://neuraltrust.ai/es/blog/claude-vs-chatgpt-benchmark). | Bovenaan een update-regel: "Update oktober 2026: inmiddels zijn er nieuwere modellen. Het advies hieronder, kies op gebruik en niet op scorelijst, geldt nog steeds." |
| 4 | "Claude Opus 4.7 wordt vaak geprezen om het schrijven en het werken met lange, complexe documenten en code." | KLOPT (deels) | Anthropic noemt bij Opus 4.7 vooral agentic coding, lange context en "higher-quality interfaces, slides, and docs", https://www.anthropic.com/news/claude-opus-4-7 (16-4-2026). "Geprezen om het schrijven" is een oordeel, niet te meten. | geen |
| 5 | "Heb je al een abonnement op een van de twee en bevalt het? Blijf zitten." (impliciet: beide via abonnement) | KLOPT | GPT-5.5 ging naar Plus, Pro, Business en Enterprise, niet naar gratis gebruikers (cryptobriefing, 23-4-2026); Opus 4.7 "available across all Claude products"; of Opus ook in het gratis Claude-plan zit is niet gecontroleerd. | Optioneel toevoegen: "Let op: GPT-5.5 zit alleen in de betaalde ChatGPT-abonnementen." (Claude-kant eerst nakijken) |

## 044_toekomst-van-ai-mkb-van-tool-naar-teamlid.md
Publicatiedatum 2026-05-11.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Ik bouwde zelf al een voice-orchestrator waarbij ik hardop praat terwijl achtergrond-agenten het onderzoek doen. Terwijl ik praat, wordt het werk gedaan." | EIGEN CLAIM | Bestaan bevestigd in 00-future-content/aios-os-plan/FUNDAMENT-EN-BOUWPLAN.md r.86 ("agent_cockpit ... hergebruikt de voice-orchestrator"); website/fc-rebrand/docs/REVIEW-interview-uitkomsten.md r.98 (schermopname "Te maken"). De portfolio-instructie (pattern 63) zegt dat de voice-orchestrator in mei is gestopt. De tweede zin staat in de tegenwoordige tijd. | "Ik bouwde zelf een voice-orchestrator: ik praatte hardop terwijl agenten op de achtergrond het onderzoek deden. Dat was een voorproefje van waar het heen gaat." |
| 2 | "De dingen die ik twee jaar geleden zelf deed, lopen nu deels vanzelf." | EIGEN CLAIM | Niet te toetsen in 00-future-content. | Laten staan als John het bevestigt; anders concreet maken met één voorbeeld uit het OS (bijv. kilometerregistratie die zichzelf aanvult). |

Geen externe getallen, modellen of prijzen in deze blog.

## 045_te-snelle-ai-brochure-regie-houden.md
Publicatiedatum 2026-05-29.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Een paar weken geleden maakte ik een AI-brochure voor een spoedklus. Foto's binnen, Funda-advertentie binnen, klant had haast. Ik liet ChatGPT alles schrijven ... Doorgestuurd aan de makelaar." | EIGEN CLAIM | De kern staat alleen als postconcept in 00-future-content/LINKEDIN-comeback-post.md r.118 ("Vorige maand maakte ik een AI-brochure ...") en als contentidee in STRATEGIE-2026.md r.313. Geen dossierstuk of mail gevonden dat het voorval vastlegt. Dit is een "eerlijk over fouten"-verhaal: het moet echt gebeurd zijn. | John bevestigt dat het voorval echt is. Zo niet: schrappen of herschrijven als "Stel je voor dat ...". |
| 2 | "De makelaar belde me die middag. Vriendelijk maar duidelijk: dit klopt niet helemaal." en "Klein detail over een uitbouw die er anders uitzag dan beschreven." | EIGEN CLAIM | Deze details (telefoontje, uitbouw, toon, woordkeus) staan niet in het LinkedIn-concept; ze lijken bij het uitschrijven toegevoegd. | Alleen details laten staan die John zich echt herinnert; anders schrappen. |
| 3 | "Sinds die middag start ik elk AI-traject anders. ... eerst een tweede brein bouwen" | EIGEN CLAIM | Tweede brein als stap 3 van de werkwijze bevestigd op /werkwijze (lib/constants.ts r.721, app/werkwijze/page.tsx), 7-10-2026. De oorzaak (deze brochure) is niet vastgelegd. | geen, mits #1 klopt |
| 4 | "Plan een gesprek van 30 minuten." | KLOPT | app/boek/page.tsx r.10: "Plan een vrijblijvend online gesprek van 30 minuten", 7-10-2026 | geen |

## 046_vier-fouten-mkb-beginnen-met-ai.md
Publicatiedatum 2026-05-30.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Een gratis ChatGPT-account met klantnamen erin = geen AVG-compliance, en dat kan een boete kosten als het uitlekt." | KLOPT (in strekking) | Autoriteit Persoonsgegevens: persoonsgegevens invoeren in een AI-chatbot zonder afspraken kan een datalek zijn, https://www.dutchitchannel.nl/news/466398/ap-gebruik-ai-chatbot-kan-leiden-tot-datalekken (7-8-2024). OpenAI: bij Free/Plus wordt invoer standaard voor training gebruikt (uit te zetten), bij Business/Enterprise/API niet, https://help.openai.com/en/articles/8983130 (gelezen 7-10-2026). Boetes AVG art. 83: tot €20 mln of 4% van de wereldomzet. Kanttekening: de AP spreekt al van een datalek bij het invoeren, niet pas "als het uitlekt". | "Klantnamen in een gratis ChatGPT-account zetten is volgens de Autoriteit Persoonsgegevens al snel een datalek, ook als er verder niets uitlekt. Daar kan een boete op staan." |
| 2 | "Dit zijn de vier fouten die ik bij elk eerste gesprek tegenkom" (excerpt) | EIGEN CLAIM | Niet te toetsen. "Bij elk" is absoluut. | "Dit zijn de vier fouten die ik in eerste gesprekken het vaakst tegenkom." |

## 047_ai-implementeren-in-je-bedrijf-waar-begin-je.md
Publicatiedatum 2026-06-02.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Geen toevallige voorbeelden. Het zijn de drie taken die het vaakst terugkomen als ik met ondernemers hun week doorneem" | EIGEN CLAIM | Klinkt als een telling; er is geen telling gevonden in 00-future-content. Het vergelijkbare advies ("kies waar je het minst zin in hebt") komt uit 00-future-content/content-plan/CONTENT-ENGINE-ARCHITECTUUR.md r.38 (vijf Nederlandse bronnen), niet uit eigen gesprekken. | "Het zijn drie taken die ik vaak terugzie als ik met ondernemers hun week doorneem." |
| 2 | "Veel ondernemers zeggen tegen mij zoiets als: ... We zijn hier om te leren hoe we het zelf kunnen doen." | EIGEN CLAIM | De vragen in blogs 047 t/m 050 komen volgens 00-future-content/content/carrousels/SERIE-PLAN.md (2-7-2026) uit één chat: het KNAB-webinar met ongeveer 1000 kijkers. "Veel ondernemers zeggen tegen mij" klopt dan alleen als John deze vragen ook elders hoort. | "In een webinar met zo'n duizend ondernemers kwam deze vraag steeds terug: ..." (als dat de echte bron is) |
| 3 | "En omdat ik het ook beheer vanuit Bladel, in heel Brabant" | EIGEN CLAIM | Consistent met /ai: "Done-for-you voor MKB-bedrijven in Noord-Brabant, vanuit Bladel" en "Ik bouw én beheer het" (app/ai/page.tsx r.91, r.163), 7-10-2026 | geen |
| 4 | Links naar /werkwijze en /blog/iemand-die-ai-implementeert-bij-je-bedrijf-brabant | KLOPT | Route app/werkwijze bestaat; slug staat in lib/blog/ai-posts-4.ts r.246, 7-10-2026 | geen |

## 048_ben-ik-geen-it-er-is-ai-iets-voor-mij.md
Publicatiedatum 2026-06-05.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Een agent bouwen klinkt technisch, maar komt in de kern neer op een prompt invoeren" | ONJUIST | Een agent bestaat naast de instructie uit koppelingen, rechten en tools. De eigen site verkoopt het bouwen ervan als maatwerk van €2.500 tot €8.500 plus beheer (app/ai/page.tsx r.63, 7-10-2026); die twee beweringen bijten elkaar. | "Een agent aansturen klinkt technisch, maar komt in de kern neer op een duidelijke instructie in gewone taal." |
| 2 | "Een vraag die ik regelmatig krijg, vaak van zzp'ers en MKB'ers" / "Een zorg die ik vaak hoor van zzp'ers: ik ben geen IT'er, en het zou zonde zijn van mijn tijd" | EIGEN CLAIM | Het citaat komt letterlijk uit de KNAB-webinar-chat (00-future-content/content/carrousels/SERIE-PLAN.md r.35-37 en carrousel-01/caption.md). Eén bron, niet "vaak". | "In een webinar met zo'n duizend ondernemers typte iemand: ik ben geen IT'er, zonde van mijn tijd." |
| 3 | "Ik werk vanuit Bladel, maar kom bij je langs waar je ook zit in Brabant." en "Ik beheer het ook" | EIGEN CLAIM | Consistent met /ai (app/ai/page.tsx r.91, r.163), 7-10-2026 | geen |
| 4 | Links naar /ai en /blog/iemand-die-ai-implementeert-bij-je-bedrijf-brabant | KLOPT | app/ai bestaat; slug in lib/blog/ai-posts-4.ts r.246, 7-10-2026 | geen |

## 049_wat-kost-ai-voor-een-mkb-bedrijf.md
Publicatiedatum 2026-06-09.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Vier tools tussen de 20 en 50 dollar per maand: samen al snel 100 tot 150 dollar" | ONJUIST | Rekenfout: 4 x 20 = 80 en 4 x 50 = 200, dus de bandbreedte is 80 tot 200 dollar. | "Vier tools tussen de 20 en 50 dollar per maand: samen 80 tot 200 dollar." |
| 2 | "Voor de tools hierboven geldt een vaste prijs die iedereen betaalt." | ONJUIST | Spreekt de eigen lijst tegen: de agent "die op gebruik draait" heeft geen vaste prijs. Abonnementen verschillen ook per land en btw (in NL betaal je ChatGPT Plus €23 inclusief btw, https://www.icreatemagazine.nl/nieuws/chatgpt-plus/). | "Voor standaardabonnementen betaal je een vaste prijs per maand." |
| 3 | "zit eerder rond de 200" / "loop je richting de 200 dollar per maand" (bij "een heel team") | GEEN BRON | 200 dollar is de prijs van één zwaar abonnement per persoon (Claude Max vanaf $100, ChatGPT Pro $100 of $200). Een team betaalt per gebruiker: Claude Team $25 per gebruiker per maand bij maandelijkse betaling, https://claude.com/pricing/team (gelezen 7-10-2026); ChatGPT Business $20 tot $25 per gebruiker, https://www.cometapi.com/chatgpt-pricing-2026-free-vs-go-vs-plus-vs-pro/. Het getal 200 als "serieus draaien" is een eigen inschatting. | "Wie AI breder inzet, met een team of met automatiseringen op de achtergrond, zit al snel op een paar honderd dollar per maand. Een zwaar abonnement voor één persoon kost 100 tot 200 dollar." |
| 4 | "Een agent die op gebruik draait: meestal een paar tot enkele tientallen dollars per maand" | GEEN BRON | Geen bron gevonden; hangt volledig af van model en volume. | "Een agent die op gebruik draait: de kosten hangen af van hoeveel hij verwerkt. Bij kleine volumes is dat vaak beperkt." |
| 5 | "Een agent die op maat gebouwd is: geen abonnement maar een bouwtraject, op aanvraag en per situatie" en "dat bespreken we altijd per bedrijf, op aanvraag" | VEROUDERD | Bij publicatie (9-6-2026) stonden er geen prijzen op de site. Sinds 14-7-2026 (commit f4f0eae) noemt /ai: proef €750, bouw €2.500 tot €8.500 en een maandbedrag vanaf €250 voor beheer (app/ai/page.tsx r.63). "Geen abonnement" botst ook met dat maandbedrag. | "Een agent op maat bouw ik als traject: een proef van €750, de bouw tussen €2.500 en €8.500, en daarna een maandbedrag vanaf €250 voor beheer." (bedragen gelijk houden met /ai) |
| 6 | "Claude kost letterlijk 20 dollar per maand" | KLOPT | Claude Pro: "$20 if billed monthly", $17 per maand bij jaarbetaling, prijzen exclusief btw, https://claude.com/pricing (gelezen 7-10-2026). Ook geldig op 9-6-2026. | geen |
| 7 | "De meeste AI-tools rekenen in dollars, dus reken op een vergelijkbaar bedrag in euro's." | KLOPT (deels) | Prijzen staan in dollars exclusief btw; in NL komt er 21% btw bij. ChatGPT Plus kost in NL €23 inclusief btw (https://www.icreatemagazine.nl/nieuws/chatgpt-plus/); Claude Pro ongeveer €22 inclusief btw (https://gptprompts.ai/de/claude-preise). | "De meeste AI-tools rekenen in dollars en zonder btw. In Nederland betaal je voor een abonnement van 20 dollar ongeveer 22 tot 23 euro per maand." |
| 8 | "Geen jaarcontract, geen implementatietraject, gewoon een abonnement dat je iedere maand weer kunt opzeggen." | KLOPT | Maandelijkse betaling mogelijk, jaarbetaling is optioneel, https://claude.com/pricing (7-10-2026) | geen |
| 9 | "Een vraag die ik regelmatig krijg: wat zijn de maandelijkse kosten als je vier AI-tool-abonnementen hebt en twee agents?" en "Een opmerking die ik vaak terugkrijg: het nadeel zijn al die kleine abonnementjes" | EIGEN CLAIM | Bron is volgens SERIE-PLAN.md (00-future-content/content/carrousels/, 2-7-2026) de KNAB-webinar-chat, niet herhaalde vragen aan John. | "In een webinar met zo'n duizend ondernemers vroeg iemand: ..." |
| 10 | "Ik werk vanuit Bladel, in heel Brabant, en bouw niet alleen, ik blijf het ook beheren." | EIGEN CLAIM | Consistent met /ai (app/ai/page.tsx r.91, r.163), 7-10-2026 | geen |

## 050_is-mijn-bedrijf-te-klein-voor-ai.md
Publicatiedatum 2026-06-12.

| # | Bewering (letterlijk citaat) | Oordeel | Bron (URL + datum) | Voorstel |
|---|---|---|---|---|
| 1 | "Die vraag hoor ik geregeld, meestal van zzp'ers en eigenaren van een klein bedrijf." | EIGEN CLAIM | Net als 047 t/m 049 lijkt de bron de KNAB-webinar-chat (SERIE-PLAN.md, 2-7-2026). Niet te toetsen of John de vraag ook elders hoort. | Laten staan als John het bevestigt; anders: "Die vraag kwam terug in een webinar met zo'n duizend ondernemers." |
| 2 | "Ik bouw en beheer dit soort oplossingen zelf, voor ondernemers in heel Brabant, vanuit Bladel." | EIGEN CLAIM | Consistent met /ai (app/ai/page.tsx r.91, r.163), 7-10-2026 | geen |
| 3 | Links naar /blog/ai-implementeren-in-je-bedrijf-waar-begin-je en /blog/iemand-die-ai-implementeert-bij-je-bedrijf-brabant | KLOPT | Beide slugs staan in lib/blog/ai-posts-4.ts, 7-10-2026 | geen |

Verder geen getallen, modellen, prijzen of regelgeving in deze blog.

## Opmerking buiten de tabellen
- Blogs 047 t/m 050 dragen de datums 2 t/m 12 juni 2026, maar komen voor het eerst voor in git op 3 juli 2026 (lib/blog/ai-posts-4.ts) en bouwen op de vragen uit SERIE-PLAN.md van 2 juli. Blogs 041 t/m 046 (april en mei) komen voor het eerst voor in de checkpoint-commit van 22 juni. Bij 045 en 046 bevestigt EINDRAPPORT-CEO-nacht-29-mei.md dat ze eind mei geschreven zijn. Voor 041 t/m 044 en 047 t/m 050 is niet vast te stellen of ze op de genoemde datum online stonden. Niet meegeteld als bewering; John beslist of de datums mogen blijven staan.

## Samenvatting

Gecontroleerde beweringen: 38.

| Oordeel | Aantal |
|---|---|
| KLOPT | 12 |
| ONJUIST | 3 |
| VEROUDERD | 2 |
| GEEN BRON | 3 |
| EIGEN CLAIM | 18 |
| NIET KUNNEN VERIFIËREN | 0 |

(KLOPT telt ook de twee "KLOPT (deels)" en één "KLOPT (in strekking)".)

De 3 ernstigste problemen:
1. **045, de brochure-anekdote**: een "eerlijk over fouten"-verhaal waarvan alleen de kern als LinkedIn-concept bestaat. Het telefoontje van de makelaar, de uitbouw en de toon zijn nergens vastgelegd. Als het voorval niet (zo) gebeurd is, is dit een verzonnen klantverhaal op de eigen site. John moet het bevestigen of laten schrappen.
2. **049, prijzen en rekensom**: "4 tools van 20 tot 50 dollar = 100 tot 150" is fout (80 tot 200), "vaste prijs die iedereen betaalt" spreekt de eigen lijst tegen, en "maatwerk op aanvraag, geen abonnement" is sinds 14 juli in strijd met de vaste bedragen op /ai (€750 proef, €2.500 tot €8.500 bouw, vanaf €250 per maand beheer).
3. **048, "een agent bouwen komt neer op een prompt invoeren"**: onjuist, en het ondergraaft het eigen aanbod waarin het bouwen van een agent maatwerk van duizenden euro's is. Daarnaast presenteren 047 t/m 050 vragen uit één webinar-chat als vragen die John "vaak" of "regelmatig" krijgt.
