import { absoluteUrl, buildMetadata, SITE_URL } from "@/lib/site";
import JsonLdScript from "@/components/seo/JsonLdScript";

import CoachingHero from "@/components/sections/coaching/CoachingHero";
import CoachingResonance from "@/components/sections/coaching/CoachingResonance";
import CoachingProgram from "@/components/sections/coaching/CoachingProgram";
import CoachingMethod from "@/components/sections/coaching/CoachingMethod";
import CoachingAbout from "@/components/sections/coaching/CoachingAbout";
import CoachingFoundingRound from "@/components/sections/coaching/CoachingFoundingRound";
import CoachingFormats from "@/components/sections/coaching/CoachingFormats";
import CoachingClosingCTA from "@/components/sections/coaching/CoachingClosingCTA";
import CoachingBoundary from "@/components/sections/coaching/CoachingBoundary";

export const metadata = buildMetadata({
  path: "/coaching",
  title: "1:1 Begleitung: zur Ruhe kommen, klar ausrichten",
  description:
    "10 Wochen 1:1-Begleitung für Menschen mit innerer Unruhe, Anxiety oder Panikattacken. Somatic Breathwork und IFS, remote oder in Hamburg.",
});

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "1:1 Begleitung über zehn Wochen",
  serviceType: "Coaching und Somatic Breathwork",
  description:
    "10 Wochen 1:1-Begleitung für Menschen mit innerer Unruhe, Anxiety oder Panikattacken. Somatic Breathwork und IFS, remote oder in Hamburg.",
  provider: {
    "@type": "ProfessionalService",
    name: "Lasse Klüver",
    url: SITE_URL,
  },
  areaServed: {
    "@type": "City",
    name: "Hamburg",
  },
  url: absoluteUrl("/coaching"),
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

export default function CoachingPage() {
  return (
    <>
      <JsonLdScript data={serviceJsonLd} />

      <CoachingHero />
      <CoachingResonance />
      <CoachingProgram />
      <CoachingMethod />
      <CoachingAbout />
      <CoachingFoundingRound />
      <CoachingFormats />
      <CoachingClosingCTA />
      <CoachingBoundary />
    </>
  );
}
