import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { zichtbareKlanten } from "@/lib/klanten";

export const metadata: Metadata = {
  title: "Onze klanten",
  description: "Bedrijven die ik met AI op weg heb geholpen, met wat ik voor ze deed en de blogs erover.",
  alternates: { canonical: "/klanten" },
};

export default function KlantenPage() {
  return (
    <>
      <section className="bg-[#F3ECE0] pt-32 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <span className="inline-block text-[#B45F38] text-xs font-semibold uppercase tracking-widest mb-4">
            Klanten
          </span>
          <h1
            className="text-4xl md:text-6xl font-bold text-[#2A2218] mb-5"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Onze klanten.
          </h1>
          <p className="text-[#6E6151] text-lg max-w-2xl">
            Bedrijven die ik met AI op weg heb geholpen. Klik op een logo voor wat ik voor ze deed.
          </p>
        </div>
      </section>

      <section className="bg-[#F3ECE0] pb-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {zichtbareKlanten().map((k) => (
            <Link
              key={k.slug}
              href={`/klanten/${k.slug}`}
              className="group flex flex-col justify-between bg-white rounded-2xl border border-[#E4D8C6] p-8 hover:border-[#B45F38] hover:shadow-md transition-all"
            >
              <div className="relative h-20 w-full mb-6">
                <Image src={k.logo} alt={`Logo ${k.naam}`} fill sizes="300px" className="object-contain object-left" />
              </div>
              <div>
                <p className="text-sm text-[#6E6151] mb-4">{k.wat}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#B45F38] group-hover:gap-2 transition-all">
                  Wat ik voor ze deed <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
