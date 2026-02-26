import type { MetadataRoute } from "next";
import { SITE, STACK_VIDEOS } from "@/lib/constants";

// Next.js auto-serves this as /sitemap.xml
// Submit to Google Search Console + Bing Webmaster Tools after deploy.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                    lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/makelaars`,     lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/social-media`,  lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/trouwen`,       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/portfolio`,     lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/werkwijze`,     lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`,          lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/over`,          lastModified: now, changeFrequency: "yearly",  priority: 0.5 },
    { url: `${base}/contact`,       lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
  ];

  // Individual portfolio pages — each gets its own URL for SEO indexing
  const portfolioRoutes: MetadataRoute.Sitemap = STACK_VIDEOS.map((video) => ({
    url: `${base}/portfolio/${video.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...portfolioRoutes];
}
