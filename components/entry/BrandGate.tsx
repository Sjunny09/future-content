"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Clapperboard } from "lucide-react";
import Wordmark from "@/components/common/Wordmark";
import { PHOTOS } from "@/lib/constants";

/**
 * De poort: één merk, twee werelden. Links AI (de hoofdmoot), rechts film,
 * video en contentgeneratie. Beide donker-cinematisch, maar met een eigen
 * skin. De gedeelde wordmark bovenaan en het cursor-embleem op de naad
 * houden het één Future Content.
 */
export default function BrandGate() {
  const [hovered, setHovered] = useState<"ai" | "video" | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  // AI is de hoofdmoot: standaard iets breder. Hover verschuift het gewicht.
  const grow = (side: "ai" | "video") => {
    if (!isDesktop) return 1;
    const base = side === "ai" ? 1.12 : 0.88;
    if (hovered === side) return side === "ai" ? 1.7 : 1.45;
    if (hovered && hovered !== side) return side === "ai" ? 0.8 : 0.62;
    return base;
  };

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-[#050506]">
      <div className="flex h-full w-full flex-col md:flex-row">
        {/* ── AI ── de hoofdmoot ─────────────────────────────── */}
        <motion.div
          className="relative min-h-[50svh] min-w-0 md:min-h-0"
          style={{ flexGrow: 1, flexBasis: 0 }}
          animate={{ flexGrow: grow("ai") }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setHovered("ai")}
          onMouseLeave={() => setHovered(null)}
        >
          <AiPanel dimmed={hovered === "video"} />
        </motion.div>

        {/* ── Video / film / content ─────────────────────────── */}
        <motion.div
          className="relative min-h-[50svh] min-w-0 md:min-h-0"
          style={{ flexGrow: 1, flexBasis: 0 }}
          animate={{ flexGrow: grow("video") }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setHovered("video")}
          onMouseLeave={() => setHovered(null)}
        >
          <VideoPanel dimmed={hovered === "ai"} />
        </motion.div>
      </div>

      {/* Naad + centraal cursor-embleem: de lijm tussen beide werelden. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 z-20 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-transparent md:inset-y-0 md:left-1/2 md:top-0 md:h-full md:w-px md:-translate-x-1/2 md:translate-y-0 md:bg-gradient-to-b"
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A96E]/60 bg-[#0F0F0D] shadow-[0_0_0_6px_rgba(5,5,6,0.6)]">
          <span className="fc-caret h-5 w-2.5" />
        </div>
      </div>

      {/* Gedeelde wordmark + brand-line bovenaan. */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="pointer-events-none absolute inset-x-0 top-0 z-30 flex flex-col items-center gap-2 pt-7 md:pt-9"
      >
        <Wordmark theme="dark" className="text-xl md:text-2xl" showCaret={false} />
        <p className="fc-wordmark text-[10px] uppercase tracking-[0.42em] text-[#b9b9c0]">
          <span className="text-[#C9A96E]">Think</span> Now,{" "}
          <span className="text-[#F0E6D0]">Build</span> Tomorrow
        </p>
      </motion.header>
    </div>
  );
}

/* ───────────────────────── AI-panel ───────────────────────── */

function AiPanel({ dimmed }: { dimmed: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);

  // Gouden spotlight volgt de muis. Subtiel, geen sci-fi glow.
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Link
      ref={ref}
      href="/ai"
      onMouseMove={onMove}
      aria-label="Betreed de AI-wereld"
      className="group relative flex h-full w-full flex-col justify-end overflow-hidden bg-[#050506] p-8 md:p-12"
    >
      {/* Spotlight */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(380px circle at var(--mx, 50%) var(--my, 40%), rgba(201,169,110,0.14), transparent 70%)",
        }}
      />
      {/* Fijn technisch raster: strak, functioneel. */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(#C9A96E 1px, transparent 1px), linear-gradient(90deg, #C9A96E 1px, transparent 1px)",
          backgroundSize: "46px 46px",
          maskImage:
            "radial-gradient(80% 80% at 50% 60%, black 20%, transparent 100%)",
        }}
      />
      <div
        className={`absolute inset-0 bg-[#050506] transition-opacity duration-500 ${
          dimmed ? "opacity-60" : "opacity-0"
        }`}
      />

      <div className="relative z-10 w-full min-w-0 max-w-md">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C9A96E]/40 bg-[#C9A96E]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C9A96E]">
          <Cpu size={12} /> Hoofdmoot
        </span>
        <h1 className="fc-wordmark break-words text-[2rem] font-black leading-[1.02] text-[#FAFAF8] sm:text-5xl lg:text-6xl">
          AI &amp;<br />
          automatisering
        </h1>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#FAFAF8]/65">
          AI die werkt. Gewoon gebouwd. Ik kom langs, kijk waar de tijd weglekt,
          en bouw het voor je.
        </p>
        <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#C9A96E]">
          Betreed
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </span>
      </div>
    </Link>
  );
}

/* ─────────────────────── Video-panel ──────────────────────── */

function VideoPanel({ dimmed }: { dimmed: boolean }) {
  return (
    <Link
      href="/video"
      aria-label="Betreed de video-wereld"
      className="group relative flex h-full w-full flex-col justify-end overflow-hidden bg-[#0F0F0D] p-8 md:p-12 fc-grain"
    >
      <Image
        src={PHOTOS[0]}
        alt="Future Content videografie"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-center opacity-45 transition-all duration-[900ms] group-hover:scale-105 group-hover:opacity-60"
      />
      {/* Warme cinematische gradient. */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0D] via-[#0F0F0D]/55 to-[#0F0F0D]/70" />
      <div
        className={`absolute inset-0 bg-[#0F0F0D] transition-opacity duration-500 ${
          dimmed ? "opacity-60" : "opacity-0"
        }`}
      />

      <div className="relative z-10 w-full min-w-0 max-w-md md:ml-auto md:text-right">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C9A96E]/40 bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C9A96E] md:ml-auto">
          <Clapperboard size={12} /> Ook mogelijk
        </span>
        <h2
          className="break-words text-[2rem] font-bold leading-[1.05] text-[#FAFAF8] sm:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Film, video &amp; content
        </h2>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#FAFAF8]/70 md:ml-auto">
          Video content die werkt. Vastgoedfilms, social video en
          contentgeneratie. Opgenomen, gesneden, klaar voor gebruik.
        </p>
        <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#C9A96E] md:justify-end">
          Betreed
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </span>
      </div>
    </Link>
  );
}
