"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";

export interface Beat {
  /** Scrollpositie 0..1 waar deze beat z'n hoogtepunt heeft. */
  at: number;
  kicker?: string;
  title: React.ReactNode;
  body?: string;
}

/**
 * Scroll-gestuurde video-vertelling (AI-skin).
 *
 * De video staat "sticky" op het scherm terwijl je door een lange sectie
 * scrollt; de scrollpositie stuurt de currentTime van de video. Naar beneden
 * scrollen = vooruit spoelen. Er faden korte tekst-beats onderin overheen.
 *
 * De video is portret met een lichte achtergrond. Op desktop vult een onscherpe
 * kopie de zijkanten (geen zwarte balken, geen crop), met de scherpe video
 * gecentreerd. Een donkere scrim boven (voor de header/logo) en onder (voor de
 * tekst) houdt alles leesbaar terwijl John's beeld helder blijft. Beide
 * video-lagen worden op dezelfde scrollpositie gespoeld.
 */
export default function ScrollStory({
  src = "/videos/ai-hero.mp4",
  poster,
  beats,
  heightVh = 340,
}: {
  src?: string;
  poster?: string;
  beats: Beat[];
  heightVh?: number;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [reduced, setReduced] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    mass: 0.35,
  });

  // Scrollpositie -> currentTime van beide video-lagen (scherp + onscherp).
  useMotionValueEvent(smooth, "change", (p) => {
    if (!duration || reduced) return;
    const t = Math.min(duration - 0.05, Math.max(0, p * duration));
    for (const v of [videoRef.current, bgRef.current]) {
      if (v && Math.abs(v.currentTime - t) > 0.015) {
        try {
          v.currentTime = t;
        } catch {
          /* seek nog niet mogelijk; volgende tick opnieuw */
        }
      }
    }
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  // Reduce-motion: rustig laten loopen i.p.v. scrollen.
  useEffect(() => {
    for (const v of [videoRef.current, bgRef.current]) {
      if (!v) continue;
      if (reduced) {
        v.loop = true;
        v.play?.().catch(() => {});
      } else {
        v.loop = false;
        v.pause?.();
      }
    }
  }, [reduced, duration]);

  const railScale = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <section
      ref={containerRef}
      style={{ height: `${heightVh}vh` }}
      className="relative bg-[#2A2218]"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Onscherpe vulling: portret-video zonder zwarte balken of crop. */}
        <video
          ref={bgRef}
          src={src}
          muted
          playsInline
          preload="auto"
          aria-hidden
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-45 blur-2xl"
        />
        {/* Scherpe video: op mobiel vullend, op desktop gecentreerd portret. */}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
          className="absolute inset-0 h-full w-full object-cover md:mx-auto md:w-auto md:max-w-full md:object-contain"
        />

        {/* Scrim boven: houdt de header + logo leesbaar op het lichte beeld. */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#221C14]/90 via-[#221C14]/40 to-transparent" />
        {/* Scrim onder: waar de tekst-beats + controls landen. */}
        <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-[#221C14] via-[#221C14]/78 to-transparent" />

        {/* Beats onderin (lower-third), zodat John's gezicht + ideeën vrij blijven. */}
        <div className="absolute inset-x-0 bottom-[13%] flex justify-center px-6">
          {beats.map((beat, i) => (
            <BeatLayer key={i} progress={smooth} beat={beat} />
          ))}
        </div>

        {/* John's logo als rustig watermerk. */}
        <Image
          src="/logo/logo.png"
          alt="Future Content"
          width={130}
          height={38}
          className="pointer-events-none absolute bottom-7 right-6 z-10 h-5 w-auto opacity-55 brightness-0 invert drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] md:h-6"
        />

        <FadeOnScroll progress={smooth}>
          <div className="absolute bottom-7 left-6 flex flex-col items-start gap-2">
            <span className="fc-mono text-[9px] uppercase tracking-[0.35em] text-[#F3ECE0]/55">
              Scroll
            </span>
            <span className="fc-scroll-hint block h-8 w-px bg-gradient-to-b from-[#B45F38] to-transparent" />
          </div>
        </FadeOnScroll>

        <motion.div
          style={{ scaleX: railScale }}
          className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-[#B45F38]"
        />
      </div>
    </section>
  );
}

function BeatLayer({
  progress,
  beat,
}: {
  progress: MotionValue<number>;
  beat: Beat;
}) {
  const span = 0.17;
  const { at } = beat;
  const opacity = useTransform(
    progress,
    [at - span, at - span * 0.45, at + span * 0.45, at + span],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [at - span, at, at + span], [26, 0, -26]);

  return (
    <motion.div style={{ opacity, y }} className="absolute max-w-xl text-center">
      {beat.kicker && (
        <p className="fc-mono mb-3 text-[11px] uppercase tracking-[0.4em] text-[#B45F38]">
          {beat.kicker}
        </p>
      )}
      <h2 className="fc-wordmark text-3xl font-black leading-[1.04] text-[#F3ECE0] drop-shadow-[0_2px_10px_rgba(34,28,20,0.6)] sm:text-4xl md:text-5xl">
        {beat.title}
      </h2>
      {beat.body && (
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#F3ECE0]/80 md:text-base">
          {beat.body}
        </p>
      )}
    </motion.div>
  );
}

function FadeOnScroll({
  progress,
  children,
}: {
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const opacity = useTransform(progress, [0, 0.08], [1, 0]);
  return <motion.div style={{ opacity }}>{children}</motion.div>;
}
