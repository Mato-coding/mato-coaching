// JSON-LD strukturierte Daten für lokales SEO.
// Service-Area-Business: Hamburg als Einzugsgebiet, keine öffentliche Straße.
// Wird im Root-Layout innerhalb von <body> eingebunden.

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Lasse Klüver — Somatic Breathwork & Coaching",
  description:
    "Somatic Breathwork, Coaching und IFS-orientierte Prozessbegleitung in Hamburg und online. Begleitung bei innerer Unruhe, Anspannung und Erschöpfung.",
  url: "https://www.mato-coaching.de",
  image: "https://www.mato-coaching.de/portrait-lasse-sw.jpg",
  areaServed: {
    "@type": "City",
    name: "Hamburg",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hamburg",
    addressCountry: "DE",
  },
  knowsAbout: [
    "Somatic Breathwork",
    "Coaching",
    "Internal Family Systems (IFS)",
    "Nervensystem-Regulation",
    "Stressbewältigung",
  ],
  founder: {
    "@type": "Person",
    name: "Lasse Klüver",
    jobTitle: "Coach & Somatic Breathwork Begleiter",
  },
  // Sobald vorhanden hier deine Profile eintragen (Instagram, LinkedIn etc.):
  sameAs: [],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
