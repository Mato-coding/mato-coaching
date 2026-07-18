"use client";

import { useEffect, useRef, useState } from "react";
import type { FreetextBlock as FreetextBlockConfig } from "@/lib/workbook-types";
import QuestionHeader from "@/components/workbook/blocks/QuestionHeader";

interface FreetextBlockProps {
  block: FreetextBlockConfig;
  value?: { text: string };
  questionNumber: string;
  onSave: (blockId: string, value: { text: string }) => void;
}

const AUTOSAVE_DELAY_MS = 800;

export default function FreetextBlock({
  block,
  value,
  questionNumber,
  onSave,
}: FreetextBlockProps) {
  const [text, setText] = useState(value?.text ?? "");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function handleChange(next: string) {
    setText(next);
    if (timerRef.current) clearTimeout(timerRef.current);

    // Leere Eingaben nicht speichern, um keine leeren Antwort-Zeilen anzulegen.
    if (!next.trim()) return;

    timerRef.current = setTimeout(() => {
      onSave(block.id, { text: next });
    }, AUTOSAVE_DELAY_MS);
  }

  return (
    <div>
      <QuestionHeader number={questionNumber} question={block.question} />
      <textarea
        id={block.id}
        value={text}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={block.placeholder}
        style={{ minHeight: `${block.minHeight ?? 100}px` }}
        className="mt-3 w-full resize-none bg-transparent px-0 pt-2 pb-3 font-sans text-[17px] leading-body text-ink outline-none transition-shadow duration-200 placeholder:text-muted/65 md:text-[18px] [box-shadow:inset_0_-1px_0_var(--color-hairline)] focus:[box-shadow:inset_0_-2px_0_var(--color-navy)]"
      />
    </div>
  );
}
