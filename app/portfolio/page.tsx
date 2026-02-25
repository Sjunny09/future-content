"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Video } from "lucide-react";
import { STACK_VIDEOS } from "@/lib/constants";

// ─── Hover-to-play card ──────────────────────────────────────────────────────
// On desktop hover: card scales up, video starts from 3 s (skips any intro).
// On mobile: tap shows play controls.
//
// Why preload="metadata" instead of preload="none"?
// We need to seek to currentTime=3 before playing. The browser can only seek
// if it has loaded at least the duration/keyframe data (metadata). Without it,
// the currentTime assignment is silently ignored and the intro plays anyway.
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
    vid.currentTime = 3; // skip Pit Makelaars intro (first 3 s is branding)
    // .play() returns a Promise; .catch() suppresses "user didn't interact" errors
    // that browsers throw when autoplay is blocked without a user gesture.
    vid.play().catch(() => {});
  };

  const handleLeave = () => {
    const vid = videoRef.current;
    if (!vid) return;
    setHovered(false);
    vid.pause();
    vid.currentTime = 3; // reset to 3 s so the next hover starts clean
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={[
        "relative rounded-2xl overflow-hidden bg-[#0F0F0D] cursor-pointer",
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

      {/* Caption bar */}
      <div className="px-5 py-4">
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className="font-semibold text-[#FAFAF8] text-sm leading-snug">
            {video.title}
          </h3>
          <span className="shrink-0 px-2 py-0.5 rounded-full bg-[#C9A96E]/20 text-[#C9A96E] text-[10px] font-semibold uppercase tracking-wider">
            Vastgoed
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#FAFAF8]/40 mt-1">
          <Video size={11} />
          {video.description}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  return (
    <>
      {/* ─── HEADER ───────────────────────────────────────────────────── */}
      <section className="bg-[#FAFAF8] pt-32 pb-16">
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
              Vastgoedvideo&apos;s.
            </h1>
            <p className="text-[#6B7280] text-lg max-w-xl">
              Premium vastgoedvideo&apos;s gemaakt voor Pit Makelaars — in De Kempen, Eindhoven en omgeving.
            </p>
            <p className="text-[#C9A96E] text-sm mt-3">
              Beweeg over een woning om de video te bekijken.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── VIDEO GRID ───────────────────────────────────────────────── */}
      <section className="bg-[#FAFAF8] pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* overflow-visible so scaled cards aren't clipped by neighbours */}
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

      {/* ─── COMING SOON ──────────────────────────────────────────────── */}
      <section className="bg-[#F5F1EB] py-16 border-t border-[#E5E0D8]">
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="text-2xl font-bold text-[#1A1A18] mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Social media & zakelijk portfolio — binnenkort
          </h2>
          <p className="text-[#6B7280] text-sm max-w-lg">
            We werken aan een uitbreiding van ons portfolio met social media content en zakelijke video&apos;s.
            Benieuwd wat we voor jouw bedrijf kunnen doen? Plan een vrijblijvend gesprek.
          </p>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-[#0F0F0D] py-20 text-center text-[#FAFAF8]">
        <div className="max-w-2xl mx-auto px-6">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Jouw woning hier?
          </h2>
          <p className="text-[#FAFAF8]/60 mb-8">
            Plan een shoot en laat kopers jouw woning écht beleven — voor ze de drempel overstappen.
          </p>
          <Link
            href={`https://wa.me/31650919960?text=Hallo%20John%2C%20ik%20ben%20geïnteresseerd%20in%20een%20vastgoedvideo.`}
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
