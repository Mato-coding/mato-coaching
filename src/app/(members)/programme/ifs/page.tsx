import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import ProgressBar from "@/components/ui/ProgressBar";
import NoAccessNotice from "@/components/workbook/NoAccessNotice";
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
      <div className="space-y-10">
        <Header title={program.title} />
        <NoAccessNotice />
      </div>
    );
  }

  const allBlockIds = program.areas.flatMap((area) =>
    area.steps.flatMap((step) => step.blocks.map((block) => block.id))
  );
  const values = await getResponseValues(user.id, program.slug, allBlockIds);
  const answeredBlockIds = new Set(Object.keys(values));

  return (
    <div className="space-y-10">
      <Header title={program.title} />

      <ol className="space-y-4">
        {program.areas.map((area, index) => {
          const unlocked = isAreaUnlocked(access, area.index);
          const areaProgress = computeAreaProgress(area, answeredBlockIds);
          const eyebrow = area.index === 0 ? "Einstieg" : `Bereich ${area.index}`;

          return (
            <FadeIn key={area.slug} delay={index * 0.07}>
              {unlocked ? (
                <Link
                  href={`/programme/ifs/${area.slug}`}
                  className="block rounded-md border border-hairline bg-surface p-6 transition hover:border-muted"
                >
                  <AreaCardBody
                    eyebrow={eyebrow}
                    title={area.title}
                    unlocked
                  />
                  {areaProgress.totalSteps > 0 && (
                    <div className="mt-4">
                      <ProgressBar
                        label={`${areaProgress.completedSteps} von ${areaProgress.totalSteps} Schritten`}
                        value={
                          (areaProgress.completedSteps /
                            areaProgress.totalSteps) *
                          100
                        }
                      />
                    </div>
                  )}
                </Link>
              ) : (
                <div className="rounded-md border border-hairline bg-surface p-6 opacity-60">
                  <AreaCardBody
                    eyebrow={eyebrow}
                    title={area.title}
                    unlocked={false}
                  />
                </div>
              )}
            </FadeIn>
          );
        })}
      </ol>
    </div>
  );
}

function Header({ title }: { title: string }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="block h-px w-6 bg-umber" aria-hidden="true" />
        <span className="font-sans text-eyebrow font-medium uppercase tracking-eyebrow text-umber">
          Programm
        </span>
      </div>
      <h1 className="font-serif text-h1 font-medium leading-h1 text-ink">
        {title}
      </h1>
    </div>
  );
}

function AreaCardBody({
  eyebrow,
  title,
  unlocked,
}: {
  eyebrow: string;
  title: string;
  unlocked: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-1">
        <span
          className={[
            "font-sans text-eyebrow font-medium uppercase tracking-eyebrow",
            unlocked ? "text-umber" : "text-muted",
          ].join(" ")}
        >
          {eyebrow}
        </span>
        <p
          className={[
            "font-sans text-body",
            unlocked ? "text-ink" : "text-muted",
          ].join(" ")}
        >
          {title}
        </p>
      </div>
      <span className="shrink-0 font-sans text-small text-muted">
        {unlocked ? "Freigeschaltet" : "Noch gesperrt"}
      </span>
    </div>
  );
}
