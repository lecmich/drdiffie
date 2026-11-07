// Liefert out/ lokal unter /<name>/ aus, genauso wie nginx auf dev.lecmich.it.
import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

const TYPEN = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

export function starteVorschau(port = 4173) {
  const { name } = JSON.parse(readFileSync("package.json", "utf8"));
  const wurzel = resolve("out");
  if (!existsSync(wurzel)) throw new Error("out/ fehlt, zuerst: npm run build");
  const praefix = `/${name}/`;

  const server = createServer((anfrage, antwort) => {
    const pfad = decodeURIComponent(new URL(anfrage.url, "http://localhost").pathname);
    if (pfad === `/${name}` || pfad === "/") {
      antwort.writeHead(302, { Location: praefix }).end();
      return;
    }
    let datei = pfad.startsWith(praefix) ? resolve(wurzel, `.${pfad.slice(name.length + 1)}`) : null;
    if (datei && datei !== wurzel && !datei.startsWith(wurzel + sep)) datei = null;
    if (datei && existsSync(datei) && statSync(datei).isDirectory()) datei = join(datei, "index.html");
    if (!datei || !existsSync(datei)) {
      antwort.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Nicht gefunden");
      return;
    }
    antwort.writeHead(200, { "Content-Type": TYPEN[extname(datei)] ?? "application/octet-stream" });
    createReadStream(datei).pipe(antwort);
  });

  return new Promise((fertig, fehler) => {
    server.once("error", fehler);
    server.listen(port, "127.0.0.1", () => {
      const adresse = server.address();
      fertig({ server, url: `http://127.0.0.1:${adresse.port}${praefix}` });
    });
  });
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { url } = await starteVorschau(Number(process.env.PORT) || 4173);
  console.log(`Vorschau: ${url}`);
}
