import type { MetadataRoute } from "next";
import { SITE, STACK_VIDEOS, BRANCHES } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog";

// Next.js auto-serves this as /sitemap.xml
// Submit to Google Search Console + Bing Webmaster Tools after deploy.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                    lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/voor`,          lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${base}/werkwijze`,     lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/trainingen`,    lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/scan`,          lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/boek`,          lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/videografie`,   lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/makelaars`,     lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/social-media`,  lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/trouwen`,       lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/portfolio`,     lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/blog`,          lastModified: now, changeFrequency: "weekly",  priority: 0.75 },
    { url: `${base}/over`,          lastModified: now, changeFrequency: "yearly",  priority: 0.5 },
    { url: `${base}/contact`,       lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
  ];

  // Branchepagina's per skin (uit BRANCHES) — strategische landingspages
  const brancheRoutes: MetadataRoute.Sitemap = BRANCHES.map((b) => ({
    url: `${base}/voor/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Individual portfolio pages — each gets its own URL for SEO indexing
  const portfolioRoutes: MetadataRoute.Sitemap = STACK_VIDEOS.map((video) => ({
    url: `${base}/portfolio/${video.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  // Blog posts — elke post heeft eigen URL voor SEO
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...brancheRoutes, ...portfolioRoutes, ...blogRoutes];
}
