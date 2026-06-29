import { StartScanForm } from "@/components/scan/StartScanForm"

export default function ScanLandingPagina() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-10 md:py-16">
      <header className="flex items-center justify-between">
        <span
          className="text-sm tracking-wide"
          style={{ color: "var(--color-scan-muted)" }}
        >
          Future Content
        </span>
        <a
          href="mailto:hello@future-content.nl"
          className="text-sm underline-offset-4 hover:underline"
          style={{ color: "var(--color-scan-muted)" }}
        >
          hello@future-content.nl
        </a>
      </header>

      <section className="mt-20 flex-1 md:mt-28">
        <h1
          className="text-[40px] leading-[1.1] tracking-tight md:text-[56px]"
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontWeight: 500,
          }}
        >
          Laat me even naar je bedrijf kijken.
        </h1>

        <p
          className="mt-6 max-w-xl text-lg leading-relaxed md:text-xl"
          style={{ color: "var(--color-scan-muted)" }}
        >
          Vul je website in. Ik blader er rustig doorheen en stel je daarna een
          paar vragen die er echt toe doen. Je krijgt binnen 24 uur mijn
          eerlijke kijk terug, in een korte video.
        </p>

        <div className="mt-12">
          <StartScanForm />
        </div>

        <p
          className="mt-6 max-w-xl text-sm leading-relaxed"
          style={{ color: "var(--color-scan-muted)" }}
        >
          Door te starten geef je toestemming dat wij je website publiek inlezen
          en via AI analyseren. Je gegevens gebruikt John persoonlijk voor jouw
          analyse, niets anders.
        </p>

        <div className="mt-24 grid gap-8 border-t pt-10 md:grid-cols-3"
             style={{ borderColor: "var(--color-scan-border)" }}>
          <TrustPunt
            titel="Geen rapport, werkend systeem"
            tekst="Aan het eind iets dat draait in jouw bedrijf. Geen PDF in een la."
          />
          <TrustPunt
            titel="Binnen 24 uur een video"
            tekst="Persoonlijk opgenomen door John. Maximaal twee minuten, concreet."
          />
          <TrustPunt
            titel="AVG + geen cookies"
            tekst="Alleen je publieke website en je antwoorden. Niet meer dan dat."
          />
        </div>
      </section>

      <footer
        className="mt-20 pt-8 text-xs"
        style={{ color: "var(--color-scan-muted)" }}
      >
        Future Content · Bladel · KvK 86880675 ·{" "}
        <a href="/privacy" className="underline-offset-4 hover:underline">
          Privacy
        </a>
      </footer>
    </main>
  )
}

function TrustPunt({ titel, tekst }: { titel: string; tekst: string }) {
  return (
    <div>
      <h3
        className="text-base font-semibold"
        style={{ color: "var(--color-scan-drukinkt)" }}
      >
        {titel}
      </h3>
      <p
        className="mt-2 text-sm leading-relaxed"
        style={{ color: "var(--color-scan-muted)" }}
      >
        {tekst}
      </p>
    </div>
  )
}
