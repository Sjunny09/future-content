# Verificatie factcheck-fixes pagina's (7 oktober 2026)

Scope: git diff fc-rebrand, exclusief lib/blog.ts, lib/blog/, components/common/Infographic.tsx. Nummering volgt log-paginas.md (50 wijzigingen).

## Bronnen zelf geopend
- weezevent.com/nl/onze-prijzen (ruwe HTML): "2,5% / online verkocht ticket, minimaal € 0,99 incl. BTW", "transactiekosten inbegrepen". 2,75% + $0,99 is het CAD-tarief.
- mollie.com/nl/pricing (ruwe HTML): "iDEAL | Wero € 0,32". Btw wordt op de pagina niet genoemd.
- Rekensom: 2,5% x €25 = €0,625, onder het minimum, dus 200 x €0,99 = €198 ("zo'n €200" klopt). Mollie max 200 x €0,32 = €64, ook met 21% btw €77,44: "nog geen €80" klopt in beide gevallen.
- 03-klanten/koningsdag-reusel/README.md: verkoop dicht 23-4-2026 15:00, status LIVE. ticketpagina/tickets/config.php: DEMO_MODE false. admin.php: overzicht + knop "Download CSV (Excel)" met kolommen voornaam, achternaam, broodje, allergie (één klik na inloggen). Lokale data/bestellingen.json is leeg (opslag gebeurt op de server), het aantal echte verkopen is dus niet lokaal gemeten.
- siliconcanals.com/ai-tool-of-the-week-bonnie (21-3-2025): "real-time WhatsApp support", "manages all inbound calls and texts". Ook andere bron: telefoon en WhatsApp automatisch afgehandeld.
- itbrief.co.nz (30-4-2026): Copilot in Outlook signaleert mails die antwoord vragen, rangschikt, maakt concepten en regels; gebruiker kan meekijken en ingrijpen, akkoord vooral bij externe communicatie. Gmail AI Inbox (januari 2026, eerst testers in de VS): prioriteert en geeft to-do's.
- SLIM: SRA (ronde 19-8 t/m 7-9-2026, loting bij overtekening). Regeling loopt 2025 t/m 2029 (pad van de UVB-publicatie), dus "elk jaar opnieuw" klopt. uitvoeringvanbeleidszw.nl geeft HTTP 200.
- Scan: antwoord/route.ts BASIS_VRAGEN = 5, MAX_TOTAAL = 8. VragenFlow.tsx vraagt voornaam, e-mail en telefoon.

## Per wijziging

### Koningsdag (case-pagina, homepage, /over, /voor/evenementen, llms.txt)
1. metadata description: OK. Klopt met README en admin.php.
2. stap 04: GEREPAREERD. "haalde de organisatie ... op" stelt als feit dat de organisatie de lijst ook echt ophaalde, dat is niet gemeten. Nu: "kon de organisatie één complete lijst met namen en broodjeskeuzes ophalen". Rest van de tekst klopt (admin-overzicht tijdens verkoop).
3. hero: OK ("had de organisatie" = beschikbaarheid).
4. "gewoon in gebruik voor de echte ticketverkoop": OK (README LIVE, DEMO_MODE false).
5. code-commentaar: OK, niet zichtbaar.
6. Cases.tsx: OK.
18. "met één klik ... ophaalt": OK, admin.php heeft één exportknop (na inloggen).
21. casusBewijs "met één klik een broodjeslijst" + "Live gedraaid tijdens de ticketverkoop, werkte zoals het hoort": OK. Kanttekening: "werkte zoals het hoort" is niet lokaal te meten (bestellingen staan op de server), maar was al een eigen claim.
32. /over "een complete broodjeslijst voor de catering": OK.
47. llms.txt "een exporteerbare broodjeslijst voor de catering": OK.

