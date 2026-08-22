import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import FeedbackForm from "@/components/forms/FeedbackForm";
import { buildMetadata } from "@/lib/site";
import { isValidFormat, isValidFeedbackSource, type Format } from "@/lib/feedback-config";

// Reine QR-Einladungsseite, keine SEO-Seite: noindex/nofollow, bewusst nicht
// in sitemap.ts aufgenommen.
export const metadata = buildMetadata({
  path: "/feedback",
  title: "Dein Feedback",
  description: "Wie war die Stunde für dich? Eine Minute, die mir hilft.",
  noindex: true,
});

interface FeedbackPageProps {
  searchParams: Promise<{ format?: string; src?: string }>;
}

export default async function FeedbackPage({ searchParams }: FeedbackPageProps) {
  const params = await searchParams;

  const initialFormat: Format | null = isValidFormat(params.format) ? params.format : null;
  const source = isValidFeedbackSource(params.src) ? params.src : null;

  // Kein stiller Fallback (CLAUDE.md, offene Aufgabe 5): fehlt eine Env,
  // Warnung ins Server-Log statt eine Datei-URL zu raten. Die Danke-Ansicht
  // lässt den betroffenen Block/Button dann einfach weg, zeigt außerhalb von
  // Production zusätzlich einen sichtbaren Entwicklungshinweis (showEnvHints).
  const audioUrl = process.env.NEXT_PUBLIC_FEEDBACK_AUDIO_URL || null;
  if (!audioUrl) {
    console.warn(
      "NEXT_PUBLIC_FEEDBACK_AUDIO_URL fehlt: Danke-Ansicht auf /feedback zeigt keinen Audio-Block."
    );
  }

  const googleReviewUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || null;
  if (!googleReviewUrl) {
    console.warn(
      "NEXT_PUBLIC_GOOGLE_REVIEW_URL fehlt: Danke-Ansicht auf /feedback zeigt keinen Google-Bewertungs-Button."
    );
  }

  const showEnvHints = process.env.NODE_ENV !== "production";

  return (
    <Section size="default">
      <Container width="narrow">
        <FeedbackForm
          initialFormat={initialFormat}
          source={source}
          audioUrl={audioUrl}
          googleReviewUrl={googleReviewUrl}
          showEnvHints={showEnvHints}
        />
      </Container>
    </Section>
  );
}
