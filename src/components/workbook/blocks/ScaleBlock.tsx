"use client";

import type { ScaleBlock as ScaleBlockConfig } from "@/lib/workbook-types";
import QuestionHeader from "@/components/workbook/blocks/QuestionHeader";

interface ScaleBlockProps {
  block: ScaleBlockConfig;
  value?: { value: number };
  questionNumber: string;
  onSave: (blockId: string, value: { value: number }) => void;
}

const TRACK_INSET_PX = 22;

export default function ScaleBlock({
  block,
  value,
  questionNumber,
  onSave,
}: ScaleBlockProps) {
  const options = Array.from(
    { length: block.max - block.min + 1 },
    (_, i) => block.min + i
  );
  const lastIndex = options.length - 1;

  function pointOffset(index: number) {
    const fraction = lastIndex === 0 ? 0 : index / lastIndex;
    return `calc(${TRACK_INSET_PX}px + (100% - ${TRACK_INSET_PX * 2}px) * ${fraction})`;
  }

  return (
    <div>
      <QuestionHeader number={questionNumber} question={block.question} />

      <div className="relative mt-3 h-11">
        <div
          className="absolute top-1/2 h-px -translate-y-1/2 bg-hairline"
          style={{ left: TRACK_INSET_PX, right: TRACK_INSET_PX }}
          aria-hidden="true"
        />
        {options.map((option, index) => {
          const selected = value?.value === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              aria-label={`Stufe ${index + 1} von ${options.length}`}
              onClick={() => onSave(block.id, { value: option })}
              style={{ left: pointOffset(index) }}
              className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            >
              <span
                className={[
                  "rounded-full transition-all",
                  selected ? "h-4 w-4 bg-navy" : "h-2 w-2 bg-muted/55",
                ].join(" ")}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>

      <div className="relative mt-1.5 h-4">
        <span
          className="absolute -translate-x-1/2 font-sans text-[13px] text-muted"
          style={{ left: TRACK_INSET_PX }}
        >
          {block.minLabel}
        </span>
        <span
          className="absolute translate-x-1/2 font-sans text-[13px] text-muted"
          style={{ right: TRACK_INSET_PX }}
        >
          {block.maxLabel}
        </span>
      </div>
    </div>
  );
}
