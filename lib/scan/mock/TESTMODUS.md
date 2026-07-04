# Testmodus voor de scan (SCAN_MOCK=1)

Hiermee test je de volledige scan-flow zonder API-credits en zonder echte site. Alles behalve de twee betaalde externe stappen is echt: er worden echte ScanJob- en Answer-rows geschreven, de echte statusovergangen lopen, de echte routes en componenten draaien.

## Gebruiken

```
SCAN_MOCK=1 npm run dev
```

Optioneel tempo:

```
SCAN_MOCK=1 SCAN_MOCK_SPEED=echt npm run dev
```

- `snel` (standaard): alles reageert vlot, handig om door te klikken.
- `echt`: realistische duur per stap (scrape 4s, analyse 18s), handig om het wachtscherm, de fase-teksten en de voortgangsbalk in echt tempo te zien.

De mock is hard uitgeschakeld zodra `NODE_ENV === "production"`, wat er ook in de env staat. Zet SCAN_MOCK dus nooit op Vercel, maar zelfs dan doet hij niks.

## Wat wordt gefaket (de seams)

Precies vier plekken, telkens bovenaan de functie, met `if (mockActief())`:

| Functie | Bestand | Fixture |
|---|---|---|
| `haalSiteDataOp` | `lib/scan/scraper.ts` | `mockSiteData` |
| `analyseerSite` | `lib/scan/claude.ts` | `mockAnalyse` |
| `genereerObservaties` | `lib/scan/claude.ts` | `mockObservaties` |
| `kiesEersteVraag` / `kiesVolgendeVraag` | `lib/scan/vragen/selecteer.ts` | `mockEersteVraag` / `mockVolgendeVraag` |
| `kiesDiepteVraag` / `genereerDiagnose` | `lib/scan/diepte.ts` | `mockDiepteVraag` / `mockDiagnose` |

Alles stroomafwaarts (pipeline, status-endpoint, polling, VragenFlow, eindschermen, notificaties, OS-brug) blijft ongemoeid en draait echt.

## Het script (bekende totalen)

- Quickscan: B1 (enkelkeuze) + GEN2 (meerkeuze) + GEN3 (meerkeuze) + GEN4 (open) + GEN5 (meerkeuze), daarna de email-stap. Totaal: 5 vragen + email. Daarmee is de voortgangsbalk tegen een bekend totaal te controleren.
- Uitgebreide scan: DV1 t/m DV8 (mix van enkelkeuze, meerkeuze, open), daarna klaar. Precies 8 diepe vragen.
- Diagnose: vast "bouw"-advies met signalen, zodat ook de OS-brug en het belscherm te testen zijn.

## De synchroon-garantie (belangrijk)

Elke fixture in `lib/scan/mock/index.ts` is getypeerd met het ECHTE return-type van de echte functie (`import type` van `SiteData`, `SiteAnalyse`, `Vraag`, `Diagnose`). Verandert de scan-structuur, dan faalt `npm run build` totdat de fixtures meegaan.

**Checklist bij elke structurele scanwijziging, in dezelfde commit:**

1. Verander je een type (`SiteData`, `SiteAnalyse`, `Vraag`, `Diagnose`)? Werk de fixtures bij.
2. Verander je de vraaglogica (aantallen, types, volgorde)? Werk het mock-script bij zodat het weer alle typen dekt en het totaal klopt.
3. Voeg je een nieuwe externe (betaalde) call toe? Voeg een seam plus fixture toe, op dezelfde manier.
4. Draai `SCAN_MOCK=1 npm run dev` en klik de flow door voordat je commit.

John's eigen acceptatie blijft: testen op de clone met echte credits, dan pas live.
