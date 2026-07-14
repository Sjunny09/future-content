import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ScanLine,
  Check,
  ShieldCheck,
  Mail,
  Clock,
} from "lucide-react";
import Wordmark from "@/components/common/Wordmark";
import {
  SITE,
  AI_WEDGES,
  AI_PRIJS_TRAP,
  AI_GARANTIE,
} from "@/lib/constants";

// Wedge-landingspagina (/ai/[wedge]). Data-gedreven uit AI_WEDGES: nieuwe wedge
// = een object in constants, pagina + sitemap volgen vanzelf. Server-rendered
// (volledig SSR). Hormozi-volgorde: hero -> probleem (met agitatie + cost of
// inaction) -> mechanisme -> bewijs -> garantie -> prijs (met waarde-anker + CTA)
// -> FAQ -> cluster -> close. CTA: de gratis scan. Rechte hoeken conform huisstijl.

type Props = {
  params: Promise<{ wedge: string }>;
};

export default async function WedgePage({ params }: Props) {
  const { wedge: slug } = await params;
  const wedge = AI_WEDGES.find((w) => w.slug === slug);
  if (!wedge) notFound();

  const andere = AI_WEDGES.filter((w) => w.slug !== wedge.slug);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "serviceType": "AI-automatisering voor MKB",
        "name": wedge.kicker,
        "provider": { "@id": `${SITE.url}/#business` },
        "areaServed": ["Noord-Brabant", "De Kempen", "Eindhoven", "Tilburg", "Bladel"],
        "url": `${SITE.url}/ai/${wedge.slug}`,
        "description": wedge.belofte,
      },
      {
        "@type": "FAQPage",
        "mainEntity": wedge.faq.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "AI voor MKB", item: `${SITE.url}/ai` },
          { "@type": "ListItem", position: 3, name: wedge.kicker, item: `${SITE.url}/ai/${wedge.slug}` },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#2A2218] text-[#F3ECE0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ── Mini-topbar ── */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 md:px-8">
        <Link href="/ai" aria-label="Terug naar AI voor MKB" className="group flex items-center gap-2">
          <ArrowRight size={15} className="rotate-180 text-[#B45F38] transition-transform group-hover:-translate-x-1" />
          <Wordmark theme="dark" className="text-base" showCaret={false} />
        </Link>
        <Link
          href="/scan"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#B45F38] px-4 py-2 text-xs font-semibold text-[#F3ECE0] transition-colors hover:bg-[#9E3D24]"
        >
          <ScanLine size={14} />
          <span className="hidden sm:inline">Gratis AI-scan</span>
        </Link>
      </header>

      {/* ── Hero (BLUF) ── */}
      <section className="w-full px-6 pb-16 pt-32 md:px-12 md:pb-20 md:pt-40 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <p className="fc-mono mb-5 text-[11px] uppercase tracking-[0.3em] text-[#B45F38]">
            {wedge.kicker} · Brabant
          </p>
          <h1
            className="text-[2.1rem] leading-[1.05] text-[#F3ECE0] sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            {wedge.h1}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#F3ECE0]/70 md:text-lg">
            {wedge.belofte}
          </p>
          <div className="mt-9 flex flex-col items-start gap-3">
            <Link
              href="/scan"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B45F38] px-7 py-4 text-sm font-semibold text-[#F3ECE0] transition-colors hover:bg-[#9E3D24]"
            >
              Doe de gratis AI-scan
              <ArrowRight size={16} />
            </Link>
            <p className="text-xs text-[#F3ECE0]/45">
              Gratis, geen verplichting. Je vult je website in, ik stuur meestal binnen 24 uur een persoonlijke video terug.{" "}
              <Link href="/boek" className="text-[#F3ECE0]/70 underline decoration-[#B45F38]/40 underline-offset-2 hover:text-[#B45F38]">
                Liever eerst even bellen?
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── Probleem (agitatie + cost of inaction) ── */}
      <section className="border-t border-[#F3ECE0]/8 bg-[#221C14] px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="fc-mono mb-4 text-[11px] uppercase tracking-[0.3em] text-[#B45F38]">
            Herken je dit
          </p>
          <h2
            className="max-w-2xl text-3xl leading-[1.08] sm:text-4xl"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            {wedge.pijnKop}
          </h2>
          <ul className="mt-10 space-y-3">
            {wedge.pijn.map((pijn, i) => (
              <li key={i} className="flex gap-3 text-[#F3ECE0]/80">
                <Mail size={17} className="mt-0.5 shrink-0 text-[#B45F38]/70" />
                <span className="leading-relaxed">{pijn}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl leading-relaxed text-[#F3ECE0]/60">{wedge.pijnKost}</p>
        </div>
      </section>

      {/* ── Mechanisme ── */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="fc-mono mb-4 text-[11px] uppercase tracking-[0.3em] text-[#B45F38]">
            Er is een betere manier
          </p>
          <h2
            className="max-w-2xl text-3xl leading-[1.08] sm:text-4xl"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            Zo pak ik het aan.
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-[#F3ECE0]/70">{wedge.mechanisme}</p>
        </div>
      </section>

      {/* ── Bewijs ── */}
      <section className="border-t border-[#F3ECE0]/8 bg-[#221C14] px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="fc-mono mb-4 text-[11px] uppercase tracking-[0.3em] text-[#B45F38]">
            Waarom mij
          </p>
          <h2
            className="max-w-2xl text-3xl leading-[1.08] sm:text-4xl"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            Ik bouw het en laat het zien.
          </h2>
          <p className="mt-6 leading-relaxed text-[#F3ECE0]/70">{wedge.bewijs}</p>
          <p className="mt-4 leading-relaxed text-[#F3ECE0]/70">
            Ik ben ondernemer, geen dure consultant. Ik kom uit de buurt, ik praat je
            taal, en ik bouw met AI in uren wat elders weken kost. Daardoor is het
            betaalbaar én blijft het van jou.
          </p>
        </div>
      </section>

      {/* ── Garantie (Playfair-statement, gelijk aan /ai) ── */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[2px] border border-[#B45F38]/30 bg-[#B45F38]/10 p-8 md:p-12">
            <div className="mb-4 inline-flex items-center gap-2 text-[#B45F38]">
              <ShieldCheck size={20} />
              <span className="fc-mono text-[11px] uppercase tracking-[0.3em]">De Tijd-terug-garantie</span>
            </div>
            <p className="text-xl leading-snug text-[#F3ECE0] md:text-2xl" style={{ fontFamily: "var(--font-playfair)" }}>
              {AI_GARANTIE}
            </p>
          </div>
        </div>
      </section>

      {/* ── Prijstrap (met waarde-anker + CTA) ── */}
      <section className="bg-[#F3ECE0] px-6 py-20 text-[#2A2218] md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="fc-mono mb-4 text-[11px] uppercase tracking-[0.3em] text-[#B45F38]">
            Wat je betaalt
          </p>
          <h2 className="text-3xl leading-[1.08] sm:text-4xl" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}>
            Je begint gratis.
          </h2>
          <div className="mt-6 rounded-[2px] border-l-2 border-[#B45F38] bg-[#ECE2D2] p-6">
            <p className="leading-relaxed text-[#2A2218]">{wedge.waardeZin}</p>
          </div>
          <p className="mt-6 max-w-2xl leading-relaxed text-[#6E6151]">
            Geen groot bedrag vooraf. Je betaalt pas voor de bouw als je de werkende
            proef hebt zien werken. Die gaat er daarna volledig van af.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {AI_PRIJS_TRAP.map((trede) => (
              <div key={trede.stap} className="rounded-[2px] border border-[#E4D8C6] bg-[#FBF8F2] p-6">
                <div className="flex items-baseline justify-between">
                  <span className="fc-mono text-xs text-[#B45F38]">Stap {trede.stap}</span>
                  <span className="font-bold text-[#B45F38]">{trede.prijs}</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-[#2A2218]" style={{ fontFamily: "var(--font-playfair)" }}>
                  {trede.naam}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[#6E6151]">{trede.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/scan"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B45F38] px-8 py-4 text-sm font-semibold text-[#F3ECE0] transition-colors hover:bg-[#9E3D24]"
            >
              <ScanLine size={17} /> Begin met de gratis scan
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-[#F3ECE0]/8 bg-[#221C14] px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="fc-mono mb-4 text-[11px] uppercase tracking-[0.3em] text-[#B45F38]">
            Veelgestelde vragen
          </p>
          <h2 className="text-3xl leading-[1.08] sm:text-4xl" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}>
            Goed om te weten.
          </h2>
          <div className="mt-10 space-y-3">
            {wedge.faq.map((faq, i) => (
              <details key={i} className="group rounded-[2px] border border-[#F3ECE0]/10 bg-[#2A2218] p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-[#F3ECE0]">
                  {faq.q}
                  <span className="ml-4 text-lg leading-none text-[#B45F38] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-[#F3ECE0]/65">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cluster: andere wedges + terug naar de inbox ── */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="fc-mono mb-4 text-[11px] uppercase tracking-[0.3em] text-[#B45F38]">
            Meer dat vanzelf kan
          </p>
          <h2 className="max-w-2xl text-3xl leading-[1.08] sm:text-4xl" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}>
            Hetzelfde principe, een ander stuk werk.
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              href="/ai"
              className="group flex items-center justify-between gap-4 rounded-[2px] border border-[#F3ECE0]/10 bg-[#221C14] p-5 transition-colors hover:border-[#B45F38]/40"
            >
              <div>
                <p className="font-semibold text-[#F3ECE0]">AI voor je klantenservice-inbox</p>
                <p className="mt-0.5 text-sm text-[#F3ECE0]/55">De inbox die zichzelf beantwoordt. Waar het begint.</p>
              </div>
              <ArrowRight size={18} className="shrink-0 text-[#F3ECE0]/50 transition-transform group-hover:translate-x-1" />
            </Link>
            {andere.map((w) => (
              <Link
                key={w.slug}
                href={`/ai/${w.slug}`}
                className="group flex items-center justify-between gap-4 rounded-[2px] border border-[#F3ECE0]/10 bg-[#221C14] p-5 transition-colors hover:border-[#B45F38]/40"
              >
                <div>
                  <p className="font-semibold text-[#F3ECE0]">{w.kicker}</p>
                  <p className="mt-0.5 text-sm text-[#F3ECE0]/55">{w.oneliner}</p>
                </div>
                <ArrowRight size={18} className="shrink-0 text-[#F3ECE0]/50 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Close ── */}
      <section className="border-t border-[#F3ECE0]/8 bg-[#221C14] px-6 py-20 text-center md:py-28">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl leading-[1.08] sm:text-5xl" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}>
            Zie eerst wat het je oplevert.
          </h2>
          <p className="mx-auto mt-5 max-w-lg leading-relaxed text-[#F3ECE0]/60">
            De scan is gratis en kost je een paar minuten. Daarna weet je precies wat
            AI hier voor jou kan doen.
          </p>
          <div className="mt-9 flex justify-center">
            <Link
              href="/scan"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B45F38] px-8 py-4 text-sm font-semibold text-[#F3ECE0] transition-colors hover:bg-[#9E3D24]"
            >
              <ScanLine size={17} /> Doe de gratis AI-scan
            </Link>
          </div>
          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-[#F3ECE0]/45">
            <Clock size={13} /> Meestal binnen 24 uur een persoonlijke video terug. Geen verplichting.
          </p>
        </div>
      </section>

      {/* ── Mini-footer ── */}
      <footer className="border-t border-[#F3ECE0]/5 px-6 py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <Wordmark theme="dark" className="text-base" />
          <p className="fc-mono text-xs text-[#F3ECE0]/40">
            {SITE.email} · {SITE.phone} · KvK {SITE.kvk}
          </p>
          <p className="fc-mono text-xs text-[#F3ECE0]/40">
            <Link href="/voorwaarden" className="hover:text-[#B45F38]">Voorwaarden</Link>
            {" · "}
            <Link href="/privacy" className="hover:text-[#B45F38]">Privacy</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
