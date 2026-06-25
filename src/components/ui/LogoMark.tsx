type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      stroke="currentColor"
      strokeWidth={4.5}
      strokeLinecap="butt"
      className={className}
      aria-hidden="true"
    >
      <path d="M80 16V94" />
      <path d="M80 102V144" />
      <path d="M84.9 35A31.8 31.8 0 1 1 75.1 35" />
    </svg>
  );
}
