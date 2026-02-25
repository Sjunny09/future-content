"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";

type VideoItem = {
  id: string;
  title: string;
  location: string;
  src: string;
  poster: string;
  description: string;
};

export default function VideoCarousel({ videos }: { videos: VideoItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Find which card is closest to the horizontal center of the scroll container.
  // We compare the viewport's pixel center against each card's midpoint
  // (offsetLeft + halfWidth). Smallest distance wins → becomes active/playing.
  const findCenter = useCallback(() => {
    const el = containerRef.current;
    if (!el) return 0;
    const center = el.scrollLeft + el.clientWidth / 2;
    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    let best = 0;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
      if (dist < minDist) {
        minDist = dist;
        best = i;
      }
    });
    return best;
  }, []);

  // Play the active video, pause and reset all others
  const updatePlayback = useCallback((newIndex: number) => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === newIndex) {
        vid.play().catch(() => {});
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    });
  }, []);

  // Debounced scroll handler — fires only after scrolling stops for 80 ms.
  // Without debouncing, findCenter would run on every scroll event (dozens/sec)
  // and trigger video play/pause mid-swipe, causing audio glitches.
  const onScroll = useCallback(() => {
    clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      const idx = findCenter();
      if (idx !== activeIndex) {
        setActiveIndex(idx);
        updatePlayback(idx);
      }
    }, 80);
  }, [activeIndex, findCenter, updatePlayback]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimer.current);
    };
  }, [onScroll]);

  // Autoplay first video after mount
  useEffect(() => {
    const t = setTimeout(() => updatePlayback(0), 400);
    return () => clearTimeout(t);
  }, [updatePlayback]);

  // Smooth-scroll a card to the center of the viewport
  const scrollToCard = (index: number) => {
    const el = containerRef.current;
    const cards = el?.querySelectorAll<HTMLElement>("[data-card]");
    if (!el || !cards) return;
    const card = cards[index];
    if (!card) return;
    el.scrollTo({
      left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2,
      behavior: "smooth",
    });
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    videoRefs.current.forEach((v) => {
      if (v) v.muted = next;
    });
  };

  return (
    <div className="relative select-none">
      {/* ── Mute toggle ── */}
      <button
        onClick={toggleMute}
        aria-label={muted ? "Geluid aan" : "Geluid uit"}
        className="absolute top-6 right-6 z-20 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
      >
        {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
      </button>

      {/* ── Carousel track ── */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto py-10 scrollbar-none"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Leading spacer so first card can be centered */}
        <div
          aria-hidden
          className="flex-shrink-0 w-[calc(50vw-160px)] md:w-[calc(50vw-280px)]"
        />

        {videos.map((video, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={video.id}
              data-card
              style={{ scrollSnapAlign: "center" }}
              onClick={() => {
                if (!isActive) scrollToCard(i);
              }}
              className={[
                "relative flex-shrink-0 mx-2 md:mx-3",
                "w-[82vw] md:w-[600px]",
                "rounded-2xl overflow-hidden",
                "transition-all duration-500 ease-out",
                isActive
                  ? "scale-100 opacity-100 shadow-[0_20px_60px_rgba(0,0,0,0.35)] cursor-default"
                  : "scale-[0.86] opacity-55 cursor-pointer hover:opacity-70",
              ].join(" ")}
            >
              {/* Video */}
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                src={video.src}
                poster={video.poster}
                preload="none"
                playsInline
                muted={muted}
                loop
                className="w-full aspect-video object-cover bg-[#0F0F0D]"
              />

              {/* Play overlay shown on non-active cards */}
              {!isActive && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                    <Play size={20} fill="white" className="text-white ml-0.5" />
                  </div>
                </div>
              )}

              {/* Caption */}
              <div className="bg-[#0F0F0D] px-5 py-4">
                <p className="font-semibold text-[#FAFAF8] text-sm leading-snug">
                  {video.title}
                </p>
                <p className="text-[#FAFAF8]/40 text-xs mt-0.5">
                  {video.description}
                </p>
              </div>
            </div>
          );
        })}

        {/* Trailing spacer */}
        <div
          aria-hidden
          className="flex-shrink-0 w-[calc(50vw-160px)] md:w-[calc(50vw-280px)]"
        />
      </div>

      {/* ── Dot indicators ── */}
      <div className="flex justify-center gap-2 mt-1 pb-2">
        {videos.map((_, i) => (
          <button
            key={i}
            aria-label={`Video ${i + 1}`}
            onClick={() => scrollToCard(i)}
            className={[
              "rounded-full transition-all duration-300",
              i === activeIndex
                ? "w-5 h-2 bg-[#C9A96E]"
                : "w-2 h-2 bg-[#6B7280]/40 hover:bg-[#C9A96E]/50",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
