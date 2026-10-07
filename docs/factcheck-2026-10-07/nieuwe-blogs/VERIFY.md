# VERIFY: zeven nieuwe blogs (onafhankelijke controle, 7 oktober 2026)

Werkwijze: elke bewering naast een bron gelegd die ik zelf opende (curl, WebFetch, WebSearch, Runway-koppeling, OS-code, CLAUDE.md, `vercel inspect`). Niets gelezen onder 03-klanten/. Bronnen die bots weren (OpenAI help, Runway help, EUR-Lex) zijn langs een tweede weg gelezen: zoekresultaat, Zendesk-API of een secundaire bron.

Stijl, voor alle zeven gecontroleerd met grep: geen em-dash, geen en-dash, geen puntkomma, geen u-vorm, geen klantnamen, geen bedragen of klantaantallen van John. Alle interne links bestaan: /trainingen, /werkwijze, /sprookje (app/), /ai/administratie (wedge "administratie" in lib/constants.ts), de drie bestaande blogslugs in lib/blog/ai-posts-3.ts en ai-posts-4.ts, en de onderlinge links naar nieuwe blogs kloppen met hun slug-regel. Alle externe links geven 200, behalve OpenAI en Runway help (403, botblokkade, in de browser bereikbaar) en EUR-Lex (202, botcheck).

## 1. ai-geletterdheid-ai-act.md

