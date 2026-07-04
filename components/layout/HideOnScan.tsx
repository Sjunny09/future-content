"use client"

import { usePathname } from "next/navigation"

// Verbergt de marketing-chrome (navbar, footer, floating CTA) op de immersieve
// routes: de /scan-flow, de poort (/) en de AI-ervaring (/ai). Die hebben elk
// hun eigen, rustige chrome. Op alle andere pagina's rendert de chrome gewoon.
const HIDDEN_EXACT = new Set(["/", "/ai"])

export function HideOnScan({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (!pathname) return <>{children}</>
  if (HIDDEN_EXACT.has(pathname)) return null
  if (pathname === "/scan" || pathname.startsWith("/scan/")) return null
  if (pathname.startsWith("/ai/")) return null
  return <>{children}</>
}
