"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Route, Ticket, ArrowRight, PlayCircle } from "lucide-react";

/**
 * Cases-sectie: twee voorbeelden van wat er gebouwd wordt, naast de vaste
 * drie waardepunten (WAARDE) op de landingspagina en de Aanpak-stappen op
 * /ai. Dit maakt het concreet: geen abstracte belofte maar twee echte
 * projecten. Kaart 1 (Routeplanner) is een eigen product, geen klantnaam.
 * Kaart 2 (Ticketsysteem Köningsdag Reusel) is een naam-bare klant omdat het
 * een publiek evenement betreft.
 *
 * `compact` (gebruikt op /ai) toont een kleinere versie: geen sectie-intro-
 * paragraaf, kleinere padding, geen slot-quote-blok. Zelfde kaarten,
 * ingekort voor een pagina die al een eigen Aanpak- en Verwachtingen-sectie
 * heeft.
 *
 * Klikbaar (toegevoegd 2 juli avond): elke kaart linkt naar een eigen
 * detailpagina (app/cases/routeplanner, app/cases/ticketsysteem-koningsdag)
 * met de werking stapsgewijs, een video-embed-slot en de quickscan-CTA. De
 * kaart heeft een "Bekijk de werking"-knop die beweegt zodra de kaart in
 * beeld scrollt (whileInView, de pijl schuift op) en die verder opschuift bij
 * hover. Reduced-motion: de beweging valt weg, de knop blijft wel zichtbaar
 * en klikbaar (geen functionaliteit verloren, alleen de animatie).
 */

type CaseItem = {
  icon: React.ReactNode;
  title: string;
  body: string;
  result: string;
  tags: string[];
  href: string;
  // Video volgt, John neemt deze nog op. Component is er klaar voor: zodra
  // er een pad/URL is, hier invullen en de embed-plek hieronder activeren.
  videoUrl?: string;
  // Demo-video staat op de detailpagina (niet op de kaart zelf, dat is
  // John's regie: de kaart lokt naar binnen met een klein signaal, de video
  // zelf leeft alleen op /cases/*).
  hasDemoVideo?: boolean;
  // Optionele beeld-weergave bovenin de kaart (sfeerfoto of screenshot).
  image?: { src: string; alt: string };
  // Optioneel klein rond logo-badge over de kaartafbeelding (linksboven).
  logoBadge?: { src: string; alt: string };
};

const CASES: CaseItem[] = [
  {
    icon: <Route size={20} />,
    title: "Routeplanner",
    body: "Een routeplanner voor bezorg- en transportritten, op maat gebouwd. De tool optimaliseert routes over meerdere stops, houdt rekening met ophaallocaties en omwegen voor laden, en toont het resultaat direct op de kaart, inclusief kilometers, tijd en besparing. Bedoeld om ritplanning te automatiseren voor wie dat nu nog met de hand doet.",
    result: "Intern getest: ongeveer 7% minder rijtijd op een voorbeeldrit.",
    tags: ["ROUTEOPTIMALISATIE", "EIGEN PRODUCT", "OP MAAT"],
    href: "/cases/routeplanner",
    videoUrl: undefined,
    hasDemoVideo: true,
  },
  {
    icon: <Ticket size={20} />,
    title: "Ticketsysteem Köningsdag Reusel",
    body: "Voor het Vorstelijk Verwenfestijn in Reusel bouwde ik een online ticketsysteem op maat, inclusief betaallink via Mollie en volledige hosting. Bezoekers kochten hun tickets rechtstreeks online, betaalden meteen, en het systeem verwerkte de verkoop op de dag zelf.",
    result: "Live gedraaid voor een echt evenement, van ticketverkoop tot betaling.",
    tags: ["TICKETSYSTEEM OP MAAT", "ONLINE BETALEN", "VOOR EEN ECHT EVENEMENT"],
    href: "/cases/ticketsysteem-koningsdag",
    videoUrl: undefined,
    // Sfeercollage van het echte evenement (bron: klantdossier, publiek
    // event, gebruiksrecht bevestigd door John).
    image: {
      src: "/images/cases/koningsdag-sfeer-collage.jpg",
      alt: "Sfeercollage van het Vorstelijk Verwenfestijn in Reusel",
    },
    logoBadge: {
      src: "/images/cases/koningsdag-logo.png",
      alt: "Logo Vorstelijk Verwenfestijn Köningsdag Reusel",
    },
  },
];

