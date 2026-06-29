import type { Metadata } from "next";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import FadeIn from "@/components/ui/FadeIn";
import Eyebrow from "@/components/ui/Eyebrow";
import LeadMagnetCTA from "@/components/sections/LeadMagnetCTA";

import BreathworkHero from "@/components/sections/breathwork/BreathworkHero";
import BreathworkResonance from "@/components/sections/breathwork/BreathworkResonance";
import BreathworkMethod from "@/components/sections/breathwork/BreathworkMethod";
import BreathworkProcess from "@/components/sections/breathwork/BreathworkProcess";
import BreathworkFitFor from "@/components/sections/breathwork/BreathworkFitFor";
import BreathworkAbout from "@/components/sections/About";
import BreathworkFAQ from "@/components/sections/breathwork/BreathworkFAQ";
import BreathworkClosingCTA from "@/components/sections/breathwork/BreathworkClosingCTA";

export const metadata: Metadata = {
  title: "Somatic Breathwork in Hamburg und online",
  description:
    "Begleitete Atemarbeit zur Stressregulation, einzeln oder in der Gruppe, in Hamburg und online. Erstgespräch kostenfrei und unverbindlich.",
  alternates: {
    canonical: absoluteUrl("/breathwork"),
  },
  openGraph: {
    title: "Somatic Breathwork in Hamburg und online",
    description:
      "Begleitete Atemarbeit zur Stressregulation, einzeln oder in der Gruppe, in Hamburg und online. Erstgespräch kostenfrei und unverbindlich.",
    url: absoluteUrl("/breathwork"),
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Somatic Breathwork",
  serviceType: "Somatic Breathwork",
  description:
    "Begleitete Atemarbeit zur Stressregulation, einzeln oder in der Gruppe, in Hamburg und online.",
  provider: {
    "@type": "ProfessionalService",
    name: "Lasse Klüver",
    url: SITE_URL,
  },
  areaServed: {
    "@type": "City",
    name: "Hamburg",
  },
  url: absoluteUrl("/breathwork"),
  availableChannel: [
    {
      "@type": "ServiceChannel",
      serviceLocation: {
        "@type": "City",
        name: "Hamburg",
      },
    },
    {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl("/termin"),
    },
  ],
};

export default function BreathworkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <BreathworkHero />
      <BreathworkResonance />
      <BreathworkMethod />
      <BreathworkProcess />
      <BreathworkFitFor />
      <BreathworkAbout />
      <BreathworkFAQ />

      {/* Sektion 8: Audio-Lead-Magnet */}
      <section id="audio-reset" className="bg-background px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <Eyebrow label="Kostenloses Audio" />
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary leading-[1.15]">
              Ein erster Schritt zurück zur Ruhe
            </h2>
            <LeadMagnetCTA source="breathwork" />
          </FadeIn>
        </div>
      </section>

      <BreathworkClosingCTA />
    </>
  );
}
