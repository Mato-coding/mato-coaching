import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";

export default function CoachingMethod() {
  return (
    <Section className="bg-surface">
      <Container width="narrow">
        <FadeIn>
          <Eyebrow label="Die Methode" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <Heading variant="section" className="mb-8">
            Über den Körper, nicht über den Kopf
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
              Somatic Breathwork gibt dir einen direkten Zugang zu deinem
              Nervensystem. Der Atem ist die einzige Funktion des autonomen
              Nervensystems, die du bewusst steuern kannst, und damit der
              wirksamste Hebel, um Anspannung zu regulieren statt sie zu
              managen.
            </p>
            <p className="text-primary/80 text-lg leading-relaxed">
              Die IFS-orientierte Prozessarbeit bringt Klarheit in das, was
              innen los ist: die Antreiber, die inneren Kritiker, die Anteile,
              die nie Pause machen. Nicht um sie wegzumachen, sondern um zu
              verstehen, wovor sie dich schützen wollen. Aus diesem Verstehen
              entsteht echte Ruhe, die bleibt.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-8">
            <Link
              href="/breathwork"
              className="text-accent underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              Wie Somatic Breathwork wirkt
            </Link>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
