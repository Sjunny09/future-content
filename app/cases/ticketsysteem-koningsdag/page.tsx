import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Ticket, ScanLine, CalendarCheck, FileText, CreditCard, Mail } from "lucide-react";

/**
 * Case-detailpagina: Ticketsysteem Köningsdag Reusel (echte klant, naam mag,
 * publiek evenement). Feitelijke werking hergebruikt uit
 * components/sections/Cases.tsx en oppervlakkig uit
 * 03-klanten/koningsdag-reusel/README.md (ticketpagina/-onderdeel): betaling
 * via Mollie, live gedraaid tijdens het Vorstelijk Verwenfestijn op
 * Köningsdag (27 april), hosting inbegrepen. Geen technische/interne details
 * (géén betaalstatus-codes, géén adminpaneel-informatie) op de publieke site,
 * alleen wat een bezoeker aan werking ziet.
 * Server component (geen "use client"): geen interactiviteit nodig buiten
 * standaard links, dus metadata-export kan gewoon.
 */
export const metadata: Metadata = {
  title: "Case: Ticketsysteem Köningsdag Reusel",
  alternates: { canonical: "/cases/ticketsysteem-koningsdag" },
  description:
    "Hoe het ticketsysteem voor Köningsdag Reusel werkte: online tickets kopen, direct betalen via Mollie, en de verkoop op de dag zelf verwerkt. Van ticketverkoop tot betaling.",
};

const STAPPEN = [
  {
    n: "01",
    icon: <FileText size={18} />,
    t: "Bezoeker vult het formulier in",
    d: "Groep, namen en de keuze voor het broodje worden in één simpele online pagina ingevuld. Geen losse lijstjes of mailtjes meer.",
  },
  {
    n: "02",
    icon: <CreditCard size={18} />,
    t: "Direct betalen via Mollie",
    d: "Na het invullen betaalt de bezoeker meteen online, via een betaallink met Mollie. Geen contant geld of achteraf overmaken.",
  },
  {
    n: "03",
    icon: <Ticket size={18} />,
    t: "Bevestiging en registratie",
    d: "Zodra de betaling binnen was, was de plek geregeld en kreeg de bezoeker een bevestiging. Het systeem hield de verkoop bij, inclusief de broodjeskeuzes voor de catering.",
  },
  {
    n: "04",
    icon: <Mail size={18} />,
    t: "Verwerkt op de dag zelf",
    d: "Het systeem verwerkte de verkoop op de dag van het evenement zelf: de organisatie kon live volgen hoeveel tickets er verkocht waren, zonder handmatig bij te houden.",
  },
];

export default function TicketsysteemKoningsdagCasePage() {
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
            <span className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full border border-[#463C2E]">
              <Image
                src="/images/cases/koningsdag-logo.png"
                alt="Logo Vorstelijk Verwenfestijn Köningsdag Reusel"
                fill
                sizes="24px"
                className="object-cover"
              />
            </span>
            <Ticket size={14} /> Echt evenement · live gedraaid
          </span>
          <h1
            className="mt-5 text-3xl leading-[1.08] text-[#F3ECE0] md:text-5xl"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            Een ticketsysteem dat live een evenement draaide.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#F3ECE0]/70">
            Voor het Vorstelijk Verwenfestijn in Reusel bouwde ik een online ticketsysteem op
            maat, inclusief betaallink via Mollie en volledige hosting. Bezoekers kochten hun
            tickets rechtstreeks online, betaalden meteen, en het systeem verwerkte de verkoop op
            de dag zelf.
          </p>
        </div>
      </section>

      {/* ── Werking stapsgewijs ── */}
      <section className="mx-auto max-w-4xl px-6 pt-14 pb-16 md:pt-16 md:pb-20">
        <p className="fc-mono mb-3 text-[11px] uppercase tracking-[0.3em] text-[#B45F38]">
          Hoe het werkte
        </p>
        <h2
          className="mb-10 max-w-xl text-2xl leading-[1.1] text-[#2A2218] sm:text-3xl"
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
        >
          Vier stappen, van ticket kopen tot verwerkte verkoop.
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
            Live gedraaid voor een echt evenement, van ticketverkoop tot betaling.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#6E6151]">
            Gebouwd voor Köningsdag in Reusel, met een harde deadline en een concrete
            bezoekersgroep. Geen proefopstelling, gewoon in gebruik op de dag zelf.
          </p>
        </div>
      </section>

      {/* ── Sfeercollage van het echte evenement (weergave, John's keuze) ── */}
      <section className="mx-auto max-w-4xl px-6 pb-16 md:pb-20">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2px] border border-[#E4D8C6]">
          <Image
            src="/images/cases/koningsdag-sfeer-collage.jpg"
            alt="Sfeercollage van het Vorstelijk Verwenfestijn in Reusel"
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>
        <p className="fc-mono mt-3 text-[10px] uppercase tracking-[0.2em] text-[#6E6151]">
          Het Vorstelijk Verwenfestijn, Köningsdag Reusel
        </p>
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
            Ook een evenement of ticketverkoop die geregeld moet worden?
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
