"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog";

const LATEST = BLOG_POSTS[BLOG_POSTS.length - 1];

export default function NewPostNotification() {
  const [phase, setPhase] = useState<"hidden" | "icon" | "open">("hidden");

  useEffect(() => {
    if (sessionStorage.getItem("new-post-dismissed") === LATEST.slug) return;
    const t1 = setTimeout(() => setPhase("icon"), 1800);
    const t2 = setTimeout(() => setPhase("open"), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("new-post-dismissed", LATEST.slug);
    setPhase("hidden");
  };

  return (
    <AnimatePresence>
      {phase !== "hidden" && (
        <motion.div
          key="notification"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="fixed bottom-24 right-4 z-40"
        >
          <AnimatePresence mode="wait">
            {phase === "icon" && (
              /* ── Collapsed: pulsing lens icon ── */
              <motion.button
                key="icon"
                onClick={() => setPhase("open")}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", damping: 18 }}
                className="relative w-14 h-14 rounded-full bg-[#221C14] border-2 border-[#B45F38] flex items-center justify-center shadow-xl cursor-pointer"
                aria-label="Nieuw artikel"
              >
                {/* Camera lens rings */}
                <div className="absolute inset-[3px] rounded-full border border-[#B45F38]/30" />
                <div className="absolute inset-[7px] rounded-full border border-[#B45F38]/20" />
                {/* Lens center */}
                <div className="w-5 h-5 rounded-full bg-[#B45F38]/90 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#221C14]" />
                </div>
                {/* NEW badge */}
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-[#B45F38] text-[#F3ECE0] text-[9px] font-bold uppercase leading-none">
                  NIEUW
                </span>
                {/* Pulse ring */}
                <motion.div
                  animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border border-[#B45F38]"
                />
              </motion.button>
            )}

            {phase === "open" && (
              /* ── Expanded: camera viewfinder card ── */
              <motion.div
                key="card"
                initial={{ opacity: 0, scale: 0.85, originX: 1, originY: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ type: "spring", damping: 22, stiffness: 200 }}
                className="relative w-72 bg-[#221C14] rounded-xl shadow-2xl overflow-hidden"
              >
                {/* Viewfinder corner markers */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#B45F38] rounded-tl pointer-events-none" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#B45F38] rounded-tr pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#B45F38] rounded-bl pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#B45F38] rounded-br pointer-events-none" />

                {/* REC indicator */}
                <div className="flex items-center gap-1.5 px-4 pt-4 pb-2">
                  <motion.div
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                    className="w-2 h-2 rounded-full bg-red-500"
                  />
                  <span className="text-[10px] font-bold text-[#F3ECE0]/40 tracking-widest uppercase">Nieuw artikel</span>
                  <button
                    onClick={dismiss}
                    className="ml-auto text-[#F3ECE0]/30 hover:text-[#F3ECE0]/60 transition-colors"
                    aria-label="Sluiten"
                  >
                    <X size={13} />
                  </button>
                </div>

                <div className="px-4 pb-4">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-[#B45F38]/20 text-[#B45F38] text-[10px] font-semibold uppercase tracking-wider mb-2">
                    {LATEST.category}
                  </span>
                  <p
                    className="text-sm font-semibold text-[#F3ECE0] leading-snug mb-3"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {LATEST.title}
                  </p>
                  <Link
                    href={`/blog/${LATEST.slug}`}
                    onClick={dismiss}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#B45F38] text-[#F3ECE0] text-xs font-semibold hover:bg-[#9E3D24] transition-colors"
                  >
                    Lees nu <ArrowRight size={11} />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
