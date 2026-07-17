"use client";

import type { ChoiceBlock as ChoiceBlockConfig } from "@/lib/workbook-types";

interface ChoiceBlockProps {
  block: ChoiceBlockConfig;
  value?: { selected: string[] };
  onSave: (blockId: string, value: { selected: string[] }) => void;
}

export default function ChoiceBlock({
  block,
  value,
  onSave,
}: ChoiceBlockProps) {
  const selected = value?.selected ?? [];

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
    <div className="space-y-3">
      <p className="font-sans text-body text-ink">{block.question}</p>
      <div
        role={block.multi ? "group" : "radiogroup"}
        aria-label={block.question}
        className="flex flex-col gap-3"
      >
        {block.options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              role={block.multi ? "checkbox" : "radio"}
              aria-checked={isSelected}
              onClick={() => toggle(option)}
              className={[
                "rounded-md border p-4 text-left font-sans text-body transition",
                isSelected
                  ? "border-navy bg-navy/5 text-ink"
                  : "border-ink/15 text-ink hover:border-navy",
              ].join(" ")}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
