import { createClient } from "@/lib/supabase/server";
import { PROGRAMS } from "@/lib/workbook-programs";
import FadeIn from "@/components/ui/FadeIn";

export const metadata = {
  title: "10 Wochen 1:1-Begleitung",
  robots: { index: false, follow: false },
};

const AREAS = [
  { id: 1, title: "Lerne deine Anteile und dein Selbst kennen" },
  { id: 2, title: "Würdige deine überarbeiteten Manager-Anteile" },
  { id: 3, title: "Schließe Freundschaft mit deinen aktivierten Firefightern" },
  { id: 4, title: "Nimm deine belasteten Verbannten an" },
  { id: 5, title: "Erschließe dir ein selbstgeführtes Leben" },
] as const;

const PROGRAM_SLUG = PROGRAMS.ifs.slug;
const DEFAULT_UNLOCKED: number[] = [1];

export default async function IfsOverviewPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let unlockedAreas = DEFAULT_UNLOCKED;

  if (user) {
    const { data } = await supabase
      .from("workbook_access")
      .select("unlocked_areas")
      .eq("client_id", user.id)
      .eq("program", PROGRAM_SLUG)
      .maybeSingle();

    if (data?.unlocked_areas) {
      unlockedAreas = data.unlocked_areas;
    }
  }

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="block h-px w-6 bg-umber" aria-hidden="true" />
          <span className="font-sans text-eyebrow font-medium uppercase tracking-eyebrow text-umber">
            Programm
          </span>
        </div>
        <h1 className="font-serif text-h1 font-medium leading-h1 text-ink">
          {PROGRAMS.ifs.title}
        </h1>
      </div>

      <ol className="space-y-4">
        {AREAS.map((area, index) => {
          const isUnlocked = unlockedAreas.includes(area.id);

          return (
            <FadeIn key={area.id} delay={index * 0.07}>
              <li
                className={[
                  "rounded-md border p-6 transition",
                  isUnlocked
                    ? "border-hairline bg-surface"
                    : "border-hairline bg-surface opacity-60",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span
                      className={[
                        "font-sans text-eyebrow font-medium uppercase tracking-eyebrow",
                        isUnlocked ? "text-umber" : "text-muted",
                      ].join(" ")}
                    >
                      Bereich {area.id}
                    </span>
                    <p
                      className={[
                        "font-sans text-body",
                        isUnlocked ? "text-ink" : "text-muted",
                      ].join(" ")}
                    >
                      {area.title}
                    </p>
                  </div>

                  {isUnlocked ? (
                    <span className="shrink-0 font-sans text-small text-muted">
                      Bald verfügbar
                    </span>
                  ) : (
                    <span className="shrink-0 font-sans text-small text-muted">
                      Noch gesperrt
                    </span>
                  )}
                </div>
              </li>
            </FadeIn>
          );
        })}
      </ol>
    </div>
  );
}
