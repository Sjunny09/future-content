import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { db } from "@/lib/scan/db"
import { ExitIntentModal } from "@/components/scan/ExitIntentModal"

type Params = Promise<{ jobId: string }>

export default async function KlaarPagina({ params }: { params: Params }) {
  const { jobId } = await params

  const job = await db.scanJob.findUnique({
    where: { id: jobId },
    select: {
      id: true,
      status: true,
      lead: { select: { naam: true } },
    },
  })

  if (!job) notFound()

  if (job.status !== "completed") {
    redirect(`/scan/bezig/${jobId}`)
  }

  const voornaam = job.lead?.naam?.split(" ")[0] ?? null
  const calUrl = process.env.NEXT_PUBLIC_CAL_KENNISMAKING_URL ?? null

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
      <ExitIntentModal calUrl={calUrl} />
      <h1
        className="text-4xl leading-tight md:text-5xl"
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontWeight: 500,
          color: "var(--color-scan-drukinkt)",
        }}
      >
        Dankjewel{voornaam ? `, ${voornaam}` : ""}.
      </h1>

      <p
        className="mt-6 text-lg leading-relaxed md:text-xl"
        style={{ color: "var(--color-scan-drukinkt)" }}
      >
        Binnen 24 uur stuur ik je een korte video (max 2 minuten) waarin ik
        doorneem wat ik op je site zag, en wat ik zou doen als ik bij jullie aan
        tafel zat. Geen verkooppraatje, geen rapport.
      </p>

      <p
        className="mt-4 text-sm"
        style={{ color: "var(--color-scan-muted)" }}
      >
        Als ik er langer over doe, hoor je dat ook. Nooit stilte.
      </p>

      <div
        className="mt-12 rounded-md border p-6"
        style={{
          borderColor: "var(--color-scan-border)",
          backgroundColor: "rgba(184,71,42,0.04)",
        }}
      >
        <h2
          className="text-xl md:text-2xl"
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontWeight: 500,
            color: "var(--color-scan-drukinkt)",
          }}
        >
          Wil je vooruit?
        </h2>
        <p
          className="mt-3 text-base leading-relaxed"
          style={{ color: "var(--color-scan-drukinkt)" }}
        >
          Voor €495 doe ik een pilotweek rondom één concreet proces. Ik bouw,
          jij kijkt mee, eind van de week staat er iets werkends.
        </p>
        <Link
          href={`/scan/pilot/${jobId}`}
          className="mt-5 inline-block rounded-md px-6 py-3 text-base font-medium text-white transition"
          style={{ backgroundColor: "var(--color-scan-terracotta)" }}
        >
          Boek een pilotweek — €495
        </Link>
      </div>

      <p
        className="mt-10 text-center text-xs"
        style={{ color: "var(--color-scan-muted)" }}
      >
        Future Content · Bladel · KvK 93482641
      </p>
    </main>
  )
}
