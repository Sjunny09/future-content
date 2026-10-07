"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { formatDate, type BlogPost } from "@/lib/blog";


// Bezoekers zien eerst alleen de drie nieuwste, de rest staat onder "Oudere
// blogs" met een categoriefilter (John, 7 oktober 2026: "alles tegelijk
// overweldigt"). De lijst komt gefilterd binnen: alleen gepubliceerde posts.
const AANTAL_NIEUWSTE = 3;

export default function BlogOverzicht({ posts }: { posts: BlogPost[] }) {
  const [tab, setTab] = useState<"nieuwste" | "ouder">("nieuwste");
  const [categorie, setCategorie] = useState("Alle");
  const nieuwste = posts.slice(0, AANTAL_NIEUWSTE);
  const ouder = posts.slice(AANTAL_NIEUWSTE);
  const CATEGORIES = ["Alle", ...Array.from(new Set(ouder.map((p) => p.category)))];
  const zichtbaar =
    tab === "nieuwste" ? nieuwste : ouder.filter((p) => categorie === "Alle" || p.category === categorie);
  const tabCls = (actief: boolean) =>
    `shrink-0 px-5 py-2 rounded-full text-sm font-semibold border transition-colors ${
      actief
        ? "bg-[#2A2218] text-[#F3ECE0] border-[#2A2218]"
        : "bg-transparent text-[#2A2218] border-[#E4D8C6] hover:border-[#B45F38]"
    }`;

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
              Inzichten over AI voor het MKB.
            </h1>
            <p className="text-[#6E6151] text-lg max-w-2xl">
              Praktische artikelen over hoe MKB-bedrijven AI en automatisering inzetten in hun
              dagelijkse werk. Nuchter, doorgerekend, zonder hype.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── TABS + CATEGORIEFILTER ──────────────────────────────────── */}
      <section className="bg-[#F3ECE0] pb-4 border-b border-[#E4D8C6]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-2" role="tablist" aria-label="Blogs">
            <button type="button" role="tab" aria-selected={tab === "nieuwste"} className={tabCls(tab === "nieuwste")} onClick={() => setTab("nieuwste")}>
              Nieuwste
            </button>
            <button type="button" role="tab" aria-selected={tab === "ouder"} className={tabCls(tab === "ouder")} onClick={() => setTab("ouder")}>
              Oudere blogs ({ouder.length})
            </button>
          </div>
          {tab === "ouder" && (
            <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategorie(cat)}
                  aria-pressed={categorie === cat}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    categorie === cat
                      ? "bg-[#B45F38] text-[#F3ECE0] border-[#B45F38]"
                      : "bg-[#ECE2D2] text-[#6E6151] border-[#E4D8C6] hover:border-[#B45F38]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── BLOG GRID ────────────────────────────────────────────────── */}
      <section className="bg-[#F3ECE0] py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {zichtbaar.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i, 8) * 0.05 }}
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
          {zichtbaar.length === 0 && (
            <p className="text-sm text-[#6E6151]">Geen blogs in deze categorie.</p>
          )}
          {tab === "nieuwste" && ouder.length > 0 && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setTab("ouder")}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#B45F38] hover:gap-3 transition-all"
              >
                Bekijk oudere blogs <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
