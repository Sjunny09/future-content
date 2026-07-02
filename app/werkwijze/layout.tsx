import { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Werkwijze | Van kennismaking tot AI die draait",
  description:
    "Zo werk ik: eerst een vrijblijvende kennismaking, dan een workshop met een proof of concept, een tweede brein voor je bedrijf, en een offerte voor bouwen en beheren. Helder, stap voor stap.",
  openGraph: {
    title: "Werkwijze | Future Content",
    description:
      "Van kennismaking tot werkende AI: workshop met proof of concept, tweede brein, bouwen en beheren.",
  },
  alternates: {
    canonical: `${SITE.url}/werkwijze`,
  },
};

export default function WerkwijzeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
