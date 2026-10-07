# Logboek ronde 2 pagina's future-content.nl (7 oktober 2026)

Uitvoering van John's besluiten van 7 oktober 2026 op de open punten uit log-paginas.md (WACHT OP AANBODKEUZE, WACHT OP KEUZE CONCURRENTIETABEL, JOHN BEVESTIGT).
Repo: 00-future-content/website/fc-rebrand (branch nieuwe-huisstijl). Niet gecommit, niet gebuild, wel `npx tsc --noEmit -p .`.
Regelnummers zijn die van vóór de wijziging (originele bestand).

Besluiten:
1. Aanbod: gratis AI-scan, werkende proef €750 inclusief btw (gaat van de bouwprijs af), bouw €2.500 tot €8.500, beheer vanaf €250 per maand. Heel grote bouw €8.500 tot €15.000. Eén garantie: die van /ai.
2. Concurrentietabel /makelaars weg.
3. Köningsdag Reusel = ons eigen festival.
4. Restaurant-chatbot = demo.
5. Geen "verving vier abonnementen".
6. Hasselt zonder huisnummer in zichtbare tekst.
7. Kaart "Sneller verkopen" krijgt een titel die past bij de tekst.

## Wijzigingen

### Besluit 2: concurrentietabel /makelaars

1. app/makelaars/page.tsx:319-387 (sectie CONCURRENTIEVERGELIJKING)
   - Oud: hele sectie "Wat kost het elders?" met tabel (Grote videobureaus, Van Heertum Media, VideoFunda, Future Content) en voetnoot "Prijzen gebaseerd op marktonderzoek februari 2026. Excl. BTW."
   - Nieuw: sectie verwijderd. De pakketten-sectie loopt nu direct door naar de portfolio-sectie.
   - Besluit 2.
2. app/makelaars/page.tsx:9 (import)
   - Oud: `import { VASTGOED_PACKAGES, PHOTOS, STACK_VIDEOS, SELLER_QUOTES, COMPETITOR_COMPARE, SITE }`
   - Nieuw: `import { VASTGOED_PACKAGES, PHOTOS, STACK_VIDEOS, SELLER_QUOTES, SITE }`
   - Besluit 2 (ongebruikte import).
3. app/makelaars/page.tsx:7 (lucide-import)
   - Oud: `... Star, MessageCircle, ShieldCheck,`
   - Nieuw: `... Star, MessageCircle,`
   - Besluit 2 (ShieldCheck werd alleen in de tabel gebruikt).
4. lib/constants.ts:165-171 (COMPETITOR_COMPARE)
   - Oud: commentaar "Concurrentievergelijking vastgoed" plus de array met vier rijen (incl. Van Heertum Media "€350–600", VideoFunda "vanaf €279").
   - Nieuw: verwijderd. Werd alleen op /makelaars gebruikt (grep over app, components, lib: geen andere treffers).
   - Besluit 2.

### Besluit 7: kaart "Sneller verkopen" op /makelaars

5. app/makelaars/page.tsx:125
   - Oud: title "Sneller verkopen"
   - Nieuw: title "Compleet beeld vooraf"
   - Besluit 7. De tekst eronder ("Een video geeft kopers een compleet beeld van de woning, nog voor ze een bezichtiging plannen.") is ongewijzigd, de titel volgt die nu.

### Besluit 6: Hasselt zonder huisnummer (/portfolio, /portfolio/riethoven-hasselt-5, /makelaars)

