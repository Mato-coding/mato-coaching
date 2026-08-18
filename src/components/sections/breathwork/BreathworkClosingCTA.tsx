import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";

export default function BreathworkClosingCTA() {
  return (
    <Section className="bg-surface">
      {/* Bewusst kein Container-Primitive: max-w-2xl (672px) trifft keine der
          drei Container-Breiten, siehe CTA.tsx */}
      <div className="mx-auto max-w-2xl text-center">
        <FadeIn>
          <Eyebrow label="Nächster Schritt" align="center" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <Heading variant="section" className="mb-6">
            Ein ruhiges Gespräch zum gemeinsamen Kennenlernen
          </Heading>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-primary/80 text-lg leading-relaxed mb-4">
            Wir klären in Ruhe, was du brauchst und ob die Arbeit zu dir passt.
            Kostenfrei und unverbindlich.
          </p>
        </FadeIn>

        <FadeIn delay={0.25}>
          <p className="text-muted text-sm leading-relaxed mb-10">
            Du willst diese Arbeit einzeln erleben? Einzelsessions von 75
            Minuten gibt es remote oder in Hamburg vor Ort. Auch dieser Weg
            beginnt mit einem kurzen Erstgespräch.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <Button href="/termin" className="inline-block">
            Erstgespräch vereinbaren
          </Button>
        </FadeIn>
      </div>
    </Section>
  );
}
