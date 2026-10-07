// Planningsstand voor de wekelijkse blogroutine (skill weekblog). Deterministisch,
// zodat de routine niet zelf hoeft te rekenen: hoe ver is de planning gevuld,
// welke woensdag is de volgende vrije, en is er een nieuwe blog nodig.
//   npx tsx scripts/weekblog-status.ts            -> JSON
//   npx tsx scripts/weekblog-status.ts --selftest
import { BLOG_POSTS, vandaagNL } from "../lib/blog";

const BUFFER_DAGEN = 14; // altijd minstens twee weken vooruit ingepland

function plusDagen(iso: string, n: number): string {
  const d = new Date(iso + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function volgendeWoensdagNa(iso: string): string {
  let d = plusDagen(iso, 1);
  while (new Date(d + "T12:00:00Z").getUTCDay() !== 3) d = plusDagen(d, 1);
  return d;
}

export function status(vandaag: string, datums: string[]) {
  const laatste = datums.reduce((m, d) => (d > m ? d : m), vandaag);
  const nodig = laatste < plusDagen(vandaag, BUFFER_DAGEN);
  const basis = laatste > vandaag ? laatste : vandaag;
  return { vandaag, laatsteIngepland: laatste, nodig, volgendeDatum: volgendeWoensdagNa(basis) };
}

if (process.argv.includes("--selftest")) {
  const assert = require("node:assert");
  // planning gevuld tot 25-11, vandaag 7-10: niets nodig, volgende = 2-12
  assert.deepEqual(status("2026-10-07", ["2026-11-25"]), { vandaag: "2026-10-07", laatsteIngepland: "2026-11-25", nodig: false, volgendeDatum: "2026-12-02" });
  // vandaag 16-11, laatste 25-11 (9 dagen): wel nodig, volgende = 2-12
  assert.equal(status("2026-11-16", ["2026-11-25"]).nodig, true);
  assert.equal(status("2026-11-16", ["2026-11-25"]).volgendeDatum, "2026-12-02");
  // niets ingepland: volgende woensdag na vandaag (ma 30-11 -> wo 2-12)
  assert.equal(status("2026-11-30", ["2026-11-25"]).volgendeDatum, "2026-12-02");
  console.log("weekblog-status selftest OK");
} else {
  const s = status(vandaagNL(), BLOG_POSTS.map((p) => p.date));
  console.log(JSON.stringify({ ...s, slugs: BLOG_POSTS.map((p) => p.slug) }));
}
