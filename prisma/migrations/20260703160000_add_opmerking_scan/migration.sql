-- Vrij opmerkingenveld dat de klant op de scan-eindpagina achterlaat.
-- Additief en nullable, geen dataverlies. Toegepast op 2026-07-03.
ALTER TABLE "ScanJob" ADD COLUMN "opmerking" TEXT;
