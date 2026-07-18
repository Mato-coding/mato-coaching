import { notFound, redirect } from "next/navigation";
import FadeIn from "@/components/ui/FadeIn";
import NoAccessNotice from "@/components/workbook/NoAccessNotice";
import AreaLockedNotice from "@/components/workbook/AreaLockedNotice";
import WorkbookHeader from "@/components/workbook/WorkbookHeader";
import WorkbookListRow from "@/components/workbook/WorkbookListRow";
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
  const areaHref = `/programme/${program.slug}`;

  return (
    <div className="mx-auto max-w-[68ch]">
      <WorkbookHeader
        backHref={areaHref}
        eyebrow={eyebrow}
        title={area.title}
        description={area.description}
        progress={
          area.steps.length > 0
            ? {
                completed: areaProgress.completedSteps,
                total: areaProgress.totalSteps,
                label: `${areaProgress.completedSteps} von ${areaProgress.totalSteps} Schritten abgeschlossen`,
              }
            : undefined
        }
      />

      {area.steps.length > 0 ? (
        <div className="mt-12 border-t border-hairline md:mt-16">
          {area.steps.map((step, index) => {
            const stepProgress = computeStepProgress(step, answeredBlockIds);
            const status = stepProgress.complete
              ? "Abgeschlossen"
              : stepProgress.total > 0
                ? `${stepProgress.answered} von ${stepProgress.total} beantwortet`
                : "Zum Lesen";

            return (
              <FadeIn key={step.slug} delay={index * 0.05}>
                <WorkbookListRow
                  href={`/programme/${program.slug}/${area.slug}/${step.slug}`}
                  title={step.title}
                  status={status}
                />
              </FadeIn>
            );
          })}
        </div>
      ) : (
        <p className="mt-12 font-sans text-body text-muted md:mt-16">
          Für diesen Bereich sind noch keine Schritte hinterlegt.
        </p>
      )}
    </div>
  );
}