6. lib/constants.ts:497 (PORTFOLIO, title, zichtbaar op /portfolio, de detailpagina, metadata, alt-teksten en vorige/volgende-links)
   - Oud: "Riethoven, Hasselt 5"
   - Nieuw: "Riethoven, Hasselt"
   - Besluit 6. Slug "riethoven-hasselt-5", video-pad en poster-pad ongewijzigd (URL's, niet zichtbaar als tekst).
7. lib/constants.ts:504 (details.context, zichtbaar op /portfolio/riethoven-hasselt-5)
   - Oud: "Hasselt 5 staat in het pittoreske Riethoven, een dorp waar ..."
   - Nieuw: "Deze woning staat in het pittoreske Riethoven, een dorp waar ..."
   - Besluit 6.

### Besluit 3: Köningsdag Reusel is ons eigen festival

8. components/sections/Cases.tsx:226-227 (intro, homepage)
   - Oud: "... een eigen tool en een systeem gebouwd voor een klant."
   - Nieuw: "... een eigen tool en een ticketsysteem voor ons eigen festival."
   - Besluit 3.
9. components/sections/Cases.tsx:64 (kaart 2, homepage en /ai)
   - Oud: "Voor het Vorstelijk Verwenfestijn in Reusel bouwde ik een online ticketsysteem op maat, ..."
   - Nieuw: "Voor ons eigen festival, het Vorstelijk Verwenfestijn in Reusel, bouwde ik een online ticketsysteem op maat, ..."
   - Besluit 3. "inclusief betaallink via Mollie en volledige hosting" ongemoeid (hosting-punt valt niet onder de besluiten van vandaag).
10. components/sections/Cases.tsx:13-14 (code-commentaar, niet zichtbaar)
    - Oud: "is een naam-bare klant omdat het een publiek evenement betreft."
    - Nieuw: "is ons eigen festival, het Vorstelijk Verwenfestijn (publiek evenement, naam mag)."
    - Besluit 3, zodat een volgende bewerker het niet weer als klant opschrijft.
11. app/cases/ticketsysteem-koningsdag/page.tsx:83-84 (hero)
    - Oud: "Voor het Vorstelijk Verwenfestijn in Reusel bouwde ik een online ticketsysteem op maat, ..."
    - Nieuw: "Voor ons eigen festival, het Vorstelijk Verwenfestijn in Reusel, bouwde ik een online ticketsysteem op maat, ..."
    - Besluit 3 (zelfde zin als de kaart).
12. app/cases/ticketsysteem-koningsdag/page.tsx:7 (code-commentaar)
    - Oud: "(echte klant, naam mag,"
    - Nieuw: "(ons eigen festival, naam mag,"
    - Besluit 3.
    - Al goed en ongemoeid: "onze eigen Köningsdag" in lib/constants.ts:975, :1008 en app/over/page.tsx:102.

### Besluit 4: restaurant-chatbot is een demo

13. lib/constants.ts:301 (AI_WEDGES chatbot, bewijs, zichtbaar op /ai/chatbot)
    - Oud: "Ik bouwde een chatbot die de gasten van een restaurant in de chat te woord staat en direct een tafel reserveert in het boekingssysteem van de zaak. Hetzelfde principe past op jouw website."
    - Nieuw: "Ik bouwde een demo van een chatbot die gasten van een restaurant in de chat te woord staat en direct een tafel reserveert in een boekingssysteem. Hetzelfde principe past op jouw website."
    - Besluit 4. "van de zaak" weg, want dat suggereert een echte zaak.
14. lib/constants.ts:1208 (BRANCHES horeca, casusBewijs, zichtbaar op /voor/horeca)
    - Oud: "De restaurant-chatbot op mijn pagina over AI-chatbots laat zien hoe zo'n boekingsflow werkt."
    - Nieuw: "De demo van een restaurant-chatbot op mijn pagina over AI-chatbots laat zien hoe zo'n boekingsflow werkt."
    - Besluit 4.
15. lib/constants.ts:734-735 (PROOF_POINTS, staat op geen pagina, wel data)
    - Oud: tag "Voor een klant", desc "Een gastassistent in de chat die direct een tafel reserveert in het boekingssysteem van de zaak."
    - Nieuw: tag "Demo", desc "Een demo van een gastassistent in de chat die direct een tafel reserveert in een boekingssysteem."
    - Besluit 4 ("nergens als klantproject"), zodat het niet terugkomt als iemand PROOF_POINTS weer op een pagina zet.

### Besluit 5: geen "verving vier abonnementen"

16. lib/constants.ts:271 (AI_WEDGES offertes, bewijs, /ai/offertes)
    - Oud: "... draaien op een systeem dat ik zelf maakte, het verving vier losse abonnementen. Dezelfde aanpak zet ik voor jou op."
    - Nieuw: "... draaien op een systeem dat ik zelf maakte. Dezelfde aanpak zet ik voor jou op."
    - Besluit 5.
17. lib/constants.ts:331 (AI_WEDGES administratie, bewijs, /ai/administratie)
    - Oud: "Mijn eigen bedrijfssysteem automatiseert mijn uren, facturen, btw en leads. Het verving vier losse abonnementen. Dat systeem draait al maanden ..."
    - Nieuw: "Mijn eigen bedrijfssysteem automatiseert mijn uren, facturen, btw en leads. Dat systeem draait al maanden ..."
    - Besluit 5.
18. lib/constants.ts:1026 (BRANCHES schoonmaak, observatieBody, /voor/glazenwasser-en-schoonmaak)
    - Oud: "... letterlijk de blauwdruk voor zo'n bedrijfsvoering. Verving voor mezelf vier losse abonnementen."
    - Nieuw: "... letterlijk de blauwdruk voor zo'n bedrijfsvoering."
    - Besluit 5.
19. lib/constants.ts:1058 (BRANCHES schoonmaak, casusBewijs, zelfde pagina)
    - Oud: "... letterlijk de architectuur voor zo'n bedrijfsvoering. Verving voor mezelf vier losse abonnementen."
    - Nieuw: "... letterlijk de architectuur voor zo'n bedrijfsvoering."
    - Besluit 5.
20. lib/constants.ts:745 (PROOF_POINTS, staat op geen pagina)
    - Oud: "... BTW en leads automatiseert. Verving vier losse abonnementen. De directe blauwdruk ..."
    - Nieuw: "... BTW en leads automatiseert. De directe blauwdruk ..."
    - Besluit 5.
    - Bewust ongemoeid: lib/constants.ts:324 (pijnpunt op /ai/administratie: "Je betaalt voor vier abonnementen die eigenlijk één systeem zouden moeten zijn."). Dat gaat over de lezer, niet over John's eigen systeem.

### Besluit 1: één aanbod (scan, proef €750 incl. btw, bouw €2.500 tot €8.500, beheer vanaf €250) en één garantie

Bron voor de bewoording: app/ai/page.tsx (FAQ "Wat kost het?", garantieblok) en AI_PRIJS_TRAP / AI_GARANTIE in lib/constants.ts. AI_GARANTIE is dezelfde Tijd-terug-garantie als op /ai (30 dagen, minstens de helft, zwart-op-wit gemeten, gratis doorwerken of bouwbedrag terug), alleen niet inbox-specifiek geformuleerd. Die algemene formulering is gebruikt waar het niet over de inbox gaat. /ai zelf en AI_GARANTIE zijn niet gewijzigd.

#### /werkwijze

21. lib/constants.ts:717-723 (METHOD_STEPS, op /werkwijze en in de trechter-illustratie)
    - Oud: 01 "Kennismaking", 02 "Workshop op locatie" (met werkend proof of concept), 03 "Vervolg, je tweede brein", 04 "Offerte, bouwen en beheren".
    - Nieuw: 01 "Gratis AI-scan" ("Je vult je bedrijf en website in. Meestal binnen 24 uur krijg je een persoonlijke video terug met waar AI in jouw bedrijf tijd oplevert. Liever eerst even bellen? Dat kan ook."), 02 "Werkende proef" ("Voor €750 inclusief btw bouw ik een werkende proef op je eigen werk, zodat je het ziet werken vóór je de bouw betaalt. Dit bedrag gaat er volledig af als je doorgaat."), 03 "De bouw" ("Vaste prijs, gescoped na de proef: tussen €2.500 en €8.500. Klein MKB rond de ondergrens, een bedrijf met volume hoger. Geen uren, geen verrassingen."), 04 "Beheer" ("Vanaf €250 per maand houd ik het draaiend: updates, onderhoud en verbeteringen. Jij gebruikt, ik beheer."). Commentaar erboven aangepast.
    - Besluit 1. Teksten overgenomen uit AI_PRIJS_TRAP. Nog steeds vier stappen, dus de trechter (WerkwijzeFunnel) en de kop "In vier stappen" kloppen.
22. app/werkwijze/page.tsx:47-50 (intro)
    - Oud: "... Een kennismaking als voordeur, een workshop met proof of concept als tweede stap, tweede brein als fundament, en pas daarna een offerte voor bouwen en beheren."
    - Nieuw: "... Een gratis AI-scan als voordeur, een werkende proef op je eigen werk als tweede stap, en pas daarna bouwen en beheren."
    - Besluit 1.
23. app/werkwijze/page.tsx:67 (h2 trechter)
    - Oud: "Van kennismaking bovenaan naar werkende oplossing onderaan."
    - Nieuw: "Van gratis scan bovenaan naar werkende oplossing onderaan."
    - Besluit 1.
24. app/werkwijze/page.tsx:116 (label boven de uitleg "Wat is dat eigenlijk, een tweede brein?")
    - Oud: "Stap 3 toegelicht"
    - Nieuw: "Core-module 02 toegelicht"
    - Besluit 1: tweede brein is geen vaste stap meer. De uitleg zelf blijft staan, want het tweede brein bestaat nog als core-module 02 (CORE_MODULES, direct eronder op dezelfde pagina).
25. app/werkwijze/page.tsx:251-252 (slot-CTA)
    - Oud: "Of een workshop met proof of concept is voor jullie team de logische vervolgstap."
    - Nieuw: "Of een werkende proef op je eigen werk is de logische vervolgstap."
    - Besluit 1.
26. app/werkwijze/layout.tsx:5, :7, :11 (metadata)
    - Oud: title "Werkwijze | Van kennismaking tot AI die draait", description "Zo werk ik: eerst een vrijblijvende kennismaking, dan een workshop met een proof of concept, een tweede brein voor je bedrijf, en een offerte voor bouwen en beheren. Helder, stap voor stap.", OG "Van kennismaking tot werkende AI: workshop met proof of concept, tweede brein, bouwen en beheren."
    - Nieuw: title "Werkwijze | Van gratis scan tot AI die draait", description "Zo werk ik: eerst een gratis AI-scan, dan een werkende proef van €750 inclusief btw op je eigen werk, daarna de bouw en het beheer. Helder, stap voor stap.", OG "Van gratis AI-scan tot werkende AI: werkende proef, bouwen en beheren."
    - Besluit 1. Valt buiten de letterlijke bestandslijst (layout.tsx van /werkwijze), maar is de zoekmachine-tekst van dezelfde pagina en zei het oude model.
27. components/sections/WerkwijzeFunnel.tsx:8 en :33 (commentaar en aria-label)
    - Oud: "kennismaking bovenaan ... tot bouwen+beheren" / aria-label "... van kennismaking bovenaan naar bouwen en beheren onderaan."
    - Nieuw: "gratis AI-scan bovenaan ... tot beheer" / aria-label "... van de gratis AI-scan bovenaan naar beheer onderaan."
    - Besluit 1 (aria-label is voor schermlezers zichtbare tekst).

#### /voor/[branche] (alle zeven branchepagina's)

28. app/voor/[branche]/page.tsx:255 (h2 "Een eerste stap")
    - Oud: "Een halve dag op locatie, vanaf €750 ex BTW."
    - Nieuw: "Een werkende proef op je eigen werk, €750 inclusief btw."
    - Besluit 1.
29. app/voor/[branche]/page.tsx:258-271 (twee alinea's)
    - Oud: "De meeste klanten beginnen met een workshop op locatie. Een halve dag, vanaf €750 ex BTW (mogelijk deels via de SLIM-subsidie, ik lever het scholingsplan-document mee). ... drie concrete kansen op papier ..." en "Wil je daarna bouwen, dan begint dat met een intake-sessie ... tweede brein ... Eenmalige bouw plus maandelijks beheer en credits. Het maandbedrag zie je vooraf op een dashboard, inclusief wat het je oplevert."
    - Nieuw: "Je begint met de gratis AI-scan. Daarna bouw ik voor €750 inclusief btw een werkende proef op je eigen werk, zodat je het ziet werken vóór je de bouw betaalt. Dat bedrag gaat er volledig af als je doorgaat." en "Wil je daarna bouwen, dan kiezen we welke modules uit het platform passen, met de {branche}-skin als basis. De bouw is maatwerk, gescoped na de proef: tussen €2.500 en €8.500, plus een maandbedrag vanaf €250 voor beheer en doorontwikkeling."
    - Besluit 1. SLIM-zin weg: de proef is geen scholing (zelfde reden als JSON-LD #45 in ronde 1). "credits" en "dashboard" weg (open punt /voor #3), het nieuwe model noemt ze niet.
30. lib/constants.ts:858 (type Branche, commentaar bij casusAanbod)
    - Oud: `// de "eerste klant krijgt workshop terug" tekst`
    - Nieuw: `// de eerste stap: werkende proef van €750 incl. btw (plus de garantie waar die genoemd wordt)`
    - Besluit 1.
31. lib/constants.ts:910 (transport, casusAanbod)
    - Oud: "Mijn eerste paying klant in transport krijgt de workshop terug als korting op de bouwfase. Geen experiment voor jou, wel mijn investering om de eerste case in deze skin neer te zetten."
    - Nieuw: "Wil je verder, dan bouw ik eerst een werkende proef van €750 inclusief btw op je eigen werk. Dat bedrag gaat van de bouwprijs af als je doorgaat."
    - Besluit 1. De korting voor de eerste klant vervalt, want in het nieuwe model gaat de proef voor iedereen van de bouwprijs af.
32. lib/constants.ts:960 (makelaardij, casusAanbod)
    - Oud: "Mijn eerste paying klant voor de content-engine-skin krijgt de workshop terug als korting op de bouwfase. Ideaal als je al met mij voor video werkt en de stap naar AI wil maken."
    - Nieuw: "Wil je verder, dan bouw ik eerst een werkende proef van €750 inclusief btw op je eigen werk. Dat bedrag gaat van de bouwprijs af als je doorgaat. Ideaal als je al met mij voor video werkt en de stap naar AI wil maken."
    - Besluit 1.
33. lib/constants.ts:1060 (schoonmaak, casusAanbod)
    - Oud: "Mijn eerste paying klant in glazenwasserij of schoonmaak krijgt de workshop terug als korting op de bouwfase. Plus 6 maanden beheer op 50% van het normale tarief."
    - Nieuw: "Wil je verder, dan bouw ik eerst een werkende proef van €750 inclusief btw op je eigen werk. Dat bedrag gaat van de bouwprijs af als je doorgaat. Plus de Tijd-terug-garantie: neemt mijn AI na 30 dagen niet minstens de helft van je terugkerende werk zelfstandig over, zwart-op-wit gemeten, dan werk ik gratis door tot dat wel zo is, of je krijgt je bouwbedrag terug."
    - Besluit 1 (proef en de ene garantie). "6 maanden beheer op 50%" vervalt.
34. lib/constants.ts:1110 (bouw, casusAanbod)
    - Oud: "Mijn eerste paying klant in bouw of installatie krijgt de workshop terug als korting op de bouwfase. Plus garantie: WhatsApp-bot draait binnen 3 weken of het werk is gratis."
    - Nieuw: zelfde tekst als #33.
    - Besluit 1.
35. lib/constants.ts:1160 (garages, casusAanbod)
    - Oud: "Mijn eerste paying klant in universele garage krijgt de workshop terug als korting op de bouwfase. Plus garantie: AI-receptionist draait binnen 4 weken of de eerste 3 maanden beheer zijn gratis."
    - Nieuw: zelfde tekst als #33.
    - Besluit 1.
36. lib/constants.ts:1210 (horeca, casusAanbod)
    - Oud: "Mijn eerste paying klant in horeca krijgt de workshop terug als korting op de bouwfase. Doelgroep: zaken met 10+ medewerkers en eigen website, Brabant."
    - Nieuw: "Wil je verder, dan bouw ik eerst een werkende proef van €750 inclusief btw op je eigen werk. Dat bedrag gaat van de bouwprijs af als je doorgaat. Doelgroep: zaken met 10+ medewerkers en eigen website, Brabant."
    - Besluit 1.

#### /scan (uitslagpagina's en pilotpagina)

37. app/scan/klaar/[jobId]/page.tsx:184-189 ("En daarna?")
    - Oud: "De stap na het gesprek is een proof of concept: €750. Ik draai een halve dag mee op locatie, interview je mensen en verzamel data uit je bedrijf. Daarna ga ik thuis aan de slag en binnen een week ligt er een proof of concept met wat het jouw bedrijf oplevert in tijd of geld."
    - Nieuw: "De stap na het gesprek is een werkende proef: €750 inclusief btw. Ik bouw de proef op je eigen werk, zodat je het ziet werken vóór je de bouw betaalt. Dat bedrag gaat er volledig af als je doorgaat."
    - Besluit 1. "Halve dag op locatie" en "binnen een week" weg: botsten met de pilotpagina en /ai (open punt /werkwijze #2, /scan #5). Code-commentaar regel 175 mee aangepast.
38. app/scan/diepte/klaar/[jobId]/page.tsx:116-121
    - Oud: "Willen we daarna samen verder, dan is de volgende stap meestal een proof of concept: €750. Ik draai een halve dag mee op locatie, ... binnen een week ligt er een proof of concept met wat het jouw bedrijf oplevert in tijd of geld."
    - Nieuw: "Willen we daarna samen verder, dan is de volgende stap een werkende proef: €750 inclusief btw. Ik bouw de proef op je eigen werk, zodat je het ziet werken vóór je de bouw betaalt. Dat bedrag gaat er volledig af als je doorgaat."
    - Besluit 1. Code-commentaar regel 101 mee aangepast.
39. app/scan/pilot/[jobId]/page.tsx:59 (pilotpagina, opsomming)
    - Oud: "• Niet tevreden? Je krijgt je geld terug"
    - Nieuw: "• Tijd-terug-garantie op de bouw: neemt de AI na 30 dagen niet minstens de helft van je terugkerende werk zelfstandig over, zwart-op-wit gemeten, dan werk ik gratis door tot dat wel zo is, of je krijgt je bouwbedrag terug"
    - Besluit 1 (één garantie). Let op: hiermee vervalt de geld-terug-belofte op de proef zelf. De rest van de pilotpagina ("Voor €750 ...", "Totaal €750 inclusief btw") volgde het model al.

#### /trainingen (alleen waar het de bouwroute beschrijft)

40. lib/constants.ts:769 (TRAINING.features)
    - Oud: "Afsluiting met een werkend proof of concept op jullie eigen data, ook als je daarna niks met mij doet"
    - Nieuw: "Afsluiting met drie concrete kansen op papier, ook als je daarna niks met mij doet"
    - Besluit 1: de werkende proef is nu de betaalde stap van €750, niet de afsluiting van een training. Sluit aan op het pakket "Workshop alleen" op dezelfde pagina en op llms.txt (open punt /trainingen #3).
41. app/trainingen/page.tsx:38 (agenda blok 4)
    - Oud: "... Plus vervolgpad: of jullie het zelf kunnen, of een intake + bouw past."
    - Nieuw: "... Plus vervolgpad: of jullie het zelf kunnen, of een werkende proef en bouw past."
    - Besluit 1.
42. app/trainingen/page.tsx:58-66 (pakket 2)
    - Oud: naam "Workshop + Intake", inhoud "Alles uit de workshop alleen" / "Plus intake-sessie van 2 uur op jullie locatie" / "Eerste opzet van een tweede brein voor jullie bedrijf" / "Concrete bouw-roadmap op papier" / "Geen verplichting tot vervolg"
    - Nieuw: naam "Workshop + werkende proef", inhoud "Alles uit de workshop alleen" / "Plus een werkende proef op jullie eigen werk" / "Proef €750 inclusief btw, gaat van de bouwprijs af als je doorgaat" / "Geen verplichting tot vervolg"
    - Besluit 1: intake en tweede brein als stap vervallen. Prijs van het pakket blijft "Op aanvraag" (training los product), de proef heeft zijn vaste prijs.
43. app/trainingen/page.tsx:76-78 (pakket 3 "Workshop + Bouw + 3 mnd beheer")
    - Oud: "Workshop + intake + tweede brein" / "Bouw van 1-2 modules uit het platform" / "3 maanden maandelijks beheer met dashboard"
    - Nieuw: "Workshop + werkende proef" / "Bouw van 1-2 modules uit het platform, tussen €2.500 en €8.500" / "3 maanden beheer, vanaf €250 per maand"
    - Besluit 1. "dashboard" weg (open punt /trainingen #5). Naam, "Live go-live + 1 quarterly business review" en "Volledig gedocumenteerd, beheer door mij" ongemoeid.

#### /over

44. app/over/page.tsx:19
    - Oud: "... eenmalige bouw plus maandelijks beheer met dashboard."
    - Nieuw: "... eenmalige bouw plus maandelijks beheer."
    - Besluit 1 (open punt /over #8, het model kent geen dashboard).
45. app/over/page.tsx:23-24
    - Oud: t "Lokaal, ik kom langs vanaf de intake", d "... Eerste gesprek 30 minuten online. Vanaf de intake of de workshop kom ik langs in heel Brabant."
    - Nieuw: t "Lokaal, ik kom langs", d "... Eerste gesprek 30 minuten online. Voor een training of de bouw kom ik langs in heel Brabant."
    - Besluit 1: de intake bestaat niet meer als stap. "Ik kom langs en bouw" staat al op /ai (AI_COMPARE).

#### JSON-LD (app/layout.tsx, op elke pagina)

46. app/layout.tsx:134-139 (Offer 1)
    - Oud: name "AI proof of concept", description "Betaalde proof of concept op je eigen werk, zodat je AI ziet werken vóór de bouw. Gaat van de bouwprijs af als je doorgaat.", price "750", priceCurrency "EUR"
    - Nieuw: name "Werkende AI-proef", description "Betaalde werkende proef op je eigen werk, zodat je AI ziet werken vóór de bouw. 750 euro inclusief btw, gaat van de bouwprijs af als je doorgaat.", price "750", priceCurrency "EUR", plus priceSpecification met valueAddedTaxIncluded: true
    - Besluit 1 (open punt /scan #5: JSON-LD noemde geen btw).
47. app/layout.tsx:147 (Offer 2)
    - Oud: "Vaste prijs, gescoped na de proof of concept. Van 2.500 tot 8.500 euro ..."
    - Nieuw: "Vaste prijs, gescoped na de werkende proef. Van 2.500 tot 8.500 euro ..."
    - Besluit 1 (zelfde naam als overal). Bedragen klopten al.

#### /llms.txt

48. public/llms.txt:17-35 (Hoofdaanbod en De werkwijze)
    - Oud: 1 "Workshop op locatie: halve dag (4 uur), vanaf €750 ex BTW." (met SLIM), 2 "Implementatietrajecten: eenmalige bouw €5.000-€15.000 + maandelijks beheer €300-€750.", 3 "AI-Quickscan ...". Werkwijze: "Gratis quickscan -> gesprek van 30 minuten -> werksessie op locatie (€750 ex BTW) -> Proof of Concept op de eigen casus -> bouw en doorlopend beheer."
    - Nieuw: 1 "Gratis AI-scan" (tekst van de oude quickscan-regel), 2 "Werkende proef: €750 inclusief btw ... gaat volledig van de bouwprijs af", 3 "Bouw en beheer: vaste prijs, gescoped na de proef, van €2.500 tot €8.500. Een heel grote bouw ligt tussen €8.500 en €15.000. Beheer vanaf €250 per maand." (platform- en beheerregels ongewijzigd), 4 "AI-training op locatie: halve dag (4 uur), prijs op aanvraag. Los product naast de bouw." (SLIM-regels en doel ongewijzigd). Werkwijze: "Gratis AI-scan -> werkende proef op de eigen casus (€750 inclusief btw, gaat van de bouwprijs af) -> bouw (€2.500 tot €8.500) -> beheer (vanaf €250 per maand)."
    - Besluit 1. De €8.500 tot €15.000 voor een heel grote bouw staat alleen hier, want alleen hier stond de oude €5.000 tot €15.000.

## Niet gewijzigd (bewust, of buiten de besluiten)

- /makelaars: na het weghalen van de tabel staan de pakketten-sectie en de portfolio-sectie direct onder elkaar, allebei met achtergrond #F3ECE0 en py-28. Geen lege sectie en geen kapotte import, maar wel twee lichte vlakken achter elkaar met extra witruimte. Niet opgelost, omdat dat een stijlwijziging is (bijv. de rest van de achtergronden omdraaien of een rand tussen de twee). John kiest.
- /ai (app/ai/page.tsx), AI_PRIJS_TRAP en AI_GARANTIE: bron, niet aangeraakt. Ze noemen "€750" zonder btw. Nergens staat nog "ex BTW", dus het is geen tegenstrijdigheid meer, wel minder volledig dan de andere pagina's.
- /voor/evenementen-en-festivals, casusAanbod (lib/constants.ts:1010): "Voor jouw evenement gebouwd in 2-3 weken. Eenmalige bouw + per-ticket-fee die altijd onder Weezevent zit." Ander verdienmodel (per-ticket-fee in plaats van proef en beheer vanaf €250). Niet aangepast, want het besluit noemt evenementen niet en een ticketfee laat zich niet vanzelf in het model passen. VRAAG AAN JOHN.
- /trainingen hero: TRAINING.title "De training is voor de meeste bedrijven de eerste stap" en het label "De voordeur". Botst licht met "je begint met de gratis AI-scan" op /werkwijze en /voor. Niet aangepast: trainingen als voordeur is John's eigen koers en het besluit zegt de training alleen aan te passen waar de bouwroute beschreven wordt. VRAAG AAN JOHN.
- /boek (app/boek/page.tsx:10, :29, :58) en de slot-CTA van /voor/[branche] (page.tsx:309): "Of een workshop (op locatie) is voor jullie team de beste eerste stap." Noemt de workshop als een van drie uitkomsten van het gesprek, niet als vaste stap van de bouwroute en zonder prijs. Ongemoeid.
- VMS.strategie (lib/constants.ts:680) zegt nog "workshop ... intake, een tweede brein ...". Wordt door geen enkele pagina gebruikt (grep). Ongemoeid.
- PRIJZEN.workshop (lib/constants.ts:1225): ongebruikte sleutel met waarde "750". Geen zichtbare tekst, ongemoeid.
- Branchepagina's transport, makelaardij en horeca noemen geen garantie (deden ze ook niet). De ene garantie staat nu bij schoonmaak, bouw en garages, waar eerder een eigen garantie stond.
- Andere JOHN BEVESTIGT-punten uit ronde 1 (hosting Köningsdag, pilot transportbedrijf, zes jaar videograaf, reviews, enz.) vallen niet onder de besluiten van vandaag en zijn niet aangeraakt.

## Controle

- `npx tsc --noEmit -p .`: exit 0, geen meldingen (gedraaid na alle wijzigingen, inclusief de lopende blog-wijzigingen van de andere agent in de werkmap).
- Toegevoegde regels gecontroleerd op em-dashes en en-dashes: geen. Puntkomma's alleen in code (import-regel, commentaar), niet in zichtbare tekst.
- Niet gebuild, niet in de browser bekeken, niet gecommit.
