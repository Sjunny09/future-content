# Logboek factcheck-fixes pagina's future-content.nl (7 oktober 2026)

Bron: docs/factcheck-2026-10-07/rapport-paginas.md. Repo: 00-future-content/website/fc-rebrand (branch nieuwe-huisstijl). Niet gecommit, niet gebuild.
Regelnummers zijn die van vóór de wijziging.

## Wijzigingen

### /cases/ticketsysteem-koningsdag (app/cases/ticketsysteem-koningsdag/page.tsx)

1. page.tsx:22 (metadata description)
   - Oud: "Hoe het ticketsysteem voor Köningsdag Reusel werkte: online tickets kopen, direct betalen via Mollie, en de verkoop op de dag zelf verwerkt. Van ticketverkoop tot betaling."
   - Nieuw: "Hoe het ticketsysteem voor Köningsdag Reusel werkte: online tickets kopen, direct betalen via Mollie, en na sluiting één complete lijst met namen en broodjeskeuzes. Van ticketverkoop tot betaling."
   - Reden: ONJUIST (rapport / #5). Online verkoop sloot 23-4-2026 15:00, evenement 27-4-2026 (03-klanten/koningsdag-reusel/README.md, "Hard deadline verkoop").
2. page.tsx:47-48 (stap 04)
   - Oud: t "Verwerkt op de dag zelf" / d "Het systeem verwerkte de verkoop op de dag van het evenement zelf: de organisatie kon live volgen hoeveel tickets er verkocht waren, zonder handmatig bij te houden."
   - Nieuw: t "Eén lijst na sluiting" / d "Tijdens de verkoop kon de organisatie volgen hoeveel tickets er verkocht waren, zonder handmatig bij te houden. Na sluiting van de online verkoop, een paar dagen voor het evenement, haalde de organisatie één complete lijst met namen en broodjeskeuzes op."
   - Reden: ONJUIST (rapport / #5). Zelfde bron. Admin-pagina met overzicht van alle aanmeldingen en handmatige CSV-export met broodjeskolom (ticketpagina/tickets/CLAUDE.md regel 65 en 75-78).
3. page.tsx:84-86 (hero)
   - Oud: "Bezoekers kochten hun tickets rechtstreeks online, betaalden meteen, en het systeem verwerkte de verkoop op de dag zelf."
   - Nieuw: "Bezoekers kochten hun tickets rechtstreeks online en betaalden meteen. Na sluiting van de verkoop had de organisatie één complete lijst met namen en broodjeskeuzes."
   - Reden: ONJUIST (rapport / #5), voorstel rapport. "inclusief betaallink via Mollie en volledige hosting" ongemoeid gelaten (EIGEN CLAIM, rapport / #4).
4. page.tsx:124
   - Oud: "Geen proefopstelling, gewoon in gebruik op de dag zelf."
   - Nieuw: "Geen proefopstelling, gewoon in gebruik voor de echte ticketverkoop."
   - Reden: ONJUIST, zelfde fout als rapport / #5 (niet apart in het rapport genoemd, wel dezelfde bewering). Bron: README.md.
5. page.tsx:11 (code-commentaar, niet zichtbaar)
   - Oud: "via Mollie, live gedraaid tijdens het Vorstelijk Verwenfestijn op Köningsdag (27 april), hosting inbegrepen."
   - Nieuw: "via Mollie, online verkoop tot 23 april 2026 15:00 voor het Vorstelijk Verwenfestijn op Köningsdag (27 april), hosting inbegrepen."
   - Reden: het commentaar was de bron van de fout op de pagina. Zelfde bron.

### / (homepage)

6. components/sections/Cases.tsx:64
   - Oud: "Bezoekers kochten hun tickets rechtstreeks online, betaalden meteen, en het systeem verwerkte de verkoop op de dag zelf."
   - Nieuw: "Bezoekers kochten hun tickets rechtstreeks online en betaalden meteen. Na sluiting van de verkoop had de organisatie één complete lijst met namen en broodjeskeuzes."
   - Reden: ONJUIST (rapport / #5). Verkoop sloot 23-4-2026 15:00, evenement 27-4-2026 (koningsdag-reusel/README.md).
7. components/entry/LandingPage.tsx:153
   - Oud: "Vul je bedrijf en website in, beantwoord zes vragen, en je krijgt ..."
   - Nieuw: "Vul je bedrijf en website in, beantwoord een paar korte vragen, en je krijgt ..."
   - Reden: ONJUIST (rapport / #2). app/api/scan/[jobId]/antwoord/route.ts: BASIS_VRAGEN = 5, MAX_TOTAAL = 8.

### /ai (app/ai/page.tsx, lib/constants.ts)

8. app/ai/page.tsx:181-182
   - Oud: "Wie als eerste reageert, wint vaak de klant. Toch komt een groot deel van de aanvragen binnen als jij aan het eten zit of de zaak dicht is."
   - Nieuw: "Wie snel reageert, maakt meer kans op de klant. En aanvragen komen ook binnen als jij aan het eten zit of de zaak dicht is."
   - Reden: GEEN BRON (rapport /ai #3): "groot deel" en "als eerste ... wint" zonder onderzoek. Voorstel rapport, beeld van John behouden.
9. app/ai/page.tsx:47 (FAQ "Is dit niet gewoon Copilot of Gemini in mijn mail?")
   - Oud: "Die helpen jóu sneller typen: jij zit nog steeds in elke mail en vraagt de AI om een concept. Handig, maar het werk blijft bij jou."
   - Nieuw: "Copilot en Gemini sorteren je inbox en zetten concepten klaar, maar jij keurt nog elke stap goed en ze kennen jouw prijzen en processen niet. Handig, maar het werk blijft bij jou."
   - Reden: VEROUDERD (rapport /ai #5). Copilot in Outlook triageert sinds 27-4-2026 (itbrief.co.nz/story/microsoft-adds-agentic-copilot-tools-to-outlook-inbox), Gmail AI Inbox sinds januari 2026 (tomsguide.com, zie rapport). Voorstel rapport.
10. app/ai/page.tsx:215-216
   - Oud: "De assistenten in Outlook en Gmail helpen je met een concept, maar jij zit nog steeds in elke mail. Handig, alleen blijft het werk bij jou."
   - Nieuw: "De assistenten in Outlook en Gmail sorteren je inbox en zetten concepten klaar, maar jij keurt nog elke stap goed. Handig, alleen blijft het werk bij jou."
   - Reden: VEROUDERD (rapport /ai #5), zelfde bronnen. Kop erboven ("Geen slimme hulp die jóu sneller laat typen.") ongemoeid: positionering, geen feitelijke bewering over de tools.
11. lib/constants.ts:243 (AI_INBOX_ROI, getoond op /ai)
   - Oud: "Inbox-beheer kost een ondernemer al snel een dag per week. Reken dat eens maal je uurtarief, maal vijftig weken. ..."
   - Nieuw: "Tel eens hoeveel uur per week jij in je inbox zit. Reken dat maal je uurtarief, maal vijftig weken. ..."
   - Reden: GEEN BRON (rapport /ai #4). Getal weg, lezer rekent zelf. McKinsey-cijfer (2012, kantoorwerkers) bewust niet gebruikt: gaat over een andere groep en de rapportbron is secundair.

### /ai/[wedge] (lib/constants.ts AI_WEDGES)

12. lib/constants.ts:269 (/ai/offertes, mechanisme)
   - Oud: "... Het reken- en typewerk zijn weg. Volgens onderzoek gaat automatisch offreren 30 tot 50% sneller."
   - Nieuw: "... Het reken- en typewerk zijn weg."
   - Reden: GEEN BRON (rapport /ai/[wedge] #1). Geen studie met "30 tot 50%" gevonden. Zin geschrapt. Simon-Kucher-cijfer (27%) niet ingevoegd: de rapportbron is niet door mij gecontroleerd.
13. lib/constants.ts:297 (/ai/chatbot, pijnKost)
   - Oud: "Een groot deel van de aanvragen komt buiten kantooruren binnen. Wie 's ochtends terugbelt, belt vaak een klant die al ergens anders zit."
   - Nieuw: "Aanvragen komen ook 's avonds en in het weekend binnen. Wie 's ochtends terugbelt, belt soms een klant die al ergens anders zit."
   - Reden: GEEN BRON (rapport /ai/[wedge] #3). Voorstel rapport.
14. lib/constants.ts:303 (/ai/chatbot, waardeZin)
   - Oud: "Een chatbot die één extra aanvraag per week binnenhoudt, verdient zich in de meeste bedrijven al terug. En hij werkt 24 uur per dag door."
   - Nieuw: "Houdt de chatbot één extra aanvraag per week binnen, reken dan zelf uit wat dat je per jaar oplevert. En hij werkt 24 uur per dag door."
   - Reden: GEEN BRON (rapport /ai/[wedge] #8): "in de meeste bedrijven" zonder meting. Voorstel rapport.

### /voor/[branche] (lib/constants.ts BRANCHES)

15. lib/constants.ts:875 (transport, observatieBody)
   - Oud: "... Voor een MKB-bedrijf van 25 chauffeurs gemiddeld 8-12 uur per week alleen al aan order-intake en klantmail."
   - Nieuw: "... Bij veel transporteurs gaat daar elke week uren planner-tijd in zitten, alleen al aan order-intake en klantmail."
   - Reden: GEEN BRON (rapport /voor #4). Voorstel rapport.
16. lib/constants.ts:876 (transport, observatieBody)
   - Oud: "Dat doen Plan&Go en Transplan al 20 jaar en goed."
   - Nieuw: "Dat doen Plan&Go en Transplan al jaren en goed."
   - Reden: getal klopt niet (rapport /voor #5: Plan&Go eerste implementaties Q1 2008, dus ca. 18 jaar, Computable). Zelfde formulering als skinLead ("al jarenlang"). "Transplan" en "bij de meeste MKB-transporteurs" ongemoeid, zie open punten.
17. lib/constants.ts:971 (evenementen, heroLead)
   - Oud: "WeezTicket rekent €0,99 per ticket plus 2,75% processing. Mollie kost €0,32 per transactie. Op een paar honderd tickets scheelt dat snel een paar honderd euro. Plus je krijgt ..."
   - Nieuw: "Weezevent rekent 2,5% per online verkocht ticket, minimaal €0,99, transactiekosten inbegrepen. Mollie kost €0,32 per betaling, ook als iemand vijf tickets tegelijk koopt. Bij tweehonderd tickets van €25 ben je bij Weezevent zo'n €200 kwijt, bij Mollie nog geen €80. Plus je krijgt ..."
   - Reden: ONJUIST (rapport /voor #12). Zelf nagelezen op 7-10-2026: weezevent.com/nl/onze-prijzen "2,5% / online verkocht ticket, minimaal € 0,99 incl. BTW", "transactiekosten inbegrepen". Mollie €0,32 per iDEAL-betaling (mollie.com/nl/pricing, via rapport).
   - Rekensom: 2,5% van €25 = €0,625, dus het minimum van €0,99 geldt: 200 x €0,99 = €198 ("zo'n €200"). Mollie slechtste geval één betaling per ticket: 200 x €0,32 = €64 excl. btw, €77,44 incl. btw, dus in beide gevallen "nog geen €80". Bij meerdere tickets per bestelling minder. Geen verschilbedrag genoemd, omdat dat afhangt van het aantal tickets per bestelling.
18. lib/constants.ts:975 (evenementen, observatieBody)
   - Oud: "... Na sluiting trekt het systeem zelf een Excel-lijst die direct naar de broodjes-leverancier kan."
   - Nieuw: "... Na sluiting haalt de organisatie met één klik een lijst met alle broodjeskeuzes op voor de leverancier."
   - Reden: ONJUIST (rapport /voor #14). Handmatige CSV-export met broodjeskolom via admin-pagina (koningsdag-reusel/ticketpagina/tickets/CLAUDE.md:65, :75-78). "onze eigen Köningsdag" ongemoeid (JOHN BEVESTIGT).
19. lib/constants.ts:994 (evenementen, skinModule ticketshop)
   - Oud: "€0,32 per transactie vast, geen 2,75% processing."
   - Nieuw: "€0,32 per betaling vast, geen percentage per ticket."
   - Reden: ONJUIST (rapport /voor #12): 2,75% is het Canadese Weezevent-tarief. Bron als #17.
20. lib/constants.ts:998 (evenementen, AI-FAQ-bot)
   - Oud: "Vermindert 60-80% van de DM-load voor je organisatieteam."
   - Nieuw: "Vangt de standaardvragen op, zodat je team alleen de lastige DM's beantwoordt."
   - Reden: GEEN BRON (rapport /voor #16), module nog niet gebouwd. Voorstel rapport.
21. lib/constants.ts:1008 (evenementen, casusBewijs)
   - Oud: "Voor onze eigen Köningsdag Reusel gebouwd: landingpage met groep + namen + allergieën + broodjeskeuze + Mollie iDeal + automatische Excel-lijst naar broodjes-leverancier. Live gedraaid tijdens het evenement, werkt zoals het hoort."
   - Nieuw: "Voor onze eigen Köningsdag Reusel gebouwd: landingpage met groep + namen + allergieën + broodjeskeuze + Mollie iDeal + met één klik een broodjeslijst voor de leverancier. Live gedraaid tijdens de ticketverkoop, werkte zoals het hoort."
   - Reden: ONJUIST (rapport /voor #14 en #15). Verkoop sloot 23-4-2026 15:00, evenement 27-4-2026 (README.md); lijst is handmatige CSV-export. "onze eigen" ongemoeid (JOHN BEVESTIGT).
22. lib/constants.ts:1052 (schoonmaak, betaalherinnering)
   - Oud: "90% van MKB-schoonmaak heeft last van late betalers, hier zit terugverdientijd."
   - Nieuw: "Late betalers zijn in de schoonmaak een bekend probleem, en daar zit terugverdientijd."
   - Reden: GEEN BRON (rapport /voor #19). Voorstel rapport.
23. lib/constants.ts:1071 (bouw, heroLead)
   - Oud: "Bouw7, KYP en Brincr verwachten dat je monteurs een app openen. 60-70% doet dat niet."
   - Nieuw: "Bouw7, KYP en Brincr verwachten dat je monteurs een app openen. In de praktijk gebeurt dat lang niet altijd."
   - Reden: GEEN BRON (rapport /voor #21). Voorstel rapport.
24. lib/constants.ts:1121 (garages, heroLead)
   - Oud: "Wat ze niet oplossen: 40% van inkomende calls buiten kantooruren mist."
   - Nieuw: "Wat ze niet oplossen: telefoontjes buiten kantooruren die niemand opneemt."
   - Reden: GEEN BRON (rapport /voor #23). Gevonden cijfers gaan over VS/VK en andere metingen.
25. lib/constants.ts:1125 (garages, observatieBody)
   - Oud: "Het échte gat: 40% van inkomende calls wordt buiten kantooruren niet opgenomen. Plus occasion-leads vanaf Marktplaats en AutoScout krijgen niet binnen 60 seconden reactie, en dan is de koper al verder gegaan."
   - Nieuw: "Het échte gat: telefoontjes buiten kantooruren worden vaak niet opgenomen, en die klant belt dan de volgende garage. Plus occasion-leads vanaf Marktplaats en AutoScout krijgen vaak pas laat reactie, terwijl wie snel reageert meer kans maakt."
   - Reden: GEEN BRON (rapport /voor #23 en #24). De "binnen 60 seconden"-beloftes in de productbeschrijvingen (aiDoetWel, skinModule, skinSummary) ongemoeid: dat is een ontwerpkeuze van het aanbod, geen marktcijfer.
26. lib/constants.ts:1144 (garages, AI-receptionist)
   - Oud: "NL-spraak, jouw begroeting, jouw FAQ. Vermindert 40% gemiste calls naar 0."
   - Nieuw: "NL-spraak, jouw begroeting, jouw FAQ."
   - Reden: GEEN BRON (rapport /voor #23): "naar 0" is een belofte zonder meting.
27. lib/constants.ts:1171 (horeca, heroLead)
   - Oud: "Formitable en Resengo doen je tafels. Bonnie doet je telefoon. Maar Instagram-DM, WhatsApp, mail en het formulier op je site komen nergens samen."
   - Nieuw: "Formitable en Resengo doen je tafels. Bonnie neemt de telefoon en WhatsApp op. Maar Instagram-DM, mail en het formulier op je site landen nog vaak los van elkaar."
   - Reden: ONJUIST (rapport /voor #28). Zelf nagelezen 7-10-2026: siliconcanals.com/ai-tool-of-the-week-bonnie "real-time WhatsApp support" voor restaurants, "manages all inbound calls and texts". (KHN-artikel noemt WhatsApp niet specifiek voor Bonnie.)
28. lib/constants.ts:1174 (horeca, observatieBody)
   - Oud: "Bonnie.tech neemt de telefoon op met AI. Maar reserveringen komen ook binnen via Instagram-DM, WhatsApp, mail en je website-formulier. Niemand combineert die kanalen."
   - Nieuw: "Bonnie.tech neemt de telefoon en WhatsApp op met AI. Maar reserveringen komen ook binnen via Instagram-DM, mail en je website-formulier, en die landen nog vaak los van elkaar."
   - Reden: ONJUIST ("niemand", rapport /voor #28). Bron als #27.
29. lib/constants.ts:1175 (horeca, observatieBody)
   - Oud: "Dat is precies waar AI zinvol is, en niemand bouwt het voor de horeca van 10-25 medewerkers."
   - Nieuw: "Dat is precies waar AI zinvol is."
   - Reden: ONJUIST/onbewezen ("niemand", rapport /voor #28).
30. lib/constants.ts:1202 (horeca, no-show-module)
   - Oud: "Scoort no-show-risico per gast op basis van historie. Verlaagt 8-15% no-show naar 3-5%."
   - Nieuw: "Scoort no-show-risico per gast op basis van historie. Helpt no-shows omlaag te brengen."
   - Reden: GEEN BRON (rapport /voor #29). Lightspeed/Zenchef-onderzoek geeft zulke percentages niet.
31. lib/constants.ts:1208 (horeca, casusBewijs)
   - Oud: "De restaurant-chatbot in mijn bewijs-blok demonstreert booking-flow-AI."
   - Nieuw: "De restaurant-chatbot op mijn pagina over AI-chatbots laat zien hoe zo'n boekingsflow werkt."
   - Reden: ONJUIST (verwijzing, rapport /voor #31): het bewijs-blok (PROOF_POINTS) staat op geen pagina meer; de chatbot staat op /ai/chatbot. Of het een demo of klant is: JOHN BEVESTIGT.

### /over (app/over/page.tsx)

32. app/over/page.tsx:102-103
   - Oud: "Een ticketsysteem voor onze eigen Köningsdag met Mollie en automatische broodjes-bestelling."
   - Nieuw: "Een ticketsysteem voor onze eigen Köningsdag met Mollie en een complete broodjeslijst voor de catering."
   - Reden: ONJUIST (detail, rapport /over #5). Broodjeskeuze wordt geregistreerd en is als CSV te exporteren, er gaat geen bestelling automatisch naar een leverancier (ticketpagina/tickets/CLAUDE.md). "onze eigen" ongemoeid (JOHN BEVESTIGT).

### /makelaars (app/makelaars/page.tsx)

33. app/makelaars/page.tsx:121
   - Oud: "Makelaars met video worden als professioneler ervaren. Dat trekt betere verkopers aan en versterkt jouw merk."
   - Nieuw: "Een makelaar die bij elke woning video laat zien, valt op. Dat trekt betere verkopers aan en versterkt jouw merk."
   - Reden: GEEN BRON (rapport /makelaars #2): onderzoeksclaim zonder onderzoek. Voorstel rapport.
34. app/makelaars/page.tsx:126 (kaart "Sneller verkopen")
   - Oud: "Woningen gefilmd door Future Content staan gemiddeld binnen 2 maanden verkocht. Minder doorlooptijd, minder kosten."
   - Nieuw: "Een video geeft kopers een compleet beeld van de woning, nog voor ze een bezichtiging plannen."
   - Reden: GEEN BRON (rapport /makelaars #1): geen meting in OS of 00-future-content. De kaarttitel "Sneller verkopen" is blijven staan (zie open punten).

### /portfolio (app/portfolio/page.tsx)

35. app/portfolio/page.tsx:249-251
   - Oud: <p> "Gemiddelde verkooptijd woningen met Future Content video: binnen 2 maanden na publicatie."
   - Nieuw: alinea verwijderd.
   - Reden: GEEN BRON (rapport /portfolio #5), zelfde claim als #34. Kan terug als John Pit's verkoopdata heeft.

### /social-media (app/social-media/page.tsx)

36. app/social-media/page.tsx:398 (FAQ prijs per Reel)
   - Oud: "... Premium: €162,50 per Reel (4 per maand). Ter vergelijking: een freelance video-editor vraagt al snel €100 tot 150 per video voor editing alleen. Mijn pakket omvat ..."
   - Nieuw: "... Premium: €162,50 per Reel (4 per maand). Mijn pakket omvat ..."
   - Reden: GEEN BRON (rapport /social-media #6): marktprijs van derden zonder bron of datum. Eigen prijzen en de zin "Mijn pakket omvat ..." ongemoeid (WACHT OP AANBODKEUZE).

### /trainingen (app/trainingen/page.tsx, lib/constants.ts TRAINING)

Bron voor 37-40, zelf nagelezen op 7-10-2026: https://www.sra.nl/nieuws/259001/2026/08/slim-subsidie-mkb-vanaf-19-augustus ("van 19 augustus 2026 9.00 uur tot en met 7 september 2026 17.00 uur"; "Als het aantal subsidieaanvragen het beschikbare budget overschrijdt, wordt de SLIM-subsidie toegekend via loting"; aanvragen via het subsidieportaal van Uitvoering van Beleid).

37. app/trainingen/page.tsx:155 (label)
   - Oud: "SLIM-subsidie 2026"
   - Nieuw: "SLIM-subsidie"
   - Reden: VEROUDERD, tijdloos gemaakt (ronde 2026 is voorbij).
38. app/trainingen/page.tsx:164-165
   - Oud: "SLIM is de subsidieregeling voor scholing in het MKB, uitgekeerd in twee aanvraagrondes per jaar."
   - Nieuw: "SLIM is de subsidieregeling voor scholing in het MKB, met aanvraagrondes die elk jaar opnieuw worden opengesteld."
   - Reden: tijdloos; het aantal rondes verschilt per jaar (rapport /trainingen #2 noemt twee in 2026).
39. app/trainingen/page.tsx:169-171
   - Oud: "Jouw boekhouder of HR-medewerker dient het in tijdens de eerstvolgende aanvraagronde (10 augustus-7 september 2026). Hoe je die aanvraag doet, ..."
   - Nieuw: "Jouw boekhouder of HR-medewerker dient het in tijdens de eerstvolgende aanvraagronde. De data staan op uitvoeringvanbeleidszw.nl. Hoe je die aanvraag doet, ..."
   - Reden: ONJUIST en VEROUDERD (rapport /trainingen #1): ronde liep 19-8-2026 9:00 tot 7-9-2026 17:00 en is voorbij.
40. app/trainingen/page.tsx:178-179
   - Oud: "Toekenning is niet gegarandeerd. Aanvraag en uitbetaling ..."
   - Nieuw: "Toekenning is niet gegarandeerd: zijn er meer aanvragen dan budget, dan wordt er geloot. Aanvraag en uitbetaling ..."
   - Reden: opdracht (loting bij overtekening noemen), bron SRA hierboven.
41. lib/constants.ts:770 (TRAINING.features)
   - Oud: "Mogelijk (deels) te financieren via de SLIM-subsidie voor scholing, zie /blog/slim-subsidie-aanvragen"
   - Nieuw: "Mogelijk (deels) te financieren via de SLIM-subsidie voor scholing"
   - Reden: ONJUIST (weergave, rapport /trainingen #6): het pad stond als platte tekst in de lijst. De pagina linkt in het SLIM-blok al naar dezelfde uitleg.

### /scan en vervolgschermen

42. app/scan/page.tsx:57-59
   - Oud: "Vul alleen je websiteadres in. Ik kijk er rustig doorheen en stuur je binnen 24 uur een persoonlijke video terug met wat ik zie en wat ik zou aanpakken. Meer hoef je nu niet te doen."
   - Nieuw: "Begin met je websiteadres, daarna volgen een paar korte vragen. Ik kijk er rustig doorheen en stuur je binnen 24 uur een persoonlijke video terug met wat ik zie en wat ik zou aanpakken."
   - Reden: ONJUIST (onvolledig, rapport /scan #1): na de URL volgen 5 tot 8 vragen plus naam, e-mail en telefoon (antwoord/route.ts, SCAN-ARCHITECTUUR.md). "binnen 24 uur" ongemoeid (EIGEN CLAIM).
43. app/scan/page.tsx:104 (trustpunt "AVG, geen cookies")
   - Oud: "Alleen je publieke site en je antwoorden."
   - Nieuw: "Je publieke site, je antwoorden en je contactgegevens."
   - Reden: ONJUIST (onvolledig, rapport /scan #2): de scan vraagt ook naam, e-mail en telefoon. "Alleen" geschrapt omdat ook een gehasht IP wordt opgeslagen (privacy/page.tsx:36).
44. app/scan/pilot/[jobId]/page.tsx:73
   - Oud: "iDEAL-checkout wordt deze week opengezet. Mail John rechtstreeks op john@future-content.nl als je nu al wilt boeken."
   - Nieuw: "iDEAL-checkout staat op dit moment niet open. Mail John rechtstreeks op john@future-content.nl als je nu al wilt boeken."
   - Reden: VEROUDERD (rapport /scan #6): "deze week" klopt nooit lang. Tekst verschijnt alleen als Mollie niet actief is. Het mailadres (john@ of hello@) is niet aangepast: keuze van John, zie open punten.

### Sitebreed JSON-LD (app/layout.tsx)

45. app/layout.tsx:136 (Offer "AI proof of concept")
   - Oud: "Betaalde proof of concept op je eigen werk, zodat je AI ziet werken vóór de bouw. Gaat van de bouwprijs af als je doorgaat. Mogelijk deels via de SLIM-subsidie."
   - Nieuw: "Betaalde proof of concept op je eigen werk, zodat je AI ziet werken vóór de bouw. Gaat van de bouwprijs af als je doorgaat."
   - Reden: TEGENSTRIJDIG/onjuist (rapport JSON-LD #1): SLIM is voor scholing, /trainingen zegt zelf "Bouw en beheer vallen daar buiten". Prijs "750" en btw-vermelding ongemoeid (WACHT OP AANBODKEUZE).

### /llms.txt (public/llms.txt)

46. public/llms.txt:20
   - Oud: "60% terug via SLIM-subsidie (Future Content levert het scholingsplan-document mee)."
   - Nieuw: "Mogelijk deels te financieren via de SLIM-subsidie (bij te veel aanvragen wordt er geloot, toekenning is dus niet zeker). Future Content levert het scholingsplan-document mee."
   - Reden: ONJUIST (rapport /llms.txt #2): 60% alleen bij toekenning, er wordt geloot (SRA, 7-10-2026 nagelezen). Prijs op regel 19 ("vanaf €750 ex BTW") ongemoeid (WACHT OP AANBODKEUZE).
47. public/llms.txt:63
   - Oud: "eigen ticketshop met iDEAL via Mollie, automatische bestellijsten naar leveranciers, zie"
   - Nieuw: "eigen ticketshop met iDEAL via Mollie, een exporteerbare broodjeslijst voor de catering, zie"
   - Reden: ONJUIST (rapport /llms.txt #4): handmatige CSV-export (ticketpagina/tickets/CLAUDE.md).

### /contact en footer (lib/constants.ts REGIONS, getoond op /contact en in de footer op elke pagina)

48. lib/constants.ts:377 (De Kempen)
   - Oud: cities: ["Bladel", "Eersel", "Reusel", "Bergeijk", "Waalre", "Valkenswaard"]
   - Nieuw: cities: ["Bladel", "Eersel", "Reusel", "Bergeijk"]
   - Reden: ONJUIST (rapport /contact #3): Waalre en Valkenswaard horen niet bij De Kempen, Waalre stond dubbel. Oirschot niet toegevoegd: dat zou een nieuwe werkgebied-claim zijn.
49. lib/constants.ts:381 (Eindhoven & omgeving)
   - Oud: cities: ["Eindhoven", "Veldhoven", "Best", "Son en Breugel", "Waalre", "Nuenen"]
   - Nieuw: cities: ["Eindhoven", "Veldhoven", "Best", "Son en Breugel", "Waalre", "Valkenswaard", "Nuenen"]
   - Reden: Valkenswaard verplaatst uit De Kempen (rapport /contact #3), niet geschrapt.
50. lib/constants.ts:384 (regionaam)
   - Oud: name: "Tilburg & omgeving"
   - Nieuw: name: "Tilburg, Breda & omgeving"
   - Reden: ONJUIST licht (rapport /contact #4): Breda is geen omgeving van Tilburg.

Controle na alle wijzigingen: TypeScript-transpile (typescript.transpileModule, geen build) op alle 13 gewijzigde bestanden gaf 0 syntaxfouten. Geen em- of en-dashes en geen puntkomma's in nieuwe zichtbare tekst (git diff gecontroleerd).

## Niet gewijzigd

### WACHT OP AANBODKEUZE
- /ai #9, /llms.txt #1: prijstrap (€750 proef, €2.500 tot €8.500, vanaf €250 p/m) tegen llms.txt "€5.000-€15.000 + €300-€750" (llms.txt:23).
- /ai #10, /voor #20: vier verschillende garanties (/ai geld-terug tegenover bouw "binnen 3 weken of gratis", garages "binnen 4 weken of 3 maanden beheer gratis", schoonmaak "6 maanden beheer op 50%"), constants.ts:1060, :1110, :1160, :1267.
- /voor #1 en #2: "Een halve dag op locatie, vanaf €750 ex BTW" ([branche]/page.tsx:255-263) en "krijgt de workshop terug als korting op de bouwfase" (alle casusAanbod).
- /voor #3, /over #8, /trainingen #5: "maandelijks beheer met dashboard".
- /werkwijze #1 en #2: stappen van de werkwijze botsen met de /ai-trap en met scan/klaar ("binnen een week een proof of concept").
- /trainingen #3 en #4: "werkend proof of concept" tegenover "drie kansen op papier", prijs "op aanvraag" tegenover "vanaf €750".
- /scan #5: €750 in- of exclusief btw (pilotpagina zegt incl., branchepagina ex, JSON-LD zonder).
- /scan #7: "Niet tevreden? Je krijgt je geld terug" op de pilotpagina.
- /film #4, /trouwen #4, /llms.txt #5: trouwfilm "Vanaf €800" tegenover "Prijs op aanvraag" (llms.txt:72) en "Daarom bespreek ik de prijs altijd persoonlijk".
- /social-media #2 tot #5: wat in welk pakket zit (posten, analyse, onderwerpen, captions, shootfrequentie).
- /contact #2: pakketnamen in de keuzelijst ("Vastgoed: Premium + Drone", "Social Media: Starter", "Social Media: Pro").
- /makelaars #7: portfolio-onderschrift "Premium video, Pit Makelaars" tegenover pakketnamen Walkthrough/Compleet.
- /portfolio #4: "Alle video's zijn opgeleverd als Compleet pakket" en de pakketlijst per object (OS: gefactureerd voor €260 en €300, onder de Compleet-prijs). Raakt pakketten, plus John moet bevestigen wat er geleverd is.
- /voor evenementen :1010: "per-ticket-fee die altijd onder Weezevent zit" en "gebouwd in 2-3 weken" (doorlooptijd, zie ook /ai/[wedge] #6).
- /ai/[wedge] #6: doorlooptijd "binnen ongeveer twee weken" tegenover 2-3, 3 en 4 weken op branchepagina's.
- /ai #8: "beperkt aantal bouw-trajecten ... want ik bouw alles zelf" tegenover "samen met specialisten als achtervang".
- /llms.txt:19 "vanaf €750 ex BTW" (prijs workshop, de SLIM-zin erna is wel aangepast).

### WACHT OP KEUZE CONCURRENTIETABEL
- /makelaars #3: tabel "Wat kost het elders?" met Van Heertum Media, VideoFunda, grote videobureaus en "Prijzen gebaseerd op marktonderzoek februari 2026" (constants.ts:166-171, makelaars/page.tsx:384). Niet aangeraakt.

### JOHN BEVESTIGT
- Koningsdag "voor een klant" (Cases.tsx:226-227) tegenover "onze eigen Köningsdag" (constants.ts:975, :1008, over/page.tsx:102). Rapport / #7, /voor #13. Niet aangepast, wel de feitelijke details in dezelfde zinnen.
- Koningsdag "inclusief betaallink via Mollie en volledige hosting" (Cases.tsx:64, case-pagina:84): draait op Strato van de stichting (rapport / #4).
- Pilot transportbedrijf (ai/page.tsx:274-275, constants.ts:906 casusStand). Rapport /ai #7, /voor #7.
- Restaurant-chatbot: demo of klant? (constants.ts:301 en de aangepaste verwijzing in :1208). Rapport /ai/[wedge] #4.
- "Zes jaar videograaf" / "Jarenlang videograaf" (constants.ts:926, :958, over/page.tsx:95, over/layout.tsx:7,11, app/layout.tsx:206, llms.txt:79). Rapport /voor #8, /over #2, JSON-LD #2.
- "Sinds januari 2026 werk ik voor mezelf" (over/page.tsx:60, layout.tsx:11). Rapport /over #1.
- "~200 vastgoedklussen" in llms.txt:79 tegenover "Ruim 150 video's" (Reviews.tsx:28). Rapport /llms.txt #3, /film #2. Zelfde zin als "6 jaar videograaf", dus bij John.
- Hasselt 5 of 9 (constants.ts:496-498, slug riethoven-hasselt-5). Rapport /portfolio #1.
- Resultaat- en detailzinnen per woning op /portfolio/[slug] (constants.ts:470-624). Rapport /portfolio #6 en #7.
- Reviews en Google-score: "5,0 gemiddeld op Google" (Reviews.tsx:25), "5,0 op Google" bij Pit (constants.ts:958), reviews Mandy Daniels, Rens Couwenberg, Linda Kaethoven, Anita Fiers met "Your Veldhoven Broker" (constants.ts:391-422). Rapport /film #1 en #3, /makelaars #9, /voor #10.
- Reacties van verkopers (constants.ts:427-449). Rapport /makelaars #8.
- Pit "AI-content-engine is in voorbereiding" (constants.ts:956), dossier zegt "geen bots, geen automatisering". Rapport /voor #9.
- "het verving vier losse abonnementen" (constants.ts:271, :324, :331, :1026 e.a.). Rapport /ai/[wedge] #2.
- Routeplanner "ongeveer 7% minder rijtijd" (Cases.tsx:55, cases/routeplanner/page.tsx:109). Rapport / #3.
- "Mijn eigen huis, een camper" (ScrollHero.tsx:86), BTT-ervaring (constants.ts:908, :1158, over/page.tsx:55-57), Fontys-opleiding, Caferadar (constants.ts:1208, over/page.tsx:101), dude.whereismycamper-engine (constants.ts:958), horeca "marktrapport" (constants.ts:1176), "1,5 jaar camper" (over/page.tsx:136).
- Scan: "binnen 24 uur een persoonlijke video" (meestal gehaald?), diepte-scan "rapport binnen een dag in je mail" (scan/diepte/klaar/[jobId]/page.tsx:47-48). Rapport /ai #1, /scan #3.
- Pilotpagina mailadres john@ tegenover hello@ (scan/pilot/[jobId]/page.tsx:73-81, gelukt/page.tsx:127). Rapport /scan #6, alleen "deze week" is aangepast.
- KvK-nummer 86880675 één keer controleren op kvk.nl. Rapport / #9.
- Gimbal "DJI RS Mini Ronin" (constants.ts:138, trouwen/page.tsx:127, llms.txt:94): exacte productnaam. Rapport /makelaars #6.
- Funda en videolink (makelaars/page.tsx:535, layout.tsx:44): hoe video nu op Funda komt. Rapport /makelaars #4.
- Kaarttitel "Sneller verkopen" op /makelaars (page.tsx:124): getal is weg, titel staat er nog. Kan alleen blijven als John het kan onderbouwen.
- "Social media portfolio ... Binnenkort beschikbaar" (portfolio/page.tsx:206-210): reels tonen hangt af van toestemming Pit. Rapport /portfolio #8.
- Overige eigen beloftes (reactietijden, levertijden, "Shoot duurt 1-2 uur", "Oplevering binnen 4 weken", Runway-credits, "10-30 korte MD-files", acht core-modules, Klippa, "Drie concrete kansen op papier").

### Overige tegenstrijdigheden en niet-verifieerbare punten (buiten de opdracht, niet aangepast)
- "Gratis, een kwartier werk" (LandingPage.tsx:144, cases/routeplanner:147, cases/ticketsysteem-koningsdag:149) tegenover "een paar minuten" op /ai. Rapport / #1, /ai #2.
- /boek #1: ExitIntentModal "20 minuten" (components/scan/ExitIntentModal.tsx:137) tegenover het 30-minutengesprek.
- /contact #1: "binnen één werkdag" tegenover "dezelfde dag".
- /voor #5: "Transplan" als TMS niet gevonden, "bij de meeste MKB-transporteurs" zonder bron (constants.ts:871, :874, :890). Alleen "al 20 jaar" is aangepast.
- /voor #18: Plan&Was, GlazenwasserApp, Klusio niet gevonden (constants.ts:1024-1025, :1044).
- /voor #26: werkplaatsprocessen bij BTT (constants.ts:1158) staan niet op /over.
- /voor #27: Autoflex, WinCar, CarSys niet apart nagezocht.
- /voor #33: spelling "WKB" moet "Wkb" zijn (constants.ts:1085, :1102). Niet aangepast, KLOPT inhoudelijk.
- /sprookje #3: "-14 LUFS, het niveau dat Instagram verwacht" (sprookje/page.tsx:273): Instagram publiceert geen norm, "gangbare richtwaarde" is preciezer.
- /film #2 en #5: "in de Kempen" (merendeel is Veldhoven en Eindhoven), "vaak twee films" tegenover "standaard twee bewerkingen".
- /trouwen #2: review-markup in JSON-LD (Google-richtlijn zelf-geplaatste reviews).
- /scan #8: KvK hardcoded in plaats van SITE.kvk (refactor, geen feitfout).
- /videografie #1: footer-link "Zakelijke video's" wijst naar een overzichtspagina (navigatie).
- Evenementen aiDoetWel "Automatische bestellijst naar leveranciers na sluiting ticketverkoop" (constants.ts:981): beschrijving van wat John kan bouwen, geen claim over Koningsdag. Laten staan.
- Evenementen skinSummary "Bewezen op Köningsdag Reusel" (constants.ts:1006) geldt voor de ticketshop, niet voor FAQ-bot en catering-forecast. Niet in het rapport.
- Dode constanten (PROOF_POINTS met de oude Weezevent-rekensom en "Voice-orchestrator", TRUST_STATS "< 2 mnd", Entree.tsx "Duurt 2 minuten"): niet live, niet aangepast. Rapport adviseert verwijderen.
