"use client";

import { useEffect, useState } from "react";

export type BlockSaveState = "idle" | "saved" | "error";

export interface BlockSaveStatus {
  state: BlockSaveState;
  /** Erhöht sich bei jedem Speichervorgang, damit ein erneutes "saved" die
   * Ausblende-Uhr auch dann neu startet, wenn der Zustand unverändert bleibt. */
  token: number;
}

const IDLE_STATUS: BlockSaveStatus = { state: "idle", token: 0 };

interface SaveIndicatorProps {
  status?: BlockSaveStatus;
}

export default function SaveIndicator({
  status = IDLE_STATUS,
}: SaveIndicatorProps) {
  return (
    <div className="min-h-5.25 text-right" aria-live="polite">
      {status.state !== "idle" && (
        <SaveIndicatorMessage
          key={`${status.state}-${status.token}`}
          status={status}
        />
      )}
    </div>
  );
}

function SaveIndicatorMessage({ status }: { status: BlockSaveStatus }) {
  // Neu gemountet bei jedem Status-/Token-Wechsel (siehe key oben), startet
  // deshalb direkt sichtbar; der Effekt blendet nach 2s asynchron aus.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (status.state !== "saved") return;
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, [status.state]);

  const text =
    status.state === "error"
      ? "Speichern fehlgeschlagen, wird erneut versucht"
      : "Gespeichert";

  return (
    <span
      className={[
        "font-sans text-[13px] text-muted transition-opacity duration-med ease-settle",
        visible ? "opacity-100" : "opacity-0",
      ].join(" ")}
    >
      {text}
    </span>
  );
}
