import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display, Archivo, Space_Mono } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { SITE } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// Nieuwe huisstijl (handboek): Archivo als body/UI-sans, Space Mono voor labels.
// De scan-flow gebruikt Playfair (koppen) + Archivo (body) via de aliassen
// --font-fraunces / --font-plex in globals.css.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Future Content | AI-bouwer voor MKB in Brabant",
    template: "%s | Future Content",
  },
  description: SITE.description,
  alternates: {
    canonical: SITE.url,
  },
  keywords: [
    "AI voor MKB",
    "automatisering MKB",
    "processen automatiseren bedrijf",
    "offertes automatiseren",
    "administratie automatiseren",
    "klantvragen automatisch beantwoorden",
    "AI consultant Eindhoven",
    "AI consultant Tilburg",
    "AI bouwer Brabant",
    "AI training Brabant",
    "AI consultant Bladel",
    "AI implementatie Eindhoven",
    "SLIM subsidie AI training",
    "AI voor transport en logistiek",
    "AI voor makelaars",
    "vastgoedvideograaf",
    "videograaf Kempen",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: SITE.url,
    siteName: SITE.name,
    title: "Future Content | Eerst zien welk werk repeterend is. Dan pas bouwen.",
    description: SITE.description,
    images: [
      {
        url: "/photos/PhotoSessions-757307-pww_6420-vy-1.jpg",
        width: 1200,
        height: 630,
        alt: "John Lavrijsen, AI-bouwer voor MKB in Brabant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Future Content | Eerst zien welk werk repeterend is. Dan pas bouwen.",
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      url: SITE.url,
      telephone: SITE.phone,
      email: SITE.email,
      founder: { "@id": `${SITE.url}/#john` },
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.city,
        addressRegion: SITE.region,
        addressCountry: SITE.country,
      },
      areaServed: [
        { "@type": "City", name: "Bladel" },
        { "@type": "City", name: "Eindhoven" },
        { "@type": "City", name: "Tilburg" },
        { "@type": "City", name: "Breda" },
        { "@type": "AdministrativeArea", name: "De Kempen" },
        { "@type": "AdministrativeArea", name: "Noord-Brabant" },
      ],
      priceRange: "€€€",
      description: SITE.description,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI en automatisering diensten",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI proof of concept",
              description:
                "Betaalde proof of concept op je eigen werk, zodat je AI ziet werken vóór de bouw. Gaat van de bouwprijs af als je doorgaat. Mogelijk deels via de SLIM-subsidie.",
            },
            price: "750",
            priceCurrency: "EUR",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI-bouw op maat",
              description:
                "Vaste prijs, gescoped na de proof of concept. Van 2.500 tot 8.500 euro afhankelijk van omvang, plus een maandbedrag vanaf 250 euro voor beheer en doorontwikkeling.",
            },
            price: "2500",
            priceCurrency: "EUR",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI-Quickscan",
              description:
                "Gratis online scan op website. AI analyseert je branche en benoemt drie concrete kansen in minuten.",
            },
            price: "0",
            priceCurrency: "EUR",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Vastgoedvideo walkthrough",
              description: "Professionele vastgoedvideo voor Funda en social media.",
            },
            price: "199",
            priceCurrency: "EUR",
          },
        ],
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#org`,
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/logo/logo.png`,
      founder: { "@id": `${SITE.url}/#john` },
    },
    {
      "@type": "Person",
      "@id": `${SITE.url}/#john`,
      name: SITE.ownerName,
      jobTitle: "AI-bouwer en oprichter",
      worksFor: { "@id": `${SITE.url}/#business` },
      url: `${SITE.url}/over`,
      image: `${SITE.url}/photos/PhotoSessions-757307-pww_6420-vy-1.jpg`,
      description:
        "John Lavrijsen bouwt AI-automatisering voor MKB-bedrijven in Noord-Brabant, gevestigd in Bladel. Voorheen business engineer in de transportsector en zes jaar vastgoedvideograaf.",
      knowsAbout: [
        "AI-automatisering voor MKB",
        "Procesoptimalisatie",
        "Workflow-automatisering",
        "AI-chatbots",
        "Vastgoedvideografie",
      ],
      sameAs: [
        `https://wa.me/${SITE.whatsapp}`,
        "https://www.instagram.com/future.cntnt",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Plausible alleen laden als het domain-env is gezet. Zo hoeven we in dev
  // niks uit te zetten en in prod komt het pas aan zodra John het configureert.
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <html
      lang="nl"
      className={`${inter.variable} ${playfair.variable} ${archivo.variable} ${spaceMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {plausibleDomain && (
          <>
            <Script
              defer
              data-domain={plausibleDomain}
              src="https://plausible.io/js/script.tagged-events.js"
              strategy="afterInteractive"
            />
            <Script id="plausible-queue" strategy="afterInteractive">
              {`window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`}
            </Script>
          </>
        )}
      </head>
      <body className="antialiased">
        <SiteChrome>{children}</SiteChrome>
        <WhatsAppFloat />
      </body>
    </html>
  );
}
