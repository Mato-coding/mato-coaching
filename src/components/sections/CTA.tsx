import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <Section className="bg-background">
      {/*
        Bewusst kein Container-Primitive: diese Textspalte ist max-w-2xl
        (672px), keine der drei Container-Breiten (prose/narrow/default)
        trifft diesen Wert.
      */}
      <div className="mx-auto max-w-2xl text-center">

        <FadeIn>
          <Eyebrow label="Der nächste Schritt" align="center" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <Heading variant="section" className="mb-6">
            Bist du bereit für echte innere Arbeit?
          </Heading>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-primary/80 text-lg leading-relaxed mb-10">
            Diese Begleitung ist kein Quick-Fix. Sie erfordert Mut, Zeit und
            die Bereitschaft, sich den eigenen Emotionen zuzuwenden.
            Im kostenfreien Erstgespräch klären wir unverbindlich, wo du gerade stehst
            und ob wir ein gutes Match für deinen Weg sind.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/termin" className="w-full sm:w-auto">
              Erstgespräch vereinbaren
            </Button>
            <Button href="/assessment" variant="secondary" className="w-full sm:w-auto">
              Zum Kurz-Assessment
            </Button>
          </div>
          <p className="text-muted mt-5 text-sm">
            Das Assessment dauert nur ca. 3 Minuten.
          </p>
        </FadeIn>

      </div>
    </Section>
  );
}
