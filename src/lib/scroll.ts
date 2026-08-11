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
