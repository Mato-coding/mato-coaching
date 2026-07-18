"use client";

import type { ChoiceBlock as ChoiceBlockConfig } from "@/lib/workbook-types";
import QuestionHeader from "@/components/workbook/blocks/QuestionHeader";

interface ChoiceBlockProps {
  block: ChoiceBlockConfig;
  value?: { selected: string[] };
  questionNumber: string;
  onSave: (blockId: string, value: { selected: string[] }) => void;
}

const FOCUS_RING =
  "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";

export default function ChoiceBlock({
  block,
  value,
  questionNumber,
  onSave,
}: ChoiceBlockProps) {
  const selected = value?.selected ?? [];
  const variant = block.variant ?? "rows";

  function toggle(option: string) {
    if (block.multi) {
      const next = selected.includes(option)
        ? selected.filter((o) => o !== option)
        : [...selected, option];
      onSave(block.id, { selected: next });
    } else {
      onSave(block.id, { selected: [option] });
    }
  }

  return (
    <div>
      <QuestionHeader number={questionNumber} question={block.question} />

      {variant === "pills" ? (
        <div
          role={block.multi ? "group" : "radiogroup"}
          aria-label={block.question}
          className="mt-5 flex flex-wrap gap-3"
        >
          {block.options.map((option) => {
            const isSelected = selected.includes(option);
            return (
              <button
                key={option}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggle(option)}
                className={[
                  "min-h-11 rounded-full px-5 py-2.5 font-sans text-[16px] transition",
                  FOCUS_RING,
                  isSelected
                    ? "border border-navy bg-navy text-paper"
                    : "border border-hairline bg-surface text-ink",
                ].join(" ")}
              >
                {option}
              </button>
            );
          })}
        </div>
      ) : (
        <div
          role={block.multi ? "group" : "radiogroup"}
          aria-label={block.question}
          className="mt-2 flex flex-col"
        >
          {block.options.map((option) => {
            const isSelected = selected.includes(option);
            return (
              <button
                key={option}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggle(option)}
                className={[
                  "flex min-h-12 items-center gap-4 py-2 text-left font-sans text-body text-ink transition",
                  FOCUS_RING,
                ].join(" ")}
              >
                <span
                  className={[
                    "h-4.5 w-4.5 shrink-0 rounded-full border border-navy",
                    isSelected ? "bg-navy" : "bg-transparent",
                  ].join(" ")}
                  aria-hidden="true"
                />
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
