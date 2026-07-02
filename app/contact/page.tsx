"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Clock, ArrowRight, CheckCircle, Instagram } from "lucide-react";
import { SITE, REGIONS, SOCIALS } from "@/lib/constants";

type FormData = {
  naam: string;
  bedrijf: string;
  email: string;
  telefoon: string;
  type: string;
  locatie: string;
  datum: string;
  bericht: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    naam: "", bedrijf: "", email: "", telefoon: "",
    type: "", locatie: "", datum: "", bericht: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-[#E4D8C6] bg-[#F3ECE0] text-[#2A2218] text-sm placeholder:text-[#A89A85] focus:outline-none focus:border-[#B45F38] focus:ring-2 focus:ring-[#B45F38]/20 transition-all";

  return (
    <>
      {/* ─── HEADER ───────────────────────────────────────────────────── */}
      <section className="bg-[#F3ECE0] pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[#B45F38] text-xs font-semibold uppercase tracking-widest mb-4">
              Contact
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold text-[#2A2218] mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Plan een belafspraak.
            </h1>
            <p className="text-[#6E6151] text-lg max-w-xl leading-relaxed">
              Vul het formulier in of neem direct contact op. We reageren doorgaans binnen één werkdag.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── FORM + INFO ──────────────────────────────────────────────── */}
      <section className="bg-[#F3ECE0] pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#ECE2D2] rounded-2xl p-10 text-center"
                >
                  <CheckCircle size={40} className="text-[#B45F38] mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-[#2A2218] mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
                    Bericht ontvangen!
                  </h2>
                  <p className="text-[#6E6151]">
                    Bedankt voor je bericht. We nemen doorgaans binnen één werkdag contact met je op.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#2A2218] mb-1.5">Naam *</label>
                      <input
                        name="naam"
                        value={form.naam}
                        onChange={handleChange}
                        placeholder="Jan de Vries"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#2A2218] mb-1.5">Bedrijf</label>
                      <input
                        name="bedrijf"
                        value={form.bedrijf}
                        onChange={handleChange}
                        placeholder="Bedrijfsnaam (optioneel)"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#2A2218] mb-1.5">E-mailadres *</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jan@bedrijf.nl"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#2A2218] mb-1.5">Telefoon</label>
                      <input
                        name="telefoon"
                        type="tel"
                        value={form.telefoon}
                        onChange={handleChange}
                        placeholder="+31 6 12345678"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#2A2218] mb-1.5">Waar gaat het over *</label>
                      <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      >
                        <option value="">Selecteer type</option>
                        <option value="ai-automatisering">AI / automatisering</option>
                        <option value="vastgoed-walkthrough">Vastgoed: Walkthrough</option>
                        <option value="vastgoed-premium">Vastgoed: Premium + Drone</option>
                        <option value="social-starter">Social Media: Starter</option>
                        <option value="social-pro">Social Media: Pro</option>
                        <option value="social-premium">Social Media: Premium</option>
                        <option value="zakelijk">Zakelijke video</option>
                        <option value="bruiloft">Bruiloftsvideo</option>
                        <option value="events">Events / After movie</option>
                        <option value="overig">Anders / Weet ik nog niet</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#2A2218] mb-1.5">Locatie / Stad</label>
                      <input
                        name="locatie"
                        value={form.locatie}
                        onChange={handleChange}
                        placeholder="Bijv. Eindhoven of Bladel"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A2218] mb-1.5">Voorkeursdatum / Periode</label>
                    <input
                      name="datum"
                      value={form.datum}
                      onChange={handleChange}
                      placeholder="Bijv. week 15 of begin mei"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A2218] mb-1.5">Bericht</label>
                    <textarea
                      name="bericht"
                      value={form.bericht}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Vertel iets over het project, bijzonderheden of vragen die je hebt..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-500 text-sm">Er ging iets mis. Probeer het opnieuw of stuur een e-mail.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 rounded-full bg-[#2A2218] text-[#F3ECE0] font-semibold hover:bg-[#B45F38] hover:text-[#F3ECE0] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? "Versturen..." : "Verstuur bericht"}
                    {status !== "loading" && <ArrowRight size={16} />}
                  </button>

                  <p className="text-xs text-[#A89A85] text-center">
                    We reageren doorgaans binnen één werkdag. Geen spam, geen verplichtingen.
                  </p>
                </form>
              )}
            </div>

            {/* Contact info sidebar */}
            <div className="lg:col-span-2 space-y-8">
              {/* Direct contact */}
              <div className="bg-[#ECE2D2] rounded-2xl p-7">
                <h3 className="font-bold text-[#2A2218] mb-5">Direct contact</h3>
                <div className="space-y-4">
                  <a
                    href={`tel:${SITE.phone}`}
                    className="flex items-center gap-3 text-sm text-[#2A2218] hover:text-[#B45F38] transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#F3ECE0] flex items-center justify-center shrink-0">
                      <Phone size={15} className="text-[#B45F38]" />
                    </div>
                    {SITE.phone}
                  </a>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-center gap-3 text-sm text-[#2A2218] hover:text-[#B45F38] transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#F3ECE0] flex items-center justify-center shrink-0">
                      <Mail size={15} className="text-[#B45F38]" />
                    </div>
                    {SITE.email}
                  </a>
                  <div className="flex items-center gap-3 text-sm text-[#6E6151]">
                    <div className="w-9 h-9 rounded-full bg-[#F3ECE0] flex items-center justify-center shrink-0">
                      <MapPin size={15} className="text-[#B45F38]" />
                    </div>
                    {SITE.address}
                  </div>
                  <a
                    href={SOCIALS.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-[#2A2218] hover:text-[#B45F38] transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#F3ECE0] flex items-center justify-center shrink-0">
                      <Instagram size={15} className="text-[#B45F38]" />
                    </div>
                    {SOCIALS.instagram.handle}
                  </a>
                </div>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${SITE.whatsapp}?text=Hallo%20Future%20Content%2C%20ik%20wil%20graag%20een%20belafspraak%20plannen.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:bg-[#128C7E] transition-colors"
                >
                  <MessageCircle size={16} />
                  WhatsApp sturen
                </a>
              </div>

              {/* Response time */}
              <div className="flex items-start gap-3 text-sm text-[#6E6151]">
                <Clock size={15} className="text-[#B45F38] mt-0.5 shrink-0" />
                <span>We reageren <strong className="text-[#2A2218]">doorgaans binnen één werkdag</strong> op werkdagen.</span>
              </div>

              {/* Service area */}
              <div>
                <h3 className="font-bold text-[#2A2218] mb-4">Werkgebied</h3>
                <div className="space-y-4">
                  {REGIONS.map((region) => (
                    <div key={region.name}>
                      <p className="text-sm font-semibold text-[#B45F38] mb-1">{region.name}</p>
                      <p className="text-xs text-[#6E6151]">{region.cities.join(" · ")}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
