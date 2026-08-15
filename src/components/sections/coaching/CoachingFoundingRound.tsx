import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";

export default function CoachingFoundingRound() {
  return (
    <Section className="bg-surface">
      <Container width="narrow">
        <FadeIn>
          <Eyebrow label="Gründungsrunde" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <Heading variant="section" className="mb-8">
            Vier Plätze, offene Konditionen
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
              Die Begleitung liegt regulär bei 3.900 €. In der
              Gründungsrunde liegt sie bei 2.900 €. Der Unterschied ist
              kein Rabatt, sondern ein Tausch: Ich bitte dich um ausführliches
              Feedback und die Erlaubnis, mit deinem Ergebnis zu arbeiten,
              anonymisiert oder maximal mit Vornamen.
            </p>
            <p className="text-primary/80 text-lg leading-relaxed">
              Einmalzahlung oder zwei Raten. Der Start ist flexibel, du
              beginnst, wenn ein Platz frei ist und der Zeitpunkt für dich
              stimmt.
            </p>
            <p className="text-primary/80 text-lg leading-relaxed">
              Nur vier Plätze deshalb, weil diese Arbeit Tiefe und volle Präsenz braucht und ich
              sie mit voller
              Aufmerksamkeit begleiten will.
            </p>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
