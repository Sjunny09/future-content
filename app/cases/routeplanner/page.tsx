import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Route, ScanLine, CalendarCheck, MapPin, Layers, TrendingUp } from "lucide-react";

/**
 * Case-detailpagina: Routeplanner (eigen product, geen klantnaam).
 * Feitelijke werking hergebruikt uit components/sections/Cases.tsx en, voor
 * de multi-pickup-logica, uit de scenario-test bij de klant die deze feature
 * heeft laten testen (03-klanten/faes-group/scenario-test/CONCLUSIE.md).
 * Klantnaam bewust NIET gebruikt (conform de opdracht): alleen de feitelijke
 * werking van de tool ("collect-first"-route, laadfase zichtbaar maken,
 * per-stop ophaallocatie kiezen) is hier verwerkt, losstaand van de klant.
 * Server component (geen "use client"): geen interactiviteit nodig buiten
 * standaard links, dus metadata-export kan gewoon.
 */
export const metadata: Metadata = {
  title: "Case: Routeplanner",
  description:
    "Hoe de routeplanner werkt: routes optimaliseren over meerdere stops, rekening houden met ophaallocaties, en het resultaat direct op de kaart met kilometers, tijd en besparing.",
  alternates: { canonical: "/cases/routeplanner" },
};

const STAPPEN = [
  {
    n: "01",
    icon: <MapPin size={18} />,
    t: "Stops en ophaallocaties invoeren",
    d: "Je voert de leverpunten in, en per stop kun je aangeven waar de lading voor die stop wordt opgehaald: het eigen magazijn, of een andere ophaallocatie. Geen vaste aanname dat alles vanaf één punt vertrekt.",
  },
  {
    n: "02",
    icon: <Layers size={18} />,
    t: "Eerst ophalen, dan pas de route",
    d: "De planner rijdt eerst slim langs de ophaallocaties tot de wagen vol genoeg is, en pas dan de leverroute. Die laadfase wordt in de tool zichtbaar gemaakt: je ziet niet alleen de eindroute, maar ook wat de omweg voor het laden heeft gekost.",
  },
  {
    n: "03",
    icon: <Route size={18} />,
    t: "Route berekenen over alle stops",
    d: "Vanaf daar optimaliseert de tool de volgorde van alle stops, inclusief de omwegen die nodig zijn voor het laden onderweg. Het resultaat is één samenhangende rit, geen twee losse trajecten.",
  },
  {
    n: "04",
    icon: <TrendingUp size={18} />,
    t: "Resultaat direct op de kaart",
    d: "Je ziet de uitkomst meteen: de route op de kaart, plus kilometers, tijd en de besparing ten opzichte van de oude manier van plannen.",
  },
];

