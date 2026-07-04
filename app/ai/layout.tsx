import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI & Automatisering voor het MKB",
  description:
    "AI die werkt. Gewoon gebouwd. Ik kom langs, kijk waar de tijd weglekt en bouw slimme AI en automatiseringen voor het MKB in de Kempen. Geen cursus, done-for-you.",
  openGraph: {
    title: "AI die werkt. Gewoon gebouwd. — Future Content",
    description:
      "Done-for-you AI en automatisering voor het MKB in de Kempen. Geen hype, gewoon iets dat werkt.",
  },
};

export default function AiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
