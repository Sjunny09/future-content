import Link from "next/link"

// Herbruikbare juridische disclaimer voor de hele scan-flow. Klein, mono-label
// stijl, onderaan de pagina. Geen juridisch advies, zie CLAUDE.md-opdracht:
// een jurist-check is verstandig voordat dit hard in productie blijft staan.

export function AiDisclaimer({ className = "" }: { className?: string }) {
  return (
    <p
      className={`font-mono text-[10px] uppercase tracking-[0.12em] leading-relaxed ${className}`}
      style={{ color: "var(--color-scan-muted)" }}
    >
      Dit rapport en deze analyse zijn met AI gegenereerd op basis van openbaar
      beschikbare informatie. De inhoud is indicatief en kan onjuistheden
      bevatten. Aan de uitkomsten kunnen geen rechten worden ontleend. Future
      Content aanvaardt geen aansprakelijkheid voor schade of beslissingen die
      volgen uit het gebruik van deze informatie. Zie ook de{" "}
      <Link href="/voorwaarden" className="underline underline-offset-2">
        algemene voorwaarden
      </Link>
      .
    </p>
  )
}
