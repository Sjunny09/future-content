# Factcheck future-content.nl, 7 oktober 2026

Alle pagina's en alle 71 blogs nagelopen op toetsbare feiten (getallen, modellen, prijzen, wetgeving, platformregels, beweringen over eigen werk en klanten). Uitgevoerd door acht losse agents, daarna de zwaarste punten zelf nagerekend. Er is niets op de site gewijzigd. Mag weg zodra de punten verwerkt zijn.

## Wat hier staat

| Bestand | Inhoud |
|---|---|
| `rapport-paginas.md` | 20 routes plus JSON-LD en `public/llms.txt`, 146 beweringen, met bronbestand en regel per bevinding |
| `rapport-blogs-001-010.md` t/m `rapport-blogs-061-071.md` | 71 blogs in zeven delen, 326 beweringen. Nummer = volgorde in `BLOG_POSTS` |

Oordelen: KLOPT, ONJUIST, VEROUDERD, GEEN BRON, EIGEN CLAIM (John moet bevestigen), NIET KUNNEN VERIFIËREN, TEGENSTRIJDIG (alleen pagina's). Elke bevinding heeft een voorstel voor vervangende tekst.

## Tellingen (uit de samenvattingen van de rapporten zelf)

| | Pagina's | Blogs |
|---|---|---|
| Gecontroleerd | 146 | 326 |
| ONJUIST | 15 | 34 |
| TEGENSTRIJDIG | 34 | n.v.t. |
| GEEN BRON | 15 | 52 |
| VEROUDERD | 3 | 8 |
| EIGEN CLAIM | 40 | 93 |
| KLOPT | 25 | 129 |

Een eigen hertelling uit de tabelrijen kwam lager uit (19 onjuist in de blogs), omdat de agents hun tabellen niet allemaal hetzelfde invullen. De getallen hierboven zijn hun eigen samenvattingen.

## Zelf nagerekend (7 oktober 2026)

- **Blogs zijn teruggedateerd.** Volgens `git log` kwamen `lib/blog/ai-posts-1/2/3.ts` op 22 juni 2026 in de repo, `ai-posts-4` op 3 juli en `ai-posts-5` op 2 september. 56 van de 58 AI-blogs dragen een eerdere datum (vroegste: 6 oktober 2025). Gevolg: blogs beschrijven dingen die op hun eigen datum nog niet bestonden.
  - "Claude Sonnet 5 is uit" staat op 9 februari 2026 en kwam op 22 juni in de code. Sonnet 5 kwam uit op 30 juni 2026 ([smol.ai](https://news.smol.ai/issues/26-06-30-sonnet5)).
  - Blogs uit eind 2025 ("Mijn AI-jaar 2025") vertellen alsof John dat jaar al voor ondernemers bouwde. In zijn eigen interview (`docs/REVIEW-interview-uitkomsten.md` r.163): "Toen ik in januari gestopt was bij BTT ben ik me echt veel meer gaan verdiepen in AI."
  - Blog 038 (16 maart 2026) zegt dat het Koningsdag-ticketsysteem live draaide tijdens het evenement. Het evenement was op 27 april 2026 en de verkoop sloot op 23 april (`03-klanten/koningsdag-reusel/README.md` r.7 en r.21).
- **Fable 5 was offline** van 12 juni tot 1 juli 2026 door een Amerikaanse exportmaatregel ([codersera](https://codersera.com/blog/when-is-claude-fable-5-coming-back-2026/)). Klopt dus.
- **GPT-6** bestaat, maar alleen als GPT-6 Astra voor zakelijke testers sinds september 2026 ([Bloomberg Government](https://news.bgov.com/artificial-intelligence/openai-rolls-out-gpt-6-astra-model-with-cyber-guardrails-1)). "GPT-6 is uit" voor iedereen klopt nog niet.
- **Weezevent** rekent in Nederland 2,5% per ticket met minimum €0,99 inclusief transactiekosten. De site noemt "€0,99 plus 2,75%", het Canadese tarief.
- **SLIM 2026, tweede ronde:** 19 augustus tot 7 september, met loting (naar verwachting ongeveer 23% toegekend) ([SRA](https://www.sra.nl/nieuws/259001/2026/08/slim-subsidie-mkb-vanaf-19-augustus)). /trainingen zegt "10 augustus-7 september" en llms.txt belooft "60% terug".
- **Twee aanbodtrappen naast elkaar:** /ai, de wedges en de pilotpagina: scan, proef €750 incl. btw, bouw €2.500-€8.500, beheer vanaf €250. /voor, /werkwijze en llms.txt: workshop vanaf €750 ex btw, tweede brein, offerte, bouw €5.000-€15.000.

## Wat John moet beslissen

1. **Blogdatums.** Laten staan met correcties, op de echte publicatiedatum zetten, of de datum niet meer tonen.
2. **Welke aanbodtrap geldt.** Daarna één trap en één garantie in `lib/constants.ts`, en `public/llms.txt` gelijktrekken.
3. **De concurrentietabel** met Van Heertum Media en VideoFunda bij naam en prijzen uit een niet terug te vinden "marktonderzoek februari 2026" (/makelaars). Advies: schrappen of de bron erbij zetten.
4. **Eigen claims** die alleen hij kan bevestigen, onder meer de lopende pilot bij een transportbedrijf, de restaurant-chatbot (demo of klant), "zes jaar videograaf", Hasselt 5 of 9.
