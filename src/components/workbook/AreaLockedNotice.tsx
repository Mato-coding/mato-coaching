import Link from "next/link";

export default function AreaLockedNotice({
  overviewHref,
}: {
  overviewHref: string;
}) {
  return (
    <div className="space-y-4 rounded-md border border-hairline bg-surface p-8 text-center">
      <p className="font-serif text-h2 font-medium leading-h2 text-ink">
        Dieser Bereich ist noch nicht freigeschaltet.
      </p>
      <p className="font-sans text-body text-muted">
        Er öffnet sich, sobald Lasse ihn für dich freigibt.
      </p>
      <Link
        href={overviewHref}
        className="inline-block font-sans text-small text-ink underline underline-offset-2 hover:text-muted"
      >
        Zurück zur Übersicht
      </Link>
    </div>
  );
}
