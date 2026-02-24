"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";

type FormState = {
  naam: string;
  telefoon: string;
  tijd: string;
};

export default function FloatingCTA() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>({ naam: "", telefoon: "", tijd: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          naam: form.naam,
          telefoon: form.telefoon,
          type: "terugbelverzoek",
          bericht: `Terugbelverzoek. Gewenste tijd: ${form.tijd || "Zo snel mogelijk"}`,
          email: "terugbelverzoek@formulier.nl",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <AnimatePresence>
          {!open && (
            <motion.button
              key="btn"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => setOpen(true)}
              className="group flex items-center gap-2.5 pl-4 pr-5 py-3.5 rounded-full bg-[#C9A96E] text-[#0F0F0D] font-semibold shadow-lg hover:bg-[#b8955a] transition-colors"
            >
              <Phone size={17} className="shrink-0" />
              <span className="text-sm">Bel mij terug</span>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Popup panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-6 right-6 z-50 w-full max-w-sm bg-[#FAFAF8] rounded-2xl shadow-2xl p-7"
            >
              {/* Close */}
              <button
                onClick={() => { setOpen(false); setStatus("idle"); }}
                className="absolute top-4 right-4 text-[#6B7280] hover:text-[#1A1A18]"
              >
                <X size={18} />
              </button>

              {status === "success" ? (
                <div className="text-center py-4">
                  <div className="w-14 h-14 rounded-full bg-[#F0E6D0] flex items-center justify-center mx-auto mb-4">
                    <Phone size={22} className="text-[#C9A96E]" />
                  </div>
                  <h3 className="font-bold text-[#1A1A18] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                    Verzoek ontvangen!
                  </h3>
                  <p className="text-sm text-[#6B7280]">
                    We bellen je zo snel mogelijk terug. Bedankt!
                  </p>
                </div>
              ) : (
                <>
                  <h3
                    className="text-xl font-bold text-[#1A1A18] mb-1"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Bel mij terug
                  </h3>
                  <p className="text-sm text-[#6B7280] mb-5">
                    Laat je nummer achter en we bellen je zo snel mogelijk terug.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <input
                        name="naam"
                        value={form.naam}
                        onChange={handleChange}
                        placeholder="Jouw naam *"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#E5E0D8] text-sm text-[#1A1A18] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 transition-all"
                      />
                    </div>
                    <div>
                      <input
                        name="telefoon"
                        type="tel"
                        value={form.telefoon}
                        onChange={handleChange}
                        placeholder="Telefoonnummer *"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#E5E0D8] text-sm text-[#1A1A18] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 transition-all"
                      />
                    </div>
                    <div>
                      <select
                        name="tijd"
                        value={form.tijd}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-[#E5E0D8] text-sm text-[#6B7280] focus:outline-none focus:border-[#C9A96E] transition-all bg-white"
                      >
                        <option value="">Wanneer bellen? (optioneel)</option>
                        <option value="Ochtend (9–12u)">Ochtend (9–12u)</option>
                        <option value="Middag (12–17u)">Middag (12–17u)</option>
                        <option value="Avond (17–20u)">Avond (17–20u)</option>
                        <option value="Zo snel mogelijk">Zo snel mogelijk</option>
                      </select>
                    </div>

                    {status === "error" && (
                      <p className="text-red-500 text-xs">Er ging iets mis. Probeer het opnieuw.</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-3.5 rounded-full bg-[#1A1A18] text-[#FAFAF8] font-semibold text-sm hover:bg-[#C9A96E] hover:text-[#0F0F0D] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {status === "loading" ? "Versturen..." : "Stuur terugbelverzoek"}
                      {status !== "loading" && <ArrowRight size={14} />}
                    </button>
                  </form>

                  <div className="mt-4 pt-4 border-t border-[#E5E0D8] flex items-center justify-center gap-2">
                    <a
                      href={`tel:${SITE.phone}`}
                      className="text-xs text-[#6B7280] hover:text-[#C9A96E] transition-colors"
                    >
                      Of bel direct: {SITE.phone}
                    </a>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
