import Image from "next/image";
import FadeIn from "../ui/FadeIn";

const credentials = [
  "Zertifizierter Breathwork Instructor & Coach (Somatic Breathwork)",
  "Ausgebildet in der Arbeit mit inneren Anteilen (IFS-orientierte Prozessbegleitung)",
  "Langjährige Erfahrung in der Begleitung von Menschen in intensiven Lebensphasen",
];

export default function About() {
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Linke Spalte: Porträtfoto — Unsplash-Platzhalter, gegen echtes Foto ersetzen */}
          <FadeIn>
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/portrait-lasse-sw.jpg"
                alt="Lasse Klüver — Somatic Breathwork & IFS-Coach"
                width={600}
                height={800}
                className="rounded-md object-cover"
              />
            </div>
          </FadeIn>

          {/* Rechte Spalte: Text und Qualifikationen */}
          <div>
            <FadeIn delay={0.1}>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-6 bg-umber" aria-hidden="true" />
                <span className="text-sm font-medium tracking-[0.15em] uppercase text-muted">
                  Der Guide
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary leading-[1.15] mb-6">
                Klarheit im Geist, Erdung im Körper.
              </h2>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-primary/80 text-lg leading-relaxed mb-4">
                Ich bin Lasse Klüver, Prozessbegleiter und Coach in Hamburg. Ich begegne dir auf Augenhöhe,
                mit einer klaren, strukturierten Haltung und tiefem Verständnis
                für die Mechanismen von Stress und innerer Erschöpfung. Meine
                Arbeit basiert auf der Überzeugung, dass echte Veränderung erst
                dann beginnt, wenn wir den Körper einbeziehen und dem
                Nervensystem erlauben, alte Alarmzustände loszulassen. 
                Meine Begleitung findet in Hamburg und online statt.
              </p>
              <p className="text-primary/80 text-lg leading-relaxed">
                Gemeinsam schaffen wir einen unaufgeregten, sicheren Raum, in
                dem analytische Klarheit und somatische Tiefe zusammenfließen.
                Hier musst du nichts beweisen. Du darfst ankommen, sortieren
                und Schritt für Schritt die Kontrolle über dein eigenes
                Wohlbefinden zurückgewinnen.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="border-t border-primary/10 mt-8 pt-8">
                <ul className="space-y-4">
                  {credentials.map((credential, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <span
                        className="mt-[0.6em] h-px w-4 shrink-0 bg-umber"
                        aria-hidden="true"
                      />
                      <span className="text-primary/90 text-base leading-relaxed">
                        {credential}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}