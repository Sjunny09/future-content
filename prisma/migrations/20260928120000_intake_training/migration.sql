-- CreateTable
CREATE TABLE "scan"."IntakeAntwoord" (
    "id" TEXT NOT NULL,
    "naam" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "bedrijf" TEXT NOT NULL,
    "punten" INTEGER NOT NULL,
    "band" TEXT NOT NULL,
    "spoor" TEXT NOT NULL,
    "wegingVersie" INTEGER NOT NULL,
    "record" JSONB NOT NULL,
    "ipHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IntakeAntwoord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IntakeAntwoord_bedrijf_idx" ON "scan"."IntakeAntwoord"("bedrijf");

-- CreateIndex
CREATE INDEX "IntakeAntwoord_createdAt_idx" ON "scan"."IntakeAntwoord"("createdAt");

