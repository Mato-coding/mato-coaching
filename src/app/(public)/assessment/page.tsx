import Link from "next/link";
import AssessmentForm from "@/components/forms/AssessmentForm";

export default function AssessmentPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-2xl w-full">
        <div className="mb-8">
          <Link href="/" className="text-sm text-primary/60 hover:text-primary transition-colors">
            ← Zurück zur Startseite
          </Link>
        </div>
        <AssessmentForm />
      </div>
    </div>
  );
}