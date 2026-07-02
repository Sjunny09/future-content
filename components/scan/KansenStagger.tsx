"use client"

import { motion, useReducedMotion } from "framer-motion"

type Kans = { titel: string; beschrijving?: string }

// Losse client-component omdat framer-motion "use client" nodig heeft; de
// rapportpagina zelf blijft een server component (data komt uit de DB).
// Kansen vliegen 1-2-3 na elkaar in, ~150ms verschil, subtiel (fade + kleine
// translate). Respecteert prefers-reduced-motion (dan meteen zichtbaar).
export function KansenStagger({ kansen }: { kansen: Kans[] }) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="flex flex-col gap-3">
      {kansen.map((k, i) => (
        <motion.div
          key={k.titel}
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: reduceMotion ? 0 : i * 0.15,
            ease: "easeOut",
          }}
          className="rounded-xl border px-4 py-4"
          style={{
            borderColor: "var(--color-scan-border)",
            backgroundColor: "var(--color-scan-linnen)",
          }}
        >
          <div className="flex items-start gap-3">
            <span
              className="text-sm font-bold"
              style={{ color: "var(--color-scan-terracotta)" }}
            >
              0{i + 1}
            </span>
            <div>
              <p
                className="text-base font-semibold"
                style={{ color: "var(--color-scan-drukinkt)" }}
              >
                {k.titel}
              </p>
              {k.beschrijving && (
                <p
                  className="mt-1 text-sm leading-relaxed"
                  style={{ color: "var(--color-scan-muted)" }}
                >
                  {k.beschrijving}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
