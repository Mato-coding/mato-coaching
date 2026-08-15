import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";

export default function BreathworkMethod() {
  return (
    <Section className="bg-background">
      <Container width="narrow">
        <FadeIn>
          <Eyebrow label="Die Methode" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <Heading variant="section" className="mb-8">
            Was Somatic Breathwork ist
          </Heading>
        </FadeIn>

        <FadeIn delay={0.2}>
          {/*
            Bewusst kein Container-Primitive für diese Textspalte, siehe
            BreathworkResonance.tsx. max-w-measure = --container-measure
            (width="prose"), kein Arbitrary-Value.
          */}
          <div className="space-y-5 max-w-measure">
            <p className="text-primary/80 text-lg leading-relaxed">
              Somatic Breathwork nutzt eine bewusst geführte Atmung, um den
              Körper auf einer tiefen, ursprünglichen Ebene wahrzunehmen und gezielt zu steuern.
              Statt über das Denken zu arbeiten, setzt die Methode am Körper an, dort, wo
              sich die Anspannung und Schwere wirklich hält.
            </p>
            <p className="text-primary/80 text-lg leading-relaxed">
              Die Sitzungen bestehen aus einer Kombination von Atemübungen, Körperwahrnehmung und sanften Bewegungen.
              Durch die gezielte Arbeit mit dem Atem wird das Nervensystem reguliert, aufgebaute Spannung abgebaut und die Selbstwahrnehmung gestärkt.
            </p>
             <p className="text-primary/80 text-lg leading-relaxed">
              Mit Somatic Breathwork lernst du eine Methode, die dich deinen Körper wieder wirklich spüren lässt.
              Der Körper weiß mehr als dein Kopf und zeigt dir viel früher, wenn etwas nicht stimmt. Er spricht mit dir. Erst auf subtile und dann auf immer lautere Weise. Bis du endlich zuhörst!
              Mit meiner Methode lernst du, wieder die leisen, sanften Signale zu hören, bevor sie laut und unangenehm werden.
            </p>
            <p className="text-primary/80 text-lg leading-relaxed">
              Ich nutze in meiner Arbeit die wirkungsvollsten Techniken aus Breathe to Heal von Max Strom, Buteyko, Yoga, Chi-Gong und Tai Chi.
              Durch die Somatische Atemarbeit führe ich dich in einen Zustand, in dem körperlich Festgehaltenes spürbar und veränderbar wird. Viele Menschen
              beschreiben danach eine Klarheit und Weite, die sie aus dem Alltag nicht kennen. Und vor allem eine tiefe Ruhe, in der sie wirklich erholen und Kraft tanken können.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-8">
            <Link
              href="/journal/was-ist-somatic-breathwork"
              className="text-accent underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              Mehr über die Methode im Journal
            </Link>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
