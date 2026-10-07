# Verificatie blogcorrecties, 7 oktober 2026

Onafhankelijke controle van de niet-gecommitte wijzigingen in lib/blog.ts, lib/blog/ai-posts-1 t/m 5.ts en components/common/Infographic.tsx (fc-rebrand). Niets gecommit, geen build of dev gedraaid.

## Samenvatting
- GEREPAREERD (feitelijk): 4 (008 bestandsgrootte, 008 formaten, 038 cateringlijst, 069 Microsoft-vergaderverslag)
- GEREPAREERD (tikfouten): 10 vervangingen in 9 soorten (zie onderaan)
- TWIJFEL: 2 (062 "drie dingen" naast vier opsommingstekens, Infographic 35% tegen "een kwart tot een derde")
- OK: alle overige wijzigingen (ca. 55 regels)
- Sprookje-post (slug telefoonfilmpje-sprookje-waar-ai-de-mist-in-ging): ONGEWIJZIGD. Laatste diff-hunk in ai-posts-5.ts zit op regel 493, de post begint op 504. md5 van slug tot einde bestand is gelijk aan HEAD.
- tsc --noEmit -p .: exit 0, geen fouten (vóór en na mijn reparaties gedraaid).
- Taalregels: in de toegevoegde regels geen em-dash, geen en-dash en geen puntkomma (grep op de + regels van de diff).

## Specifiek verdachte punten

### Gloria Mark / Gallup (ai-posts-5, mail-blog): OK
Link https://news.gallup.com/businessjournal/23146/too-many-interruptions-work.aspx is een interview met Gloria Mark (UC Irvine). Letterlijk: "Most interrupted work was resumed on the same day -- 81.9 percent -- and it was resumed, on average, in 23 minutes and 15 seconds." "Universiteit van Californië" en "ruim twintig minuten" kloppen.

### Blog 001 review-quote: OK
De quote staat in de blog zonder naam (type quote heeft geen naamveld). De tekst is een letterlijk ingekort stuk van de Google-review van Anita Fiers die al publiek in lib/constants.ts REVIEWS staat ("Iedere keer weer zijn we verrast ... echt niets is voor hem te veel."). Er is geen nieuwe klantnaam toegevoegd.

### Blog 038 Köningsdag (ai-posts-3): GEREPAREERD
- Oud (agent): "De verkoop liep tot een paar dagen voor het evenement en het systeem leverde daarna de lijst voor de catering."
- Nieuw: "De verkoop liep tot een paar dagen voor het evenement. Daarna kon de organisatie de broodjeskeuzes per persoon als lijst downloaden voor de catering."
- Reden: het systeem leverde niets vanzelf. In 03-klanten/koningsdag-reusel/ticketpagina/tickets/admin.php staat een handmatige knop "Download CSV (Excel)" met per persoon broodje en allergie. Verkoop sloot 23-4, evenement 27-4 (README), dus het eerste deel klopt.

