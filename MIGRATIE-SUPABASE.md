# Migratie: scan-database naar Supabase-project `future-content-os`

> Status: PLAN, nog niets uitgevoerd. Wacht op John's go per stap.
> Doel: de scan-DB verhuizen naar het bestaande Supabase-project van de OS, in een
> eigen Postgres-schema `scan`, gescheiden van het OS-schema `public`.
> Vangnet: de oude database blijft **minimaal twee weken** live en onaangeraakt.

## Botsingscheck (gedaan 2026-07-10)

Scan-modellen/tabellen: `ScanJob`, `Lead`, `Answer`, `LoomVideo`, `MailLog`, `Setting`, `Payment`.
Scan-enums: `ScanStatus`, `PaymentStatus`, `PaymentProvider`.

OS-schema (`public`) heeft o.a. `Relatie`, `Contact`, `Project`, `Betaling`, `Counter`,
`EigenBedrijf`. Geen `Lead`, `Setting`, `ScanJob` of `Payment` (OS gebruikt `Betaling`).
Ook geen enum-overlap.

**Conclusie: nul botsingen.** Zelfs zonder apart schema geen conflict. We zetten scan tóch
in een eigen Postgres-schema `scan`, zodat de twee werelden fysiek gescheiden blijven en
`prisma migrate` van de een nooit de tabellen van de ander raakt.

Randvoorwaarden:
- Prisma 6.19 heeft `multiSchema` als GA (geen previewFeature-flag nodig).
- OS gebruikt env-namen `OS_DATABASE_URL` / `OS_DIRECT_URL`. De scan-app houdt zijn eigen
  namen `DATABASE_URL` / `DIRECT_DATABASE_URL` aan; alleen de wáárde wijst straks naar
  hetzelfde Supabase-project.
- Connection strings uit Supabase-dashboard halen (Project future-content-os -> Connect).
  Het Supabase MCP-connector was tijdens het opstellen niet geautoriseerd.

---

## 1. Prisma-datasource omzetten (schema-wijziging, geen deploy)

**Bestand:** `prisma/schema.prisma`

- [ ] Datasource-blok:
  ```prisma
  datasource db {
    provider  = "postgresql"
    url       = env("DATABASE_URL")          // pooled (PgBouncer, poort 6543, ?pgbouncer=true)
    directUrl = env("DIRECT_DATABASE_URL")   // direct (poort 5432) — voor migrate/introspect
    schemas   = ["scan"]
  }
  ```
- [ ] `@@schema("scan")` op elk model: `ScanJob`, `Lead`, `Answer`, `LoomVideo`, `MailLog`, `Setting`, `Payment`.
- [ ] `@@schema("scan")` op elke enum: `ScanStatus`, `PaymentStatus`, `PaymentProvider`.
- [ ] `lib/scan/db.ts` blijft ongewijzigd (leest `DATABASE_URL`).
- [ ] Lokaal valideren: `npx prisma validate` + `npx prisma generate`.

**Env-vars lokaal in `.env` (nog niet op Vercel):**
- `DATABASE_URL` = Supabase pooled string, met `?pgbouncer=true&connection_limit=1` en `&schema=scan`
- `DIRECT_DATABASE_URL` = Supabase directe string (poort 5432), ook `schema=scan`

**Schema aanmaken in Supabase (eenmalig, met de directe string):**
```
npx prisma migrate diff \
  --from-empty \
  --to-schema-datamodel prisma/schema.prisma \
  --script > prisma/migrations/scan-init.sql
```
- [ ] Controleer dat de SQL begint met `CREATE SCHEMA IF NOT EXISTS "scan";` en alles onder `scan.` zet.
- [ ] Toepassen: `npx prisma db execute --file prisma/migrations/scan-init.sql --schema prisma/schema.prisma` (directe string). Raakt `public` (OS) niet.

## 2. Eenmalig datamigratie-script (oud -> Supabase)

**Nieuw bestand:** `scripts/migrate-scan-to-supabase.mjs` (zelfde aanpak als de Sheets-import:
twee clients, per-tabel telling, `--dry-run`).

