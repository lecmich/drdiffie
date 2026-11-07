import Image from "next/image";
import { Pfote } from "@/components/pfote";
import { Rezept } from "@/components/rezept";
import kittel from "@/bilder/dr-diffie-kittel.webp";
import blick from "@/bilder/dr-diffie-blick.webp";

const SPRECHZEITEN = [
  ["Mo bis Fr", "5:40 Uhr, Visite auf Ihrem Gesicht"],
  ["Mittags", "Geschlossen wegen Schlaf"],
  ["Nachmittags", "Geschlossen wegen Sonnenfleck"],
  ["Kühlschrank auf", "Sofort, aus jedem Stockwerk"],
  ["Käsepapier raschelt", "War schon da"],
];

const LEBENSLAUF = [
  ["Doktorarbeit", "„Ist das für mich?“ Eine Langzeitstudie an 4.000 Mahlzeiten. Summa cum Wurst."],
  ["Approbation", "Hängt am Halsband, in Form eines Hot Dogs. Die Urkunde aus Papier wurde nach dem Lesen gegessen."],
  ["Spezialgebiet", "Rücken. Er hat von allen Kollegen den längsten und nimmt das sehr ernst."],
  ["Arbeitsweise", "Beginnt jede Untersuchung hinten. Auch bei Menschen, wenn sie sich nicht schnell genug umdrehen."],
  ["Sprachen", "Versteht Wurst, Käse und Gassi. Das Wort „Nein“ ist ihm trotz jahrelanger Schulung medizinisch unbekannt."],
];

const GEBUEHREN = [
  ["101", "Erschnüffeln der Krankengeschichte, gründlich, auch hinten", "1 Wiener"],
  ["102", "Abhören mit Stethoskop. Hört nichts, schaut aber besorgt.", "1 Käsewürfel"],
  ["103", "Zweitmeinung. Wie die erste, nur lauter.", "2 Scheiben Salami"],
  ["104", "Anbellen des Postboten als tägliche Vorsorge", "Kommt, ob Sie wollen oder nicht"],
  ["105", "Aufessen des Befunds. Eine Kopie ist nicht möglich.", "Im Preis enthalten"],
  ["106", "Vernichtung der Patientenakte durch Zerkauen, DSGVO-konform", "1 Socke"],
  ["107", "Ohrenkraulen, mindestens 20 Minuten. Behandelt wird der Arzt, und zwar von Ihnen.", "Pflichtleistung"],
];

const STIMMEN = [
  ["Ich kam wegen meines Ohrs. Gegangen bin ich ohne Frühstück.", "Bello, Labrador"],
  ["Er hat mir tief in die Augen gesehen und mein Butterbrot genommen. Ich fühlte mich endlich gesehen.", "Frau K., Halterin"],
  ["Ein Stern. Er hat mich um den Tisch gejagt.", "Mieze, Katze"],
  ["Seit der Behandlung habe ich keine Beschwerden mehr. Und keine Hausschuhe.", "Herr M., Halter"],
];

