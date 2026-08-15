import { ReactNode } from "react";

type SectionSize = "compact" | "default" | "spacious";

interface SectionProps {
  size?: SectionSize;
  id?: string;
  className?: string;
  children: ReactNode;
}

// Vertikales Padding je Stufe, siehe design-system.md Abschnitt 3.
const sizeClasses: Record<SectionSize, string> = {
  compact: "py-10 md:py-12",
  default: "py-16 md:py-24",
  spacious: "py-24 md:py-40",
};

export default function Section({
  size = "default",
  id,
  className = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`px-6 ${sizeClasses[size]} ${className}`.trim()}
    >
      {children}
    </section>
  );
}
