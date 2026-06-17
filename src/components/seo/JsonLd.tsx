// JSON-LD strukturierte Daten für lokales SEO.
// Geschäftsname: Mato Coaching. Lasse Klüver als founder (die Person dahinter).
// Service-Area-Business: Hamburg als Einzugsgebiet, keine öffentliche Straße.

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Mato Coaching",
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
    "Anxiety",
    "Erschöpfung",
    "Selbstfürsorge",
    "Persönlichkeitsentwicklung",
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