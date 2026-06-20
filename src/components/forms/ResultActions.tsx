"use client";

import { useState } from "react";
import Link from "next/link";
import LeadMagnetForm from "@/components/forms/LeadMagnetForm";

const JOURNAL_READY = true;
const JOURNAL_URL = "/journal";

type ResultActionsProps = {
  ctaHref: string;
  ctaLabel: string;
  cluster: string;
  result: string;
};

export default function ResultActions({
  ctaHref,
  ctaLabel,
  cluster,
  result,
}: ResultActionsProps) {
  const [showAudio, setShowAudio] = useState(false);

  const ctaHrefWithContext =
    ctaHref === "/termin"
      ? `/termin?cluster=${encodeURIComponent(cluster)}&result=${encodeURIComponent(result)}`
      : ctaHref;

  return (
    <div className="mt-10 text-left pb-16 md:pb-24">
      {/* Brücke vom Ergebnistext zu den Optionen */}
      <p className="text-primary/80 text-lg leading-relaxed mb-8">
        Von hier aus hast du drei Möglichkeiten, weiterzugehen.
      </p>

      {/* Breiteres Band: ragt auf dem Desktop über die Textbreite hinaus */}
      <div className="md:relative md:left-1/2 md:w-[90vw] md:max-w-5xl md:-translate-x-1/2">
        <div className="grid gap-6 md:grid-cols-3 items-stretch">
          {/* Option 1: Erstgespräch (dynamischer CTA aus dem Ergebnis) */}
          <div className="flex h-full flex-col rounded-md border border-primary/10 bg-surface p-6">
            <h3 className="font-serif text-xl text-primary">
              Erstgespräch vereinbaren
            </h3>
            <p className="mt-2 text-muted">
              Im kostenfreien Gespräch klären wir unverbindlich, wo du stehst und
              ob wir ein gutes Match für diesen Weg sind.
            </p>
            <div className="mt-auto pt-6 flex justify-center">
              <Link
                href={ctaHrefWithContext}
                className="mx-auto w-full max-w-62 text-center rounded-md bg-accent px-6 py-3 text-background transition hover:opacity-90"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>

          {/* Option 2: Audio (Lead-Magnet) */}
          <div className="flex h-full flex-col rounded-md border border-primary/10 bg-surface p-6">
            <h3 className="font-serif text-xl text-primary">
              Zum Kennenlernen: erstes Audio kostenlos
            </h3>
            <p className="mt-2 text-muted">
              Ein geführtes Breathwork-Audio, das dir in wenigen Minuten hilft,
              dein Nervensystem zu beruhigen. Du bekommst es direkt per E-Mail.
            </p>
            <div className="mt-auto pt-6 flex justify-center">
              <button
                onClick={() => setShowAudio(true)}
                className="mx-auto w-full max-w-62 text-center rounded-md border border-accent/25 px-6 py-3 text-accent transition hover:border-accent/50"
              >
                Audio kostenlos erhalten
              </button>
            </div>
          </div>

          {/* Option 3: Journal */}
          <div className="flex h-full flex-col rounded-md border border-primary/10 bg-surface p-6">
            <h3 className="font-serif text-xl text-primary">
              Mehr über die Arbeit mit Breathwork und IFS erfahren
            </h3>
            <p className="mt-2 text-muted">
              Hintergründe, Impulse und Antworten auf häufige Fragen rund um
              Nervensystem, Somatic Breathwork und innere Anteile.
            </p>
            <div className="mt-auto pt-6 flex justify-center">
              {JOURNAL_READY ? (
                <Link
                  href={JOURNAL_URL}
                  className="mx-auto w-full max-w-62 text-center rounded-md border border-accent/25 px-6 py-3 text-accent transition hover:border-accent/50"
                >
                  Zum Journal
                </Link>
              ) : (
                <span className="mx-auto w-full max-w-62 text-center rounded-md border border-primary/10 px-6 py-3 text-muted">
                  Bald verfügbar
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Audio-Formular: klappt unterhalb der Karten auf */}
        {showAudio && (
          <div className="mt-8 mx-auto max-w-md">
            <p className="mb-4 text-center text-muted">
              Trag dich ein, dann kommt dein Audio direkt per E-Mail.
            </p>
            <LeadMagnetForm
              autoFocus
              source="assessment"
              assessmentCluster={cluster}
              assessmentResult={result}
            />
          </div>
        )}
      </div>
    </div>
  );
}