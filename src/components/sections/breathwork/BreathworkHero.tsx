import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import Eyebrow from "@/components/ui/Eyebrow";

export default function BreathworkHero() {
  return (
    <section className="bg-background px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <Eyebrow label="Somatic Breathwork · Hamburg und online" align="center" />
        </FadeIn>

        <FadeIn delay={0.1}>
          {/* Alternative H1: "Somatic Breathwork für ein ruhigeres Nervensystem" */}
          <h1 className="font-serif text-5xl md:text-6xl font-medium text-primary leading-[1.1] mb-8">
            Ruhe, die im Atem beginnt
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-xl text-primary/70 leading-relaxed mb-12 max-w-2xl mx-auto">
            Begleitete Atemsitzungen für Menschen, die nach außen funktionieren
            und innen keine Ruhe finden. Einzeln oder in der Gruppe, in Hamburg und
            online.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/termin"
              className="w-full sm:w-auto bg-accent text-background px-8 py-4 rounded-md font-medium hover:opacity-90 transition-opacity"
            >
              Erstgespräch vereinbaren
            </Link>
            <a
              href="#audio-reset"
              className="w-full sm:w-auto border border-accent/25 text-accent px-8 py-4 rounded-md font-medium hover:border-accent/50 transition-colors"
            >
              Audio-Reset kostenlos anhören
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
