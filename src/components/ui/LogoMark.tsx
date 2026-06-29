type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 120 175"
      fill="none"
      stroke="currentColor"
      strokeWidth={5}
      strokeLinecap="butt"
      className={className}
      aria-hidden="true"
    >
      <line x1="60" y1="27.5" x2="60" y2="113.5" />
      <line x1="60" y1="122.5" x2="60" y2="168.5" />
      <path d="M 65.45 48.43 A 35 35 0 1 1 54.55 48.43" />
    </svg>
  );
}
