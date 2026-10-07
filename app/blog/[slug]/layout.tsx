import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_POSTS, isGepubliceerd } from "@/lib/blog";
import { SITE } from "@/lib/constants";

// Per-post metadata voor /blog/[slug]. De pagina zelf is een client component
// en kan geen generateMetadata exporteren; zonder deze layout kregen alle
// posts de generieke /blog-metadata (incl. verkeerde canonical). Toegevoegd
// bij de go-live audit 2 juli.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post || !isGepubliceerd(post)) {
    return { title: "Artikel niet gevonden" };
  }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [post.image],
    },
    alternates: {
      canonical: `${SITE.url}/blog/${post.slug}`,
    },
  };
}

// Elk uur opnieuw beoordelen, zodat een ingeplande post op zijn dag verschijnt.
export const revalidate = 3600;

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (post && !isGepubliceerd(post)) notFound();
  return children;
}
