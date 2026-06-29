import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import Eyebrow from "@/components/ui/Eyebrow";

export default function BreathworkClosingCTA() {
  return (
    <section className="bg-surface px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <FadeIn>
          <Eyebrow label="Nächster Schritt" align="center" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary leading-[1.15] mb-6">
            Ein ruhiges Gespräch zum Anfang
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-primary/80 text-lg leading-relaxed mb-10">
            Wir klären in Ruhe, was du brauchst und ob die Arbeit zu dir passt.
            Kostenfrei und unverbindlich.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <Link
            href="/termin"
            className="inline-block bg-accent text-background px-8 py-4 rounded-md font-medium hover:opacity-90 transition-opacity"
          >
            Erstgespräch vereinbaren
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
