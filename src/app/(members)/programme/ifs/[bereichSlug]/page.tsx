import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import ProgressBar from "@/components/ui/ProgressBar";
import NoAccessNotice from "@/components/workbook/NoAccessNotice";
import AreaLockedNotice from "@/components/workbook/AreaLockedNotice";
import { createClient } from "@/lib/supabase/server";
import {
  getProgram,
  findArea,
  computeAreaProgress,
  computeStepProgress,
} from "@/lib/workbook";
import { getWorkbookAccess, isAreaUnlocked } from "@/lib/workbook-access";
import { getResponseValues } from "@/lib/workbook-responses";

const PROGRAM_SLUG = "ifs";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AreaStepsPage({
  params,
}: {
  params: Promise<{ bereichSlug: string }>;
}) {
  const { bereichSlug } = await params;

  const program = getProgram(PROGRAM_SLUG);
  if (!program) notFound();

  const area = findArea(program, bereichSlug);
  if (!area) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/programme/login");

  const access = await getWorkbookAccess(user.id, program.slug);
  if (!access) return <NoAccessNotice />;

  if (!isAreaUnlocked(access, area.index)) {
    return <AreaLockedNotice overviewHref={`/programme/${program.slug}`} />;
  }

  const blockIds = area.steps.flatMap((step) =>
    step.blocks.map((block) => block.id)
  );
  const values = await getResponseValues(user.id, program.slug, blockIds);
  const answeredBlockIds = new Set(Object.keys(values));
  const areaProgress = computeAreaProgress(area, answeredBlockIds);
  const eyebrow = area.index === 0 ? "Einstieg" : `Bereich ${area.index}`;

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <Link
          href={`/programme/${program.slug}`}
          className="font-sans text-small text-muted underline underline-offset-2 hover:text-ink"
        >
          Zurück zur Übersicht
        </Link>
        <div className="flex items-center gap-3">
          <span className="block h-px w-6 bg-umber" aria-hidden="true" />
          <span className="font-sans text-eyebrow font-medium uppercase tracking-eyebrow text-umber">
            {eyebrow}
          </span>
        </div>
        <h1 className="font-serif text-h1 font-medium leading-h1 text-ink">
          {area.title}
        </h1>
        {area.description && (
          <p className="font-sans text-body text-muted">{area.description}</p>
        )}
      </div>

      {area.steps.length > 0 ? (
        <>
          <ProgressBar
            label={`${areaProgress.completedSteps} von ${areaProgress.totalSteps} Schritten abgeschlossen`}
            value={
              (areaProgress.completedSteps / areaProgress.totalSteps) * 100
            }
          />

          <ol className="space-y-4">
            {area.steps.map((step, index) => {
              const stepProgress = computeStepProgress(step, answeredBlockIds);

              return (
                <FadeIn key={step.slug} delay={index * 0.07}>
                  <li>
                    <Link
                      href={`/programme/${program.slug}/${area.slug}/${step.slug}`}
                      className="block rounded-md border border-hairline bg-surface p-6 transition hover:border-muted"
                    >
                      <p className="font-sans text-body text-ink">
                        {step.title}
                      </p>
                      <p className="mt-2 font-sans text-small text-muted">
                        {stepProgress.total > 0
                          ? `${stepProgress.answered} von ${stepProgress.total} beantwortet`
                          : "Zum Lesen"}
                      </p>
                    </Link>
                  </li>
                </FadeIn>
              );
            })}
          </ol>
        </>
      ) : (
        <p className="font-sans text-body text-muted">
          Für diesen Bereich sind noch keine Schritte hinterlegt.
        </p>
      )}
    </div>
  );
}
