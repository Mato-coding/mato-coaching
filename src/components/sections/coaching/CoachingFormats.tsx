import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import Card from "@/components/ui/Card";

export default function CoachingFormats() {
  return (
    <Section size="default" className="bg-background">
      <Container width="narrow">
        <FadeIn>
          <Eyebrow label="Weitere Formate" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <Heading variant="section" className="mb-8">
            Weitere Wege, mit mir zu arbeiten
          </Heading>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-primary/80 text-lg leading-relaxed max-w-measure mb-10">
            Nicht jeder Weg beginnt mit zehn Wochen. Zwei Formate für einen
            kleineren ersten Schritt.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="space-y-4 max-w-measure">
            <Card>
              <h3 className="font-serif text-xl text-primary">
                Einzelsession
              </h3>
              <p className="mt-1 text-sm text-muted">75 Minuten, 220 Euro</p>
              <p className="mt-3 text-primary/80 text-lg leading-relaxed">
                Somatic Breathwork und Nervensystem-Regulation, remote oder in
                Hamburg vor Ort. Ein Thema, eine Session. Ein guter Weg, meine
                Arbeit kennenzulernen.
              </p>
            </Card>

            <Card>
              <h3 className="font-serif text-xl text-primary">
                Kompaktbegleitung
              </h3>
              <p className="mt-1 text-sm text-muted">
                6 Sessions über etwa 8 Wochen, 1.650 Euro
              </p>
              <p className="mt-3 text-primary/80 text-lg leading-relaxed">
                Sechs Sessions von 75 Minuten, dazu Übungen und Audios für
                deine tägliche Praxis. Du lernst, dein Nervensystem zu
                regulieren, und beginnst die Arbeit mit den Anteilen, die dich
                antreiben und schützen.
              </p>
            </Card>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="space-y-5 max-w-measure mt-10">
            <p className="text-primary/80 text-lg leading-relaxed">
              Die Kompaktbegleitung, wenn du lernen willst, dein System zu
              regulieren und mit den Anteilen vertraut zu werden, die es
              antreiben. Das Hauptprogramm, wenn du spürst, dass darunter mehr
              liegt. Alte Verletzungen, Muster und Glaubenssätze, die unter
              der Oberfläche an dir nagen und dir Energie und Lebensfreude
              rauben.
            </p>
            <p className="text-primary/80 text-lg leading-relaxed">
              Und falls du klein anfängst und dann weitergehen willst: Was du
              für eine Einzelsession oder die Kompaktbegleitung gezahlt hast,
              rechne ich auf die 10-Wochen-Begleitung an.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <p className="text-primary/80 text-lg leading-relaxed max-w-measure mt-8">
            Der Weg in beide Formate beginnt mit einem kostenfreien
            Erstgespräch.{" "}
            <Link
              href="/termin"
              className="text-accent underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              Erstgespräch vereinbaren
            </Link>
          </p>
        </FadeIn>
      </Container>
    </Section>
  );
}
