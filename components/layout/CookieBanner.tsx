"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";

// Cookie-melding voor Google Analytics (de enige niet-essentiële, cookie-zettende
// dienst op deze site). Plausible-analytics hierboven in app/layout.tsx zet geen
// cookies en verzamelt geen persoonsgegevens, en valt dus buiten deze toestemming.
//
// Privacy-vriendelijke default: GA laadt nooit vanzelf. Alleen na expliciete "ja".
// De melding verschijnt bewust niet meteen bij binnenkomst (geen eerste indruk),
// maar pas na een moment van echt bladeren op de site — zie DELAY_MS.
const DELAY_MS = 6000;

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
      const t = setTimeout(() => setShow(true), DELAY_MS);
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
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-4 left-4 z-50 max-w-[19rem]"
          >
            <div
              className="bg-[#F3ECE0] border border-[#E4D8C6] shadow-[0_4px_24px_rgba(42,34,24,0.12)] p-4"
              style={{ borderRadius: "2px" }}
            >
              <p className="text-[#2A2218] text-xs leading-relaxed">
                Deze site gebruikt Google Analytics om bezoekersaantallen te
                meten, maar alleen als je daar toestemming voor geeft.
              </p>

              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={accept}
                  className="px-3 py-1.5 text-xs font-semibold bg-[#B45F38] text-[#F3ECE0] hover:bg-[#9E3D24] transition-colors"
                  style={{ borderRadius: "2px" }}
                >
                  Akkoord
                </button>
                <button
                  onClick={decline}
                  className="px-3 py-1.5 text-xs font-semibold text-[#6E6151] hover:text-[#2A2218] transition-colors"
                  style={{ borderRadius: "2px" }}
                >
                  Liever niet
                </button>
                <a
                  href="/privacy"
                  className="ml-auto text-xs text-[#6E6151] underline underline-offset-2 hover:text-[#2A2218]"
                >
                  Meer info
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
