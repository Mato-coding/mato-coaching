export default function NoAccessNotice() {
  return (
    <div className="space-y-3 rounded-md border border-hairline bg-surface p-8 text-center">
      <p className="font-serif text-h2 font-medium leading-h2 text-ink">
        Dein Zugang ist noch nicht freigeschaltet.
      </p>
      <p className="font-sans text-body text-muted">
        Melde dich bei Lasse, damit er deinen Bereich freischaltet.
      </p>
    </div>
  );
}
