import { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Social Media Video Abonnement",
  description:
    "Maandelijks Instagram Reels voor jouw bedrijf, gefilmd en geedit. Start €275/mnd, Instagram Reels €450/mnd, Premium €650/mnd excl. BTW. Eén shoot dag, maanden aan content.",
  openGraph: {
    title: "Social Media Video Abonnement | Future Content",
    description: "Eén shoot dag. Maanden aan content. Abonnement vanaf €275/maand.",
    images: ["/photos/PhotoSessions-757307-pww_6383-vy-1.jpg"],
  },
  alternates: {
    canonical: `${SITE.url}/social-media`,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat zijn 'korte staande video's' precies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Verticale video's in 9:16 formaat (zoals Instagram Reels of TikTok), tussen de 15 en 60 seconden. Denk aan: een behind-the-scenes opname van jouw werkdag, een tip of uitleg, een product of dienst in beeld, of een klantreactie.",
      },
    },
    {
      "@type": "Question",
      name: "Waarom minimaal 3 maanden?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Consistentie is het geheim van social media groei. Eén video doet weinig. Tien video's over drie maanden bouwen zichtbaarheid, bereik en vertrouwen op. Daarna is het abonnement maandelijks opzegbaar.",
      },
    },
    {
      "@type": "Question",
      name: "Moet ik zelf iets doen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nee. Future Content komt naar de klant toe, bedenkt de onderwerpen, edit en levert op. De klant hoeft alleen aanwezig te zijn op de shoot dag.",
      },
    },
    {
      "@type": "Question",
      name: "Hoeveel kost een video per stuk?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In het Start pakket (€275/mnd excl. BTW) betaal je €275 voor 1 Reel per maand. Instagram Reels pakket (€450/mnd): €225 per Reel, 2 per maand. Premium (€650/mnd): €162,50 per Reel, 4 per maand. Inclusief shoot, edit, captions, posten en analyse.",
      },
    },
  ],
};

export default function SocialMediaLayout({ children }: { children: React.ReactNode }) {
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
