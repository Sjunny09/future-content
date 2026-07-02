import { ImageResponse } from "next/og";
import { BRANCHES } from "@/lib/constants";

export const runtime = "edge";
export const alt = "Future Content branche-skin";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ branche: string }>;
};

/**
 * Dynamische OG-image per branchepagina (skin).
 * Voor elke slug in BRANCHES rendert dit een editorial dark card met de
 * branche-naam, hero-claim en gold accent. Wordt automatisch gepickt door
 * Next.js voor og:image en twitter:image meta-tags.
 */
export default async function Image({ params }: Props) {
  const { branche: slug } = await params;
  const branche = BRANCHES.find((b) => b.slug === slug);

  const eyebrow = branche?.heroEyebrow ?? "AI voor jouw branche";
  const headline = branche?.heroH1 ?? "Eerst zien welk werk repeterend is. Dan pas bouwen.";
  const shortName = branche?.shortName ?? "Future Content";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#221C14",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Brass-gold horizontale lijn */}
        <div
          style={{
            position: "absolute",
            top: "80px",
            left: "80px",
            width: "120px",
            height: "2px",
            background: "#B45F38",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            color: "#B45F38",
            fontSize: "20px",
            fontWeight: 600,
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginTop: "32px",
            marginBottom: "48px",
            display: "flex",
          }}
        >
          {eyebrow}
        </div>

        {/* Hoofdregel (hero-claim) */}
        <div
          style={{
            color: "#F3ECE0",
            fontSize: headline.length > 60 ? "56px" : "68px",
            fontWeight: 700,
            lineHeight: 1.06,
            letterSpacing: "-1px",
            maxWidth: "1000px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {headline}
        </div>

        {/* Onderkant: branche-naam en URL */}
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            left: "80px",
            right: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "#F3ECE0",
              opacity: 0.55,
              fontSize: "22px",
              fontWeight: 500,
              display: "flex",
            }}
          >
            Skin voor {shortName.toLowerCase()}
          </div>
          <div
            style={{
              color: "#B45F38",
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "1px",
              display: "flex",
            }}
          >
            future-content.nl
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
