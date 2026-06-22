"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { METHOD_STEPS, CORE_MODULES, PLATFORM_INFO } from "@/lib/constants";
import { WerkwijzeFunnel } from "@/components/sections/WerkwijzeFunnel";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const SAFE = [
  {
    t: "Welke tools mag wie gebruiken",
    d: "We leggen per afdeling vast welke AI-tools toegestaan zijn, in welke versie, met welke account. Geen schaduw-IT meer.",
  },
  {
    t: "Wat mag erin, wat niet",
    d: "Heldere afspraken over welke data in een AI-tool mag. Klantgegevens, financiële data en intellectueel eigendom blijven beschermd.",
  },
  {
    t: "Eigenaarschap blijft van jou",
    d: "Alle prompts, breinen en bouwwerken zijn van jou. Overdraagbaar gedocumenteerd. Geen vendor-lock, geen 'alleen John kan dit ontwarren'.",
  },
];

export default function WerkwijzePage() {
  return (
    <main className="bg-[#FAFAF8]">
      {/* Header */}
      <section className="bg-[#0F0F0D]">
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-24">
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="max-w-3xl">
            <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
              Mijn werkwijze
            </span>
            <h1
              className="text-4xl md:text-[3.4rem] font-bold text-[#FAFAF8] mt-4 leading-[1.05] tracking-[-0.01em]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              In zes stappen van vraag naar werkende oplossing.
            </h1>
            <p className="text-[#FAFAF8]/70 text-lg mt-5 max-w-xl leading-relaxed">
              Geen black box, geen losse trucjes. Een vast pad dat ik bij elke klant volg, met
              ruimte voor jouw branche en jouw proces. Workshop als voordeur, tweede brein als
              fundament, modulair platform als basis voor wat we bouwen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Funnel-visual */}
      <section className="bg-[#FAFAF8] py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
              In één oogopslag
            </span>
            <h2
              className="text-2xl md:text-[2rem] font-bold text-[#1A1A18] mt-4 mb-5 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Van workshop bovenaan naar werkende oplossing onderaan.
            </h2>
            <p className="text-[#6B7280] leading-relaxed">
              Zes stappen, elke stap concreter dan de vorige. Hieronder per stap de uitleg en wat
              je kunt verwachten.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <WerkwijzeFunnel />
          </motion.div>
        </div>
      </section>

      {/* 6 stappen */}
      <section className="max-w-5xl mx-auto px-6 py-24 md:py-28">
        <div className="relative">
          <div className="absolute left-[19px] top-3 bottom-3 w-px bg-[#E5E0D8] hidden sm:block" />
          <div className="flex flex-col gap-12">
            {METHOD_STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.05 }}
                className="relative sm:pl-16"
              >
                <span className="hidden sm:flex absolute left-0 top-0 w-10 h-10 rounded-full bg-[#FAFAF8] border border-[#E5E0D8] text-[#C9A96E] items-center justify-center font-semibold text-sm">
                  {s.n}
                </span>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-[#C9A96E] text-sm font-semibold tabular-nums sm:hidden">
                    {s.n}
                  </span>
                  <h2 className="text-xl md:text-2xl font-semibold text-[#1A1A18]">{s.title}</h2>
                </div>
                <p className="text-[#6B7280] leading-relaxed max-w-2xl">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tweede brein verdieping */}
      <section className="bg-[#F5F1EB] py-24 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
              Stap 4 toegelicht
            </span>
            <h2
              className="text-3xl md:text-[2.4rem] font-bold text-[#1A1A18] mt-4 mb-6 leading-[1.1]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Wat is dat eigenlijk, een tweede brein?
            </h2>
            <div className="space-y-5 text-[#1A1A18] leading-relaxed">
              <p>
                AI weet niet hoe jouw bedrijf werkt. Wie je klanten zijn, welke toon je gebruikt,
                hoe je offertes opbouwt, welke afspraken er met leverancier X bestaan. Daarom
                voelt elke losse ChatGPT-prompt generiek.
              </p>
              <p>
                Een tweede brein is een gestructureerde verzameling kennis over jouw bedrijf:
                processen, klanten, toon, prijzen, terugkerende vragen. Niet één bestandje, wel
                een werkbare laag waar alle AI-tools die we daarna inzetten op draaien.
              </p>
              <p>
                Concreet: we leggen je belangrijkste processen vast (vaak in 10-30 korte MD-files),
                zorgen dat ze altijd up-to-date blijven, en bouwen daarop. Daardoor weet de
                chatbot, de mailbox en de offerte-generator straks allemaal je bedrijf, niet
                generiek wat het internet zegt.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platform */}
      <section className="bg-[#FAFAF8] py-24 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-3xl mb-12"
          >
            <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
              {PLATFORM_INFO.eyebrow}
            </span>
            <h2
              className="text-3xl md:text-[2.4rem] font-bold text-[#1A1A18] mt-4 mb-5 leading-[1.1]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {PLATFORM_INFO.title}
            </h2>
            <p className="text-[#6B7280] leading-relaxed">{PLATFORM_INFO.lead}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
            {CORE_MODULES.map((m) => (
              <motion.div
                key={m.n}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className="flex items-start gap-3 pt-3 border-t border-[#E5E0D8]"
              >
                <span className="text-[#C9A96E] text-xs font-semibold tabular-nums mt-1">
                  {m.n}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-[#1A1A18] mb-1">{m.title}</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              href="/voor"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A1A18] hover:text-[#C9A96E] transition-colors"
            >
              Bekijk de skins per branche <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Veilig */}
      <section className="bg-[#F5F1EB] py-24 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-2xl mb-12"
          >
            <span className="inline-flex items-center gap-2 text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
              <ShieldCheck size={15} /> Veilig invoeren
            </span>
            <h2
              className="text-3xl md:text-[2.4rem] font-bold text-[#1A1A18] mt-4 leading-[1.1]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Iedereen gebruikt wel iets met AI. Ik zorg dat het bij jou geregeld is.
            </h2>
            <p className="text-[#6B7280] mt-4 leading-relaxed">
              Drie afspraken die ik altijd vooraf vastleg bij een klant. Beschermt je bedrijf en
              geeft je team rust en structuur.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-x-8 gap-y-8">
            {SAFE.map((s) => (
              <motion.div
                key={s.t}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="pt-5 border-t border-[#E5E0D8]"
              >
                <h3 className="font-semibold text-[#1A1A18] mb-2">{s.t}</h3>
                <p className="text-[#6B7280] text-[15px] leading-relaxed">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FAFAF8] py-24 md:py-28 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2
            className="text-3xl md:text-[2.6rem] font-bold text-[#1A1A18] mb-5 leading-[1.1]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Een half uur, gratis. Daarna weet je een van drie dingen.
          </h2>
          <p className="text-[#6B7280] text-lg mb-9 leading-relaxed">
            Of je kunt zelf verder en ik wijs je de juiste richting. Of een workshop is voor jullie
            team de beste eerste stap. Of we gaan samen iets bouwen.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/boek"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#C9A96E] text-[#1A1A18] font-semibold text-lg hover:bg-[#d8bd87] transition-colors"
            >
              Plan een gesprek <ArrowRight size={19} />
            </Link>
            <Link
              href="/scan"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#1A1A18] text-[#1A1A18] font-semibold text-lg hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
            >
              Doe de AI-Quickscan
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
