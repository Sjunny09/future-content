# Bronnen bij "Mijn eigen bedrijf draait op een systeem dat ik zelf bouwde"

Afkortingen: `CLAUDE.md` = /Users/johnlavrijsen/Documents/AI - Cursor/CLAUDE.md. `os/` = /Users/johnlavrijsen/Documents/AI - Cursor/00-future-content/os/. Niets gelezen onder 03-klanten/.

| Bewering in de blog | Bron |
|---|---|
| Administratie draait sinds juli 2026 op een eigen webapp | CLAUDE.md:23 ("sinds 2026-07-16 omgeklapt naar het OS", live op os.future-content.nl), CLAUDE.md:113 (Flask-app opgeruimd, archief `flask-os-2026-07-16`) |
| Offertes, facturen, uren, kilometers, uitgaven, klanten en opnameplanning staan bij elkaar | CLAUDE.md:29 (uren, kilometers, factuur, uitgaven, klanten, leads), CLAUDE.md:23 (shoots), CLAUDE.md:46 (offertes/overeenkomsten via de akkoord-pagina van het OS), os/MCP-CONNECTOR-LEESMIJ.md:57-87 (toollijst) |
| Onderweg via Claude op de telefoon | CLAUDE.md:45, os/MCP-CONNECTOR-LEESMIJ.md:5 |
| Eerst een Google Sheet met een eenvoudige eerste app ernaast, sheet is nu alleen archief, ik schrijf er niets meer in | CLAUDE.md:28 ("Flask-app ... en de Google Sheet zijn vervangen. Sheet = read-only archief, nooit meer naartoe schrijven"), CLAUDE.md:33 (slot: Flask = legacy, Sheet = read-only archief) |
| Geld en status staan in het OS en nergens anders (betaald, uren, kilometers, betaaltermijn) | CLAUDE.md:74 |
| Een overgetypt getal is een momentopname | CLAUDE.md:74 ("Een getal in een markdown-bestand is een momentopname"), CLAUDE.md:75 |
| Opname inplannen maakt een project met eigen nummer en zet de afspraak in de agenda, herinnering 1 dag en 1 uur vooraf | CLAUDE.md:23, os/MCP-CONNECTOR-LEESMIJ.md:82 |
| Datum of adres wijzigt, dan verhuist de agenda-afspraak mee | CLAUDE.md:26, os/MCP-CONNECTOR-LEESMIJ.md:83 |
| Offerte gaat als link, klant geeft online akkoord | CLAUDE.md:46 (akkoord-pagina, tekenlink), os/MCP-CONNECTOR-LEESMIJ.md:70 ("publieke tekenlink (/akkoord/<token>)") |
| Uren op de klant, eigen werk (factureren, boekhouding) als intern, om per klant te zien of het loont | CLAUDE.md:30, CLAUDE.md:32, CLAUDE.md:33 (urenregel zonder relatie = "intern") |
| Kilometers worden afgeleid uit opnames en bezoeken op locatie | CLAUDE.md:35, os/lib/kmVoorstellen.ts:9-13 |
| Uitgave zonder bon komt op de actielijst | os/lib/acties.ts:23, 484-486 |
| Bon vanaf de telefoon in een vaste Drive-map, later met Claude verwerkt | CLAUDE.md:38 (Drive-map `_Bonnen inbox`, later verwerken met Drive-connector plus `log_uitgave` en `koppel_bon`) |
| Uitgave wordt geboekt met nummer, bestand krijgt datzelfde nummer en gaat naar map van jaar en kwartaal, bon hangt aan boeking | CLAUDE.md:37 (K-nummer, `Uitgaven/<jaar>/Q<n>`, gekoppeld), os/scripts/bon_verwerken.py:3-14, 33-36 |
| Een bon is pas verwerkt als het bewijsstuk ook is opgeborgen | CLAUDE.md:37 (letterlijk) |
| Bij factureren wordt het bedrag per regel vastgelegd, latere tariefwijziging verandert een verstuurde factuur niet | os/lib/factuur.ts:19-31, os/lib/facturen.ts:249-258 (urenregel bevriest `bedragCent` bij factureren). Zie twijfelpunt: CLAUDE.md:143 zegt nog dat dit een open taak is. |
| Factuur maken kan bewust niet vanaf de telefoon, factuurnummer vraagt akkoord in de webapp | os/MCP-CONNECTOR-LEESMIJ.md:89 |
| Alles wat iets boekt laat eerst een voorbeeld zien, pas na ja wegschrijven; geldt ook voor uitgaven, ritten, contactmomenten, opnames | os/MCP-CONNECTOR-LEESMIJ.md:74-101, os/lib/mcp.ts:1607-1608, CLAUDE.md:25 |
| Voorbeeld "twee uur op een klant zetten" toont regel met tarief en bedrag | os/MCP-CONNECTOR-LEESMIJ.md:10 ("Log 2 uur voor ..."), :97 (preview met nummer, tarief, bedrag) |
| Telefoon en laptop gebruiken dezelfde onderdelen, één administratie | CLAUDE.md:45 ("Die omhult dezelfde schrijf-functies als de skills, dus er is één administratie"), os/MCP-CONNECTOR-LEESMIJ.md:12 |
| Bankkoppeling is handmatige import, geen automatische verbinding | CLAUDE.md:36 ("geen open-banking-koppeling, geen PSD2-token en geen cron") |
| Export uit internetbankieren downloaden en inlezen | CLAUDE.md:36 |
| Overlappende periodes geen probleem | CLAUDE.md:36 ("idempotent op bron + transactieRef, dus overlappende periodes zijn geen probleem") |
| Systeem stelt voor welke betaling bij welke factuur hoort, ik keur elke koppeling goed | CLAUDE.md:36 (`bankvoorstellen`, `koppel_bankregel` preview-first) |
| Factuur staat pas op betaald als er een betaling aan hangt | os/lib/mcp.ts:1609-1610 ("betaald is in dit systeem een afgeleide van de geboekte betalingen") |
| Geen export aangeleverd = dat deel loopt achter | CLAUDE.md:36 ("Staat de nieuwste bankregel maanden terug, dan betekent dat simpelweg dat er sinds die datum geen export is aangeleverd") |
| Ritten vanuit Bladel | CLAUDE.md:34, os/lib/km.ts:13-14, 20 |
| Video-opnames en AI-opdrachten als soorten werk | CLAUDE.md:31 (video-opdracht vaste prijs, AI- en automatiseringsopdrachten per uur of traject) |

Advies in "Wat jij eraan hebt" en de slotalinea is geen feitelijke bewering over John's bedrijf, maar een vertaling van bovenstaande werkwijze naar de lezer.

## Verify 7 oktober 2026 (onafhankelijke controle)

Factuurbedrag vastleggen: de code staat in commit aac1021 (7-9-2026), die op origin/funnel-backoffice-s2 staat. De productie-deploy van os.future-content.nl is gemaakt op 30 september 2026 14:36 (`vercel inspect`), dus na die commit. Let op: CLAUDE.md regel 143 zegt nog dat regelbedragen live worden herberekend en dat de fix een open taak is. Dat is verouderd ten opzichte van de code en Taken.md. De blog volgt de code.
