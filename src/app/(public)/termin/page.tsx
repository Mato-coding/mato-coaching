import Link from "next/link";
import { Suspense } from "react";
import CalEmbed from "./CalEmbed";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import Card from "@/components/ui/Card";
import { buildMetadata } from "@/lib/site";

export const metadata = buildMetadata({
  path: "/termin",
  title: "Erstgespräch vereinbaren",
  description:
    "Kostenfreies, unverbindliches Erstgespräch für Breathwork und Coaching in Hamburg und online.",
});

export default function BookingPage() {
  return (
    <Section className="bg-background">
      {/*
        Bewusst kein Container-Primitive: dieser äußere Rahmen ist max-w-4xl
        (896px), keine der drei Container-Breiten (prose/narrow/default)
        trifft diesen Wert, siehe CTA.tsx' analoge max-w-2xl-Ausnahme.
      */}
      <div className="mx-auto max-w-4xl w-full">
        <div className="mb-10">
          <Link
            href="/"
            className="text-sm text-muted hover:text-primary transition-colors"
          >
            ← Zurück zur Startseite
          </Link>
        </div>

        <div className="text-center mb-10">
          <Eyebrow label="Erstgespräch" align="center" />
          <Heading variant="section" as="h1" className="mb-4">
            Erstgespräch vereinbaren
          </Heading>
          <p className="text-lg text-primary/80 max-w-2xl mx-auto leading-relaxed">
            Wähle einen passenden Zeitpunkt für unser kostenfreies Kennenlernen.
            Der Termin findet per Video-Call statt.
          </p>
          <p className="mt-3 text-sm text-muted">
            Das Erstgespräch dauert etwa 45 Minuten.
          </p>
        </div>

        <Card padding="compact" className="min-h-150 overflow-hidden">
          <Suspense fallback={null}>
            <CalEmbed />
          </Suspense>
        </Card>
      </div>
    </Section>
  );
}