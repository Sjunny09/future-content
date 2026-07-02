import type { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/blog";
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
  if (!post) {
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

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return children;
}
