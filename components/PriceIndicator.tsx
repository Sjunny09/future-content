import { PRIJZEN } from "@/lib/constants";

type PrijsKey = keyof typeof PRIJZEN;

/**
 * Toont een "vanaf"-prijs uit de centrale config (lib/constants.ts -> PRIJZEN).
 * Eén plek voor alle bedragen; John past ze daar aan. Waarde "[PRIJS]" blijft
 * zichtbaar als placeholder waar nog geen bedrag bepaald is.
 *
 *   <PriceIndicator item="vastgoedvideo" />        -> "Vanaf €199"
 *   <PriceIndicator item="aiScanLocatie" />        -> "Vanaf [PRIJS]"
 *   <PriceIndicator item="workshop" prefix="" />   -> "€750"
 */
export function PriceIndicator({
  item,
  prefix = "Vanaf",
  className = "",
}: {
  item: PrijsKey;
  prefix?: string;
  className?: string;
}) {
  const waarde = PRIJZEN[item];
  const bedrag = waarde === "[PRIJS]" ? "[PRIJS]" : `€${waarde}`;
  const tekst = prefix ? `${prefix} ${bedrag}` : bedrag;
  return <span className={className}>{tekst}</span>;
}
