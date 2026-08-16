import Link from "next/link";
import AssessmentForm from "@/components/forms/AssessmentForm";
import Section from "@/components/ui/Section";
import { buildMetadata } from "@/lib/site";

export const metadata = buildMetadata({
  path: "/assessment",
  title: "Kurz-Assessment",
  description:
    "In drei Minuten herausfinden, ob eine Begleitung mit Somatic Breathwork und IFS zu dir passt.",
});

export default function AssessmentPage() {
  return (
    <Section className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-2xl w-full">
        <div className="mb-8">
          <Link href="/" className="text-sm text-primary/60 hover:text-primary transition-colors">
            ← Zurück zur Startseite
          </Link>
        </div>
        <AssessmentForm />
      </div>
    </Section>
  );
}