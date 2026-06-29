-- Uitgebreide (diepte) scan: 3 optionele velden op ScanJob. Additief, nullable, geen dataverlies.
ALTER TABLE "ScanJob" ADD COLUMN IF NOT EXISTS "diepteStatus" TEXT;
ALTER TABLE "ScanJob" ADD COLUMN IF NOT EXISTS "diepteVragenJson" JSONB;
ALTER TABLE "ScanJob" ADD COLUMN IF NOT EXISTS "diagnoseJson" JSONB;
