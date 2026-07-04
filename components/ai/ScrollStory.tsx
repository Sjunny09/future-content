"use client";

import { useEffect, useRef, useState } from "react";
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
 * Scroll-gestuurde video-vertelling.
 *
 * De video staat "sticky" op het scherm terwijl je door een lange sectie
 * scrollt. De scrollpositie stuurt rechtstreeks de currentTime van de video:
 * naar beneden scrollen = de video vooruit spoelen. Overheen faden korte
 * tekst-beats: intro (John in beeld) -> het idee -> de uitvoering.
 *
 * John levert zelf de video aan. Zolang die er nog niet is, draait er een
 * placeholder (/logo/Logo AI.mp4). Vervang `src` door zijn eigen bestand,
 * bij voorkeur web-geoptimaliseerd (H.264, faststart, kort) zodat het
 * spoelen soepel blijft.
 */
export default function ScrollStory({
  src = "/logo/Logo AI.mp4",
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
  const [duration, setDuration] = useState(0);
  const [reduced, setReduced] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Zachte veer zodat het spoelen niet schokt op elke scroll-tick.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    mass: 0.35,
  });

  // Scrollpositie -> video currentTime.
  useMotionValueEvent(smooth, "change", (p) => {
    const v = videoRef.current;
    if (!v || !duration || reduced) return;
    const t = Math.min(duration - 0.05, Math.max(0, p * duration));
    if (Math.abs(v.currentTime - t) > 0.015) {
      try {
        v.currentTime = t;
      } catch {
        /* seek nog niet mogelijk; volgende tick opnieuw */
      }
    }
  });

  // Respecteer "reduce motion": dan gewoon rustig laten loopen.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduced) {
      v.loop = true;
      v.play?.().catch(() => {});
    } else {
      v.loop = false;
      v.pause?.();
    }
  }, [reduced, duration]);

  // Dunne voortgangsbalk (goud) onderaan.
  const railScale = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <section
      ref={containerRef}
      style={{ height: `${heightVh}vh` }}
      className="relative bg-[#050506]"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden fc-grain">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Cinematische verduistering + vignet, warm i.p.v. neon. */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050506]/75 via-[#050506]/25 to-[#050506]/95" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 40%, transparent 40%, rgba(5,5,6,0.6) 100%)",
          }}
        />

        {/* De beats faden in/uit op scrollpositie. */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          {beats.map((beat, i) => (
            <BeatLayer key={i} progress={smooth} beat={beat} />
          ))}
        </div>

        {/* Scroll-hint, verdwijnt zodra je begint. */}
        <FadeOnScroll progress={smooth}>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#FAFAF8]/50">
              Scroll
            </span>
            <span className="fc-scroll-hint block h-8 w-px bg-gradient-to-b from-[#C9A96E] to-transparent" />
          </div>
        </FadeOnScroll>

        {/* Voortgangsbalk. */}
        <motion.div
          style={{ scaleX: railScale }}
          className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-[#C9A96E]"
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
  const y = useTransform(progress, [at - span, at, at + span], [34, 0, -34]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute max-w-2xl text-center"
    >
      {beat.kicker && (
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#C9A96E]">
          {beat.kicker}
        </p>
      )}
      <h2 className="fc-wordmark text-4xl font-black leading-[1.02] text-[#FAFAF8] sm:text-6xl md:text-7xl">
        {beat.title}
      </h2>
      {beat.body && (
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-[#FAFAF8]/70 md:text-lg">
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
