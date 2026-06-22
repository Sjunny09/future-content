import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Future Content — AI-bouwer voor MKB in Brabant";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Dynamische OG-image voor de homepage van Future Content.
 * Editorial dark card met tagline, brass-gold accent en regio.
 * Gerenderd door Next.js Edge Runtime via `next/og` ImageResponse.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0F0F0D",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Brass-gold horizontale lijn (decoratief) */}
        <div
          style={{
            position: "absolute",
            top: "80px",
            left: "80px",
            width: "120px",
            height: "2px",
            background: "#C9A96E",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            color: "#C9A96E",
            fontSize: "20px",
            fontWeight: 600,
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginTop: "32px",
            marginBottom: "48px",
            display: "flex",
          }}
        >
          AI-bouwer uit de Kempen
        </div>

        {/* Hoofdregel (tagline) */}
        <div
          style={{
            color: "#FAFAF8",
            fontSize: "72px",
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: "-1.5px",
            maxWidth: "960px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          Eerst zien welk werk repeterend is. Dan pas bouwen.
        </div>

        {/* Onderkant: regio en URL */}
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
              color: "#FAFAF8",
              opacity: 0.55,
              fontSize: "22px",
              fontWeight: 500,
              display: "flex",
            }}
          >
            Kempen · Eindhoven · Tilburg · Breda
          </div>
          <div
            style={{
              color: "#C9A96E",
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
