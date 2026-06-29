interface EyebrowProps {
  label: string;
  align?: "left" | "center";
}

export default function Eyebrow({ label, align = "left" }: EyebrowProps) {
  return (
    <div
      className={`flex items-center gap-3 mb-6 ${align === "center" ? "justify-center" : ""}`}
    >
      <span className="h-px w-6 shrink-0 bg-umber" aria-hidden="true" />
      <span className="text-sm font-medium tracking-[0.15em] uppercase text-muted">
        {label}
      </span>
      {align === "center" && (
        <span className="h-px w-6 shrink-0 bg-umber" aria-hidden="true" />
      )}
    </div>
  );
}
