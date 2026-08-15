import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import LeadMagnetCTA from "@/components/sections/LeadMagnetCTA";

export default function LeadMagnet() {
  return (
    <Section id="audio" className="bg-background">
      <Container width="narrow">
        <FadeIn>
          <Eyebrow label="Kostenloses Audio" />

          <Heading variant="section">
            Ein erster Schritt zurück zur Ruhe
          </Heading>

          <LeadMagnetCTA />
        </FadeIn>
      </Container>
    </Section>
  );
}
