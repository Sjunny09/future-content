"use client"

import { usePathname } from "next/navigation"

// Verbergt de marketing-chrome (navbar, footer, floating CTA) op de /scan-flow,
// zodat de scan een rustige, schermvullende ervaring is. Op alle andere
// pagina's rendert de chrome gewoon.
export function HideOnScan({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname === "/scan" || pathname?.startsWith("/scan/")) {
    return null
  }
  return <>{children}</>
}
