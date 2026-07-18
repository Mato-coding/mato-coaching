import Link from "next/link";

const FOCUS_RING =
  "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";

export default function AreaLockedNotice({
  overviewHref,
}: {
  overviewHref: string;
}) {
  return (
    <div className="mx-auto max-w-[68ch] space-y-4 py-16 text-center">
      <p className="font-serif text-h2 font-medium leading-h2 text-ink">
        Dieser Bereich ist noch nicht freigeschaltet.
      </p>
      <p className="font-sans text-body text-muted">
        Er öffnet sich, sobald Lasse ihn für dich freigibt.
      </p>
      <Link
        href={overviewHref}
        className={`inline-flex min-h-11 items-center font-sans text-small text-ink no-underline transition-colors hover:text-muted ${FOCUS_RING}`}
      >
        Zurück zur Übersicht
      </Link>
    </div>
  );
}
