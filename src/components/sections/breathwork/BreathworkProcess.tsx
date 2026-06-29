import FadeIn from "@/components/ui/FadeIn";
import Eyebrow from "@/components/ui/Eyebrow";

const steps = [
  {
    title: "Ankommen.",
    body: "Wir klären kurz, wie es dir geht und worauf wir achten. Du liegst bequem, nichts musst du können oder vorbereiten.",
  },
  {
    /* TODO Dauer: Sitzungsdauer 1:1 eintragen, z.B. "90 Minuten" */
    title: "Atmen.",
    body: "Über etwa {{DAUER_1ZU1}} führe ich dich durch die Atemarbeit. Musik trägt den Prozess, ich bleibe die ganze Zeit an deiner Seite.",
  },
  {
    title: "Nachklang.",
    body: "Am Ende kommst du in Stille an und wir geben dem Erlebten Raum. Was auftaucht, ordnen wir gemeinsam ein.",
  },
];

export default function BreathworkProcess() {
  return (
    <section className="bg-surface px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <Eyebrow label="Ablauf" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary leading-[1.15] mb-10">
            Wie eine Sitzung abläuft
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <ol className="space-y-8 max-w-[68ch]">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-6">
                <span
                  className="mt-[0.65em] h-px w-6 shrink-0 bg-umber"
                  aria-hidden="true"
                />
                <p className="text-primary/80 text-lg leading-relaxed">
                  <strong className="font-medium text-primary">{step.title}</strong>{" "}
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="mt-10 text-primary/60 text-base leading-relaxed max-w-[68ch]">
            Einzeln arbeiten wir ganz in deinem Tempo. In der Gruppe trägt
            zusätzlich die gemeinsame Erfahrung.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
