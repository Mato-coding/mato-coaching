interface ProgressBarProps {
  current: number; // 1-indexiert, die aktuell sichtbare Frage
  total: number;
  className?: string;
}

// Aus AssessmentForm.tsx extrahiert (Bau-Auftrag Feedback-Seite), damit
// FeedbackForm.tsx denselben Umber-Fortschrittsbalken nutzt statt ihn erneut
// zu bauen. Rendert identisch zur bisherigen Inline-Markup in AssessmentForm.
export default function ProgressBar({ current, total, className = "" }: ProgressBarProps) {
  const progress = Math.round(((current - 1) / total) * 100);

  return (
    <div className={`mb-10 ${className}`.trim()}>
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-muted">
          Frage {current} von {total}
        </span>
        <span className="text-sm text-muted">{progress}%</span>
      </div>
      <div className="h-px w-full bg-primary/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-umber transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
