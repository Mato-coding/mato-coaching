import Link from "next/link";
import { PROGRAMS } from "@/lib/workbook-programs";

export const metadata = {
  title: "Dein Bereich",
  robots: { index: false, follow: false },
};

export default function ProgrammeHubPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="block h-px w-6 bg-umber" aria-hidden="true" />
          <span className="font-sans text-eyebrow font-medium uppercase tracking-eyebrow text-umber">
            Dein Bereich
          </span>
        </div>
        <h1 className="font-serif text-h1 font-medium leading-h1 text-ink">
          Willkommen
        </h1>
      </div>

      <div className="space-y-4">
        {Object.values(PROGRAMS).map((program) => (
          <Link
            key={program.slug}
            href={`/programme/${program.slug}`}
            className="block rounded-md border border-hairline bg-surface p-6 transition hover:border-muted"
          >
            <p className="font-sans text-small font-medium uppercase tracking-wide text-muted">
              Programm
            </p>
            <p className="mt-1 font-serif text-h2 font-medium leading-h2 text-ink">
              {program.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
