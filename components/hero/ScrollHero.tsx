"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowRight, MessageCircle, ScanLine } from "lucide-react";
import Wordmark from "@/components/common/Wordmark";
import { SITE } from "@/lib/constants";

/**
 * De echte hero van de landingspagina (John's ontwerp, 2 juli).
 *
 * Desktop: de video is een DOORLOPENDE laag die als sticky strook hard tegen
 * de linkerrand staat (crop verder naar links geschoven t.o.v. de vorige
 * versie, minder gezicht in beeld), terwijl de content eroverheen/ernaast
 * scrolt. Naar rechts een mask-fade naar de inkt-achtergrond (geen harde
 * rand, NIET aangepast op verzoek van John). De video scrubt mee met de
 * scroll (zelfde techniek als components/ai/ScrollStory.tsx:
 * scrollYProgress -> video.currentTime).
 *
 * Content-kolom (toegevoegd 2 juli middag): loopt niet meer als één blok mee
 * te faden, maar door VIER TEKST-FASES gekoppeld aan dezelfde scroll-progress
 * (zelfde scrub-logica als de video: useTransform op de gesmoothde progress).
 * Fase 1 (wie ik ben) is de HTML-fallback: staat altijd in de DOM met volle
 * opacity via CSS, en wordt pas door Framer Motion overschreven zodra JS
 * actief is. Dus zonder JS blijft fase 1 gewoon leesbaar. Fases 2-4 verschijnen
 * na elkaar op vaste progress-vensters, met fade+translate (geen harde cuts).
 *
 * Video-ankers (toegevoegd 2 juli avond): de video scrubt niet meer continu
 * met de ruwe scroll mee (dat gaf een "leeg" tussenstuk zodra je stilstond op
 * een tekstblok). In plaats daarvan heeft elke tekst-fase een vast video-anker
 * (VIDEO_ANCHORS, verdeeld over de duur). Zodra uit de scroll-progress blijkt
 * welke fase actief is (dezelfde vensters als FADE_PHASES, grens halverwege
 * tussen twee `at`-waarden), beweegt de video via een eigen gesmoothde
 * MotionValue (useMotionValue + useSpring op de anker-target) naar dat anker.
 * Resultaat: de video beweegt vloeiend tussen ankers tijdens het scrollen, en
 * staat stil zodra een tekstblok volledig in beeld is. De currentTime-sync
 * (race-fix, eerste frame, reduced-motion) blijft ongewijzigd, alleen de bron
 * van de target-tijd verandert (van "raw scroll" naar "actief anker").
 *
 * Mobiel: een doorlopende linkerstrook werkt niet (te weinig breedte, en
 * "sticky naast content" bestaat niet als er geen naast is). Daarom: een
 * gestapelde variant - videostill bovenaan met fade naar onder, tekst eronder
 * (alle vier fases gewoon onder elkaar, geen scroll-scrub op mobiel).
 * Zie STACKED HERO-blok verderop.
 *
 * Rollback: dit component vervangt niets bestaands rechtstreeks (Entree.tsx
 * blijft ongewijzigd staan als referentie/rollback-optie, zie app/page.tsx).
 * Rollback van alleen de tekst-fases: FADE_PHASES-array leeg laten en terug
 * naar de oude vaste intro-tekst (zie git-loze back-up in rapport 09, sectie
 * "Verfijnronde 2 juli middag").
 */

const STORY_HEIGHT_VH = 240; // hoogte van de scroll-afstand waarover de video speelt

/**
 * Vier tekst-fases die na elkaar verschijnen terwijl de bezoeker door de hero
 * scrollt. `at` is het punt op de scroll-progress (0-1) waar de fase vol in
 * beeld staat; de fade/translate-vensters eromheen zitten in PhaseText.
 * Copy is waar mogelijk hergebruikt van de bestaande landingscopy
 * (LandingPage.tsx: kicker, WAARDE-punten, quickscan-CTA).
 */
