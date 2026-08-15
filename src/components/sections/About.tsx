import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import ListMark from "@/components/ui/ListMark";

const credentials = [
  "Zertifizierter Breathwork Instructor & Coach (Somatic Breathwork)",
  "Ausgebildet in der Arbeit mit inneren Anteilen (IFS-orientierte Prozessbegleitung)",
  "Langjährige Erfahrung in der Begleitung von Menschen in intensiven Lebensphasen",
];

// Bringt Section-Wrapper und FadeIns vollständig selbst mit: About wird
// sowohl auf der Startseite als auch (als Alias BreathworkAbout) auf
// /breathwork gerendert und muss auf beiden Seiten identisch aussehen.
export default function About() {
  return (
    <Section className="bg-surface">
      <Container
        width="default"
        className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-0"
      >

        {/* Header: mobil zuoberst, auf Desktop oben in der Textspalte */}
        <div className="lg:col-start-2 lg:row-start-1 lg:self-end">
          <FadeIn delay={0.1}>
            <Eyebrow label="Über mich" />
          </FadeIn>

          <FadeIn delay={0.2}>
            <Heading variant="section" className="lg:mb-6">
              Klarheit im Geist, Erdung im Körper.
            </Heading>
          </FadeIn>
        </div>

        {/* Porträtfoto — Unsplash-Platzhalter, gegen echtes Foto ersetzen */}
        <div className="lg:col-start-1 lg:row-start-1 lg:row-span-2">
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
        </div>

        {/* Fließtext und Qualifikationen */}
        <div className="lg:col-start-2 lg:row-start-2 lg:self-start">
          <FadeIn delay={0.3}>
            <p className="text-primary/80 text-lg leading-relaxed mb-4">
              Ich bin Lasse Klüver, dein Prozessbegleiter und Coach in Hamburg. Ich begegne dir auf Augenhöhe,
              mit einer klaren, strukturierten Haltung und tiefem Verständnis
              für die Mechanismen von Stress, Anxiety und innerer Erschöpfung.
            </p>

            <p className="text-primary/80 text-lg leading-relaxed mb-4">
              Meine Arbeit basiert auf der Überzeugung, dass echte Veränderung erst
              dann beginnt, wenn wir den Körper einbeziehen und dem
              Nervensystem erlauben, alte Alarmzustände loszulassen.
              Meine Begleitung findet in Hamburg und online statt.
            </p>

            <p className="text-primary/80 text-lg leading-relaxed">
              Gemeinsam schaffen wir einen unaufgeregten, sicheren Raum, in
              dem analytische Klarheit und somatische Tiefe zusammenfließen.
              Hier musst du nichts beweisen. Du darfst ankommen, sortieren
              und Schritt für Schritt die Kontrolle über dein eigenes
              Leben zurückgewinnen.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="border-t border-primary/10 mt-8 pt-8">
              <ul className="space-y-4">
                {credentials.map((credential, index) => (
                  <li key={index} className="flex items-start gap-4 text-base leading-relaxed">
                    <ListMark width="w-4" />
                    <span className="text-primary/90 text-base leading-relaxed">
                      {credential}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>

      </Container>
    </Section>
  );
}
