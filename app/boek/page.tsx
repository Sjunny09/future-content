import type { Metadata } from "next";
import Link from "next/link";
import { Check, MessageCircle, CalendarCheck } from "lucide-react";
import { SITE, BOOKING } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Plan een gesprek · Future Content",
  description:
    "Plan een vrijblijvend online gesprek van 30 minuten met John Lavrijsen. Daarna weet je of je zelf verder kunt, of een workshop past, of we samen iets bouwen.",
};

const OPBOUW = [
  {
    t: "Wie je bent en wat je doet",
    d: "Eerste paar minuten: kort intro, wat doet jouw bedrijf, wat is jouw rol, waar zit je verantwoordelijkheid.",
  },
  {
    t: "Hoe je het komende jaar met AI ziet",
    d: "Wat doe je nu al met AI? Welke tools? Wat is jouw kijk op de komende 1-2 jaar voor jouw bedrijf?",
  },
  {
    t: "Wat ik zou kunnen betekenen",
    d: "Ik kom met een korte analyse van jouw bedrijf vooraf, en concrete ideeën. We toetsen samen wat past.",
  },
  {
    t: "Drie mogelijke uitkomsten",
    d: "Of je kunt zelf verder en ik wijs je de juiste richting. Of een workshop is voor jullie team de beste eerste stap. Of we gaan samen iets bouwen.",
  },
];

const VALUE = [
  "Een eerlijk beeld van wat AI in jouw bedrijf wel en niet doet",
  "Drie concrete kansen op papier, ongeacht of je verder gaat",
  "Geen verkooppraat, geen verplichtingen, geen huiswerk vooraf",
];

export default function BoekPage() {
  const waLink = `https://wa.me/${SITE.whatsapp}?text=Hallo%20John%2C%20ik%20wil%20graag%20een%20gesprek%20plannen.`;
  const calConfigured = Boolean(BOOKING.calUser);
  const calSrc = `https://${BOOKING.calHost}/${BOOKING.calUser}/${BOOKING.calEvent}?embed=true&theme=light`;

  return (
    <main className="bg-[#FAFAF8]">
      <section className="max-w-6xl mx-auto px-6 pt-32 pb-16 md:pt-40">
        <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
          Kennismaken
        </span>
        <h1
          className="text-4xl md:text-[3.2rem] font-bold text-[#1A1A18] mt-4 leading-[1.05] max-w-3xl tracking-[-0.01em]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Een half uur, gratis. Daarna weet je een van drie dingen.
        </h1>
        <p className="text-[#6B7280] text-lg mt-5 max-w-2xl leading-relaxed">
          Online, vrijblijvend. Of je kunt zelf verder en ik wijs je de juiste richting. Of een
          workshop op locatie is voor jullie team de beste eerste stap. Of we gaan samen iets
          bouwen.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-28 grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16">
        {/* Links: opbouw + waarde */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#1A1A18] mb-6">
            Hoe het gesprek loopt
          </h2>
          <div className="relative flex flex-col gap-7 mb-12">
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-[#E5E0D8]" />
            {OPBOUW.map((s, i) => (
              <div key={s.t} className="relative pl-12">
                <span className="absolute left-0 top-0 w-8 h-8 rounded-full bg-[#C9A96E]/15 text-[#C9A96E] text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <h3 className="font-semibold text-[#1A1A18]">{s.t}</h3>
                <p className="text-[#6B7280] text-sm mt-1 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-[#F5F1EB] p-7">
            <h3 className="font-semibold text-[#1A1A18] mb-4">Wat je uit het gesprek meeneemt</h3>
            <ul className="flex flex-col gap-3">
              {VALUE.map((v) => (
                <li key={v} className="flex items-start gap-3 text-[#1A1A18] text-sm">
                  <Check size={16} className="text-[#C9A96E] mt-0.5 shrink-0" />
                  <span className="leading-snug">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Rechts: agenda */}
        <div>
          {calConfigured ? (
            <div className="rounded-2xl overflow-hidden border border-[#E5E0D8] bg-white min-h-[640px]">
              <iframe
                src={calSrc}
                title="Plan een gesprek"
                className="w-full h-[640px]"
                style={{ border: "none" }}
              />
            </div>
          ) : (
            <div className="rounded-2xl border border-[#E5E0D8] bg-white p-8 md:p-10 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-[#C9A96E]/15 text-[#C9A96E] flex items-center justify-center mb-5">
                <CalendarCheck size={26} />
              </div>
              <h3
                className="text-2xl font-bold text-[#1A1A18] mb-3"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Plan direct een moment
              </h3>
              <p className="text-[#6B7280] leading-relaxed mb-7 max-w-sm">
                De online agenda wordt hier geladen zodra Cal.com gekoppeld is. Wil je nu al een
                moment prikken? Stuur me een WhatsApp, dan zet ik het meteen in de agenda.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Link
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#1dbd5a] transition-colors"
                >
                  <MessageCircle size={17} /> App mij
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#1A1A18] text-[#1A1A18] font-semibold hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
                >
                  Contactformulier
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
