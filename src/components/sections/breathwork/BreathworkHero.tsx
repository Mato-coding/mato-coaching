import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import AnchorScrollLink from "@/components/ui/AnchorScrollLink";
import { AUDIO_RESET_ANCHOR } from "@/lib/anchors";

export default function BreathworkHero() {
  return (
    <Section className="bg-background">
      <Container width="narrow" className="text-center">
        <FadeIn>
          <Eyebrow label="Somatic Breathwork · Hamburg und online" align="center" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <Heading variant="display-sub" className="mb-8">
            Echte Ruhe, die du im Körper spürst
          </Heading>
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
            <AnchorScrollLink
              anchorId={AUDIO_RESET_ANCHOR}
              className="w-full sm:w-auto text-lg"
            >
              Kostenloses Audio sichern
            </AnchorScrollLink>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
