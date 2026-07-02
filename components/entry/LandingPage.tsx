"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Hammer,
  ShieldCheck,
  ScanLine,
  CalendarCheck,
  Clapperboard,
  MessageCircle,
} from "lucide-react";
import Wordmark from "@/components/common/Wordmark";
import ScrollHero from "@/components/hero/ScrollHero";
import Cases from "@/components/sections/Cases";
import { SITE } from "@/lib/constants";

/**
 * De landingspagina (homepage). John's kernpunt (2 juli): "vanuit de
 * landingspagina kan je naar AI en Film" moet logisch voelen, niet als een
 * gate waar je eerst moet kiezen. Dit is dus geen "kies een deur"-poort meer
 * (die was de vorige opzet, components/entry/Entree.tsx, nog aanwezig als
 * rollback) maar het echte AI-first verhaal:
 *
 *   1. Hero: wie ik ben + wat ik doe (ScrollHero, met de doorlopende
 *      scroll-video hard links).
 *   2. Herkenning: het probleem van de ondernemer (te veel handmatig).
 *   3. Wat ik bouw: de drie waardepunten (verplaatst uit app/ai/page.tsx,
 *      die stonden daar los van de hero; hier horen ze logisch na "wie ben ik").
 *   3b. Cases: twee concrete voorbeelden (routeplanner + ticketsysteem
 *      Koningsdag Reusel), components/sections/Cases.tsx. Maakt "wat ik bouw"
 *      tastbaar voordat de quickscan-CTA volgt.
 *   4. Bewijs / hoe het werkt: de AI-Quickscan als lage-drempel CTA.
 *   5. Film: duidelijke maar bewust secundaire route (geen gelijkwaardige
 *      tweede voordeur, gewoon een kaart die doorlinkt).
 *   6. Footer met CTA.
 *
 * Kleuren/klassen volgen het huisstijl-handboek: inkt #2A2218, papier #F3ECE0,
 * klei #B45F38 als enige accent. Geen em-dashes.
 */

const WAARDE = [
  {
    icon: <MapPin size={20} />,
    t: "Eerst kijken waar tijd weglekt",
    d: "Ik kom niet met een tool maar met een vraag: welk werk komt elke week terug en kost de meeste tijd. Daar bouw ik op.",
  },
  {
    icon: <Hammer size={20} />,
    t: "Op jouw eigen processen",
    d: "AI is generiek. Ik maak het van jou: een laag bovenop hoe jij al werkt, zodat het je bedrijf snapt.",
  },
  {
    icon: <ShieldCheck size={20} />,
    t: "Geregeld, ook op de lange termijn",
    d: "Ik bouw het én ik beheer het: updates, onderhoud en verbeteringen blijven bij mij. Voor grotere klussen werk ik samen met specialisten als achtervang.",
  },
];

export default function LandingPage() {
  const waLink = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    "Hallo John, ik wil graag meer weten over AI voor mijn bedrijf."
  )}`;

  return (
    <div className="bg-[#2A2218] text-[#F3ECE0]">
      {/* ── Mini-topbar op de content-lagen na de hero (de hero heeft zijn
          eigen wordmark, zie ScrollHero.tsx) ── */}
      <header className="sticky top-0 z-40 flex items-center justify-end px-5 py-4 md:hidden">
        <Link
          href="/boek"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#B45F38] px-4 py-2 text-xs font-semibold text-[#F3ECE0] transition-colors hover:bg-[#9E3D24]"
        >
          <CalendarCheck size={14} />
          Plan een gesprek
        </Link>
      </header>

      {/* ── 1. Hero: wie ik ben, doorlopende scroll-video ── */}
      <ScrollHero />

      {/* ── 2. Herkenning: het probleem van de ondernemer ── */}
      <section className="border-t border-[#F3ECE0]/8">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center md:py-20">
          <div className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-[#B45F38] to-transparent" />
          <p
            className="text-xl italic leading-relaxed text-[#F3ECE0]/80 md:text-2xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Je bent zo goed in het werk zelf dat je het werk niet meer van een afstand ziet. Te veel
            handmatig, te veel uren. Daar kom ik voor.
          </p>
        </div>
      </section>

      {/* ── 3. Wat ik bouw (waardepropositie, papier/linnen, klei als kruiderij) ── */}
      <section className="bg-[#F3ECE0] px-6 py-20 text-[#2A2218] md:py-28">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="fc-mono mb-4 text-[11px] uppercase tracking-[0.35em] text-[#B45F38]">
              AI die werkt. Gewoon gebouwd.
            </p>
            <h2
              className="text-3xl leading-[1.08] sm:text-5xl"
              style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
            >
              Geen cursus die je zelf moet volgen.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#6E6151]">
              De meeste ondernemers weten dat AI tijd kan besparen, maar hebben
              geen zin om het zelf uit te zoeken. Dat doe ik voor ze. Ik kom
              langs, kijk waar tijd weglekt, en bouw daar iets op. Bevalt het,
              dan beheer ik het ook.
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#E4D8C6] bg-[#E4D8C6] md:grid-cols-3">
            {WAARDE.map((w, i) => (
              <motion.div
                key={w.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#FBF8F2] p-8"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-[#B45F38]/40 bg-[#B45F38]/10 text-[#B45F38]">
                  {w.icon}
                </div>
                <span className="fc-mono text-xs text-[#B45F38]">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-semibold text-[#2A2218]">{w.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6E6151]">{w.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3b. Cases: twee concrete voorbeelden (routeplanner + ticketsysteem) ── */}
      <Cases />

      {/* ── 4. Bewijs / hoe het werkt: de AI-Quickscan ── */}
      <section className="bg-[#F3ECE0] px-6 pb-20 text-[#2A2218] md:pb-28">
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

          <div className="mt-10 flex justify-center">
            <Link href="/ai" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#B45F38]">
              Meer over hoe ik werk
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. Film: duidelijke maar secundaire route ── */}
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
                Dit doe ik er ook bij
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

      {/* ── 6. Afsluiter / CTA ── */}
      <footer className="border-t border-[#F3ECE0]/5 px-6 py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <Wordmark theme="dark" className="text-base" />
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#F3ECE0]/70 hover:text-[#B45F38]"
            >
              <MessageCircle size={14} /> App me
            </Link>
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
        </div>
      </footer>
    </div>
  );
}
