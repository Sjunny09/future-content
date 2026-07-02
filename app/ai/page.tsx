"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ScanLine,
  CalendarCheck,
  Clapperboard,
  ShieldCheck,
} from "lucide-react";
import Wordmark from "@/components/common/Wordmark";
// OUDE HERO — bewaard voor rollback, zie rapport 07-website-review-en-herofix.md.
// ScrollStory.tsx zelf is ongewijzigd; alleen het gebruik hieronder is vervangen
// door de nieuwe split-hero (HeroSplit). Terugzetten = deze import + het
// AI_BEATS-blok weer actief maken en de <HeroSplit /> call verderop vervangen
// door <ScrollStory beats={AI_BEATS} src="/videos/ai-hero.mp4" poster="/videos/ai-hero-poster.jpg" />.
// import ScrollStory, { type Beat } from "@/components/ai/ScrollStory";
import HeroSplit from "@/components/ai/HeroSplit";
import Cases from "@/components/sections/Cases";
import { SITE, METHOD_STEPS, TRAINING, BELOFTES } from "@/lib/constants";

// De drie waardepunten (WAARDE) zijn verplaatst naar de landingspagina
// (components/entry/LandingPage.tsx), die is nu AI-first en toont ze meteen
// na de hero. Om dubbele content te vermijden staan ze hier niet meer los;
// wie via /ai binnenkomt heeft de kans gehad ze op / te zien, en deze pagina
// focust op de diepere uitleg (quickscan) + de brug naar film.
//
// Verfijnronde 2 juli middag: /ai is omgebouwd van "nog een hero met video"
// naar de echte verdiepingspagina. HeroSplit toont nu een compacte
// tekst-header (geen video meer, zie components/ai/HeroSplit.tsx voor de
// volledige afweging). Daaronder: aanpak (METHOD_STEPS, al bestaande copy uit
// lib/constants.ts, ongewijzigd), prijzen-anker (TRAINING) en verwachtingen
// (BELOFTES). Alle drie hergebruiken bestaande site-copy, niets nieuws bedacht.

// OUDE HERO — bewaard voor rollback, zie rapport 07-website-review-en-herofix.md.
// De drie beats die over de scroll-video faden: intro -> idee -> uitvoeren.
// De tekst rijdt mee; John's eigen video vult het beeld.
// type Beat = import("@/components/ai/ScrollStory").Beat;
// const AI_BEATS: Beat[] = [
//   {
//     at: 0.02,
//     kicker: "Future Content · AI",
//     title: "Dit ben ik.",
//     body: "Geen podium, geen hype. Iemand uit de Kempen die het gewoon voor je bouwt.",
//   },
//   {
//     at: 0.5,
//     kicker: "Zo begint het",
//     title: "Eerst een idee.",
//     body: "Ik kijk aan tafel mee waar in jouw bedrijf de tijd weglekt.",
//   },
//   {
//     at: 0.97,
//     kicker: "En dan",
//     title: (
//       <>
//         En ik <span className="text-[#B45F38]">bouw</span> het.
//       </>
//     ),
//     body: "Van idee naar iets dat werkt. En blijft werken.",
//   },
// ];

