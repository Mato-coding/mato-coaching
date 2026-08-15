import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";

const steps = [
  {
    title: "Ankommen.",
    body: "Wir klären zu Beginn, wie es dir gerade geht und worauf wir heute achten. Du kommst einfach genau so, wie du gerade bist. Du brauchst nichts zu können, wissen oder vorzubereiten.",
  },
  {
    title: "Atmen.",
    body: "Über etwa 60-90 Minuten führe ich dich durch die Atemarbeit. Ich halte den Raum für deinen Prozess und bleibe die ganze Zeit an deiner Seite. Du kannst ganz loslassen und dich tragen lassen. Es gibt für dich nichts zu tun und nichts zu leisten.",
  },
  {
    title: "Nachklang.",
    body: "Am Ende kommst du in Stille an und wir geben dem Erlebten Raum. Was sich zeigen möchte, darf sich zeige. Wir ordnen es gemeinsam liebevoll ein.",
  },
];

export default function BreathworkProcess() {
  return (
    <Section className="bg-surface">
      <Container width="narrow">
        <FadeIn>
          <Eyebrow label="Ablauf" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <Heading variant="section" className="mb-10">
            Wie eine Sitzung abläuft
          </Heading>
        </FadeIn>

        <FadeIn delay={0.2}>
          {/*
            Bewusst kein Container-Primitive für diese Textspalte, siehe
            BreathworkResonance.tsx. max-w-measure = --container-measure
            (width="prose"), kein Arbitrary-Value.
          */}
          <ol className="space-y-8 max-w-measure">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-6">
                <span
                  className="mt-[0.65em] h-px w-6 shrink-0 bg-umber"
                  aria-hidden="true"
                />
                <p className="text-primary/80 text-lg leading-relaxed">
                  <strong className="font-medium text-primary">{step.title}</strong>{" "}
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="mt-10 text-primary/60 text-base leading-relaxed max-w-measure">
            In Einzelsessions arbeiten wir ganz in deinem Tempo und so, wie es für dich individuell am besten ist. In der Gruppe trägt
            zusätzlich die gemeinsame Erfahrung.
          </p>
        </FadeIn>
      </Container>
    </Section>
  );
}
