"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

/**
 * Compacte tekst-header voor de AI-pagina (/ai) — GEEN video meer.
 *
 * Verfijnronde 2 juli middag: de landingspagina (components/entry/LandingPage.tsx
 * + de nieuwe ScrollHero) toont de video-hero nu al prominent en compleet
 * (wie ben ik -> wat ik bouw -> voor wie -> CTA, als scroll-gestuurde
 * tekst-fases). Dezelfde video nogmaals tonen op /ai (dit was `HeroSplit` met
 * video groot links) is dubbelop en verzwakt beide plekken. Zie rapport 09,
 * sectie "Verfijnronde 2 juli middag" voor de volledige afweging.
 *
 * Nieuwe rol van /ai: geen tweede hero-voordeur, maar de VERDIEPINGSPAGINA.
 * Wie via / al de hero heeft gezien en meer wil weten over de aanpak, prijzen
 * en wat hij kan verwachten, komt hier terecht. Vandaar: compacte tekst-header
 * (geen video, geen full-screen), rechtstreeks de inhoud in.
 *
 * Rollback naar video-hero: dit bestand had een <video>-blok links (55-60%
 * breedte) met dezelfde bron als de landingshero (/videos/ai-hero.mp4) en
 * de tekst rechts ernaast. Zie git-loze back-up van de oude versie in
 * rapport 09 (sectie "Verfijnronde 2 juli middag") om 1-op-1 terug te zetten.
 * Nog een stap verder terug (ScrollStory met beats): zie app/ai/page.tsx,
 * de uitgecommentarieerde <ScrollStory beats={AI_BEATS} .../> call.
 *
 * Kleuren/klassen volgen het huisstijl-handboek (future-content-huisstijl/HUISSTIJL.md):
 * inkt #2A2218, klei #B45F38 als enige accent, fc-mono conventie uit globals.css.
 */
export default function HeroSplit() {
  const waLink = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    "Hallo John, ik wil graag meer weten over AI voor mijn bedrijf."
  )}`;

  return (
    <section className="relative w-full bg-[#2A2218] px-6 pb-16 pt-32 md:px-12 md:pb-20 md:pt-40 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl"
      >
        <p className="fc-mono mb-5 text-[11px] uppercase tracking-[0.4em] text-[#B45F38]">
          Future Content · AI · Zo werk ik
        </p>
        <h1
          className="text-[2.1rem] leading-[1.05] text-[#F3ECE0] sm:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
        >
          Zo pak ik het aan.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#F3ECE0]/70 md:text-lg">
          Geen podium, geen hype. Iemand uit de Kempen die het gewoon voor je
          bouwt. Hieronder de aanpak stap voor stap, wat het kost, en wat je
          van mij kunt verwachten.
        </p>

        <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Link
            href="/scan"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B45F38] px-7 py-4 text-sm font-semibold text-[#F3ECE0] transition-colors hover:bg-[#9E3D24]"
          >
            Doe de gratis AI-scan
            <ArrowRight size={16} />
          </Link>
          <Link
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#F3ECE0]/20 px-7 py-4 text-sm font-semibold text-[#F3ECE0] transition-colors hover:border-[#B45F38] hover:text-[#B45F38]"
          >
            <MessageCircle size={16} />
            Of app mij direct
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
