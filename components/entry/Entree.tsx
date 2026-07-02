"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ScanLine, MessageCircle, Clapperboard } from "lucide-react";
import Wordmark from "@/components/common/Wordmark";
import { PHOTOS, SITE } from "@/lib/constants";

/**
 * De entree (homepage). Vervangt de oude "kies een deur"-poort.
 *
 * AI-first: de propositie in Johns stem is de grootste tekst, met een echte
 * voordeur (gratis Quickscan + WhatsApp) meteen in beeld en Johns gezicht
 * ernaast. Film is bewust secundair (smalle strook). Huisstijl: inkt-basis,
 * linnen tekst, klei als kruiderij, Archivo koppen, Playfair-knipoog, Space
 * Mono labels, de knipper-cursor als handtekening.
 *
 * Voortbouwend op het multi-agent herontwerp (poort-herontwerp workflow).
 */

const ARCHIVO = "var(--font-archivo)";
const PLAYFAIR = "var(--font-playfair)";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

const WAARDE = [
  "Ik kom langs en laat aan tafel zien wat werkt. Niet verkopen met praatjes, gewoon tonen.",
  "Ik bouw het voor je. Een slimme mailbox die je post voorsorteert, een bot die offertes klaarzet, een workflow die handwerk overneemt.",
  "Bevalt het, dan beheer ik het ook. Je hoeft er zelf niet in te duiken.",
];