const FADE_PHASES = [
  {
    at: 0.06,
    kicker: "AI en automatisering voor het MKB in Brabant",
    title: "Het saaie werk je bedrijf uit.",
    body: "Ik bouw AI en automatisering die het routinewerk overneemt. Op maat gemaakt, en daarna een kant-en-klare tool die gewoon voor je werkt.",
  },
  {
    at: 0.36,
    kicker: "Hoe ik werk",
    title: "Ik zie processen en zet ideeën om in concrete tools.",
    body: "Voor ondernemers en werknemers die niet weten waar te beginnen met AI. Ik wil de AI-partner van jouw bedrijf worden.",
  },
  {
    at: 0.64,
    kicker: "Wie ik ben",
    title: "Ik hou van bouwen.",
    body: "Mijn eigen huis, een camper, en nu dit bedrijf. Als ik zie dat iets beter kan, ga ik bouwen.",
  },
  {
    at: 0.92,
    kicker: "Aan de slag",
    title: "Benieuwd waar tijd weglekt in jouw bedrijf?",
    body: "Doe de gratis AI-Quickscan of app me direct, geen verplichtingen.",
    cta: true,
  },
] as const;

/**
 * Vier vaste video-ankers (fractie 0-1 van de video-duur), één per tekst-fase.
 * Verdeeld over de duur zodat elk anker een ander stuk van de video toont
 * i.p.v. steeds hetzelfde begin/eind-frame. Grenzen bewust net binnen [0,1]
 * (0.02/0.98) zodat het eerste/laatste anker geen exact zwart randframe pakt.
 */
/*
 * Ankers liggen op de SCHERPE scenes van de video (frame-analyse 2 juli):
 * ~1,0s  denk-iconen boven het hoofd volledig getekend
 * ~4,2s  lamp met tandwielen volledig opgebouwd
 * ~8,0s  ruit/polygon stabiel op de hand
 * ~9,35s slotframe met sparkles
 * De morph-overgangen (2,0-3,3s en 5,5-7,5s) spelen zo alleen af TIJDENS het
 * scrollen tussen twee blokken; elke stop staat op een scherp beeld.
 * Fracties = tijd / 9,52s totale duur.
 */
const VIDEO_ANCHORS: number[] = [0.105, 0.44, 0.84, 0.982];

/**
 * Grens tussen fase i en fase i+1: halverwege de twee `at`-waarden uit
 * FADE_PHASES. Bepaalt op basis van de scroll-progress welke fase (en dus
 * welk video-anker) actief is. Buiten het eerste/laatste `at` telt alles vóór
 * de eerste grens als fase 0, en alles ná de laatste grens als de laatste fase.
 */
const PHASE_BOUNDARIES = FADE_PHASES.slice(0, -1).map(
  (phase, i) => (phase.at + FADE_PHASES[i + 1].at) / 2
);

function activePhaseIndex(progress: number): number {
  let i = 0;
  while (i < PHASE_BOUNDARIES.length && progress >= PHASE_BOUNDARIES[i]) i++;
  return i;
}

export default function ScrollHero() {
  return (
    <>
      {/* ── Desktop / tablet: sticky video-laag links + scrollende content ── */}
      <div className="hidden md:block">
        <DesktopScrollHero />
      </div>
      {/* ── Mobiel: gestapelde variant, geen sticky laag ── */}
      <div className="md:hidden">
        <MobileStackedHero />
      </div>
    </>
  );
}

