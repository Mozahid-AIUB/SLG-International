import { chromium } from "playwright";
const b = await chromium.launch({ channel: "msedge" });
const p = await b.newPage({ viewport: { width: 1440, height: 800 } });
await p.goto("http://127.0.0.1:4000/", { waitUntil: "networkidle" });
await p.waitForTimeout(1200);
await p.screenshot({ path: process.argv[2] + "/slide-0.png" });
// Click the third indicator so we see a deliberate change, not just a timer.
const dots = p.locator("button[aria-current]");
console.log("indicators:", await dots.count());
await dots.nth(2).click();
await p.waitForTimeout(1400);
await p.screenshot({ path: process.argv[2] + "/slide-2.png" });
await b.close();