export default function Entree() {
  const wa = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    "Hallo John, ik wil graag meer weten over AI voor mijn bedrijf."
  )}`;

  return (
    <div className="min-h-screen bg-[#2A2218] text-[#F3ECE0]" style={{ fontFamily: ARCHIVO }}>
      {/* ── Eigen topbalk (de globale chrome is op / verborgen) ── */}
      <header className="relative z-30 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" aria-label="Future Content" className="flex flex-col gap-1">
          <Wordmark theme="dark" className="text-lg md:text-xl" showCaret={false} />
          <span className="fc-mono text-[9px] uppercase tracking-[0.38em] text-[#A89A85]">
            <span className="text-[#B45F38]">Think</span> now,{" "}
            <span className="text-[#D9A066]">build</span> tomorrow
          </span>
        </Link>
        <nav className="flex items-center gap-5">
          <Link href="/ai" className="fc-mono text-xs uppercase tracking-[0.15em] text-[#F3ECE0] hover:text-[#B45F38] transition-colors">
            AI
          </Link>
          <Link href="/film" className="fc-mono text-xs uppercase tracking-[0.15em] text-[#F3ECE0]/60 hover:text-[#F3ECE0] transition-colors">
            Video
          </Link>
        </nav>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* subtiel kaartraster achter de linkerkolom (AI-skin-knipoog) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#B45F38 1px, transparent 1px), linear-gradient(90deg, #B45F38 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(70% 70% at 25% 40%, black 10%, transparent 80%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-16 pt-8 md:grid-cols-[1.15fr_0.85fr] md:pb-24 md:pt-10">
          {/* Links: boodschap + voordeur */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-xl">
            <motion.p variants={fadeUp} className="fc-mono mb-5 text-[11px] uppercase tracking-[0.3em] text-[#B45F38]">
              AI en automatisering voor het MKB in de Kempen
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-[2.1rem] font-extrabold leading-[1.06] tracking-[-0.01em] text-[#F3ECE0] sm:text-5xl lg:text-[3.4rem]"
              style={{ fontFamily: ARCHIVO }}
            >
              Ik kom langs en bouw de AI die het saaie werk uit je bedrijf haalt.
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-lg text-lg leading-relaxed text-[#F3ECE0]/70">
              Ik kijk aan tafel waar de tijd weglekt en bouw daar iets op dat werkt. Geen cursus die je
              zelf moet volgen, geen hype. Gewoon iets dat draait, voor het MKB in de Kempen, Eindhoven
              en Tilburg. Bevalt het, dan houd ik het draaiend.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/scan"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B45F38] px-7 py-4 text-sm font-semibold text-[#F3ECE0] transition-colors hover:bg-[#9E3D24]"
              >
                <ScanLine size={17} /> Doe de gratis AI-Quickscan
              </Link>
              <Link
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#F3ECE0]/25 px-7 py-4 text-sm font-semibold text-[#F3ECE0] transition-colors hover:border-[#B45F38] hover:text-[#B45F38]"
              >
                <MessageCircle size={17} /> Of app me direct
              </Link>
            </motion.div>
            <motion.p variants={fadeUp} className="fc-mono mt-5 text-[11px] leading-relaxed text-[#F3ECE0]/45">
              Duurt 2 minuten. Je krijgt binnen een dag een persoonlijke video van me terug. De scan
              kost je niks.
            </motion.p>
          </motion.div>

          {/* Rechts: John in beeld */}
          <motion.figure
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[#F3ECE0]/10"
          >
            <Image
              src={PHOTOS[0]}
              alt="John Lavrijsen, Future Content"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#221C14] via-[#221C14]/10 to-transparent" />
            <figcaption className="fc-mono absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.2em] text-[#F3ECE0]/70">
              John Lavrijsen · Bladel
            </figcaption>
          </motion.figure>
        </div>
      </section>

      {/* ── Herkenningsband ── */}
      <section className="border-t border-[#F3ECE0]/8">
        <div className="mx-auto max-w-4xl px-6 py-14 text-center">
          <div className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-[#B45F38] to-transparent" />
          <p className="text-xl italic leading-relaxed text-[#F3ECE0]/80 md:text-2xl" style={{ fontFamily: PLAYFAIR }}>
            Je bent zo goed in het werk zelf dat je het werk niet meer van een afstand ziet. Te veel
            handmatig, te veel uren. Daar kom ik voor.
          </p>
        </div>
      </section>

      {/* ── Drie waardepunten ── */}
      <section className="mx-auto max-w-6xl px-6 pb-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {WAARDE.map((tekst, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className="fc-mono text-sm font-bold text-[#B45F38]">0{i + 1}</span>
              <p className="mt-3 leading-relaxed text-[#F3ECE0]/75">{tekst}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10">
          <Link href="/ai" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#B45F38]">
            Zo pak ik het aan
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ── Film-strook (bewust secundair) ── */}
      <section className="mt-16 border-t border-[#F3ECE0]/8">
        <Link
          href="/film"
          className="group mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-10 sm:flex-row sm:items-center"
        >
          <div className="flex items-start gap-4">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#F3ECE0]/15 text-[#B45F38]">
              <Clapperboard size={18} />
            </div>
            <div>
              <p className="fc-mono text-[11px] uppercase tracking-[0.3em] text-[#B45F38]">Dit doe ik er ook bij</p>
              <p className="mt-1 text-lg text-[#F3ECE0]/85" style={{ fontFamily: PLAYFAIR }}>
                Video en content om zichtbaar te zijn. Vastgoedfilms, social video en trouwfilms.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-[#F3ECE0] transition-colors group-hover:text-[#B45F38]">
            Bekijk de video-kant
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </section>

      {/* ── Afsluiter ── */}
      <footer className="border-t border-[#F3ECE0]/8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-10 sm:flex-row sm:items-center">
          <p className="flex items-center gap-2 text-lg" style={{ fontFamily: PLAYFAIR }}>
            Geen hype, gewoon iets dat werkt.
            <span className="fc-caret inline-block h-[0.7em] w-[0.32em] translate-y-[0.05em]" aria-hidden />
          </p>
          <p className="fc-mono text-xs text-[#F3ECE0]/50">
            {SITE.email} · {SITE.phone} · Bladel · KvK {SITE.kvk}
          </p>
        </div>
      </footer>
    </div>
  );
}
