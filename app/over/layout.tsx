import { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Over John Lavrijsen | AI-bouwer uit Bladel",
  description:
    "John Lavrijsen bouwt AI-automatisering voor MKB-bedrijven in Noord-Brabant. Voorheen business engineer in de transportsector, zes jaar vastgoedvideograaf. Gevestigd in Bladel, actief in heel Brabant.",
  openGraph: {
    title: "Over John Lavrijsen | Future Content",
    description:
      "AI-bouwer uit Bladel. Vier jaar business engineer in transport, zes jaar videograaf. Sinds 2026 fulltime AI voor het MKB.",
    images: ["/photos/PhotoSessions-757307-pww_6270-vy-1.jpg"],
  },
  alternates: {
    canonical: `${SITE.url}/over`,
  },
};

export default function OverLayout({ children }: { children: React.ReactNode }) {
  return children;
}
