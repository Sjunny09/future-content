"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ScanLine,
  CalendarCheck,
  Clapperboard,
  Check,
  ShieldCheck,
  Mail,
  Clock,
  MessageCircle,
} from "lucide-react";
import Wordmark from "@/components/common/Wordmark";
import Cases from "@/components/sections/Cases";
import {
  SITE,
  AI_COMPARE,
  AI_INBOX_PIJN,
  AI_INBOX_STACK,
  AI_INBOX_ROI,
  AI_WEDGES,
  AI_PRIJS_TRAP,
  PRIJZEN,
} from "@/lib/constants";

// /ai is de inbox-wedge landingspagina (Hormozi-structuur). De wedge is de
// klantenservice-inbox; de breedte (offertes, chatbot, administratie, planning)
// staat bewust ná de garantie/prijs, zodat de scherpe focus vooraan blijft.
// Eén hoofd-actie: de gratis AI-scan (/scan). Toon: John, nuchter, correct
// Nederlands, geen em-dashes, geen hype, geen verzonnen waarde-bedragen.
// Skin: AI-skin donker; rechte hoeken (rounded-[2px]) conform het huisstijlhandboek.

// FAQ (inbox). Voedt de zichtbare FAQ én de FAQPage JSON-LD.
const AI_FAQ = [
  {
    q: "Geeft de AI geen botte of domme antwoorden?",
    a: "Hij beantwoordt alleen wat hij zeker weet, de standaardvragen. Alles waarover twijfel bestaat of wat belangrijk is, komt bij jou. Jij houdt de regie, de AI ruimt de ruis op. En in de startfase keur je alles goed vóór het naar je klant gaat.",
  },
  {
    q: "Verlies ik dan niet het persoonlijke contact?",
    a: "Andersom. Nu ben je zo druk met standaardmail dat je voor de echte gesprekken geen tijd hebt. Als de AI het routinewerk doet, houd jij tijd over voor de klant die er echt toe doet.",
  },
  {
    q: "Is dit niet gewoon Copilot of Gemini in mijn mail?",
    a: "Die helpen jóu sneller typen: jij zit nog steeds in elke mail en vraagt de AI om een concept. Handig, maar het werk blijft bij jou. Wat ik bouw is een stap verder: een systeem dat getraind is op jouw bedrijf en gekoppeld aan je eigen processen, dat de standaardvragen zelf afhandelt en alleen escaleert wat aandacht nodig heeft. Geen assistent die je bedient, maar werk dat uit handen gaat. En ik bouw en beheer het, jij hoeft niks te leren.",
  },
  {
    q: "Moet ik er zelf iets voor leren of technisch aanleggen?",
    a: "Nee. Ik bouw het, ik zet het aan, ik onderhoud het. Jij krijgt een inbox die vanzelf werkt. Geen dashboard om bij te houden, geen cursus.",
  },
  {
    q: "Werkt dit wel voor mijn soort bedrijf?",
    a: "Meestal blijkt dat een groot deel van je vragen dezelfde paar vragen zijn, alleen in andere woorden. Met de scan en de werkende proef lees ik een tijdje mee en laat ik je zwart-op-wit zien welke vragen de AI meteen kan overnemen. Kan hij dat niet, dan hoor je dat gewoon van me.",
  },
  {
    q: "Hoe zit het met de veiligheid van mijn klantdata?",
    a: "Je data blijft van jou en gaat niet zomaar het internet op. Ik richt het zo in dat het binnen de AVG past, net zoals dat nu ook al moet voor je gewone mail. Ik leg je in gewone taal uit wat waar staat.",
  },
  {
    q: "Wat kost het?",
    a: "Je begint met de gratis AI-scan. Daarna een werkende proef van €750 op je echte inbox, waarmee ik bewijs dat het werkt. Dat bedrag gaat er volledig af als je doorgaat, dus netto kost de proef je niets. De bouw is maatwerk: gescoped na de proef, tussen €2.500 en €8.500, plus een maandbedrag vanaf €250 voor beheer en doorontwikkeling.",
  },
  {
    q: "Hoe snel heb ik iets werkend?",
    a: "De werkende proef draait op je echte inbox, dus je ziet het snel werken. De eerste versie staat doorgaans binnen ongeveer twee weken live.",
  },
  {
    q: "Wat als het bij mij niet werkt?",
    a: "Dan draag jij het risico niet. Neemt de AI na 30 dagen niet minstens de helft van je standaardvragen zelfstandig over, zwart-op-wit gemeten in je eigen inbox, dan werk ik gratis door tot dat wel zo is, of je krijgt je bouwbedrag terug.",
  },
];

