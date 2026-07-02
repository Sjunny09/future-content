"use client";

import { motion } from "framer-motion";
import { METHOD_STEPS } from "@/lib/constants";

/**
 * Editorial SVG-illustratie van de stappen-werkwijze van Future Content.
 * Verticale trechter: kennismaking bovenaan (breed instappen) tot bouwen+beheren
 * onderaan (concreet leveren). Conform DESIGN.md: één accent (gold), warm
 * off-white, near-black, geen gradients of glassmorphism. Aantal stappen en
 * de trechterbreedtes volgen automatisch METHOD_STEPS uit lib/constants.ts.
 */
export const WerkwijzeFunnel: React.FC = () => {
  const totalWidth = 480;
  const stepHeight = 56;
  const stepGap = 6;
  const padding = 24;

  // Trechter-effect: elke stap iets smaller dan de vorige, schaalt mee met
  // het aantal stappen in METHOD_STEPS (nu 4, was 6).
  const widths = METHOD_STEPS.map((_, i) => 380 - i * 20);
  const totalHeight =
    padding * 2 + stepHeight * METHOD_STEPS.length + stepGap * (METHOD_STEPS.length - 1);

  return (
    <div className="relative w-full max-w-[560px] mx-auto">
      <svg
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        width="100%"
        height="auto"
        className="block"
        role="img"
        aria-label={`Future Content werkwijze in ${METHOD_STEPS.length} stappen, van kennismaking bovenaan naar bouwen en beheren onderaan.`}
      >
        {/* Achtergrond */}
        <rect width={totalWidth} height={totalHeight} fill="#F3ECE0" />

        {/* Verticale lijn die alle stappen verbindt */}
        <motion.line
          x1={totalWidth / 2}
          y1={padding}
          x2={totalWidth / 2}
          y2={totalHeight - padding}
          stroke="#B45F38"
          strokeOpacity={0.35}
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        />

        {/* 6 stappen */}
        <motion.g
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
          }}
        >
          {METHOD_STEPS.map((step, i) => {
            const width = widths[i];
            const x = (totalWidth - width) / 2;
            const y = padding + i * (stepHeight + stepGap);
            const cx = totalWidth / 2;
            const cy = y + stepHeight / 2;
            return (
              <motion.g
                key={step.n}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  show: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Stap-blok */}
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={stepHeight}
                  rx={6}
                  fill="#ECE2D2"
                  stroke="#E4D8C6"
                  strokeWidth={1}
                />
                {/* Cirkel met stapnummer in het midden */}
                <circle cx={cx} cy={cy} r={14} fill="#F3ECE0" stroke="#B45F38" strokeWidth={1.5} />
                <text
                  x={cx}
                  y={cy + 4}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={700}
                  fill="#B45F38"
                  fontFamily="ui-monospace, monospace"
                >
                  {step.n}
                </text>
                {/* Stap-titel links */}
                <text
                  x={x + 18}
                  y={cy + 5}
                  fontSize={13}
                  fontWeight={600}
                  fill="#2A2218"
                  fontFamily="ui-sans-serif, system-ui, sans-serif"
                >
                  {step.title}
                </text>
              </motion.g>
            );
          })}
        </motion.g>
      </svg>
    </div>
  );
};
