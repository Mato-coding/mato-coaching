import FadeIn from "../ui/FadeIn";

export default function Cause() {
  return (
    <section className="bg-surface px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">

          {/* Linke Spalte: Eyebrow + Headline */}
          <div>
            <FadeIn>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-6 bg-umber" aria-hidden="true" />
                <span className="text-sm font-medium tracking-[0.15em] uppercase text-muted">
                  Der Grund
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-serif text-4xl md:text-5xl font-medium text-primary leading-[1.1]">
                Dein System macht keinen Fehler. Es schützt dich.
              </h2>
            </FadeIn>
          </div>

          {/* Rechte Spalte: Body-Text, vertikal zentriert */}
          <div className="flex items-center">
            <FadeIn delay={0.2}>
              <p className="text-primary/80 text-lg leading-relaxed">
                Chronische innere Unruhe oder Zustände akuter Überwältigung
                kommen nicht aus dem Nichts. Sie sind oft der laute Ausdruck
                von unterdrückter Trauer, alten Verletzungen oder noch nicht
                verarbeiteten Erfahrungen. Dein Nervensystem hat gelernt,
                permanent auf Alarm zu stehen. Erst wenn wir aufhören, diese
                Schutzmechanismen zu bekämpfen, und beginnen, sie zu verstehen,
                kann echte Regulation entstehen.
              </p>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}