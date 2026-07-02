"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BRANCHES, PLATFORM_INFO } from "@/lib/constants";
import { PlatformDiagram } from "@/components/sections/PlatformDiagram";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

export default function VoorPage() {
  return (
    <main className="bg-[#F3ECE0]">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-32 pb-16 md:pt-40">
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="max-w-3xl">
          <span className="text-[#B45F38] text-xs font-semibold uppercase tracking-[0.2em]">
            Voor wie
          </span>
          <h1
            className="text-4xl md:text-[3.4rem] font-bold text-[#2A2218] mt-4 mb-6 leading-[1.05] tracking-[-0.01em]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Zeven branches, elk met een eigen skin.
          </h1>
          <p className="text-[#6E6151] text-lg leading-relaxed mb-4">
            Het core-platform van 8 modules is voor iedereen hetzelfde. Wat het concreet maakt voor
            jouw vak is de skin. Hieronder per branche: wat ik zie, wat ik specifiek bouw, en hoe ik
            jouw bedrijf daarmee verder help.
          </p>
          <p className="text-[#6E6151] text-lg leading-relaxed">
            Werk je in een branche die er niet bij staat? Plan dan gewoon een gesprek. De kans is
            groot dat een combinatie van skins of een nieuwe skin past op jouw werk.
          </p>
        </motion.div>
      </section>

      {/* Branches grid */}
      <section className="bg-[#ECE2D2] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className="block bg-[#F3ECE0] hover:bg-white border border-[#E4D8C6] hover:border-[#B45F38]/40 rounded-2xl p-7 transition-all h-full"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#B45F38]">
                    {b.shortName}
                  </span>
                  <h3
                    className="text-xl md:text-2xl font-bold text-[#2A2218] mt-2 mb-3 leading-tight"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {b.skinTitel}
                  </h3>
                  <p className="text-[#6E6151] text-sm leading-relaxed mb-5">{b.heroLead}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2A2218]">
                    Bekijk skin <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform context met visual */}
      <section className="bg-[#F3ECE0] py-24 md:py-28">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <span className="text-[#B45F38] text-xs font-semibold uppercase tracking-[0.2em]">
              {PLATFORM_INFO.eyebrow}
            </span>
            <h2
              className="text-3xl md:text-[2.4rem] font-bold text-[#2A2218] mt-4 mb-5 leading-[1.1]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {PLATFORM_INFO.title}
            </h2>
            <p className="text-[#6E6151] leading-relaxed">{PLATFORM_INFO.lead}</p>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <PlatformDiagram skinLabel="Jouw branche" />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#221C14] py-24 md:py-28 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2
            className="text-3xl md:text-[2.8rem] font-bold text-[#F3ECE0] mb-5 leading-[1.1]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Niet zeker of jouw branche erbij past?
          </h2>
          <p className="text-[#F3ECE0]/55 text-lg mb-9 leading-relaxed">
            Plan een gesprek van 30 minuten. Ik kom kijken of een van de skins past, of dat we
            samen iets nieuws optekenen.
          </p>
          <Link
            href="/boek"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#B45F38] text-[#2A2218] font-semibold text-lg hover:bg-[#9E3D24] transition-colors"
          >
            Plan een gesprek <ArrowRight size={19} />
          </Link>
        </div>
      </section>
    </main>
  );
}
