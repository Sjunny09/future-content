import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";
import { TRAINING } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI-training op locatie",
  description:
    "Een halve dag bij jullie op kantoor waarin we samen iets bouwen op jullie eigen taken. Vanaf €750 ex BTW, 60% terug via SLIM-subsidie. Scholingsplan-document inclusief.",
  alternates: { canonical: "/trainingen" },
};

const FOR_WHO = [
  "Teams die met AI willen werken maar niet weten waar te beginnen",
  "Ondernemers die losse tools gebruiken zonder overzicht",
  "Bedrijven die AI veilig en met duidelijke afspraken willen invoeren",
];

const AGENDA = [
  {
    t: "AI in jouw branche",
    duur: "60 min",
    d: "Wat zien we elders. Concrete voorbeelden uit transport, makelaardij, schoonmaak, autobedrijven, horeca. Wat werkt al en wat niet.",
  },
  {
    t: "Jullie processen op papier",
    duur: "60 min",
    d: "We mappen jullie belangrijkste processen live. Welk werk komt elke week terug, welk werk kost het meest tijd, en wat hoort thuis bij wie.",
  },
  {
    t: "Hands-on met eigen data",
    duur: "60 min",
    d: "We gaan zelf aan de slag met jullie taken in ChatGPT, Claude of Copilot. Geen droge theorie, wel direct toepasbaar.",
  },
  {
    t: "Drie kansen + vervolgpad",
    duur: "60 min",
    d: "We brainstormen drie concrete kansen voor jullie bedrijf, met geschatte financial impact. Plus vervolgpad: of jullie het zelf kunnen, of een intake + bouw past.",
  },
];

const PAKKETTEN = [
  {
    naam: "Workshop alleen",
    price: "€750",
    netto: "€300 netto na SLIM-subsidie",
    inhoud: [
      "Halve dag (4 uur) bij jullie op kantoor",
      "Hands-on met jullie eigen taken en tools",
      "Heldere AI-richtlijnen, veilig en AVG-bewust",
      "Drie kansen op papier, ook als je daarna niks met mij doet",
      "Scholingsplan-document voor SLIM-aanvraag",
    ],
    cta: "Boek deze workshop",
    highlight: false,
  },
  {
    naam: "Workshop + Intake",
    price: "€1.200",
    netto: "€480 netto na SLIM",
    inhoud: [
      "Alles uit de workshop alleen",
      "Plus intake-sessie van 2 uur op jullie locatie",
      "Eerste opzet van een tweede brein voor jullie bedrijf",
      "Concrete bouw-roadmap op papier",
      "Geen verplichting tot vervolg",
    ],
    cta: "Start hier",
    highlight: true,
  },
  {
    naam: "Workshop + Bouw + 3 mnd beheer",
    price: "€8.500",
    netto: "€3.400 netto na SLIM",
    inhoud: [
      "Workshop + intake + tweede brein",
      "Bouw van 1-2 modules uit het platform",
      "3 maanden maandelijks beheer met dashboard",
      "Live go-live + 1 quarterly business review",
      "Volledig gedocumenteerd, beheer door mij",
    ],
    cta: "Plan een gesprek",
    highlight: false,
  },
];

