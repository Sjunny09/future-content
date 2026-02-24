"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  poster: string;
  title?: string;
  className?: string;
}

export default function VideoPlayer({ src, poster, title, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function handlePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  return (
    <div className={`relative aspect-video overflow-hidden bg-[#0F0F0D] ${className ?? ""}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="none"
        playsInline
        controls={playing}
        className="absolute inset-0 w-full h-full object-cover"
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        aria-label={title}
      />
      {!playing && (
        <button
          onClick={handlePlay}
          aria-label={`Speel video af${title ? `: ${title}` : ""}`}
          className="absolute inset-0 flex items-center justify-center group cursor-pointer"
        >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          <div className="relative w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <Play size={22} className="text-white ml-1" fill="white" />
          </div>
        </button>
      )}
    </div>
  );
}
