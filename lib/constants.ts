export const SITE = {
  name: "Future Content",
  tagline: "Video content die werkt.",
  description:
    "Future Content maakt social media video's voor bedrijven en vastgoedfilms voor makelaars in De Kempen, Eindhoven en Tilburg.",
  url: "https://future-content.nl",
  address: "Bladel, Noord-Brabant",
  city: "Bladel",
  region: "Noord-Brabant",
  country: "NL",
  phone: "06 50 91 99 60",
  email: "hello@future-content.nl",
  whatsapp: "31650919960",
  ownerName: "John Lavrijsen",
  kvk: "86880675",
};

export const PHOTOS = [
  "/photos/PhotoSessions-757307-pww_6420-vy-1.jpg",
  "/photos/PhotoSessions-757307-pww_6383-vy-1.jpg",
  "/photos/PhotoSessions-757307-pww_6329-vy-1.jpg",
  "/photos/PhotoSessions-757307-pww_6341-vy-1.jpg",
  "/photos/PhotoSessions-757307-pww_6404-vy-1.jpg",
  "/photos/PhotoSessions-757307-pww_6413-vy-1.jpg",
  "/photos/PhotoSessions-757307-pww_6440-vy-1.jpg",
  "/photos/PhotoSessions-757307-pww_6480-vy-1.jpg",
  "/photos/PhotoSessions-757307-pww_6483-vy-1.jpg",
  "/photos/PhotoSessions-757307-pww_6484-vy-1.jpg",
  "/photos/PhotoSessions-757307-pww_6270-vy-1.jpg",
  "/photos/PhotoSessions-757307-pww_6296-vy-1.jpg",
  "/photos/PhotoSessions-757307-pww_6305-vy-1.jpg",
  "/photos/PhotoSessions-757307-pww_6387-vy-1.jpg",
];

// Trust statistieken — gebaseerd op echte ervaring
export const TRUST_STATS = [
  { value: "150+", label: "Video's gemaakt" },
  { value: "1", label: "Vaste makelaar partner" },
  { value: "< 2 mnd", label: "Gem. verkooptijd*" },
  { value: "5,0 ★", label: "Google score" },
];

export const SOCIAL_PACKAGES = [
  {
    name: "Start",
    price: "€199",
    period: "/maand",
    note: "excl. BTW · min. 3 maanden",
    highlight: false,
    description: "Ideaal om te beginnen. Consistent aanwezig op social media zonder gedoe.",
    features: [
      "1 shoot dag per maand",
      "3 korte staande video's (9:16)",
      "Professionele editing (Final Cut Pro)",
      "Captions & tekst overlays",
      "Klaar voor Instagram, TikTok & LinkedIn",
      "Opgeleverd binnen 5 werkdagen",
    ],
    contentExample: "bijv. 1× behind-the-scenes, 1× tip of how-to, 1× product of dienst in beeld",
  },
  {
    name: "Groei",
    price: "€349",
    period: "/maand",
    note: "excl. BTW · min. 3 maanden",
    highlight: true,
    description: "Voor bedrijven die serieus meer klanten willen aantrekken via video.",
    features: [
      "1 shoot dag per maand",
      "6 korte staande video's (9:16)",
      "Professionele editing (Final Cut Pro)",
      "Captions & tekst overlays",
      "Klaar voor Instagram, TikTok & LinkedIn",
      "Content planning & onderwerpsuggesties",
      "Opgeleverd binnen 5 werkdagen",
    ],
    contentExample: "bijv. 2× klantgericht, 2× behind-the-scenes, 1× tip, 1× product of dienst",
  },
  {
    name: "Premium",
    price: "€499",
    period: "/maand",
    note: "excl. BTW · min. 3 maanden",
    highlight: false,
    description: "Maximale zichtbaarheid. Elke week iets nieuws — jij hoeft niks te doen.",
    features: [
      "1 shoot dag per maand",
      "9 korte staande video's (9:16)",
      "Professionele editing (Final Cut Pro)",
      "Captions & tekst overlays",
      "Klaar voor Instagram, TikTok & LinkedIn",
      "Content strategie & publicatieplanning",
      "Maandelijkse content review",
      "Opgeleverd binnen 5 werkdagen",
    ],
    contentExample: "bijv. 3× klantgericht, 2× behind-the-scenes, 2× tip of how-to, 2× product of dienst",
  },
];

