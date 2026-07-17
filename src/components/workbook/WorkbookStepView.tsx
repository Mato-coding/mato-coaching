"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import BlockRenderer from "@/components/workbook/blocks/BlockRenderer";
import ProgressBar from "@/components/ui/ProgressBar";
import { computeStepProgress } from "@/lib/workbook";
import type { WorkbookArea, WorkbookStep } from "@/lib/workbook-types";

type SaveStatus = "idle" | "saving" | "saved" | "error";

interface WorkbookStepViewProps {
  program: string;
  clientId: string;
  area: WorkbookArea;
  step: WorkbookStep;
  initialValues: Record<string, unknown>;
  prevStepSlug: string | null;
  nextStepSlug: string | null;
}

export default function WorkbookStepView({
  program,
  clientId,
  area,
  step,
  initialValues,
  prevStepSlug,
  nextStepSlug,
}: WorkbookStepViewProps) {
  const [values, setValues] =
    useState<Record<string, unknown>>(initialValues);
  const [answeredBlockIds, setAnsweredBlockIds] = useState<Set<string>>(
    () => new Set(Object.keys(initialValues))
  );
  const [status, setStatus] = useState<SaveStatus>("idle");

  const progress = computeStepProgress(step, answeredBlockIds);
  const areaHref = `/programme/${program}/${area.slug}`;

  async function handleSave(blockId: string, value: unknown) {
    setStatus("saving");
    setValues((prev) => ({ ...prev, [blockId]: value }));

    const supabase = createClient();
    const { error } = await supabase.from("workbook_responses").upsert(
      {
        client_id: clientId,
        program,
        block_id: blockId,
        value,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "client_id,program,block_id" }
    );

    if (error) {
      console.error("Workbook-Speicherfehler:", error.message);
      setStatus("error");
      return;
    }

    setAnsweredBlockIds((prev) => new Set(prev).add(blockId));
    setStatus("saved");
  }

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <Link
          href={areaHref}
          className="font-sans text-small text-muted underline underline-offset-2 hover:text-ink"
        >
          Zurück zu {area.title}
        </Link>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="block h-px w-6 bg-umber" aria-hidden="true" />
            <span className="font-sans text-eyebrow font-medium uppercase tracking-eyebrow text-umber">
              {area.index === 0 ? "Einstieg" : `Bereich ${area.index}`}
            </span>
          </div>
          <h1 className="font-serif text-h1 font-medium leading-h1 text-ink">
            {step.title}
          </h1>
        </div>

        {progress.total > 0 && (
          <ProgressBar
            label={`${progress.answered} von ${progress.total} beantwortet`}
            value={(progress.answered / progress.total) * 100}
          />
        )}

        <p className="font-sans text-small text-muted" aria-live="polite">
          {status === "saving" && "Wird gespeichert …"}
          {status === "saved" && "Gespeichert"}
          {status === "error" &&
            "Speichern fehlgeschlagen. Wird beim nächsten Versuch erneut probiert."}
        </p>
      </div>

      <div className="space-y-10">
        {step.blocks.map((block) => (
          <BlockRenderer
            key={block.id}
            block={block}
            value={values[block.id]}
            onSave={handleSave}
          />
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-hairline pt-6">
        {prevStepSlug ? (
          <Link
            href={`${areaHref}/${prevStepSlug}`}
            className="font-sans text-small text-ink underline underline-offset-2 hover:text-muted"
          >
            Zurück
          </Link>
        ) : (
          <span />
        )}
        {nextStepSlug ? (
          <Link
            href={`${areaHref}/${nextStepSlug}`}
            className="font-sans text-small text-ink underline underline-offset-2 hover:text-muted"
          >
            Weiter
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
