"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { BLOG_POSTS, formatDate } from "@/lib/blog";

const CATEGORIES = ["Alle", "Vastgoed", "Social Media", "AI & Content", "Inzichten"];

export default function BlogPage() {
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
              Blog
            </span>
            <h1
              className="text-4xl md:text-6xl font-bold text-[#1A1A18] mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Inzichten over video, content & AI.
            </h1>
            <p className="text-[#6B7280] text-lg max-w-2xl">
              Praktische artikelen over hoe lokale bedrijven en makelaars meer klanten aantrekken
              met video — en hoe AI dat in de toekomst verder versterkt.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── CATEGORY CHIPS ───────────────────────────────────────────── */}
      <section className="bg-[#FAFAF8] pb-4 border-b border-[#E5E0D8]">
        <div className="max-w-6xl mx-auto px-6 flex gap-2 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => (
            <span
              key={cat}
              className="shrink-0 px-4 py-1.5 rounded-full text-xs font-medium bg-[#F5F1EB] text-[#6B7280] border border-[#E5E0D8]"
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* ─── BLOG GRID ────────────────────────────────────────────────── */}
      <section className="bg-[#FAFAF8] py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block h-full bg-[#FAFAF8] rounded-2xl border border-[#E5E0D8] overflow-hidden hover:border-[#C9A96E] transition-colors"
                >
                  {/* Category + date bar */}
                  <div className="px-6 pt-6 pb-4 border-b border-[#E5E0D8] flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#F0E6D0] text-[#C9A96E] text-[10px] font-semibold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-xs text-[#6B7280]">{formatDate(post.date)}</span>
                  </div>

                  <div className="p-6">
                    <h2
                      className="text-lg font-bold text-[#1A1A18] mb-3 leading-snug group-hover:text-[#C9A96E] transition-colors"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {post.title}
                    </h2>
                    <p className="text-sm text-[#6B7280] leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                        <Clock size={12} />
                        {post.readTime} lezen
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#C9A96E] group-hover:gap-2 transition-all">
                        Lees meer <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
