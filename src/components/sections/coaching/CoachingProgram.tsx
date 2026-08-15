import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import StepList from "@/components/ui/StepList";
import { PROGRAMM_ANCHOR } from "@/lib/anchors";

const bausteine = [
  {
    title: "Wöchentliche 1:1 Session.",
    text: "75 Minuten intensive Arbeit an dem, was zu deiner Anspannung und Erschöpfung führt, körperlich und in der Tiefe, individuell aufeinander aufbauend über zehn Wochen.",
  },
  {
    title: "Tägliche Praxis.",
    text: "Du bekommst umfangreiches und qualifiziertes Material für deine persönliche Praxis in der Zeit zwischen den Sessions, damit dein Nervensystem Regulation nicht nur vereinzelt erlebt, sondern als täglichen Normalzustand verinnerlicht.",
  },
  {
    title: "Klarer Rahmen.",
    text: "Fester Wochenrhythmus, definierter Zeitraum, ein Ansprechpartner. Struktur, die hält, statt zusätzlicher Komplexität.",
  },
];

export default function CoachingProgram() {
  return (
    <Section id={PROGRAMM_ANCHOR} className="bg-background">
      <Container width="narrow">
        <FadeIn>
          <Eyebrow label="Das Programm" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <Heading variant="section" className="mb-8">
            Zehn Wochen, ein klarer Rahmen
          </Heading>
        </FadeIn>

        <FadeIn delay={0.2}>
          {/*
            Bewusst kein Container-Primitive für diese Textspalte, siehe
            BreathworkResonance.tsx. max-w-measure = --container-measure
            (width="prose"), kein Arbitrary-Value.
          */}
          <p className="text-primary/80 text-lg leading-relaxed max-w-measure mb-10">
            Wir arbeiten zehn Wochen lang eng zusammen. Jede Woche eine
            persönliche Session von etwa 75 Minuten, remote oder in Hamburg. Dazwischen trägt
            dich eine tägliche Praxis mit Audio- und Video-Material, das ich für dich
            vorbereitet habe. Kurz genug für volle Kalender, wirksam durch
            Wiederholung.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <StepList items={bausteine} className="max-w-measure" />
        </FadeIn>
      </Container>
    </Section>
  );
}
