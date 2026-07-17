"use client";

import type { ScaleBlock as ScaleBlockConfig } from "@/lib/workbook-types";

interface ScaleBlockProps {
  block: ScaleBlockConfig;
  value?: { value: number };
  onSave: (blockId: string, value: { value: number }) => void;
}

export default function ScaleBlock({ block, value, onSave }: ScaleBlockProps) {
  const options = Array.from(
    { length: block.max - block.min + 1 },
    (_, i) => block.min + i
  );

  return (
    <div className="space-y-4">
      <p className="font-sans text-body text-ink">{block.question}</p>
      <div
        role="radiogroup"
        aria-label={block.question}
        className="flex flex-wrap items-center gap-3"
      >
        {options.map((option) => {
          const selected = value?.value === option;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSave(block.id, { value: option })}
              className={[
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-md border font-sans text-body transition",
                selected
                  ? "border-navy bg-navy text-paper"
                  : "border-ink/15 text-ink hover:border-navy",
              ].join(" ")}
            >
              {option}
            </button>
          );
        })}
      </div>
      <div className="flex justify-between font-sans text-small text-muted">
        <span>{block.minLabel}</span>
        <span>{block.maxLabel}</span>
      </div>
    </div>
  );
}
