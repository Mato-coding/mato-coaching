import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

const FOCUS_RING =
  "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";

interface WorkbookHeaderProgress {
  completed: number;
  total: number;
  label: string;
}

interface WorkbookHeaderProps {
  backHref?: string;
  eyebrow: string;
  title: string;
  description?: string;
  progress?: WorkbookHeaderProgress;
}

export default function WorkbookHeader({
  backHref,
  eyebrow,
  title,
  description,
  progress,
}: WorkbookHeaderProps) {
  return (
    <FadeIn y={8} durationSec={0.6} ease={[0.16, 1, 0.3, 1]}>
      {backHref && (
        <Link
          href={backHref}
          className={`inline-flex min-h-11 items-center gap-2 whitespace-nowrap font-sans text-[14px] text-muted no-underline transition-colors hover:text-ink ${FOCUS_RING}`}
        >
          <span aria-hidden="true">←</span>
          Zurück zur Übersicht
        </Link>
      )}

      <div
        className={`flex items-center gap-3 ${backHref ? "mt-4" : ""}`}
      >
        <span className="block h-px w-4 bg-umber" aria-hidden="true" />
        <span className="font-sans text-eyebrow font-normal uppercase tracking-eyebrow text-muted">
          {eyebrow}
        </span>
      </div>

      <h1 className="mt-3 font-serif text-[32px] font-medium leading-[1.08] tracking-[-0.01em] text-ink md:text-[46px]">
        {title}
      </h1>

      {description && (
        <p className="mt-6 font-sans text-body text-muted">{description}</p>
      )}

      {progress && progress.total > 0 && (
        <div className={description ? "mt-8" : "mt-6"}>
          <div className="h-px w-full bg-hairline">
            <div
              className="h-px bg-navy"
              style={{
                width: `${(progress.completed / progress.total) * 100}%`,
              }}
            />
          </div>
          <p className="mt-2 font-sans text-[13px] text-muted">
            {progress.label}
          </p>
        </div>
      )}
    </FadeIn>
  );
}
