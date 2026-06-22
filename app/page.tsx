"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Star, Check, Film } from "lucide-react";
import {
  REVIEWS,
  PHOTOS,
  VMS,
  METHOD_STEPS,
  PROOF_POINTS,
  TRAINING,
  AI_TRUST,
  BELOFTES,
  CORE_MODULES,
  PLATFORM_INFO,
  BRANCHES,
} from "@/lib/constants";
import NewPostNotification from "@/components/layout/NewPostNotification";
import { PlatformDiagram } from "@/components/sections/PlatformDiagram";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0F0F0D] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-12 md:gap-16 items-center">
            <motion.div variants={stagger} initial="hidden" animate="show">
              <motion.span
                variants={fadeUp}
                className="inline-block text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em] mb-7"
              >
                AI-bouwer uit de Kempen
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="text-[#FAFAF8] font-bold leading-[1.04] mb-7 text-[2.6rem] md:text-[4.1rem] tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Eerst zien welk werk repeterend is. Dan pas bouwen.
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-[#FAFAF8]/70 text-lg md:text-xl max-w-xl mb-9 leading-relaxed"
              >
                Ik kom binnen, breng je proces in kaart, en bouw daar AI op die jouw bedrijf snapt.
                Werk vanuit Bladel, kom bij je langs in de Kempen, Eindhoven, Tilburg en Breda. Niet
                generiek. Niet erbij gerommeld. Geregeld, ook als ik morgen stop.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3.5">
                <Link
                  href="/boek"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#C9A96E] text-[#1A1A18] font-semibold hover:bg-[#d8bd87] transition-colors"
                >
                  Plan een gesprek <ArrowRight size={17} />
                </Link>
                <Link
                  href="/scan"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-[#FAFAF8]/25 text-[#FAFAF8] font-semibold hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
                >
                  Doe de AI-Quickscan
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden hidden md:block"
            >
              <Image
                src={PHOTOS[10]}
                alt="John Lavrijsen, Future Content"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 768px) 0vw, 40vw"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
            </motion.div>
          </div>

          {/* Trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 md:mt-20 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4"
          >
            {AI_TRUST.map((t) => (
              <div key={t} className="flex items-start gap-2.5">
                <Check size={15} className="text-[#C9A96E] mt-1 shrink-0" />
                <span className="text-[#FAFAF8]/65 text-sm leading-snug">{t}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── WAT IK NU ZIE (vervangt 6 icoonkaartjes) ────────────────── */}
      <section className="bg-[#FAFAF8] py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-10"
          >
            <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
              Wat ik nu zie
            </span>
            <h2
              className="text-3xl md:text-[2.8rem] font-bold text-[#1A1A18] mt-4 leading-[1.1] tracking-[-0.01em]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Iedereen heeft wel iets met AI. Bijna niemand heeft het geregeld.
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="prose-lg space-y-5 text-[#1A1A18] leading-relaxed"
          >
            <p>
              Een ondernemer pakt ChatGPT erbij voor een tekst. De accountmanager gebruikt Copilot
              in z'n mail. De stagiair heeft een keer geprobeerd een chatbot op de site te zetten.
              Dat is niet fout. Het is alleen geen systeem.
            </p>
            <p>
              Er gebeurt dan twee dingen tegelijk: jullie bedrijfsinformatie zit verspreid over
              vijf tools waar niemand overzicht over heeft, en de output blijft generiek omdat AI
              nog niet weet wie je bent.
            </p>
            <p>
              Wat ik doe is daar structuur in brengen. Eerst zien welk werk je elke week opnieuw
              doet. Dan kiezen wat AI overneemt. Pas dan een tool kiezen, en bewust, niet erbij
              gerommeld.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── VISIE QUOTE + 2 KOLOMMEN ──────────────────────────────── */}
      <section className="bg-[#F5F1EB] py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-2xl md:text-[2.1rem] text-[#1A1A18] leading-[1.35] font-medium"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            &ldquo;{VMS.visie}&rdquo;
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 mt-12 pt-10 border-t border-[#E5E0D8]"
          >
            <div>
              <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
                Hoe ik werk
              </span>
              <p className="text-[#1A1A18] mt-3 leading-relaxed">{VMS.missie}</p>
            </div>
            <div>
              <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
                Mijn aanpak
              </span>
              <p className="text-[#1A1A18] mt-3 leading-relaxed">{VMS.strategie}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── HET TWEEDE BREIN ──────────────────────────────────────── */}
      <section className="bg-[#FAFAF8] py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-10"
          >
            <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
              Mijn signature stap
            </span>
            <h2
              className="text-3xl md:text-[2.6rem] font-bold text-[#1A1A18] mt-4 leading-[1.1]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Eerst bouwen we een tweede brein voor je bedrijf.
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="prose-lg space-y-5 text-[#1A1A18] leading-relaxed"
          >
            <p>
              AI weet niet hoe jouw bedrijf werkt, wie je klanten zijn, of welke toon je gebruikt.
              Daarom werkt een losse ChatGPT-prompt nooit echt goed. Wat ik dus doe vóór ik een
              tool inzet: een gestructureerde kennislaag bouwen over je processen, je klanten en je
              toon. Een tweede brein.
            </p>
            <p>
              Zodra dat staat, snapt elk AI-systeem dat we daarna inrichten je bedrijf. Niet
              generiek meer, wel echt van jou. En het werkt door over alles wat we erbouwen: de
              chatbot, de mailbox, de orderintake. Eén bron, één toon, één bedrijf.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── ACHT CORE-MODULES ──────────────────────────────────────── */}
      <section className="bg-[#F5F1EB] py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start mb-14">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
                {PLATFORM_INFO.eyebrow}
              </span>
              <h2
                className="text-3xl md:text-[2.6rem] font-bold text-[#1A1A18] mt-4 leading-[1.1]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {PLATFORM_INFO.title}
              </h2>
              <p className="text-[#6B7280] leading-relaxed mt-5">{PLATFORM_INFO.lead}</p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="md:pt-2"
            >
              <PlatformDiagram skinLabel="Jouw branche" />
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
            {CORE_MODULES.map((m, i) => (
              <motion.div
                key={m.n}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i % 2) * 0.06 }}
                className="pt-5 border-t border-[#E5E0D8]"
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-[#C9A96E] text-sm font-semibold tabular-nums">{m.n}</span>
                  <h3 className="text-lg font-semibold text-[#1A1A18]">{m.title}</h3>
                </div>
                <p className="text-[#6B7280] text-[15px] leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WERKWIJZE (6 stappen spine) ────────────────────────────── */}
      <section className="bg-[#0F0F0D] py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-2xl mb-14"
          >
            <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
              Mijn werkwijze
            </span>
            <h2
              className="text-3xl md:text-[2.6rem] font-bold text-[#FAFAF8] mt-4 leading-[1.1]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              In zes stappen van vraag naar werkende oplossing.
            </h2>
          </motion.div>

          <div className="relative pl-8 md:pl-0">
            <div className="md:grid md:grid-cols-[auto_1fr] md:gap-x-10">
              <div className="hidden md:block" />
              <div className="relative">
                <div className="absolute left-0 top-2 bottom-2 w-px bg-[#C9A96E]/35" />
                <div className="flex flex-col gap-10">
                  {METHOD_STEPS.map((step, i) => (
                    <motion.div
                      key={step.n}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ delay: i * 0.06 }}
                      className="relative pl-10"
                    >
                      <span className="absolute left-0 -translate-x-1/2 top-0.5 w-2.5 h-2.5 rounded-full bg-[#C9A96E] ring-4 ring-[#0F0F0D]" />
                      <div className="flex items-baseline gap-3 mb-1.5">
                        <span className="text-[#C9A96E] text-sm font-semibold tabular-nums">
                          {step.n}
                        </span>
                        <h3 className="text-[#FAFAF8] text-lg font-semibold">{step.title}</h3>
                      </div>
                      <p className="text-[#FAFAF8]/55 leading-relaxed max-w-xl">{step.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── QUICKSCAN HAAK ───────────────────────────────────────── */}
      <section className="bg-[#C9A96E]">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2
              className="text-2xl md:text-[2rem] font-bold text-[#1A1A18] leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Benieuwd waar bij jou tijd weglekt?
            </h2>
            <p className="text-[#1A1A18]/75 mt-3 leading-relaxed">
              De AI-Quickscan kijkt naar je website, plaatst je bedrijf in z'n branche, en benoemt
              drie concrete plekken waar AI iets kan overnemen. Geen account nodig, geen mailtje
              achteraf. In een paar minuten.
            </p>
          </div>
          <Link
            href="/scan"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#1A1A18] text-[#FAFAF8] font-semibold hover:bg-[#0F0F0D] transition-colors shrink-0"
          >
            Start de quickscan <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* ─── BEWIJS (Koningsdag featured) ─────────────────────────── */}
      <section className="bg-[#FAFAF8] py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-2xl mb-14"
          >
            <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
              Iets concreets
            </span>
            <h2
              className="text-3xl md:text-[2.8rem] font-bold text-[#1A1A18] mt-4 leading-[1.1] tracking-[-0.01em]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Ik praat niet over AI. Ik bouw het, al jaren.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Featured: Koningsdag */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              className="bg-[#0F0F0D] rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[320px]"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C9A96E]">
                {PROOF_POINTS[0].tag}
              </span>
              <div className="mt-8">
                <h3
                  className="text-2xl md:text-[1.75rem] font-bold text-[#FAFAF8] mb-3 leading-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {PROOF_POINTS[0].title}
                </h3>
                <p className="text-[#FAFAF8]/65 leading-relaxed">{PROOF_POINTS[0].desc}</p>
              </div>
            </motion.div>

            {/* Editorial list overig */}
            <div className="flex flex-col">
              {PROOF_POINTS.slice(1).map((p, i) => (
                <motion.div
                  key={p.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.05 }}
                  className="py-5 border-b border-[#E5E0D8] first:border-t"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C9A96E]">
                    {p.tag}
                  </span>
                  <h3 className="font-semibold text-[#1A1A18] mt-1">{p.title}</h3>
                  <p className="text-[#6B7280] text-sm mt-1 leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── WAT IK BELOOF ─────────────────────────────────────────── */}
      <section className="bg-[#0F0F0D] py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-12"
          >
            <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
              Een paar dingen die ik beloof
            </span>
          </motion.div>

          <div className="space-y-10">
            {BELOFTES.map((b, i) => (
              <motion.div
                key={b.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08 }}
                className="border-t border-[#FAFAF8]/15 pt-6"
              >
                <h3 className="text-[#FAFAF8] text-xl md:text-2xl font-semibold mb-3">
                  {b.title}
                </h3>
                <p className="text-[#FAFAF8]/65 leading-relaxed max-w-2xl">{b.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VOOR WIE (7 branches) ───────────────────────────────── */}
      <section className="bg-[#FAFAF8] py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-2xl mb-14"
          >
            <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
              Voor wie
            </span>
            <h2
              className="text-3xl md:text-[2.6rem] font-bold text-[#1A1A18] mt-4 leading-[1.1]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Zeven branches, elk met een eigen skin.
            </h2>
            <p className="text-[#6B7280] leading-relaxed mt-5">
              Het core-platform is voor iedereen hetzelfde. De skin per branche is wat het concreet
              maakt voor jouw werk. Klik door voor wat ik voor jouw vak specifiek bouw.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BRANCHES.sort((a, b) => a.order - b.order).map((b, i) => (
              <motion.div
                key={b.slug}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i % 3) * 0.06 }}
              >
                <Link
                  href={`/voor/${b.slug}`}
                  className="block bg-[#F5F1EB] hover:bg-[#F0E6D0] rounded-2xl p-6 transition-colors h-full"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C9A96E]">
                    {b.shortName}
                  </span>
                  <h3
                    className="text-xl font-bold text-[#1A1A18] mt-2 mb-2.5 leading-tight"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {b.skinTitel}
                  </h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed mb-4">{b.skinSummary}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A1A18]">
                    Bekijk skin <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRAININGEN ───────────────────────────────────────────── */}
      <section className="bg-[#F5F1EB] py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
              De voordeur
            </span>
            <h2
              className="text-3xl md:text-[2.4rem] font-bold text-[#1A1A18] mt-4 mb-4 leading-[1.1]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {TRAINING.title}
            </h2>
            <p className="text-[#6B7280] leading-relaxed mb-6">{TRAINING.lead}</p>
            <div className="flex items-baseline gap-2 mb-7">
              <span
                className="text-3xl font-bold text-[#1A1A18]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {TRAINING.price}
              </span>
              <span className="text-[#6B7280] text-sm">{TRAINING.period}</span>
            </div>
            <Link
              href="/trainingen"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A1A18] hover:text-[#C9A96E] transition-colors"
            >
              Meer over trainingen <ArrowRight size={15} />
            </Link>
          </motion.div>
          <motion.ul
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col gap-3.5"
          >
            {TRAINING.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[#1A1A18]">
                <Check size={17} className="text-[#C9A96E] mt-0.5 shrink-0" />
                <span className="leading-snug">{f}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ─── VIDEOGRAFIE (kort) ──────────────────────────────────── */}
      <section className="bg-[#FAFAF8] py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-[#0F0F0D] p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8"
          >
            <Image
              src={PHOTOS[0]}
              alt="Future Content videografie"
              fill
              className="object-cover opacity-25"
              sizes="100vw"
            />
            <div className="relative z-10 max-w-xl">
              <span className="inline-flex items-center gap-2 text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                <Film size={14} /> Wat ik ook nog doe
              </span>
              <h2
                className="text-2xl md:text-[2rem] font-bold text-[#FAFAF8] leading-tight mb-3"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Future Content begon met video. Dat doet het nog steeds.
              </h2>
              <p className="text-[#FAFAF8]/65 leading-relaxed">
                Vastgoedvideo&apos;s voor makelaars, social-media content voor bedrijven,
                trouwfilms in de Kempen. Niet de hoofdmoot meer, wel de plek waar ik vandaan kom en
                waar veel ondernemers mij voor het eerst tegenkomen.
              </p>
            </div>
            <Link
              href="/videografie"
              className="relative z-10 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-[#FAFAF8]/30 text-[#FAFAF8] font-semibold hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors shrink-0"
            >
              Bekijk videografie <ArrowUpRight size={17} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── REVIEWS ─────────────────────────────────────────────── */}
      {REVIEWS.length > 0 && (
        <section className="bg-[#FAFAF8] pb-24 md:pb-32">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col gap-3 mb-10"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={15} fill="#C9A96E" className="text-[#C9A96E]" />
                  ))}
                </div>
                <span className="text-[#6B7280] text-sm">5,0 gemiddeld op Google</span>
              </div>
              <p className="text-[#6B7280] text-sm max-w-2xl">
                Reviews hieronder zijn over video- en samenwerkingen. Voor de AI-bouw heb ik nog
                geen review op Google. De eerste pilot loopt nu, eerste case volgt na go-live.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {REVIEWS.map((review, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.07 }}
                  className="flex flex-col gap-3"
                >
                  <p className="text-[#1A1A18] text-sm leading-relaxed flex-1">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-2.5 pt-3 border-t border-[#E5E0D8]">
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

      {/* ─── OVER JOHN (kort, professioneel) ────────────────────── */}
      <section className="bg-[#F5F1EB] py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[0.8fr_1.2fr] gap-12 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden max-w-xs"
          >
            <Image src={PHOTOS[0]} alt="John Lavrijsen" fill className="object-cover" sizes="320px" />
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
              Wie ik ben
            </span>
            <h2
              className="text-3xl md:text-[2.4rem] font-bold text-[#1A1A18] mt-4 mb-5 leading-[1.1]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              John Lavrijsen, AI-bouwer uit Bladel.
            </h2>
            <p className="text-[#6B7280] leading-relaxed mb-4">
              Ik heb vier jaar als business engineer gewerkt aan procesoptimalisatie en
              systeem-implementaties in de transportsector. Sinds januari 2026 werk ik voor mezelf
              en bouw ik AI en automatiseringen voor MKB-bedrijven in de Kempen en Eindhoven en
              alles daar tussenin.
            </p>
            <p className="text-[#6B7280] leading-relaxed mb-7">
              Ik ben er goed in geworden door het te doen. Niet door een cursus, niet door een
              PowerPoint. Door elke week iets te bouwen, iets te laten mislukken, en het opnieuw te
              proberen tot het werkt. Dat doe ik nog steeds.
            </p>
            <Link
              href="/over"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A1A18] hover:text-[#C9A96E] transition-colors"
            >
              Meer over mij <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── FINAL CTA ──────────────────────────────────────────── */}
      <section className="bg-[#0F0F0D] py-24 md:py-32 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2
              className="text-4xl md:text-[3.4rem] font-bold text-[#FAFAF8] mb-6 leading-[1.05]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Een half uur, gratis. Daarna weet je een van drie dingen.
            </h2>
            <p className="text-[#FAFAF8]/55 text-lg mb-10 leading-relaxed">
              Of je kunt zelf verder en ik wijs je de juiste richting. Of een workshop is voor
              jullie team de beste eerste stap. Of we gaan samen iets bouwen.
            </p>
            <Link
              href="/boek"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#C9A96E] text-[#1A1A18] font-semibold text-lg hover:bg-[#d8bd87] transition-colors"
            >
              Plan een gesprek <ArrowRight size={19} />
            </Link>
          </motion.div>
        </div>
      </section>

      <NewPostNotification />
    </>
  );
}
