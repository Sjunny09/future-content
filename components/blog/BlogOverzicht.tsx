"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { type BlogPost } from "@/lib/blog";
import BlogKaart from "./BlogKaart";


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
                <BlogKaart post={post} />
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
