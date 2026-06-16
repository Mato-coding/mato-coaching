import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-surface px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-primary mb-6 text-3xl font-medium md:text-4xl">
          Bereit für echte innere Arbeit?
        </h2>
        
        <p className="text-primary/80 mb-10 text-lg">
          Diese 1:1 Prozessbegleitung ist kein Quick-Fix. Sie erfordert Mut, Zeit und die Bereitschaft, sich den eigenen Emotionen zuzuwenden. Im kostenfreien Erstgespräch klären wir unverbindlich, wo du stehst und ob wir ein gutes Match für diesen Weg sind.
        </p>

        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
          <Link
            href="/termin"
            className="bg-accent text-background hover:opacity-90 rounded-lg px-8 py-4 font-medium transition"
          >
            Erstgespräch vereinbaren
          </Link>
          <Link
            href="/assessment"
            className="border-primary/20 text-primary hover:bg-primary/5 rounded-lg border px-8 py-4 font-medium transition"
          >
            Zum Kurz-Assessment
          </Link>
        </div>
        <p className="text-primary/60 mt-4 text-sm">
          Das Assessment dauert ca. 3 Minuten.
        </p>
      </div>
    </section>
  );
}