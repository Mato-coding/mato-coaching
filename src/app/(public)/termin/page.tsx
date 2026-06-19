import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import CalEmbed from "./CalEmbed";

export const metadata: Metadata = {
  title: "Erstgespräch vereinbaren",
  description:
    "Kostenfreies, unverbindliches Erstgespräch für Breathwork und Coaching in Hamburg und online.",
};

export default function BookingPage() {
  return (
    <section className="bg-background py-16 md:py-24 px-6">
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
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-6 bg-umber" aria-hidden="true" />
            <span className="text-sm font-medium tracking-[0.15em] uppercase text-muted">
              Erstgespräch
            </span>
            <span className="h-px w-6 bg-umber" aria-hidden="true" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-primary leading-[1.15] mb-4">
            Erstgespräch vereinbaren
          </h1>
          <p className="text-lg text-primary/80 max-w-2xl mx-auto leading-relaxed">
            Wähle einen passenden Zeitpunkt für unser kostenfreies Kennenlernen.
            Der Termin findet per Video-Call statt.
          </p>
        </div>

        <div className="bg-surface rounded-md border border-primary/8 min-h-[600px] p-4 overflow-hidden">
          <Suspense fallback={null}>
            <CalEmbed />
          </Suspense>
        </div>
      </div>
    </section>
  );
}