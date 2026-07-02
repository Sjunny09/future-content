"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { BRANCHES, AI_TRUST, CORE_MODULES, PLATFORM_INFO } from "@/lib/constants";
import { PlatformDiagram } from "@/components/sections/PlatformDiagram";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

export default function BranchePage() {
  const params = useParams<{ branche: string }>();
  const branche = BRANCHES.find((b) => b.slug === params.branche);

  if (!branche) {
    notFound();
  }

  return (
    <main>
      {/* ─── HERO ────────────────────────────────────────────────── */}
      <section className="relative bg-[#221C14] overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-24">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <span className="inline-block text-[#B45F38] text-xs font-semibold uppercase tracking-[0.2em] mb-7">
              {branche.heroEyebrow}
            </span>
            <h1
              className="text-[#F3ECE0] font-bold leading-[1.04] mb-7 text-[2.6rem] md:text-[4rem] tracking-[-0.02em] max-w-4xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {branche.heroH1}
            </h1>
            <p className="text-[#F3ECE0]/70 text-lg md:text-xl max-w-2xl mb-9 leading-relaxed">
              {branche.heroLead}
            </p>
            <div className="flex flex-col sm:flex-row gap-3.5">
              <Link
                href="/boek"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#B45F38] text-[#2A2218] font-semibold hover:bg-[#9E3D24] transition-colors"
              >
                Plan een gesprek <ArrowRight size={17} />
              </Link>
              <Link
                href="/werkwijze"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-[#F3ECE0]/25 text-[#F3ECE0] font-semibold hover:border-[#B45F38] hover:text-[#B45F38] transition-colors"
              >
                Bekijk de werkwijze
              </Link>
            </div>
          </motion.div>

          {/* Trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4"
          >
            {AI_TRUST.map((t) => (
              <div key={t} className="flex items-start gap-2.5">
                <Check size={15} className="text-[#B45F38] mt-1 shrink-0" />
                <span className="text-[#F3ECE0]/65 text-sm leading-snug">{t}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── WAT IK NU ZIE ──────────────────────────────────────── */}
      <section className="bg-[#F3ECE0] py-24 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <span className="text-[#B45F38] text-xs font-semibold uppercase tracking-[0.2em]">
              Wat ik nu zie
            </span>
            <h2
              className="text-3xl md:text-[2.4rem] font-bold text-[#2A2218] mt-4 mb-8 leading-[1.1]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {branche.observatieH2}
            </h2>
            <div className="space-y-5 text-[#2A2218] leading-relaxed">
              {branche.observatieBody.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── WEL / NIET ─────────────────────────────────────────── */}
      <section className="bg-[#ECE2D2] py-24 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl md:text-[2.4rem] font-bold text-[#2A2218] mb-12 leading-[1.1]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Wat AI hier wel en niet voor je doet.
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-5"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#B45F38]">
                Wel
              </h3>
              <ul className="space-y-4">
                {branche.aiDoetWel.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={20} className="text-[#2A2218] mt-0.5 shrink-0" />
                    <span className="text-[#2A2218] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-5"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#6E6151]">
                Niet
              </h3>
              <ul className="space-y-4">
                {branche.aiDoetNiet.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X size={20} className="text-[#6E6151] mt-0.5 shrink-0" />
                    <span className="text-[#6E6151] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── DE SKIN ────────────────────────────────────────────── */}
      <section className="bg-[#F3ECE0] py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <span className="text-[#B45F38] text-xs font-semibold uppercase tracking-[0.2em]">
              Mijn skin voor {branche.shortName.toLowerCase()}
            </span>
            <h2
              className="text-3xl md:text-[2.6rem] font-bold text-[#2A2218] mt-4 mb-5 leading-[1.1]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {branche.skinTitel}
            </h2>
            <p className="text-[#6E6151] leading-relaxed mb-12 max-w-3xl">{branche.skinLead}</p>
          </motion.div>
          <div className="space-y-10">
            {branche.skinModules.map((m, i) => (
              <motion.div
                key={m.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08 }}
                className="border-t border-[#E4D8C6] pt-6"
              >
                <h3 className="text-xl font-semibold text-[#2A2218] mb-2.5">{m.name}</h3>
                <p className="text-[#6E6151] leading-relaxed max-w-3xl">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOE JE SKIN PAST OP HET PLATFORM ──────────────────── */}
      <section className="bg-[#ECE2D2] py-24 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start mb-12">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <span className="text-[#B45F38] text-xs font-semibold uppercase tracking-[0.2em]">
                {PLATFORM_INFO.eyebrow}
              </span>
              <h2
                className="text-3xl md:text-[2.4rem] font-bold text-[#2A2218] mt-4 mb-5 leading-[1.1]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Acht core-modules onderaan, jouw skin erbovenop.
              </h2>
              <p className="text-[#6E6151] leading-relaxed">{PLATFORM_INFO.lead}</p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="md:pt-2"
            >
              <PlatformDiagram skinLabel={branche.shortName} />
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
            {CORE_MODULES.map((m, i) => (
              <motion.div
                key={m.n}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: (i % 2) * 0.04 }}
                className="flex items-start gap-3 pt-3 border-t border-[#E4D8C6]"
              >
                <span className="text-[#B45F38] text-xs font-semibold tabular-nums mt-1">
                  {m.n}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-[#2A2218] mb-1">{m.title}</h3>
                  <p className="text-[#6E6151] text-sm leading-relaxed">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EERSTE STAP ────────────────────────────────────────── */}
      <section className="bg-[#F3ECE0] py-24 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <span className="text-[#B45F38] text-xs font-semibold uppercase tracking-[0.2em]">
              Een eerste stap
            </span>
            <h2
              className="text-3xl md:text-[2.4rem] font-bold text-[#2A2218] mt-4 mb-6 leading-[1.1]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Een halve dag op locatie, vanaf €750 ex BTW.
            </h2>
            <div className="space-y-5 text-[#2A2218] leading-relaxed">
              <p>
                De meeste klanten beginnen met een workshop op locatie. Een halve dag, vanaf €750
                ex BTW (60% terug via SLIM-subsidie, ik lever het scholingsplan-document mee). We
                staren niet naar een scherm maar gaan samen aan de slag op jullie eigen taken. Aan
                het einde van de middag heb je drie concrete kansen op papier, ongeacht of je
                daarna met mij verder gaat.
              </p>
              <p>
                Wil je daarna bouwen, dan begint dat met een intake-sessie waarin we je proces in
                kaart brengen en een tweede brein voor je bedrijf opzetten. Daarna kiezen we welke
                modules uit het platform passen, met de {branche.shortName.toLowerCase()}-skin als basis.
                Eenmalige bouw plus maandelijks beheer en credits. Het maandbedrag zie je vooraf op
                een dashboard, inclusief wat het je oplevert.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── EERLIJK OVER DE STAND ──────────────────────────────── */}
      <section className="bg-[#221C14] py-24 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <span className="text-[#B45F38] text-xs font-semibold uppercase tracking-[0.2em]">
              Eerlijk over de stand
            </span>
            <h2
              className="text-3xl md:text-[2.4rem] font-bold text-[#F3ECE0] mt-4 mb-7 leading-[1.1]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {branche.casusStand}
            </h2>
            <div className="space-y-5 text-[#F3ECE0]/70 leading-relaxed">
              <p>{branche.casusBewijs}</p>
              <p className="text-[#F3ECE0]/85">{branche.casusAanbod}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────── */}
      <section className="bg-[#F3ECE0] py-24 md:py-28 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2
              className="text-3xl md:text-[2.8rem] font-bold text-[#2A2218] mb-6 leading-[1.1]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Een half uur, gratis. Daarna weet je een van drie dingen.
            </h2>
            <p className="text-[#6E6151] text-lg mb-9 leading-relaxed">
              Of je kunt zelf verder en ik wijs je de juiste richting. Of een workshop is voor
              jullie team de beste eerste stap. Of we gaan samen iets bouwen.
            </p>
            <Link
              href="/boek"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#2A2218] text-[#F3ECE0] font-semibold text-lg hover:bg-[#221C14] transition-colors"
            >
              Plan een gesprek <ArrowRight size={19} />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