export default function TrainingenPage() {
  return (
    <main className="bg-[#F3ECE0]">
      {/* Hero */}
      <section className="bg-[#221C14]">
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-24">
          <span className="text-[#B45F38] text-xs font-semibold uppercase tracking-[0.2em]">
            De voordeur
          </span>
          <h1
            className="text-4xl md:text-[3.4rem] font-bold text-[#F3ECE0] mt-4 leading-[1.05] max-w-3xl tracking-[-0.01em]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {TRAINING.title}
          </h1>
          <p className="text-[#F3ECE0]/70 text-lg mt-5 max-w-2xl leading-relaxed">
            {TRAINING.lead}
          </p>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mt-8">
            <span
              className="text-3xl font-bold text-[#B45F38]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {TRAINING.price}
            </span>
            <span className="text-[#F3ECE0]/55 text-sm">{TRAINING.period}</span>
          </div>
        </div>
      </section>

      {/* Wat zit erin + voor wie */}
      <section className="max-w-6xl mx-auto px-6 py-24 md:py-28 grid md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#2A2218] mb-6">
            Wat zit erin
          </h2>
          <ul className="flex flex-col gap-3.5">
            {TRAINING.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[#2A2218]">
                <Check size={18} className="text-[#B45F38] mt-0.5 shrink-0" />
                <span className="leading-snug">{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#2A2218] mb-6">
            Voor wie
          </h2>
          <ul className="flex flex-col gap-3.5">
            {FOR_WHO.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[#2A2218]">
                <Check size={18} className="text-[#B45F38] mt-0.5 shrink-0" />
                <span className="leading-snug">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SLIM-subsidie uitleg */}
      <section className="bg-[#ECE2D2]/40 py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start">
          <div className="w-14 h-14 rounded-full bg-[#B45F38]/15 text-[#B45F38] flex items-center justify-center shrink-0">
            <Sparkles size={26} />
          </div>
          <div>
            <span className="text-[#B45F38] text-xs font-semibold uppercase tracking-[0.2em]">
              SLIM-subsidie 2026
            </span>
            <h2
              className="text-2xl md:text-3xl font-bold text-[#2A2218] mt-3 mb-4 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              60% van de workshop-kosten terug van de overheid.
            </h2>
            <p className="text-[#2A2218] leading-relaxed mb-3">
              SLIM is de subsidieregeling voor scholing in het MKB. Tot €25.000 per bedrijf,
              uitgekeerd in twee aanvraagrondes per jaar. AI-training valt eronder mits ingebed in
              een leerinterventie.
            </p>
            <p className="text-[#2A2218] leading-relaxed mb-3">
              Praktisch: ik lever het scholingsplan-document SLIM-ready mee bij de workshop. Jouw
              boekhouder of HR-medewerker dient het in tijdens de aanvraagrondes (7 april-4 mei en
              10 augustus-7 september 2026). Workshop van €750 ex BTW = netto €300 voor jullie.
            </p>
            <p className="text-[#6E6151] text-sm leading-relaxed">
              SLIM-subsidie wordt door de overheid uitgekeerd, niet door Future Content. Aanvraag en
              uitbetaling lopen via jullie eigen accountant. Ik kan helpen met de inhoudelijke
              onderbouwing.
            </p>
          </div>
        </div>
      </section>

      {/* Agenda van het dagdeel */}
      <section className="bg-[#ECE2D2] py-24 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <h2
            className="text-3xl md:text-[2.4rem] font-bold text-[#2A2218] mb-3 leading-[1.1]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Zo ziet de halve dag eruit.
          </h2>
          <p className="text-[#6E6151] leading-relaxed mb-12 max-w-2xl">
            Vier blokken van een uur. We doen niet alles op een scherm, we wisselen af tussen
            uitleg, samen werken aan jullie processen en hands-on AI-gebruik.
          </p>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
            {AGENDA.map((a, i) => (
              <div key={a.t} className="pt-5 border-t border-[#E4D8C6]">
                <div className="flex items-baseline gap-3">
                  <span className="text-[#B45F38] text-sm font-semibold tabular-nums">
                    0{i + 1}
                  </span>
                  <span className="text-[#6E6151] text-xs uppercase tracking-[0.1em]">
                    {a.duur}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#2A2218] mt-1.5 mb-2">{a.t}</h3>
                <p className="text-[#6E6151] text-[15px] leading-relaxed">{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLIM-pakketten */}
      <section className="bg-[#F3ECE0] py-24 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-[#B45F38] text-xs font-semibold uppercase tracking-[0.2em]">
              Drie startpunten
            </span>
            <h2
              className="text-3xl md:text-[2.4rem] font-bold text-[#2A2218] mt-4 leading-[1.1]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Kies een pakket dat past bij hoever je nu staat.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {PAKKETTEN.map((p) => (
              <div
                key={p.naam}
                className={`rounded-2xl p-7 flex flex-col ${
                  p.highlight
                    ? "bg-[#221C14] text-[#F3ECE0] ring-2 ring-[#B45F38]"
                    : "bg-[#ECE2D2] text-[#2A2218] border border-[#E4D8C6]"
                }`}
              >
                <h3
                  className={`text-xl font-bold mb-2 ${
                    p.highlight ? "text-[#F3ECE0]" : "text-[#2A2218]"
                  }`}
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {p.naam}
                </h3>
                <div className="mb-1">
                  <span
                    className={`text-3xl font-bold ${
                      p.highlight ? "text-[#B45F38]" : "text-[#2A2218]"
                    }`}
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {p.price}
                  </span>
                  <span
                    className={`ml-2 text-sm ${
                      p.highlight ? "text-[#F3ECE0]/55" : "text-[#6E6151]"
                    }`}
                  >
                    ex BTW
                  </span>
                </div>
                <p
                  className={`text-xs mb-6 ${
                    p.highlight ? "text-[#B45F38]" : "text-[#6E6151]"
                  }`}
                >
                  {p.netto}
                </p>
                <ul className="flex flex-col gap-2.5 mb-7 flex-1">
                  {p.inhoud.map((i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-2 text-sm leading-snug ${
                        p.highlight ? "text-[#F3ECE0]/85" : "text-[#2A2218]"
                      }`}
                    >
                      <Check
                        size={15}
                        className={`mt-0.5 shrink-0 ${
                          p.highlight ? "text-[#B45F38]" : "text-[#B45F38]"
                        }`}
                      />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/boek"
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm transition-colors ${
                    p.highlight
                      ? "bg-[#B45F38] text-[#2A2218] hover:bg-[#9E3D24]"
                      : "border border-[#2A2218] text-[#2A2218] hover:border-[#B45F38] hover:text-[#B45F38]"
                  }`}
                >
                  {p.cta} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Veiligheid blok */}
      <section className="bg-[#ECE2D2] py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start">
          <div className="w-14 h-14 rounded-full bg-[#2A2218]/10 text-[#2A2218] flex items-center justify-center shrink-0">
            <ShieldCheck size={26} />
          </div>
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold text-[#2A2218] mb-4 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Wat je tijdens de workshop niet ziet en wel meeneemt.
            </h2>
            <p className="text-[#2A2218] leading-relaxed mb-3">
              Bij elke training gaat een AI-richtlijnen-document mee. Welke tools jullie mogen
              gebruiken, welke data wel en niet in een AI-tool mag, en wie verantwoordelijk is. Geen
              IT-policy van 30 pagina&apos;s, wel een werkbare één-pager.
            </p>
            <p className="text-[#2A2218] leading-relaxed">
              Plus: alle prompts die we tijdens de workshop opbouwen, krijg je in een gedeeld
              document mee. Volgende week kun je verder waar we gestopt zijn.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#221C14] py-24 md:py-28 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <div className="w-14 h-14 rounded-full bg-[#B45F38]/15 text-[#B45F38] flex items-center justify-center mx-auto mb-6">
            <GraduationCap size={26} />
          </div>
          <h2
            className="text-3xl md:text-[2.6rem] font-bold text-[#F3ECE0] mb-5 leading-[1.1]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Klaar om je team mee te nemen?
          </h2>
          <p className="text-[#F3ECE0]/55 text-lg mb-9 leading-relaxed">
            Plan een gesprek, dan stemmen we de training af op jullie bedrijf. Inclusief
            scholingsplan-document voor de SLIM-aanvraag.
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
