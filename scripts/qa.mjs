// Screenshots von out/ auf Desktop und Handy; schlaegt bei Konsolen- oder Ladefehlern fehl.
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { chromium } from "playwright";
import { starteVorschau } from "./vorschau.mjs";

const SYSTEM_CHROMIUM = "/usr/bin/chromium";
const ANSICHTEN = [
  { name: "desktop", viewport: { width: 1440, height: 900 } },
  { name: "handy", viewport: { width: 390, height: 844 } },
];

rmSync("qa", { recursive: true, force: true });
mkdirSync("qa");

const { server, url } = await starteVorschau(0);
const browser = await chromium.launch({
  ...(existsSync(SYSTEM_CHROMIUM) ? { executablePath: SYSTEM_CHROMIUM } : {}),
  args: ["--no-sandbox"],
});

const fehler = [];
try {
  for (const ansicht of ANSICHTEN) {
    const seite = await browser.newPage({ viewport: ansicht.viewport });
    seite.on("console", (m) => m.type() === "error" && fehler.push(`${ansicht.name}: ${m.text()}`));
    seite.on("pageerror", (e) => fehler.push(`${ansicht.name}: ${e.message}`));
    seite.on("response", (r) => r.status() >= 400 && fehler.push(`${ansicht.name}: ${r.status()} ${r.url()}`));

    await seite.goto(url, { waitUntil: "networkidle" });
    await seite.screenshot({ path: `qa/${ansicht.name}-start.png` });

    const ueberbreite = await seite.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (ueberbreite > 0) fehler.push(`${ansicht.name}: ${ueberbreite}px horizontaler Ueberlauf`);

    await seite.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await seite.waitForTimeout(1500);
    await seite.screenshot({ path: `qa/${ansicht.name}-ende.png` });
    await seite.close();
  }
} finally {
  await browser.close();
  server.close();
}

if (fehler.length) {
  console.error(`QA fehlgeschlagen:\n- ${fehler.join("\n- ")}`);
  process.exit(1);
}
console.log("QA bestanden, Screenshots in qa/");
