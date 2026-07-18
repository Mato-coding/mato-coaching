import type { TextBlock as TextBlockConfig } from "@/lib/workbook-types";

export default function TextBlock({ block }: { block: TextBlockConfig }) {
  return (
    <div className="space-y-4 font-sans text-[16px] leading-body text-ink md:text-body">
      {block.content.split("\n\n").map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}
