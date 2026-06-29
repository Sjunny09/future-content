import { notFound, redirect } from "next/navigation"
import { db } from "@/lib/scan/db"
import { DiepteFlow } from "@/components/scan/DiepteFlow"
import { volgendeDiepteVraag } from "@/lib/scan/diepte"
import type { Vraag } from "@/lib/scan/vragen/bibliotheek"
import type { SiteAnalyse } from "@/lib/scan/claude"

type Params = Promise<{ jobId: string }>

export default async function DieptePagina({ params }: { params: Params }) {
  const { jobId } = await params

  const job = await db.scanJob.findUnique({
    where: { id: jobId },
    select: {
      id: true,
      status: true,
      analyseJson: true,
      diepteStatus: true,
      diepteVragenJson: true,
      antwoorden: {
        select: { vraagId: true, vraagTitel: true, waarde: true },
        orderBy: { createdAt: "asc" },
      },
    },
  })

  if (!job) notFound()
  // De uitgebreide scan kan alleen na een afgeronde quickscan.
  if (job.status !== "completed") redirect(`/scan/bezig/${jobId}`)
  if (job.diepteStatus === "voltooid") redirect(`/scan/diepte/klaar/${jobId}`)

  const analyse = (job.analyseJson ?? null) as SiteAnalyse | null
  const gesteldeVragen: Vraag[] = Array.isArray(job.diepteVragenJson)
    ? (job.diepteVragenJson as unknown as Vraag[])
    : []
  const diepAntwoordIds = new Set(
    job.antwoorden.filter((a) => a.vraagId.startsWith("DV")).map((a) => a.vraagId),
  )

  // Resume-veilig: toon de laatst gestelde, nog onbeantwoorde diepe vraag.
  // Is die er niet (eerste bezoek of laatste net beantwoord), genereer de
  // volgende en leg 'm vast.
  let huidige: Vraag
  const onbeantwoord = [...gesteldeVragen]
    .reverse()
    .find((v) => !diepAntwoordIds.has(v.id))

  if (onbeantwoord) {
    huidige = onbeantwoord
  } else {
    const nieuw = await volgendeDiepteVraag({
      analyse,
      antwoorden: job.antwoorden,
      gesteldeVragen,
      diepAntwoordIds,
    })
    if (!nieuw) {
      // Niks meer te vragen -> markeer voltooid en door naar de afspraak.
      // Voorkomt een redirect-lus met de klaar-pagina (die "voltooid" eist).
      await db.scanJob.update({
        where: { id: jobId },
        data: { diepteStatus: "voltooid" },
      })
      redirect(`/scan/diepte/klaar/${jobId}`)
    }
    await db.scanJob.update({
      where: { id: jobId },
      data: {
        diepteStatus: "bezig",
        diepteVragenJson: [...gesteldeVragen, nieuw] as unknown as object,
      },
    })
    huidige = nieuw
  }

  const startSlot = diepAntwoordIds.size + 1
  return <DiepteFlow jobId={jobId} eersteVraag={huidige} startSlot={startSlot} />
}
