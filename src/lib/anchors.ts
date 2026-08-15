// Zentrale Anchor-Konstanten für Inpage-Sprungziele. Jede ID wird an genau
// einer Stelle definiert (Section id={...} bzw. <section id={...}>) und an
// allen Link-Stellen (href="#...", href="/#...") über dieselbe Konstante
// referenziert, statt als wörtlicher String mehrfach abgetippt zu werden.
// Die ID-Werte selbst bleiben unverändert, damit keine bestehenden Links
// (auch nicht von außerhalb verlinkte, z. B. Suchmaschinen-Sprungmarken)
// brechen.

// LeadMagnet.tsx auf der Startseite. /coaching verlinkt cross-page per
// href={`/#${AUDIO_ANCHOR}`} darauf.
export const AUDIO_ANCHOR = "audio";

// BreathworkAudio.tsx auf /breathwork. BreathworkHero verlinkt intern per
// href={`#${AUDIO_RESET_ANCHOR}`} darauf. Eigene ID statt AUDIO_ANCHOR, weil
// /breathwork eine eigene, gesondert getextete Audio-Sektion hat.
export const AUDIO_RESET_ANCHOR = "audio-reset";

// CoachingProgram.tsx auf /coaching. CoachingHero verlinkt intern per
// href={`#${PROGRAMM_ANCHOR}`} darauf.
export const PROGRAMM_ANCHOR = "programm";
