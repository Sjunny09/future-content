"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Promptblok met kopieerknop (gids /sprookje). */
export default function CopyPrompt({ titel, meta, prompt }: { titel: string; meta: string; prompt: string }) {
  const [gekopieerd, setGekopieerd] = useState(false);
  async function kopieer() {
    try {
      await navigator.clipboard.writeText(prompt);
      setGekopieerd(true);
      setTimeout(() => setGekopieerd(false), 1800);
    } catch {
      /* geen klembord (oude browser): de tekst blijft selecteerbaar */
    }
  }
  return (
    <div className="rounded-[2px] border border-[#463C2E] bg-[#221C14]">
      <div className="flex items-center justify-between gap-4 border-b border-[#463C2E] px-5 py-3">
        <div>
          <p className="text-sm font-semibold text-[#F3ECE0]">{titel}</p>
          <p className="fc-mono mt-0.5 text-[10px] uppercase tracking-[0.2em] text-[#C9BBA6]">{meta}</p>
        </div>
        <button
          onClick={kopieer}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#F3ECE0]/25 px-3.5 py-1.5 text-xs font-semibold text-[#F3ECE0] transition-colors hover:border-[#B45F38] hover:text-[#D9A066]"
        >
          {gekopieerd ? <Check size={13} /> : <Copy size={13} />} {gekopieerd ? "Gekopieerd" : "Kopieer"}
        </button>
      </div>
      <pre className="whitespace-pre-wrap break-words px-5 py-4 font-mono text-[12.5px] leading-relaxed text-[#F3ECE0]/85">{prompt}</pre>
    </div>
  );
}
