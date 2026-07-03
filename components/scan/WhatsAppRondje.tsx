"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SITE } from "@/lib/constants"
import { WhatsAppGlyph } from "./ContactIcons"

// Alternatief bij vraag 1: liever direct appen dan de vragen doorlopen.
// John "springt" uit het rondje: een cutout-PNG (transparante achtergrond)
// die boven de disc uitsteekt en op hover een sprongetje maakt.
//
// Foto (John levert aan): public/images/john-whatsapp.png
//   → uitgeknipt, transparante achtergrond, hoofd/schouders, recht van voren.
//   → zo steekt z'n hoofd vanzelf boven het rondje uit.
// Ontbreekt de foto nog? Dan valt 'ie terug op een WhatsApp-glyph in de disc,
// zodat de layout nooit breekt.

const FOTO = "/photos/john-scan.jpg"
const WA_TEKST = "Hoi John, ik ben met je AI-scan bezig en app je liever even direct."

export function WhatsAppRondje() {
  const [fotoKapot, setFotoKapot] = useState(false)
  const waUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(WA_TEKST)}`

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-2 inline-flex items-center gap-4"
    >
      <div className="relative h-[80px] w-[80px] shrink-0">
        {/* Disc achter John */}
        <div
          className="absolute bottom-0 left-1/2 h-[70px] w-[70px] -translate-x-1/2 rounded-full"
          style={{
            backgroundColor: "var(--color-scan-linnen)",
            border: "1px solid var(--color-scan-border)",
          }}
        />

        {/* John's foto rond in de disc (of glyph-fallback) */}
        {!fotoKapot ? (
          <motion.img
            src={FOTO}
            alt="John Lavrijsen"
            onError={() => setFotoKapot(true)}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 420, damping: 16 }}
            className="absolute bottom-0 left-1/2 h-[70px] w-[70px] -translate-x-1/2 rounded-full object-cover"
            style={{ objectPosition: "50% 22%" }}
          />
        ) : (
          <div className="absolute inset-0 flex items-end justify-center pb-3">
            <WhatsAppGlyph className="h-8 w-8" />
          </div>
        )}

        {/* WhatsApp-badge rechtsonder */}
        <span
          className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full ring-2 ring-white"
          style={{ backgroundColor: "#25D366" }}
        >
          <WhatsAppGlyph className="h-3.5 w-3.5 text-white" />
        </span>
      </div>

      <div>
        <p
          className="text-base font-medium"
          style={{ color: "var(--color-scan-drukinkt)" }}
        >
          Stuur je me liever direct een berichtje?
        </p>
        <p
          className="text-sm underline-offset-4 group-hover:underline"
          style={{ color: "var(--color-scan-terracotta)" }}
        >
          App me even op WhatsApp
        </p>
      </div>
    </a>
  )
}
