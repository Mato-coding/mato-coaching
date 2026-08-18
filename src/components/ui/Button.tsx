import Link from "next/link";
import { MouseEventHandler, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "default" | "small";

interface ButtonProps {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  // Optional, für Client-Wrapper wie AnchorScrollLink.tsx, die den
  // Button-Look übernehmen, aber ihr eigenes Klick-Verhalten brauchen
  // (Anker sanft anscrollen statt hart zu springen).
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

// Klassenketten 1:1 aus den bisherigen Fundstellen übernommen (Audit 2.2).
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-background rounded-md font-medium hover:opacity-90 transition-opacity",
  secondary:
    "border border-accent/25 text-accent rounded-md font-medium hover:border-accent/50 transition-colors",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "px-8 py-4",
  small: "px-5 py-2 text-sm",
};

export default function Button({
  href,
  variant = "primary",
  size = "default",
  className = "",
  children,
  onClick,
}: ButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()}
    >
      {children}
    </Link>
  );
}
