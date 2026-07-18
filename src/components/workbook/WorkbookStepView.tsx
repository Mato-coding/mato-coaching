"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import FadeIn from "@/components/ui/FadeIn";
import BlockRenderer from "@/components/workbook/blocks/BlockRenderer";
import type { BlockSaveStatus } from "@/components/workbook/blocks/SaveIndicator";
import { computeStepProgress } from "@/lib/workbook";
import type { WorkbookArea, WorkbookStep } from "@/lib/workbook-types";

interface WorkbookStepViewProps {
  program: string;
  clientId: string;
  area: WorkbookArea;
  step: WorkbookStep;
  initialValues: Record<string, unknown>;
  prevStepSlug: string | null;
  nextStepSlug: string | null;
}

const FOCUS_RING =
  "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";

function blockSpacingClass(index: number, isText: boolean) {
  if (index === 0) {
    return isText ? "mt-8 md:mt-11" : "mt-11 md:mt-15";
  }
  return "mt-10 md:mt-13";
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
  const [saveStatus, setSaveStatus] = useState<Record<string, BlockSaveStatus>>(
    {}
  );
  const tokenRef = useRef(0);

  const progress = computeStepProgress(step, answeredBlockIds);
  const areaHref = `/programme/${program}/${area.slug}`;

  async function handleSave(blockId: string, value: unknown) {
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

    tokenRef.current += 1;
    const token = tokenRef.current;

    if (error) {
      console.error("Workbook-Speicherfehler:", error.message);
      setSaveStatus((prev) => ({ ...prev, [blockId]: { state: "error", token } }));
      return;
    }

    setAnsweredBlockIds((prev) => new Set(prev).add(blockId));
    setSaveStatus((prev) => ({ ...prev, [blockId]: { state: "saved", token } }));
  }

  const questionNumbers: (string | undefined)[] = [];
  for (let counter = 0, i = 0; i < step.blocks.length; i++) {
    if (step.blocks[i].type === "text") {
      questionNumbers.push(undefined);
    } else {
      counter += 1;
      questionNumbers.push(String(counter).padStart(2, "0"));
    }
  }

  return (
    <div className="mx-auto max-w-[68ch]">
      <FadeIn y={8} durationSec={0.6} ease={[0.16, 1, 0.3, 1]}>
        <Link
          href={areaHref}
          className={`inline-flex min-h-11 items-center gap-2 whitespace-nowrap font-sans text-[14px] text-muted no-underline transition-colors hover:text-ink ${FOCUS_RING}`}
        >
          <span aria-hidden="true">←</span>
          Zurück zur Übersicht
        </Link>

        <div className="mt-4 flex items-center gap-3">
          <span className="block h-px w-4 bg-umber" aria-hidden="true" />
          <span className="font-sans text-eyebrow font-normal uppercase tracking-eyebrow text-muted">
            {area.index === 0 ? "Einstieg" : `Bereich ${area.index}`}
          </span>
        </div>

        <h1 className="mt-3 font-serif text-[32px] font-medium leading-[1.08] tracking-[-0.01em] text-ink md:text-[46px]">
          {step.title}
        </h1>

        {progress.total > 0 && (
          <div className="mt-6">
            <div className="h-px w-full bg-hairline">
              <div
                className="h-px bg-navy"
                style={{
                  width: `${(progress.answered / progress.total) * 100}%`,
                }}
              />
            </div>
            <p className="mt-2 font-sans text-[13px] text-muted">
              {progress.answered} von {progress.total} beantwortet
            </p>
          </div>
        )}
      </FadeIn>

      <div>
        {step.blocks.map((block, index) => {
          const isText = block.type === "text";
          const questionNumber = questionNumbers[index];

          return (
            <FadeIn
              key={block.id}
              y={8}
              durationSec={0.6}
              ease={[0.16, 1, 0.3, 1]}
              delay={index * 0.04}
              className={blockSpacingClass(index, isText)}
            >
              <BlockRenderer
                block={block}
                value={values[block.id]}
                questionNumber={questionNumber}
                saveStatus={saveStatus[block.id]}
                onSave={handleSave}
              />
            </FadeIn>
          );
        })}
      </div>

      <div className="mt-16 flex items-center justify-between border-t border-hairline pt-6">
        {prevStepSlug ? (
          <Link
            href={`${areaHref}/${prevStepSlug}`}
            className={`inline-flex min-h-11 items-center font-sans text-small text-ink hover:text-muted ${FOCUS_RING}`}
          >
            Zurück
          </Link>
        ) : (
          <span />
        )}
        {nextStepSlug ? (
          <Link
            href={`${areaHref}/${nextStepSlug}`}
            className={`inline-flex min-h-11 items-center font-sans text-small text-ink hover:text-muted ${FOCUS_RING}`}
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
