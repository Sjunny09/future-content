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
