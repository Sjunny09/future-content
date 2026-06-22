"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Hammer, MapPin, Eye, Scale } from "lucide-react";
import { PHOTOS } from "@/lib/constants";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const PRINCIPLES = [
  {
    icon: <Hammer size={20} />,
    t: "Ik bouw, ik praat niet alleen",
    d: "Geen PowerPoint vol beloftes. Ik laat aan tafel zien wat werkt en bouw het dan voor je. Modulair platform, branche-skin, eenmalige bouw plus maandelijks beheer met dashboard.",
  },
  {
    icon: <MapPin size={20} />,
    t: "Lokaal, ik kom langs vanaf de intake",
    d: "Ik zit in Bladel, midden in de Kempen. Eerste gesprek 30 minuten online. Vanaf de intake of de workshop kom ik langs in de Kempen, Eindhoven, Tilburg, Breda.",
  },
  {
    icon: <Eye size={20} />,
    t: "Eerlijk, geen hype",
    d: "Ik beloof geen wonderen. Soms is mijn advies: dit doe je beter zelf met een goeie ChatGPT-prompt. Dan stuur ik je dat ook.",
  },
  {
    icon: <Scale size={20} />,
    t: "Geregeld, ook zonder mij",
    d: "Alles wat ik bouw is overdraagbaar. Geen 'alleen John kan dit ontwarren'. Voor grotere opdrachten en als achtervang werk ik samen met Bram van der Sande.",
  },
];

