// Herbruikbare, merk-eigen SVG-infographics voor blogs en pagina's.
// Lijn-gebaseerd, editorial, in de Future Content huisstijl. Geen clip-art.
// Cijfers zijn illustratief en als zodanig gelabeld.

const GOLD = "#C9A96E";
const INK = "#1A1A18";
const MUTED = "#6B7280";
const BORDER = "#E5E0D8";

function Frame({ title, caption, children }: { title: string; caption?: string; children: React.ReactNode }) {
  return (
    <figure className="my-10 rounded-2xl border border-[#E5E0D8] bg-[#FAFAF8] p-6 md:p-8">
      <figcaption className="text-xs font-semibold uppercase tracking-[0.15em] text-[#C9A96E] mb-5">
        {title}
      </figcaption>
      {children}
      {caption && <p className="text-[11px] text-[#6B7280] mt-4">{caption}</p>}
    </figure>
  );
}

function ModelVergelijking() {
  const cols = [
    { name: "ChatGPT", tags: ["Breed inzetbaar", "Sterk in brainstorm", "Veel integraties"] },
    { name: "Claude", tags: ["Beste schrijfwerk", "Lange documenten", "Nuance en toon"] },
    { name: "Gemini", tags: ["In Google Workspace", "Multimodaal", "Realtime info"] },
  ];
  return (
    <Frame title="Welk model waarvoor" caption="Algemene richtlijn, geen harde rangschikking. De beste keuze hangt af van je taak.">
      <div className="grid sm:grid-cols-3 gap-px bg-[#E5E0D8] rounded-xl overflow-hidden border border-[#E5E0D8]">
        {cols.map((c) => (
          <div key={c.name} className="bg-[#FAFAF8] p-5">
            <p className="font-semibold text-[#1A1A18] mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
              {c.name}
            </p>
            <ul className="space-y-2">
              {c.tags.map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-[#6B7280]">
                  <span className="text-[#C9A96E] mt-0.5">▸</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Tijdwinst() {
  const rows = [
    { label: "E-mail en communicatie", v: 40 },
    { label: "Offertes en documenten", v: 30 },
    { label: "Planning en administratie", v: 25 },
    { label: "Rapportage en analyse", v: 50 },
  ];
  return (
    <Frame title="Waar AI tijd bespaart" caption="Illustratieve indicatie van tijdwinst op repeterend werk. Echte cijfers verschillen per bedrijf.">
      <div className="space-y-4">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-[#1A1A18]">{r.label}</span>
              <span className="text-[#C9A96E] font-semibold tabular-nums">{r.v}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-[#F0E6D0] overflow-hidden">
              <div className="h-full rounded-full bg-[#C9A96E]" style={{ width: `${r.v}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function AiVolwassenheid() {
  const dims = [
    { label: "Gebruik en bewustzijn", v: 3 },
    { label: "Strategie en richtlijnen", v: 2 },
    { label: "Implementatie en adoptie", v: 3 },
    { label: "Resultaten en optimalisatie", v: 4 },
  ];
  return (
    <Frame title="De vier assen van de AI-Quickscan" caption="De quickscan scoort je bedrijf op deze vier assen en laat zien waar de meeste winst zit.">
      <div className="grid sm:grid-cols-2 gap-5">
        {dims.map((d) => (
          <div key={d.label} className="flex items-center gap-3">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  className="w-3 h-6 rounded-sm"
                  style={{ backgroundColor: n <= d.v ? GOLD : BORDER }}
                />
              ))}
            </div>
            <span className="text-sm text-[#1A1A18]">{d.label}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Workflow() {
  const steps = ["Trigger (mail, formulier, bestand)", "AI verwerkt en beslist", "Actie in jouw systeem"];
  return (
    <Frame title="Hoe een AI-workflow werkt" caption="Een proces dat zichzelf doet: van binnenkomst tot afgehandelde actie.">
      <div className="flex flex-col md:flex-row items-stretch gap-3">
        {steps.map((s, i) => (
          <div key={s} className="flex-1 flex items-center gap-3">
            <div className="flex-1 rounded-xl border border-[#E5E0D8] bg-[#FAFAF8] p-4 text-center">
              <span className="block text-[#C9A96E] text-xs font-semibold mb-1 tabular-nums">0{i + 1}</span>
              <span className="text-sm text-[#1A1A18] leading-snug">{s}</span>
            </div>
            {i < steps.length - 1 && <span className="text-[#C9A96E] text-xl rotate-90 md:rotate-0">→</span>}
          </div>
        ))}
      </div>
    </Frame>
  );
}

function PromptFormule() {
  const parts = [
    { k: "Rol", v: "Wie moet de AI zijn? (bv. ervaren tekstschrijver)" },
    { k: "Context", v: "Wat is de situatie en achtergrond?" },
    { k: "Taak", v: "Wat moet er precies gebeuren?" },
    { k: "Format", v: "In welke vorm wil je het antwoord?" },
  ];
  return (
    <Frame title="De formule voor een goede prompt" caption="Hoe completer deze vier, hoe beter het antwoord.">
      <div className="space-y-2.5">
        {parts.map((p) => (
          <div key={p.k} className="flex items-start gap-4 rounded-xl border border-[#E5E0D8] bg-[#FAFAF8] p-4">
            <span className="text-[#C9A96E] font-semibold w-20 shrink-0" style={{ fontFamily: "var(--font-playfair)" }}>
              {p.k}
            </span>
            <span className="text-sm text-[#6B7280] leading-relaxed">{p.v}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

const REGISTRY: Record<string, React.FC> = {
  "model-vergelijking": ModelVergelijking,
  tijdwinst: Tijdwinst,
  "ai-volwassenheid": AiVolwassenheid,
  workflow: Workflow,
  "prompt-formule": PromptFormule,
};

export default function Infographic({ name }: { name?: string }) {
  if (!name) return null;
  const Component = REGISTRY[name];
  if (!Component) return null;
  return <Component />;
}
