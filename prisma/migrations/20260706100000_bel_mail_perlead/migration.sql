-- Bel-workflow + mail-controle per lead. Puur additief.

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN "gebeld" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Lead" ADD COLUMN "gebeldOp" TIMESTAMP(3);
ALTER TABLE "Lead" ADD COLUMN "belnotitie" TEXT;
ALTER TABLE "Lead" ADD COLUMN "mailUit" BOOLEAN NOT NULL DEFAULT false;
