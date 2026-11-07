"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { Pfote } from "@/components/pfote";

const FAELLE = [
  {
    beschwerde: "Mir ist ein Brötchen runtergefallen",
    diagnose: "Akuter Bodenkontakt. Brötchen nicht mehr zu retten.",
    verordnung: "Nicht bewegen. Der Doktor ist schon da und entsorgt den Befund fachgerecht.",
    dosierung: "Nächstes Mal bitte mit Butter.",
  },
  {
    beschwerde: "Mein Hund frisst Gras",
    diagnose: "Vegetarische Phase.",
    verordnung: "Leberwurst, 3 x täglich, bis es vorbei ist.",
    dosierung: "Der Arzt kostet jede Dosis vor.",
  },
  {
    beschwerde: "Meine Katze ignoriert mich",
    diagnose: "Katze. Chronisch, nicht heilbar.",
    verordnung: "Keine Therapie bekannt. Der Doktor hat es selbst versucht und musste danach seine Nase behandeln lassen.",
    dosierung: "Abstand halten, mindestens ein Sofa.",
  },
  {
    beschwerde: "Mein Hund hat zugenommen",
    diagnose: "Flauschödem. Völlig harmlos.",
    verordnung: "Waage sofort absetzen.",
    dosierung: "Zweitmeinung eingeholt: meine. Gleiches Ergebnis.",
  },
  {
    beschwerde: "Ich möchte meinen Hund baden",
    diagnose: "Schwerer Denkfehler beim Halter.",
    verordnung: "Shampoo sofort absetzen. Der Geruch wurde vom Arzt persönlich im Park aufgetragen und wirkt noch.",
    dosierung: "Bei Rückfall: nass aufs Sofa.",
  },
  {
    beschwerde: "Mein Rücken tut weh",
    diagnose: "Zu wenig Rücken. Der Doktor hat deutlich mehr davon und beklagt sich nicht.",
    verordnung: "Treppen meiden. Der Doktor meidet sie auch, Sie tragen ihn ab heute hoch.",
    dosierung: "Morgens, abends und immer, wenn er guckt.",
  },
  {
    beschwerde: "Mein Meerschweinchen quiekt",
    diagnose: "Verdacht auf Quietschspielzeug.",
    verordnung: "Zur genaueren Untersuchung den Patienten bitte mit dem Doktor allein lassen.",
    dosierung: "Von der Sprechstundenhilfe ausdrücklich nicht empfohlen.",
  },
];

function Feld({ name, wert, className }: { name: string; wert: string; className?: string }) {
  return (
    <div className={cn("border-rezept-linie px-2.5 py-1.5", className)}>
      <div className="text-xs text-rezept-linie">{name}</div>
      <div className="font-hand text-xl leading-tight text-tinte">{wert}</div>
    </div>
  );
}

export function Rezept() {
  const [auswahl, setAuswahl] = useState(0);
  const blatt = useRef<HTMLDivElement>(null);
  const ruhig = useReducedMotion();
  const fall = FAELLE[auswahl];

  function waehle(index: number) {
    setAuswahl(index);
    // Auf dem Handy steht das Rezept unter der Liste und wäre sonst nicht zu sehen.
    if (window.matchMedia("(max-width: 899px)").matches) {
      blatt.current?.scrollIntoView({ behavior: ruhig ? "auto" : "smooth", block: "center" });
    }
  }

  return (
    <div className="grid items-start gap-8 min-[900px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] min-[900px]:gap-12">
      <ul className="flex flex-col gap-1">
        {FAELLE.map((f, index) => (
          <li key={f.beschwerde}>
            <button
              type="button"
              aria-pressed={index === auswahl}
              onClick={() => waehle(index)}
              className={cn(
                "w-full cursor-pointer rounded-md px-4 py-3 text-left text-lg transition-colors",
                "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-senf",
                index === auswahl ? "bg-rezept text-tinte" : "text-papier hover:bg-fell-hell",
              )}
            >
              {f.beschwerde}
            </button>
          </li>
        ))}
      </ul>

      <div
        ref={blatt}
        aria-live="polite"
        className="relative -rotate-1 scroll-mt-6 bg-rezept p-3 text-rezept-linie shadow-[6px_8px_0_#00000055] sm:p-5"
      >
        <div className="flex items-baseline justify-between gap-4 pb-2">
          <p className="font-bold">Kassenrezept</p>
          <p className="text-sm">Muster 16 ½ (Dackelformat)</p>
        </div>

        <div className="grid grid-cols-2 border border-rezept-linie">
          <Feld name="Krankenkasse" wert="Allgemeine Ohrenkraul-Kasse" className="col-span-2 border-b" />
          <Feld name="Name des Patienten" wert="Sie" className="border-r border-b" />
          <Feld name="Datum" wert="Jetzt, sofort" className="border-b" />
          <Feld name="Zuzahlung" wert="1 Scheibe Salami" className="border-r" />
          <Feld name="Gebühr frei" wert="Nein" />
        </div>

        <div className="relative min-h-72 pt-4 sm:min-h-80">
          <p className="text-3xl font-bold italic">Rp.</p>
          <div className="mt-1 max-w-[62ch] pr-2 font-hand text-2xl leading-snug text-tinte sm:text-[1.7rem]">
            <p>
              <span className="font-body text-sm text-rezept-linie">Diagnose: </span>
              {fall.diagnose}
            </p>
            <p className="mt-3">{fall.verordnung}</p>
            <p className="mt-3">{fall.dosierung}</p>
          </div>

          <p className="mt-5 pr-24 text-sm">
            <span className="mr-1.5 inline-block size-3 border border-rezept-linie bg-papier align-[-1px] text-center text-[0.6rem] leading-none font-bold">
              ×
            </span>
            aut idem: Ein Ersatz durch Gemüse ist ausgeschlossen.
          </p>

          <motion.div
            key={auswahl}
            initial={ruhig ? false : { scale: 2.6, opacity: 0, rotate: -34 }}
            animate={{ scale: 1, opacity: 1, rotate: -14 }}
            transition={{ duration: 0.22, ease: [0.5, 0, 1, 1] }}
            className="absolute right-1 bottom-0 flex flex-col items-center text-stempel"
          >
            <Pfote className="size-16 sm:size-20" />
            <span className="text-xs font-bold whitespace-nowrap">Dr. Diffie</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
