// Klanten op /klanten. Een klant verschijnt pas als `zichtbaar` true is:
// alleen met toestemming van de klant om naam en logo te tonen.
// Een blog hoort bij een klant via het veld `klant` in de BlogPost (zelfde slug).

// Zelfde deelbeeld als de layout (app/layout.tsx): een eigen openGraph op een
// pagina vervangt dat van de layout in zijn geheel, dus het beeld moet mee.
export const KLANTEN_OG = {
  type: "website" as const,
  locale: "nl_NL",
  siteName: "Future Content",
  images: [{ url: "/photos/PhotoSessions-757307-pww_6420-vy-1.jpg", width: 1200, height: 630, alt: "John Lavrijsen, AI-bouwer voor MKB in Brabant" }],
};

export type Klant = {
  slug: string;
  naam: string;
  logo: string;
  website: string;
  wat: string;
  hulp: string[];
  zichtbaar: boolean;
};

export const KLANTEN: Klant[] = [
  {
    slug: "lavri",
    naam: "Lavri",
    logo: "/klanten/lavri.png",
    website: "https://www.lavri.nl",
    wat: "Schoonmaak- en glazenwassersbedrijf in Reusel, met zo'n veertig mensen.",
    hulp: [
      "Hun offerteproces in kaart gebracht en een AI-oplossing voorgesteld voor de prijsaanvragen.",
      "Een ochtend AI-training op maat bij ze op kantoor, met een intake vooraf.",
      "Het team richtte een persoonlijk profiel en een project in en bouwde zelf een kleine rekentool.",
    ],
    zichtbaar: true,
  },
  {
    slug: "de-kort-hr-support",
    naam: "De Kort HR Support",
    logo: "/klanten/de-kort-hr-support.png",
    website: "https://www.hrsupport.nl",
    wat: "HR-advies voor het MKB vanuit Bladel: personeelszaken, verzuim, werving en arbeidsvoorwaarden.",
    hulp: [
      "Een middag AI-training op maat voor het team, met een intake vooraf.",
      "Samen geoefend met profielen, vaste werkwijzen en projecten op hun eigen soort werk.",
      "Na de training de mailbox van de eigenaar ingericht: antwoorden staan elke dag als concept klaar, hij keurt ze en verstuurt zelf.",
    ],
    zichtbaar: true,
  },
  {
    // Verborgen tot Willem ja zegt op naam en logo (John, 9-10-2026).
    slug: "p-van-hulst",
    naam: "Aannemersbedrijf P. van Hulst",
    logo: "/klanten/p-van-hulst.png",
    website: "https://pvanhulstbv.nl",
    wat: "Aannemersbedrijf in Duizel, met zusterbedrijf Industriebouw Zuid voor bedrijfshallen.",
    hulp: [
      "Een systeem dat elke nacht de nieuwe bouwtekeningen naloopt en meldt welke versie waar hoort.",
    ],
    zichtbaar: false,
  },
];

export const zichtbareKlanten = () => KLANTEN.filter((k) => k.zichtbaar);

export const getKlant = (slug: string) => zichtbareKlanten().find((k) => k.slug === slug);
