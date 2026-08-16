import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import Card from "@/components/ui/Card";

export default function Method() {
  return (
    <Section className="bg-background">
      <Container
        width="default"
        className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24"
      >

        {/* Linke Spalte: Eyebrow, Headline & Body */}
        <div>
          <FadeIn>
            <Eyebrow label="Die Methode" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <Heading variant="section" className="mb-6">
              Ein sicheres Basislager für deine innere Neuausrichtung.
            </Heading>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-primary/80 text-lg leading-relaxed">
              Ich begleite dich nicht als klassischer Berater, der dir
              Ratschläge diktiert. Ich halte den Raum als präsenter, sicherer
              Guide. Wir nutzen die präzise, sanfte Arbeit des Internal Family
              Systems (IFS), um innere Anteile zu verstehen, und Somatic
              Breathwork, um dein Nervensystem körperlich aus dem
              Überlebensmodus zu holen. Hier kommst du an, ordnest die
              Navigation neu und stichst anschließend gestärkt und
              selbstwirksam wieder ins Leben.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Link
              href="/breathwork"
              className="mt-8 inline-block font-sans font-medium text-accent underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
            >
              Wie Somatic Breathwork wirkt
            </Link>
          </FadeIn>
        </div>

        {/* Rechte Spalte: Testimonial Card */}
        <FadeIn delay={0.15}>
          <Card padding="large">
            {/* Zitat in Cormorant-Kursive als Signature-Element */}
            <p className="font-serif italic text-primary/90 text-lg leading-relaxed mb-8">
              „Es hat sich angefühlt, als würde eine Käseglocke von mir
              genommen werden und ich konnte die Welt das erste Mal wieder richtig spüren.
              Ich habe eine innere Ruhe und einen tiefen Schlaf
              gefunden, den ich seit Jahren nicht mehr kannte.&quot;
            </p>
            <div className="flex items-center gap-3">
              <span className="h-px w-4 bg-umber shrink-0" aria-hidden="true" />
              <p className="text-muted text-sm">
                Kim, IFS-Klientin, 1:1 Prozessbegleitung
              </p>
            </div>
          </Card>
        </FadeIn>

      </Container>
    </Section>
  );
}
