"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Hammer,
  ShieldCheck,
  MessageCircle,
  Clapperboard,
} from "lucide-react";
import Wordmark from "@/components/common/Wordmark";
import ScrollStory, { type Beat } from "@/components/ai/ScrollStory";
import { SITE } from "@/lib/constants";

// De drie beats die over de scroll-video faden: intro -> idee -> uitvoeren.
// De tekst rijdt mee; John's eigen video vult het beeld.
const AI_BEATS: Beat[] = [
  {
    at: 0.02,
    kicker: "Future Content · AI",
    title: "Dit ben ik.",
    body: "Geen podium, geen hype. Iemand uit de Kempen die het gewoon voor je bouwt.",
  },
  {
    at: 0.5,
    kicker: "Zo begint het",
    title: "Eerst een idee.",
    body: "Ik kijk aan tafel mee waar in jouw bedrijf de tijd weglekt.",
  },
  {
    at: 0.97,
    kicker: "En dan",
    title: (
      <>
        En ik <span className="text-[#C9A96E]">bouw</span> het.
      </>
    ),
    body: "Van idee naar iets dat werkt. En blijft werken.",
  },
];

export default function AiPage() {
  const waLink = `https://wa.me/${SITE.whatsapp}?text=Hallo%20John%2C%20ik%20wil%20graag%20meer%20weten%20over%20AI%20voor%20mijn%20bedrijf.`;

  return (
    <div className="bg-[#050506] text-[#FAFAF8]">
      {/* ── Mini-topbar (eigen chrome, de globale navbar is hier verborgen) ── */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" aria-label="Terug naar de poort" className="group flex items-center gap-2">
          <ArrowRight size={15} className="rotate-180 text-[#C9A96E] transition-transform group-hover:-translate-x-1" />
          <Wordmark theme="dark" className="text-base" showCaret={false} />
        </Link>
        <Link
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1dbd5a]"
        >
          <MessageCircle size={14} />
          <span className="hidden sm:inline">App mij</span>
        </Link>
      </header>

      <ScrollStory beats={AI_BEATS} />

      {/* ── Waardepropositie (AI-skin: strak, nuchter, één goud accent) ── */}
      <section className="relative border-t border-white/5 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#C9A96E]">
              AI die werkt. Gewoon gebouwd.
            </p>
            <h2 className="fc-wordmark text-3xl font-black leading-[1.05] sm:text-5xl">
              Geen cursus die je zelf moet volgen.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#FAFAF8]/65">
              De meeste ondernemers weten dat AI tijd kan besparen, maar hebben
              geen zin om het zelf uit te zoeken. Dat doe ik voor ze. Ik kom
              langs, kijk waar tijd weglekt, en bouw daar iets op. Bevalt het,
              dan beheer ik het ook.
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
            {[
              {
                icon: <MapPin size={20} />,
                title: "Lokaal",
                body: "Uit de Kempen. Iemand die je gewoon kunt bellen, geen landelijke online speler.",
              },
              {
                icon: <Hammer size={20} />,
                title: "Done-for-you",
                body: "Ik bouw het voor je. Jij hoeft geen cursus te volgen of maanden uit te zoeken.",
              },
              {
                icon: <ShieldCheck size={20} />,
                title: "Blijft werken",
                body: "Veilig en AVG-proof. Geen losse trucjes, maar iets dat blijft draaien.",
              },
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#050506] p-8"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A96E]/40 bg-[#C9A96E]/10 text-[#C9A96E]">
                  {pillar.icon}
                </div>
                <h3 className="fc-wordmark text-xl font-bold">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#FAFAF8]/60">
                  {pillar.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA: haakt aan op de bestaande gratis scan-flow. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <Link
              href="/scan"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A96E] px-7 py-4 text-sm font-semibold text-[#0F0F0D] transition-transform hover:scale-[1.02]"
            >
              Doe de gratis AI-scan
              <ArrowRight size={16} />
            </Link>
            <Link
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-[#FAFAF8] transition-colors hover:border-[#C9A96E] hover:text-[#C9A96E]"
            >
              <MessageCircle size={16} />
              Of app mij direct
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Brug naar de andere wereld ── */}
      <section className="border-t border-white/5 px-6 py-16">
        <Link
          href="/video"
          className="group mx-auto flex max-w-5xl items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-[#C9A96E]/40"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#C9A96E]">
              <Clapperboard size={20} />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C9A96E]">
                Zelfde merk, andere wereld
              </p>
              <p className="fc-wordmark mt-1 text-lg font-bold">
                Ook film, video of content nodig?
              </p>
            </div>
          </div>
          <ArrowRight
            size={22}
            className="shrink-0 text-[#FAFAF8]/60 transition-transform group-hover:translate-x-1.5"
          />
        </Link>
      </section>

      {/* ── Mini-footer (AI-skin) ── */}
      <footer className="border-t border-white/5 px-6 py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <Wordmark theme="dark" className="text-base" />
          <p className="text-xs text-[#FAFAF8]/40">
            {SITE.email} · {SITE.phone} · KvK {SITE.kvk}
          </p>
        </div>
      </footer>
    </div>
  );
}
