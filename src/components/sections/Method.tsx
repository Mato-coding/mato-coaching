export default function Method() {
  return (
    <section className="bg-background px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Linke Spalte: Headline & Body-Text */}
          <div>
            <h2 className="text-primary mb-6 text-3xl font-medium md:text-4xl">
              Ein sicheres Basislager für deine innere Neuausrichtung.
            </h2>
            <p className="text-primary/80 mb-6 text-lg">
              Ich begleite dich nicht als klassischer Berater, der dir Ratschläge diktiert. Ich halte den Raum als präsenter, sicherer Guide. Wir nutzen die präzise, sanfte Arbeit des Inner Family Systems (IFS), um unintegrierte Anteile zu verstehen, und Somatic Breathwork, um dein Nervensystem körperlich aus dem Überlebensmodus zu holen. Hier kommst du an, ordnest die Navigation neu und stichst anschließend gestärkt und selbstwirksam wieder ins Leben.
            </p>
          </div>

          {/* Rechte Spalte: Testimonial Card */}
          <div>
            <div className="bg-surface rounded-2xl p-8 shadow-sm md:p-10">
              <p className="text-primary/90 mb-6 text-lg italic leading-relaxed">
                „Es fühlte sich an, als würde eine schwere Käseglocke von mir genommen. Ich habe eine innere Ruhe und einen tiefen Schlaf gefunden, den ich seit Jahren nicht mehr kannte.“
              </p>
              <p className="text-primary text-sm font-medium">
                – Klientin, 1:1 Prozessbegleitung
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}