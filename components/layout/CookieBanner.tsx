"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [consent, setConsent] = useState<"accepted" | "declined" | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent");
    if (stored === "accepted") {
      setConsent("accepted");
    } else if (stored === "declined") {
      setConsent("declined");
    } else {
      const t = setTimeout(() => setShow(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setConsent("accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setConsent("declined");
    setShow(false);
  };

  return (
    <>
      {consent === "accepted" && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-DSYW6BSNLR"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DSYW6BSNLR');
            `}
          </Script>
        </>
      )}

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 140, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 140, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 180 }}
            className="fixed bottom-4 left-4 right-4 z-50 flex justify-center pointer-events-none"
          >
            <div className="w-full max-w-sm bg-[#0F0F0D] border border-[#C9A96E]/25 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto">

              {/* Drone + cookie animation */}
              <div className="flex justify-center pt-7 pb-1 select-none">
                <div className="relative flex flex-col items-center">
                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                    className="text-5xl"
                  >
                    🚁
                  </motion.div>
                  {/* String */}
                  <motion.div
                    animate={{ scaleY: [1, 0.85, 1] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                    className="w-px h-6 bg-[#C9A96E]/50 origin-top"
                  />
                  <motion.div
                    animate={{ rotate: [-10, 10, -10] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.15 }}
                    className="text-4xl"
                  >
                    🍪
                  </motion.div>
                </div>
              </div>

              {/* Text + buttons */}
              <div className="px-6 pb-6 pt-3 text-center">
                <h3
                  className="text-[#FAFAF8] font-bold text-lg mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Koekje van onze drone?
                </h3>
                <p className="text-[#FAFAF8]/55 text-sm leading-relaxed mb-5">
                  Onze drone brengt een cookie. Niet om je lastig te vallen, maar om
                  bij te houden hoeveel mensen onze video&apos;s bekijken. Dat helpt ons
                  om beter te worden.
                </p>

                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <button
                    onClick={accept}
                    className="px-5 py-2.5 rounded-full bg-[#C9A96E] text-[#0F0F0D] text-sm font-semibold hover:bg-[#b8955a] transition-colors"
                  >
                    Ja, pak dat koekje
                  </button>
                  <button
                    onClick={decline}
                    className="px-5 py-2.5 rounded-full bg-[#FAFAF8]/8 text-[#FAFAF8]/50 text-sm font-semibold hover:bg-[#FAFAF8]/15 hover:text-[#FAFAF8]/70 transition-colors"
                  >
                    Nee, liever niet
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
