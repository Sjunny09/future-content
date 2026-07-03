"use client";

import { useEffect } from "react";
import { track } from "@/lib/scan/analytics/plausible";

// Vuurt één keer "cal_geladen" af zodra de boekingspagina/Cal-embed in beeld is.
// Zo zien we in Plausible hoeveel mensen tot de afspraak-stap komen (top of het
// boeken-funnel), los van of ze daadwerkelijk boeken (gesprek_geboekt).
export default function CalLoadTracker() {
  useEffect(() => {
    track("cal_geladen");
  }, []);
  return null;
}
