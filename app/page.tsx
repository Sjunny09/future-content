"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Camera, Film, MessageCircle } from "lucide-react";
import { REVIEWS, PHOTOS, SITE, TRUST_STATS, STACK_VIDEOS } from "@/lib/constants";
import VideoPlayer from "@/components/common/VideoPlayer";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function HomePage() {
  const waLink = `https://wa.me/${SITE.whatsapp}?text=Hallo%20John%2C%20ik%20wil%20graag%20meer%20informatie.`;

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0F0F0D]">
        {/* Background: foto + logo video blended */}
        <div className="absolute inset-0">
          <Image
            src={PHOTOS[0]}
            alt="Future Content videografie"
            fill
            priority
            className="object-cover object-center opacity-30"
            sizes="100vw"
          />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity"
          >
            <source src="/logo/logo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0D]/70 via-[#0F0F0D]/30 to-[#0F0F0D]/85" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20">
          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-3xl">
            <motion.span
              variants={fadeUp}
              className="inline-block text-[#C9A96E] text-sm font-semibold uppercase tracking-widest mb-6"
            >
              Bladel · De Kempen · Eindhoven · Tilburg
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-bold text-[#FAFAF8] leading-[1.05] mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Professionele video. Meer klanten. Minder werk.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-[#FAFAF8]/75 max-w-xl mb-10 leading-relaxed"
            >
              Future Content maakt vastgoedvideo&apos;s voor makelaars en social media content voor
              bedrijven in De Kempen en Eindhoven — snel, strak en klaar voor gebruik.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#1dbd5a] transition-colors"
              >
                <MessageCircle size={18} />
                App mij op WhatsApp
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-[#FAFAF8]/30 text-[#FAFAF8] font-semibold hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
              >
                Bekijk portfolio
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#FAFAF8]/40 animate-pulse" />
        </div>
      </section>

      {/* ─── TRUST BAR ────────────────────────────────────────────────── */}
      <section className="bg-[#1A1A18] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {TRUST_STATS.map((stat, i) => (
              <div key={i}>
                <p className="text-2xl font-bold text-[#C9A96E]">{stat.value}</p>
                <p className="text-xs text-[#FAFAF8]/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] text-[#FAFAF8]/25 mt-4">
            * Gemiddelde verkooptijd woningen met video — Pit Makelaars Veldhoven
          </p>
        </div>
      </section>

      {/* ─── TWO LANES ────────────────────────────────────────────────── */}
      <section className="bg-[#FAFAF8] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2
              className="text-3xl md:text-5xl font-bold text-[#1A1A18] mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Waarvoor kan ik je helpen?
            </h2>
            <p className="text-[#6B7280] text-lg max-w-xl mx-auto">
              Twee diensten, één doel: jij wordt gezien.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative overflow-hidden rounded-2xl bg-[#0F0F0D] min-h-[400px] flex flex-col justify-end p-8"
            >
              <Image
                src={PHOTOS[2]}
                alt="Vastgoedvideografie"
                fill
                className="object-cover object-center opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="relative z-10">
                <span className="inline-block text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-3">
                  Voor makelaars
                </span>
                <h3
                  className="text-2xl md:text-3xl font-bold text-[#FAFAF8] mb-3"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Meer bezichtigingen. Vanaf €199.
                </h3>
                <p className="text-[#FAFAF8]/70 text-sm mb-6 leading-relaxed">
                  Funda-ready walkthroughs, sociale teasers en drone shots. Opgeleverd binnen 1 week.
                </p>
                <Link
                  href="/makelaars"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#C9A96E] hover:gap-3 transition-all"
                >
                  Meer over vastgoedvideo&apos;s <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="group relative overflow-hidden rounded-2xl bg-[#0F0F0D] min-h-[400px] flex flex-col justify-end p-8"
            >
              <Image
                src={PHOTOS[1]}
                alt="Social media video content"
                fill
                className="object-cover object-center opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="relative z-10">
                <span className="inline-block text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-3">
                  Voor bedrijven
                </span>
                <h3
                  className="text-2xl md:text-3xl font-bold text-[#FAFAF8] mb-3"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Eén shoot dag. Maanden aan content.
                </h3>
                <p className="text-[#FAFAF8]/70 text-sm mb-6 leading-relaxed">
                  Maandelijks 3, 6 of 9 korte video&apos;s. Opgenomen, gesneden, klaar. Vanaf €199/maand.
                </p>
                <Link
                  href="/social-media"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#C9A96E] hover:gap-3 transition-all"
                >
                  Meer over social media video&apos;s <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── HOE HET WERKT ───────────────────────────────────────────── */}
      <section className="bg-[#F5F1EB] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2
              className="text-3xl md:text-5xl font-bold text-[#1A1A18] mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Van afspraak tot afgeleverd.
            </h2>
            <p className="text-[#6B7280] text-lg">In drie stappen naar video content die werkt.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: <MessageCircle size={24} />,
                title: "App of bel",
                desc: "Stuur een WhatsApp of bel. We bespreken jouw wensen, doelgroep en planning — geen lange intake.",
              },
              {
                step: "02",
                icon: <Camera size={24} />,
                title: "Shoot dag",
                desc: "Ik kom naar jou toe, volledig voorbereid. Scripts, setup, locatie — alles is klaar. Jij hoeft niks te doen.",
              },
              {
                step: "03",
                icon: <Film size={24} />,
                title: "Oplevering",
                desc: "Vastgoedvideo's binnen 1 week. Social media content binnen 5 werkdagen na de shoot.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#FAFAF8] rounded-2xl p-8 border border-[#E5E0D8]"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-4xl font-bold text-[#E5E0D8] leading-none">{item.step}</span>
                  <div className="text-[#C9A96E]">{item.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-[#1A1A18] mb-3">{item.title}</h3>
                <p className="text-[#6B7280] leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO PREVIEW ────────────────────────────────────────── */}
      <section className="bg-[#FAFAF8] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#1A1A18]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Recent werk
              </h2>
              <p className="text-[#6B7280] mt-2">Vastgoedvideo&apos;s voor Pit Makelaars — klik om te bekijken.</p>
            </div>
            <Link
              href="/portfolio"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#1A1A18] hover:text-[#C9A96E] transition-colors"
            >
              Alle video&apos;s <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STACK_VIDEOS.slice(0, 3).map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-xl overflow-hidden bg-[#0F0F0D]"
              >
                <VideoPlayer src={video.src} poster={video.poster} title={video.title} />
                <div className="px-4 py-3">
                  <p className="text-[#FAFAF8] text-xs font-medium">{video.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─────────────────────────────────────────────────── */}
      {REVIEWS.length > 0 && (
        <section className="bg-[#F5F1EB] py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2
                className="text-3xl md:text-4xl font-bold text-[#1A1A18] mb-3"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Wat klanten zeggen
              </h2>
              <p className="text-[#6B7280] text-sm">Beoordelingen via Google · 5,0 gemiddeld</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {REVIEWS.map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-[#FAFAF8] rounded-2xl p-6 border border-[#E5E0D8] flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5">
                      {[...Array(review.rating)].map((_, j) => (
                        <Star key={j} size={13} fill="#C9A96E" className="text-[#C9A96E]" />
                      ))}
                    </div>
                    <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">
                      Google
                    </span>
                  </div>
                  <p className="text-[#1A1A18] text-sm leading-relaxed italic flex-1">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-2.5 mt-auto pt-2 border-t border-[#E5E0D8]">
                    <div className="w-8 h-8 rounded-full bg-[#C9A96E]/20 flex items-center justify-center text-xs font-bold text-[#C9A96E] shrink-0">
                      {review.initials}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#1A1A18]">{review.name}</p>
                      <p className="text-[10px] text-[#6B7280]">{review.company}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="bg-[#1A1A18] py-20 md:py-28 text-[#FAFAF8] text-center">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Klaar om zichtbaar te worden?
            </h2>
            <p className="text-[#FAFAF8]/60 text-lg mb-10 leading-relaxed">
              Stuur een WhatsApp-bericht — we reageren dezelfde dag en plannen een kort kennismakingsgesprek.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#25D366] text-white font-semibold text-lg hover:bg-[#1dbd5a] transition-colors"
              >
                <MessageCircle size={20} />
                App mij op WhatsApp
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#FAFAF8]/20 text-[#FAFAF8] font-semibold text-lg hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
              >
                Of gebruik het contactformulier
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
