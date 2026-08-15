import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";

export default function BreathworkFitFor() {
  return (
    <Section className="bg-background">
      <Container width="narrow">
        <FadeIn>
          <Eyebrow label="Passung" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <Heading variant="section" className="mb-8">
            Für wen diese Arbeit passt
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
              Diese Arbeit passt für dich, wenn du zwar im Leben weitestgehend funktionierst und
              trotzdem spürst, dass etwas in dir nicht zur Ruhe kommt. Vielleicht kennst du schon dieses Gefühl, dass sich etwas in deinem Körper meldet, wenn du mental und emotional am Anschlag bist.
              Wenn du funktionierende Hilfe suchst, die sich gut mit deinem normalen Alltag verbinden lässt, und nicht nur auf einem abgeschiedenen Retreat weit weg von zu Hause funktioniert.
            </p>
            <p className="text-primary/80 text-lg leading-relaxed">
              Diese Arbeit passt für dich, wenn du spürst, dass du selbst etwas tun musst, weil es nicht von alleine passieren wird. Und schon gar nicht, in dem du weiter so machst, wie bisher.
              Wenn du bereit bist zu lernen, deinem Körper zuzuhören, statt nur über das Problem nachzudenken.
            </p>
            <p className="text-primary/80 text-lg leading-relaxed">
              Noch ein Wort zur Zusammenarbeit von meiner Seite. Aus Sorgfalt arbeite ich nicht mit allen medizinischen Themen und Vorbedingungen. Wenn du unsicher bist, klären wir das ehrlich im Erstgespräch. Ich möchte, dass du dich bei mir sicher aufgehoben fühlst und die beste Heilung bekommst, die du brauchst.
            </p>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