### Blog 008 Funda-specificaties (lib/blog.ts): GEREPAREERD
Funda-helpdesk (help.fundadesk.nl, artikel 360021764979) laadt niet (Salesforce-laadscherm, ook via curl en alternatieve URL's), en de agent had alleen een zoekfragment. Niet elders te bevestigen. Dus zonder exacte getallen:
- Oud: "Bestandsformaat: MP4 (H.264) is de veiligste keuze, al accepteert Funda ook andere formaten" / Nieuw: "Bestandsformaat: MP4 (H.264) is de veiligste keuze"
- Oud: "Maximale bestandsgrootte: 1 GB" / Nieuw: "Maximale bestandsgrootte: check de actuele limiet in de Funda-helpdesk voor je uploadt"
- 720p staat niet in de blogtekst, niets aan te doen. "16:9 (breedbeeld)" en de logo-tip als eigen tip: OK.

### Blog 009 YouTube Shorts / tubefilter: OK
Tubefilter 18-6-2025: "Mohan announced that Shorts now averages 200 billion daily views." Blogdatum 8-10-2025, dus geen anachronisme.

### Blog 029 Telecompaper via Emerce (ai-posts-2): OK
Emerce, 5-8-2025: panel van 1.800 consumenten, actief gebruik ChatGPT 41%, Copilot 13%, Gemini 8%. Blogdatum 12-1-2026, dus na de bron. Kanttekening (geen fout): titel "De 10 meest gebruikte AI-apps in Nederland" staat nog naast een intro die nu "die ik ondernemers aanraad" zegt, dat stond al als punt voor John in het logboek.

### Blog 049 Claude-prijzen (ai-posts-4): OK
claude.com/pricing: Team standaard 25 dollar per persoon per maand (maandelijks, 20 bij jaarbetaling), Max vanaf 100. Max 20x is 200 dollar (pagina toont "From $100", 200 bevestigd via meerdere bronnen). "100 tot 200" en "25 dollar per persoon" kloppen.

### Blog 069 Microsoft 365 / Google Workspace (ai-posts-5): 1 GEREPAREERD, 1 OK
- Vergaderverslag. Oud: "(bij Google vanaf Business Standard, bij Microsoft alleen met een betaalde Copilot-licentie)" / Nieuw: "(bij Google vanaf Business Standard, bij Microsoft met een betaalde Copilot- of Teams Premium-licentie)". Reden: Teams intelligent recap zit ook in Teams Premium (Microsoft support "Meeting recap in Microsoft Teams"). Google "Take notes for me" vanaf Business Standard bevestigd op support.google.com/mail/answer/13952129.
- Zoeken op betekenis: OK. Zelfde Google-pagina: AI Overview in Gmail-zoeken vanaf Business Starter, Ask Gemini in Drive vanaf Business Standard, dus "deels al in het basispakket" klopt.

## Overige wijzigingen

### Infographic.tsx
- Tijdwinst (40/50 naar 35, caption "Illustratief voorbeeld, geen meting ... een kwart tot een derde"): TWIJFEL, klein. Twee balken staan op 35%, iets boven "een derde". Niet aangepast, want het is als illustratie gemarkeerd. Optie: 35 naar 33 of caption "rond een derde".
- AiVolwassenheid ("geeft je drie concrete kansen"): OK, SCAN-ARCHITECTUUR.md zegt dat de quickscan exact 3 kansen afdwingt.

### lib/blog.ts (001 t/m 014): OK
001 excerpt/p/ul zonder ongebronde 40%-claim, 004 hook-excerpt, 005 AI kan gezicht en stem nabootsen, 006 organische video, 007 "vaak", 009 intro en lijst, 010 locatietag als vindbaarheid, 011 "groot deel haakt af", 012 avatar heeft weinig opname nodig, 013 Europa (excerpt, Wenen "een dag rijden", beschikbaarheid), 014 SLIM (uitvoerder Uitvoering van Beleid SZW, loting bij overschrijding, training zelf niet vergoed). Geen tegenspraak met de rest van de posts gevonden, zinnen lopen.

### ai-posts-1 en 2: OK
Claude "in mijn ervaring", "Meestal", chatbot-rij, formule rol/context/taak/format (vier delen, tekst en kop consistent), rekensom 6 uur min een derde = ongeveer 2 uur, 024 Köningsdag als 2025-versie (formulier, Google Sheets, ticket per mail, conform logboekbron), "eigen bedrijfssysteem", Otter verwerkt geen Nederlands (Otter ondersteunt Engels, Frans, Spaans), 030 "Veel daarvan zijn alweer verdwenen", 033 Claude-app versus API-koppeling.

### ai-posts-3: OK (behalve 038 hierboven)
Gemini 3.1-excerpt en intro, "versie maakt", voice-orchestrator in verleden tijd (gestopt mei 2026), 037 update-notitie oktober 2026, "zoals mails, teksten, samenvattingen en ideeën", agent-alinea in verleden tijd.

### ai-posts-4: OK
"Een agent aansturen", kosten-excerpt en intro, "Serieus draaien: reken op meer", 4 tools x 20 tot 50 = 80 tot 200 (rekensom klopt), agent op gebruik, "standaardabonnementen", Anthropic-modellen generiek, offerte "flink deel van je avond", stemopname als persoonsgegeven en biometrisch bij herkenning (AVG art. 9), "nieuwste model".

### ai-posts-5: OK (behalve 069 hierboven, en TWIJFEL 062)
Offerte-intro, "klein deel", 060 "de meeste teams die ik zie", 061 "het deel van de gevallen", GPT-Actions en betaald abonnement om een GPT te maken (gratis gebruiken kan), klantenservice, RAG-alinea, "veroudert ongemerkt", "snel", 068 "Vaak", "In mijn ervaring onderschatten mensen", 070 "zie ik zelden gebeuren", AdSense (geen minimumaantal artikelen bij Google, geen gepubliceerde gemiddelden, affiliate-vermelding verplicht).
- 062 excerpt "vier dingen" naar "drie dingen": TWIJFEL. De lopende tekst zegt "Die drie extra onderdelen" (gegevens, plek, controle), maar direct daaronder staat een lijst met vier punten (inclusief "De instructie staat ergens vast"). Een lezer telt vier. Beide lezingen zijn te verdedigen, niet aangepast. John kiest.

## Tikfouten hersteld (alleen lib/blog.ts en lib/blog/*.ts, niet in de sprookje-post)
- "rytme" naar "ritme" (blog.ts, 004)
- "geedited" naar "bewerkt" (blog.ts, 006: "video's worden bewerkt en opgeleverd")
- "domante" naar "dominante" (blog.ts, 009)
- "het nieuwe standaard" naar "de nieuwe standaard" (blog.ts, 009, staat alleen in de titel. Expliciet gevraagde tikfout, slug ongewijzigd: verticale-video-nieuw-standaard)
- "aanhält" naar "aanhoudt" (blog.ts, 013)
- "iconic" naar "iconische" (blog.ts, 013: "het iconic witte en blauwe eiland" was echt fout)
- "oplevert" naar "oplever" (blog.ts, 008: "Elke video die ik oplevert" was echt fout). Overige "oplevert" correct gebruikt, niet aangeraakt.
- "categorieen" naar "categorieën" (ai-posts-1, 4x)
- "programmas" naar "programma's" (ai-posts-1, 1x)
- "productfotos" naar "productfoto's" (ai-posts-1, 1x)

## Buiten scope opgemerkt
git diff --stat lib/ toont ook lib/constants.ts als gewijzigd (44 regels). Niet in mijn opdracht, niet gecontroleerd.
