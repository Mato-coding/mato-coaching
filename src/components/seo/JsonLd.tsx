import { SITE_URL, absoluteUrl } from "@/lib/site";

// JSON-LD strukturierte Daten für lokales SEO.
// name: Lasse Klüver (primäre Identität), alternateName: Mato Coaching (Methoden-/Markenebene).
// Service-Area-Business: Hamburg als Einzugsgebiet, keine öffentliche Straße.

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Lasse Klüver",
  alternateName: "Mato Coaching",
  description:
    "Somatic Breathwork, Coaching und IFS-orientierte Prozessbegleitung in Hamburg und online. Begleitung bei innerer Unruhe, Anspannung und Erschöpfung.",
  url: SITE_URL,
  image: absoluteUrl("/portrait-lasse-sw.jpg"),
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
    "Umgang mit innerer Unruhe",
    "Umgang mit Erschöpfung",
    "erholsamer Schlaf",
    "Schlafstörungen",
    "Schlafprobleme",
    "Selbstregulation",
    "Persönlichkeitsentwicklung",
    "Anxiety",
    "Panikattacken",
  ],
  founder: {
    "@type": "Person",
    name: "Lasse Klüver",
    jobTitle: "Coach & Somatic Breathwork Begleiter",
    sameAs: ["https://www.linkedin.com/in/lassekl%C3%BCver/"],
  },
  // Profile des Unternehmens (z. B. berufliches Instagram), sobald vorhanden hier eintragen:
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