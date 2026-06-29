import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import Eyebrow from "@/components/ui/Eyebrow";

export default function BreathworkMethod() {
  return (
    <section className="bg-background px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <Eyebrow label="Die Methode" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary leading-[1.15] mb-8">
            Was Somatic Breathwork ist
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="space-y-5 max-w-[68ch]">
            <p className="text-primary/80 text-lg leading-relaxed">
              Somatic Breathwork nutzt eine bewusst geführte Atmung, um den
              Körper aus der Daueranspannung in einen regulierten Zustand zu begleiten.
              Statt über das Denken zu arbeiten, setzt die Methode am Körper an, dort, wo
              sich Stress tatsächlich hält.
            </p>
            <p className="text-primary/80 text-lg leading-relaxed">
              In einer Sitzung führt dich eine bestimmte Atemweise in einen
              Zustand, in dem Festgehaltenes spürbar und veränderbar wird. Viele Menschen
              beschreiben danach eine Klarheit und Weite, die sie aus dem Alltag nicht
              kennen.
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
      </div>
    </section>
  );
}
