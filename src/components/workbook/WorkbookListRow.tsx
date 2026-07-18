import Link from "next/link";

const FOCUS_RING =
  "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";

interface WorkbookListRowProps {
  href: string;
  title: string;
  status: string;
  locked?: boolean;
}

export default function WorkbookListRow({
  href,
  title,
  status,
  locked = false,
}: WorkbookListRowProps) {
  if (locked) {
    return (
      <div
        aria-disabled="true"
        className="flex min-h-11 items-center justify-between gap-4 border-b border-hairline py-6"
      >
        <div>
          <p className="font-serif text-[22px] font-medium text-muted">
            {title}
          </p>
          <p className="mt-1.5 font-sans text-[13px] text-muted">{status}</p>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={`group flex min-h-11 items-center justify-between gap-4 border-b border-hairline py-6 no-underline transition-colors ${FOCUS_RING}`}
    >
      <div>
        <p className="font-serif text-[22px] font-medium text-ink transition-colors group-hover:text-navy">
          {title}
        </p>
        <p className="mt-1.5 font-sans text-[13px] text-muted">{status}</p>
      </div>
      <span
        aria-hidden="true"
        className="shrink-0 font-sans text-muted transition-colors group-hover:text-ink"
      >
        →
      </span>
    </Link>
  );
}
