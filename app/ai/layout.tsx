import { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI voor MKB: processen automatiseren in Brabant",
  description:
    "Future Content bouwt AI-automatisering voor MKB-bedrijven in Noord-Brabant: offertes, klantvragen en administratie. John komt langs, kijkt waar tijd weglekt en bouwt het. Geen cursus, done-for-you.",
  openGraph: {
    title: "AI voor MKB in Brabant | Future Content",
    description:
      "Done-for-you AI-automatisering voor het MKB in de Kempen, Eindhoven en Tilburg. Geen hype, gewoon iets dat werkt.",
  },
  alternates: {
    canonical: `${SITE.url}/ai`,
  },
};

export default function AiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
