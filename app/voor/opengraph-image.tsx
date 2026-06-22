import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Voor wie: zeven branches met een eigen skin · Future Content";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * OG-image voor de /voor overzichtspagina.
 * Editorial dark card met de "zeven branches"-claim en gold accent.
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
        {/* Brass-gold horizontale lijn */}
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
          Voor wie
        </div>

        {/* Hoofdregel */}
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
          Zeven branches, elk met een eigen skin.
        </div>

        {/* Onderkant: 7 branches namen + URL */}
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
              fontSize: "20px",
              fontWeight: 500,
              maxWidth: "750px",
              display: "flex",
            }}
          >
            Transport · Makelaardij · Evenementen · Schoonmaak · Bouw · Auto · Horeca
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
