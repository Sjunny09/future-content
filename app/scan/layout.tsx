import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Laat me even naar je bedrijf kijken · Future Content",
  description:
    "Eerlijke kijk van buiten op jouw bedrijf. Binnen 24 uur een korte video terug.",
  robots: { index: true, follow: true },
}

export default function ScanLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen font-sans"
      style={{
        backgroundColor: "var(--color-scan-linnen)",
        color: "var(--color-scan-drukinkt)",
        fontFamily: "var(--font-plex), system-ui, sans-serif",
      }}
    >
      {children}
    </div>
  )
}
