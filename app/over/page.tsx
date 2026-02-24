"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Camera, Zap, Heart, Clock, MessageCircle } from "lucide-react";
import { PHOTOS, SITE } from "@/lib/constants";

export default function OverPage() {
  return (
    <>
      {/* ─── HERO — JOHN INTRO ────────────────────────────────────────── */}
      <section className="bg-[#FAFAF8] pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-4">
                Over John
              </span>
              <h1
                className="text-4xl md:text-5xl font-bold text-[#1A1A18] mb-6 leading-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                De maker achter Future Content.
              </h1>
              <p className="text-[#6B7280] leading-relaxed mb-5 text-lg">
                John Lavrijsen helpt bedrijven en makelaars om sterker over te komen met video&apos;s die
                rustig, strak en geloofwaardig voelen. Geen overdreven marketingpraat — maar beelden
                die laten zien wat er écht staat.
              </p>
              <p className="text-[#6B7280] leading-relaxed">
                John is creatief en praktisch tegelijk. Hij houdt van een duidelijk plan, maar ook van
                ruimte om op locatie nét dat ene moment te pakken dat een video eigen maakt.
              </p>

              <div className="flex gap-4 mt-8">
                <Link
                  href={`https://wa.me/${SITE.whatsapp}?text=Hallo%20John%2C%20ik%20wil%20graag%20kennismaken.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#1dbd5a] transition-colors text-sm"
                >
                  <MessageCircle size={15} />
                  App mij op WhatsApp
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
            >
              <Image
                src={PHOTOS[10]}
                alt={`${SITE.ownerName} — Future Content`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── WAT HEM DRIJFT ───────────────────────────────────────────── */}
      <section className="bg-[#F5F1EB] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1A1A18] mb-8"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Wat hem drijft.
            </h2>

            <div className="space-y-6 text-[#6B7280] leading-relaxed text-lg">
              <p>
                John maakt video&apos;s omdat hij energie krijgt van vooruitgang: iets opnemen, bouwen,
                monteren, finetunen — en dan een eindresultaat afleveren waar je trots op bent.
                Hij wil dat kijkers denken: <em className="text-[#1A1A18] not-italic font-medium">&ldquo;dit zit goed.&rdquo;</em>
              </p>
              <p>
                Zijn stijl is herkenbaar: focus op sfeer en vertrouwen, vloeiende montage met lekker
                ritme, oog voor detail zonder drukte. En een samenwerking die simpel is — kort schakelen,
                snel duidelijkheid, geen gedoe.
              </p>
            </div>

            {/* Stijl kernwaarden */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Focus op sfeer & vertrouwen",
                "Vloeiende montage",
                "Oog voor detail",
                "Kort schakelen",
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[#FAFAF8] border border-[#E5E0D8] rounded-xl px-4 py-3 text-sm font-medium text-[#1A1A18]"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 bg-[#0F0F0D] rounded-2xl">
              <p
                className="text-xl md:text-2xl font-medium text-[#FAFAF8] leading-snug italic"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                &ldquo;Video&apos;s die je merk versterken, zonder dat het gemaakt voelt.&rdquo;
              </p>
              <p className="text-[#C9A96E] text-sm font-semibold mt-4">— Future Content in één zin</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── HOE WIJ WERKEN ───────────────────────────────────────────── */}
      <section className="bg-[#FAFAF8] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1A1A18] mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Hoe wij werken.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Clock size={22} />,
                title: "Snel",
                desc: "Vastgoedvideo's binnen 1 week, social content binnen 5 werkdagen na shoot. Deadlines zijn heilig.",
              },
              {
                icon: <Heart size={22} />,
                title: "Persoonlijk",
                desc: "Geen groot bureau. Jij werkt altijd met dezelfde persoon, die jouw situatie en stijl kent.",
              },
              {
                icon: <Zap size={22} />,
                title: "Resultaatgericht",
                desc: "We maken geen video voor de schijn. We maken video die jou klanten en bezichtigingen oplevert.",
              },
              {
                icon: <Camera size={22} />,
                title: "Creatief",
                desc: "Een goed oog voor beeld, licht en sfeer. Elk object en bedrijf verdient een eigen aanpak.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-7 rounded-2xl border border-[#E5E0D8] bg-[#FAFAF8]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F0E6D0] flex items-center justify-center text-[#C9A96E] mb-5">
                  {item.icon}
                </div>
                <h3 className="font-bold text-[#1A1A18] mb-2">{item.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GEAR ─────────────────────────────────────────────────────── */}
      <section className="bg-[#0F0F0D] py-20 md:py-28 text-[#FAFAF8]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-4">
                Gear
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Professioneel materiaal. Eerlijke prijs.
              </h2>
              <p className="text-[#FAFAF8]/65 leading-relaxed mb-8">
                Bewust gekozen apparatuur die resultaat levert —
                zonder overbodige overhead die jij moet betalen.
              </p>

              <div className="space-y-5">
                {[
                  {
                    name: "Sony A6400",
                    desc: "APS-C mirrorless camera voor scherpe vastgoedbeelden. Uitstekende autofocus en professionele kleurweergave.",
                  },
                  {
                    name: "Rode Wireless GO",
                    desc: "Draadloze microfoon voor heldere, ruisvrije audio — bij vastgoedfilms én social media shoots.",
                  },
                  {
                    name: "DJI RS Mini Ronin",
                    desc: "Camera-stabilisator voor vloeiende, cinematische beelden. Geeft walkthroughs een professionele filmische look.",
                  },
                  {
                    name: "DJI Mini 3 Pro",
                    desc: "Drone voor luchtopnames. Compact, stil en professioneel. Voor omgeving, tuin en ligging bij vastgoed.",
                  },
                  {
                    name: "Final Cut Pro",
                    desc: "Post-processing op Mac. Kleurcorrectie, grading, geluid en titels — alles in één naadloze workflow.",
                  },
                ].map((gear, i) => (
                  <div key={i} className="border-l-2 border-[#C9A96E] pl-5">
                    <h3 className="font-semibold text-[#FAFAF8] mb-1">{gear.name}</h3>
                    <p className="text-sm text-[#FAFAF8]/55 leading-relaxed">{gear.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src={PHOTOS[11]}
                alt="Camera gear Future Content"
                fill
                className="object-cover opacity-80"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── AI VISIE ─────────────────────────────────────────────────── */}
      <section className="bg-[#F5F1EB] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-4">
              Visie
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1A1A18] mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              De toekomst van content is AI. Wij bereiden je voor.
            </h2>
            <div className="space-y-5 text-[#6B7280] leading-relaxed">
              <p>
                Video is niet meer optioneel — het is de taal van het internet. Instagram, TikTok,
                LinkedIn, Funda: alles draait om bewegend beeld. En toch zijn de meeste lokale bedrijven
                nog niet zichtbaar op een manier die écht werkt.
              </p>
              <p>
                Future Content vult die leegte. We maken video&apos;s die professioneel ogen, menselijk
                aanvoelen en resultaat opleveren. Voor makelaars die meer bezichtigingen willen. Voor
                bedrijven die meer klanten willen aantrekken.
              </p>
              <p>
                En we kijken verder dan vandaag. Hoe meer je nu opneemt, hoe meer data je opbouwt.
                Dat materiaal wordt straks de basis voor AI-gegenereerde content die jouw stijl en stem
                behoudt — automatisch en schaalbaar.
              </p>
              <p className="font-semibold text-[#1A1A18]">
                Begin nu. Bouw je bibliotheek. Train straks. Schaal altijd.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-[#C9A96E] hover:gap-3 transition-all"
            >
              Lees onze blogs over AI en content <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="bg-[#C9A96E] py-16 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#0F0F0D] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Laten we kennismaken.
          </h2>
          <p className="text-[#0F0F0D]/70 mb-8">
            Stuur een WhatsApp — we plannen een kort gesprek en kijken wat we voor jou kunnen doen.
          </p>
          <Link
            href={`https://wa.me/${SITE.whatsapp}?text=Hallo%20John%2C%20ik%20wil%20graag%20kennismaken.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0F0F0D] text-[#FAFAF8] font-semibold hover:bg-[#1A1A18] transition-colors"
          >
            <MessageCircle size={16} />
            App mij op WhatsApp <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
