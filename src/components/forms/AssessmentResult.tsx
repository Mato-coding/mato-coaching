"use client";

import { useEffect, useRef } from "react";
import ResultActions from "@/components/forms/ResultActions";
import FadeIn from "@/components/ui/FadeIn";
import type { Cluster, ResultRoute } from "@/lib/assessment-config";
import { scrollElementToTop } from "@/lib/scroll";

interface AssessmentResultProps {
  headline: string;
  paragraphs: string[];
  cluster: Cluster;
  route: ResultRoute;
  onRestart: () => void;
}

export default function AssessmentResult({
  headline,
  paragraphs,
  cluster,
  route,
  onRestart,
}: AssessmentResultProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  // Beim Erscheinen des Ergebnisses sanft an den Anfang scrollen, damit
  // Eyebrow und Headline oben im Viewport stehen.
  useEffect(() => {
    if (rootRef.current) scrollElementToTop(rootRef.current);
  }, []);

  return (
    <div ref={rootRef} className="text-primary">
      <FadeIn>
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-6 bg-umber" aria-hidden="true" />
          <span className="text-sm font-medium tracking-[0.15em] uppercase text-muted">
            Dein Ergebnis
          </span>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary leading-[1.15] mb-8">
          {headline}
        </h2>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="max-w-[68ch] space-y-6">
          {paragraphs.map((paragraph, idx) => (
            <p key={idx} className="text-primary/80 text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </FadeIn>

      <ResultActions cluster={cluster} result={route} onRestart={onRestart} />
    </div>
  );
}
