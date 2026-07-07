import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center bg-background px-6 pt-20 pb-16">
      <div className="max-w-3xl mx-auto text-center">

        {/* Eyebrow mit Umber-Signature */}
        <div className="hero-item flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-6 bg-umber" aria-hidden="true" />
          <span className="text-sm font-medium tracking-[0.15em] uppercase text-muted">
            Somatic Breathwork &amp; Integration
          </span>
          <span className="h-px w-6 bg-umber" aria-hidden="true" />
        </div>

        {/* Hauptaussage in Cormorant */}
        <h1 className="hero-item hero-d1 font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-primary leading-[1.1] mb-8">
          Wenn dauerhafte Anspannung deinen Alltag bestimmt.
        </h1>

        {/* Subline */}
        <p className="hero-item hero-d2 text-xl md:text-2xl text-primary/70 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
          Ich zeige dir einen Weg, auf dem du zur Ruhe kommst.
          <br />
          Finde aus dem Gedankenkarussell zurück in eine spürbare körperliche und emotionale Erholung.
        </p>

        {/* CTAs */}
        <div className="hero-item hero-d3">
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
            Das Assessment dauert nur ca. 3 Minuten.
          </p>
        </div>

      </div>
    </section>
  );
}
