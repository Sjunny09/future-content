import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Video Abonnement",
  description:
    "Maandelijks verse social media video's voor jouw bedrijf. Starter €299/m, Pro €499/m, Premium €799/m excl. BTW. Eén shoot dag, maanden aan content.",
  openGraph: {
    title: "Social Media Video Abonnement | Future Content",
    description: "Eén shoot dag. Maanden aan content. Abonnement vanaf €299/maand.",
    images: ["/photos/PhotoSessions-757307-pww_6383-vy-1.jpg"],
  },
};

export default function SocialMediaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
