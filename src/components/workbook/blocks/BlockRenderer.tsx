"use client";

import type { WorkbookBlock } from "@/lib/workbook-types";
import TextBlock from "@/components/workbook/blocks/TextBlock";
import FreetextBlock from "@/components/workbook/blocks/FreetextBlock";
import ScaleBlock from "@/components/workbook/blocks/ScaleBlock";
import ChoiceBlock from "@/components/workbook/blocks/ChoiceBlock";

interface BlockRendererProps {
  block: WorkbookBlock;
  value: unknown;
  onSave: (blockId: string, value: unknown) => void;
}

export default function BlockRenderer({
  block,
  value,
  onSave,
}: BlockRendererProps) {
  switch (block.type) {
    case "text":
      return <TextBlock block={block} />;
    case "freetext":
      return (
        <FreetextBlock
          block={block}
          value={value as { text: string } | undefined}
          onSave={onSave}
        />
      );
    case "scale":
      return (
        <ScaleBlock
          block={block}
          value={value as { value: number } | undefined}
          onSave={onSave}
        />
      );
    case "choice":
      return (
        <ChoiceBlock
          block={block}
          value={value as { selected: string[] } | undefined}
          onSave={onSave}
        />
      );
    default:
      return (
        <div className="rounded-md border border-hairline bg-surface p-6">
          <p className="font-sans text-small text-muted">
            Dieser Baustein folgt in einem späteren Schritt.
          </p>
        </div>
      );
  }
}
