"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import FloatingCTA from "@/components/layout/FloatingCTA"
import CookieBanner from "@/components/layout/CookieBanner"

// Verberg de chrome op de immersieve routes: /scan/*, de poort (/) en de
// AI-ervaring (/ai). Die hebben elk hun eigen, rustige chrome.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const bare =
    pathname === "/" ||
    pathname === "/ai" ||
    pathname?.startsWith("/ai/") ||
    pathname?.startsWith("/scan")

  if (bare) {
    return <>{children}</>
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
