import Link from "next/link";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import { buildMetadata } from "@/lib/site";

export const metadata = buildMetadata({
  path: "/impressum",
  title: "Impressum",
  description:
    "Somatic Breathwork, Coaching und IFS-orientierte Prozessbegleitung in Hamburg und online. Begleitung bei innerer Unruhe, Anspannung und Erschöpfung.",
});

export default function ImpressumPage() {
  return (
    <Section
      size="default"
      className="min-h-screen bg-background flex flex-col items-center"
    >
      <div className="max-w-3xl w-full">
        <div className="mb-12">
          <Link href="/" className="text-sm text-primary/60 hover:text-primary transition-colors">
            ← Zurück zur Startseite
          </Link>
        </div>
        <Heading variant="section" as="h1" className="mb-8">Impressum</Heading>
        <div className="space-y-6 text-primary/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-primary mb-2">Angaben gemäß § 5 TMG</h2>
            <p>
              Lasse Klüver<br />
              Seesrein 9<br />
              22459 Hamburg
            </p>
          </section>
          <section>
            <h2 className="text-xl font-medium text-primary mb-2">Kontakt</h2>
            <p>
              Telefon: +49 179 237 88 95<br />
              E-Mail: hello@lassekluever.de
            </p>
          </section>
          <section>
            <p className="text-sm">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: Lasse Klüver
            </p>
          </section>
        </div>
      </div>
    </Section>
  );
}