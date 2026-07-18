"use client";

import type { WorkbookBlock } from "@/lib/workbook-types";
import TextBlock from "@/components/workbook/blocks/TextBlock";
import FreetextBlock from "@/components/workbook/blocks/FreetextBlock";
import ScaleBlock from "@/components/workbook/blocks/ScaleBlock";
import ChoiceBlock from "@/components/workbook/blocks/ChoiceBlock";
import SaveIndicator, {
  type BlockSaveStatus,
} from "@/components/workbook/blocks/SaveIndicator";

interface BlockRendererProps {
  block: WorkbookBlock;
  value: unknown;
  questionNumber?: string;
  saveStatus?: BlockSaveStatus;
  onSave: (blockId: string, value: unknown) => void;
}

export default function BlockRenderer({
  block,
  value,
  questionNumber,
  saveStatus,
  onSave,
}: BlockRendererProps) {
  switch (block.type) {
    case "text":
      return <TextBlock block={block} />;
    case "freetext":
      return (
        <div>
          <FreetextBlock
            block={block}
            value={value as { text: string } | undefined}
            questionNumber={questionNumber ?? ""}
            onSave={onSave}
          />
          <SaveIndicator status={saveStatus} />
        </div>
      );
    case "scale":
      return (
        <div>
          <ScaleBlock
            block={block}
            value={value as { value: number } | undefined}
            questionNumber={questionNumber ?? ""}
            onSave={onSave}
          />
          <SaveIndicator status={saveStatus} />
        </div>
      );
    case "choice":
      return (
        <div>
          <ChoiceBlock
            block={block}
            value={value as { selected: string[] } | undefined}
            questionNumber={questionNumber ?? ""}
            onSave={onSave}
          />
          <SaveIndicator status={saveStatus} />
        </div>
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
