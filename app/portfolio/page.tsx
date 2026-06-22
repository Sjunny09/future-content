"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Video, Heart, Film, Clock } from "lucide-react";
import { STACK_VIDEOS } from "@/lib/constants";

// ─── Hover-to-play card (vastgoed) ───────────────────────────────────────────
function VideoHoverCard({
  video,
  index,
}: {
  video: (typeof STACK_VIDEOS)[number];
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleEnter = () => {
    const vid = videoRef.current;
    if (!vid) return;
    setHovered(true);
    vid.currentTime = 3;
    vid.play().catch(() => {});
  };

  const handleLeave = () => {
    const vid = videoRef.current;
    if (!vid) return;
    setHovered(false);
    vid.pause();
  };

  return (
    <Link href={`/portfolio/${video.slug}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.06 }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={[
          "relative rounded-2xl overflow-hidden bg-[#0F0F0D]",
          "transition-all duration-300 ease-out",
          hovered
            ? "scale-[1.07] shadow-[0_20px_60px_rgba(0,0,0,0.4)] z-10"
            : "scale-100 z-0",
        ].join(" ")}
      >
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          preload="metadata"
          playsInline
          muted
          loop
          className="w-full aspect-video object-cover"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.poster}
          alt={video.title}
          aria-hidden="true"
          className={[
            "absolute inset-0 w-full aspect-video object-cover",
            "transition-opacity duration-300",
            hovered ? "opacity-0 pointer-events-none" : "opacity-100",
          ].join(" ")}
        />
        {!hovered && (
          <div className="absolute inset-0 aspect-video flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <Play size={18} fill="white" className="text-white ml-0.5" />
            </div>
          </div>
        )}
        <div className="px-5 py-4">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 className="font-semibold text-[#FAFAF8] text-sm leading-snug">
              {video.title}
            </h3>
            <span className="shrink-0 px-2 py-0.5 rounded-full bg-[#C9A96E]/20 text-[#C9A96E] text-[10px] font-semibold uppercase tracking-wider">
              Vastgoed
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-1.5 text-xs text-[#FAFAF8]/40">
              <Video size={11} />
              {video.description}
            </div>
            <span className="text-xs text-[#C9A96E] font-medium">Bekijk case →</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// ─── Category nav tabs ────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "socials", label: "Socials", icon: <Film size={14} /> },
  { id: "woningen", label: "Woningen", icon: <Video size={14} /> },
  { id: "trouwen", label: "Trouwen", icon: <Heart size={14} /> },
];

function CategoryNav({ active }: { active: string }) {
  return (
    <nav
      aria-label="Portfolio categorieën"
      className="flex gap-2 flex-wrap"
    >
      {CATEGORIES.map((cat) => (
        <a
          key={cat.id}
          href={`#${cat.id}`}
          className={[
            "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200",
            active === cat.id
              ? "bg-[#C9A96E] text-[#0F0F0D]"
              : "bg-[#F0EBE3] text-[#6B7280] hover:bg-[#E5DDD3] hover:text-[#1A1A18]",
          ].join(" ")}
        >
          {cat.icon}
          {cat.label}
        </a>
      ))}
    </nav>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState("socials");

  // Track which section is currently in view for the active tab indicator
  useEffect(() => {
    const sections = CATEGORIES.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ─── HEADER ───────────────────────────────────────────────────── */}
      <section className="bg-[#FAFAF8] pt-32 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-4">
              Portfolio
            </span>
            <h1
              className="text-4xl md:text-6xl font-bold text-[#1A1A18] mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Ons werk.
            </h1>
            <p className="text-[#6B7280] text-lg max-w-xl mb-8">
              Social media content, vastgoedvideo&apos;s en bruiloftsfilms, gemaakt in De Kempen, Eindhoven en omgeving.
            </p>
            <CategoryNav active={activeSection} />
          </motion.div>
        </div>
      </section>

      {/* ─── SOCIALS ──────────────────────────────────────────────────── */}
      <section id="socials" className="bg-[#F5F1EB] py-20 md:py-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-block text-[#C9A96E] text-xs font-semibold uppercase tracking-widest">
              Socials
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#1A1A18] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Social media video&apos;s.
          </h2>
          <p className="text-[#6B7280] text-lg mb-12 max-w-xl">
            Korte, scherpe video&apos;s voor Instagram, TikTok en LinkedIn. Snel zichtbaar, lang bijblijvend.
          </p>

          {/* Coming soon card */}
          <div className="flex flex-col items-center justify-center py-20 rounded-2xl border-2 border-dashed border-[#D5CCBF] bg-[#FAF7F2] text-center">
            <div className="w-14 h-14 rounded-full bg-[#C9A96E]/15 flex items-center justify-center mb-4">
              <Clock size={22} className="text-[#C9A96E]" />
            </div>
            <h3
              className="text-xl font-bold text-[#1A1A18] mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Binnenkort beschikbaar
            </h3>
            <p className="text-[#6B7280] text-sm max-w-sm">
              We werken aan ons social media portfolio. Wil je alvast zien wat we kunnen?
              Stuur een berichtje, we laten het je graag zien.
            </p>
            <Link
              href="https://wa.me/31650919960?text=Hallo%20John%2C%20ik%20wil%20graag%20voorbeelden%20zien%20van%20social%20media%20content."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C9A96E] text-[#0F0F0D] text-sm font-semibold hover:bg-[#b8955a] transition-colors"
            >
              Vraag voorbeelden op <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WONINGEN ─────────────────────────────────────────────────── */}
      <section id="woningen" className="bg-[#FAFAF8] py-20 md:py-28 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <span className="inline-block text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-3">
            Woningen
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#1A1A18] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Vastgoedvideo&apos;s.
          </h2>
          <p className="text-[#6B7280] text-lg mb-4 max-w-xl">
            Premium vastgoedvideo&apos;s gemaakt voor Pit Makelaars, in De Kempen, Eindhoven en omgeving.
          </p>
          <p className="text-[#C9A96E] text-sm mb-10">
            Beweeg over een woning om de video te bekijken. Klik voor meer info.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 [&>*]:relative">
            {STACK_VIDEOS.map((video, i) => (
              <VideoHoverCard key={video.id} video={video} index={i} />
            ))}
          </div>

          <p className="text-center text-sm text-[#6B7280] mt-10">
            * Gemiddelde verkooptijd woningen met Future Content video: binnen 2 maanden na publicatie.
          </p>
        </div>
      </section>

      {/* ─── TROUWEN ──────────────────────────────────────────────────── */}
      <section id="trouwen" className="bg-[#0F0F0D] py-20 md:py-28 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6">
          <span className="inline-block text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-3">
            Trouwen
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#FAFAF8] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Bruiloftsvideo&apos;s.
          </h2>
          <p className="text-[#FAFAF8]/60 mb-10 max-w-xl">
            De mooiste dag van jullie leven, vastgelegd zoals jullie hem beleefd hebben.
          </p>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/16VDboUDpps"
              title="Bruiloftsvideo Future Content"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/trouwen"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#C9A96E] text-[#0F0F0D] font-semibold hover:bg-[#b8955a] transition-colors"
            >
              Meer over bruiloftsvideo&apos;s <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F1EB] py-20 text-center border-t border-[#E5E0D8]">
        <div className="max-w-2xl mx-auto px-6">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#1A1A18] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Jouw project hier?
          </h2>
          <p className="text-[#6B7280] mb-8">
            Stuur een WhatsApp. Ik reageer dezelfde dag en we plannen een vrijblijvend gesprek.
          </p>
          <Link
            href="https://wa.me/31650919960?text=Hallo%20John%2C%20ik%20ben%20geïnteresseerd%20in%20een%20video."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#1dbd5a] transition-colors"
          >
            App mij op WhatsApp <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
