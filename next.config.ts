import type { NextConfig } from "next";

// Security-headers (go-live audit 2 juli): basis-hardening zonder gedrag te
// veranderen. X-Frame-Options beschermt tegen het framen van ONZE pagina's;
// de Loom-embed (wij framen Loom) blijft hierdoor gewoon werken.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
    // Eigen, vertrouwde SVG-covers (blog) toestaan. De CSP + sandbox zorgt dat
    // een SVG geen scripts kan draaien; wij leveren deze bestanden zelf aan.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // /sprookje checkt met fs.existsSync of een schermafbeelding bestaat. Door dat
  // dynamische pad trok de bundler de hele public/ (1,2 GB video) mee in de
  // serverfunctie, per deployment, en liep Vercel's Function Storage (10 GB)
  // vol (9 okt). De check draait bij het bouwen; de functie heeft public/ niet nodig.
  outputFileTracingExcludes: {
    "/sprookje": ["public/**/*"],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  // De trainingsvragenlijst is één zelfstandig HTML-bestand (bron:
  // 02-modules/future-content-training/intake/intake.html, kopie in public/).
  // Als statisch bestand loopt hij buiten de app-router om, dus er komt geen
  // menu en geen footer omheen. De rewrite geeft hem alleen een net adres.
  async rewrites() {
    return [
      {
        source: "/intake",
        destination: "/intake.html",
      },
    ];
  },

  // SEO-behoud (2 juli): /video is de enige route van de oude site die in de
  // rebrand een andere naam kreeg (/videografie + /film). Een 301 vangt oude
  // links, bookmarks en eventuele index-vermeldingen netjes op.
  async redirects() {
    return [
      {
        source: "/video",
        destination: "/videografie",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
