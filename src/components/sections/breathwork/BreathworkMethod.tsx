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
              Körper auf einer tiefen, ursprünglichen Ebene wahrzunehmen und gezielt zu steuern.
              Statt über das Denken zu arbeiten, setzt die Methode am Körper an, dort, wo
              sich die Anspannung und Schwere wirklich hält.
            </p>
            <p className="text-primary/80 text-lg leading-relaxed">
              Die Sitzungen bestehen aus einer Kombination von Atemübungen, Körperwahrnehmung und sanften Bewegungen.
              Durch die gezielte Arbeit mit dem Atem wird das Nervensystem reguliert, aufgebaute Spannung und Anxiety abgebaut und die Selbstwahrnehmung gestärkt.
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
      </div>
    </section>
  );
}