export default function Home() {
  return (
    <>
      <header className="fliesen overflow-hidden pt-5 pb-14 sm:pt-8 sm:pb-20">
        <h1 className="dackelschrift px-3 text-center sm:px-4">Dr. Diffie</h1>

        <div className="mx-auto mt-6 grid max-w-6xl gap-8 px-4 sm:mt-10 sm:px-6 min-[900px]:grid-cols-2 min-[900px]:gap-12">
          <figure>
            <Image
              src={kittel}
              alt="Langhaardackel in weißem Arztkittel mit Stethoskop und Namensschild schaut ernst in die Kamera"
              priority
              sizes="(min-width: 900px) 560px, 100vw"
              className="h-auto w-full rounded-sm border-8 border-papier shadow-[6px_8px_0_#23150e33]"
            />
            <figcaption className="mt-3 max-w-[60ch] text-base">
              Das Namensschild hat er sich bei Kollege Dr. Stinker geliehen. Ob er es zurückgibt, hängt davon ab, wie es
              schmeckt.
            </figcaption>
          </figure>

          <div className="flex flex-col">
            <p className="font-schild text-4xl leading-none font-extrabold text-balance [font-stretch:110%] sm:text-5xl">
              Haben Sie Wurst dabei?
            </p>
            <p className="mt-4 max-w-[52ch] text-xl">
              Dann hat der Doktor jetzt Zeit für Sie. Facharzt für Innere Medizin, vor allem für das, was sich in Ihrer
              Einkaufstasche befindet. Alle Kassen, besonders die an der Fleischtheke.
            </p>
            <a
              href="#rezept"
              className="mt-6 self-start rounded-md bg-fell px-6 py-3 text-lg font-bold text-papier transition-colors hover:bg-fell-hell focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-fell"
            >
              Beschwerde schildern
            </a>

            <section
              aria-label="Praxisschild mit Sprechzeiten"
              className="relative mt-10 rounded bg-fell px-6 py-7 text-papier shadow-[4px_6px_0_#23150e44] sm:px-8"
            >
              <span className="schraube top-2 left-2" />
              <span className="schraube top-2 right-2" />
              <span className="schraube bottom-2 left-2" />
              <span className="schraube right-2 bottom-2" />
              <h2 className="font-schild text-xl font-bold text-lohfarben [font-stretch:125%]">Sprechzeiten</h2>
              <dl className="mt-3 grid gap-x-5 gap-y-2 text-base sm:grid-cols-[auto_1fr]">
                {SPRECHZEITEN.map(([wann, was]) => (
                  <div key={wann} className="contents">
                    <dt className="font-bold">{wann}</dt>
                    <dd className="-mt-2 mb-1 sm:m-0">{was}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-base text-lohfarben">Praxis: unter dem Küchentisch. Bitte nicht klingeln, er kommt sonst.</p>
            </section>
          </div>
        </div>
      </header>

      <main>
        <section id="rezept" className="scroll-mt-4 bg-fell py-16 text-papier sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="abschnitt-titel text-lohfarben">
              Was fehlt Ihnen denn?
            </h2>
            <p className="mt-4 mb-10 max-w-[56ch] text-xl">
              Wählen Sie Ihre Beschwerde. Der Doktor stellt sofort ein Rezept aus, ohne Sie anzusehen. Er schaut gerade auf
              Ihre Tasche.
            </p>
            <Rezept />
          </div>
        </section>

        <section className="bg-senf py-16 sm:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 min-[900px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] min-[900px]:gap-14">
            <figure>
              <Image
                src={blick}
                alt="Der schwarz-lohfarbene Dackel schaut von unten mit großer Nase und flehendem Blick nach oben, am Halsband eine Marke in Form eines Hot Dogs"
                sizes="(min-width: 900px) 450px, 100vw"
                className="h-auto w-full rounded-sm border-8 border-papier"
              />
              <figcaption className="mt-3 max-w-[50ch] text-base">
                Der diagnostische Blick. So schaut er, wenn Sie sagen: „Das war jetzt aber das letzte Stück.“
              </figcaption>
            </figure>
            <div>
              <h2 className="abschnitt-titel">
                Der Doktor persönlich
              </h2>
              <dl className="mt-8 space-y-5">
                {LEBENSLAUF.map(([titel, text]) => (
                  <div key={titel} className="max-w-[60ch]">
                    <dt className="font-bold">{titel}</dt>
                    <dd>{text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="bg-papier py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="abschnitt-titel">
              Gebührenordnung
            </h2>
            <p className="mt-4 mb-8 text-xl">Abgerechnet wird sofort und aus der Hand.</p>
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-4 border-fell">
                  <th scope="col" className="py-2 pr-4 font-bold">Ziffer</th>
                  <th scope="col" className="py-2 pr-4 font-bold">Leistung</th>
                  <th scope="col" className="py-2 font-bold">Gebühr</th>
                </tr>
              </thead>
              <tbody>
                {GEBUEHREN.map(([ziffer, leistung, gebuehr]) => (
                  <tr key={ziffer} className="border-b border-fell/25 align-top">
                    <td className="py-3 pr-4 tabular-nums">{ziffer}</td>
                    <td className="max-w-[60ch] py-3 pr-4">{leistung}</td>
                    <td className="py-3 font-bold sm:whitespace-nowrap">{gebuehr}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="mt-20 abschnitt-titel">
              Das sagen die Patienten
            </h2>
            <div className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2">
              {STIMMEN.map(([zitat, wer]) => (
                <figure key={wer}>
                  <blockquote className="font-hand text-3xl leading-tight text-tinte">„{zitat}“</blockquote>
                  <figcaption className="mt-1 text-base">{wer}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-fell py-12 text-papier">
        <div className="mx-auto flex max-w-6xl items-start gap-5 px-4 sm:px-6">
          <Pfote className="mt-1 size-12 shrink-0 text-lohfarben" />
          <div className="max-w-[64ch]">
            <p className="text-xl font-bold">
              Zu Risiken und Nebenwirkungen fressen Sie die Packungsbeilage und fragen Sie niemanden.
            </p>
            <p className="mt-3 text-base">
              Ganz im Ernst: Diffie ist ein Dackel und hat keine Approbation. Wenn Ihr Tier wirklich krank ist, gehen Sie bitte
              in eine echte Tierarztpraxis.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
