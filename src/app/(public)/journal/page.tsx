import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import Card from "@/components/ui/Card";
import { getAllJournalEntries } from "@/lib/journal";
import { buildMetadata } from "@/lib/site";

export const metadata = buildMetadata({
  path: "/journal",
  title: "Journal",
  description:
    "Hintergründe, Impulse und Antworten auf häufige Fragen rund um Nervensystem, Somatic Breathwork und innere Anteile.",
});

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
    <Section className="bg-background">
      {/*
        Bewusst kein Container-Primitive: dieser äußere Rahmen ist max-w-4xl
        (896px), keine der drei Container-Breiten (prose/narrow/default)
        trifft diesen Wert, siehe CTA.tsx' analoge max-w-2xl-Ausnahme.
      */}
      <div className="mx-auto max-w-4xl w-full">
        <FadeIn>
          <div className="text-center mb-16">
            <Eyebrow label="Journal" align="center" />
            <Heading variant="section" as="h1" className="mb-4">
              Hintergründe und Impulse
            </Heading>
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
                <Link href={`/journal/${entry.slug}`} className="block h-full">
                  <Card className="flex h-full flex-col transition hover:border-accent/30">
                    <span className="text-sm text-muted mb-3">
                      {formatDate(entry.publishedAt)}
                    </span>
                    <h2 className="font-serif text-xl text-primary mb-2">
                      {entry.title}
                    </h2>
                    <p className="text-muted leading-relaxed">
                      {entry.description}
                    </p>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
