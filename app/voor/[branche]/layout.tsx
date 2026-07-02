import type { Metadata } from "next";
import { BRANCHES, SITE } from "@/lib/constants";

type Props = {
  params: Promise<{ branche: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { branche: slug } = await params;
  const branche = BRANCHES.find((b) => b.slug === slug);

  if (!branche) {
    return {
      title: "Branche niet gevonden",
    };
  }

  const url = `${SITE.url}/voor/${branche.slug}`;
  const title = branche.heroH1;
  const description = branche.heroLead;

  return {
    title,
    description,
    openGraph: {
      title: branche.heroH1,
      description,
      url,
      type: "website",
      // Geen expliciete images: Next.js detecteert app/voor/[branche]/opengraph-image.tsx
      // automatisch en serveert dat als og:image per slug.
    },
    twitter: {
      card: "summary_large_image",
      title: branche.heroH1,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export async function generateStaticParams() {
  return BRANCHES.map((b) => ({ branche: b.slug }));
}

export default function BrancheLayout({ children }: { children: React.ReactNode }) {
  return children;
}
