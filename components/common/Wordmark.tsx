"use client";

/**
 * De Future Content wordmark: "FUTURE" (900) boven/naast "CONTENT" (300),
 * met de gouden knipper-cursor als vast herkenningspunt. Dit is de lijm
 * die de twee skins (AI + video) als één merk laat lezen.
 *
 * theme: "dark"  -> witte wordmark (voor donkere/AI-achtergrond)
 *        "light" -> donkere wordmark (voor lichte achtergrond)
 */
export default function Wordmark({
  theme = "dark",
  className = "",
  stacked = false,
  showCaret = true,
}: {
  theme?: "dark" | "light";
  className?: string;
  stacked?: boolean;
  showCaret?: boolean;
}) {
  const ink = theme === "dark" ? "text-[#FAFAF8]" : "text-[#1A1A18]";

  return (
    <span
      className={`fc-wordmark inline-flex ${
        stacked ? "flex-col leading-[0.9]" : "flex-row items-baseline gap-[0.28em]"
      } ${ink} ${className}`}
      aria-label="Future Content"
    >
      <span className="font-black">FUTURE</span>
      <span className="inline-flex items-baseline">
        <span className="font-light">CONTENT</span>
        {showCaret && (
          <span
            className="fc-caret ml-[0.14em] h-[0.78em] w-[0.42em] translate-y-[0.02em]"
            aria-hidden
          />
        )}
      </span>
    </span>
  );
}
