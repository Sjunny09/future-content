import { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Portfolio | Vastgoedvideo & Social Media",
  description:
    "Bekijk het portfolio van Future Content. Vastgoedvideo's, social media content, zakelijke video's en events in De Kempen, Eindhoven en Tilburg.",
  openGraph: {
    title: "Portfolio | Future Content Videografie",
    description: "Bekijk onze vastgoedvideo's, social content en meer.",
    images: ["/photos/PhotoSessions-757307-pww_6420-vy-1.jpg"],
  },
  alternates: {
    canonical: `${SITE.url}/portfolio`,
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