export default function RouteplannerCasePage() {
  return (
    <main className="bg-[#F3ECE0]">
      {/* ── Header ── */}
      <section className="bg-[#221C14]">
        <div className="mx-auto max-w-4xl px-6 pt-28 pb-16 md:pt-36 md:pb-20">
          <Link
            href="/#cases"
            className="mb-8 inline-flex items-center gap-2 text-sm text-[#F3ECE0]/60 transition-colors hover:text-[#B45F38]"
          >
            <ArrowLeft size={15} /> Terug naar de site
          </Link>
          <span className="fc-mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#B45F38]">
            <Route size={14} /> Eigen product · op maat
          </span>
          <h1
            className="mt-5 text-3xl leading-[1.08] text-[#F3ECE0] md:text-5xl"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            Een routeplanner die ook rekening houdt met ophalen.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#F3ECE0]/70">
            Een routeplanner voor bezorg- en transportritten, op maat gebouwd. De tool
            optimaliseert routes over meerdere stops, houdt rekening met ophaallocaties en
            omwegen voor laden, en toont het resultaat direct op de kaart, inclusief kilometers,
            tijd en besparing.
          </p>
        </div>
      </section>

      {/* ── Werking stapsgewijs ── */}
      <section className="mx-auto max-w-4xl px-6 pb-16 md:pb-20">
        <p className="fc-mono mb-3 text-[11px] uppercase tracking-[0.3em] text-[#B45F38]">
          Hoe het werkt
        </p>
        <h2
          className="mb-10 max-w-xl text-2xl leading-[1.1] text-[#2A2218] sm:text-3xl"
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
        >
          Vier stappen, van invoer tot besparing op de kaart.
        </h2>

        <div className="flex flex-col gap-8">
          {STAPPEN.map((s) => (
            <div key={s.n} className="flex gap-5 border-t border-[#E4D8C6] pt-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#B45F38]/40 bg-[#B45F38]/10 text-[#B45F38]">
                {s.icon}
              </div>
              <div>
                <span className="fc-mono text-xs text-[#B45F38]">{s.n}</span>
                <h3 className="mt-1 text-lg font-semibold text-[#2A2218]">{s.t}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#6E6151]">{s.d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[2px] border border-[#E4D8C6] bg-[#FBF8F2] p-6">
          <p className="text-sm font-semibold text-[#2A2218]">
            Intern getest: ongeveer 7% minder rijtijd op een voorbeeldrit.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#6E6151]">
            Bedoeld om ritplanning te automatiseren voor wie dat nu nog met de hand doet. Elke
            situatie is anders: hoeveel dat in de praktijk oplevert hangt af van het aantal stops,
            ophaallocaties en de huidige manier van plannen.
          </p>
        </div>
      </section>

      {/* ── Video: Loom-opname van de tool in actie ── */}
      <section className="mx-auto max-w-4xl px-6 pb-16 md:pb-20">
        <p className="fc-mono mb-3 text-[11px] uppercase tracking-[0.3em] text-[#B45F38]">
          Zie het zelf
        </p>
        <h2
          className="mb-6 max-w-xl text-2xl leading-[1.1] text-[#2A2218] sm:text-3xl"
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
        >
          Zie het werken in de praktijk.
        </h2>
        <div className="relative aspect-video w-full overflow-hidden rounded-[2px] border border-[#E4D8C6]">
          <iframe
            src="https://www.loom.com/embed/c37cd602fc1943d480bd3b189dd1588f"
            title="Demo: de routeplanner in actie, van stops invoeren tot resultaat op de kaart"
            className="absolute inset-0 h-full w-full"
            frameBorder="0"
            loading="lazy"
            allow="fullscreen"
            allowFullScreen
          />
        </div>
      </section>

      {/* ── Quickscan-CTA ── */}
      <section className="bg-[#2A2218] px-6 py-16 text-[#F3ECE0] md:py-20">
        <div className="mx-auto max-w-4xl">
          <span className="fc-mono text-[11px] uppercase tracking-[0.25em] text-[#B45F38]">
            Gratis, een kwartier werk
          </span>
          <h2
            className="mt-4 text-2xl leading-tight sm:text-3xl"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            Benieuwd of dit ook voor jouw ritten werkt?
          </h2>
          <p className="mt-4 max-w-lg leading-relaxed text-[#F3ECE0]/70">
            Doe de gratis AI-Quickscan of app me direct. Geen verplichtingen, wel een helder
            antwoord.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/scan"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B45F38] px-7 py-4 text-sm font-semibold text-[#F3ECE0] transition-colors hover:bg-[#9E3D24]"
            >
              <ScanLine size={17} /> Doe de gratis AI-Quickscan
            </Link>
            <Link
              href="/boek"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#F3ECE0]/25 px-7 py-4 text-sm font-semibold text-[#F3ECE0] transition-colors hover:border-[#B45F38] hover:text-[#B45F38]"
            >
              <CalendarCheck size={17} /> Plan een gesprek
            </Link>
          </div>
          <Link
            href="/#cases"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#B45F38]"
          >
            Bekijk de andere case <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
