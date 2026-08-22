"use client";

interface TextLinkButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

// Leiser Text-Link als Button (kein href, löst nur eine Aktion aus), Optik
// text-sm text-muted underline underline-offset-2 hover:text-accent.
// Aktuell genutzt für den gemeinsamen Skip-Link im Feedback-Formular
// (FeedbackForm.tsx, überspringbare Schritte format/descriptors/best/
// improve), als Primitive statt einer pro-Schritt-Lösung.
export default function TextLinkButton({
  label,
  onClick,
  disabled = false,
  className = "",
}: TextLinkButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`text-sm text-muted underline underline-offset-2 transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:no-underline ${className}`.trim()}
    >
      {label}
    </button>
  );
}
