import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Film, Video & Content",
  description:
    "Video content die werkt. Vastgoedfilms voor makelaars en social media video voor bedrijven in De Kempen, Eindhoven en Tilburg. Opgenomen, gesneden, klaar.",
  openGraph: {
    title: "Film, Video & Content — Future Content",
    description:
      "Vastgoedvideo's en social media content. Snel, strak en klaar voor gebruik.",
    images: ["/photos/PhotoSessions-757307-pww_6420-vy-1.jpg"],
  },
};

export default function VideoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
