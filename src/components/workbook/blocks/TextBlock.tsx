import type { TextBlock as TextBlockConfig } from "@/lib/workbook-types";

export default function TextBlock({ block }: { block: TextBlockConfig }) {
  return (
    <div className="max-w-[68ch] space-y-4 font-sans text-body leading-body text-ink">
      {block.content.split("\n\n").map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}
