import { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact | Plan een belafspraak",
  description:
    "Plan een vrijblijvende belafspraak met Future Content. AI-automatisering voor je bedrijf, vastgoedvideo of social media abonnement? Neem contact op, we reageren binnen één werkdag.",
  openGraph: {
    title: "Contact | Future Content Bladel",
    description: "Plan een belafspraak of stuur een WhatsApp. We reageren binnen één werkdag.",
    images: ["/photos/PhotoSessions-757307-pww_6440-vy-1.jpg"],
  },
  alternates: {
    canonical: `${SITE.url}/contact`,
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
