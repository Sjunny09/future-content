"use client";

/**
 * De Future Content wordmark: "FUTURE" (900) + "CONTENT" (300), met de
 * knipperende klei-cursor als vast herkenningspunt. De lijm die de twee skins
 * (AI + Film) als één merk laat lezen. Helvetica vet-dun contrast = de
 * typografische handtekening uit het handboek.
 *
 * theme "dark"  -> lichte wordmark (op inkt/donker)
 *       "light" -> donkere wordmark (op linnen/licht)
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
  const ink = theme === "dark" ? "text-[#F3ECE0]" : "text-[#2A2218]";

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
