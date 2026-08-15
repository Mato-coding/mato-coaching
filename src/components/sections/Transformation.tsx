import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import ListMark from "@/components/ui/ListMark";

const benefits = [
  "Wieder tief schlafen und morgens erholt aufwachen.",
  "Körperliche und mentale Erschöpfung durch echte Regeneration ersetzen.",
  "Den engen Tunnelblick verlassen und wieder Weite und echte Verbindung spüren.",
];

export default function Transformation() {
  return (
    <Section className="bg-background">
      <Container width="narrow">

        <FadeIn>
          <Eyebrow label="Das Ziel" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <Heading variant="section" className="mb-6">
            Zurück in ein Leben, das von Klarheit statt von dauerhaftem Alarmzustand geführt wird.
          </Heading>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-primary/80 text-lg leading-relaxed mb-10">
            Symptomlinderung kratzt nur an der Oberfläche. Das Ziel unserer
            Arbeit ist nicht, dich wieder „funktionstüchtig" für den Stress zu
            machen. Es geht darum, dein Nervensystem nachhaltig zu entlasten —
            damit du aus dem Überlebensmodus herausfindest und wieder wirklich
            präsent sein kannst.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <ul className="space-y-5">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-4 text-lg leading-relaxed">
                {/* Umber-Strich statt Check-Icon: ruhiger, weniger generisch */}
                <ListMark width="w-4" />
                <span className="text-primary/90 text-lg leading-relaxed">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </FadeIn>

      </Container>
    </Section>
  );
}
