import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import Eyebrow from "@/components/ui/Eyebrow";

export default function BreathworkAbout() {
  return (
    <section className="bg-surface px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/portrait-lasse-sw.jpg"
                alt="Lasse Klüver, Somatic Breathwork Begleiter"
                width={600}
                height={800}
                className="rounded-md object-cover"
              />
            </div>
          </FadeIn>

          <div>
            <FadeIn delay={0.1}>
              <Eyebrow label="Begleitung" />
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary leading-[1.15] mb-6">
                Wer dich begleitet
              </h2>
            </FadeIn>

            {/* TODO Über-Lasse: Ausbildung, Erfahrung, eigener Weg zur Methode nachliefern */}
            <FadeIn delay={0.3}>
              <p className="text-primary/80 text-lg leading-relaxed">
                [Platzhalter: Lasse liefert Text zu Ausbildung, Erfahrung und dem eigenen Weg zur Methode nach.]
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
