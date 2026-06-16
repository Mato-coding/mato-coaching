import Link from "next/link";
import FadeIn from "../ui/FadeIn";

export default function CTA() {
  return (
    <section className="bg-background px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">

        <FadeIn>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-6 bg-umber" aria-hidden="true" />
            <span className="text-sm font-medium tracking-[0.15em] uppercase text-muted">
              Der nächste Schritt
            </span>
            <span className="h-px w-6 bg-umber" aria-hidden="true" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary leading-[1.15] mb-6">
            Bereit für echte innere Arbeit?
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-primary/80 text-lg leading-relaxed mb-10">
            Diese Begleitung ist kein Quick-Fix. Sie erfordert Mut, Zeit und
            die Bereitschaft, sich den eigenen Emotionen zuzuwenden. Im
            kostenfreien Erstgespräch klären wir unverbindlich, wo du stehst
            und ob wir ein gutes Match für diesen Weg sind.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/termin"
              className="w-full sm:w-auto bg-accent text-background hover:opacity-90 rounded-md px-8 py-4 font-medium transition-opacity"
            >
              Erstgespräch vereinbaren
            </Link>
            <Link
              href="/assessment"
              className="w-full sm:w-auto border border-accent/25 text-accent hover:border-accent/50 rounded-md px-8 py-4 font-medium transition-colors"
            >
              Zum Kurz-Assessment
            </Link>
          </div>
          <p className="text-muted mt-5 text-sm">
            Das Assessment dauert ca. 3 Minuten.
          </p>
        </FadeIn>

      </div>
    </section>
  );
}