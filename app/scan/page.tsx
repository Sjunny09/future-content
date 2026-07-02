import Image from "next/image"
import { StartScanForm } from "@/components/scan/StartScanForm"
import Wordmark from "@/components/common/Wordmark"

const FOTO = "/photos/PhotoSessions-757307-pww_6404-vy-1.jpg"

export default function ScanLandingPagina() {
  return (
    <main className="lg:grid lg:h-screen lg:grid-cols-[1.05fr_0.95fr] lg:overflow-hidden">
      {/* Links: tekst + formulier */}
      <div className="flex min-h-screen flex-col px-6 py-8 lg:h-screen lg:min-h-0 lg:px-12 lg:py-10">
        <header className="flex items-center justify-between">
          {/* Stille wordmark (strategie-adviseur): "dit is echt John", geen trechter-chrome */}
          <Wordmark theme="light" showCaret={false} className="text-base" />
          <a
            href="mailto:hello@future-content.nl"
            className="text-sm underline-offset-4 hover:underline"
            style={{ color: "var(--color-scan-muted)" }}
          >
            hello@future-content.nl
          </a>
        </header>

        {/* Foto bovenaan op mobiel (op desktop staat 'ie rechts) */}
        <div className="relative mt-6 h-52 w-full overflow-hidden rounded-2xl lg:hidden">
          <Image
            src={FOTO}
            alt="John Lavrijsen, Future Content"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "50% 28%" }}
            priority
          />
        </div>

        <div className="flex flex-1 flex-col justify-center py-8 lg:py-0">
          <h1
            className="text-[32px] leading-[1.1] tracking-tight md:text-[46px]"
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontWeight: 500,
              color: "var(--color-scan-drukinkt)",
            }}
          >
            Laat me even naar je bedrijf kijken.
          </h1>

          <p
            className="mt-5 max-w-xl text-base leading-relaxed md:text-lg"
            style={{ color: "var(--color-scan-muted)" }}
          >
            Vul je website in. Ik blader er rustig doorheen en stel je daarna een
            paar vragen die er echt toe doen. Daarna krijg je direct drie
            concrete AI-kansen voor jouw bedrijf.
          </p>

          <div className="mt-8">
            <StartScanForm />
          </div>

          <p
            className="mt-4 max-w-xl text-xs leading-relaxed"
            style={{ color: "var(--color-scan-muted)" }}
          >
            Door te starten geef je toestemming dat ik je website publiek inlees en
            via AI analyseer. Je gegevens gebruik ik alleen persoonlijk voor jouw
            analyse, niets anders.
          </p>
        </div>

        {/* Trust-punten + footer onderaan */}
        <div>
          <div
            className="hidden gap-6 border-t pt-5 sm:grid sm:grid-cols-3"
            style={{ borderColor: "var(--color-scan-border)" }}
          >
            <TrustPunt
              titel="Werkend systeem"
              tekst="Iets dat draait in jouw bedrijf, geen PDF in een la."
            />
            <TrustPunt
              titel="Binnen 24 uur"
              tekst="Een korte, persoonlijke video van John."
            />
            <TrustPunt
              titel="AVG, geen cookies"
              tekst="Alleen je publieke site en je antwoorden."
            />
          </div>
          <footer
            className="mt-5 pt-5 text-xs sm:pt-0"
            style={{ color: "var(--color-scan-muted)" }}
          >
            Future Content · Bladel · KvK 86880675 ·{" "}
            <a href="/privacy" className="underline-offset-4 hover:underline">
              Privacy
            </a>
          </footer>
        </div>
      </div>

      {/* Rechts: professionele foto (desktop) */}
      <div className="relative hidden lg:block lg:h-screen">
        <Image
          src={FOTO}
          alt="John Lavrijsen, Future Content"
          fill
          sizes="50vw"
          className="object-cover"
          style={{ objectPosition: "50% 30%" }}
          priority
        />
      </div>
    </main>
  )
}

function TrustPunt({ titel, tekst }: { titel: string; tekst: string }) {
  return (
    <div>
      <h3 className="text-sm font-semibold" style={{ color: "var(--color-scan-drukinkt)" }}>
        {titel}
      </h3>
      <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--color-scan-muted)" }}>
        {tekst}
      </p>
    </div>
  )
}
