import FadeIn from "../ui/FadeIn";

export default function Cause() {
  return (
    <section className="bg-surface px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16 lg:gap-24">

          {/* Linke Spalte: Eyebrow + Headline */}
          <div className="md:col-span-5">
            <FadeIn>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-6 bg-umber" aria-hidden="true" />
                <span className="text-sm font-medium tracking-[0.15em] uppercase text-muted">
                  Der Grund
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary leading-[1.15]">
                Dein System macht keinen Fehler. Es schützt dich.
              </h2>
            </FadeIn>
          </div>

          {/* Rechte Spalte: Body-Text */}
          <div className="md:col-span-7 lg:col-span-6 lg:col-start-7">
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