export default function OverPage() {
  return (
    <main className="bg-[#FAFAF8]">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-32 pb-16 md:pt-40">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
              Wie ik ben
            </span>
            <h1
              className="text-4xl md:text-[3.2rem] font-bold text-[#1A1A18] mt-4 mb-6 leading-[1.05] tracking-[-0.01em]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              John Lavrijsen, AI-bouwer uit Bladel.
            </h1>
            <p className="text-[#6B7280] text-lg leading-relaxed mb-4">
              Vier jaar als business engineer bij een transportbedrijf: procesoptimalisatie,
              boordcomputers voor 150 chauffeurs, een Delivery Management Systeem uitgerold, een
              warehouse in Noorwegen opgezet, interim operationeel manager voor 40 collega&apos;s.
            </p>
            <p className="text-[#6B7280] text-lg leading-relaxed">
              Sinds januari 2026 werk ik voor mezelf. Ik bouw AI en automatiseringen voor
              MKB-bedrijven in de Kempen en Eindhoven en alles daar tussenin. Niet omdat het een
              hype is, maar omdat ik zie dat ondernemers veel tijd kunnen winnen als je het goed en
              veilig aanpakt.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden max-w-sm md:ml-auto"
          >
            <Image
              src={PHOTOS[10]}
              alt="John Lavrijsen"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </motion.div>
        </div>
      </section>

      {/* Van video naar systemen */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h2
            className="text-2xl md:text-3xl font-bold text-[#1A1A18] mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Van video naar systemen
          </h2>
          <div className="space-y-5 text-[#1A1A18] leading-relaxed">
            <p>
              Ik maakte zes jaar lang video voor makelaars en bedrijven. Daardoor leerde ik hoe
              ondernemers echt werken, en waar ze vastlopen: te veel handwerk, te weinig overzicht,
              en het gevoel dat ze iets met AI moeten maar niet weten waar te beginnen.
            </p>
            <p>
              In januari 2026 ben ik gestopt bij het transportbedrijf waar ik als business engineer
              werkte en ben ik fulltime gaan bouwen. Een eigen Android-app om kroegen te vinden in
              onbekende steden. Een ticketsysteem voor onze eigen Koningsdag met Mollie en
              automatische broodjes-bestelling. Een AI-Quickscan die een bedrijfswebsite analyseert
              en concrete kansen benoemt. Een compleet bedrijfssysteem dat mijn uren, facturen, BTW
              en leads automatiseert.
            </p>
            <p>
              Datzelfde doe ik nu voor andere MKB-bedrijven, met een modulair platform en een
              branche-skin per klant. En het mooie aan lokaal werken: ik kom gewoon langs.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Karakter: huis en camper */}
      <section className="bg-[#F5F1EB] py-24 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
              Hoe ik leer
            </span>
            <h2
              className="text-2xl md:text-3xl font-bold text-[#1A1A18] mt-4 mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Door het te doen, niet door een cursus.
            </h2>
            <div className="space-y-5 text-[#1A1A18] leading-relaxed">
              <p>
                Mijn eigen huis heb ik van top tot teen verbouwd zonder dat ik ooit gemetseld had.
                Ik heb een EPDM-dak gelegd op een veel te warme dag, in één keer goed gekregen al
                was de marge dun. Ik heb een fundering gestort, vloerverwarming aangesloten, mijn
                keuken in elkaar gezet, mijn badkamer ingedeeld.
              </p>
              <p>
                Daarna heb ik anderhalf jaar lang een Mercedes Sprinter omgebouwd tot camper.
                Begonnen vanuit een kale bus, alles zelf bedacht en gemaakt. In mijn huis hangt een
                spreuk:{" "}
                <em className="text-[#1A1A18] font-medium">
                  if you can dream it, you can do it.
                </em>{" "}
                Daar krijg ik letterlijk kippenvel van. Het betekent: als ik iets voor ogen heb,
                weet ik dat het me lukt. Soms kost het kruim. Maar links of rechts kom ik er.
              </p>
              <p>
                Datzelfde principe geldt voor wat ik nu bouw met AI. Niet door een PowerPoint of
                een cursus. Door elke week iets te bouwen, iets te laten mislukken, en het opnieuw
                te proberen tot het werkt.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bram als partner */}
      <section className="bg-[#FAFAF8] py-24 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
              Niet alleen
            </span>
            <h2
              className="text-2xl md:text-3xl font-bold text-[#1A1A18] mt-4 mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Bram van der Sande als achtervang.
            </h2>
            <div className="space-y-5 text-[#1A1A18] leading-relaxed">
              <p>
                Voor grotere opdrachten en als achtervang werk ik samen met Bram van der Sande.
                Geen bureau, wel een net dat draagt. Bram zit aan dezelfde kant van de tafel als
                ik, kent mijn platform en kan een traject overnemen als dat nodig is.
              </p>
              <p>
                Praktisch: als ik morgen wegval, valt jouw bedrijf niet om. Alle code, alle
                breinen, alle systemen zijn overdraagbaar gedocumenteerd. Bram weet hoe ze in
                elkaar zitten. Geen vendor-lock, wel continuïteit.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Principes */}
      <section className="bg-[#F5F1EB] py-24 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <h2
            className="text-3xl md:text-[2.4rem] font-bold text-[#1A1A18] mb-12 leading-[1.1]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Waar ik voor sta.
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
            {PRINCIPLES.map((p) => (
              <motion.div
                key={p.t}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="pt-5 border-t border-[#E5E0D8]"
              >
                <div className="text-[#C9A96E] mb-3">{p.icon}</div>
                <h3 className="text-lg font-semibold text-[#1A1A18] mb-2">{p.t}</h3>
                <p className="text-[#6B7280] text-[15px] leading-relaxed">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0F0F0D] py-24 md:py-28 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2
            className="text-3xl md:text-[2.8rem] font-bold text-[#FAFAF8] mb-5 leading-[1.1]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Even kennismaken?
          </h2>
          <p className="text-[#FAFAF8]/55 text-lg mb-9 leading-relaxed">
            Plan een gesprek van 30 minuten. Ik denk graag met je mee, ook als je nog niet weet wat
            je precies wil.
          </p>
          <Link
            href="/boek"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#C9A96E] text-[#1A1A18] font-semibold text-lg hover:bg-[#d8bd87] transition-colors"
          >
            Plan een gesprek <ArrowRight size={19} />
          </Link>
        </div>
      </section>
    </main>
  );
}
