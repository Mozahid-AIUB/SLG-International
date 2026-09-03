import { chromium } from "playwright";

// usage: node shot.mjs <url> <out.png> [width] [height]
const [url, out, w = "1440", h = "1000"] = process.argv.slice(2);

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({
  viewport: { width: Number(w), height: Number(h) },
  deviceScaleFactor: 1,
});

await page.goto(url, { waitUntil: "networkidle" });

// Scroll the whole page so IntersectionObserver-driven reveals fire, then
// return to the top before capturing.
await page.evaluate(async () => {
  const step = Math.round(window.innerHeight * 0.7);
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 90));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 500));
});

await page.waitForTimeout(900);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log("captured", out);
