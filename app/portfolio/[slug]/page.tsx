import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, MapPin, MessageCircle } from "lucide-react";
import { STACK_VIDEOS, SITE } from "@/lib/constants";
import VideoPlayer from "@/components/common/VideoPlayer";
import type { Metadata } from "next";

// ── Static paths ──────────────────────────────────────────────────────────────
// Tell Next.js which slugs exist at build time so these pages are pre-rendered.
export function generateStaticParams() {
  return STACK_VIDEOS.map((v) => ({ slug: v.slug }));
}

// ── Per-page SEO metadata ─────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const video = STACK_VIDEOS.find((v) => v.slug === slug);
  if (!video) return {};

  return {
    title: `${video.title} | Vastgoedvideo | Future Content`,
    description: `Bekijk de premium vastgoedvideo van ${video.title}, gemaakt door Future Content voor Pit Makelaars. Professionele walkthrough video voor Funda en social media.`,
    openGraph: {
      title: `${video.title} | Vastgoedvideo | Future Content`,
      description: `Premium vastgoedvideo voor ${video.location}. Gemaakt door Future Content voor Pit Makelaars.`,
      images: [{ url: video.poster, width: 1200, height: 630, alt: video.title }],
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const video = STACK_VIDEOS.find((v) => v.slug === slug);

  // Return 404 for unknown slugs (type-safe, no client-side redirect needed)
  if (!video) notFound();

  const waLink = `https://wa.me/${SITE.whatsapp}?text=Hallo%20John%2C%20ik%20ben%20geïnteresseerd%20in%20een%20vastgoedvideo%20voor%20mijn%20object.`;

  // VideoObject schema helps Google and AI engines understand this is a video page.
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `Vastgoedvideo ${video.title}`,
    description: `Premium vastgoedvideo van ${video.title}, gemaakt door Future Content voor Pit Makelaars. Professionele walkthrough voor Funda en social media.`,
    thumbnailUrl: `${SITE.url}${video.poster}`,
    uploadDate: "2024-01-01",
    contentUrl: `${SITE.url}${video.src}`,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };

  // Find adjacent videos for prev/next navigation
  const currentIndex = STACK_VIDEOS.findIndex((v) => v.slug === slug);
  const prevVideo = currentIndex > 0 ? STACK_VIDEOS[currentIndex - 1] : null;
  const nextVideo = currentIndex < STACK_VIDEOS.length - 1 ? STACK_VIDEOS[currentIndex + 1] : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />

      {/* ─── BACK + BREADCRUMB ────────────────────────────────────────── */}
      <div className="bg-[#FAFAF8] pt-24 pb-4">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#C9A96E] transition-colors"
          >
            <ArrowLeft size={14} />
            Terug naar portfolio
          </Link>
        </div>
      </div>

      {/* ─── VIDEO ────────────────────────────────────────────────────── */}
      <section className="bg-[#0F0F0D]">
        <div className="max-w-4xl mx-auto">
          <VideoPlayer
            src={video.src}
            poster={video.poster}
            title={video.title}
          />
        </div>
      </section>

      {/* ─── INFO ─────────────────────────────────────────────────────── */}
      <section className="bg-[#FAFAF8] py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <span className="inline-block text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-2">
                Portfolio Pit Makelaars
              </span>
              <h1
                className="text-3xl md:text-4xl font-bold text-[#1A1A18] mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {video.title}
              </h1>
              <div className="flex items-center gap-1.5 text-[#6B7280] text-sm">
                <MapPin size={13} />
                {video.location}
              </div>
            </div>

            <Link
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1dbd5a] transition-colors"
            >
              <MessageCircle size={14} />
              Ook zo&apos;n video?
            </Link>
          </div>

          {/* Deliverables */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-[#F5F1EB] border border-[#E5E0D8]">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A96E] mb-3">
                Opgeleverd
              </p>
              <ul className="space-y-2">
                {[
                  "Premium walkthrough video (16:9)",
                  "Sociale teaser (9:16) voor Instagram",
                  "Professionele audio & muziek",
                  "Klaar voor Funda & social media",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[#1A1A18]">
                    <Check size={13} className="text-[#C9A96E] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-[#F5F1EB] border border-[#E5E0D8]">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A96E] mb-3">
                Opdrachtgever
              </p>
              <p className="text-sm text-[#1A1A18] font-medium mb-1">Pit Makelaars</p>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Vaste samenwerking voor vastgoedvideo&apos;s in de regio Eindhoven,
                Veldhoven en De Kempen. Alle video&apos;s zijn opgeleverd als Premium pakket.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CASE DETAILS ─────────────────────────────────────────────── */}
      <section className="bg-[#FAFAF8] border-t border-[#E5E0D8] py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Context */}
            <div>
              <span className="inline-block text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-3">
                Over dit object
              </span>
              <p className="text-xs font-semibold text-[#1A1A18] uppercase tracking-wider mb-3">
                {video.details.propertyType}
              </p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                {video.details.context}
              </p>
            </div>

            {/* Challenges + Result */}
            <div className="space-y-6">
              <div>
                <span className="inline-block text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-3">
                  Uitdagingen tijdens de shoot
                </span>
                <ul className="space-y-2">
                  {video.details.challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#1A1A18]">
                      <span className="text-[#C9A96E] mt-0.5 shrink-0 font-bold">→</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-[#F5F1EB] border border-[#E5E0D8]">
                <span className="block text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-2">
                  Resultaat
                </span>
                <p className="text-sm text-[#1A1A18] leading-relaxed">
                  {video.details.result}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PREV / NEXT ──────────────────────────────────────────────── */}
      <section className="bg-[#F5F1EB] border-t border-[#E5E0D8] py-10">
        <div className="max-w-4xl mx-auto px-6 flex justify-between gap-4">
          {prevVideo ? (
            <Link
              href={`/portfolio/${prevVideo.slug}`}
              className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#C9A96E] transition-colors"
            >
              <ArrowLeft size={14} />
              <span>{prevVideo.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {nextVideo && (
            <Link
              href={`/portfolio/${nextVideo.slug}`}
              className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#C9A96E] transition-colors"
            >
              <span>{nextVideo.title}</span>
              <ArrowLeft size={14} className="rotate-180" />
            </Link>
          )}
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-[#0F0F0D] py-16 text-center text-[#FAFAF8]">
        <div className="max-w-xl mx-auto px-6">
          <h2
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Jouw object hier?
          </h2>
          <p className="text-[#FAFAF8]/60 text-sm mb-6">
            Plan een shoot en laat kopers jouw woning écht beleven.
          </p>
          <Link
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#1dbd5a] transition-colors text-sm"
          >
            <MessageCircle size={15} />
            App mij op WhatsApp
          </Link>
        </div>
      </section>
    </>
  );
}
