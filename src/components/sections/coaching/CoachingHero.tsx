import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import AnchorScrollLink from "@/components/ui/AnchorScrollLink";
import { PROGRAMM_ANCHOR } from "@/lib/anchors";

export default function CoachingHero() {
  return (
    <Section className="bg-background">
      <Container width="narrow" className="text-center">
        <FadeIn>
          <Eyebrow label="1:1 Begleitung" align="center" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <Heading variant="display-sub" className="mb-8">
            Vom Funktionieren zurück ins Leben
          </Heading>
        </FadeIn>

        <FadeIn delay={0.2}>
          {/* max-w-2xl trifft keine der drei Container-Breiten, siehe CTA.tsx */}
          <p className="text-xl text-primary/70 leading-relaxed mb-12 max-w-2xl mx-auto">
            Zehn Wochen intensive Einzelbegleitung für Menschen, die viel
            tragen. Damit dein Nervensystem wieder lernt zu regulieren, dein Schlaf
            sich erholt und du dein Leben wieder aktiv gestaltest, statt nur zu reagieren und es zu
            verwalten. Ich arbeite mit dir über das IFS Coaching an den echten Ursachen und tiefgehend somatisch, über den Körper und Atem. Remote oder in
            Hamburg.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button href="/termin" className="w-full sm:w-auto">
              Erstgespräch vereinbaren
            </Button>
            <AnchorScrollLink
              anchorId={PROGRAMM_ANCHOR}
              className="w-full sm:w-auto"
            >
              So ist das Programm aufgebaut
            </AnchorScrollLink>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
