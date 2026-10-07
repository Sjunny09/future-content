// Unsplash-hulp voor blogfoto's. Draait via headless Chrome omdat unsplash.com
// een botcheck heeft. Alleen gratis foto's (geen premium/Unsplash+).
// Vereist playwright-core (npx-cache, pad hieronder) en Google Chrome. Doel voor blogs: public/blog/foto/<slug>.jpg,
// credits in docs/blogfoto-unsplash-verantwoording.json. Zie de blogregel in de portfolio-CLAUDE.md.
//
//   node scripts/unsplash-blogfoto.cjs zoek <werkmap> "<zoekterm>" ["<zoekterm>" ...]
//     -> per zoekterm <werkmap>/<n>.json (kandidaten) en <werkmap>/<n>.png (fotovel, genummerd)
//   node scripts/unsplash-blogfoto.cjs pak <foto-id> <doelbestand.jpg> <slug> <credits.json>
//     -> controleert licentie, downloadt 1600x900 jpg, schrijft credit weg
const { chromium } = require("/Users/johnlavrijsen/.npm/_npx/a8a7eec953f1f314/node_modules/playwright-core");
const fs = require("fs");
const path = require("path");

async function sessie() {
  const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
  const c = await b.newContext({
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
    viewport: { width: 1400, height: 1000 },
  });
  const p = await c.newPage();
  await p.goto("https://unsplash.com/s/photos/office", { waitUntil: "domcontentloaded", timeout: 60000 });
  await p.waitForTimeout(8000);
  return { b, p };
}

async function zoek(werkmap, termen) {
  fs.mkdirSync(werkmap, { recursive: true });
  const { b, p } = await sessie();
  for (const [i, term] of termen.entries()) {
    const json = await p.evaluate(async (q) => {
      const r = await fetch(`/napi/search/photos?query=${encodeURIComponent(q)}&per_page=30&orientation=landscape`);
      return r.ok ? r.json() : { results: [] };
    }, term);
    const vrij = (json.results || [])
      .filter((r) => !r.premium && !r.plus)
      .slice(0, 12)
      .map((r, n) => ({
        n: n + 1,
        id: r.id,
        alt: r.alt_description || r.description || "",
        fotograaf: r.user?.name,
        thumb: r.urls?.small,
      }));
    fs.writeFileSync(path.join(werkmap, `${i + 1}.json`), JSON.stringify({ term, kandidaten: vrij }, null, 1));
    const html = `<html><body style="margin:0;background:#222;font:16px sans-serif;color:#fff">
      <div style="padding:6px 10px">${term}</div>
      <div style="display:grid;grid-template-columns:repeat(4,340px);gap:6px;padding:6px">
      ${vrij.map((k) => `<div style="position:relative"><img src="${k.thumb}" style="width:340px;height:200px;object-fit:cover;display:block">
        <span style="position:absolute;top:4px;left:4px;background:#000c;padding:2px 8px;font-weight:bold;font-size:20px">${k.n}</span></div>`).join("")}
      </div></body></html>`;
    const v = await p.context().newPage();
    await v.setContent(html, { waitUntil: "networkidle" });
    await v.waitForTimeout(500);
    await v.screenshot({ path: path.join(werkmap, `${i + 1}.png`), fullPage: true });
    await v.close();
    console.log(`${i + 1}: ${term} -> ${vrij.length} gratis kandidaten`);
  }
  await b.close();
}

async function pak(id, doel, slug, creditsPad) {
  const { b, p } = await sessie();
  const info = await p.evaluate(async (fid) => {
    const r = await fetch(`/napi/photos/${fid}`);
    return r.ok ? r.json() : null;
  }, id);
  if (!info) throw new Error(`foto ${id} niet gevonden`);
  if (info.premium || info.plus) throw new Error(`foto ${id} is premium (Unsplash+), niet gratis te gebruiken`);
  const url = `${info.urls.raw}&w=1600&h=900&fit=crop&crop=entropy&fm=jpg&q=78`;
  const buf = await p.evaluate(async (u) => {
    const r = await fetch(u);
    const a = new Uint8Array(await r.arrayBuffer());
    let s = "";
    for (let i = 0; i < a.length; i += 0x8000) s += String.fromCharCode.apply(null, a.subarray(i, i + 0x8000));
    return btoa(s);
  }, url);
  fs.mkdirSync(path.dirname(doel), { recursive: true });
  fs.writeFileSync(doel, Buffer.from(buf, "base64"));
  const credits = fs.existsSync(creditsPad) ? JSON.parse(fs.readFileSync(creditsPad, "utf8")) : {};
  credits[slug] = {
    unsplashId: id,
    fotograaf: info.user?.name,
    pagina: info.links?.html,
    licentie: "Unsplash License (gratis, ook commercieel, naamsvermelding niet verplicht)",
    beschrijving: info.alt_description || "",
  };
  fs.writeFileSync(creditsPad, JSON.stringify(credits, null, 1));
  await b.close();
  console.log(`ok ${slug} <- ${id} (${info.user?.name}), ${fs.statSync(doel).size} bytes`);
}

const [cmd, ...a] = process.argv.slice(2);
(cmd === "zoek" ? zoek(a[0], a.slice(1)) : cmd === "pak" ? pak(a[0], a[1], a[2], a[3]) : Promise.reject(new Error("gebruik: zoek|pak")))
  .catch((e) => {
    console.error("FOUT:", e.message);
    process.exit(1);
  });
