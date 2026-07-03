"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

// Vaste WhatsApp-knop, sitewide (ook op /scan en /boek). Onopvallend maar altijd
// bereikbaar. Context-afhankelijke tekst: op de film-pagina's over video, elders
// over AI. Wordt in de root-layout BUITEN SiteChrome gerenderd, zodat de chrome
// wel verborgen kan zijn maar deze knop altijd blijft.
export default function WhatsAppFloat() {
  const pathname = usePathname() ?? "";

  const film =
    pathname.startsWith("/film") ||
    pathname.startsWith("/makelaars") ||
    pathname.startsWith("/trouwen");

  const tekst = film
    ? "Hallo John, ik wil graag een video boeken of een prijs opvragen."
    : "Hallo John, ik wil graag AI voor mijn bedrijf.";
  const href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(tekst)}`;

  // Op de immersieve routes (/, /ai, /scan) rendert SiteChrome geen "Bel mij
  // terug"-knop, dan mag WhatsApp helemaal onderaan. Op de overige pagina's
  // staat die belknop rechtsonder, dus stapelen we WhatsApp erboven (niet
  // over andere CTA's heen).
  const bare =
    pathname === "/" ||
    pathname === "/ai" ||
    pathname.startsWith("/ai/") ||
    pathname.startsWith("/scan");
  const bottom = bare ? "bottom-5 sm:bottom-6" : "bottom-24";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Stuur me een WhatsApp"
      className={`plausible-event-name=WhatsApp-klik fixed right-4 sm:right-6 z-40 ${bottom} inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition-colors hover:bg-[#1dbd5a]`}
    >
      <MessageCircle size={18} className="shrink-0" />
      <span className="hidden text-sm font-semibold sm:inline">App me</span>
    </a>
  );
}
