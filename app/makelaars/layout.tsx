import { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Vastgoedvideograaf Kempen & Eindhoven",
  description:
    "Funda-ready vastgoedvideo's voor makelaars in De Kempen, Eindhoven en Tilburg. Walkthrough, drone & social teaser. Opgeleverd binnen 1 week. Vanaf €199 excl. BTW.",
  openGraph: {
    title: "Vastgoedvideograaf | Future Content",
    description:
      "Professionele vastgoedvideo's voor makelaars. Snel, strak en Funda-ready.",
    images: ["/photos/PhotoSessions-757307-pww_6329-vy-1.jpg"],
  },
  alternates: {
    canonical: `${SITE.url}/makelaars`,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hoe snel wordt de video opgeleverd?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standaard binnen 1 week na de shootdag. Bij spoed is snellere levering in overleg mogelijk.",
      },
    },
    {
      "@type": "Question",
      name: "Ik werk al met een fotograaf. Waarom ook video?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Foto's tonen wat er is. Video toont hoe het voelt. Kopers die een video zien gaan met meer zekerheid op bezichtiging. Foto en video zijn complementair, niet inwisselbaar.",
      },
    },
    {
      "@type": "Question",
      name: "Past video in een Funda-pakket?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Funda ondersteunt het toevoegen van een videolink bij elke woning. Future Content levert de video in het juiste horizontale (16:9) formaat.",
      },
    },
    {
      "@type": "Question",
      name: "Filmt Future Content ook met drone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, beschikbaar in het Compleet pakket (€349 excl. BTW). Met een DJI Mini 3 Pro worden luchtopnames van omgeving, tuin en ligging gemaakt, afhankelijk van locatie en vliegzone.",
      },
    },
    {
      "@type": "Question",
      name: "Wat kost een vastgoedvideo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Walkthrough vanaf €199 excl. BTW per object, Compleet (met drone en social teaser) €349 excl. BTW per object. Opgeleverd binnen 1 week.",
      },
    },
  ],
};

export default function MakelaarsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
