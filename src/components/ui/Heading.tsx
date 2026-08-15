import { ElementType, ReactNode } from "react";

type HeadingVariant = "display" | "display-sub" | "section" | "emphasis";

interface HeadingProps {
  variant: HeadingVariant;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

// display = heutige Hero-Größe (text-5xl/6xl/7xl), section = heutige
// H2-Kette (text-3xl/4xl). emphasis ist auf Mobil identisch mit section,
// ab md eine Stufe größer (48px, bisher Cause.tsx' md:text-5xl) — für
// einzelne Sektionen, die bewusst stärker betont werden sollen. display-sub
// ist die kleinere Hero-Stufe ohne lg-Sprung (bisher BreathworkHero.tsx' und
// coaching/page.tsx' identisches, handgesetztes text-5xl md:text-6xl):
// beide Service-Hero-H1 nutzen dieselben Größen wie display, wachsen aber ab
// lg nicht weiter auf 72px. Größen und Zeilenhöhen kommen aus den
// Type-Scale-Tokens in globals.css.
const variantClasses: Record<HeadingVariant, string> = {
  display:
    "font-serif text-display md:text-display-md lg:text-display-lg font-medium text-primary leading-display",
  "display-sub":
    "font-serif text-display md:text-display-md font-medium text-primary leading-display",
  section:
    "font-serif text-h2 md:text-h2-md font-medium text-primary leading-h2",
  emphasis:
    "font-serif text-h2 md:text-h2-emphasis-md font-medium text-primary leading-h2",
};

const defaultTags: Record<HeadingVariant, ElementType> = {
  display: "h1",
  "display-sub": "h1",
  section: "h2",
  emphasis: "h2",
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
