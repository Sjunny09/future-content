import { notFound, redirect } from "next/navigation"
import { db } from "@/lib/scan/db"
import { VragenFlow } from "@/components/scan/VragenFlow"
import type { Vraag } from "@/lib/scan/vragen/bibliotheek"

type Params = Promise<{ jobId: string }>

export default async function VragenPagina({ params }: { params: Params }) {
  const { jobId } = await params

  const job = await db.scanJob.findUnique({
    where: { id: jobId },
    select: { id: true, status: true, vragenJson: true },
  })

  if (!job) notFound()

  if (job.status === "failed") {
    redirect(`/scan?fout=gefaald`)
  }

  if (
    job.status === "queued" ||
    job.status === "scraping" ||
    job.status === "analysing"
  ) {
    redirect(`/scan/bezig/${jobId}`)
  }

  if (job.status === "completed") {
    redirect(`/scan/klaar/${jobId}`)
  }

  const vragen = Array.isArray(job.vragenJson)
    ? (job.vragenJson as unknown as Vraag[])
    : []

  if (vragen.length === 0) {
    // Edge case: ready maar vragen-selectie is nog niet geschreven.
    // Stuur terug naar bezig-scherm; polling loopt door.
    redirect(`/scan/bezig/${jobId}`)
  }

  return <VragenFlow jobId={jobId} vragen={vragen} />
}
