"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

/**
 * Statische split-hero voor de AI-pagina.
 *
 * John's feedback (2 juli): de vorige hero (ScrollStory, zie ai/ScrollStory.tsx)
 * had de video/tekst gecentreerd — oogde niet lekker. Nieuwe opzet: video groot
 * (55-60% van de breedte), hard LINKS uitgelijnd, tekst + CTA rechts ernaast.
 * Op mobiel stapelt het: video boven, tekst onder (zelfde breakpoint-conventie
 * als de rest van de site, md: 768px).
 *
 * Hergebruikt dezelfde video als de oude hero (/logo/Logo AI.mp4, John's eigen
 * placeholder tot hij 'm vervangt door /videos/ai-hero.mp4 — zie AI-SCROLL-VIDEO.md).
 */
export default function HeroSplit({ src = "/logo/Logo AI.mp4" }: { src?: string }) {
  const waLink = `https://wa.me/${SITE.whatsapp}?text=Hallo%20John%2C%20ik%20wil%20graag%20meer%20weten%20over%20AI%20voor%20mijn%20bedrijf.`;

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col bg-[#050506] md:flex-row md:items-stretch">
      {/* ── Video: groot, hard links, geen marge ── */}
      <div className="relative h-[46svh] w-full shrink-0 overflow-hidden md:h-auto md:w-[58%] fc-grain">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
        {/* Subtiele verduistering zodat een eventuele latere tekst-overlay leesbaar
            blijft en het beeld rustig aansluit op de donkere achtergrond. */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050506]/50 via-transparent to-[#050506]/10 md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#050506]/25" />
      </div>

      {/* ── Tekst + CTA: rechts van het beeld ── */}
      <div className="relative flex flex-1 items-center px-6 py-12 md:px-12 lg:px-16 md:py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg"
        >
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#C9A96E]">
            Future Content · AI
          </p>
          <h1 className="fc-wordmark text-[2.1rem] font-black leading-[1.05] text-[#FAFAF8] sm:text-5xl lg:text-6xl">
            Dit ben ik.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[#FAFAF8]/70 md:text-lg">
            Geen podium, geen hype. Iemand uit de Kempen die het gewoon voor je
            bouwt. Ik kijk aan tafel mee waar in jouw bedrijf de tijd weglekt,
            en dan bouw ik het.
          </p>

          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link
              href="/scan"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A96E] px-7 py-4 text-sm font-semibold text-[#0F0F0D] transition-transform hover:scale-[1.02]"
            >
              Doe de gratis AI-scan
              <ArrowRight size={16} />
            </Link>
            <Link
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-[#FAFAF8] transition-colors hover:border-[#C9A96E] hover:text-[#C9A96E]"
            >
              <MessageCircle size={16} />
              Of app mij direct
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
