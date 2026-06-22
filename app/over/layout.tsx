import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Over ons | Future Content Bladel",
  description:
    "Future Content is jouw lokale videograaf in Bladel. Persoonlijk, snel, betrouwbaar. Sony A6400 + DJI Mini 3 Pro. Actief door heel De Kempen en omstreken.",
  openGraph: {
    title: "Over ons | Future Content",
    description: "Persoonlijk, snel en betrouwbaar. Jouw lokale videograaf in De Kempen.",
    images: ["/photos/PhotoSessions-757307-pww_6270-vy-1.jpg"],
  },
};

export default function OverLayout({ children }: { children: React.ReactNode }) {
  return children;
}