function CaseCard({ item, compact }: { item: CaseItem; compact?: boolean }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col rounded-[2px] border border-[#E4D8C6] bg-[#FBF8F2] p-6 transition-colors hover:border-[#B45F38]/50 md:p-7"
    >
      <Link href={item.href} className="absolute inset-0 z-10" aria-label={`Bekijk de werking: ${item.title}`}>
        <span className="sr-only">Bekijk de werking van {item.title}</span>
      </Link>

      {item.image && (
        <div className="relative mb-5 aspect-[16/9] w-full overflow-hidden rounded-[2px] border border-[#E4D8C6]">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {item.logoBadge && (
            <div className="absolute left-3 top-3 h-11 w-11 overflow-hidden rounded-full border border-[#E4D8C6] bg-[#FBF8F2] shadow-sm">
              <Image
                src={item.logoBadge.src}
                alt={item.logoBadge.alt}
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
          )}
        </div>
      )}

      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-[#B45F38]/40 bg-[#B45F38]/10 text-[#B45F38] transition-colors group-hover:bg-[#B45F38]/20">
        {item.icon}
      </div>

      <h3
        className={compact ? "text-lg font-semibold text-[#2A2218]" : "text-xl font-semibold text-[#2A2218]"}
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {item.title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-[#6E6151]">{item.body}</p>

      <p className="mt-4 text-sm font-semibold text-[#2A2218]">{item.result}</p>

      {/* ── Video zelf leeft alleen op de detailpagina ──
          Op de kaart hier alleen een klein signaal (tag "DEMO-VIDEO") dat
          naar binnen lokt, geen video-embed op de landing. */}
      <div className="mt-5 flex flex-wrap gap-2 border-t border-[#E4D8C6] pt-4">
        {item.hasDemoVideo && (
          <span className="fc-mono inline-flex items-center gap-1 rounded-[2px] border border-[#B45F38]/30 bg-[#B45F38]/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[#B45F38]">
            <PlayCircle size={11} /> Demo-video
          </span>
        )}
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="fc-mono rounded-[2px] border border-[#B45F38]/30 bg-[#B45F38]/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[#B45F38]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* ── "Bekijk de werking"-knop: beweegt bij in-view en bij hover ──
          whileInView schuift de pijl subtiel op zodra de kaart in beeld komt
          (los van hover), en group-hover schuift 'm nog iets verder + licht
          op. Reduced-motion: geen transform/animatie, knop blijft gewoon
          zichtbaar en klikbaar (via de absolute Link hierboven). */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, x: -6 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative z-10 mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#B45F38]"
      >
        {item.hasDemoVideo ? "Bekijk de werking + demo-video" : "Bekijk de werking"}
        <ArrowRight
          size={16}
          className={shouldReduceMotion ? "" : "transition-transform group-hover:translate-x-1.5"}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Cases({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <section id="cases" className="bg-[#F3ECE0] px-6 py-16 text-[#2A2218] md:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="fc-mono mb-4 text-[11px] uppercase tracking-[0.35em] text-[#B45F38]">
            Twee voorbeelden
          </p>
          <h2
            className="max-w-2xl text-2xl leading-[1.1] sm:text-3xl"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            Zo ziet dat er in de praktijk uit.
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {CASES.map((item) => (
              <CaseCard key={item.title} item={item} compact />
            ))}
          </div>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-[#6E6151]">
            Twee losse voorbeelden, allebei anders. Precies dat is het punt:
            alles is in principe mogelijk, ingericht op wat er echt nodig is.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="cases" className="bg-[#F3ECE0] px-6 py-20 text-[#2A2218] md:py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="fc-mono mb-4 text-[11px] uppercase tracking-[0.35em] text-[#B45F38]">
            Twee voorbeelden
          </p>
          <h2
            className="text-3xl leading-[1.08] sm:text-4xl"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            Wat dat concreet oplevert.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#6E6151]">
            Geen twee klussen zijn hetzelfde. Hieronder twee losse voorbeelden
            van wat er zoal uit zo&apos;n traject komt: een eigen tool en een
            systeem gebouwd voor een klant.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {CASES.map((item) => (
            <CaseCard key={item.title} item={item} />
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-[#6E6151]">
          Alles is in principe mogelijk. Het gaat er steeds om dat het precies
          past bij wat er nodig is, niet bij een standaard pakket.
        </p>
      </div>
    </section>
  );
}