export const VASTGOED_PACKAGES = [
  {
    name: "Walkthrough",
    price: "€199",
    note: "excl. BTW · per object",
    description: "Eén strakke video van het object. Funda-ready, snel opgeleverd.",
    features: [
      "1 professionele walkthrough video",
      "Keuze: horizontaal (16:9) voor Funda óf verticaal (9:16) voor social",
      "Sony A6400 + DJI RS Mini Ronin",
      "Opgeleverd binnen 1 week",
      "Geschikt voor Funda, website & e-mail",
      "1 revisieronde",
    ],
    highlight: false,
    note2: "Drone luchtopnames op aanvraag — afhankelijk van locatie en vliegzone",
  },
  {
    name: "Compleet",
    price: "€349",
    note: "excl. BTW · per object",
    description: "Video + sociale teaser + drone. Alles in één — maximale indruk bij kopers.",
    features: [
      "Premium walkthrough video (16:9)",
      "Verticale social teaser (9:16) voor Instagram",
      "Sony A6400 + Rode Wireless GO + DJI RS Mini Ronin",
      "Drone luchtopnames (DJI Mini 3 Pro) — waar toegestaan",
      "Opgeleverd binnen 1 week",
      "Horizontaal + verticaal formaat",
      "2 revisierondes",
    ],
    highlight: true,
    note2: null,
  },
];

// Concurrentievergelijking vastgoed
export const COMPETITOR_COMPARE = [
  { name: "Grote videobureaus", price: "€500–1.500", turnaround: "2–4 weken", personal: false },
  { name: "Van Heertum Media", price: "€350–600", turnaround: "1–2 weken", personal: false },
  { name: "VideoFunda", price: "vanaf €279", turnaround: "1–2 weken", personal: false },
  { name: "Future Content", price: "vanaf €199", turnaround: "binnen 1 week", personal: true },
];

export const REGIONS = [
  {
    name: "De Kempen",
    cities: ["Bladel", "Eersel", "Reusel", "Bergeijk", "Waalre", "Valkenswaard"],
  },
  {
    name: "Eindhoven & omgeving",
    cities: ["Eindhoven", "Veldhoven", "Best", "Son en Breugel", "Waalre", "Nuenen"],
  },
  {
    name: "Tilburg & omgeving",
    cities: ["Tilburg", "Breda", "Waalwijk", "Dongen", "Oisterwijk"],
  },
];

// Echte Google Reviews
export const REVIEWS = [
  {
    name: "Anita Fiers",
    initials: "AF",
    company: "Your Veldhoven Broker — Pit Makelaars",
    rating: 5,
    text: "Iedere keer weer zijn we verrast hoe mooi het resultaat is van de video's die John maakt. Hij denkt ontzettend goed mee, komt keer op keer met nieuwe creatieve ideeën en echt niets is voor hem te veel. Hij is altijd bereid om een extra stap te zetten. Wij zijn super tevreden.",
    source: "Google",
  },
  {
    name: "Mandy Daniels",
    initials: "MD",
    company: "Bruidspaar",
    rating: 5,
    text: "John heeft onze trouwvideo gemaakt, waar wij super tevreden over waren! Hij heeft hele mooie beelden gemaakt, waarvan hij meerdere gave aftermovies van heeft gemaakt. Een fijne man om mee samen te werken.",
    source: "Google",
  },
  {
    name: "Rens Couwenberg",
    initials: "RC",
    company: "Klant",
    rating: 5,
    text: "Top om met John te werken, heeft veel kennis, ervaring en is creatief. Aanrader.",
    source: "Google",
  },
  {
    name: "Linda Kaethoven",
    initials: "LK",
    company: "Klant",
    rating: 5,
    text: "Hele fijne samenwerking!",
    source: "Google",
  },
];

// Reacties van huiseigenaren over hun vastgoedvideo
// (via WhatsApp na oplevering — anoniem weergegeven per adres)
export const SELLER_QUOTES = [
  {
    address: "Smelen, Veldhoven",
    quote:
      "Wow, supermooi! Goed gedaan… en ook een prachtig aandenken voor onszelf.",
  },
  {
    address: "Vicus, Veldhoven",
    quote: "Wat een geweldig goed filmpje. Complimenten!",
  },
  {
    address: "Dr. H. Mollerstraat, Valkenswaard",
    quote: "De video is prachtig geworden. Echt een meerwaarde voor de verkoop.",
  },
  {
    address: "Libra, Veldhoven",
    quote: "De video ziet er geweldig uit! Zo presenteert ons huis zich op zijn best.",
  },
  {
    address: "Cygnus, Veldhoven",
    quote: "Ziet er mooi uit — precies de sfeer die we wilden overbrengen.",
  },
];

