import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

// usage: node video-poster.mjs <video-url> <out.jpg> [seekSeconds]
const [url, out, seek = "2"] = process.argv.slice(2);

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

// Navigate to the video's own origin first: a canvas drawing a cross-origin
// video is tainted, and toDataURL then throws.
await page.goto(new URL(url).origin, { waitUntil: "domcontentloaded" });

const info = await page.evaluate(async ([src, seekTo]) => {
  const v = document.createElement("video");
  v.src = src;
  v.muted = true;
  v.playsInline = true;
  v.preload = "auto";
  document.body.appendChild(v);

  await new Promise((res, rej) => {
    if (v.readyState >= 2) return res();
    v.addEventListener("loadeddata", res, { once: true });
    v.addEventListener("error", () => rej(new Error("video failed to load")), {
      once: true,
    });
  });
  v.currentTime = Math.min(Number(seekTo), v.duration - 0.1);
  await new Promise((res) => v.addEventListener("seeked", res, { once: true }));

  const c = document.createElement("canvas");
  c.width = v.videoWidth;
  c.height = v.videoHeight;
  c.getContext("2d").drawImage(v, 0, 0);

  return {
    width: v.videoWidth,
    height: v.videoHeight,
    duration: v.duration,
    dataUrl: c.toDataURL("image/jpeg", 0.82),
  };
}, [url, seek]);

writeFileSync(out, Buffer.from(info.dataUrl.split(",")[1], "base64"));
console.log(
  `${info.width}x${info.height}  ${info.duration.toFixed(1)}s  poster -> ${out}`,
);
await browser.close();
