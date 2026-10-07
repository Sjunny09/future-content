import { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Werkwijze | Van gratis scan tot AI die draait",
  description:
    "Zo werk ik: eerst een gratis AI-scan, dan een werkende proef van €750 inclusief btw op je eigen werk, daarna de bouw en het beheer. Helder, stap voor stap.",
  openGraph: {
    title: "Werkwijze | Future Content",
    description:
      "Van gratis AI-scan tot werkende AI: werkende proef, bouwen en beheren.",
  },
  alternates: {
    canonical: `${SITE.url}/werkwijze`,
  },
};

export default function WerkwijzeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