function DesktopScrollHero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [reduced, setReduced] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    mass: 0.35,
  });

  // ── Video-anker-target ──────────────────────────────────────────────────
  // In plaats van de video 1-op-1 met de ruwe scroll te scrubben, bepalen we
  // welke tekst-fase actief is (zelfde vensters als de tekst-fades, grens
  // halverwege tussen twee `at`-waarden) en zetten een target-MotionValue op
  // het video-anker van die fase. Die target loopt op zijn beurt door een
  // eigen useSpring, zodat de video vloeiend naar het anker toe beweegt in
  // plaats van te springen. `anchorTarget` start op het eerste anker zodat de
  // video bij mount al op fase 0 staat (geen sprong bij de eerste scroll-tick).
  const anchorTarget = useMotionValue(VIDEO_ANCHORS[0]);
  const smoothAnchor = useSpring(anchorTarget, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  useMotionValueEvent(smooth, "change", (p) => {
    const phaseIndex = activePhaseIndex(p);
    const nextAnchor = VIDEO_ANCHORS[phaseIndex];
    if (anchorTarget.get() !== nextAnchor) {
      anchorTarget.set(nextAnchor);
    }
  });

  // Gesmoothde anker-positie -> currentTime van de video (zelfde patroon als
  // ScrollStory.tsx, nu gevoed door het anker i.p.v. de ruwe scroll-progress).
  useMotionValueEvent(smoothAnchor, "change", (p) => {
    const v = videoRef.current;
    if (!v || !duration || reduced) return;
    const t = Math.min(duration - 0.05, Math.max(0, p * duration));
    if (Math.abs(v.currentTime - t) > 0.015) {
      try {
        v.currentTime = t;
      } catch {
        /* seek nog niet mogelijk; volgende tick opnieuw */
      }
    }
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  // Race-fix: lokaal (en op snelle verbindingen) is de metadata al geladen
  // vóórdat React hydrateert, dus onLoadedMetadata vuurt dan nooit meer.
  // Check daarom bij mount of de duur al bekend is, en teken meteen het
  // eerste frame (zonder seek rendert een preload-video geen beeld).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.readyState >= 1 && v.duration && !Number.isNaN(v.duration)) {
      setDuration(v.duration);
    }
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !duration || reduced) return;
    // Eerste frame expliciet tekenen zodra de duur bekend is.
    try {
      if (v.currentTime === 0) v.currentTime = 0.001;
    } catch {
      /* volgende scroll-tick pakt het op */
    }
  }, [duration, reduced]);

  // Reduce-motion: rustig laten loopen i.p.v. scrollen.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduced) {
      v.loop = true;
      v.play?.().catch(() => {});
    } else {
      v.loop = false;
      v.pause?.();
    }
  }, [reduced, duration]);

  // Wordmark faadt licht in bij de start; de tekst-fases regelen zichzelf
  // (zie PhaseText hieronder), gekoppeld aan dezelfde `smooth` progress die
  // hierboven ook het actieve video-anker bepaalt.
  const introOpacity = useTransform(smooth, [0, 0.06, 0.16], [0, 1, 1]);
  const introY = useTransform(smooth, [0, 0.1], [24, 0]);
  // Scroll-hint verdwijnt zodra de laatste fase (CTA, at 0.92) in aantocht is.
  const hintOpacity = useTransform(smooth, [0.5, 0.7], [1, 0]);

  const waLink = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    "Hallo John, ik wil graag meer weten over AI voor mijn bedrijf."
  )}`;

  return (
    <section ref={containerRef} style={{ height: `${STORY_HEIGHT_VH}vh` }} className="relative bg-[#2A2218]">
      <div className="sticky top-0 flex h-[100svh] w-full overflow-hidden">
        {/* ── Video: hard tegen de linkerrand, half gezicht in beeld ──
            object-position schuift het frame zo dat het gezicht links
            tegen de rand staat i.p.v. gecentreerd. */}
        <div className="relative h-full w-[42%] shrink-0 lg:w-[38%]">
          {/* De video zelf draagt de mask-image: geen harde rand rechts, een
              zachte fade naar transparant die de inkt-achtergrond erdoorheen
              laat komen. object-position schuift het frame naar links zodat
              ongeveer een half gezicht tegen de linkerrand staat. */}
          {/* Scrub-versie: zelfde beeld, hercodeerd met een keyframe per 4
              frames (ffmpeg -g 4). Nodig voor vloeiend zoeken; het origineel
              had te weinig keyframes waardoor scrubben hakkelde. Origineel
              blijft staan als ai-hero.mp4 (mobiel gebruikt die gewoon). */}
          <video
            ref={videoRef}
            src="/videos/ai-hero-scrub.mp4"
            poster="/videos/ai-hero-poster.jpg"
            muted
            playsInline
            preload="auto"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              objectPosition: "-15% center",
              WebkitMaskImage: "linear-gradient(to right, black 45%, transparent 88%)",
              maskImage: "linear-gradient(to right, black 45%, transparent 88%)",
            }}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
          />
          {/* Extra gradient-overlay bovenop: zekerheid op browsers die
              mask-image niet ondersteunen, en verdiept de fade richting de
              inkt-achtergrond waar de tekst begint. */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, transparent 40%, rgba(42,34,24,0.55) 70%, #2A2218 100%)",
            }}
          />
          {/* Bovenrand: houdt de topbar leesbaar op elk frame van de video. */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#221C14]/85 to-transparent" />
        </div>

        {/* ── Content: rechts van/over de video-strook, scrollt vrij ──
            Wordmark staat los boven de fases (blijft altijd zichtbaar).
            Daaronder de vier tekst-fases, elk gekoppeld aan een venster van
            `smooth`. Fase 1 heeft ook een pure-CSS fallback (zie PhaseText)
            zodat de content zonder JS gewoon leesbaar is. */}
        <div className="relative z-10 flex flex-1 items-center overflow-y-auto px-8 py-16 lg:px-16">
          <div className="max-w-xl">
            <motion.div style={{ opacity: introOpacity, y: introY }}>
              <Link href="/" aria-label="Future Content" className="mb-8 inline-flex">
                <Wordmark theme="dark" className="text-lg" />
              </Link>
            </motion.div>

            {/* ── Tekst-fases: wisselen tijdens het scrollen (scrub, geen sprongen) ── */}
            {/* Hoogte moet de CTA-fase (titel + body + knoppen) volledig
                kunnen dragen, anders vallen de knoppen over de scroll-hint. */}
            <div className="relative min-h-[360px] lg:min-h-[420px]">
              {FADE_PHASES.map((phase, i) => (
                <PhaseText key={phase.title} phase={phase} index={i} progress={smooth} waLink={waLink} />
              ))}
            </div>

            {/* Scroll-hint: faadt uit richting de CTA-fase, want "scroll
                verder" heeft geen zin meer aan het einde van de hero. */}
            <motion.p
              style={{ opacity: hintOpacity }}
              className="fc-mono mt-6 text-[11px] leading-relaxed text-[#F3ECE0]/45"
            >
              Scroll verder voor waar de tijd meestal weglekt, en hoe ik dat aanpak.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Eén tekst-fase in de hero-content. Faadt + schuift in op zijn eigen
 * scroll-venster rond `phase.at`, en weer weg als de volgende fase intreedt.
 * Fases liggen absoluut gestapeld (zelfde plek) zodat er geen layout-jump is
 * tussen ze; alleen opacity/translate wisselt.
 *
 * Fase 0 (index 0, "wie ik ben") is de no-JS-fallback: die staat via een
 * losse wrapper ZONDER motion-style ook gewoon statisch in de DOM op
 * opacity 1, zichtbaar via <noscript>-vriendelijke opzet: de motion.div
 * begint al op opacity 1 (useTransform-range start bij [1,1,...]) dus bij
 * uitgeschakelde JS (geen hydration) blijft de laatst gerenderde server-HTML
 * gewoon zichtbaar (React server-render zet de inline style met opacity 1
 * voor fase 0, 0 voor de rest -- zie initial-waarden hieronder).
 */
type Phase = (typeof FADE_PHASES)[number];

function PhaseText({
  phase,
  index,
  progress,
  waLink,
}: {
  phase: Phase;
  index: number;
  progress: ReturnType<typeof useSpring>;
  waLink: string;
}) {
  // Plateau-model (2 juli, op John's punt "tekst moet volledig wit zijn als
  // de video stilstaat"): een fase is over zijn HELE venster volledig opaak
  // (dezelfde grenzen als de video-ankers, PHASE_BOUNDARIES), en cross-fadet
  // alleen in een smalle band rond de grens. Waar je ook stopt met scrollen:
  // de actieve tekst staat altijd op opacity 1, nooit half-transparant.
  // Sequentieel i.p.v. gelijktijdig (fix 2 juli: blokken stonden over elkaar):
  // het uitgaande blok fadet volledig UIT vóór de grens, het inkomende blok
  // fadet pas NA de grens in. De fades liggen dus niet meer over elkaar; op
  // de grens zelf is er heel even niets zichtbaar, wat rustiger oogt dan twee
  // teksten door elkaar. Binnen het venster blijft alles op volle opacity.
  const FADE_W = 0.05;
  const prevB = index === 0 ? -0.2 : PHASE_BOUNDARIES[index - 1];
  const nextB = index === FADE_PHASES.length - 1 ? 1.2 : PHASE_BOUNDARIES[index];

  // Fase 0 begint zichtbaar (server-render fallback zonder JS blijft leesbaar);
  // de overige fases faden pas in ná hun ondergrens.
  const opacity = useTransform(
    progress,
    index === 0
      ? [-0.2, 0, nextB - FADE_W, nextB]
      : [prevB, prevB + FADE_W, nextB - FADE_W, nextB],
    index === 0 ? [1, 1, 1, 0] : [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    index === 0
      ? [-0.2, 0, nextB - FADE_W, nextB]
      : [prevB, prevB + FADE_W, nextB - FADE_W, nextB],
    index === 0 ? [0, 0, 0, -18] : [18, 0, 0, -18]
  );

  // Onzichtbare fases mogen geen kliks afvangen (ze liggen absoluut gestapeld
  // over elkaar, dus zonder dit vangt de bovenste onzichtbare laag de muis).
  const visibility = useTransform(opacity, (v) => (v < 0.01 ? "hidden" : "visible"));

  return (
    <motion.div
      style={{ opacity, y, visibility }}
      className="absolute inset-0"
      // Fase 0 staat ook zonder JS/hydration gewoon zichtbaar in de DOM.
      initial={false}
    >
      <p className="fc-mono mb-5 text-[11px] uppercase tracking-[0.35em] text-[#B45F38]">
        {phase.kicker}
      </p>
      {/* Alleen fase 0 is de echte h1 van de pagina; de andere fases zijn
          visueel identiek maar semantisch h2 (go-live audit: er stonden vier
          h1's in de DOM, slecht voor SEO en screenreaders). */}
      {index === 0 ? (
        <h1
          className="text-[2.3rem] font-extrabold leading-[1.05] tracking-[-0.01em] text-white lg:text-[3.2rem]"
          style={{ fontFamily: "var(--font-archivo)" }}
        >
          {phase.title}
        </h1>
      ) : (
        <h2
          className="text-[2.3rem] font-extrabold leading-[1.05] tracking-[-0.01em] text-white lg:text-[3.2rem]"
          style={{ fontFamily: "var(--font-archivo)" }}
        >
          {phase.title}
        </h2>
      )}
      <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#F3ECE0]">{phase.body}</p>

      {"cta" in phase && phase.cta ? (
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/scan"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B45F38] px-7 py-4 text-sm font-semibold text-[#F3ECE0] transition-colors hover:bg-[#9E3D24]"
          >
            <ScanLine size={17} /> Doe de gratis AI-Quickscan
          </Link>
          <Link
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#F3ECE0]/25 px-7 py-4 text-sm font-semibold text-[#F3ECE0] transition-colors hover:border-[#B45F38] hover:text-[#B45F38]"
          >
            <MessageCircle size={17} /> Of app me direct
          </Link>
        </div>
      ) : null}
    </motion.div>
  );
}

/**
 * Mobiel: gestapelde variant. Geen sticky linkerstrook (past niet op een smal
 * scherm en er is geen "content ernaast" om langs te scrollen). In plaats
 * daarvan: een videostill met fade naar de achtergrond onderaan, tekst eronder
 * in normale documentflow. Simpel, snel, geen scroll-scrub op mobiel (scheelt
 * ook batterij/CPU op het apparaat waar dat het meest telt).
 */
function MobileStackedHero() {
  const waLink = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    "Hallo John, ik wil graag meer weten over AI voor mijn bedrijf."
  )}`;

  return (
    <section className="relative bg-[#2A2218]">
      <div className="relative flex items-center justify-between px-5 pt-6">
        <Wordmark theme="dark" className="text-base" />
      </div>

      <div className="relative mt-6 aspect-[4/5] w-full overflow-hidden">
        <video
          src="/videos/ai-hero.mp4"
          poster="/videos/ai-hero-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "50% 20%" }}
        />
        {/* Fade naar onder: loopt over in de tekstblok-achtergrond. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 40%, rgba(42,34,24,0.75) 78%, #2A2218 100%)",
          }}
        />
      </div>

      <div className="relative px-6 pb-14 pt-2">
        <p className="fc-mono mb-4 text-[11px] uppercase tracking-[0.3em] text-[#B45F38]">
          AI en automatisering voor het MKB in Brabant
        </p>
        {/* h2, niet h1: de desktop-hero (fase 0) is de canonieke h1 van de
            pagina. Beide hero-varianten staan in de DOM, dus twee h1's zou
            een dubbele h1 geven (go-live SEO-audit). */}
        <h2
          className="text-[2rem] font-extrabold leading-[1.08] tracking-[-0.01em] text-[#F3ECE0]"
          style={{ fontFamily: "var(--font-archivo)" }}
        >
          Het saaie werk je bedrijf uit.
        </h2>
        <p className="mt-5 text-base leading-relaxed text-[#F3ECE0]/70">
          Ik bouw AI en automatisering die het routinewerk overneemt. Op maat
          gemaakt, en daarna een kant-en-klare tool die gewoon voor je werkt.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/scan"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B45F38] px-7 py-4 text-sm font-semibold text-[#F3ECE0] transition-colors hover:bg-[#9E3D24]"
          >
            <ScanLine size={17} /> Doe de gratis AI-Quickscan
          </Link>
          <Link
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#F3ECE0]/25 px-7 py-4 text-sm font-semibold text-[#F3ECE0] transition-colors hover:border-[#B45F38] hover:text-[#B45F38]"
          >
            <MessageCircle size={17} /> Of app me direct
          </Link>
        </div>
        <div className="mt-6">
          <Link href="/film" className="fc-mono inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#F3ECE0]/50">
            Ook film/video nodig? <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
