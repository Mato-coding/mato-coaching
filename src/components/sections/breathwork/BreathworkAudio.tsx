import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import LeadMagnetCTA from "@/components/sections/LeadMagnetCTA";
import { AUDIO_RESET_ANCHOR } from "@/lib/anchors";

// AUDIO_RESET_ANCHOR ist ein bestehendes Inpage-Anchor-Ziel (BreathworkHero
// verlinkt intern per href darauf).
export default function BreathworkAudio() {
  return (
    <Section id={AUDIO_RESET_ANCHOR} className="bg-background">
      <Container width="narrow">
        <FadeIn>
          <Eyebrow label="Kostenloses Audio" />
          <Heading variant="section">
            Ein erster Schritt zurück zur Ruhe
          </Heading>
          <LeadMagnetCTA source="breathwork" />
        </FadeIn>
      </Container>
    </Section>
  );
}
