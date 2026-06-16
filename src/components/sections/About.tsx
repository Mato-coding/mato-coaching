import Image from "next/image";

export default function About() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Linke Spalte: Porträtfoto */}
          <div className="flex justify-center lg:justify-end">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
              alt="Porträt des Guides"
              width={600}
              height={800}
              className="rounded-2xl object-cover shadow-sm"
            />
          </div>

          {/* Rechte Spalte: Text und Trust-Signale */}
          <div>
            <p className="text-accent mb-3 text-sm font-medium tracking-wider uppercase">
              Der Guide
            </p>
            <h2 className="text-primary mb-6 text-3xl font-medium md:text-4xl">
              Klarheit im Geist, Erdung im Körper.
            </h2>
            
            <p className="text-primary/80 mb-4 text-lg">
              Als Prozessbegleiter und Coach begegne ich dir auf Augenhöhe – mit einer klaren, strukturierten Haltung und tiefem Verständnis für die Mechanismen von Stress und Traumata. Meine Arbeit basiert auf der Überzeugung, dass echte Veränderung erst dann beginnt, wenn wir den Körper einbeziehen und dem Nervensystem erlauben, alte Alarmzustände zu entladen.
            </p>
            <p className="text-primary/80 mb-8 text-lg">
              Gemeinsam schaffen wir einen unaufgeregten, sicheren Raum, in dem analytische Klarheit und somatische Tiefe zusammenfließen. Hier musst du nichts beweisen. Du darfst ankommen, sortieren und Schritt für Schritt die Kontrolle über dein eigenes Wohlbefinden zurückgewinnen.
            </p>

            {/* Trust-Signale / Qualifikationen */}
            <div className="border-primary/10 mt-6 border-t pt-6">
              <ul className="space-y-3 text-primary/90">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1 leading-none">•</span>
                  <span>Zertifizierter Breathwork Instructor & Coach (Somatic Breathwork)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1 leading-none">•</span>
                  <span>Ausgebildet in der Arbeit mit inneren Anteilen (IFS-orientierte Prozessbegleitung)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1 leading-none">•</span>
                  <span>Langjährige Erfahrung in der Begleitung von Menschen in Hochstress-Phasen</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}