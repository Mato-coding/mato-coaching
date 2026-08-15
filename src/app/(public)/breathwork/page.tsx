import type { Metadata } from "next";
import { absoluteUrl, SITE_URL } from "@/lib/site";

import BreathworkHero from "@/components/sections/breathwork/BreathworkHero";
import BreathworkResonance from "@/components/sections/breathwork/BreathworkResonance";
import BreathworkMethod from "@/components/sections/breathwork/BreathworkMethod";
import BreathworkProcess from "@/components/sections/breathwork/BreathworkProcess";
import BreathworkFitFor from "@/components/sections/breathwork/BreathworkFitFor";
import BreathworkAbout from "@/components/sections/About";
import BreathworkFAQ from "@/components/sections/breathwork/BreathworkFAQ";
import BreathworkAudio from "@/components/sections/breathwork/BreathworkAudio";
import BreathworkClosingCTA from "@/components/sections/breathwork/BreathworkClosingCTA";

export const metadata: Metadata = {
  title: "Somatic Breathwork in Hamburg und online",
  description:
    "Begleitete Atemarbeit zur Stressregulation, einzeln oder in der Gruppe, in Hamburg und online. Für Menschen mit Anspannung, Anxiety oder innerer Erschöpfung.",
  alternates: {
    canonical: absoluteUrl("/breathwork"),
  },
  openGraph: {
    title: "Somatic Breathwork in Hamburg und online",
    description:
      "Begleitete Atemarbeit zur Stressregulation, einzeln oder in der Gruppe, in Hamburg und online. Für Menschen mit Anspannung, Anxiety oder innerer Erschöpfung.",
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
      <BreathworkAudio />
      <BreathworkClosingCTA />
    </>
  );
}
