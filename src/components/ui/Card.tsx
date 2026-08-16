import { ReactNode } from "react";

type CardPadding = "compact" | "default" | "large";

interface CardProps {
  padding?: CardPadding;
  className?: string;
  children: ReactNode;
}

const paddingClasses: Record<CardPadding, string> = {
  compact: "p-4",
  default: "p-6",
  large: "p-8 md:p-10",
};

export default function Card({
  padding = "default",
  className = "",
  children,
}: CardProps) {
  return (
    <div
      className={`rounded-md border border-hairline bg-surface ${paddingClasses[padding]} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
