import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getKlant, zichtbareKlanten } from "@/lib/klanten";
import { blogsVanKlant, gepubliceerdePosts } from "@/lib/blog";
import BlogKaart from "@/components/blog/BlogKaart";

// Elk uur opnieuw: nieuwe blogs verschijnen hier zonder deploy.
export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return zichtbareKlanten().map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const k = getKlant((await params).slug);
  if (!k) return {};
  return {
    title: `${k.naam}: wat ik deed`,
    description: k.wat,
    alternates: { canonical: `/klanten/${k.slug}` },
    openGraph: { title: `${k.naam}: wat ik deed`, description: k.wat, url: `/klanten/${k.slug}`, type: "website" },
  };
}

export default async function KlantPage({ params }: { params: Promise<{ slug: string }> }) {
  const k = getKlant((await params).slug);
  if (!k) notFound();
  const eigen = blogsVanKlant(k.slug);
  const nieuwste = gepubliceerdePosts().filter((p) => p.klant !== k.slug).slice(0, 3);
  const host = new URL(k.website).hostname.replace(/^www\./, "");

  return (
    <>
      <section className="bg-[#F3ECE0] pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/klanten" className="inline-flex items-center gap-1 text-sm text-[#6E6151] hover:text-[#B45F38] mb-8">
            <ArrowLeft size={14} /> Alle klanten
          </Link>
          <div className="relative h-20 w-full max-w-sm mb-8">
            <Image src={k.logo} alt={`Logo ${k.naam}`} fill sizes="400px" className="object-contain object-left" priority />
          </div>
          <h1
            className="text-3xl md:text-5xl font-bold text-[#2A2218] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {k.naam}
          </h1>
          <p className="text-[#6E6151] text-lg mb-8">{k.wat}</p>

          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#B45F38] mb-4">Wat ik deed</h2>
          <ul className="space-y-3 mb-8">
            {k.hulp.map((h) => (
              <li key={h} className="flex gap-3 text-[#2A2218]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#B45F38]" />
                {h}
              </li>
            ))}
          </ul>
          <a
            href={k.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#B45F38] hover:underline"
          >
            {host} <ExternalLink size={14} />
          </a>
        </div>
      </section>

      {eigen.length > 0 && (
        <section className="bg-[#F3ECE0] py-12 border-t border-[#E4D8C6]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-[#2A2218] mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              Blogs over {k.naam}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eigen.map((p) => (
                <BlogKaart key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#F3ECE0] py-12 border-t border-[#E4D8C6]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#2A2218] mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            Nieuwste blogs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nieuwste.map((p) => (
              <BlogKaart key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
