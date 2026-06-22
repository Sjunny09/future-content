"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Check, X, Calendar, TrendingUp, Repeat, Sparkles, MessageCircle, Users,
} from "lucide-react";
import { SOCIAL_PACKAGES, PHOTOS, SITE } from "@/lib/constants";

export default function SocialMediaPage() {
  const waLink = `https://wa.me/${SITE.whatsapp}?text=Hallo%20John%2C%20ik%20wil%20meer%20weten%20over%20het%20social%20media%20abonnement.`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Social media videoproductie",
    "name": "Social media video abonnement",
    "provider": { "@type": "LocalBusiness", "name": SITE.name, "url": SITE.url },
    "areaServed": ["De Kempen", "Eindhoven", "Tilburg"],
    "description": "Maandelijkse social media video's voor bedrijven in De Kempen en omgeving. Eén shoot dag, meerdere video's, klaar voor Instagram en TikTok.",
    "offers": [
      { "@type": "Offer", "name": "Start", "price": "275", "priceCurrency": "EUR" },
      { "@type": "Offer", "name": "Instagram Reels", "price": "450", "priceCurrency": "EUR" },
      { "@type": "Offer", "name": "Premium", "price": "650", "priceCurrency": "EUR" },
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
            src={PHOTOS[1]}
            alt="Social media video content"
            fill
            priority
            className="object-cover object-center opacity-45"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0D] via-[#0F0F0D]/30 to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-28 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-block text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-4">
              Voor bedrijven
            </span>
            <h1
              className="text-4xl md:text-6xl font-bold text-[#FAFAF8] leading-[1.1] mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Eén shoot. Maanden aan Instagram Reels.
            </h1>
            <p className="text-[#FAFAF8]/70 text-lg mb-8 leading-relaxed">
              Ik kom eens per kwartaal langs, film alles wat nodig is en zorg dat elke maand verse Reels klaarstaan.
              Jij hoeft niks te doen. Gewoon zichtbaar zijn op Instagram.
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
                href="#pakketten"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-[#FAFAF8]/30 text-[#FAFAF8] font-semibold hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
              >
                Bekijk pakketten <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── WAAROM VIDEO? (ROI FOCUS) ─────────────────────────────────── */}
      <section className="bg-[#FAFAF8] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-4">
                Waarom video?
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#1A1A18] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Meer klanten. Minder advertentiekosten.
              </h2>
              <p className="text-[#6B7280] leading-relaxed mb-5">
                Veel ondernemers geven honderden euro&apos;s per maand uit aan advertenties,
                terwijl organische video op Instagram, TikTok en LinkedIn gratis bereik genereert.
                Het enige wat je nodig hebt is <strong className="text-[#1A1A18]">consistente, goede content.</strong>
              </p>
              <p className="text-[#6B7280] leading-relaxed mb-8">
                Het probleem: filmen, editen, captions schrijven, posten: dat kost uren per week.
                Uren die jij liever in je bedrijf steekt. Precies daarom bestaat dit abonnement.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "Jij hoeft nooit meer na te denken over content",
                  "Elke maand verse video's klaar voor publicatie",
                  "Meer zichtbaarheid zonder advertentiebudget",
                  "Opgebouwde aanwezigheid die voor jou blijft werken",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-[#1A1A18]">
                    <Check size={15} className="text-[#C9A96E] shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
            >
              <Image
                src={PHOTOS[6]}
                alt="Social media content shoot"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── VOOR WIE ─────────────────────────────────────────────────── */}
      <section className="bg-[#F5F1EB] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h3
              className="text-2xl font-bold text-[#1A1A18] mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Geschikt voor elk lokaal bedrijf.
            </h3>
            <p className="text-[#6B7280] text-sm">
              Iedereen die zichtbaar wil zijn en er zelf geen tijd voor heeft.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Horeca & restaurants",
              "Winkels & retail",
              "Coaches & trainers",
              "ZZP & freelancers",
              "Klinieken & salons",
              "Bouw & aannemers",
              "Makelaars",
              "Advocaten & adviseurs",
              "Sportclubs",
              "Evenementen",
              "Dienstverleners",
            ].map((sector) => (
              <span
                key={sector}
                className="px-4 py-2 rounded-full bg-[#FAFAF8] border border-[#E5E0D8] text-sm text-[#1A1A18] font-medium"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PAKKETTEN ────────────────────────────────────────────────── */}
      <section id="pakketten" className="bg-[#FAFAF8] py-20 md:py-28">
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
              Kies jouw abonnement.
            </h2>
            <p className="text-[#6B7280]">
              Excl. BTW · Minimaal 3 maanden · Daarna maandelijks opzegbaar
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SOCIAL_PACKAGES.map((pkg, i) => (
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
                    Populairste keuze
                  </span>
                )}
                <h3
                  className={`text-xl font-bold mb-1 ${pkg.highlight ? "text-[#FAFAF8]" : "text-[#1A1A18]"}`}
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {pkg.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-3xl font-bold ${pkg.highlight ? "text-[#C9A96E]" : "text-[#1A1A18]"}`}>
                    {pkg.price}
                  </span>
                  <span className={`text-sm ${pkg.highlight ? "text-[#FAFAF8]/50" : "text-[#6B7280]"}`}>
                    {pkg.period}
                  </span>
                </div>
                <span className={`text-xs ${pkg.highlight ? "text-[#FAFAF8]/40" : "text-[#6B7280]"}`}>
                  {pkg.note}
                </span>
                {"inclPrice" in pkg && (
                  <span className={`text-xs mb-4 block ${pkg.highlight ? "text-[#FAFAF8]/30" : "text-[#9CA3AF]"}`}>
                    {pkg.inclPrice}
                  </span>
                )}
                <p className={`text-sm mb-6 ${pkg.highlight ? "text-[#FAFAF8]/60" : "text-[#6B7280]"}`}>
                  {pkg.description}
                </p>
                <ul className="space-y-3 mb-4 flex-1">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm">
                      <Check size={14} className="text-[#C9A96E] mt-0.5 shrink-0" />
                      <span className={pkg.highlight ? "text-[#FAFAF8]/80" : "text-[#1A1A18]"}>{f}</span>
                    </li>
                  ))}
                </ul>
                {"notIncluded" in pkg && pkg.notIncluded && (
                  <div className={`mb-5 pt-4 border-t ${pkg.highlight ? "border-white/10" : "border-[#E5E0D8]"}`}>
                    <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${pkg.highlight ? "text-[#FAFAF8]/30" : "text-[#9CA3AF]"}`}>
                      Niet inbegrepen
                    </p>
                    <ul className="space-y-2">
                      {(pkg.notIncluded as string[]).map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs">
                          <X size={12} className={`mt-0.5 shrink-0 ${pkg.highlight ? "text-[#FAFAF8]/25" : "text-[#D1D5DB]"}`} />
                          <span className={pkg.highlight ? "text-[#FAFAF8]/40" : "text-[#9CA3AF]"}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* Content voorbeeld */}
                <div className={`text-xs rounded-lg p-3 mb-6 italic leading-relaxed ${
                  pkg.highlight ? "bg-white/5 text-[#FAFAF8]/50" : "bg-[#F5F1EB] text-[#6B7280]"
                }`}>
                  {pkg.contentExample}
                </div>
                <Link
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center py-3 rounded-full font-semibold text-sm transition-colors mt-auto ${
                    pkg.highlight
                      ? "bg-[#C9A96E] text-[#0F0F0D] hover:bg-[#b8955a]"
                      : "border border-[#1A1A18] text-[#1A1A18] hover:bg-[#1A1A18] hover:text-[#FAFAF8]"
                  }`}
                >
                  Kies {pkg.name}
                </Link>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-sm text-[#6B7280] mt-8">
            Twijfel je welk pakket past? Stuur een WhatsApp, dan denk ik met je mee.
          </p>
        </div>
      </section>

      {/* ─── WERKWIJZE SHOOT DAY ──────────────────────────────────────── */}
      <section className="bg-[#F5F1EB] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1A1A18] mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Zo ziet een shootmoment eruit.
            </h2>
            <p className="text-[#6B7280] max-w-lg mx-auto">
              Geen gedoe, geen stress. Ik regel alles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Calendar size={22} />,
                title: "Voorbereiding",
                desc: "Ideeën, scriptopzet en een opnameschema klaargemaakt. Jij hoeft alleen aanwezig te zijn.",
              },
              {
                icon: <Repeat size={22} />,
                title: "Shoot",
                desc: "We nemen meerdere video's op in één dag. Efficiënt, gericht en zonder tijdverspilling.",
              },
              {
                icon: <TrendingUp size={22} />,
                title: "Edit",
                desc: "Montage, muziek, captions en branding verwerkt. Video's klaar voor publicatie.",
              },
              {
                icon: <Sparkles size={22} />,
                title: "Oplevering",
                desc: "Video's in je inbox binnen 5 werkdagen. Klaar om te posten, meteen of wanneer jij wilt.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#F0E6D0] flex items-center justify-center text-[#C9A96E] mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-[#1A1A18] mb-2">{item.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────── */}
      <section className="bg-[#FAFAF8] py-20 md:py-28">
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
                q: "Wat zijn 'korte staande video's' precies?",
                a: "Verticale video's in 9:16 formaat (zoals Instagram Reels of TikTok), tussen de 15 en 60 seconden. Denk aan: een behind-the-scenes opname van jouw werkdag, een tip of uitleg, een product of dienst in beeld, of een klantreactie. Kort, krachtig en geoptimaliseerd voor de feed.",
              },
              {
                q: "Waarom minimaal 3 maanden?",
                a: "Consistentie is het geheim van social media groei. Eén video doet weinig. Tien video's over drie maanden bouwen zichtbaarheid, bereik en vertrouwen op. Na 3 maanden zie je het verschil. Daarna is het abonnement maandelijks opzegbaar.",
              },
              {
                q: "Moet ik zelf iets doen?",
                a: "Nee. Ik kom naar jou toe, ik bedenk de onderwerpen, ik edit en lever op. Jij hoeft alleen aanwezig te zijn op de shoot dag. De rest regel ik.",
              },
              {
                q: "Kan ik de video's ook plannen via een tool zoals Later of Buffer?",
                a: "Ja. Je ontvangt de video's via WeTransfer of Google Drive en kunt ze importeren in elke planningtool. Op verzoek verzorg ik ook de captionschrijving, zodat je alles kant-en-klaar hebt.",
              },
              {
                q: "Wat als ik niet tevreden ben over een video?",
                a: "Dan passen we het aan. Elk pakket bevat minimaal 1 revisieronde per video. Jij keurt goed voor publicatie.",
              },
              {
                q: "Hoeveel kost een video per stuk?",
                a: "In het Start pakket betaal je €275 voor 1 Reel per maand. Instagram Reels pakket: €225 per Reel (2 per maand). Premium: €162,50 per Reel (4 per maand). Ter vergelijking: een freelance video-editor vraagt al snel €100 tot 150 per video voor editing alleen. Mijn pakket omvat shoot, edit, captions, posten en analyse.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group bg-[#F5F1EB] rounded-xl border border-[#E5E0D8] p-5 cursor-pointer"
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

      {/* ─── BLOG CTA ─────────────────────────────────────────────────── */}
      <section className="bg-[#F5F1EB] py-12 border-t border-[#E5E0D8]">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#C9A96E]/20 flex items-center justify-center text-[#C9A96E] shrink-0">
              <Users size={18} />
            </div>
            <div>
              <p className="font-semibold text-[#1A1A18] text-sm">Waarom video meer klanten oplevert dan advertenties</p>
              <p className="text-xs text-[#6B7280]">Lees onze blogs over content, bereik en AI</p>
            </div>
          </div>
          <Link
            href="/blog"
            className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-[#C9A96E] hover:gap-3 transition-all"
          >
            Naar de blog <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="bg-[#1A1A18] py-20 text-[#FAFAF8] text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2
            className="text-3xl md:text-5xl font-bold mb-5"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Klaar voor maandelijkse content?
          </h2>
          <p className="text-[#FAFAF8]/60 mb-8">
            Stuur een WhatsApp, dan kijk ik samen met je welk abonnement het beste past.
          </p>
          <Link
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#1dbd5a] transition-colors"
          >
            <MessageCircle size={18} />
            App mij op WhatsApp
          </Link>
        </div>
      </section>
    </>
  );
}
