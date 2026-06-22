import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display, Fraunces, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";
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

// Scan-flow typografie — docs/quickscan/03_ceo_synthese.md §1.9
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Future Content | AI-bouwer voor MKB in Brabant",
    template: "%s | Future Content",
  },
  description: SITE.description,
  keywords: [
    "AI bouwer",
    "AI bouwer Brabant",
    "AI bouwer Eindhoven",
    "AI voor MKB",
    "automatisering MKB",
    "AI training Brabant",
    "AI consultant Bladel",
    "AI implementatie Eindhoven",
    "SLIM subsidie AI training",
    "tweede brein AI",
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
      "@type": "LocalBusiness",
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      url: SITE.url,
      telephone: SITE.phone,
      email: SITE.email,
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
              name: "AI-workshop op locatie",
              description:
                "Halve dag op locatie, drie concrete AI-kansen voor jouw bedrijf op papier. 60% terug via SLIM-subsidie.",
            },
            price: "750",
            priceCurrency: "EUR",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI-implementatie modulair platform",
              description:
                "Eenmalige bouw plus maandelijks beheer. Modulair platform met 8 core-modules en branche-skin.",
            },
            price: "8500",
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
      className={`${inter.variable} ${playfair.variable} ${fraunces.variable} ${plex.variable}`}
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
      </body>
    </html>
  );
}
