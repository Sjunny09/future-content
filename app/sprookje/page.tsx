import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, ScanLine, Sparkles } from "lucide-react";
import CopyPrompt from "@/components/common/CopyPrompt";

/**
 * Gids /sprookje: de volledige uitwerking achter de Instagram-reel "Sprookje met AI" (M4, okt 2026).
 * Bereikbaar via de ManyChat-DM (trefwoord FAIRYTALE). Prompts zijn letterlijk uitgelezen uit John's
 * Runway-taakgeschiedenis (00-future-content/content/reels/2026-10-06_sprookje-met-ai/promptsheet.md).
 * Schermafbeeldingen van ChatGPT/Claude/Runway (public/images/sprookje/scherm-*.jpg) verschijnen vanzelf
 * zodra het bestand bestaat; zonder bestand wordt de plek niet getoond (geen lege vakken live).
 * Toestemming ouders + klant voor het beeldmateriaal: bevestigd door John, 6 okt 2026.
 */
export const metadata: Metadata = {
  title: "Van telefoonfilmpje naar sprookje met AI: de hele uitwerking",
  description:
    "Stap voor stap hoe een gewoon telefoonfilmpje met ChatGPT, Claude en Runway een sprookje werd. Met de exacte prompts, wat er misging en hoe dat is opgelost.",
  alternates: { canonical: "/sprookje" },
};

const H = { fontFamily: "var(--font-playfair)", fontWeight: 600 } as const;

function Shot({ src, alt, bijschrift }: { src: string; alt: string; bijschrift?: string }) {
  if (!fs.existsSync(path.join(process.cwd(), "public", src))) return null;
  return (
    <figure className="mt-6">
      <div className="overflow-hidden rounded-[2px] border border-[#E4D8C6] bg-white">
        <Image src={src} alt={alt} width={1600} height={900} className="h-auto w-full" />
      </div>
      {bijschrift && <figcaption className="mt-2 text-xs text-[#6E6151]">{bijschrift}</figcaption>}
    </figure>
  );
}

