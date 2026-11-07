# drdiffie

Statische Next.js-Seite, öffentlich unter https://dev.lecmich.it/drdiffie/ (ohne Anmeldung).

@AGENTS.md

## Stack

Next.js (App Router, `output: "export"`), TypeScript strict, Tailwind 4 (`@theme` in `src/app/globals.css`), GSAP + Lenis für Scroll und Animation, Motion für Overlays und Enter/Exit (Import aus `motion/react`). Klassen über `cn()` aus `src/lib/cn.ts` zusammenführen.

## Befehle

| Befehl | Zweck |
| --- | --- |
| `npm run dev` | Entwicklung unter `http://localhost:3000/drdiffie/` |
| `npm run build` | Export nach `out/` |
| `npm run lint` | ESLint |
| `npm run vorschau` | `out/` lokal unter `/drdiffie/` ausliefern |
| `npm run qa` | Baut, macht Screenshots in `qa/`, schlägt bei Konsolenfehlern, 4xx/5xx oder horizontalem Überlauf fehl |
| `npm run veroeffentlichen` | Baut und tauscht `/srv/dienste/drdiffie/public` aus; der Dienst muss existieren (`dienst neu drdiffie static`) |

## Regeln

- Der `name` in `package.json` bestimmt den `basePath`. Wer ihn ändert, ändert die URL.
- Interne Links mit `next/link`, Bilder mit `next/image` oder `basePath` beachten. Keine Pfade wie `/bild.png` in HTML oder CSS.
- Nur Funktionen, die ohne Server laufen: keine Route Handler mit Laufzeitlogik, keine Middleware, kein `cookies()`.
- Jede Animation muss `prefers-reduced-motion` respektieren.
- Keine Geheimnisse in den Client-Code: Alles in `out/` ist öffentlich.
- Schriften selbst hosten, statt sie zur Laufzeit von Fremdservern zu laden.

## 3D

`three` ist nicht installiert. Bei Bedarf: `npm i three @react-three/fiber @react-three/drei @react-three/postprocessing` und `npm i -D @types/three`.

## Entscheidungen und offene Punkte

- Fotos liegen ohne Metadaten in `src/bilder/`. Das Repo ist öffentlich, neue Fotos also vorher von EXIF- und GPS-Daten befreien.
- Das Namensschild im Kittelfoto lautet „Dr. Stinker“. Die Bildunterschrift macht daraus einen Kollegen.
