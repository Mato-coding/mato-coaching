export function smoothScrollToTop(duration = 2000) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, 0);
    return;
  }
  const start = window.scrollY;
  const startTime = performance.now();
  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function step(now: number) {
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, start * (1 - easeInOutCubic(progress)));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// Scrollt so weit, dass das übergebene Element (abzüglich eines festen
// Kopfabstands für den fixen Header) oben im Viewport steht. Respektiert
// prefers-reduced-motion mit einem direkten Sprung statt einer Animation.
export function scrollElementToTop(el: HTMLElement, offset = 100) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: y, behavior: prefersReducedMotion ? "auto" : "smooth" });
}

// Scrollt das übergebene Element nur nach, wenn es unter md
// (window.matchMedia("(max-width: 767px)")) nicht vollständig im Viewport
// steht, z. B. ein Weiter-Button, der nach einer Auswahl verdeckt bleibt.
// Der 16px-Abstand nach unten kommt aus einer scroll-margin-bottom-Klasse am
// Element selbst (scroll-mb-4), nicht aus einem Offset-Parameter hier.
// Respektiert prefers-reduced-motion mit einem direkten Sprung.
export function scrollIntoViewIfHidden(el: HTMLElement) {
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  if (!isMobile) return;

  const rect = el.getBoundingClientRect();
  const fullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
  if (fullyVisible) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "end" });
}
