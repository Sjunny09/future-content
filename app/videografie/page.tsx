import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { VIDEO_LINKS, PHOTOS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Videografie",
  description:
    "Video voor makelaars, bedrijven en bruiloften in de Kempen en Eindhoven. Vastgoedvideo's, social media content en trouwfilms.",
  alternates: { canonical: "/videografie" },
};

const IMAGES = [PHOTOS[2], PHOTOS[1], PHOTOS[5], PHOTOS[8]];

export default function VideografiePage() {
  return (
    <main className="bg-[#F3ECE0]">
      <section className="max-w-6xl mx-auto px-6 pt-32 pb-14 md:pt-40">
        <span className="text-[#B45F38] text-xs font-semibold uppercase tracking-[0.2em]">
          Waar het begon
        </span>
        <h1
          className="text-4xl md:text-[3.2rem] font-bold text-[#2A2218] mt-4 leading-[1.05] max-w-2xl tracking-[-0.01em]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Videografie die mensen laat stilstaan.
        </h1>
        <p className="text-[#6E6151] text-lg mt-5 max-w-xl leading-relaxed">
          Future Content begon met video, en dat blijf ik doen. Strak, snel en klaar voor
          gebruik. Kies waar je meer over wilt zien.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-28">
        <div className="grid sm:grid-cols-2 gap-5">
          {VIDEO_LINKS.map((v, i) => (
            <Link
              key={v.href}
              href={v.href}
              className="group relative overflow-hidden rounded-2xl bg-[#221C14] min-h-[280px] flex flex-col justify-end p-8"
            >
              <Image
                src={IMAGES[i] ?? PHOTOS[0]}
                alt={v.label}
                fill
                className="object-cover opacity-45 group-hover:opacity-55 group-hover:scale-[1.03] transition-all duration-700"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="relative z-10">
                <h2
                  className="text-2xl font-bold text-[#F3ECE0] mb-1.5"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {v.label}
                </h2>
                <p className="text-[#F3ECE0]/70 text-sm mb-4">{v.desc}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#B45F38] group-hover:gap-3 transition-all">
                  Bekijk <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
