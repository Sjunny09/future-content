-- Leads-cockpit: testlead-vlag, mail-log en OS-instellingen.
-- Puur additief: bestaande kolommen/rijen blijven ongemoeid.

-- AlterTable
ALTER TABLE "ScanJob" ADD COLUMN "isTest" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN "isTest" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "MailLog" (
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
CREATE TABLE "Setting" (
    "key" TEXT NOT NULL,
    "waarde" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE INDEX "Lead_isTest_idx" ON "Lead"("isTest");

-- CreateIndex
CREATE INDEX "MailLog_leadId_idx" ON "MailLog"("leadId");

-- CreateIndex
CREATE INDEX "MailLog_scanJobId_idx" ON "MailLog"("scanJobId");

-- CreateIndex
CREATE INDEX "MailLog_createdAt_idx" ON "MailLog"("createdAt");

-- AddForeignKey
ALTER TABLE "MailLog" ADD CONSTRAINT "MailLog_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
