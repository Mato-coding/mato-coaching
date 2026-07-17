import { notFound, redirect } from "next/navigation";
import NoAccessNotice from "@/components/workbook/NoAccessNotice";
import AreaLockedNotice from "@/components/workbook/AreaLockedNotice";
import WorkbookStepView from "@/components/workbook/WorkbookStepView";
import { createClient } from "@/lib/supabase/server";
import { getProgram, findArea, findStep } from "@/lib/workbook";
import { getWorkbookAccess, isAreaUnlocked } from "@/lib/workbook-access";
import { getResponseValues } from "@/lib/workbook-responses";

const PROGRAM_SLUG = "ifs";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function StepPage({
  params,
}: {
  params: Promise<{ bereichSlug: string; schrittSlug: string }>;
}) {
  const { bereichSlug, schrittSlug } = await params;

  const program = getProgram(PROGRAM_SLUG);
  if (!program) notFound();

  const area = findArea(program, bereichSlug);
  if (!area) notFound();

  const step = findStep(area, schrittSlug);
  if (!step) notFound();

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

  const blockIds = step.blocks.map((block) => block.id);
  const values = await getResponseValues(user.id, program.slug, blockIds);

  const stepIndex = area.steps.findIndex((s) => s.slug === step.slug);
  const prevStepSlug = stepIndex > 0 ? area.steps[stepIndex - 1].slug : null;
  const nextStepSlug =
    stepIndex < area.steps.length - 1 ? area.steps[stepIndex + 1].slug : null;

  return (
    <WorkbookStepView
      program={program.slug}
      clientId={user.id}
      area={area}
      step={step}
      initialValues={values}
      prevStepSlug={prevStepSlug}
      nextStepSlug={nextStepSlug}
    />
  );
}
