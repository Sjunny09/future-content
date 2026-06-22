import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, ArrowRight, Heart } from "lucide-react";
import { SITE, STACK_VIDEOS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Film",
  description:
    "Video voor makelaars, bedrijven en bruidsparen in De Kempen en omstreken. Shoot now, content later. App John voor een boeking of prijs.",
};

const WA = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
  "Hallo John, ik wil graag een video boeken of een prijs opvragen.",
)}`;

export default function FilmPage() {
  return (
    <>
      {/* ─── Hero (donker) ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0F0F0D] text-[#FAFAF8]">
        {/* Logo-animatie als sfeer-achtergrond (zoals op de live site) */}
        <video
          src="/logo/logo.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0D]/70 via-[#0F0F0D]/40 to-[#0F0F0D]" />
        <div className="relative max-w-5xl mx-auto px-6 pt-40 pb-24 md:pt-48 md:pb-32">
          <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.25em]">
            Future Content · Film
          </span>
          <h1
            className="mt-6 text-5xl md:text-7xl font-semibold leading-[1.02] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Shoot now,
            <br />
            <span className="text-[#C9A96E]">content later.</span>
          </h1>
          <p className="mt-7 text-lg md:text-xl text-[#FAFAF8]/70 max-w-2xl leading-relaxed">
            Video voor makelaars, bedrijven en bruidsparen. Strak gefilmd, snel opgeleverd, gemaakt om
            te verkopen of te bewaren.
          </p>
          <Link
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#1dbd5a] transition-colors"
          >
            <MessageCircle size={18} /> App me om te boeken of een prijs op te vragen
          </Link>
        </div>
      </section>

      {/* ─── Huizenvideo's ─────────────────────────────────────────── */}
      <section className="bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
            Vastgoed
          </span>
          <h2
            className="mt-3 text-3xl md:text-4xl font-semibold text-[#1A1A18]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Huizenvideo's, Funda-ready
          </h2>
          <p className="mt-3 text-[#6B7280] max-w-2xl leading-relaxed">
            Een rondleiding die kopers het gevoel van de woning geeft, voordat ze de drempel over zijn.
          </p>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STACK_VIDEOS.map((v) => (
              <figure
                key={v.id}
                className="rounded-2xl overflow-hidden border border-[#E5E0D8] bg-white"
              >
                <video
                  src={v.src}
                  poster={v.poster}
                  controls
                  preload="none"
                  playsInline
                  className="w-full aspect-video object-cover bg-[#1A1A18]"
                />
                <figcaption className="px-4 py-3">
                  <span className="block text-sm font-semibold text-[#1A1A18]">{v.title}</span>
                  <span className="block text-xs text-[#6B7280]">{v.location}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bruiloftvideo ─────────────────────────────────────────── */}
      <section className="bg-[#F5F1EB] border-t border-[#E5E0D8]">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
            Bruiloft
          </span>
          <h2
            className="mt-3 text-3xl md:text-4xl font-semibold text-[#1A1A18]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Trouwfilms en aftermovies
          </h2>
          <p className="mt-3 text-[#6B7280] max-w-2xl leading-relaxed">
            Bij elke bruiloft krijg je altijd twee films: een korte met de hoogtepunten om te delen,
            en een langere die de hele dag vertelt.
          </p>

          <div className="mt-10 flex flex-col items-center">
            <figure className="w-full max-w-[520px] rounded-2xl overflow-hidden border border-[#E5E0D8] bg-white">
              <video
                src="/videos/Bruiloft%20luuk%20en%20Mandy%20instagram%20v4%20website.mp4"
                controls
                preload="metadata"
                playsInline
                className="w-full aspect-square object-cover bg-[#1A1A18]"
              />
              <figcaption className="px-4 py-3 flex items-center justify-center gap-2">
                <Heart size={15} className="text-[#C9A96E]" />
                <span className="text-sm font-semibold text-[#1A1A18]">Luuk &amp; Mandy</span>
                <span className="text-xs text-[#6B7280]">· korte film</span>
              </figcaption>
            </figure>
            <Link
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#1dbd5a] transition-colors"
            >
              <MessageCircle size={17} /> Vraag naar trouwfilms
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Festivals & evenementen ───────────────────────────────── */}
      <section className="bg-[#FAFAF8] border-t border-[#E5E0D8]">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <span className="text-[#C9A96E] text-xs font-semibold uppercase tracking-[0.2em]">
            Festivals &amp; evenementen
          </span>
          <h2
            className="mt-3 text-3xl md:text-4xl font-semibold text-[#1A1A18]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Aftermovies die de sfeer vangen
          </h2>
          <div className="mt-10 flex justify-center">
            <figure className="w-full max-w-3xl rounded-2xl overflow-hidden border border-[#E5E0D8] bg-black">
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src="https://player.vimeo.com/video/843642501?app_id=122963"
                  className="absolute inset-0 h-full w-full"
                  style={{ border: 0 }}
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                  allowFullScreen
                  title="Köningsdag aftermovie 3.0"
                />
              </div>
              <figcaption className="px-4 py-3 text-center">
                <span className="text-sm font-semibold text-[#1A1A18]">Köningsdag aftermovie</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ─── Slot-CTA ──────────────────────────────────────────────── */}
      <section className="bg-[#0F0F0D] text-[#FAFAF8]">
        <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-2xl font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>
            Iets in gedachten? Eén appje is genoeg.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#1dbd5a] transition-colors"
            >
              <MessageCircle size={17} /> App me
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#FAFAF8]/25 text-[#FAFAF8] font-semibold hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
            >
              Naar AI <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
