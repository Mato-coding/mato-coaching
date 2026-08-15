import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import LeadMagnetCTA from "@/components/sections/LeadMagnetCTA";

// id="audio-reset" ist ein bestehendes Cross-Page-Anchor-Ziel (BreathworkHero
// verlinkt intern per href="#audio-reset" darauf). Zentrale Anchor-Konstanten
// kommen erst in Auftrag 3, die ID bleibt bis dahin ein wörtlicher String.
export default function BreathworkAudio() {
  return (
    <Section id="audio-reset" className="bg-background">
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
