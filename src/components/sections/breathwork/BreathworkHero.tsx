import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";

export default function BreathworkHero() {
  return (
    <Section className="bg-background">
      <Container width="narrow" className="text-center">
        <FadeIn>
          <Eyebrow label="Somatic Breathwork · Hamburg und online" align="center" />
        </FadeIn>

        <FadeIn delay={0.1}>
          {/*
            Bewusst kein Heading-Primitive: dieses H1 (text-5xl md:text-6xl,
            ohne lg-Stufe) ist kleiner als die "display"-Variante (die bei lg
            auf 72px weiterwächst) und damit ein eigener, von Heading.tsx
            abweichender Größenverlauf. Unverändert übernommen, keine
            Größenänderung.
          */}
          <h1 className="font-serif text-5xl md:text-6xl font-medium text-primary leading-display mb-8">
            Echte Ruhe, die du im Körper spürst
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          {/* max-w-2xl trifft keine der drei Container-Breiten, siehe CTA.tsx */}
          <p className="text-xl text-primary/70 leading-relaxed mb-12 max-w-2xl mx-auto">
            Begleitete Atemsitzungen für Menschen, die nach außen funktionieren
            und innen keine Ruhe finden können.
            <br />
            Einzeln oder in der Gruppe, in Hamburg und online.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button href="/termin" className="w-full sm:w-auto text-lg">
              Erstgespräch vereinbaren
            </Button>
            <Button href="#audio-reset" variant="secondary" className="w-full sm:w-auto text-lg">
              Kostenloses Audio sichern
            </Button>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
