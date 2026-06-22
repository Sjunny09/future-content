import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Plan een belafspraak",
  description:
    "Plan een vrijblijvende belafspraak met Future Content. Vastgoedvideo, social media abonnement of zakelijke video? Neem contact op | we reageren binnen één werkdag.",
  openGraph: {
    title: "Contact | Future Content Bladel",
    description: "Plan een belafspraak of stuur een WhatsApp. We reageren binnen één werkdag.",
    images: ["/photos/PhotoSessions-757307-pww_6440-vy-1.jpg"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
