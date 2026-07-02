import { Metadata } from "next";
import { SITE } from "@/lib/constants";

// Metadata voor /trouwen. De pagina zelf is een client component ("use client")
// en kan dus zelf geen metadata exporteren; daarom deze layout (zelfde patroon
// als /makelaars en /social-media). Toegevoegd bij de go-live audit 2 juli.
export const metadata: Metadata = {
  title: "Bruiloftsvideograaf in De Kempen en omgeving",
  description:
    "Bruiloftsvideo's in De Kempen, Eindhoven en Tilburg: een social edit voor jullie kanalen en een lange versie voor later. App John voor beschikbaarheid en prijs.",
  openGraph: {
    title: "Bruiloftsvideo's | Future Content",
    description:
      "Jouw mooiste dag, voor altijd vastgelegd. Bruiloftsvideograaf in De Kempen en omgeving.",
  },
  alternates: {
    canonical: `${SITE.url}/trouwen`,
  },
};

export default function TrouwenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
