import LandingPage from "@/components/entry/LandingPage";

// ROLLBACK-MARKER: de vorige homepage was <Entree /> (components/entry/Entree.tsx),
// een AI-first hero met "voordeur"-opzet maar zonder de doorlopende scroll-video.
// Dat component staat nog ongewijzigd in de repo; terugzetten = de import
// hierboven vervangen door `import Entree from "@/components/entry/Entree"`
// en de return door `<Entree />`. Zie rapport 09-hero-en-structuur.md.
//
// Nieuwe opzet (John, 2 juli): de landing is het echte verhaal. Eerst de hero
// (wie ik ben, met de scroll-video), dan een logische scroll: probleem van de
// ondernemer -> wat ik bouw -> hoe het werkt / bewijs -> film als secundaire
// route -> CTA. /ai en /film blijven bestaan als diepere pagina's.
export default function HomePage() {
  return <LandingPage />;
}
