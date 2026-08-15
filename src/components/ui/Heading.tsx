import { ElementType, ReactNode } from "react";

type HeadingVariant = "display" | "section";

interface HeadingProps {
  variant: HeadingVariant;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

// display = heutige Hero-Größe (text-5xl/6xl/7xl), section = heutige
// H2-Kette (text-3xl/4xl). Größen und Zeilenhöhen kommen aus den
// Type-Scale-Tokens in globals.css.
const variantClasses: Record<HeadingVariant, string> = {
  display:
    "font-serif text-display md:text-display-md lg:text-display-lg font-medium text-primary leading-display",
  section:
    "font-serif text-h2 md:text-h2-md font-medium text-primary leading-h2",
};

const defaultTags: Record<HeadingVariant, ElementType> = {
  display: "h1",
  section: "h2",
};

export default function Heading({
  variant,
  as,
  className = "",
  children,
}: HeadingProps) {
  const Tag = as ?? defaultTags[variant];

  return (
    <Tag className={`${variantClasses[variant]} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
