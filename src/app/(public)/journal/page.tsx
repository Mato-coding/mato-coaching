import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import { getAllJournalEntries } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Hintergründe, Impulse und Antworten auf häufige Fragen rund um Nervensystem, Somatic Breathwork und innere Anteile.",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function JournalPage() {
  const entries = getAllJournalEntries();

  return (
    <section className="bg-background py-16 md:py-24 px-6">
      <div className="mx-auto max-w-4xl w-full">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-6 bg-umber" aria-hidden="true" />
              <span className="text-sm font-medium tracking-[0.15em] uppercase text-muted">
                Journal
              </span>
              <span className="h-px w-6 bg-umber" aria-hidden="true" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-primary leading-[1.15] mb-4">
              Hintergründe und Impulse
            </h1>
            <p className="text-lg text-primary/80 max-w-2xl mx-auto leading-relaxed">
              Wie Nervensystem-Regulation, Somatic Breathwork und innere
              Anteile zusammenhängen, erklärt statt verkürzt.
            </p>
          </div>
        </FadeIn>

        {entries.length === 0 ? (
          <FadeIn delay={0.1}>
            <p className="text-center text-muted">
              Die ersten Artikel erscheinen in Kürze.
            </p>
          </FadeIn>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {entries.map((entry, i) => (
              <FadeIn key={entry.slug} delay={i * 0.1}>
                <Link
                  href={`/journal/${entry.slug}`}
                  className="flex h-full flex-col rounded-md border border-primary/10 bg-surface p-6 transition hover:border-accent/30"
                >
                  <span className="text-sm text-muted mb-3">
                    {formatDate(entry.publishedAt)}
                  </span>
                  <h2 className="font-serif text-xl text-primary mb-2">
                    {entry.title}
                  </h2>
                  <p className="text-muted leading-relaxed">
                    {entry.description}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