- Twee PrismaClients: `oud` (leest `OLD_DATABASE_URL`), `nieuw` (schrijft `DATABASE_URL`).
- Kopieer met behoud van de cuid-id's, in FK-volgorde:
  1. `Lead` -> 2. `ScanJob` -> 3. `Answer` -> 4. `LoomVideo` -> 5. `MailLog` -> 6. `Payment` -> 7. `Setting`
- `--dry-run`: alleen `count()` per tabel op bron én doel tonen, niets schrijven.
- Zonder flag: `createMany` per tabel in batches, `skipDuplicates: true` (idempotent), daarna
  count bron vs doel per tabel afvinken (moet gelijk zijn).

**Env-vars script:** `OLD_DATABASE_URL`, `DATABASE_URL`, `DIRECT_DATABASE_URL`. Draaien vanaf
eigen machine, niet op Vercel.

- [ ] `node scripts/migrate-scan-to-supabase.mjs --dry-run` -> tellingen met John bekijken
- [ ] Echte run
- [ ] Tellingen bron vs doel per tabel gelijk

## 3. Omschakelprocedure Vercel-project `future-content`

**Moment:** vroege ochtend (bv. 06:00-07:00), gegarandeerd geen lopende scan.
**Doel-downtime: enkele minuten** (alleen de redeploy), want de data-migratie is al vooraf
gedaan en geverifieerd. Keuze John: minimale downtime.

Vlak vooraf checken in `/os`: geen ScanJob op `scraping`/`analysing`/`answering`, geen
Loom-deadline binnen het uur.

- [ ] Data-migratie (stap 2) een uur vooraf gedraaid + geverifieerd (oude DB blijft live)
- [ ] Kort geen testscans doen (freeze)
- [ ] Vercel -> project `future-content` -> Settings -> Environment Variables (Production):
  - [ ] Oude `DATABASE_URL`-waarde apart bewaren (voor rollback)
  - [ ] `DATABASE_URL` -> Supabase pooled string (`schema=scan`, `pgbouncer=true`)
  - [ ] `DIRECT_DATABASE_URL` -> Supabase directe string (`schema=scan`)
- [ ] Redeploy production (laatste `nieuwe-huisstijl`-build opnieuw promoten of lege redeploy)
- [ ] Bare domain opnieuw aliassen: `npx vercel alias set <deployment-url> future-content.nl` (www volgt vanzelf)
- [ ] Rook-test (stap 5)

Alleen twee env-vars + één redeploy. Geen codewijziging op het omschakelmoment; de code uit
stap 1 staat dan al in de branch.

## 4. Rollback (één env-var terug)

- [ ] Vercel -> `future-content` -> Env Vars: `DATABASE_URL` (+ `DIRECT_DATABASE_URL`) terug op de bewaarde oude waarde
- [ ] Redeploy production + bare domain opnieuw aliassen
- Klaar binnen minuten. Oude DB bleef ongemoeid (migratie las alleen), dus geen dataverlies.
- Let op: scans die ná omschakel op Supabase binnenkwamen staan niet in de oude DB. Rollback
  dus alleen kort na omschakelen zinvol; bij twijfel eerst die paar nieuwe leads handmatig terugzetten.

## 5. Verificatie ná omschakel (rook-test)

- [ ] **Nieuwe scan end-to-end** op future-content.nl met testmail, hele flow tot vraag 6; `ScanJob` + `Lead` in Supabase `scan`
- [ ] **Resultaten-mail** komt binnen (Resend) + `MailLog`-rij `soort=resultaten`, `status=verstuurd`
- [ ] **Herinnerings-cron** `/api/cron/loom-herinnering` handmatig triggeren; leest `LoomVideo`-deadlines zonder fout
- [ ] **Loom-videoflow**: in `/os` een lead een Loom-URL + "video gestuurd"; schrijft naar Supabase
- [ ] **Mollie-webhook**: kleine testbetaling; `Payment` `pending` -> `paid`, idempotent
- [ ] **OS-leadwebhook**: `notifyOs` vuurt bij scan-completion naar `/api/leads/van-scan`; lead in OS `Relatie` (`public`-schema). Scan schrijft in `scan`, OS in `public`; de webhook blijft de brug, geen cross-schema query.

## Vangnet

Oude DB blijft **minimaal twee weken** live en onaangeraakt. Pas daarna opruimen, na expliciete go.
