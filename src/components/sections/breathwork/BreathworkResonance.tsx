import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";

export default function BreathworkResonance() {
  return (
    <Section className="bg-surface">
      <Container width="narrow">
        <FadeIn>
          <Eyebrow label="Worum es geht" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <Heading variant="section" className="mb-8">
            Wenn der Kopf nicht abschaltet
          </Heading>
        </FadeIn>

        <FadeIn delay={0.2}>
          {/*
            Bewusst kein Container-Primitive für diese Textspalte: Container
            zentriert (mx-auto) und würde die Spalte innerhalb des schon
            zentrierten "narrow"-Containers zusätzlich nach innen verschieben,
            statt wie bisher linksbündig auf gleicher Höhe mit der Headline zu
            bleiben. max-w-measure ist trotzdem dasselbe Token wie
            Container width="prose" (--container-measure), keine eigene
            Arbitrary-Value-Breite.
          */}
          <div className="space-y-5 max-w-measure">
            <p className="text-primary/80 text-lg leading-relaxed">
              Du bist nach außen leistungsfähig, verlässlich. Wirkst auf die meisten Menschen, als hättest du alles im Griff.
              Aber in dir läuft etwas immer weiter, das nicht zur Ruhe kommt. Anspannung, die immer da ist. Die sich über den Tag
              aufbaut. Erschöpfung, die dich trotzdem nicht in einen erholsamen Schlaf finden lässt. Immer die Sensoren an. Eine Wachsamkeit, die nie ganz nachlässt.
            </p>
            <p className="text-primary/80 text-lg leading-relaxed">
              Anxiety macht viele Menschen zu sehr guten &quot;Funktionierern&quot;. Aber das kommt nicht aus Überzeugung, aus Leidenschaft und Freude. Es ist ein Nervensystem, das gelernt
              hat, dauerhaft in Alarmbereitschaft zu bleiben. Und es laugt dich aus.
              Der Atem ist einer der wenigen direkten Zugänge zu diesem System, bewusst steuerbar und zugleich tief mit dem
              deinem Nervensystem verbunden.
            </p>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
