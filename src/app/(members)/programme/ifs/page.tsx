import { notFound, redirect } from "next/navigation";
import FadeIn from "@/components/ui/FadeIn";
import NoAccessNotice from "@/components/workbook/NoAccessNotice";
import WorkbookHeader from "@/components/workbook/WorkbookHeader";
import WorkbookListRow from "@/components/workbook/WorkbookListRow";
import { createClient } from "@/lib/supabase/server";
import { getProgram, computeAreaProgress } from "@/lib/workbook";
import { getWorkbookAccess, isAreaUnlocked } from "@/lib/workbook-access";
import { getResponseValues } from "@/lib/workbook-responses";

const PROGRAM_SLUG = "ifs";

export const metadata = {
  title: "10 Wochen 1:1-Begleitung",
  robots: { index: false, follow: false },
};

export default async function ProgramOverviewPage() {
  const program = getProgram(PROGRAM_SLUG);
  if (!program) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/programme/login");

  const access = await getWorkbookAccess(user.id, program.slug);

  if (!access) {
    return (
      <div className="mx-auto max-w-[68ch]">
        <WorkbookHeader eyebrow="Programm" title={program.title} />
        <NoAccessNotice />
      </div>
    );
  }

  const allBlockIds = program.areas.flatMap((area) =>
    area.steps.flatMap((step) => step.blocks.map((block) => block.id))
  );
  const values = await getResponseValues(user.id, program.slug, allBlockIds);
  const answeredBlockIds = new Set(Object.keys(values));

  const completedAreas = program.areas.filter((area) => {
    const progress = computeAreaProgress(area, answeredBlockIds);
    return progress.totalSteps > 0 && progress.completedSteps === progress.totalSteps;
  }).length;

  return (
    <div className="mx-auto max-w-[68ch]">
      <WorkbookHeader
        eyebrow="Programm"
        title={program.title}
        progress={{
          completed: completedAreas,
          total: program.areas.length,
          label: `${completedAreas} von ${program.areas.length} Bereichen abgeschlossen`,
        }}
      />

      <div className="mt-12 border-t border-hairline md:mt-16">
        {program.areas.map((area, index) => {
          const unlocked = isAreaUnlocked(access, area.index);
          const areaProgress = computeAreaProgress(area, answeredBlockIds);
          const previousAreaIndex = area.index - 1;
          const previousAreaLabel =
            previousAreaIndex === 0
              ? "dem Einstieg"
              : `Bereich ${previousAreaIndex}`;

          let status: string;
          if (!unlocked) {
            status = `Öffnet nach ${previousAreaLabel}`;
          } else if (
            areaProgress.totalSteps > 0 &&
            areaProgress.completedSteps === areaProgress.totalSteps
          ) {
            status = "Abgeschlossen";
          } else if (areaProgress.totalSteps > 0) {
            status = `${areaProgress.completedSteps} von ${areaProgress.totalSteps} Schritten abgeschlossen`;
          } else {
            status = "Noch keine Schritte hinterlegt";
          }

          return (
            <FadeIn key={area.slug} delay={index * 0.05}>
              <WorkbookListRow
                href={`/programme/${program.slug}/${area.slug}`}
                title={area.title}
                status={status}
                locked={!unlocked}
              />
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
