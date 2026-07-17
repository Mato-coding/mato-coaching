interface ProgressBarProps {
  label: string;
  value: number; // 0 bis 100
}

export default function ProgressBar({ label, value }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-muted">{label}</span>
        <span className="text-sm text-muted">{clamped}%</span>
      </div>
      <div className="h-px w-full overflow-hidden rounded-full bg-primary/10">
        <div
          className="h-full bg-umber transition-all duration-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
