"use client";

import { MouseEvent, ReactNode } from "react";
import Button from "@/components/ui/Button";
import { scrollElementToTop } from "@/lib/scroll";

interface AnchorScrollLinkProps {
  anchorId: string;
  className?: string;
  children: ReactNode;
}

// Für Inpage-Anker-Buttons auf derselben Seite (z. B. CoachingHero →
// PROGRAMM_ANCHOR, BreathworkHero → AUDIO_RESET_ANCHOR). Reine href="#..."-
// Links springen hart und lösen bei erneutem Klick auf denselben Hash kein
// zweites Scroll-Ereignis mehr aus. Diese Komponente scrollt stattdessen
// über scrollElementToTop (src/lib/scroll.ts, dieselbe Utility wie
// AssessmentForm.tsx/AssessmentResult.tsx) und hängt den Hash erst danach
// per history.replaceState an, damit Scroll und URL-Zustand entkoppelt
// sind und jeder Klick unabhängig vom aktuellen Hash funktioniert.
// href="#..." bleibt als Fallback ohne JavaScript erhalten. Rendert intern
// das Button-Primitive, übernimmt also unverändert dessen Sekundärbutton-Look.
export default function AnchorScrollLink({
  anchorId,
  className = "",
  children,
}: AnchorScrollLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(anchorId);
    if (!target) return;

    e.preventDefault();
    scrollElementToTop(target);
    window.history.replaceState(null, "", `#${anchorId}`);
  };

  return (
    <Button
      href={`#${anchorId}`}
      variant="secondary"
      onClick={handleClick}
      className={className}
    >
      {children}
    </Button>
  );
}
