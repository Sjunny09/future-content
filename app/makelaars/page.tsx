"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Check, Clock, Home, Video, Smartphone, Airplay, Star, MessageCircle, ShieldCheck,
} from "lucide-react";
import { VASTGOED_PACKAGES, PHOTOS, STACK_VIDEOS, SELLER_QUOTES, COMPETITOR_COMPARE, SITE } from "@/lib/constants";
import VideoPlayer from "@/components/common/VideoPlayer";

export default function MakelaarsPage() {
  const waLink = `https://wa.me/${SITE.whatsapp}?text=Hallo%20John%2C%20ik%20wil%20een%20vastgoedvideo%20plannen.`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Vastgoedvideografie",
    "name": "Vastgoedvideo voor makelaars",
    "provider": { "@type": "LocalBusiness", "name": SITE.name, "url": SITE.url },
    "areaServed": ["De Kempen", "Eindhoven", "Tilburg"],
    "description": "Professionele vastgoedvideo's voor makelaars in De Kempen, Eindhoven en omgeving. Funda-ready walkthroughs opgeleverd binnen 1 week.",
    "offers": [
      { "@type": "Offer", "name": "Walkthrough", "price": "199", "priceCurrency": "EUR" },
      { "@type": "Offer", "name": "Compleet", "price": "349", "priceCurrency": "EUR" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden bg-[#0F0F0D] pb-16">
        <div className="absolute inset-0">
          <Image
            src={PHOTOS[3]}
            alt="Vastgoedvideografie voor makelaars"
            fill
            priority
            className="object-cover object-center opacity-45"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0D] via-[#0F0F0D]/40 to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-28 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-block text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-4">
              Voor makelaars
            </span>
            <h1
              className="text-4xl md:text-6xl font-bold text-[#FAFAF8] leading-[1.1] mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Meer bezichtigingen. Één video. Vanaf €199.
            </h1>
            <p className="text-[#FAFAF8]/70 text-lg mb-8 leading-relaxed">
              Future Content is jouw vaste vastgoedvideograaf. Funda-ready walkthroughs,
              sociale teasers en drone shots, opgeleverd binnen 1 week, klaar voor publicatie.
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
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-[#FAFAF8]/30 text-[#FAFAF8] font-semibold hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
              >
                Plan een shoot <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── VALUE PROPS ──────────────────────────────────────────────── */}
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
              Waarom video bij elke woning?
            </h2>
            <p className="text-[#6B7280] text-lg max-w-xl mx-auto">
              Kopers beslissen op gevoel. Een video wekt dat gevoel op. Een foto niet.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Home size={24} />,
                title: "Betere eerste indruk",
                desc: "Een video toont sfeer, ruimte en detail op een manier die foto's nooit kunnen. Kopers voelen de woning voor ze binnenstappen.",
              },
              {
                icon: <Star size={24} />,
                title: "Meer vertrouwen in jou",
                desc: "Makelaars met video worden als professioneler ervaren. Dat trekt betere verkopers aan en versterkt jouw merk.",
              },
              {
                icon: <Video size={24} />,
                title: "Sneller verkopen",
                desc: "Woningen gefilmd door Future Content staan gemiddeld binnen 2 maanden verkocht. Minder doorlooptijd, minder kosten.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl border border-[#E5E0D8] bg-[#FAFAF8]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F0E6D0] flex items-center justify-center text-[#C9A96E] mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#1A1A18] mb-3">{item.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WAT JE KRIJGT ────────────────────────────────────────────── */}
      <section className="bg-[#F5F1EB] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-4">
                Deliverables
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#1A1A18] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Wat je van mij krijgt.
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    icon: <Video size={18} />,
                    title: "Walkthrough video (16:9 of 9:16)",
                    desc: "Horizontaal voor Funda & website óf verticaal voor Instagram. Jij kiest het formaat.",
                  },
                  {
                    icon: <Smartphone size={18} />,
                    title: "Sociale teaser (9:16), inbegrepen in Compleet pakket",
                    desc: "Verticale snijversie voor Instagram Reels en TikTok. Maximale aandacht in de feed.",
                  },
                  {
                    icon: <Airplay size={18} />,
                    title: "Drone luchtopnames op aanvraag",
                    desc: "Omgeving, tuin en ligging vanuit de lucht. Afhankelijk van locatie en vliegzone.",
                  },
                  {
                    icon: <Home size={18} />,
                    title: "Bestanden via WeTransfer of Drive",
                    desc: "Klaar voor upload op Funda, website, social media of e-mail. Binnen 1 week na shoot.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-[#FAFAF8] border border-[#E5E0D8]">
                    <div className="text-[#C9A96E] mt-0.5 shrink-0">{item.icon}</div>
                    <div>
                      <p className="font-semibold text-[#1A1A18] text-sm">{item.title}</p>
                      <p className="text-xs text-[#6B7280] mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm text-[#6B7280]">
                <Clock size={14} />
                <span>Oplevering binnen 1 week na de shoot</span>
              </div>
            </div>

            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src={PHOTOS[5]}
                alt="Vastgoedvideo opname"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA MIDDEN ───────────────────────────────────────────────── */}
      <section className="bg-[#C9A96E] py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-[#0F0F0D]" style={{ fontFamily: "var(--font-playfair)" }}>
              Klaar voor jouw eerste shoot?
            </h3>
            <p className="text-[#0F0F0D]/70 mt-1">Stuur een WhatsApp. Ik reageer dezelfde dag.</p>
          </div>
          <Link
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0F0F0D] text-[#FAFAF8] font-semibold hover:bg-[#1A1A18] transition-colors"
          >
            <MessageCircle size={15} />
            App mij op WhatsApp
          </Link>
        </div>
      </section>

      {/* ─── PAKKETTEN ────────────────────────────────────────────────── */}
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
              Transparante tarieven.
            </h2>
            <p className="text-[#6B7280]">Geen verrassingen. Wat je ziet is wat je krijgt.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {VASTGOED_PACKAGES.map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-8 border-2 flex flex-col ${
                  pkg.highlight
                    ? "border-[#C9A96E] bg-[#0F0F0D] text-[#FAFAF8]"
                    : "border-[#E5E0D8] bg-[#FAFAF8]"
                }`}
              >
                {pkg.highlight && (
                  <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#C9A96E] mb-3">
                    Meest gekozen
                  </span>
                )}
                <h3
                  className={`text-2xl font-bold mb-1 ${pkg.highlight ? "text-[#FAFAF8]" : "text-[#1A1A18]"}`}
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {pkg.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-4xl font-bold ${pkg.highlight ? "text-[#C9A96E]" : "text-[#1A1A18]"}`}>
                    {pkg.price}
                  </span>
                </div>
                <p className={`text-xs mb-2 ${pkg.highlight ? "text-[#FAFAF8]/40" : "text-[#6B7280]"}`}>
                  {pkg.note}
                </p>
                <p className={`text-sm mb-6 ${pkg.highlight ? "text-[#FAFAF8]/60" : "text-[#6B7280]"}`}>
                  {pkg.description}
                </p>
                <ul className="space-y-3 mb-6 flex-1">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm">
                      <Check size={15} className="text-[#C9A96E] mt-0.5 shrink-0" />
                      <span className={pkg.highlight ? "text-[#FAFAF8]/80" : "text-[#1A1A18]"}>{f}</span>
                    </li>
                  ))}
                </ul>
                {pkg.note2 && (
                  <p className={`text-xs mb-6 italic ${pkg.highlight ? "text-[#FAFAF8]/40" : "text-[#6B7280]"}`}>
                    {pkg.note2}
                  </p>
                )}
                <Link
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center py-3 rounded-full font-semibold text-sm transition-colors ${
                    pkg.highlight
                      ? "bg-[#C9A96E] text-[#0F0F0D] hover:bg-[#b8955a]"
                      : "border border-[#1A1A18] text-[#1A1A18] hover:bg-[#1A1A18] hover:text-[#FAFAF8]"
                  }`}
                >
                  Plan een shoot
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONCURRENTIEVERGELIJKING ──────────────────────────────────── */}
      <section className="bg-[#F5F1EB] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1A1A18] mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Wat kost het elders?
            </h2>
            <p className="text-[#6B7280]">
              Dezelfde kwaliteit, snellere oplevering, directe lijn met de videograaf.
            </p>
          </motion.div>

          <div className="overflow-hidden rounded-2xl border border-[#E5E0D8]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1A1A18] text-[#FAFAF8]">
                  <th className="text-left px-5 py-4 font-semibold">Aanbieder</th>
                  <th className="text-left px-5 py-4 font-semibold">Prijs</th>
                  <th className="text-left px-5 py-4 font-semibold hidden sm:table-cell">Oplevering</th>
                  <th className="text-left px-5 py-4 font-semibold hidden md:table-cell">Persoonlijk</th>
                </tr>
              </thead>
              <tbody>
                {COMPETITOR_COMPARE.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-t border-[#E5E0D8] ${
                      row.personal
                        ? "bg-[#F0E6D0] font-semibold"
                        : "bg-[#FAFAF8]"
                    }`}
                  >
                    <td className="px-5 py-4 text-[#1A1A18]">
                      {row.personal && (
                        <span className="inline-flex items-center gap-1 text-[#C9A96E] mr-1">
                          <ShieldCheck size={14} />
                        </span>
                      )}
                      {row.name}
                    </td>
                    <td className={`px-5 py-4 ${row.personal ? "text-[#C9A96E]" : "text-[#6B7280]"}`}>
                      {row.price}
                    </td>
                    <td className="px-5 py-4 text-[#6B7280] hidden sm:table-cell">{row.turnaround}</td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      {row.personal ? (
                        <span className="text-[#25D366] font-semibold">Ja, altijd dezelfde persoon</span>
                      ) : (
                        <span className="text-[#6B7280]">Wisselend team</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#6B7280] mt-3 text-center">
            Prijzen gebaseerd op marktonderzoek februari 2026. Excl. BTW.
          </p>
        </div>
      </section>

      {/* ─── PORTFOLIO — VIDEO GRID ────────────────────────────────────── */}
      <section className="bg-[#FAFAF8] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-3">
              Portfolio Pit Makelaars
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1A1A18] mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Bekijk onze vastgoedvideo&apos;s.
            </h2>
            <p className="text-[#6B7280]">
              Gemaakt voor Pit Makelaars in de regio Veldhoven, Eindhoven en De Kempen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STACK_VIDEOS.map((video) => (
              <div key={video.id} className="rounded-2xl overflow-hidden bg-[#0F0F0D] flex flex-col">
                <VideoPlayer
                  src={video.src}
                  poster={video.poster}
                  title={video.title}
                />
                <div className="p-4">
                  <p className="text-[#FAFAF8] font-semibold text-sm">{video.title}</p>
                  <p className="text-[#FAFAF8]/50 text-xs mt-0.5">{video.location} · {video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VERKOPER QUOTES ──────────────────────────────────────────── */}
      <section className="bg-[#F5F1EB] py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h3
              className="text-2xl md:text-3xl font-bold text-[#1A1A18] mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Wat verkopers zeggen.
            </h3>
            <p className="text-[#6B7280] text-sm">Reacties van huiseigenaren na oplevering, via WhatsApp.</p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {SELLER_QUOTES.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-[#FAFAF8] border border-[#E5E0D8] rounded-2xl px-6 py-5 max-w-xs"
              >
                <p className="text-[#1A1A18] text-sm italic leading-relaxed mb-3">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="text-xs text-[#6B7280] font-medium">{item.address}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WERKWIJZE KORT ───────────────────────────────────────────── */}
      <section className="bg-[#FAFAF8] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1A1A18] mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Hoe het werkt.
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-[#E5E0D8] hidden md:block" />
            <div className="space-y-8">
              {[
                {
                  num: "1",
                  title: "Melding van de woning",
                  desc: "Je stuurt adres en bijzonderheden via WhatsApp of e-mail. Ik plan de shoot in op een moment dat past.",
                },
                {
                  num: "2",
                  title: "Shoot dag",
                  desc: "Ik kom op het afgesproken tijdstip. Sleutels en toegang: dat is alles wat ik nodig heb. Shoot duurt 1–2 uur.",
                },
                {
                  num: "3",
                  title: "Edit & levering",
                  desc: "Binnen 1 week ontvang je de video via WeTransfer of Google Drive, klaar voor upload.",
                },
                {
                  num: "4",
                  title: "Online & op Funda",
                  desc: "Plak de video in je advertentie, deel op social en zie de bezichtigingen instromen.",
                },
              ].map((step, i) => (
                <div key={i} className="flex gap-6 md:pl-12">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#C9A96E] flex items-center justify-center text-[#0F0F0D] font-bold text-sm shrink-0">
                      {step.num}
                    </div>
                  </div>
                  <div className="pt-2.5">
                    <h3 className="font-semibold text-[#1A1A18] mb-1">{step.title}</h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F1EB] py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1A1A18] mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Veelgestelde vragen.
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Hoe snel wordt de video opgeleverd?",
                a: "Standaard binnen 1 week na de shootdag. Bij spoed is snellere levering in overleg mogelijk.",
              },
              {
                q: "Ik werk al met een fotograaf. Waarom ook video?",
                a: "Foto's tonen wat er is. Video toont hoe het voelt. Kopers die een video zien gaan met meer zekerheid op bezichtiging. Dat scheelt jou tijd en verhoogt de kans op een bod. Foto en video zijn complementair, niet inwisselbaar.",
              },
              {
                q: "Past video in ons Funda-pakket?",
                a: "Ja. Funda ondersteunt het toevoegen van een videolink bij elke woning. Je plakt de link gewoon in het advertentieformulier. Ik lever het in het juiste horizontale (16:9) formaat.",
              },
              {
                q: "Filmen jullie ook met drone?",
                a: "Ja, beschikbaar in het Compleet pakket. Met de DJI Mini 3 Pro maak ik luchtopnames van de omgeving, tuin en ligging. Of het mogelijk is hangt af van de locatie en vliegzone, dat check ik vooraf.",
              },
              {
                q: "Wat als de woning al verkocht is voor de video live gaat?",
                a: "Dat is geen probleem. De video blijft waardevol als referentie voor toekomstige verkopers, je eigen social media en om nieuwe opdrachten aan te trekken. Makelaars die video inzetten als standaard onderscheiden zich van de rest.",
              },
              {
                q: "Wat heb ik nodig voor de shoot?",
                a: "Toegang tot het object en een tijdslot van 1–2 uur. Zorg dat de woning schoon en opgeruimd is. Meer info op de Werkwijze pagina.",
              },
              {
                q: "Kan ik meerdere objecten per maand boeken?",
                a: "Absoluut. Bij vaste samenwerking maak ik afspraken over volume en planning. Neem contact op voor de mogelijkheden.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group bg-[#FAFAF8] rounded-xl border border-[#E5E0D8] p-5 cursor-pointer"
              >
                <summary className="flex items-center justify-between font-semibold text-[#1A1A18] text-sm list-none">
                  {faq.q}
                  <span className="text-[#C9A96E] ml-4 group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                </summary>
                <p className="mt-3 text-[#6B7280] text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEW ANITA (PIT MAKELAARS) ────────────────────────────── */}
      <section className="bg-[#FAFAF8] py-16 border-t border-[#E5E0D8]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-0.5 mb-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill="#C9A96E" className="text-[#C9A96E]" />
            ))}
          </div>
          <blockquote
            className="text-xl md:text-2xl font-medium text-[#1A1A18] leading-snug mb-6 italic"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            &ldquo;Iedere keer weer verrast hoe mooi het resultaat is. Hij denkt ontzettend goed mee,
            komt keer op keer met nieuwe creatieve ideeën en echt niets is voor hem te veel.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C9A96E]/20 flex items-center justify-center text-sm font-bold text-[#C9A96E]">
              AF
            </div>
            <div className="text-left">
              <p className="font-semibold text-[#1A1A18] text-sm">Anita Fiers</p>
              <p className="text-xs text-[#6B7280]">Your Veldhoven Broker · Pit Makelaars · Google Review</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="bg-[#0F0F0D] py-20 text-[#FAFAF8] text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2
            className="text-3xl md:text-5xl font-bold mb-5"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Jouw vaste videograaf. Plan een shoot.
          </h2>
          <p className="text-[#FAFAF8]/60 mb-8">
            Stuur een WhatsApp. Ik reageer dezelfde dag en plannen we direct een shoot in.
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
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#FAFAF8]/20 text-[#FAFAF8] font-semibold hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
            >
              Plan een belafspraak <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
