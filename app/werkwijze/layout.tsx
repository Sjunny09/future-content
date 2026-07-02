import { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Werkwijze | Van aanvraag tot oplevering",
  description:
    "Zo werkt Future Content: aanvraag, voorbereiding, shoot dag en oplevering binnen 1 week. Helder, snel en zonder verrassingen.",
  openGraph: {
    title: "Werkwijze | Future Content",
    description: "Van aanvraag tot afgeleverde video's in 5 duidelijke stappen.",
    images: ["/photos/PhotoSessions-757307-pww_6404-vy-1.jpg"],
  },
  alternates: {
    canonical: `${SITE.url}/werkwijze`,
  },
};

export default function WerkwijzeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