// Lokale vastgoedvideo's — 9 objecten (allemaal Premium/Compleet pakket)
// Posters: exterieur-foto's rechtstreeks van pitmakelaars.com (verkochte objecten).
// slug wordt gebruikt als URL: /portfolio/[slug]
export const STACK_VIDEOS = [
  {
    id: "1",
    slug: "wintelre-koemeerskuil-20",
    title: "Wintelre, Koemeerskuil 20",
    location: "Wintelre",
    src: "/videos/wintelre-koemeerskuil-20.mp4",
    poster: "/photos/properties/koemeerskuil-20-wintelre.jpg",
    description: "Premium video — Pit Makelaars",
  },
  {
    id: "2",
    slug: "reusel-de-rijt-3",
    title: "Reusel, De Rijt 3",
    location: "Reusel",
    src: "/videos/reusel-de-rijt-3.mp4",
    poster: "/photos/properties/de-rijt-3-reusel.jpg",
    description: "Premium video — Pit Makelaars",
  },
  {
    id: "3",
    slug: "riethoven-hasselt-5",
    title: "Riethoven, Hasselt 5",
    location: "Riethoven",
    src: "/videos/riethoven-hasselt-5.mp4",
    poster: "/photos/properties/hasselt-5-riethoven.jpg",
    description: "Premium video — Pit Makelaars",
  },
  {
    id: "4",
    slug: "eindhoven-welschapsedijk-103",
    title: "Eindhoven, Welschapsedijk 103",
    location: "Eindhoven",
    src: "/videos/eindhoven-welschapsedijk-103.mp4",
    poster: "/photos/PhotoSessions-757307-pww_6383-vy-1.jpg",
    description: "Premium video — Pit Makelaars",
  },
  {
    id: "5",
    slug: "eindhoven-vlokhovenseweg-62",
    title: "Eindhoven, Vlokhovenseweg 62",
    location: "Eindhoven",
    src: "/videos/eindhoven-vlokhovenseweg-62.mp4",
    poster: "/photos/properties/vlokhovenseweg-62-eindhoven.jpg",
    description: "Premium video — Pit Makelaars",
  },
  {
    id: "6",
    slug: "reusel-vijverveld-13",
    title: "Reusel, Vijverveld 13",
    location: "Reusel",
    src: "/videos/reusel-vijverveld-13.mp4",
    poster: "/photos/properties/vijverveld-13-reusel.jpg",
    description: "Premium video — Pit Makelaars",
  },
  {
    id: "7",
    slug: "eersel-hollandse-hoeve-19",
    title: "Eersel, Hollandse Hoeve 19",
    location: "Eersel",
    src: "/videos/eersel-hollandse-hoeve-19.mp4",
    poster: "/photos/properties/hollandse-hoeve-19-eersel.jpg",
    description: "Premium video — Pit Makelaars",
  },
  {
    id: "8",
    slug: "veldhoven-vlasacker-3",
    title: "Veldhoven, Vlasacker 3",
    location: "Veldhoven",
    src: "/videos/veldhoven-vlasacker-3.mp4",
    poster: "/photos/properties/vlasacker-3-veldhoven.jpg",
    description: "Premium video — Pit Makelaars",
  },
  {
    id: "9",
    slug: "lage-mierde-hooge-mierdseweg-15",
    title: "Lage Mierde, Hooge Mierdseweg 15",
    location: "Lage Mierde",
    src: "/videos/lage-mierde-hooge-mierdseweg-15.mp4",
    poster: "/photos/properties/hooge-mierdseweg-15-lage-mierde.jpg",
    description: "Premium video — Pit Makelaars",
  },
];

export const NAV_LINKS = [
  { href: "/ai", label: "AI" },
  { href: "/social-media", label: "Social Media" },
  { href: "/makelaars", label: "Makelaars" },
  { href: "/trouwen", label: "Trouwen" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/werkwijze", label: "Werkwijze" },
  { href: "/blog", label: "Blog" },
  { href: "/over", label: "Over" },
];

// ─── BOOKING (Cal.com kennismaking, gebruikt door de /scan-flow) ─────
export const BOOKING = {
  calUser: "futurecontent",
  calEvent: "30min",
  calHost: "cal.eu", // John's Cal.com-account staat op de EU-regio (cal.eu)
  duration: "30 minuten",
};
