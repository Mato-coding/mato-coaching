import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";

export default function Cause() {
  return (
    <Section className="bg-surface">
      <Container
        width="default"
        className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-20"
      >

        {/* Linke Spalte: Eyebrow + Headline */}
        <div>
          <FadeIn>
            <Eyebrow label="Der Grund" />
          </FadeIn>
          <FadeIn delay={0.1}>
            {/*
              Bewusst kein Heading-Primitive: diese Headline ist größer
              (text-4xl md:text-5xl leading-[1.1]) als die Standard-H2-Kette,
              die die "section"-Variante abbildet. Eigenständige Größe erhalten,
              statt sie unbeabsichtigt zu verkleinern.
            */}
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-primary leading-display">
              Dein System macht keinen Fehler. Es schützt dich.
            </h2>
          </FadeIn>
        </div>

        {/* Rechte Spalte: Body-Text, vertikal zentriert */}
        <div className="flex items-center">
          <FadeIn delay={0.2}>
            <p className="text-primary/80 text-lg leading-relaxed">
              Chronische innere Unruhe, Anspannung, Anxiety oder Zustände akuter Überwältigung bis hin zu Panikattacken
              kommen nicht aus dem Nichts. Sie sind oft der laute Ausdruck
              von unterdrückter Trauer, alten Verletzungen oder noch nicht
              verarbeiteten Erfahrungen. Dein Nervensystem hat gelernt,
              permanent auf Alarm zu stehen. Erst wenn wir aufhören, diese
              Schutzmechanismen zu bekämpfen, und beginnen, sie zu verstehen,
              kann echte Regulation entstehen.
            </p>
          </FadeIn>
        </div>

      </Container>
    </Section>
  );
}
