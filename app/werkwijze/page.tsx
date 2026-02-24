"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Clock, Download, MessageSquare, Camera, Film, Send } from "lucide-react";
import { PHOTOS } from "@/lib/constants";

export default function WerkwijzePage() {
  return (
    <>
      {/* ─── HEADER ───────────────────────────────────────────────────── */}
      <section className="bg-[#F5F1EB] pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-block text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-4">
              Werkwijze
            </span>
            <h1
              className="text-4xl md:text-6xl font-bold text-[#1A1A18] mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Van aanvraag tot oplevering.
            </h1>
            <p className="text-[#6B7280] text-lg leading-relaxed">
              Geen verrassingen. Geen gedoe. Wij werken met een duidelijke werkwijze
              zodat jij precies weet wat je kunt verwachten.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── TIJDLIJN ─────────────────────────────────────────────────── */}
      <section className="bg-[#FAFAF8] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-0">
            {[
              {
                num: "01",
                icon: <MessageSquare size={20} />,
                title: "Aanvraag & eerste gesprek",
                duration: "15–30 min",
                desc: "Je stuurt een bericht of belt. We plannen een kort gesprek in om te bespreken wat je nodig hebt: type video, locatie, timing en eventuele bijzonderheden. Geen lange formulieren — gewoon praten.",
                details: ["Bepaal het type shoot (vastgoed, social, zakelijk)", "Kies een datum en tijdstip", "Bespreek stijl en sfeer"],
              },
              {
                num: "02",
                icon: <Film size={20} />,
                title: "Voorbereiding",
                duration: "1–3 dagen voor de shoot",
                desc: "Wij bereiden alles voor. Scripts, opnameschema, benodigde apparatuur en eventuele locatiecheck. Jij hoeft alleen te zorgen dat de locatie klaar is.",
                details: ["Scripts worden afgestemd op jouw boodschap", "Opnameschema klaar voor de shoot dag", "Tips voor styling en voorbereiding (vastgoed)"],
              },
              {
                num: "03",
                icon: <Camera size={20} />,
                title: "Shoot dag",
                duration: "1–3 uur op locatie",
                desc: "We komen naar jou toe met alle apparatuur. Sony A6400 + Rode Wireless GO voor vastgoed, telefoon + Rode Wireless voor social media. Jij hoeft niks te doen.",
                details: ["Vastgoed: Sony A6400 + Rode Wireless GO + RS Mini Ronin", "Social media: telefoon + Rode Wireless GO", "Drone shots met DJI Mini 3 Pro (optioneel/Premium)"],
              },
              {
                num: "04",
                icon: <Film size={20} />,
                title: "Edit & nabewerking",
                duration: "Enkele dagen",
                desc: "Wij editen de video('s) professioneel: kleurcorrectie, muziek, ondertiteling, branding en formaat-optimalisatie. Jij ontvangt de video's klaar voor publicatie.",
                details: ["Kleurcorrectie & grading", "Muziek uit rechtenvrije bibliotheek", "Captions & tekst overlays", "Horizontaal (16:9) + verticaal (9:16)"],
              },
              {
                num: "05",
                icon: <Send size={20} />,
                title: "Oplevering & feedback",
                duration: "Vastgoed: binnen 1 week",
                desc: "Je ontvangt de bestanden via WeTransfer of Google Drive. Heb je feedback? Dan passen we het aan met één gratis revisieronde. Daarna zijn de video's van jou.",
                details: ["Levering via WeTransfer of Google Drive", "1 gratis revisieronde inbegrepen", "Extra revisies op aanvraag"],
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6 md:gap-10 pb-12 relative"
              >
                {/* Line */}
                {i < 4 && (
                  <div className="absolute left-6 top-14 bottom-0 w-px bg-[#E5E0D8]" />
                )}

                {/* Number */}
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#C9A96E] flex items-center justify-center text-[#0F0F0D] font-bold text-sm">
                    {step.num}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h2 className="text-xl font-bold text-[#1A1A18]">{step.title}</h2>
                    <span className="flex items-center gap-1 text-xs text-[#6B7280] bg-[#F5F1EB] px-3 py-1 rounded-full">
                      <Clock size={11} />
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-[#6B7280] leading-relaxed mb-4 text-sm">{step.desc}</p>
                  <ul className="space-y-2">
                    {step.details.map((d, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-[#1A1A18]">
                        <CheckCircle size={14} className="text-[#C9A96E] shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SHOOT DAY DETAIL / MAKELAARS ─────────────────────────────── */}
      <section className="bg-[#F5F1EB] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-4">
                Voor makelaars
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#1A1A18] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Wat heb ik nodig van jou?
              </h2>
              <p className="text-[#6B7280] mb-6 leading-relaxed">
                Zo min mogelijk. Jij bent makelaar, niet regisseur. Wij regelen de rest.
              </p>

              <div className="space-y-4">
                <h3 className="font-semibold text-[#1A1A18]">Wat jij regelt:</h3>
                {[
                  "Toegang tot het object (sleutels of aanwezigheid)",
                  "Tijdslot van 1–2 uur voor de shoot",
                  "Schone, opgeruimde woning",
                  "Eventuele bijzonderheden (slimme verlichting, bijgebouwen, etc.)",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle size={15} className="text-[#C9A96E] mt-0.5 shrink-0" />
                    <span className="text-[#1A1A18]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                <h3 className="font-semibold text-[#1A1A18]">Wij nemen mee:</h3>
                {[
                  "Sony A6400 + Rode Wireless GO + DJI RS Mini Ronin (vastgoed)",
                  "Telefoon + Rode Wireless GO (social media)",
                  "DJI Mini 3 Pro drone (bij Premium vastgoedpakket)",
                  "Volledig opnameschema",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle size={15} className="text-[#C9A96E] mt-0.5 shrink-0" />
                    <span className="text-[#1A1A18]">{item}</span>
                  </div>
                ))}
              </div>

              {/* PDF Checklist placeholder */}
              <div className="mt-8 p-4 rounded-xl border border-dashed border-[#C9A96E] flex items-center gap-3">
                <Download size={18} className="text-[#C9A96E] shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-[#1A1A18]">Shoot-day checklist (PDF)</p>
                  <p className="text-xs text-[#6B7280]">Binnenkort beschikbaar — vraag nu op via contact</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src={PHOTOS[4]}
                alt="Shoot dag voorbereiding"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── OPLEVERING INFO ──────────────────────────────────────────── */}
      <section className="bg-[#FAFAF8] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1A1A18] mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Oplevering & formaten.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Horizontaal (16:9)", usage: "Funda, website, YouTube, email", icon: "▬" },
              { title: "Verticaal (9:16)", usage: "Instagram Reels, TikTok, Stories", icon: "▮" },
              { title: "Levering binnen 48u", usage: "WeTransfer of Google Drive, MP4 formaat", icon: "⚡" },
            ].map((item, i) => (
              <div key={i} className="p-7 rounded-2xl border border-[#E5E0D8] text-center">
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h3 className="font-semibold text-[#1A1A18] mb-2">{item.title}</h3>
                <p className="text-sm text-[#6B7280]">{item.usage}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="bg-[#0F0F0D] py-20 text-center text-[#FAFAF8]">
        <div className="max-w-2xl mx-auto px-6">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Klaar om te beginnen?
          </h2>
          <p className="text-[#FAFAF8]/60 mb-8">
            Plan een belafspraak en we bespreken jouw situatie stap voor stap.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C9A96E] text-[#0F0F0D] font-semibold hover:bg-[#b8955a] transition-colors"
          >
            Plan een belafspraak <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