function Duo({ a, b }: { a: { src: string; label: string }; b: { src: string; label: string } }) {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {[a, b].map((x) => (
        <figure key={x.src}>
          <div className="overflow-hidden rounded-[2px] border border-[#E4D8C6]">
            <Image src={x.src} alt={x.label} width={1600} height={900} className="h-auto w-full" />
          </div>
          <figcaption className="fc-mono mt-2 text-[10px] uppercase tracking-[0.2em] text-[#B45F38]">{x.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function Stap({ n, titel, children }: { n: string; titel: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-[#E4D8C6] pt-10">
      <span className="fc-mono text-xs text-[#B45F38]">Stap {n}</span>
      <h2 className="mt-2 text-2xl leading-tight text-[#2A2218] sm:text-3xl" style={H}>
        {titel}
      </h2>
      <div className="mt-4 max-w-2xl space-y-4 leading-relaxed text-[#463C2E]">{children}</div>
    </section>
  );
}

const STARTPROMPT = `Create a 30-second 16:9 fairytale promo video from Video 1, matching the look of Image 1.

IMPORTANT, VOICE: Video 1 contains a girl reading a Dutch story aloud. Keep her original voice track exactly as recorded: same words, same timing, no regeneration, no translation, no new voice. Every shot where her face is visible must come from her own footage so her lip movements stay in sync.

LOOK (all shots): magical twilight fairytale forest as in Image 1. Deep blue-green dusk, tall dark trees covered in thick green moss, lush ferns, damp autumn leaves on the forest floor. The open book in her lap glows with warm golden light, softly lighting her face, hair and arms from below. Tiny golden dust particles drift up from the pages. Background in soft blue shadow with gentle haze, shallow depth of field, cinematic warm-cool contrast. Keep the girl unchanged: face, expressions, mouth movements, hair, pink headband, rainbow t-shirt, pose and movements. Keep the purple blanket. Keep the hand-drawn book cover "Kabouter Kyrië" exactly as it is and readable.

SHOTS (timing follows Video 1):
0:00-0:06: Wide shot of the girl reading, slow push-in toward her.
0:06-0:09: Close-up of her face lit by the glowing book.
0:09-0:13: New shot, no people: low ground-level camera gliding forward along a mossy forest path at dusk, golden dust floating in the air.
0:13-0:21: New shot: top-down into the open glowing book. A hand-drawn crayon gnome in the style of the cover comes to life on the page: first his red pointed hat sparkles in the sun, then his shiny polished shoes take a few steps, then his long white beard waves gently. Child's drawing style, golden sparkles rising from the paper.
0:21-0:23: Medium shot, back to the girl reading.
0:23-0:30: She closes the book and holds up the cover; the golden glow lingers around her and lights the cover. Slow push-in onto the cover. Hold the last frame.

SOUND (under her voice, her voice always clearly on top):
Calm evening forest ambience: soft wind through tall trees, distant crickets, a far-away owl, rustling leaves.
Soft magical shimmer with glittering chimes at 0:00, at 0:13 when the drawing comes alive, and at 0:29.
Music: gentle fairytale lullaby, music box and celesta with soft pizzicato strings and warm felt piano, slow 70 bpm, whimsical and cozy, small swell at the end, no vocals. Keep the music low under the voice.

No text, titles or logos in the video.`;

const PROMPTS = [
  {
    titel: "Restyle van haar eigen beeld (0-9 s en 21-30 s)",
    meta: "Runway · Aleph 2.0 · houdt beweging en lipsync",
    prompt: `Restyle the clip into a magical twilight fairytale forest. Deep blue-green dusk, tall dark trees covered in thick green moss, lush ferns, damp autumn leaves on the forest floor, soft blue shadowed background with gentle haze, shallow depth of field, cinematic warm-cool contrast. The open book in her lap glows with warm golden light that softly lights her face, hair and arms from below, with tiny golden dust particles drifting up from the pages. Keep the girl exactly unchanged: face, expressions, mouth movements and lip sync, hair, pink headband, rainbow t-shirt, pose, every movement and all timing. Keep her purple blanket. Keep the hand-drawn book cover "Kabouter Kyrië" exactly as it is and readable. Camera framing stays as in the source. Do not add any text, titles or logos.`,
  },
  {
    titel: "Nieuw shot: het bospad (4 s)",
    meta: "Runway · Seedance 2.5 · 1080p",
    prompt: `A low ground-level camera glides slowly and steadily forward along a narrow mossy forest path at dusk. Tall dark trees covered in thick green moss line the path, lush ferns and damp autumn leaves on the ground, deep blue-green twilight, soft haze between the trunks, shallow depth of field with the background in soft blue shadow. Tiny golden dust particles float and drift in the air, catching a faint warm golden glow far ahead along the path, giving a warm-cool contrast. Magical fairytale atmosphere, single continuous take, smooth forward glide. No people, no animals, no text.`,
  },
  {
    titel: "Nieuw shot: de kabouter komt tot leven (8 s)",
    meta: "Runway · Seedance 2.5 · met tijdcodes per stuk",
    prompt: `Top-down shot looking straight into an open book lying in a girl's lap in a twilight fairytale forest. The pages glow with warm golden light, and tiny golden dust particles drift upward from the paper. On the page is a hand-drawn crayon gnome in a naive child's drawing style, with waxy crayon texture on cream paper, as on a children's book cover. Slow gentle push-in toward the page. 0-4s: the gnome's red pointed hat sparkles brightly as if hit by sun, golden sparkles rising from the paper. 4-8s: his shiny polished shoes come alive and take a few small steps across the page, with little glints on the shoes. 8-12s: his long white beard waves gently as the drawing breathes, and golden sparkles keep rising. Deep blue-green dusk at the edges of frame, warm golden light on the page, soft blue shadows, shallow depth of field. No text, no titles, no logos.`,
  },
  {
    titel: "Muziek (30 s)",
    meta: "Runway · muziek · tijdcodes tussen haken",
    prompt: `Gentle fairytale lullaby, instrumental only, no vocals. Music box and celesta carry a simple tender melody, with soft pizzicato strings and warm felt piano underneath. Slow 70 BPM, whimsical and cozy, quiet and spacious so it can sit low under a spoken voice. Exactly 30 seconds long. [0:00-0:25] steady gentle lullaby with the music box leading. [0:25-0:30] a small warm swell as the strings and celesta bloom, ending softly.`,
  },
  {
    titel: "Bossfeer (30 s)",
    meta: "Runway · geluidseffect",
    prompt: `Duration: 30s. Calm evening forest ambience at dusk: soft wind moving through tall trees, distant crickets, a far-away owl hooting now and then, gentle rustling leaves. Quiet, steady and spacious. No voices, no music.`,
  },
  {
    titel: "Glinster-effect (3 s)",
    meta: "Runway · geluidseffect",
    prompt: `Duration: 3s. A soft magical shimmer with glittering chimes: one gentle fairytale sparkle that rises and fades away. Delicate, airy, bell-like. No voices, no music, no other sounds.`,
  },
];

export default function SprookjeGidsPage() {
  return (
    <main className="bg-[#F3ECE0]">
      {/* ── Kop ── */}
      <section className="bg-[#221C14]">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 pt-28 pb-16 md:grid-cols-[1fr_300px] md:items-center md:pt-36 md:pb-20">
          <div>
            <span className="fc-mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#B45F38]">
              <Sparkles size={14} /> De hele uitwerking · AI-video
            </span>
            <h1 className="mt-5 text-3xl leading-[1.08] text-[#F3ECE0] md:text-5xl" style={H}>
              Van telefoonfilmpje naar sprookje.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#F3ECE0]/70">
              Een meisje leest voor in het bos, gefilmd met een telefoon. Met ChatGPT, Claude en Runway werd dat
              een sprookjesbos waarin de getekende kabouter tot leven komt. Hieronder staat precies hoe ik dat heb
              gedaan: elke stap, elke prompt, en ook wat er misging.
            </p>
            <p className="mt-4 text-sm text-[#C9BBA6]">
              Gebruikt: ChatGPT · Claude (Opus 5.5) · Runway, ongeveer 1000 credits · Claude Code voor de afwerking
            </p>
          </div>
          <video
            className="mx-auto w-full max-w-[300px] rounded-[2px] border border-[#463C2E]"
            src="/videos/sprookje-reel.mp4"
            poster="/videos/sprookje-reel-poster.jpg"
            controls
            playsInline
            loop
            preload="metadata"
          />
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-14 px-6 py-16 md:py-20">
        <Stap n="1" titel="Begin bij een idee en een gewoon filmpje.">
          <p>
            De vraag was simpel: ik heb dit filmpje en het moet een sprookje worden. Het filmpje zelf is niets
            bijzonders. Een telefoon op de grond, een meisje op een deken dat een boek voorleest.
          </p>
          <p>Wil je dit zelf doen, let dan bij het filmen op drie dingen:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Zet je telefoon stil neer, op een statief of ergens tegenaan.</li>
            <li>Hou alles wat moet blijven goed in beeld, hier het boek en haar gezicht.</li>
            <li>
              Filmt je telefoon in HDR, zet dat dan uit of zet de clip eerst om naar normaal beeld. Anders komt
              het resultaat flets terug.
            </li>
          </ul>
          <Shot src="/images/sprookje/origineel.jpg" alt="Het originele telefoonfilmpje" bijschrift="Het origineel: gewoon een telefoon in het bos." />
        </Stap>

        <Stap n="2" titel="Laat ChatGPT een sfeerbeeld maken.">
          <p>
            Ik gaf ChatGPT een foto uit het filmpje en liet daar een afbeelding van maken in de sfeer die ik wilde:
            een schemerig sprookjesbos met een gloeiend boek. Dat beeld is daarna de richting voor Runway. Je
            beschrijft de sfeer dus niet alleen met woorden, je laat het zien.
          </p>
          <Shot src="/images/sprookje/scherm-chatgpt.jpg" alt="ChatGPT: foto uploaden en sfeerbeeld laten maken" />
          <Duo a={{ src: "/images/sprookje/origineel.jpg", label: "Foto uit het filmpje" }} b={{ src: "/images/sprookje/sfeerbeeld.jpg", label: "Sfeerbeeld uit ChatGPT" }} />
        </Stap>

        <Stap n="3" titel="Schrijf de prompt uit met Claude, en zet hem om naar het Engels.">
          <p>
            Daarna heb ik met Claude (Opus 5.5) uitgeschreven wat er per seconde moest gebeuren: welk shot, welk
            licht, wat er absoluut niet mag veranderen. Dat deed ik in het Nederlands, en Claude zette het om naar
            het Engels, omdat Runway Engelse prompts het best begrijpt.
          </p>
          <p>
            Het belangrijkste deel van de prompt is wat er hetzelfde moet blijven: haar gezicht, haar mond en de
            timing. Dan klopt de lipsync en blijft het haar eigen stem.
          </p>
          <Shot src="/images/sprookje/scherm-claude.jpg" alt="Claude: de prompt uitschrijven en naar het Engels zetten" />
          <CopyPrompt titel="Startprompt voor de Runway Agent" meta="Upload eerst je video (Video 1) en het sfeerbeeld (Image 1)" prompt={STARTPROMPT} />
        </Stap>

        <Stap n="4" titel="Runway: credits ophogen, prompt erin, bijsturen.">
          <p>
            In Runway heb ik eerst mijn credits opgehoogd. Voor deze video had ik er ongeveer 1000 nodig. Daarna
            heb ik de video en het sfeerbeeld geüpload, de prompt in de Runway Agent gezet, en het resultaat nog
            bijgestuurd.
          </p>
          <p>
            De Agent maakt van één prompt zelf losse opdrachten. Haar eigen beeld wordt omgezet met Aleph 2.0, dat
            beweging en mond van het origineel vasthoudt. De shots die nooit gefilmd zijn (het bospad en de
            kabouter) maakt hij nieuw. Muziek, bossfeer en een glinster-effect komen er los bij. Aleph werkt per
            stuk van maximaal 30 seconden, tot 1080p.
          </p>
          <Shot src="/images/sprookje/scherm-runway-credits.jpg" alt="Runway: credits ophogen" />
          <Shot src="/images/sprookje/scherm-runway-agent.jpg" alt="Runway Agent: video, sfeerbeeld en prompt" />
          <Shot src="/images/sprookje/scherm-runway-bijsturen.jpg" alt="Runway: het resultaat bijsturen" />
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["/images/sprookje/runway-restyle.jpg", "Haar beeld, omgezet"],
              ["/images/sprookje/runway-bospad.jpg", "Nieuw: het bospad"],
              ["/images/sprookje/runway-kabouter.jpg", "Nieuw: de kabouter"],
            ].map(([src, label]) => (
              <figure key={src}>
                <div className="overflow-hidden rounded-[2px] border border-[#E4D8C6]">
                  <Image src={src} alt={label} width={1600} height={900} className="h-auto w-full" />
                </div>
                <figcaption className="fc-mono mt-2 text-[10px] uppercase tracking-[0.2em] text-[#B45F38]">{label}</figcaption>
              </figure>
            ))}
          </div>
          <p className="pt-2 font-semibold text-[#2A2218]">De promptsheet: precies zoals Runway ze heeft uitgevoerd.</p>
          <div className="space-y-4">
            {PROMPTS.map((p) => (
              <CopyPrompt key={p.titel} {...p} />
            ))}
          </div>
          <p className="text-sm text-[#6E6151]">
            Let op de tijdcodes in de kabouterprompt en de muziekprompt (&ldquo;0-4s&rdquo;, &ldquo;[0:25-0:30]&rdquo;). Daarmee
            vertel je Runway wat er wanneer moet gebeuren, in plaats van alles tegelijk.
          </p>
        </Stap>

        <Stap n="5" titel="Kijk alles na. Hier zit het echte werk.">
          <p>
            AI verandert ook dingen waar je niet om vroeg. In dit filmpje gingen er drie dingen mis, en die zie je
            alleen als je het resultaat naast het origineel legt.
          </p>
          <p className="font-semibold text-[#2A2218]">1. Het boek was weg.</p>
          <p>
            Runway haalde het boek dat links naast haar staat gewoon weg. En dat boek is precies het product dat
            verkocht moet worden.
          </p>
          <Duo a={{ src: "/images/sprookje/boek-weg.jpg", label: "Runway: boek weg" }} b={{ src: "/images/sprookje/boek-terug.jpg", label: "Nagekeken: boek terug" }} />
          <p>
            De oplossing heb ik met Claude Code in Cursor gebouwd. Eerst gemeten: de beelden van Runway liggen
            pixel voor pixel op het origineel. Daardoor kon het echte boek per frame uit het telefoonfilmpje terug
            worden gezet, achter de deken, met het licht van het gloeiende boek erop. Omdat de telefoon tijdens de
            opname een stukje verschoof (tot zo&apos;n 90 pixels), wordt het boek elk frame gevolgd.
          </p>
          <Shot src="/images/sprookje/boek-masker.jpg" alt="Het masker van het boek" bijschrift="Het masker: precies het boek, tot aan de deken." />
          <p className="font-semibold text-[#2A2218]">2. Een gezicht dat niet op haar leek.</p>
          <p>
            In het kaboutershot verzon Runway haar gezicht opnieuw, en dat leek niet op haar. Daarom zit er nu een
            virtuele camera op dat stuk, die met de zoom van Runway meerekent. Je ziet één rustige beweging naar de
            kabouter, en haar gezicht komt geen frame in beeld.
          </p>
          <Duo a={{ src: "/images/sprookje/gezicht-runway.jpg", label: "Runway: verzonnen gezicht" }} b={{ src: "/images/sprookje/gezicht-camera.jpg", label: "Virtuele camera: alleen de kabouter" }} />
          <p className="font-semibold text-[#2A2218]">3. Verkeerde tekst op de pagina.</p>
          <p>
            Runway nam de tekst over uit het sfeerbeeld van ChatGPT, en die klopte niet met het echte boek. Ook die
            valt nu buiten beeld. Check dus altijd namen en tekst in je beeld, want daar gaat AI het makkelijkst mis.
          </p>
          <Shot src="/images/sprookje/scherm-claude-code.jpg" alt="Claude Code in Cursor: de nabewerking" />
        </Stap>

        <Stap n="6" titel="Werk het af en zet het klaar voor Instagram.">
          <p>De afwerking heb ik ook met Claude Code gedaan:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Titel, ondertitels, logo en eindkaart, als code gebouwd in HyperFrames.</li>
            <li>Geluid gemasterd op -14 LUFS, het niveau dat Instagram verwacht.</li>
            <li>Voor de reel: het beeld als vierkant in een staand frame, alle tekst erboven, nooit over haar gezicht of de kabouter.</li>
            <li>Steeds wisselen tussen origineel en sprookje, en de laatste seconde loopt naadloos over in de eerste.</li>
            <li>Tot slot een pre-publish-check: alle frames nagelopen, en de tekst langer in beeld gezet waar die te snel ging.</li>
          </ul>
        </Stap>
      </div>

      {/* ── CTA ── */}
      <section className="bg-[#2A2218] px-6 py-16 text-[#F3ECE0] md:py-20">
        <div className="mx-auto max-w-4xl">
          <span className="fc-mono text-[11px] uppercase tracking-[0.25em] text-[#B45F38]">Liever dat ik het doe?</span>
          <h2 className="mt-4 text-2xl leading-tight sm:text-3xl" style={H}>
            Benieuwd wat AI voor jouw bedrijf kan doen?
          </h2>
          <p className="mt-4 max-w-lg leading-relaxed text-[#F3ECE0]/70">
            Doe de gratis AI-Quickscan of plan een gesprek. Geen verplichtingen, wel een helder antwoord.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/scan?utm_source=gids&utm_medium=sprookje"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B45F38] px-7 py-4 text-sm font-semibold text-[#F3ECE0] transition-colors hover:bg-[#9E3D24]"
            >
              <ScanLine size={17} /> Doe de gratis AI-Quickscan
            </Link>
            <Link
              href="/boek"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#F3ECE0]/25 px-7 py-4 text-sm font-semibold text-[#F3ECE0] transition-colors hover:border-[#B45F38] hover:text-[#B45F38]"
            >
              <CalendarCheck size={17} /> Plan een gesprek
            </Link>
          </div>
          <Link href="/ai" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#B45F38]">
            Meer over AI bij Future Content <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
