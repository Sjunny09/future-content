"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import FloatingCTA from "@/components/layout/FloatingCTA"
import CookieBanner from "@/components/layout/CookieBanner"

// /scan is een invul-flow en blijft kaal. De homepage en /ai (met de
// dienstpagina's /ai/*) krijgen hetzelfde menu en dezelfde footer als de rest
// van de site, zodat je overal kunt zien wat er is (John, 7 oktober 2026).
// De zwevende knoppen blijven daar zoals ze waren: WhatsAppFloat dekt die
// routes al, en een tweede knop rechtsonder zou er overheen vallen.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname?.startsWith("/scan")) {
    return <>{children}</>
  }

  const immersief =
    pathname === "/" || pathname === "/ai" || pathname?.startsWith("/ai/")

  if (immersief) {
    return (
      <>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingCTA />
      <CookieBanner />
    </>
  )
}