| Bewering | Status |
|---|---|
| Art. 4 geldt sinds 2 februari 2025, voor aanbieders en gebruikers | OK (Commissie-FAQ, AP-handreiking) |
| ChatGPT voor advertentieteksten of vertalingen valt eronder, risico verzinnen | OK (Commissie-FAQ, "hallucination") |
| Plicht geldt ook voor ingehuurde kracht, dienstverlener, klant | OK (Commissie-FAQ) |
| Datum wijziging art. 4 via Digital Omnibus | GEREPAREERD: "In juli 2026" → "Op 27 juli 2026". Publicatieblad 24 juli 2026, inwerkingtreding 27 juli 2026 (ICTRecht 31-7-2026, Hunton). De Commissie-FAQ zegt "mid-July", dat is onnauwkeurig. Nu gelijk aan schaduw-ai |
| Verordening (EU) 2026/1744 | OK (ICTRecht, Hunton, Commissie-FAQ) |
| "Voldoende niveau" geschrapt, nu maatregelen die ontwikkeling ondersteunen, geen niveau per persoon garanderen | OK (Commissie-FAQ, ICTRecht citeert de nieuwe tekst) |
| Commissie en lidstaten helpen MKB, praktijkvoorbeelden | OK (Commissie-FAQ art. 4(2)) |
| Geen certificaat, eigen overzicht mag | OK (Commissie-FAQ) |
| Geen verplichte cursus, geen meetplicht | OK (Commissie-FAQ) |
| Quote AP "Welke maatregelen dat precies zijn, staat niet in de wet." | OK, letterlijk (AP-pagina, bijgewerkt 27-10-2025) |
| Toezicht door nationale toezichthouders vanaf augustus 2026 | OK (Commissie-FAQ: 2 augustus, elders 3 augustus, "augustus" dekt beide) |
| Uitvoeringswet in april 2026 in internetconsultatie, tien toezichthouders, AP en RDI coördineren | OK (AP-nieuws 20-4-2026) |
| Na consultatie nog Raad van State en parlement | OK, met kanttekening: geen indiening bij de Tweede Kamer gevonden per 7-10-2026. Wel adviezen van Rvdr (15-7) en RDI (23-6). Formulering "nog niet rond" klopt |
| Art. 99 noemt geen boete voor art. 4, lidstaten regelen sancties, proportioneel | OK (art. 99 lid 3 en 4, Commissie-FAQ) |
| Sanctie eerder bij incident door gebrekkige voorbereiding | OK (Commissie-FAQ) |
| Verschillende trainingsniveaus passend | OK (Commissie-FAQ) |
| Twee gratis AP-handreikingen | OK (beide pagina's 200) |
| CTA: AI-trainingen op locatie | OK (/trainingen: "een halve dag bij jullie op kantoor") |

Telling: 17 OK, 1 GEREPAREERD, 0 TWIJFEL.

## 2. schaduw-ai-medewerkers.md

| Bewering | Status |
|---|---|
| 78 procent neemt eigen AI-tools mee, bij MKB nog vaker | GEREPAREERD (bron): de link wees naar het persbericht, waar de MKB-zin niet in staat. Nu naar het rapport op microsoft.com/worklab, waar staat "even more common at small and medium-sized companies (80%)" |
| AP-waarschuwing augustus 2024 (6-8-2024), huisartsenpraktijk, telecombedrijf | OK, letterlijk nagelezen |
| Op eigen houtje tegen afspraken in = datalek, melding in veel gevallen verplicht | OK, letterlijk |
| AP vraagt om duidelijke afspraken | OK |
| ChatGPT gratis en Plus traint tenzij "Improve the model for everyone" uit, Business en Enterprise standaard niet | OK (OpenAI, via zoekresultaat, pagina zelf 403) |
| Claude Free, Pro, Max: keuze sinds najaar 2025, tot vijf jaar bewaard, niet voor Claude for Work | OK (Anthropic 28-8-2025, deadline 8-10-2025) |
| Gemini persoonlijk: Activiteit bewaren standaard aan vanaf 18, gebruikt voor verbeteren, menselijke beoordelaars, werkaccount andere voorwaarden | OK (Google-hulp 13594961 en 13278892) |
| Copilot Chat werkaccount: niet gebruikt om modellen te trainen | OK (Microsoft Learn, 18-8-2026). Microsoft heeft het product hernoemd naar "Microsoft Copilot Chat", de blog gebruikt die naam al |
| Copilot Chat met zakelijke gegevensbescherming zonder meerprijs bij geschikt abonnement | OK (Microsoft Learn, 25-9-2026) |
| Verwerkersovereenkomst nodig onder de AVG | OK (AP-pagina verwerkers) |
| Sinds 2 februari 2025 AI-geletterdheid verplicht, AP-handreiking | OK |
| Digitale Omnibus sinds ... van kracht | GEREPAREERD: "sinds eind juli 2026" → "sinds 27 juli 2026", gelijk aan ai-geletterdheid |
| Afgezwakt: geen niveau per medewerker, wel maatregelen | OK (ICTRecht) |
| Interne links /blog/ai-en-avg-..., /blog/is-mijn-klantdata-..., /trainingen | OK |

Telling: 12 OK, 2 GEREPAREERD, 0 TWIJFEL. Kleine stijlnoot: deze blog schrijft "Digitale Omnibus", de andere "Digital Omnibus". Allebei gangbaar, niet aangepast.

## 3. kopen-of-laten-bouwen.md

| Bewering | Status |
|---|---|
| Exact Online App Store, ruim driehonderd apps, webshops, tijdregistratie, personeelsplanning, CRM | OK (pagina toont "301 apps" en die categorieën) |
| Moneybird-overzicht per categorie: webwinkel, salarisadministratie, CRM, projectbeheer | OK |
| Zapier werkt met meer dan tienduizend apps | OK (zapier.com/apps: "10217+ apps"). Andere Zapier-pagina's zeggen nog "9,000+" |
| Gratis abonnement, 100 taken per maand, eenvoudige als-dan-automatiseringen | OK (Free: "100 tasks/mo", "two-step Zap workflows") |
| Daarna betaal je per maand naar aantal taken | OK (plan plus task tier) |
| Installatiebedrijf met drie prijslijsten | OK, als hypothetisch voorbeeld gemarkeerd ("Stel je hebt"), geen klant |
| /werkwijze begint met vrijblijvende kennismaking | OK (app/werkwijze/layout.tsx) |
| "In een voorstel zet ik er ook bij wat je kant-en-klaar kunt kopen, wat dat kost en wat het niet doet." | TWIJFEL: alleen bron is pattern 43 in CLAUDE.md, een interne werkregel. Dit wordt een publieke belofte. John moet bevestigen dat hij dit in elk voorstel wil doen |
| Interne link /blog/wat-kost-ai-voor-een-mkb-bedrijf | OK |

Telling: 8 OK, 0 GEREPAREERD, 1 TWIJFEL.

## 4. eigen-bedrijfssysteem.md

Alle beweringen over John's systeem nagelopen in CLAUDE.md en in de OS-code (alleen lezen).

| Bewering | Status |
|---|---|
| Administratie sinds juli 2026 op eigen webapp, "het OS" | OK (CLAUDE.md: omgeklapt 16-7-2026, Flask gearchiveerd 2026-07-16) |
| Offertes, facturen, uren, km, uitgaven met bon, klanten, opnameplanning op één plek | OK (CLAUDE.md, MCP-CONNECTOR-LEESMIJ.md) |
| Werkt vanaf laptop en via Claude op de telefoon | OK (connector /api/mcp met schrijf-tools. De read-only route /api/mcp/readonly is een aparte ingang) |
| Eerst Google Sheet met eenvoudige eigen app ernaast, sheet nu archief | OK (CLAUDE.md) |
| Geld en status in het OS en nergens anders, overgetypt getal is momentopname | OK (CLAUDE.md) |
| Opname inplannen: project met nummer, agenda-afspraak, herinnering 1 dag en 1 uur | OK (CLAUDE.md) |
| Datum of adres wijzigt, agenda verhuist mee | OK (CLAUDE.md, wijzig_shoot) |
| Offerte als link, klant geeft online akkoord | OK (akkoord-pagina, /akkoord/<token>) |
| Uren op de klant, eigen werk als intern | OK (CLAUDE.md, lib/uren.ts relatieId optioneel) |
| Km afgeleid uit opnames en bezoeken | OK (lib/kmVoorstellen.ts) |
| Uitgave zonder bon op actielijst | OK (lib/acties.ts, uitgave_zonder_bon) |
| Bon via vaste Drive-map, later met Claude verwerkt, nummer, map jaar en kwartaal, gekoppeld | OK (CLAUDE.md, scripts/bon_verwerken.py) |
| Bij factureren wordt regelbedrag vastgelegd, latere tariefwijziging verandert verstuurde factuur niet | OK: lib/facturen.ts bevriest bedragCent per urenregel (commit aac1021, 7-9-2026), staat op origin, productie-deploy is van 30-9-2026. Backfill bevroor oudere regels of die waren al veilig. Let op: CLAUDE.md regel 143 is op dit punt verouderd |
| Factuur maken bewust niet vanaf telefoon | OK (MCP-CONNECTOR-LEESMIJ.md) |
| Alles wat boekt eerst preview, ook uitgaven, ritten, contactmomenten, opnames | OK (mcp.ts: alle schrijf-tools preview-first, koppel_bon schrijft direct maar boekt niets nieuws) |
| Twee uur op klant: preview met tarief en bedrag | OK (lib/uren.ts UrenPreview) |
| Telefoon en laptop gebruiken dezelfde functies, één administratie | OK |
| Bank: handmatige import, overlappende periodes geen probleem, voorstellen, goedkeuren | OK (CLAUDE.md) |
| Factuur pas betaald als er een betaling aan hangt | OK (mcp.ts: "betaald is een afgeleide van de geboekte betalingen") |
| Zonder export loopt het achter, zelf aan denken | OK (geen signaal voor een oude bankimport in lib/acties.ts) |
| Video-opnames, AI-opdrachten, ritten vanuit Bladel | OK |
| Geen klantnamen, bedragen of aantallen | OK |

Telling: 22 OK, 0 GEREPAREERD, 0 TWIJFEL.

## 5. uren-en-kilometers-automatisch.md

| Bewering | Status |
|---|---|
| Km-registratie lag maanden stil terwijl er opnames en bezoeken waren | OK (lib/kmVoorstellen.ts kop, CLAUDE.md) |
| Km sinds 2022 bijgehouden | OK (lib/km.ts: "draait sinds juni 2022") |
| Lange tijd alleen via browserformulier, onderweg niets vast te leggen | OK (lib/km.ts) |
| Augustus 2026: laatste rit stond op 15 mei | OK (CLAUDE.md, vastgelegd 12-8-2026) |
| Quote "Loggen was nooit het probleem. Eraan denken wel." | OK (lib/acties.ts en kmVoorstellen.ts, bijna letterlijk) |
| Bronnen: opname in verleden met adres, gesprek op locatie | OK (projecten met plaats of straat, interacties met kanaal "fysiek") |
| Elke rit retour vanaf Bladel, twee afspraken = twee ritten | OK (lib/km.ts, kmVoorstellen.ts) |
| Afstand: mediaan van eerdere ritten naar die plaats | OK (zoekAfstandUitHistorie, laatste 25 ritten). Detail: daarna valt het terug op een vaste tabel die ook uit John's eigen ritten is afgeleid. Niet vermeld, niet onjuist |
| Onbekende plaats: overslaan, één keer vragen, daarna bekend | OK (schrijfVoorstellen, bepaalAfstand) |
| Al geboekte ritten herkend, niets dubbel | OK (op projectId en op datum plus bestemming) |
| Hele lijst, één ja, dan wegschrijven, ook via telefoon | OK (km_bijwerken, preview-first) |
| Actielijst met aantal ritten en km, ook in "wat moet ik doen" | OK (km_ontbreekt) |
| Na 30 dagen laat, na 60 dagen rood | OK (urgentieVoor(30 - dagenOud, 60 - dagenOud)) |
| Uren nog zelf opgeven, in één zin, preview met tarief en bedrag | OK |
| Reistijdafspraak per opdracht: plaats en reisduur, ontbrekende reisuren op actielijst met uren | OK (lib/reisuren.ts, reisuren_ontbreekt) |
| Controle kwam erbij nadat reisuren pas bij maandopgave bleken te ontbreken | OK (lib/reisuren.ts, 29-09-2026) |
| 2026: € 0,25 per zakelijke km aftrekbaar bij eigen vervoermiddel (2025: € 0,23) | OK, letterlijk (Belastingdienst). Geldt voor een vervoermiddel dat je bezit of privé huurt. "Eigen auto" dekt dat |
| Interne link /ai/administratie | OK |

Telling: 18 OK, 0 GEREPAREERD, 0 TWIJFEL.

Bijvangst buiten de blog: `os/lib/km.ts` rekent met `KM_TARIEF_CENT = 23`, met als commentaar "€0,23/km (fiscaal maximum 2026)". Volgens de Belastingdienst is dat € 0,25 in 2026 (€ 0,23 was 2025). Het km-overzicht en de cockpitmelding tonen dus een te lage vergoeding voor 2026. De blog zegt hier niets over, dus niets aangepast. Wel iets voor John om te laten repareren.

## 6. wat-kost-een-ai-video.md

| Bewering | Status |
|---|---|
| Standard $15 / 625, Pro $35 / 2250, Max $95 / 9500 per maand | OK (runway.com/pricing) |
| Per jaar $12, $28, $76 per maand | OK |
| Standard en Pro: ongebruikte credits vervallen op factuurdatum | OK (help-artikel via Zendesk-API, 15-9-2026). Max rolt tot één maand door, de blog zegt daar niets over |
| Extra credits minimaal 1000, vervallen niet | OK |
| Prijs extra pakket in de app niet openbaar | OK (niet gevonden op pricing of help) |
| API: 1 dollarcent per credit | OK (docs.dev.runwayml.com) |
| 1 tot 2,4 dollarcent per credit | OK (eigen rekensom, klopt) |
| Aleph 2.0 28/s, Gen-4.5 12/s, Seedance 2.5 1080p 68/s + 34/s input-video, Veo 3.1 20 of 40/s | OK (academy.runwayml.com/models-pricing, dev-docs) |
| Je betaalt per gemaakte seconde, ook voor een weggegooide poging | OK als afleiding (kosten per generatie, geen terugbetaalregel gevonden) |
| Sprookje ongeveer 1000 credits, eigen schatting | TWIJFEL: de prijslijst komt hoger uit. Via de Runway-koppeling opgevraagd: twee Aleph-stukken van samen 18 s (504 credits) en twee Seedance 2.5-shots in 1080p van 4 s en 8 s (12 x 68 = 816 credits). Samen ongeveer 1320 credits, nog zonder muziek en geluid. Omgerekend 13 tot 32 dollar, met Pro ongeveer 21 dollar. Een lezer die zelf rekent, ziet dat verschil. John moet het echte verbruik in Runway nakijken (Plans and Billing of gebruikshistorie). Daarna kloppen de excerpt, de intro en de alinea "Het sprookje, omgerekend" weer, of ze moeten mee |
| 18 s Aleph, twee Seedance-shots (bospad, kabouter) | OK (Runway-taken 4e48a4d2 9,03 s, f41c1235, 14038eb7 4 s 1080p, d12ddd29 8 s 1080p) |
| Muziek, bosgeluid en glinstergeluid los erbij | OK (Runway-taken 8d22fb31, 16ccabbe, 4abb14c5) |
| 18 s Aleph = 504 credits | OK (18 x 28) |
| 10 tot 24 dollar, Pro ongeveer 16 | OK als rekensom op 1000 credits. Hangt aan het twijfelpunt hierboven |
| ChatGPT voor sfeerbeeld, Claude voor prompt | OK (promptsheet.md) |
| Stappen: sfeerbeeld, uitschrijven, bijsturen, naast origineel, boek per frame terug, virtuele camera, afwerking | OK (promptsheet.md, app/sprookje/page.tsx) |
| Uren niet bijgehouden, geen getal | OK (in geen bron een tijdsbesteding) |
| AI haalde het boek weg dat verkocht moest worden | OK (page.tsx) |
| Aleph maakt stukken van maximaal 30 seconden | OK, nu ook op een Runway-pagina nagekeken: "edit clips up to 30 seconds long at 1080p" (runway.com/en/news/introducing-aleph-2-and-edit-studio) |
| Interne links /blog/telefoonfilmpje-sprookje-..., /blog/telefoonvideo-flets-hdr, /sprookje | OK |

Telling: 17 OK, 0 GEREPAREERD, 1 TWIJFEL.

## 7. telefoonvideo-flets-hdr.md

| Bewering | Status |
|---|---|
| Op mijn Pixel stond HDR aan | OK (CLAUDE.md: Pixel-video is HLG, bt2020) |
| Volgens Apple neemt iPhone op ondersteunde modellen video op in HDR | OK, letterlijk (Dolby Vision HDR) |
| Programma's die HDR niet herkennen tonen het flets en grijs, browser en videotools | OK (CLAUDE.md, eigen werkervaring vastgelegd) |
| Eind september video van Pixel kwam flets uit, oorzaak HDR | OK (CLAUDE.md, 26 september 2026) |
| Sindsdien zet ik elke video van die telefoon eerst om | OK als vastgelegde werkregel (CLAUDE.md "in élke pipeline"). Niet gemeten of het bij elke video gebeurde |
| iPhone: Instellingen > Camera > Neem video op > HDR-video of HDR uit | OK, letterlijk (Apple NL) |
| Pixel: videomodus, linksonder Video-instellingen, 10-bits HDR vanaf Pixel 7 | OK (Google NL-hulp). De pagina beschrijft aanzetten, uitzetten op dezelfde plek is afgeleid |
| Samsung: tandwiel, geavanceerde video-opties onder Video's, HDR10+ uit | OK (Samsung US). Nederlandse menunamen vertaald, niet op een NL-pagina gecontroleerd |
| Samsung Galerij: formaat, HDR10+ naar SDR | OK |
| iMovie: HDR uit bij delen | OK, letterlijk (Apple NL 102241) |
| Gewoon beeld heet Rec.709 | OK |
| Aleph 2.0 28 credits per seconde | OK |
| Nooit HDR-video uploaden zonder omzetten | OK (CLAUDE.md, Runway-regel) |
| Sprookje voor een opdracht, in gewoon beeld opgenomen | OK (page.tsx noemt toestemming van een klant, bronbestand gemeten als bt709 door de schrijver. Upload IMG_7153.mov bestaat in het Runway-account) |
| Gids noemt HDR als tip | OK (page.tsx regel 164) |
| Interne links | OK |

Telling: 16 OK, 0 GEREPAREERD, 0 TWIJFEL.

## Samenvatting

| Blog | OK | GEREPAREERD | TWIJFEL |
|---|---|---|---|
| ai-geletterdheid-ai-act | 17 | 1 | 0 |
| schaduw-ai-medewerkers | 12 | 2 | 0 |
| kopen-of-laten-bouwen | 8 | 0 | 1 |
| eigen-bedrijfssysteem | 22 | 0 | 0 |
| uren-en-kilometers-automatisch | 18 | 0 | 0 |
| wat-kost-een-ai-video | 17 | 0 | 1 |
| telefoonvideo-flets-hdr | 16 | 0 | 0 |

Beslispunten voor John:
1. wat-kost-een-ai-video: is het echt ongeveer 1000 credits? Volgens de prijslijst kosten alleen de videostukken al ongeveer 1320. Kijk het verbruik na in Runway en pas daarna zo nodig het getal en de dollarbedragen aan (excerpt, intro, "Het sprookje, omgerekend").
2. kopen-of-laten-bouwen: wil je publiek beloven dat elk voorstel vermeldt wat de klant kant-en-klaar kan kopen, met prijs en beperkingen?
