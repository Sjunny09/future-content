import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Video, Content & AI voor lokale bedrijven",
  description:
    "Praktische artikelen over hoe makelaars en bedrijven in De Kempen en Eindhoven meer klanten aantrekken met video content en AI.",
  openGraph: {
    title: "Blog — Future Content",
    description: "Inzichten over video, social media content en AI voor lokale ondernemers.",
    images: ["/photos/PhotoSessions-757307-pww_6404-vy-1.jpg"],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
