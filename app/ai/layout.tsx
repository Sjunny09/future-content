import { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI voor je klantenservice-inbox en meer | MKB Brabant",
  description:
    "AI-automatisering voor MKB in Brabant: je inbox, offertes en administratie. John komt langs, kijkt waar tijd weglekt en bouwt het. Geen cursus, gewoon gebouwd.",
  openGraph: {
    title: "AI voor MKB in Brabant | Future Content",
    description:
      "Done-for-you AI-automatisering voor het MKB in heel Brabant, vanuit Bladel. Geen hype, gewoon iets dat werkt.",
  },
  alternates: {
    canonical: `${SITE.url}/ai`,
  },
};

export default function AiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