export default function AiPage() {
  const waLink = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    "Hallo John, ik wil graag meer weten over AI voor mijn inbox."
  )}`;

  const aiSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "serviceType": "AI-automatisering voor MKB",
        "name": "Klantenservice-inbox automatiseren met AI",
        "provider": { "@id": `${SITE.url}/#business` },
        "areaServed": ["Noord-Brabant", "De Kempen", "Eindhoven", "Tilburg", "Bladel"],
        "url": `${SITE.url}/ai`,
        "description":
          "Future Content bouwt en beheert AI die je klantenservice-inbox overneemt: klantvragen meteen beantwoord in jouw toon, dag en nacht, zonder dat het jou of je mensen tijd kost. Done-for-you voor MKB-bedrijven in Noord-Brabant, vanuit Bladel.",
      },
      {
        "@type": "FAQPage",
        "mainEntity": AI_FAQ.map((f) => ({
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
        ],
      },
    ],
  };

  return (
    <div className="bg-[#2A2218] text-[#F3ECE0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aiSchema) }}
      />

      {/* ── Mini-topbar (eigen chrome; globale nav is hier verborgen) ── */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" aria-label="Terug naar de poort" className="group flex items-center gap-2">
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

      {/* ── 1. HERO: de belofte (droom + pijnverlichting, BLUF) ── */}
      <section className="relative w-full px-6 pb-16 pt-32 md:px-12 md:pb-20 md:pt-40 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl"
        >
          <p className="fc-mono mb-5 text-[11px] uppercase tracking-[0.3em] text-[#B45F38]">
            AI voor MKB · Brabant
          </p>
          <h1
            className="text-[2.1rem] leading-[1.05] text-[#F3ECE0] sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            Nooit meer &apos;s avonds je klantmail wegwerken.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#F3ECE0]/70 md:text-lg">
            Ik bouw een AI die je klantenservice-inbox overneemt: klantvragen meteen
            beantwoord in jouw toon, dag en nacht. Jij houdt tijd over, je klanten
            krijgen sneller antwoord. Ik bouw het en houd het draaiend, jij hoeft geen
            technische kennis te hebben.
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

          {/* bewijs-strip: systeem-eigenschappen, eerlijk (geen resultaat-claims) */}
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#F3ECE0]/10 pt-6 text-sm text-[#F3ECE0]/60">
            <span className="inline-flex items-center gap-2"><Check size={14} className="text-[#B45F38]" /> Getraind op jouw toon</span>
            <span className="inline-flex items-center gap-2"><Check size={14} className="text-[#B45F38]" /> Jij keurt goed vóór verzenden</span>
            <span className="inline-flex items-center gap-2"><Check size={14} className="text-[#B45F38]" /> Ik bouw én beheer het</span>
          </div>
        </motion.div>
      </section>

      {/* ── 2. PROBLEEM: benoem en agiteer ── */}
      <section className="border-t border-[#F3ECE0]/8 bg-[#221C14] px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="fc-mono mb-4 text-[11px] uppercase tracking-[0.3em] text-[#B45F38]">
            Herken je dit
          </p>
          <h2
            className="max-w-2xl text-3xl leading-[1.08] sm:text-4xl"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            De inbox is geen mailtje. Het is omzet die ligt te wachten.
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-[#F3ECE0]/60">
            Wie als eerste reageert, wint vaak de klant. Toch komt een groot deel van
            de aanvragen binnen als jij aan het eten zit of de zaak dicht is. Een
            aanvraag die een dag blijft liggen, is vaak een offerte minder.
          </p>

          <ul className="mt-10 space-y-3">
            {AI_INBOX_PIJN.map((pijn, i) => (
              <li key={i} className="flex gap-3 text-[#F3ECE0]/80">
                <Mail size={17} className="mt-0.5 shrink-0 text-[#B45F38]/70" />
                <span className="leading-relaxed">{pijn}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-2xl leading-relaxed text-[#F3ECE0]/60">
            Reken zelf uit wat één klant je gemiddeld oplevert. Hoeveel van die
            mailtjes lieten vorige maand een dag op antwoord wachten?
          </p>
        </div>
      </section>

      {/* ── 3. MECHANISME: er is een betere manier ── */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="fc-mono mb-4 text-[11px] uppercase tracking-[0.3em] text-[#B45F38]">
            Er is een betere manier
          </p>
          <h2
            className="max-w-2xl text-3xl leading-[1.08] sm:text-4xl"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            Geen slimme hulp die jóu sneller laat typen. Werk dat uit handen gaat.
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-[#F3ECE0]/70">
            De assistenten in Outlook en Gmail helpen je met een concept, maar jij zit
            nog steeds in elke mail. Handig, alleen blijft het werk bij jou. Wat ik bouw
            gaat een stap verder: een AI-inbox die is getraind op jouw eigen prijzen,
            diensten en veelgestelde vragen, en die de standaardvragen zelf afhandelt.
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-[#F3ECE0]/70">
            Gekoppeld aan je eigen systemen, in jouw toon, en alles wat aandacht nodig
            heeft komt nog steeds bij jou. Ik bouw het, ik koppel het, ik beheer het.
            Jij hoeft er niet in en houdt de regie.
          </p>
        </div>
      </section>

      {/* ── 4. WAT JE KRIJGT + het eerlijke ROI-anker (geen verzonnen bedragen) ── */}
      <section className="bg-[#F3ECE0] px-6 py-20 text-[#2A2218] md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="fc-mono mb-4 text-[11px] uppercase tracking-[0.3em] text-[#B45F38]">
            Wat je krijgt
          </p>
          <h2 className="text-3xl leading-[1.08] sm:text-4xl" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}>
            Alles om je inbox uit handen te geven.
          </h2>

          <div className="mt-10 space-y-3">
            {AI_INBOX_STACK.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-[2px] border border-[#E4D8C6] bg-[#FBF8F2] p-5"
              >
                <Check size={18} className="mt-0.5 shrink-0 text-[#B45F38]" />
                <div>
                  <p className="font-semibold text-[#2A2218]">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#6E6151]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[2px] border-l-2 border-[#B45F38] bg-[#ECE2D2] p-6">
            <p className="leading-relaxed text-[#2A2218]">{AI_INBOX_ROI}</p>
          </div>
        </div>
      </section>

      {/* ── 6. BEWIJS: waarom het bij jou werkt ── */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="fc-mono mb-4 text-[11px] uppercase tracking-[0.3em] text-[#B45F38]">
            Waarom mij
          </p>
          <h2
            className="max-w-2xl text-3xl leading-[1.08] sm:text-4xl"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            Ik verkoop geen software. Ik bouw het en laat het zien.
          </h2>
          <div className="mt-8 space-y-5 text-[#F3ECE0]/70">
            <p className="leading-relaxed">
              Ik bewijs het met mijn eigen bedrijf: mijn hele administratie, facturen
              en leads draaien al maanden op een AI-systeem dat ik zelf bouwde. En ik
              zet dit soort systemen nu ook op voor een transportbedrijf in Brabant.
            </p>
            <p className="leading-relaxed">
              Ik ben ondernemer, geen dure consultant. Ik kom uit de buurt, ik praat je
              taal, en ik bouw met AI in uren wat elders weken kost. Daardoor is het
              betaalbaar én blijft het van jou.
            </p>
          </div>
        </div>
      </section>

      {/* Cases: compacte variant, twee echte voorbeelden */}
      <Cases compact />

      {/* ── 7. GARANTIE: keer het risico om (meetbaar, gegrond op eigen bedrijf) ── */}
      <section className="border-t border-[#F3ECE0]/8 bg-[#221C14] px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[2px] border border-[#B45F38]/30 bg-[#B45F38]/10 p-8 md:p-12">
            <div className="mb-4 inline-flex items-center gap-2 text-[#B45F38]">
              <ShieldCheck size={20} />
              <span className="fc-mono text-[11px] uppercase tracking-[0.3em]">De Tijd-terug-garantie</span>
            </div>
            <p className="text-xl leading-snug text-[#F3ECE0] md:text-2xl" style={{ fontFamily: "var(--font-playfair)" }}>
              Neemt de AI na 30 dagen niet minstens de helft van je standaardvragen
              zelfstandig over, zwart-op-wit gemeten in je eigen inbox, dan werk ik
              gratis door tot dat wel zo is, of je krijgt je bouwbedrag terug.
            </p>
            <p className="mt-4 leading-relaxed text-[#F3ECE0]/60">
              Ik durf dat omdat mijn eigen bedrijf al maanden op dit soort systemen
              draait. Het risico ligt bij mij, niet bij jou.
            </p>
          </div>
        </div>
      </section>

      {/* ── 8. PRIJS-TRAP ── */}
      <section className="bg-[#F3ECE0] px-6 py-20 text-[#2A2218] md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="fc-mono mb-4 text-[11px] uppercase tracking-[0.3em] text-[#B45F38]">
            Wat je betaalt
          </p>
          <h2 className="text-3xl leading-[1.08] sm:text-4xl" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}>
            Je begint gratis en betaalt trede voor trede.
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-[#6E6151]">
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

          <p className="mt-6 text-sm text-[#6E6151]">
            Ik neem per maand een beperkt aantal bouw-trajecten aan, want ik bouw alles zelf.
          </p>

          <div className="mt-8 text-center">
            <Link
              href="/scan"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B45F38] px-8 py-4 text-sm font-semibold text-[#F3ECE0] transition-colors hover:bg-[#9E3D24]"
            >
              <ScanLine size={17} /> Begin met de gratis scan
            </Link>
            <p className="mt-3 text-xs text-[#6E6151]">
              Als de werkende proef je alleen al je avonden teruggeeft, had je de €{PRIJZEN.proofOfConcept} er al uit.
            </p>
          </div>
        </div>
      </section>

      {/* ── 9. VERGELIJKING: zelf doen of laten bouwen (eigen oppervlak) ── */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="fc-mono mb-4 text-[11px] uppercase tracking-[0.3em] text-[#B45F38]">
            Zelf doen of laten bouwen
          </p>
          <h2
            className="max-w-2xl text-3xl leading-[1.08] sm:text-4xl"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            Waarom niet gewoon zelf, of een bureau?
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-[#F3ECE0]/60">
            Er zijn meer wegen. Dit is het eerlijke verschil, zodat je kunt kiezen wat bij je past.
          </p>

          <div className="mt-10 overflow-x-auto rounded-[2px] border border-[#F3ECE0]/10">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="bg-[#B45F38]/15 text-[#F3ECE0]">
                  <th className="px-5 py-4 text-left font-semibold">Aanpak</th>
                  <th className="px-5 py-4 text-left font-semibold">Jouw tijd</th>
                  <th className="px-5 py-4 text-left font-semibold">Wie beheert het</th>
                  <th className="px-5 py-4 text-left font-semibold">Past op jouw bedrijf</th>
                </tr>
              </thead>
              <tbody>
                {AI_COMPARE.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-t border-[#F3ECE0]/10 ${
                      row.personal ? "bg-[#B45F38]/10" : "bg-[#221C14]"
                    }`}
                  >
                    <td className="px-5 py-4 font-medium text-[#F3ECE0]">
                      {row.personal && (
                        <ShieldCheck size={14} className="mr-1.5 inline text-[#B45F38]" />
                      )}
                      {row.name}
                    </td>
                    <td className="px-5 py-4 text-[#F3ECE0]/70">{row.effort}</td>
                    <td className="px-5 py-4 text-[#F3ECE0]/70">{row.beheer}</td>
                    <td
                      className={`px-5 py-4 ${
                        row.personal ? "font-medium text-[#B45F38]" : "text-[#F3ECE0]/70"
                      }`}
                    >
                      {row.personal ? (
                        <span className="inline-flex items-center gap-1.5">
                          <Check size={14} className="shrink-0" />
                          {row.fit}
                        </span>
                      ) : (
                        row.fit
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 10. BREEDTE: en dit is nog maar het begin (ná garantie/prijs) ── */}
      <section className="border-t border-[#F3ECE0]/8 bg-[#221C14] px-6 py-20 md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="fc-mono mb-4 text-[11px] uppercase tracking-[0.3em] text-[#B45F38]">
            De inbox is het begin
          </p>
          <h2
            className="max-w-2xl text-3xl leading-[1.08] sm:text-4xl"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            Hetzelfde principe werkt overal waar je tijd verliest aan herhaald werk.
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-[#F3ECE0]/60">
            We beginnen bij je inbox, want daar voel je de pijn het hardst en zie je
            het snelst resultaat. Werkt dat, dan is de vraag niet óf, maar wanneer we
            de rest aanpakken.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {AI_WEDGES.map((wedge) => (
              <Link
                key={wedge.slug}
                href={`/ai/${wedge.slug}`}
                className="group flex items-center justify-between gap-4 rounded-[2px] border border-[#F3ECE0]/10 bg-[#2A2218] p-5 transition-colors hover:border-[#B45F38]/40"
              >
                <div>
                  <p className="font-semibold text-[#F3ECE0]">{wedge.kicker}</p>
                  <p className="mt-0.5 text-sm text-[#F3ECE0]/55">{wedge.oneliner}</p>
                </div>
                <ArrowRight size={18} className="shrink-0 text-[#F3ECE0]/50 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. FAQ ── */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="fc-mono mb-4 text-[11px] uppercase tracking-[0.3em] text-[#B45F38]">
            Veelgestelde vragen
          </p>
          <h2
            className="text-3xl leading-[1.08] sm:text-4xl"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            Wat MKB&apos;ers meestal willen weten.
          </h2>

          <div className="mt-10 space-y-3">
            {AI_FAQ.map((faq, i) => (
              <details
                key={i}
                className="group rounded-[2px] border border-[#F3ECE0]/10 bg-[#221C14] p-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-[#F3ECE0]">
                  {faq.q}
                  <span className="ml-4 text-lg leading-none text-[#B45F38] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-[#F3ECE0]/65">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. CLOSE: bekrachtig de keuze ── */}
      <section className="border-t border-[#F3ECE0]/8 bg-[#221C14] px-6 py-20 text-center md:py-28">
        <div className="mx-auto max-w-2xl">
          <h2
            className="text-3xl leading-[1.08] sm:text-5xl"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
          >
            Leg vanavond je telefoon een keer weg.
          </h2>
          <p className="mx-auto mt-5 max-w-lg leading-relaxed text-[#F3ECE0]/60">
            De scan is gratis en kost je een paar minuten. Daarna weet je precies wat
            AI in jouw inbox kan doen. Geen verplichting, geen verkooppraat.
          </p>
          <div className="mt-9 flex justify-center">
            <Link
              href="/scan"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B45F38] px-8 py-4 text-sm font-semibold text-[#F3ECE0] transition-colors hover:bg-[#9E3D24]"
            >
              <ScanLine size={17} /> Doe de gratis AI-scan
            </Link>
          </div>
          <p className="mt-4 text-xs text-[#F3ECE0]/45">
            <Clock size={13} className="mr-1 inline" /> Meestal binnen 24 uur een persoonlijke video terug.{" "}
            <Link href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#F3ECE0]/70 underline decoration-[#B45F38]/40 underline-offset-2 hover:text-[#B45F38]">
              <MessageCircle size={12} /> Of app mij direct
            </Link>
          </p>
        </div>
      </section>

      {/* ── Brug naar de andere wereld ── */}
      <section className="border-t border-[#F3ECE0]/8 bg-[#2A2218] px-6 py-16">
        <Link
          href="/film"
          className="group mx-auto flex max-w-5xl items-center justify-between gap-6 rounded-[2px] border border-[#F3ECE0]/10 bg-[#F3ECE0]/[0.03] p-7 transition-colors hover:border-[#B45F38]/40"
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
