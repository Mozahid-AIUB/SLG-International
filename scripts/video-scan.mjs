import { chromium } from "playwright";

// usage: node video-scan.mjs <video-url> [stepSeconds]
const [url, step = "1"] = process.argv.slice(2);

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
await page.goto(new URL(url).origin, { waitUntil: "domcontentloaded" });

const report = await page.evaluate(
  async ([src, stepStr]) => {
    const v = document.createElement("video");
    v.src = src;
    v.muted = true;
    v.preload = "auto";
    document.body.appendChild(v);
    await new Promise((res, rej) => {
      v.addEventListener("loadeddata", res, { once: true });
      v.addEventListener("error", () => rej(new Error("load failed")), {
        once: true,
      });
    });

    const c = document.createElement("canvas");
    c.width = 160;
    c.height = 90;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    const out = [];

    for (let t = 0; t < v.duration; t += Number(stepStr)) {
      v.currentTime = Math.min(t, v.duration - 0.05);
      await new Promise((res) => v.addEventListener("seeked", res, { once: true }));
      ctx.drawImage(v, 0, 0, c.width, c.height);
      const { data } = ctx.getImageData(0, 0, c.width, c.height);

      let chroma = 0;
      const total = data.length / 4;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        // Chroma-key green: green clearly dominant over both other channels.
        if (g > 90 && g - r > 55 && g - b > 55) chroma++;
      }
      out.push({ t: Number(t.toFixed(1)), greenPct: +((chroma / total) * 100).toFixed(1) });
    }
    return out;
  },
  [url, step],
);

for (const row of report) {
  const bar = "#".repeat(Math.round(row.greenPct / 2));
  console.log(`${String(row.t).padStart(5)}s  ${String(row.greenPct).padStart(5)}%  ${bar}`);
}
await browser.close();
