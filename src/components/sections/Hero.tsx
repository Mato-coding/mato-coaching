import Link from "next/link";
import FadeIn from "../ui/FadeIn";

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center bg-background px-6 pt-20 pb-16">
      <div className="max-w-3xl mx-auto text-center">

        {/* Eyebrow mit Umber-Signature */}
        <FadeIn>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-6 bg-umber" aria-hidden="true" />
            <span className="text-sm font-medium tracking-[0.15em] uppercase text-muted">
              Somatic Breathwork &amp; Integration
            </span>
            <span className="h-px w-6 bg-umber" aria-hidden="true" />
          </div>
        </FadeIn>

        {/* Hauptaussage in Cormorant */}
        <FadeIn delay={0.1}>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-primary leading-[1.1] mb-8">
            Wenn ständige Anspannung deinen Alltag bestimmt.
          </h1>
        </FadeIn>

        {/* Subline */}
        <FadeIn delay={0.2}>
          <p className="text-xl md:text-2xl text-primary/70 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
            Ein unaufgeregter Raum, in dem dein Nervensystem zur Ruhe kommt.
            Finde aus dem Gedankenkarussell zurück in eine spürbare, körperliche Erdung.
          </p>
        </FadeIn>

        {/* CTAs */}
        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/termin"
              className="w-full sm:w-auto bg-accent text-background px-8 py-4 rounded-md text-lg font-medium hover:opacity-90 transition-opacity"
            >
              Erstgespräch vereinbaren
            </Link>
            <Link
              href="/assessment"
              className="w-full sm:w-auto border border-accent/25 text-accent px-8 py-4 rounded-md text-lg font-medium hover:border-accent/50 transition-colors"
            >
              Zum Kurz-Assessment
            </Link>
          </div>
          <p className="mt-5 text-sm text-muted">
            Das Assessment dauert ca. 3 Minuten.
          </p>
        </FadeIn>

      </div>
    </section>
  );
}