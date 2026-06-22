import Link from "next/link";
import { ScanLine, CalendarCheck, ArrowRight, Film } from "lucide-react";

// Minimale AI-landing (launch-versie). De volledige site staat op branch
// `volledige-site`. Donkere hero zodat de transparante nav leesbaar blijft.

const WAARDE = [
  {
    t: "Eerst kijken waar tijd weglekt",
    d: "Ik kom niet met een tool maar met een vraag: welk werk komt elke week terug en kost de meeste tijd. Daar bouw ik op.",
  },
  {
    t: "Op jouw eigen processen",
    d: "AI is generiek. Ik maak het van jou: een laag bovenop hoe jij al werkt, zodat het je bedrijf snapt.",
  },
  {
    t: "Geregeld, ook zonder mij",
    d: "Wat ik bouw blijft van jou en is overdraagbaar. Voor grotere klussen werk ik samen met Bram als achtervang.",
  },
];

// John's AI-logo als schone transparante SVG (nagebouwd uit zijn ontwerp).
function FutureContentLogo({ className }: { className?: string }) {
  const blauw = "oklch(0.76 0.15 232)"
  return (
    <svg
      viewBox="180 240 980 430"
      className={className}
      role="img"
      aria-label="Future Content, think now build tomorrow"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text x="200" y="370" fontFamily="Helvetica, Arial, sans-serif" fontWeight={900} fontSize={150} letterSpacing={-4} fill="#FAFAF8">
        FUTURE
      </text>
      <text x="200" y="520" fontFamily="Helvetica, Arial, sans-serif" fontWeight={300} fontSize={150} letterSpacing={-2} fill="#FAFAF8">
        CONTENT
      </text>
      <rect x="930" y="408" width="60" height="22" fill={blauw} />
      <rect x="200" y="560" width="640" height="4" fill={blauw} />
      <text x="200" y="630" fontFamily="Helvetica, Arial, sans-serif" fontWeight={400} fontSize={40} letterSpacing={12} fill="#B9B9C0">
        THINK NOW, BUILD TOMORROW
      </text>
    </svg>
  )
}

export default function HomeAI() {
  return (
    <>
      {/* ─── Hero (donker) ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#14140F] text-[#FAFAF8]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A18] via-[#14140F] to-[#0F0F0D]" />
        <div
          className="absolute -top-40 right-0 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, #C9A96E55 0%, transparent 70%)" }}
        />
        <div className="relative max-w-5xl mx-auto px-6 pt-40 pb-28 md:pt-48 md:pb-36">
          <h1 className="sr-only">
            Future Content, AI en automatisering. Think now, build tomorrow.
          </h1>
          <FutureContentLogo className="h-auto w-full max-w-[300px] sm:max-w-[400px] md:max-w-[460px]" />
          <p className="mt-7 text-lg md:text-xl text-[#FAFAF8]/70 max-w-2xl leading-relaxed">
            Wat je vandaag verzint, kan morgen al staan. Ik bouw AI en automatisering voor
            MKB-bedrijven, op je eigen processen. Geen hype, wel werk dat tijd bespaart.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/scan"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#C9A96E] text-[#1A1A18] font-semibold hover:bg-[#d8bd87] transition-colors"
            >
              <ScanLine size={18} /> Doe de gratis AI-Quickscan
            </Link>
            <Link
              href="/boek"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-[#FAFAF8]/25 text-[#FAFAF8] font-semibold hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
            >
              <CalendarCheck size={18} /> Plan een gesprek
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Wat ik doe ────────────────────────────────────────────── */}
      <section className="bg-[#FAFAF8]">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-3 gap-8">
            {WAARDE.map((w, i) => (
              <div key={w.t}>
                <span className="text-[#C9A96E] text-sm font-bold">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold text-[#1A1A18]">{w.t}</h3>
                <p className="mt-2 text-[#6B7280] text-sm leading-relaxed">{w.d}</p>
              </div>
            ))}
          </div>

          {/* Quickscan-uitlichting */}
          <div className="mt-16 rounded-3xl bg-[#1A1A18] text-[#FAFAF8] p-10 md:p-14">
            <div className="grid md:grid-cols-[1.3fr_0.7fr] gap-8 items-center">
              <div>
                <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
                  Gratis, een kwartier werk
                </span>
                <h2
                  className="mt-4 text-3xl md:text-4xl font-semibold leading-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  De AI-Quickscan
                </h2>
                <p className="mt-4 text-[#FAFAF8]/70 leading-relaxed max-w-lg">
                  Vul je bedrijf en website in, beantwoord zes vragen, en je krijgt een helder
                  overzicht: hier kan AI in jouw bedrijf tijd of omzet opleveren. Geen verplichtingen.
                </p>
              </div>
              <Link
                href="/scan"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#C9A96E] text-[#1A1A18] font-semibold hover:bg-[#d8bd87] transition-colors"
              >
                Start de scan <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Naar Film ─────────────────────────────────────────────── */}
      <section className="bg-[#F5F1EB] border-t border-[#E5E0D8]">
        <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#1A1A18] text-lg" style={{ fontFamily: "var(--font-playfair)" }}>
            Ook video nodig? Shoot now, content later.
          </p>
          <Link
            href="/film"
            className="inline-flex items-center gap-2 text-[#1A1A18] font-semibold hover:text-[#C9A96E] transition-colors"
          >
            <Film size={18} /> Bekijk Film <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
