import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";

export default function CoachingResonance() {
  return (
    <Section className="bg-surface">
      <Container width="narrow">
        <FadeIn>
          <Eyebrow label="Worum es geht" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <Heading variant="section" className="mb-8">
            Der Motor läuft auf Hochtouren, dein Tank ist leer
          </Heading>
        </FadeIn>

        <FadeIn delay={0.2}>
          {/*
            Bewusst kein Container-Primitive für diese Textspalte, siehe
            BreathworkResonance.tsx. max-w-measure = --container-measure
            (width="prose"), kein Arbitrary-Value.
          */}
          <div className="space-y-5 max-w-measure">
            <p className="text-primary/80 text-lg leading-relaxed">
              Nach außen funktioniert alles. Das Unternehmen läuft, der
              Kalender ist voll, die Verantwortung wächst. Innen sieht es
              anders aus: Die Anspannung geht nicht mehr weg, der Schlaf ist
              flach und unruhig, die Gedanken kreisen non-stop. Momente echter Ruhe sind selten
              geworden, echte Freude noch seltener. Manche kennen Anxiety, manche Panikattacken.
            </p>
            <p className="text-primary/80 text-lg leading-relaxed">
              Vielleicht kennst du das Gefühl, dein Leben nur noch zu verwalten statt
              es aktiv zu gestalten. Mehr Disziplin und noch ein
              Produktivitätssystem helfen nicht weiter. Alkohol, Medikamente und andere Ablenkungen schon lange nicht mehr.
              Das echte Problem sitzt in einem Nervensystem, das
              verlernt hat herunterzufahren. Und das schon seit langer Zeit. Die Anspannung ist chronisch geworden, die Erschöpfung tief.
            </p>
            <p className="text-primary/80 text-lg leading-relaxed">
              Genau dort setzt diese Begleitung an. Nicht mit noch mehr
              Strategien im Kopf, noch mehr Arbeiten, noch mehr Leisten. Sondern über den Körper.
              Über den Atem. Darüber, das Gefühl von echter Sicherheit und Ruhe zu spüren.
            </p>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