### /ai en wedges
7. LandingPage "een paar korte vragen": OK (5 tot 8).
8. "Wie snel reageert, maakt meer kans": OK, geen getal meer.
9. FAQ Copilot/Gemini: GEREPAREERD. "jij keurt nog elke stap goed" is te sterk: Copilot maakt zelf regels en rangschikt, de gebruiker kan ingrijpen en keurt vooral uitgaande communicatie goed. Nu: "jij keurt nog goed wat de deur uitgaat". De rest klopt met de bronnen.
10. Zelfde zin in de sectie eronder: GEREPAREERD, zelfde aanpassing.
11. AI_INBOX_ROI: OK.
12. "30 tot 50% sneller" geschrapt: OK.
13, 14. chatbot pijnKost en waardeZin: OK.

### /voor/[branche]
15. transport uren: OK.
16. Plan&Go "al jaren": OK.
17. Weezevent/Mollie heroLead: OK, tarief en rekensom nagerekend (zie bronnen).
19. "€0,32 per betaling vast, geen percentage per ticket": OK.
20. FAQ-bot zonder 60-80%: OK.
22. schoonmaak late betalers: OK.
23. bouw 60-70%: OK.
24, 25, 26. garages 40%: OK. "Occasion-leadopvolging binnen 60s" in de moduletitel blijft als aanbod staan, geen tegenspraak.
27, 28. Bonnie telefoon en WhatsApp: OK, bron bevestigt.
29. "niemand bouwt het" geschrapt: OK.
30. no-show-percentages geschrapt: OK.
31. verwijzing naar /ai/chatbot: OK, slug "chatbot" bestaat en het restaurant-voorbeeld staat daar.

### /makelaars, /portfolio, /social-media
33. "valt op": OK.
34. kaart "Sneller verkopen": TWIJFEL. Het getal is terecht weg, maar de nieuwe tekst onderbouwt de kaarttitel "Sneller verkopen" niet meer. Titel niet aangepast (keuze voor John).
35. portfolio-zin weg: OK.
36. freelance-prijs weg: OK, eigen prijzen ongemoeid.

### /trainingen, JSON-LD, llms.txt
37, 38, 39, 40: OK. Tijdloos, loting klopt, geen verlopen datum meer. Overige SLIM-teksten (trainingen metadata, voorwaarden 8.6, branchepagina) spreken dit niet tegen.
41. TRAINING.features zonder pad: OK.
45. JSON-LD PoC zonder SLIM: OK, SLIM dekt scholing en niet de bouw.
46. llms.txt "mogelijk deels, er wordt geloot": OK.

### /scan
42. "Begin met je websiteadres, daarna volgen een paar korte vragen": OK.
43. trustpunt met contactgegevens: OK.
44. pilot "staat op dit moment niet open": OK.

### REGIONS (contact + footer)
48, 49, 50: TERUGGEZET naar HEAD. Werkgebied valt buiten de opdracht en is geen aantoonbare feitfout: Valkenswaard en Waalre horen historisch bij het Kempenland, en "Tilburg & omgeving" met Breda erin is een naamkeuze. REGIONS wordt alleen gebruikt in app/contact/page.tsx en components/layout/Footer.tsx, niet in metadata of JSON-LD. Blok nu byte-gelijk aan HEAD. Open voor John: Waalre staat dubbel (De Kempen en Eindhoven & omgeving).

## Overig
- Taal: geen em- of en-dashes, geen puntkomma's in nieuwe zichtbare tekst (enige treffer is een JS-regeleinde), overal je-vorm.
- Dode constante PROOF_POINTS (constants.ts:726) bevat nog de oude WeezTicket 2,75%-tekst en "trekt het systeem zelf een Excel-lijst". Niet live, niet aangepast.
- npx tsc --noEmit -p .: exit 0, geen fouten.

## Telling
50 wijzigingen: 43 OK, 3 GEREPAREERD (2, 9, 10), 3 TERUGGEZET (48, 49, 50), 1 TWIJFEL (34).
