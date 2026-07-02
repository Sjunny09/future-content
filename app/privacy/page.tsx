import Link from "next/link"

export const metadata = {
  title: "Privacy",
  description:
    "Hoe Future Content omgaat met scan-data, contactgegevens en je recht op verwijdering.",
  alternates: { canonical: "/privacy" },
}

export default function PrivacyPagina() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1
        className="text-3xl md:text-4xl"
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontWeight: 500,
          color: "var(--color-scan-drukinkt)",
        }}
      >
        Privacy in mensentaal
      </h1>

      <p
        className="mt-6 text-base leading-relaxed"
        style={{ color: "var(--color-scan-drukinkt)" }}
      >
        Ik doe deze scans zelf, en ik hou de dataset klein met opzet. Hieronder
        staat wat ik opsla, waarom, en hoe je het weer weg krijgt.
      </p>

      <Sectie titel="Wat ik bewaar">
        <p>
          Per scan: de URL die je invulde, de antwoorden op de 6 vragen, je
          naam, je e-mailadres, en een gehashed IP-adres (niet het rauwe, puur
          om herhaalde aanvragen vanaf dezelfde plek te kunnen tellen).
        </p>
        <p className="mt-3">
          Daarnaast bewaar ik wat ik van je website heb gelezen. Dat gebeurt
          eenmalig, alleen de publiek zichtbare pagina's, en alles wat op een
          persoonsgegeven lijkt (e-mails, telefoonnummers, postcodes) wordt
          vóór de analyse vervangen door <code>[REDACTED_*]</code>. Claude
          (Anthropic) ziet dat dus nooit.
        </p>
      </Sectie>

      <Sectie titel="Waarom ik dat bewaar">
        <p>
          Om jou een bruikbare video terug te kunnen sturen, en om te kunnen
          terugkijken op eerdere gesprekken als we iets samen gaan doen. Je
          krijgt geen nieuwsbrief, geen retargeting, geen leadlijst-verkoop.
          Als ik je mail, is het persoonlijk en terzake.
        </p>
      </Sectie>

      <Sectie titel="Hoe lang ik het bewaar">
        <p>
          Maximaal 18 maanden. Daarna worden naam en e-mail automatisch leeg
          gemaakt en blijft alleen een geanonimiseerde analyse over, zodat ik
          kan blijven leren wat wel en niet werkt per branche.
        </p>
      </Sectie>

      <Sectie titel="Cookies en meten">
        <p>
          Voor bezoekersstatistieken gebruik ik Plausible. Dat werkt zonder
          cookies en zonder persoonsgegevens vast te leggen, dus daar hoef ik
          geen toestemming voor te vragen.
        </p>
        <p className="mt-3">
          Daarnaast kun je Google Analytics aanzetten via de melding onderin
          beeld. Die staat standaard uit. Zonder jouw akkoord laadt Google
          Analytics niet en wordt er geen cookie gezet. Kies je "Liever
          niet", dan verandert er niets aan je bezoek.
        </p>
      </Sectie>

      <Sectie titel="Anthropic (Claude)">
        <p>
          Ik gebruik Claude van Anthropic voor de analyse. Op de productie-key
          staat <em>Zero Data Retention</em> aan: Anthropic bewaart je
          prompts dus niet. Er is een DPA getekend.
        </p>
      </Sectie>

      <Sectie titel="Wat je zelf kunt">
        <p>
          Je kunt je data op elk moment laten verwijderen. Stuur een mailtje
          naar{" "}
          <a
            className="underline underline-offset-4"
            href="mailto:privacy@future-content.nl"
            style={{ color: "var(--color-scan-terracotta)" }}
          >
            privacy@future-content.nl
          </a>{" "}
          en binnen 72 uur is alles weg. Je krijgt een bevestiging.
        </p>
      </Sectie>

      <Sectie titel="Verantwoordelijke">
        <p>
          Future Content (eenmanszaak), Bladel, KvK 86880675. Contact:{" "}
          <a
            className="underline underline-offset-4"
            href="mailto:john@future-content.nl"
            style={{ color: "var(--color-scan-terracotta)" }}
          >
            john@future-content.nl
          </a>
          .
        </p>
      </Sectie>

      <p
        className="mt-12 text-sm"
        style={{ color: "var(--color-scan-muted)" }}
      >
        Laatste update: 2 juli 2026.{" "}
        <Link href="/scan" className="underline underline-offset-4">
          Terug naar de scan
        </Link>
        .
      </p>
    </main>
  )
}

function Sectie({
  titel,
  children,
}: {
  titel: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-10">
      <h2
        className="text-xl md:text-2xl"
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontWeight: 500,
          color: "var(--color-scan-drukinkt)",
        }}
      >
        {titel}
      </h2>
      <div
        className="mt-3 text-base leading-relaxed"
        style={{ color: "var(--color-scan-drukinkt)" }}
      >
        {children}
      </div>
    </section>
  )
}
