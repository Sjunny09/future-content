import { ScanInProgress } from "@/components/scan/ScanInProgress"

type Params = Promise<{ jobId: string }>

export default async function BezigPagina({ params }: { params: Params }) {
  const { jobId } = await params
  return <ScanInProgress jobId={jobId} />
}
