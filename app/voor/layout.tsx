import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Voor wie: zeven branches met een eigen skin · Future Content",
  description:
    "Het core-platform met 8 modules is voor iedereen hetzelfde. De skin per branche maakt het concreet. Transport, makelaardij, evenementen, schoonmaak, bouw, autobedrijf en horeca.",
  openGraph: {
    title: "Voor wie: zeven branches met een eigen skin",
    description:
      "Het core-platform van Future Content met 8 modules en 7 branche-skins. Per branche concreet wat John bouwt.",
    url: `${SITE.url}/voor`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE.url}/voor`,
  },
};

export default function VoorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
