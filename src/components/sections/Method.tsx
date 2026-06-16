import FadeIn from "../ui/FadeIn";

export default function Method() {
  return (
    <section className="bg-background px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">

          {/* Linke Spalte: Eyebrow, Headline & Body */}
          <div>
            <FadeIn>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-6 bg-umber" aria-hidden="true" />
                <span className="text-sm font-medium tracking-[0.15em] uppercase text-muted">
                  Die Methode
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary leading-[1.15] mb-6">
                Ein sicheres Basislager für deine innere Neuausrichtung.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-primary/80 text-lg leading-relaxed">
                Ich begleite dich nicht als klassischer Berater, der dir
                Ratschläge diktiert. Ich halte den Raum als präsenter, sicherer
                Guide. Wir nutzen die präzise, sanfte Arbeit des Internal Family
                Systems (IFS), um innere Anteile zu verstehen, und Somatic
                Breathwork, um dein Nervensystem körperlich aus dem
                Überlebensmodus zu holen. Hier kommst du an, ordnest die
                Navigation neu und stichst anschließend gestärkt und
                selbstwirksam wieder ins Leben.
              </p>
            </FadeIn>
          </div>

          {/* Rechte Spalte: Testimonial Card */}
          <FadeIn delay={0.15}>
            <div className="bg-surface border border-primary/8 rounded-md p-8 md:p-10">
              {/* Zitat in Spectral-Kursive als Signature-Element */}
              <p className="font-serif italic text-primary/90 text-lg leading-relaxed mb-8">
                „Es fühlte sich an, als würde eine schwere Käseglocke von mir
                genommen. Ich habe eine innere Ruhe und einen tiefen Schlaf
                gefunden, den ich seit Jahren nicht mehr kannte."
              </p>
              <div className="flex items-center gap-3">
                <span className="h-px w-4 bg-umber shrink-0" aria-hidden="true" />
                <p className="text-muted text-sm">
                  Klientin, 1:1 Prozessbegleitung
                </p>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}