-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "scan";

-- CreateEnum
CREATE TYPE "scan"."ScanStatus" AS ENUM ('queued', 'scraping', 'analysing', 'ready', 'answering', 'completed', 'failed');

-- CreateEnum
CREATE TYPE "scan"."PaymentStatus" AS ENUM ('pending', 'paid', 'failed', 'refunded');

-- CreateEnum
CREATE TYPE "scan"."PaymentProvider" AS ENUM ('mollie', 'stripe');

-- CreateTable
CREATE TABLE "scan"."ScanJob" (
    "id" TEXT NOT NULL,
    "status" "scan"."ScanStatus" NOT NULL DEFAULT 'queued',
    "url" TEXT NOT NULL,
    "ipHash" TEXT NOT NULL,
    "isTest" BOOLEAN NOT NULL DEFAULT false,
    "siteDataJson" JSONB,
    "scrapeBron" TEXT,
    "scrapeFaaldeOp" TEXT,
    "observatiesJson" JSONB,
    "analyseJson" JSONB,
    "vragenJson" JSONB,
    "opmerking" TEXT,
    "diepteStatus" TEXT,
    "diepteVragenJson" JSONB,
    "diagnoseJson" JSONB,
    "leadId" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scrapedAt" TIMESTAMP(3),
    "analysedAt" TIMESTAMP(3),
    "readyAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "ScanJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scan"."Lead" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "naam" TEXT,
    "telefoon" TEXT,
    "bedrijfsnaam" TEXT,
    "isTest" BOOLEAN NOT NULL DEFAULT false,
    "gebeld" BOOLEAN NOT NULL DEFAULT false,
    "gebeldOp" TIMESTAMP(3),
    "belnotitie" TEXT,
    "mailUit" BOOLEAN NOT NULL DEFAULT false,
    "geanonimiseerd" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scan"."Answer" (
    "id" TEXT NOT NULL,
    "vraagId" TEXT NOT NULL,
    "vraagTitel" TEXT NOT NULL,
    "waarde" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scanJobId" TEXT NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scan"."LoomVideo" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "verstuurdOp" TIMESTAMP(3),
    "loomUrl" TEXT,
    "herinneringVerstuurd" BOOLEAN NOT NULL DEFAULT false,
    "deadline" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoomVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scan"."MailLog" (
    "id" TEXT NOT NULL,
    "leadId" TEXT,
    "scanJobId" TEXT,
    "ontvanger" TEXT NOT NULL,
    "richting" TEXT NOT NULL,
    "soort" TEXT NOT NULL,
    "onderwerp" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "detail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MailLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scan"."Setting" (
    "key" TEXT NOT NULL,
    "waarde" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "scan"."Payment" (
    "id" TEXT NOT NULL,
    "provider" "scan"."PaymentProvider" NOT NULL,
    "providerId" TEXT NOT NULL,
    "bedragCent" INTEGER NOT NULL,
    "status" "scan"."PaymentStatus" NOT NULL DEFAULT 'pending',
    "omschrijving" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paidAt" TIMESTAMP(3),

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ScanJob_status_idx" ON "scan"."ScanJob"("status");

-- CreateIndex
CREATE INDEX "ScanJob_startedAt_idx" ON "scan"."ScanJob"("startedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_email_key" ON "scan"."Lead"("email");

-- CreateIndex
CREATE INDEX "Lead_email_idx" ON "scan"."Lead"("email");

-- CreateIndex
CREATE INDEX "Lead_createdAt_idx" ON "scan"."Lead"("createdAt");

-- CreateIndex
CREATE INDEX "Lead_isTest_idx" ON "scan"."Lead"("isTest");

-- CreateIndex
CREATE INDEX "Answer_scanJobId_idx" ON "scan"."Answer"("scanJobId");

-- CreateIndex
CREATE INDEX "LoomVideo_leadId_idx" ON "scan"."LoomVideo"("leadId");

-- CreateIndex
CREATE INDEX "LoomVideo_deadline_idx" ON "scan"."LoomVideo"("deadline");

-- CreateIndex
CREATE INDEX "LoomVideo_verstuurdOp_idx" ON "scan"."LoomVideo"("verstuurdOp");

-- CreateIndex
CREATE INDEX "MailLog_leadId_idx" ON "scan"."MailLog"("leadId");

-- CreateIndex
CREATE INDEX "MailLog_scanJobId_idx" ON "scan"."MailLog"("scanJobId");

-- CreateIndex
CREATE INDEX "MailLog_createdAt_idx" ON "scan"."MailLog"("createdAt");

-- CreateIndex
CREATE INDEX "Payment_leadId_idx" ON "scan"."Payment"("leadId");

-- CreateIndex
CREATE INDEX "Payment_status_idx" ON "scan"."Payment"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_provider_providerId_key" ON "scan"."Payment"("provider", "providerId");

-- AddForeignKey
ALTER TABLE "scan"."ScanJob" ADD CONSTRAINT "ScanJob_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "scan"."Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scan"."Answer" ADD CONSTRAINT "Answer_scanJobId_fkey" FOREIGN KEY ("scanJobId") REFERENCES "scan"."ScanJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scan"."LoomVideo" ADD CONSTRAINT "LoomVideo_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "scan"."Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scan"."MailLog" ADD CONSTRAINT "MailLog_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "scan"."Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scan"."Payment" ADD CONSTRAINT "Payment_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "scan"."Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

