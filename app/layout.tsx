import type { Metadata } from "next";
import { Inter, Playfair_Display, Archivo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import { HideOnScan } from "@/components/layout/HideOnScan";
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

// Huisstijl body-font, gebruikt door de /scan-flow (via --font-archivo).
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Future Content — Videografie Bladel | Social Media & Vastgoed",
    template: "%s | Future Content",
  },
  description: SITE.description,
  keywords: [
    "vastgoedvideograaf",
    "videograaf Kempen",
    "social media video",
    "videoproductie Bladel",
    "vastgoedfilm Eindhoven",
    "funda video",
    "video content abonnement",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: SITE.url,
    siteName: SITE.name,
    title: "Future Content — Video content die werkt.",
    description: SITE.description,
    images: [
      {
        url: "/photos/PhotoSessions-757307-pww_6420-vy-1.jpg",
        width: 1200,
        height: 630,
        alt: "Future Content Videografie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Future Content — Video content die werkt.",
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
        { "@type": "AdministrativeArea", name: "De Kempen" },
      ],
      priceRange: "€€",
      description: SITE.description,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Video diensten",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Vastgoedvideo walkthrough",
              description: "Professionele vastgoedvideo voor Funda en social media",
            },
            price: "299",
            priceCurrency: "EUR",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Social media video abonnement",
              description: "Maandelijks verse video content voor social media",
            },
            price: "299",
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
  return (
    <html lang="nl" className={`${inter.variable} ${playfair.variable} ${archivo.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <HideOnScan>
          <Navbar />
        </HideOnScan>
        <main>{children}</main>
        <HideOnScan>
          <Footer />
          <FloatingCTA />
        </HideOnScan>
      </body>
    </html>
  );
}
