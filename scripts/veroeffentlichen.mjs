// Tauscht public/ eines vorhandenen statischen Dienstes gegen den aktuellen Build aus.
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, readFileSync, renameSync, rmSync } from "node:fs";
import { join } from "node:path";

const BASIS = process.env.DIENST_BASIS ?? "/srv/dienste";
const REGISTER = process.env.DIENST_REGISTER ?? "/etc/dienste";

function abbruch(text) {
  console.error(`Fehler: ${text}`);
  process.exit(1);
}

const { name } = JSON.parse(readFileSync("package.json", "utf8"));
const eintrag = join(REGISTER, `${name}.conf`);
if (!existsSync(eintrag)) {
  abbruch(`Dienst '${name}' existiert nicht. Er wäre ohne Anmeldung öffentlich. Anlegen mit: dienst neu ${name} static`);
}
if (!/^TYP=static$/m.test(readFileSync(eintrag, "utf8"))) abbruch(`Dienst '${name}' ist nicht statisch.`);

execFileSync("npm", ["run", "build"], { stdio: "inherit" });

const ziel = join(BASIS, name, "public");
const neu = `${ziel}.neu`;
const alt = `${ziel}.alt`;
rmSync(neu, { recursive: true, force: true });
rmSync(alt, { recursive: true, force: true });
cpSync("out", neu, { recursive: true });
execFileSync("chmod", ["-R", "a+rX", neu]);
renameSync(ziel, alt);
renameSync(neu, ziel);
rmSync(alt, { recursive: true, force: true });

console.log(`Veröffentlicht: https://dev.lecmich.it/${name}/`);
