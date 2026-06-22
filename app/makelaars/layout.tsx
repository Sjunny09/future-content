import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vastgoedvideograaf Kempen & Eindhoven",
  description:
    "Funda-ready vastgoedvideo's voor makelaars in De Kempen, Eindhoven en Tilburg. Walkthrough, drone & social teaser. Opgeleverd binnen 1 week. Vanaf €299 excl. BTW.",
  openGraph: {
    title: "Vastgoedvideograaf | Future Content",
    description:
      "Professionele vastgoedvideo's voor makelaars. Snel, strak en Funda-ready.",
    images: ["/photos/PhotoSessions-757307-pww_6329-vy-1.jpg"],
  },
};

export default function MakelaarsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
