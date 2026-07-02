"use client";

import { motion } from "framer-motion";

type PlatformDiagramProps = {
  /** Toont skin-naam boven het fundament. Default "Branche-skin". */
  skinLabel?: string;
  /** Compactere variant voor in een kaart. */
  compact?: boolean;
  /** Donkere variant (voor sectie op donkere achtergrond). */
  dark?: boolean;
};

/**
 * Editorial SVG-illustratie van het Future Content modulair platform.
 * Onder: 8 core-modules (cross-branche). Boven: branche-skin.
 * Conform DESIGN.md: één accent (gold), warm off-white, near-black, geen
 * gradients of glassmorphism. Hairline borders, ruime witruimte.
 */
export const PlatformDiagram: React.FC<PlatformDiagramProps> = ({
  skinLabel = "Branche-skin",
  compact = false,
  dark = false,
}) => {
  const bg = dark ? "#221C14" : "#F3ECE0";
  const ink = dark ? "#F3ECE0" : "#2A2218";
  const muted = dark ? "#F3ECE0" : "#6E6151";
  const border = dark ? "#F3ECE0" : "#E4D8C6";
  const gold = "#B45F38";

  const blockHeight = compact ? 42 : 56;
  const blockGap = compact ? 4 : 6;
  const skinHeight = compact ? 60 : 80;
  const cols = 4;
  const rows = 2;
  const padding = compact ? 16 : 24;

  const totalWidth = compact ? 360 : 520;
  const blockWidth = (totalWidth - padding * 2 - blockGap * (cols - 1)) / cols;
  const coreHeight = blockHeight * rows + blockGap * (rows - 1);
  const totalHeight = padding * 2 + skinHeight + (compact ? 30 : 40) + coreHeight;

  const skinY = padding;
  const arrowY = skinY + skinHeight + (compact ? 8 : 12);
  const coreStartY = skinY + skinHeight + (compact ? 30 : 40);

  return (
    <div className="relative w-full max-w-[640px] mx-auto">
      <svg
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        width="100%"
        height="auto"
        className="block"
        role="img"
        aria-label="Modulair AI-platform: 8 core-modules met een branche-skin erbovenop."
      >
        {/* Achtergrond */}
        <rect width={totalWidth} height={totalHeight} fill={bg} />

        {/* Skin-blok (boven) */}
        <motion.g
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <rect
            x={padding}
            y={skinY}
            width={totalWidth - padding * 2}
            height={skinHeight}
            rx={8}
            fill="none"
            stroke={gold}
            strokeWidth={1.5}
          />
          <rect
            x={padding}
            y={skinY}
            width={totalWidth - padding * 2}
            height={skinHeight}
            rx={8}
            fill={gold}
            fillOpacity={0.08}
          />
          <text
            x={totalWidth / 2}
            y={skinY + skinHeight / 2 - (compact ? 4 : 6)}
            textAnchor="middle"
            fontSize={compact ? 10 : 11}
            fontWeight={600}
            letterSpacing="1.5"
            fill={gold}
            style={{ textTransform: "uppercase" }}
          >
            {compact ? "SKIN" : "PER BRANCHE"}
          </text>
          <text
            x={totalWidth / 2}
            y={skinY + skinHeight / 2 + (compact ? 12 : 16)}
            textAnchor="middle"
            fontSize={compact ? 13 : 16}
            fontWeight={700}
            fill={ink}
            style={{ fontFamily: "var(--font-playfair, Playfair Display)" }}
          >
            {skinLabel}
          </text>
        </motion.g>

        {/* Verbindingsstreepje */}
        <motion.line
          x1={totalWidth / 2}
          y1={arrowY}
          x2={totalWidth / 2}
          y2={arrowY + (compact ? 16 : 22)}
          stroke={gold}
          strokeWidth={1.5}
          strokeDasharray="2 3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        />

        {/* Core-modules (onder) */}
        <motion.g
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.04, delayChildren: 0.4 } },
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const x = padding + col * (blockWidth + blockGap);
            const y = coreStartY + row * (blockHeight + blockGap);
            return (
              <motion.g
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <rect
                  x={x}
                  y={y}
                  width={blockWidth}
                  height={blockHeight}
                  rx={4}
                  fill="none"
                  stroke={border}
                  strokeWidth={1}
                />
                <text
                  x={x + blockWidth / 2}
                  y={y + blockHeight / 2 + 4}
                  textAnchor="middle"
                  fontSize={compact ? 12 : 14}
                  fontWeight={600}
                  fill={muted}
                  fillOpacity={0.8}
                >
                  0{i + 1}
                </text>
              </motion.g>
            );
          })}
        </motion.g>

        {/* Label onder core */}
        <motion.text
          x={padding}
          y={totalHeight - (compact ? 4 : 6)}
          fontSize={compact ? 10 : 11}
          fontWeight={600}
          letterSpacing="1.5"
          fill={muted}
          style={{ textTransform: "uppercase" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          viewport={{ once: true }}
        >
          Acht core-modules
        </motion.text>
      </svg>
    </div>
  );
};
