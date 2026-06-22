"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import FloatingCTA from "@/components/layout/FloatingCTA"
import CookieBanner from "@/components/layout/CookieBanner"

// Verberg de videografie-chrome op /scan/*.
// De quickscan heeft een eigen, losstaande look (zie docs/quickscan/03_ceo_synthese.md §3).
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isScan = pathname?.startsWith("/scan")

  if (isScan) {
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
