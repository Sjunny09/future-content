"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight, Check, MessageCircle, Heart, Film, Star, Camera,
} from "lucide-react";
import { PHOTOS, SITE } from "@/lib/constants";
import { PriceIndicator } from "@/components/PriceIndicator";

export default function TrouwenPage() {
  const waLink = `https://wa.me/${SITE.whatsapp}?text=Hallo%20John%2C%20ik%20wil%20graag%20meer%20informatie%20over%20een%20bruiloftsvideo.`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Bruiloftsvideografie",
    "name": "Bruiloftsvideo",
    "provider": { "@type": "LocalBusiness", "name": SITE.name, "url": SITE.url },
    "areaServed": ["De Kempen", "Eindhoven", "Tilburg"],
    "description": "Professionele bruiloftsvideo's in De Kempen en omgeving. Social edit (60–90 sec) én lange versie voor privégebruik, opgeleverd binnen 4 weken.",
    "review": {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Person", "name": "Mandy Daniels" },
      "reviewBody": "John heeft onze trouwvideo gemaakt, waar wij super tevreden over waren! Hij heeft hele mooie beelden gemaakt, waarvan hij meerdere gave aftermovies van heeft gemaakt.",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden bg-[#221C14] pb-16">
        <div className="absolute inset-0">
          <Image
            src={PHOTOS[0]}
            alt="Bruiloftsvideografie Future Content"
            fill
            priority
            className="object-cover object-center opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#221C14] via-[#221C14]/50 to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-28 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-block text-[#B45F38] text-xs font-semibold uppercase tracking-widest mb-4">
              Bruiloftsvideo&apos;s
            </span>
            <h1
              className="text-4xl md:text-6xl font-bold text-[#F3ECE0] leading-[1.1] mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Jouw mooiste dag. Voor altijd vastgelegd.
            </h1>
            <p className="text-[#F3ECE0]/70 text-lg mb-8 leading-relaxed">
              Een bruiloftsvideo is meer dan beelden. Het is het gevoel van die dag:
              de spanning, de lach, de tranen. Voor jullie, voor later, voor altijd.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#1dbd5a] transition-colors"
              >
                <MessageCircle size={16} />
                App mij op WhatsApp
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-[#F3ECE0]/30 text-[#F3ECE0] font-semibold hover:border-[#B45F38] hover:text-[#B45F38] transition-colors"
              >
                Vrijblijvend gesprek <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── WAT JE KRIJGT ────────────────────────────────────────────── */}
      <section className="bg-[#F3ECE0] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-[#B45F38] text-xs font-semibold uppercase tracking-widest mb-4">
                Wat je krijgt
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#2A2218] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Twee video&apos;s. Eén dag.
              </h2>
              <p className="text-[#6E6151] text-lg mb-8 leading-relaxed">
                Van elke bruiloft maak ik standaard twee bewerkingen, zodat jullie de dag
                op élk moment kunnen herbeleven.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: <Film size={18} />,
                    title: "Social edit: kort & krachtig",
                    desc: "Een emotionele samenvatting van 60–90 seconden. Klaar voor Instagram, TikTok en WhatsApp. Deel de mooiste momenten direct met vrienden en familie.",
                  },
                  {
                    icon: <Heart size={18} />,
                    title: "Lange versie: voor privégebruik",
                    desc: "De volledige film van jullie dag. Ceremonie, dansen, speeches, details, alles erin. Om later samen terug te kijken, samen met kinderen of kleinkinderen.",
                  },
                  {
                    icon: <Camera size={18} />,
                    title: "Professioneel gefilmd",
                    desc: "Sony A6400 met prime lenzen en gimbal (DJI RS Mini Ronin) voor vloeiende beweging. Geen trillende beelden, geen amateuristisch gevoel.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 rounded-xl bg-[#ECE2D2] border border-[#E4D8C6]"
                  >
                    <div className="text-[#B45F38] mt-0.5 shrink-0">{item.icon}</div>
                    <div>
                      <p className="font-semibold text-[#2A2218] text-sm">{item.title}</p>
                      <p className="text-xs text-[#6E6151] mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src={PHOTOS[6]}
                alt="Bruiloftsvideografie"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── VIDEO VOORBEELD ──────────────────────────────────────────── */}
      <section className="bg-[#221C14] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-[#B45F38] text-xs font-semibold uppercase tracking-widest mb-4">
            Bekijk een voorbeeld
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#F3ECE0] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Zo ziet jullie dag eruit.
          </h2>
          <p className="text-[#F3ECE0]/60 mb-10 max-w-xl mx-auto">
            Een echte bruiloftsvideo, gefilmd en bewerkt door Future Content.
          </p>
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/16VDboUDpps"
              title="Bruiloftsvideo Future Content"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* ─── TARIEF ───────────────────────────────────────────────────── */}
      <section className="bg-[#ECE2D2] py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block text-[#B45F38] text-xs font-semibold uppercase tracking-widest mb-4">
            Tarief
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#2A2218] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            <PriceIndicator item="trouwfilm" />.
          </h2>
          <p className="text-[#6E6151] text-lg mb-10 max-w-xl mx-auto">
            Elke bruiloft is anders. De locatie, tijdsduur, wensen en stijl verschillen elke keer.
            Daarom bespreek ik de prijs altijd persoonlijk, zodat het past bij
            jullie dag én budget.
          </p>

          <div className="bg-[#221C14] rounded-2xl p-8 text-left max-w-xl mx-auto">
            <span className="inline-block text-[#B45F38] text-xs font-semibold uppercase tracking-widest mb-3">
              Altijd inbegrepen
            </span>
            <ul className="space-y-3 mb-8">
              {[
                "Social edit (60–90 sec) voor Instagram & WhatsApp",
                "Lange versie voor privégebruik",
                "Professionele audio (ruimtegeluid + muziek naar keuze)",
                "Oplevering binnen 4 weken",
                "Bestanden via WeTransfer, direct downloadbaar",
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <Check size={15} className="text-[#B45F38] mt-0.5 shrink-0" />
                  <span className="text-[#F3ECE0]/80">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-3.5 rounded-full bg-[#B45F38] text-[#F3ECE0] font-semibold text-sm hover:bg-[#9E3D24] transition-colors"
            >
              Vraag een offerte aan via WhatsApp
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WERKWIJZE ────────────────────────────────────────────────── */}
      <section className="bg-[#F3ECE0] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#2A2218] mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Hoe het werkt.
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-[#E4D8C6] hidden md:block" />
            <div className="space-y-8">
              {[
                {
                  num: "1",
                  title: "Vrijblijvend gesprek",
                  desc: "We bespreken jullie dag, de locatie, de sfeer die jullie willen en wat er mogelijk is. Geen verplichtingen.",
                },
                {
                  num: "2",
                  title: "Shoot dag",
                  desc: "Ik ben er van begin tot eind. Van de voorbereidingen tot de receptie. Ik vang alles op zonder opdringerig te zijn.",
                },
                {
                  num: "3",
                  title: "Edit & levering",
                  desc: "Binnen 4 weken ontvangen jullie beide video's. Wil je iets anders? Dan bespreken we dat bij de opdracht.",
                },
              ].map((step, i) => (
                <div key={i} className="flex gap-6 md:pl-12">
                  <div className="w-12 h-12 rounded-full bg-[#B45F38] flex items-center justify-center text-[#221C14] font-bold text-sm shrink-0">
                    {step.num}
                  </div>
                  <div className="pt-2.5">
                    <h3 className="font-semibold text-[#2A2218] mb-1">{step.title}</h3>
                    <p className="text-[#6E6151] text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── REVIEW ───────────────────────────────────────────────────── */}
      <section className="bg-[#ECE2D2] py-16 border-t border-[#E4D8C6]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-0.5 mb-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill="#B45F38" className="text-[#B45F38]" />
            ))}
          </div>
          <blockquote
            className="text-xl md:text-2xl font-medium text-[#2A2218] leading-snug mb-6 italic"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            &ldquo;John heeft onze trouwvideo gemaakt, waar wij super tevreden over waren!
            Hij heeft hele mooie beelden gemaakt, waarvan hij meerdere gave aftermovies
            van heeft gemaakt. Een fijne man om mee samen te werken.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#B45F38]/20 flex items-center justify-center text-sm font-bold text-[#B45F38]">
              MD
            </div>
            <div className="text-left">
              <p className="font-semibold text-[#2A2218] text-sm">Mandy Daniels</p>
              <p className="text-xs text-[#6E6151]">Bruidspaar · Google Review</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="bg-[#221C14] py-20 text-[#F3ECE0] text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2
            className="text-3xl md:text-5xl font-bold mb-5"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Jullie dag verdient het beste.
          </h2>
          <p className="text-[#F3ECE0]/60 mb-8">
            Stuur een WhatsApp. Ik reageer dezelfde dag en we plannen een vrijblijvend gesprek.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#1dbd5a] transition-colors"
            >
              <MessageCircle size={18} />
              App mij op WhatsApp
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#F3ECE0]/20 text-[#F3ECE0] font-semibold hover:border-[#B45F38] hover:text-[#B45F38] transition-colors"
            >
              Plan een gesprek <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
