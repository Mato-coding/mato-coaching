import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "default" | "small";

interface ButtonProps {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
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
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()}
    >
      {children}
    </Link>
  );
}
