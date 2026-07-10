// Eenmalige datamigratie: oude scan-DB (OLD_DATABASE_URL) -> Supabase (DATABASE_URL, schema "scan").
//
// Gebruik:
//   node scripts/migrate-scan-to-supabase.mjs --dry-run   # alleen tellingen bron vs doel
//   node scripts/migrate-scan-to-supabase.mjs             # echte kopie (idempotent, skipDuplicates)
//
// Kopieert met behoud van de cuid-id's, in FK-volgorde. De oude DB wordt alleen GELEZEN.
// Vereist env: OLD_DATABASE_URL (bron), DATABASE_URL (doel Supabase, pooled is prima).

import { PrismaClient } from "@prisma/client"

const OLD = process.env.OLD_DATABASE_URL
if (!OLD) {
  console.error("OLD_DATABASE_URL ontbreekt in de omgeving.")
  process.exit(1)
}
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL (doel) ontbreekt in de omgeving.")
  process.exit(1)
}

const dryRun = process.argv.includes("--dry-run")

// Bron leest van OLD_DATABASE_URL; doel gebruikt DATABASE_URL uit de env (Supabase).
const bron = new PrismaClient({
  datasources: { db: { url: OLD } },
  log: ["error"],
})
const doel = new PrismaClient({ log: ["error"] })

// Volgorde = FK-afhankelijkheid: parents eerst.
//   Lead <- ScanJob <- Answer
//   Lead <- LoomVideo, MailLog, Payment
//   Setting staat los.
// De BRON (oude Neon-DB) heeft deze tabellen in schema "public"; we lezen daar met
// raw SQL. De DOEL (Supabase) heeft ze in schema "scan"; daar schrijven we via de
// model-API (Prisma qualificeert dan automatisch als scan.<Tabel>).
const TABELLEN = [
  { model: "lead", tabel: "Lead", pk: "id" },
  { model: "scanJob", tabel: "ScanJob", pk: "id" },
  { model: "answer", tabel: "Answer", pk: "id" },
  { model: "loomVideo", tabel: "LoomVideo", pk: "id" },
  { model: "mailLog", tabel: "MailLog", pk: "id" },
  { model: "payment", tabel: "Payment", pk: "id" },
  { model: "setting", tabel: "Setting", pk: "key" },
]

const BATCH = 500

async function telBron(client, tabel) {
  const r = await client.$queryRawUnsafe(`SELECT count(*)::int AS n FROM "public"."${tabel}"`)
  return r[0].n
}

async function leesBron(client, tabel, pk, skip, take) {
  return client.$queryRawUnsafe(`SELECT * FROM "public"."${tabel}" ORDER BY "${pk}" OFFSET ${skip} LIMIT ${take}`)
}

async function telDoel(client, model) {
  return client[model].count()
}

async function main() {
  console.log(dryRun ? "=== DRY-RUN (niets wordt geschreven) ===" : "=== ECHTE MIGRATIE ===")
  console.log("Bron : OLD_DATABASE_URL")
  console.log("Doel : DATABASE_URL (Supabase, schema scan)\n")

  const rapport = []

  for (const { model, tabel, pk } of TABELLEN) {
    const bronAantal = await telBron(bron, tabel)
    const doelVoor = await telDoel(doel, model)

    if (!dryRun && bronAantal > 0) {
      // Lees per batch uit public (Neon) en schrijf naar scan (Supabase) met
      // skipDuplicates zodat een tweede run niets dubbel doet.
      for (let skip = 0; skip < bronAantal; skip += BATCH) {
        const rijen = await leesBron(bron, tabel, pk, skip, BATCH)
        if (rijen.length > 0) {
          await doel[model].createMany({ data: rijen, skipDuplicates: true })
        }
      }
    }

    const doelNa = await telDoel(doel, model)
    rapport.push({ tabel, bron: bronAantal, doel_voor: doelVoor, doel_na: doelNa })
  }

  console.log("Tellingen:")
  console.table(rapport)

  if (dryRun) {
    console.log("\nDry-run klaar. Geen wijzigingen gemaakt.")
  } else {
    const mismatch = rapport.filter((r) => r.doel_na < r.bron)
    if (mismatch.length > 0) {
      console.log("\nLET OP: doel < bron voor:", mismatch.map((m) => m.tabel).join(", "))
    } else {
      console.log("\nMigratie klaar. Doel >= bron voor alle tabellen.")
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await bron.$disconnect()
    await doel.$disconnect()
  })
