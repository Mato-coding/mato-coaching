import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";

// Eigene Komponente statt About.tsx-Alias (wie /breathwork es tut): der Text
// hier ist speziell auf das 1:1-Programm und die Gründungsrunde zugeschnitten
// und weicht von About.tsx' Startseiten-Text ab, siehe CLAUDE.md.
export default function CoachingAbout() {
  return (
    <Section className="bg-background">
      <Container
        width="default"
        className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-0"
      >

        {/* Header: mobil zuoberst, auf Desktop oben in der Textspalte */}
        <div className="lg:col-start-2 lg:row-start-1 lg:self-end">
          <FadeIn delay={0.1}>
            <Eyebrow label="Über mich" />
          </FadeIn>

          <FadeIn delay={0.2}>
            <Heading variant="section" className="lg:mb-8">
              Wer dich begleitet
            </Heading>
          </FadeIn>
        </div>

        {/* Porträt */}
        <div className="lg:col-start-1 lg:row-start-1 lg:row-span-2">
          <FadeIn>
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/portrait-lasse-sw.jpg"
                alt="Lasse Klüver — Somatic Breathwork & IFS-Coach"
                width={600}
                height={800}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="rounded-md object-cover"
              />
            </div>
          </FadeIn>
        </div>

        {/* Fließtext */}
        <div className="lg:col-start-2 lg:row-start-2 lg:self-start">
          <FadeIn delay={0.3}>
            <div className="space-y-5">
              <p className="text-primary/80 text-lg leading-relaxed">
                Ich bin Lasse Klüver, zertifizierter Breathe to Heal Facilitator
                nach Max Strom und zertifizierter IFS-informed Coach, ausgebildet
                bei Coaches Rising, nach ICF anerkannt. Zu meinen Lehrern dort
                zählten Richard Schwartz, der Begründer des IFS-Modells, sowie
                Loch Kelly, Amanda Blake und Marcella Cox.
              </p>
              <p className="text-primary/80 text-lg leading-relaxed">
                Seit drei Jahren arbeite ich mit Menschen in
                Breathwork-Sessions, Workshops und Retreats in Deutschland, auf
                Mallorca und Ibiza. Einzelbegleitung war Teil meiner
                IFS-Ausbildung und begleitet mich seitdem in meinen Sessions, Retreats und im
                persönlichen Umfeld. Dieses Programm in dieser Form biete ich
                zum ersten Mal an. Deshalb starte ich mit einer Gründungsrunde
                von vier Plätzen.
              </p>
              <p className="text-primary/80 text-lg leading-relaxed">
                Davor: Fünfzehn Jahre Verantwortung in Konzernen und Start-ups,
                sechs Jahre Selbstständigkeit. Ich kenne die Welt, aus der du
                kommst, aus eigener Erfahrung. Und ich kenne den Punkt, an dem immer weiter
                Funktionieren nicht mehr trägt.
              </p>
            </div>
          </FadeIn>
        </div>

      </Container>
    </Section>
  );
}
