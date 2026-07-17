"use client";

import { useEffect, useRef, useState } from "react";
import type { FreetextBlock as FreetextBlockConfig } from "@/lib/workbook-types";

interface FreetextBlockProps {
  block: FreetextBlockConfig;
  value?: { text: string };
  onSave: (blockId: string, value: { text: string }) => void;
}

const AUTOSAVE_DELAY_MS = 800;

export default function FreetextBlock({
  block,
  value,
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
    <div className="space-y-3">
      <label
        htmlFor={block.id}
        className="block font-sans text-body text-ink"
      >
        {block.question}
      </label>
      <textarea
        id={block.id}
        value={text}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={block.placeholder}
        style={block.minHeight ? { minHeight: `${block.minHeight}px` } : undefined}
        className="w-full rounded-md border border-ink/15 bg-surface px-4 py-3 font-sans text-body text-ink outline-none transition focus:border-navy"
      />
    </div>
  );
}
