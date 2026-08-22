"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { scrollElementToTop } from "@/lib/scroll";
import { thankYou, envHint } from "@/lib/feedback-config";

interface FeedbackThankYouProps {
  // NEXT_PUBLIC_FEEDBACK_AUDIO_URL bzw. NEXT_PUBLIC_GOOGLE_REVIEW_URL, vom
  // Server (feedback/page.tsx) durchgereicht. null, wenn die jeweilige Env
  // fehlt: kein stiller Fallback, der Block bzw. Button entfällt dann
  // einfach (Warnung landet beim Seitenaufruf im Server-Log).
  audioUrl: string | null;
  googleReviewUrl: string | null;
  // process.env.NODE_ENV !== "production", vom Server ermittelt (page.tsx)
  // und durchgereicht, damit diese Client-Komponente NODE_ENV nicht selbst
  // lesen muss. Steuert den sichtbaren Entwicklungshinweis bei fehlenden
  // Envs, unabhängig vom stummen Server-Log-Warning.
  showEnvHints: boolean;
}

// Reihenfolge ist Absicht (siehe Bau-Auftrag Feedback-Seite, Abschnitt 3):
// erst der Wert für die Person (Audio), dann erst die Einladung zur
// öffentlichen Bewertung. Für alle Routen identisch, keine Verzweigung nach
// rating: eine an die Bewertungshöhe geknüpfte Google-Einladung wäre Review
// Gating und damit ein Verstoß gegen Googles Richtlinien und das UWG.
export default function FeedbackThankYou({
  audioUrl,
  googleReviewUrl,
  showEnvHints,
}: FeedbackThankYouProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rootRef.current) scrollElementToTop(rootRef.current);
  }, []);

  const mailtoHref = `mailto:hello@lassekluever.de?subject=${encodeURIComponent(
    thankYou.share.mailSubject
  )}`;

  return (
    <div ref={rootRef} className="text-primary">
      <FadeIn>
        <Eyebrow label="Danke" />
        <Heading variant="section" as="h1">
          {thankYou.heading}
        </Heading>
        <p className="mt-4 max-w-measure text-lg leading-relaxed text-muted">{thankYou.intro}</p>
      </FadeIn>

      {audioUrl ? (
        <FadeIn delay={0.1}>
          <Card className="mt-10">
            <Eyebrow label={thankYou.audio.eyebrow} />
            <h3 className="font-serif text-xl md:text-2xl font-medium text-primary">
              {thankYou.audio.title}
            </h3>
            <p className="mt-2 text-muted">{thankYou.audio.description}</p>
            <audio controls preload="none" src={audioUrl} className="mt-6 w-full">
              Dein Browser unterstützt die Audio-Wiedergabe nicht.
            </audio>
            <a
              href={audioUrl}
              download
              className="mt-3 inline-block text-sm text-muted underline underline-offset-2 hover:text-accent"
            >
              {thankYou.audio.downloadLabel}
            </a>
          </Card>
        </FadeIn>
      ) : (
        showEnvHints && (
          <p className="mt-10 text-sm text-umber">{envHint("NEXT_PUBLIC_FEEDBACK_AUDIO_URL")}</p>
        )
      )}

      <FadeIn delay={0.2}>
        <div className="mt-12 border-t border-umber/20 pt-8">
          <Eyebrow label={thankYou.nextSteps.eyebrow} />
          <ul className="space-y-3">
            {thankYou.nextSteps.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-accent underline underline-offset-2 hover:opacity-80"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="mt-12 border-t border-hairline pt-8">
          <Eyebrow label={thankYou.share.eyebrow} />
          <p className="max-w-measure text-lg leading-relaxed text-muted">{thankYou.share.text}</p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            {googleReviewUrl ? (
              <Button href={googleReviewUrl} external className="block flex-1 text-center">
                {thankYou.share.googleLabel}
              </Button>
            ) : (
              showEnvHints && (
                <p className="flex-1 text-sm text-umber">
                  {envHint("NEXT_PUBLIC_GOOGLE_REVIEW_URL")}
                </p>
              )
            )}
            <Button href={mailtoHref} variant="secondary" className="block flex-1 text-center">
              {thankYou.share.directLabel}
            </Button>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
