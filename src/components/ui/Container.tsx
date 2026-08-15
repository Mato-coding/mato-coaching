import { ReactNode } from "react";

type ContainerWidth = "prose" | "narrow" | "default";

interface ContainerProps {
  width?: ContainerWidth;
  className?: string;
  children: ReactNode;
}

// default nutzt --container-content (1140px), prose nutzt --container-measure
// (68ch). narrow bleibt bewusst der eingebaute Tailwind-Wert max-w-3xl (48rem).
const widthClasses: Record<ContainerWidth, string> = {
  default: "max-w-content",
  narrow: "max-w-3xl",
  prose: "max-w-measure",
};

export default function Container({
  width = "default",
  className = "",
  children,
}: ContainerProps) {
  return (
    <div className={`mx-auto ${widthClasses[width]} ${className}`.trim()}>
      {children}
    </div>
  );
}
