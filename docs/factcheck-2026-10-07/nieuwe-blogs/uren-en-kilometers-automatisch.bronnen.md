# Bronnen bij "Uren en kilometers die zichzelf registreren"

Afkortingen: `CLAUDE.md` = /Users/johnlavrijsen/Documents/AI - Cursor/CLAUDE.md. `os/` = /Users/johnlavrijsen/Documents/AI - Cursor/00-future-content/os/. Niets gelezen onder 03-klanten/.

| Bewering in de blog | Bron |
|---|---|
| Een registratie die afhangt van eraan denken, raakt achter | CLAUDE.md:35 ("een registratie die vraagt dat John eraan denkt, loopt leeg"), os/lib/reisuren.ts:3-4 |
| Kilometerregistratie lag maanden stil terwijl er opnames en bezoeken waren | os/lib/kmVoorstellen.ts:4-6 (tabel liep sinds 15 mei niet, terwijl er in juni en juli shoots en locatiebezoeken waren), CLAUDE.md:34 |
| Kilometers sinds 2022 bijgehouden | os/lib/km.ts:6-7 ("draait sinds juni 2022"), CLAUDE.md:34 ("bestond al sinds 2022") |
| Lange tijd alleen te vullen via een formulier in de browser, onderweg niets vast te leggen | os/lib/km.ts:7-9, CLAUDE.md:34 |
| In augustus 2026 zag ik dat de laatste rit op 15 mei stond | CLAUDE.md:34 (vastgelegd 12 augustus 2026, "lag daardoor stil sinds 15 mei"), os/lib/km.ts:6-9 |
| "Loggen was nooit het probleem. Eraan denken wel." | os/lib/acties.ts:373-374, os/lib/kmVoorstellen.ts:5-6 ("Loggen is nooit het probleem, eraan denken wel") |
| Het systeem zoekt nu zelf uit wat er ontbreekt | os/lib/kmVoorstellen.ts:1-7 |
| Opname met datum in het verleden en adres = rit; bezoek op locatie (contactmoment) = rit | os/lib/kmVoorstellen.ts:9-13, 75-103, CLAUDE.md:35 |
| Elke rit retour vanaf Bladel, twee afspraken op één dag = twee ritten | CLAUDE.md:34, os/lib/km.ts:12-14, os/lib/kmVoorstellen.ts:15-17 |
| "Zo rijd ik ook echt" | CLAUDE.md:34 ("hij rijdt bewust apart heen en terug") |
| Afstand uit eerdere ritten naar dezelfde plaats, middelste getal (mediaan), zodat één afwijkende rit niet scheeftrekt | os/lib/km.ts:90-107, 121-128, CLAUDE.md:34 |
| Onbekende plaats: rit overslaan, één keer vragen, daarna bekend | os/lib/km.ts:139-143, 151-158, os/lib/kmVoorstellen.ts:196-198, 210-212, CLAUDE.md:34-35 |
| Al geboekte ritten worden herkend, niets dubbel | os/lib/kmVoorstellen.ts:110-121, 128, 132 |
| Hele lijst in één keer, één ja voor het geheel, pas dan wegschrijven | CLAUDE.md:35 ("Toon de lijst, vraag één go voor het geheel"), os/lib/mcp.ts:497 |
| Werkt ook via Claude op de telefoon, dezelfde lijst | os/lib/mcp.ts:495-497 (tool `km_bijwerken`), os/MCP-CONNECTOR-LEESMIJ.md:86 |
| Ontbrekende ritten staan vanzelf op de actielijst, met aantal ritten en kilometers | os/lib/acties.ts:375-395, CLAUDE.md:35 ("actietype km_ontbreekt staat in de cockpit") |
| Ook in "wat moet ik doen" op de telefoon | CLAUDE.md:35 ("en in wat_moet_ik_doen"), os/MCP-CONNECTOR-LEESMIJ.md:69 |
| Na 30 dagen laat, na 60 dagen rood | os/lib/acties.ts:396-399 |
| Maanden achterstand is achteraf nauwelijks te reconstrueren | os/lib/acties.ts:371-373 ("is achteraf niet meer te reconstrueren") |
| Gewerkte uren nog zelf opgeven, in één zin via Claude op de telefoon | os/MCP-CONNECTOR-LEESMIJ.md:10 ("Log 2 uur voor ..."), :78 (`log_uren`) |
| Eerst de regel met tarief en bedrag, pas na ja erin | os/MCP-CONNECTOR-LEESMIJ.md:93-101, os/lib/uren.ts:28-40 (preview met tarief en bedrag) |
| Reistijdafspraak per opdracht in het systeem: plaats en reisduur | os/lib/reisuren.ts:10-16, 22-25 |
| Rit naar zo'n locatie zonder reisuren die dag = melding op de actielijst met aantal uren | os/lib/reisuren.ts:40-60, os/lib/acties.ts:405-440 |
| Controle kwam erbij nadat reisuren pas bij een maandopgave bleken te ontbreken | os/lib/reisuren.ts:5-6 (toegevoegd 29-09-2026) |
| In 2026 € 0,25 per zakelijke kilometer aftrekbaar bij eigen vervoermiddel | https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/veranderingen-inkomstenbelasting-2026/zakelijk-gebruik-privevervoermiddel-2026 (opgehaald 7 oktober 2026, letterlijk: "Dan mag u in 2026 voor de zakelijke ritten € 0,25 per kilometer van uw winst aftrekken. In 2025 was dit € 0,23.") |

Advies onder "Wat jij hiervan kunt meenemen" en de zin "Een rit die nergens staat, vergeet je dus ook bij je aangifte" zijn een vertaling naar de lezer, geen bewering over John's bedrijf.
