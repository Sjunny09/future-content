import { notFound, redirect } from "next/navigation"
import { db } from "@/lib/scan/db"
import { VragenFlow } from "@/components/scan/VragenFlow"
import { EMAIL_NAAM_VRAAG, type Vraag } from "@/lib/scan/vragen/bibliotheek"

type Params = Promise<{ jobId: string }>

export default async function VragenPagina({ params }: { params: Params }) {
  const { jobId } = await params

  const job = await db.scanJob.findUnique({
    where: { id: jobId },
    select: {
      id: true,
      status: true,
      vragenJson: true,
      antwoorden: { select: { vraagId: true } },
    },
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

  const gesteldeVragen: Vraag[] = Array.isArray(job.vragenJson)
    ? (job.vragenJson as unknown as Vraag[])
    : []

  if (gesteldeVragen.length === 0) {
    // Edge case: ready maar de openingsvraag is nog niet geschreven.
    redirect(`/scan/bezig/${jobId}`)
  }

  // Resume-veilig: bepaal de huidige vraag = de laatst gestelde die nog niet
  // beantwoord is. Is alles beantwoord en zijn er 5 antwoorden, dan komt de
  // email-vraag. Het slot is het 1-based nummer van de huidige vraag.
  const beantwoordeIds = new Set(job.antwoorden.map((a) => a.vraagId))
  const onbeantwoord = [...gesteldeVragen]
    .reverse()
    .find((v) => !beantwoordeIds.has(v.id))

  let huidige: Vraag
  if (onbeantwoord) {
    huidige = onbeantwoord
  } else if (job.antwoorden.length >= 5) {
    huidige = EMAIL_NAAM_VRAAG
  } else {
    huidige = gesteldeVragen[gesteldeVragen.length - 1]
  }
  const startSlot = beantwoordeIds.size + 1

  return <VragenFlow jobId={jobId} eersteVraag={huidige} startSlot={startSlot} />
}
