// Directe laad-staat terwijl de server de eerste/volgende diepe vraag bedenkt.
// Next toont dit meteen, zodat de overgang nooit leeg of bevroren aanvoelt.
export default function DiepteLaden() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6">
      <div
        className="relative mb-8 h-1 w-32 overflow-hidden rounded-full"
        style={{ backgroundColor: "var(--color-scan-border)" }}
      >
        <div
          className="absolute inset-y-0 w-1/3 animate-pulse rounded-full"
          style={{ backgroundColor: "var(--color-scan-terracotta)" }}
        />
      </div>
      <p
        className="text-center text-xl md:text-2xl"
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontWeight: 400,
          color: "var(--color-scan-drukinkt)",
        }}
      >
        Ik kijk even naar je antwoorden…
      </p>
    </main>
  )
}
