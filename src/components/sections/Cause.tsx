export default function Cause() {
  return (
    <section className="bg-surface px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16 lg:gap-24">
          {/* Linke Spalte: Headline (nimmt 5 von 12 Spalten ein) */}
          <div className="md:col-span-5">
            <h2 className="text-primary text-3xl font-medium leading-snug md:text-4xl">
              Dein System macht keinen Fehler. Es schützt dich.
            </h2>
          </div>
          {/* Rechte Spalte: Body-Text (nimmt 6 Spalten ein, leicht eingerückt auf ganz großen Screens) */}
          <div className="md:col-span-7 lg:col-span-6 lg:col-start-7">
            <p className="text-primary/80 text-lg">
              Chronische innere Unruhe oder Zustände akuter Überwältigung kommen nicht aus dem Nichts. Sie sind oft der laute Ausdruck von unterdrückter Trauer, alten Verletzungen oder nicht integrierten Erfahrungen. Dein Nervensystem hat gelernt, permanent Wache zu halten. Erst wenn wir aufhören, diese Schutzmechanismen zu bekämpfen, und beginnen, sie zu verstehen, kann echte Regulation stattfinden.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}