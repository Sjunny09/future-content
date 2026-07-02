"use client";

import { Star } from "lucide-react";
import { REVIEWS } from "@/lib/constants";

/**
 * Reviews-marquee (21st.dev / magicui-patroon), afgestemd op de huisstijl:
 * linnen sectie, klei sterren, kaarten op papier, met fade-randen. De kaarten
 * staan dubbel in de track zodat de lus naadloos doorloopt; hover pauzeert.
 */
export default function Reviews() {
  const cards = [...REVIEWS, ...REVIEWS];

  return (
    <section className="bg-[#ECE2D2] border-t border-[#E4D8C6]">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="mb-12 text-center">
          <p className="fc-mono text-[11px] uppercase tracking-[0.3em] text-[#B45F38]">
            Wat klanten zeggen
          </p>
          <h2
            className="mt-3 text-3xl font-semibold text-[#2A2218] md:text-4xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            5,0 gemiddeld op Google
          </h2>
          <p className="mt-3 text-[#6E6151]">
            Ruim 150 video&apos;s gemaakt voor makelaars, bedrijven en bruidsparen in de Kempen.
          </p>
        </div>
      </div>

      {/* Marquee met fade-randen */}
      <div
        className="relative overflow-hidden pb-20 md:pb-24"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)",
        }}
      >
        <div className="fc-marquee-track flex w-max gap-5">
          {cards.map((r, i) => (
            <figure
              key={i}
              className="flex w-[340px] shrink-0 flex-col gap-4 rounded-2xl border border-[#E4D8C6] bg-[#FBF8F2] p-6"
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-[#B45F38] text-[#B45F38]" />
                ))}
              </div>
              <blockquote className="flex-1 text-sm leading-relaxed text-[#2A2218]">
                &ldquo;{r.text}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-[#E4D8C6] pt-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#B45F38]/15 text-xs font-bold text-[#B45F38]">
                  {r.initials}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-[#2A2218]">{r.name}</span>
                  <span className="block truncate text-xs text-[#6E6151]">{r.company}</span>
                </span>
                <span className="fc-mono ml-auto text-[9px] uppercase tracking-wider text-[#6E6151]">
                  {r.source}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
