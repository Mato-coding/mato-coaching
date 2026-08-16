import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Transformation from "@/components/sections/Transformation";
import Cause from "@/components/sections/Cause";
import Method from "@/components/sections/Method";
import About from "@/components/sections/About";
import CTA from "@/components/sections/CTA";
import LeadMagnet from "@/components/sections/LeadMagnet";
import { absoluteUrl, buildMetadata } from "@/lib/site";

// openGraph trägt bewusst eine eigene, für Social-Previews geschriebene
// Kopie (Titel, Beschreibung, Bild) statt der Seiten-Titel/Beschreibung aus
// buildMetadata() – das war vorher im Public-Layout so hinterlegt (einzige
// Seite mit OG-Bild) und bleibt inhaltlich unverändert.
export const metadata: Metadata = {
  ...buildMetadata({
    path: "/",
    title: "Breathwork & Coaching in Hamburg",
    description:
      "Somatic Breathwork und IFS-orientierte Begleitung in Hamburg und online. Finde bei innerer Unruhe, Anspannung, Anxiety und Erschöpfung zurück zur Ruhe.",
  }),
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: absoluteUrl("/"),
    siteName: "Lasse Klüver",
    title: "Somatic Breathwork & Coaching in Hamburg | Lasse Klüver",
    description:
      "Begleitung bei innerer Unruhe, Anspannung und Erschöpfung. Somatic Breathwork, Coaching und IFS in Hamburg und online.",
    images: [
      {
        url: "/portrait-lasse-sw.jpg",
        width: 600,
        height: 800,
        alt: "Lasse Klüver",
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Transformation />
      <Cause />
      <Method />
      <About />
      <CTA />
      <LeadMagnet />
    </>
  );
}