export default function AiPage() {
  return (
    <div className="bg-[#2A2218] text-[#F3ECE0]">
      {/* ── Mini-topbar (eigen chrome; globale nav is hier verborgen) ── */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" aria-label="Terug naar de poort" className="group flex items-center gap-2">
          <ArrowRight size={15} className="rotate-180 text-[#B45F38] transition-transform group-hover:-translate-x-1" />
          <Wordmark theme="dark" className="text-base" showCaret={false} />
        </Link>
        <Link
          href="/boek"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#B45F38] px-4 py-2 text-xs font-semibold text-[#F3ECE0] transition-colors hover:bg-[#9E3D24]"
        >
          <CalendarCheck size={14} />
          <span className="hidden sm:inline">Plan een gesprek</span>
        </Link>
      </header>

      {/* ── Header: compacte tekst-header, GEEN video meer (verfijnronde 2 juli middag) ──
          OUDE HERO'S — bewaard voor rollback, zie rapport 07-website-review-en-herofix.md
          en rapport 09 sectie "Verfijnronde 2 juli middag":
          <ScrollStory beats={AI_BEATS} src="/videos/ai-hero.mp4" poster="/videos/ai-hero-poster.jpg" />
          of de vorige HeroSplit met video-blok links (55-60% breedte).
      */}
      <HeroSplit />

      {/* ── Aanpak: de zes stappen (hergebruikt METHOD_STEPS uit lib/constants,
          zelfde bron als /werkwijze, hier compact zonder die pagina te dupliceren) ── */}
      <section className="border-t border-[#F3ECE0]/8 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="fc-mono mb-4 text-[11px] uppercase tracking-[0.35em] text-[#B45F38]">
            Zo werkt het
          </p>
          <h2
            className="max-w-2xl text-3xl leading-[1.08] sm:text-4xl"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            Van kennismaking tot iets dat draait.
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#F3ECE0]/10 bg-[#F3ECE0]/10 sm:grid-cols-2 lg:grid-cols-3">
            {METHOD_STEPS.map((step) => (
              <div key={step.n} className="bg-[#221C14] p-7">
                <span className="fc-mono text-xs text-[#B45F38]">{step.n}</span>
                <h3 className="mt-2 text-base font-semibold text-[#F3ECE0]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#F3ECE0]/60">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cases: compacte variant, twee voorbeelden (routeplanner + ticketsysteem Koningsdag Reusel) ── */}
      <Cases compact />

      {/* ── Prijzen-anker: de training als laagdrempelige eerste stap (TRAINING uit lib/constants) ── */}
      <section className="bg-[#F3ECE0] px-6 py-20 text-[#2A2218] md:py-24">
        <div className="mx-auto max-w-4xl rounded-3xl border border-[#E4D8C6] bg-[#FBF8F2] p-10 md:p-14">
          <p className="fc-mono mb-4 text-[11px] uppercase tracking-[0.35em] text-[#B45F38]">
            Prijs
          </p>
          <h2 className="text-2xl leading-tight sm:text-3xl" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}>
            {TRAINING.title}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-[#6E6151]">{TRAINING.lead}</p>
          <div className="mt-6 flex flex-wrap items-baseline gap-2">
            <span className="text-3xl font-semibold text-[#2A2218]">{TRAINING.price}</span>
            <span className="text-sm text-[#6E6151]">{TRAINING.period}</span>
          </div>
          <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {TRAINING.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm leading-relaxed text-[#6E6151]">
                <ShieldCheck size={15} className="mt-0.5 shrink-0 text-[#B45F38]" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Verwachtingen: wat ik beloof (BELOFTES uit lib/constants) ── */}
      <section className="bg-[#2A2218] px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="fc-mono mb-4 text-[11px] uppercase tracking-[0.35em] text-[#B45F38]">
            Wat je kunt verwachten
          </p>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {BELOFTES.map((b) => (
              <div key={b.title}>
                <h3
                  className="text-lg leading-snug text-[#F3ECE0]"
                  style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
                >
                  {b.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#F3ECE0]/60">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quickscan-uitlichting: sluitstuk van de verdieping, laagdrempelige CTA ── */}
      <section className="bg-[#F3ECE0] px-6 py-20 text-[#2A2218] md:py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-[#2A2218] p-10 text-[#F3ECE0] md:p-14"
          >
            <div className="grid items-center gap-8 md:grid-cols-[1.3fr_0.7fr]">
              <div>
                <span className="fc-mono text-[11px] uppercase tracking-[0.25em] text-[#B45F38]">
                  Gratis, een kwartier werk
                </span>
                <h3
                  className="mt-4 text-3xl leading-tight md:text-4xl"
                  style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
                >
                  De AI-Quickscan
                </h3>
                <p className="mt-4 max-w-lg leading-relaxed text-[#F3ECE0]/70">
                  Vul je bedrijf en website in, beantwoord zes vragen, en je
                  krijgt een helder overzicht: hier kan AI in jouw bedrijf tijd of
                  omzet opleveren. Geen verplichtingen.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href="/scan"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B45F38] px-7 py-4 text-sm font-semibold text-[#F3ECE0] transition-colors hover:bg-[#9E3D24]"
                >
                  <ScanLine size={17} /> Start de scan
                </Link>
                <Link
                  href="/boek"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#F3ECE0]/25 px-7 py-4 text-sm font-semibold text-[#F3ECE0] transition-colors hover:border-[#B45F38] hover:text-[#B45F38]"
                >
                  <CalendarCheck size={17} /> Plan een gesprek
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Brug naar de andere wereld ── */}
      <section className="bg-[#2A2218] px-6 py-16">
        <Link
          href="/film"
          className="group mx-auto flex max-w-5xl items-center justify-between gap-6 rounded-2xl border border-[#F3ECE0]/10 bg-[#F3ECE0]/[0.03] p-7 transition-colors hover:border-[#B45F38]/40"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#F3ECE0]/15 text-[#B45F38]">
              <Clapperboard size={20} />
            </div>
            <div>
              <p className="fc-mono text-[11px] uppercase tracking-[0.3em] text-[#B45F38]">
                Zelfde merk, andere wereld
              </p>
              <p className="mt-1 text-lg font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>
                Ook film, video of content nodig?
              </p>
            </div>
          </div>
          <ArrowRight
            size={22}
            className="shrink-0 text-[#F3ECE0]/60 transition-transform group-hover:translate-x-1.5"
          />
        </Link>
      </section>

      {/* ── Mini-footer (AI-skin) ── */}
      <footer className="border-t border-[#F3ECE0]/5 px-6 py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <Wordmark theme="dark" className="text-base" />
          <p className="fc-mono text-xs text-[#F3ECE0]/40">
            {SITE.email} · {SITE.phone} · KvK {SITE.kvk}
          </p>
          <p className="fc-mono text-xs text-[#F3ECE0]/40">
            <Link href="/voorwaarden" className="hover:text-[#B45F38]">
              Voorwaarden
            </Link>
            {" · "}
            <Link href="/privacy" className="hover:text-[#B45F38]">
              Privacy
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
