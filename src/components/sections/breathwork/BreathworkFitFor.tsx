import FadeIn from "@/components/ui/FadeIn";
import Eyebrow from "@/components/ui/Eyebrow";

export default function BreathworkFitFor() {
  return (
    <section className="bg-background px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <Eyebrow label="Passung" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary leading-[1.15] mb-8">
            Für wen diese Arbeit passt
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="space-y-5 max-w-[68ch]">
            <p className="text-primary/80 text-lg leading-relaxed">
              Diese Arbeit passt für dich, wenn du im Leben funktionierst und
              trotzdem spürst, dass etwas nicht zur Ruhe kommt. Wenn du bereit bist, dem
              Körper zuzuhören, statt nur über das Problem nachzudenken.
            </p>
            <p className="text-primary/80 text-lg leading-relaxed">
              Aus Sorgfalt arbeite ich nicht mit allem. Bei bestimmten gesundheitlichen
              Themen, etwa Herz-Kreislauf-Erkrankungen, Epilepsie, einer Schwangerschaft
              oder akuten psychischen Belastungen, brauchen wir vorab eine ärztliche
              Abklärung oder einen anderen Weg. Im Erstgespräch klären wir das ehrlich.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
