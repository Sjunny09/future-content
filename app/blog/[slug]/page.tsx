"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import { BLOG_POSTS, getBlogPost, formatDate } from "@/lib/blog";
import Infographic from "@/components/common/Infographic";
import { use } from "react";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = getBlogPost(slug);

  if (!post) notFound();

  // Related posts (same category, excluding current)
  const related = BLOG_POSTS.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 2);

  return (
    <>
      {/* ─── HEADER ───────────────────────────────────────────────────── */}
      <section className="bg-[#F3ECE0] pt-32 pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#6E6151] hover:text-[#B45F38] transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Terug naar blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-full bg-[#ECE2D2] text-[#B45F38] text-xs font-semibold">
                {post.category}
              </span>
              <span className="text-xs text-[#6E6151]">{formatDate(post.date)}</span>
              <span className="flex items-center gap-1 text-xs text-[#6E6151]">
                <Clock size={11} /> {post.readTime} lezen
              </span>
            </div>

            <h1
              className="text-3xl md:text-5xl font-bold text-[#2A2218] mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {post.title}
            </h1>
            <p className="text-lg text-[#6E6151] leading-relaxed border-l-4 border-[#B45F38] pl-5">
              {post.excerpt}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURED IMAGE ───────────────────────────────────────────── */}
      <section className="bg-[#F3ECE0] pb-8">
        <div className="max-w-3xl mx-auto px-6">
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-md">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ─── CONTENT ──────────────────────────────────────────────────── */}
      <section className="bg-[#F3ECE0] pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-lg max-w-none space-y-6">
            {post.content.map((section, i) => {
              if (section.type === "intro") {
                return (
                  <p key={i} className="text-lg text-[#2A2218] leading-relaxed font-medium">
                    {section.text}
                  </p>
                );
              }
              if (section.type === "h2") {
                return (
                  <h2
                    key={i}
                    className="text-2xl md:text-3xl font-bold text-[#2A2218] mt-10 mb-4"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {section.text}
                  </h2>
                );
              }
              if (section.type === "p") {
                return (
                  <p key={i} className="text-[#6E6151] leading-relaxed">
                    {section.text}
                  </p>
                );
              }
              if (section.type === "ul") {
                return (
                  <ul key={i} className="space-y-2 pl-0">
                    {section.items?.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-[#6E6151]">
                        <span className="text-[#B45F38] mt-1 shrink-0">▸</span>
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
                    className="border-l-4 border-[#B45F38] pl-6 py-2 my-8"
                  >
                    <p
                      className="text-xl font-medium text-[#2A2218] italic leading-snug"
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
                    className="bg-[#ECE2D2] border border-[#E4D8C6] rounded-2xl p-6 mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between"
                  >
                    <p className="font-semibold text-[#2A2218] text-sm">{section.text}</p>
                    <Link
                      href="/boek"
                      className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#B45F38] text-[#2A2218] text-sm font-semibold hover:bg-[#9E3D24] transition-colors"
                    >
                      Plan een gesprek
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                );
              }
              if (section.type === "infographic") {
                return <Infographic key={i} name={section.infographic} />;
              }
              return null;
            })}
          </div>
        </div>
      </section>

      {/* ─── RELATED POSTS ────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-[#ECE2D2] py-16 border-t border-[#E4D8C6]">
          <div className="max-w-3xl mx-auto px-6">
            <h3
              className="text-2xl font-bold text-[#2A2218] mb-8"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Meer lezen
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group bg-[#F3ECE0] rounded-xl border border-[#E4D8C6] p-5 hover:border-[#B45F38] transition-colors"
                >
                  <span className="text-xs text-[#B45F38] font-semibold uppercase tracking-wider">
                    {p.category}
                  </span>
                  <h4
                    className="font-bold text-[#2A2218] mt-2 mb-2 leading-snug group-hover:text-[#B45F38] transition-colors"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {p.title}
                  </h4>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#B45F38]">
                    Lees meer <ArrowRight size={11} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="bg-[#221C14] py-16 text-[#F3ECE0] text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Benieuwd wat dit voor jouw bedrijf betekent?
          </h2>
          <p className="text-[#F3ECE0]/60 mb-6 text-sm">
            Plan een gesprek van 30 minuten. We kijken samen waar AI jou tijd of geld bespaart.
          </p>
          <Link
            href="/boek"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#B45F38] text-[#2A2218] font-semibold hover:bg-[#9E3D24] transition-colors"
          >
            Plan een gesprek
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
