"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { BLOG_POSTS, getBlogPost, formatDate } from "@/lib/blog";
import { SITE } from "@/lib/constants";
import { use } from "react";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = getBlogPost(slug);

  if (!post) notFound();

  const waLink = `https://wa.me/${SITE.whatsapp}?text=Hallo%20John%2C%20ik%20las%20je%20blog%20over%20${encodeURIComponent(post.title)}%20en%20wil%20meer%20informatie.`;

  // Related posts (same category, excluding current)
  const related = BLOG_POSTS.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 2);

  return (
    <>
      {/* ─── HEADER ───────────────────────────────────────────────────── */}
      <section className="bg-[#FAFAF8] pt-32 pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#C9A96E] transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Terug naar blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-full bg-[#F0E6D0] text-[#C9A96E] text-xs font-semibold">
                {post.category}
              </span>
              <span className="text-xs text-[#6B7280]">{formatDate(post.date)}</span>
              <span className="flex items-center gap-1 text-xs text-[#6B7280]">
                <Clock size={11} /> {post.readTime} lezen
              </span>
            </div>

            <h1
              className="text-3xl md:text-5xl font-bold text-[#1A1A18] mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {post.title}
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed border-l-4 border-[#C9A96E] pl-5">
              {post.excerpt}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── CONTENT ──────────────────────────────────────────────────── */}
      <section className="bg-[#FAFAF8] pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-lg max-w-none space-y-6">
            {post.content.map((section, i) => {
              if (section.type === "intro") {
                return (
                  <p key={i} className="text-lg text-[#1A1A18] leading-relaxed font-medium">
                    {section.text}
                  </p>
                );
              }
              if (section.type === "h2") {
                return (
                  <h2
                    key={i}
                    className="text-2xl md:text-3xl font-bold text-[#1A1A18] mt-10 mb-4"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {section.text}
                  </h2>
                );
              }
              if (section.type === "p") {
                return (
                  <p key={i} className="text-[#6B7280] leading-relaxed">
                    {section.text}
                  </p>
                );
              }
              if (section.type === "ul") {
                return (
                  <ul key={i} className="space-y-2 pl-0">
                    {section.items?.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-[#6B7280]">
                        <span className="text-[#C9A96E] mt-1 shrink-0">▸</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (section.type === "quote") {
                return (
                  <blockquote
                    key={i}
                    className="border-l-4 border-[#C9A96E] pl-6 py-2 my-8"
                  >
                    <p
                      className="text-xl font-medium text-[#1A1A18] italic leading-snug"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      &ldquo;{section.text}&rdquo;
                    </p>
                  </blockquote>
                );
              }
              if (section.type === "cta") {
                return (
                  <div
                    key={i}
                    className="bg-[#F5F1EB] border border-[#E5E0D8] rounded-2xl p-6 mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between"
                  >
                    <p className="font-semibold text-[#1A1A18] text-sm">{section.text}</p>
                    <Link
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1dbd5a] transition-colors"
                    >
                      <MessageCircle size={14} />
                      App mij op WhatsApp
                    </Link>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </section>

      {/* ─── RELATED POSTS ────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-[#F5F1EB] py-16 border-t border-[#E5E0D8]">
          <div className="max-w-3xl mx-auto px-6">
            <h3
              className="text-2xl font-bold text-[#1A1A18] mb-8"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Meer lezen
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group bg-[#FAFAF8] rounded-xl border border-[#E5E0D8] p-5 hover:border-[#C9A96E] transition-colors"
                >
                  <span className="text-xs text-[#C9A96E] font-semibold uppercase tracking-wider">
                    {p.category}
                  </span>
                  <h4
                    className="font-bold text-[#1A1A18] mt-2 mb-2 leading-snug group-hover:text-[#C9A96E] transition-colors"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {p.title}
                  </h4>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#C9A96E]">
                    Lees meer <ArrowRight size={11} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="bg-[#0F0F0D] py-16 text-[#FAFAF8] text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Klaar om aan de slag te gaan?
          </h2>
          <p className="text-[#FAFAF8]/60 mb-6 text-sm">
            Stuur een WhatsApp en we kijken samen wat video voor jouw bedrijf of woning kan doen.
          </p>
          <Link
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#1dbd5a] transition-colors"
          >
            <MessageCircle size={16} />
            App mij op WhatsApp
          </Link>
        </div>
      </section>
    </>
  );
}
