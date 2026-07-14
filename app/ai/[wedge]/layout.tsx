import type { Metadata } from "next";
import { AI_WEDGES, SITE } from "@/lib/constants";

type Props = {
  params: Promise<{ wedge: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { wedge: slug } = await params;
  const wedge = AI_WEDGES.find((w) => w.slug === slug);

  if (!wedge) {
    return { title: "Niet gevonden" };
  }

  const url = `${SITE.url}/ai/${wedge.slug}`;
  const description = wedge.belofte;

  return {
    // absolute: omzeilt de root-template "%s | Future Content" zodat de merknaam
    // niet dubbel wordt (metaTitle bevat 'm al) en title == og:title.
    title: { absolute: wedge.metaTitle },
    description,
    openGraph: {
      title: wedge.metaTitle,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: wedge.metaTitle,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export async function generateStaticParams() {
  return AI_WEDGES.map((w) => ({ wedge: w.slug }));
}

export default function WedgeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
