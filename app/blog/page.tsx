"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { BLOG_POSTS, formatDate } from "@/lib/blog";

const CATEGORIES = ["Alle", "Vastgoed", "Social Media", "AI & Content", "Inzichten"];

export default function BlogPage() {
  return (
    <>
      {/* ─── HEADER ───────────────────────────────────────────────────── */}
      <section className="bg-[#F3ECE0] pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[#B45F38] text-xs font-semibold uppercase tracking-widest mb-4">
              Blog
            </span>
            <h1
              className="text-4xl md:text-6xl font-bold text-[#2A2218] mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Inzichten over video, content & AI.
            </h1>
            <p className="text-[#6E6151] text-lg max-w-2xl">
              Praktische artikelen over hoe lokale bedrijven en makelaars meer klanten aantrekken
              met video, en hoe AI dat in de toekomst verder versterkt.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── CATEGORY CHIPS ───────────────────────────────────────────── */}
      <section className="bg-[#F3ECE0] pb-4 border-b border-[#E4D8C6]">
        <div className="max-w-6xl mx-auto px-6 flex gap-2 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => (
            <span
              key={cat}
              className="shrink-0 px-4 py-1.5 rounded-full text-xs font-medium bg-[#ECE2D2] text-[#6E6151] border border-[#E4D8C6]"
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* ─── BLOG GRID ────────────────────────────────────────────────── */}
      <section className="bg-[#F3ECE0] py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date)).map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block h-full bg-[#F3ECE0] rounded-2xl border border-[#E4D8C6] overflow-hidden hover:border-[#B45F38] hover:shadow-md transition-all"
                >
                  {/* Featured image */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#B45F38] text-[#F3ECE0] text-[10px] font-semibold uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs text-[#6E6151]">{formatDate(post.date)}</span>
                      <div className="flex items-center gap-1 text-xs text-[#6E6151]">
                        <Clock size={11} />
                        {post.readTime}
                      </div>
                    </div>
                    <h2
                      className="text-base font-bold text-[#2A2218] mb-2 leading-snug group-hover:text-[#B45F38] transition-colors"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {post.title}
                    </h2>
                    <p className="text-sm text-[#6E6151] leading-relaxed mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#B45F38] group-hover:gap-2 transition-all">
                      Lees meer <ArrowRight size={12} />
                    </span>
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
