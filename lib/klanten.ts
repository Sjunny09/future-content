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
  // Letterlijke Google-reviews van mensen bij deze klant.
  reviews?: { naam: string; sterren: number; tekst: string }[];
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
    website: "https://hrsupport.nl",
    wat: "HR-advies voor het MKB vanuit Bladel: personeelszaken, verzuim, werving en arbeidsvoorwaarden.",
    hulp: [
      "Een middag AI-training op maat voor het team, met een intake vooraf.",
      "Samen geoefend met profielen, vaste werkwijzen en projecten op hun eigen soort werk.",
      "Na de training de mailbox van de eigenaar ingericht: antwoorden staan elke dag als concept klaar, hij keurt ze en verstuurt zelf.",
    ],
    reviews: [
      { naam: "Mark", sterren: 5, tekst: "Was een zeer interessante en inspirerende training. Al vaak gezegd dat we met AI moeten starten maar met de hulp van John nu ook echt mee begonnen." },
      { naam: "Hanne Verberne", sterren: 4, tekst: "John weet zaken op een laagdrempelige manier uit te leggen en laat zien hoe je AI direct kunt toepassen op de werkvloer. Zijn AI- training is praktisch, concreet en gericht op de dagelijkse praktijk. Hierdoor ga je niet alleen begrijpen wat AI kan, maar kun je er na afloop ook zelf mee aan de slag." },
    ],
    zichtbaar: true,
  },
  {
    // Logo: uitsnede van de kop van advertimemedia.com (13-10-2026); ze hebben geen los logobestand.
    slug: "advertime-media",
    naam: "Advertime Media",
    logo: "/klanten/advertime-media.png",
    website: "https://advertimemedia.com",
    wat: "Bureau uit Bladel dat verkoopafspraken en leads levert aan bedrijven die aan huis verkopen, via Meta-advertenties en een Nederlands belteam.",
    hulp: [
      "Twee draaidagen op locatie gefilmd, in 2024.",
      "Op hun vraag mijn werkwijze voor video's met AI uitgeschreven in tien stappen.",
    ],
    reviews: [
      { naam: "Rens Couwenberg", sterren: 5, tekst: "Top om met John te werken, heeft veel kennis, ervaring en is creatief. Aanrader." },
    ],
    zichtbaar: true,
  },
  {
    // Naam en logo mogen getoond worden (John, 15-10-2026).
    slug: "p-van-hulst",
    naam: "Aannemersbedrijf P. van Hulst",
    logo: "/klanten/p-van-hulst.png",
    website: "https://pvanhulstbv.nl",
    wat: "Aannemersbedrijf in Duizel, met zusterbedrijf Industriebouw Zuid voor bedrijfshallen.",
    hulp: [
      "Tekeningbeheer: een systeem dat elke nacht de nieuwe bouwtekeningen naloopt en de oude versies opruimt, zodat iedereen met de nieuwste tekening werkt.",
      "Een inkoopportaal: de begroting gaat erin, per regel kiezen ze wat ze inkopen, en de posten van alle lopende werken komen samen op één bestellijst per onderdeel. Verandert een begroting nadat er al besteld is, dan zien ze dat meteen.",
    ],
    zichtbaar: true,
  },
  {
    // Zusterbedrijf van P. van Hulst, zelfde opdracht (John, 15-10-2026).
    slug: "industriebouw-zuid",
    naam: "Industriebouw Zuid",
    logo: "/klanten/industriebouw-zuid.jpg",
    website: "https://www.industriebouwzuid.nl",
    wat: "Bouwer van bedrijfshallen en bedrijfspanden in Duizel, zusterbedrijf van Aannemersbedrijf P. van Hulst.",
    hulp: [
      "Tekeningbeheer: een systeem dat elke nacht de nieuwe bouwtekeningen naloopt en de oude versies opruimt, zodat iedereen met de nieuwste tekening werkt.",
      "Een inkoopportaal: de begroting gaat erin, per regel kiezen ze wat ze inkopen, en de posten van alle lopende werken komen samen op één bestellijst per onderdeel. Verandert een begroting nadat er al besteld is, dan zien ze dat meteen.",
    ],
    zichtbaar: true,
  },
];

export const zichtbareKlanten = () => KLANTEN.filter((k) => k.zichtbaar);

export const getKlant = (slug: string) => zichtbareKlanten().find((k) => k.slug === slug);
