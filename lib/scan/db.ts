import { PrismaClient } from "@prisma/client"

// Singleton voor Prisma — voorkomt teveel connections in dev (HMR-reloads)
declare global {
  var __scanPrisma: PrismaClient | undefined
}

export const db =
  globalThis.__scanPrisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  })

if (process.env.NODE_ENV !== "production") {
  globalThis.__scanPrisma = db
}
