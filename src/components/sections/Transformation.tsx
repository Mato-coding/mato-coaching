import FadeIn from "../ui/FadeIn";

const benefits = [
  "Wieder tief schlafen und morgens erholt aufwachen.",
  "Körperliche und mentale Erschöpfung durch echte Regeneration ersetzen.",
  "Den engen Tunnelblick verlassen und wieder Weite und echte Verbindung spüren.",
];

export default function Transformation() {
  return (
    <section className="bg-background px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">

        {/* Eyebrow mit Umber-Signature */}
        <FadeIn>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-6 bg-umber" aria-hidden="true" />
            <span className="text-sm font-medium tracking-[0.15em] uppercase text-muted">
              Das Ziel
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary mb-6 leading-[1.15]">
            Zurück in ein Leben, das von Klarheit statt von Alarm geführt wird.
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-primary/80 text-lg leading-relaxed mb-10">
            Symptomlinderung kratzt nur an der Oberfläche. Das Ziel unserer
            Arbeit ist nicht, dich wieder „funktionstüchtig" für den Stress zu
            machen. Es geht darum, dein Nervensystem nachhaltig zu entlasten —
            damit du aus dem Überlebensmodus herausfindest und wieder wirklich
            präsent sein kannst.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <ul className="space-y-5">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-4">
                {/* Umber-Strich statt Check-Icon: ruhiger, weniger generisch */}
                <span
                  className="mt-[0.6em] h-px w-4 shrink-0 bg-umber"
                  aria-hidden="true"
                />
                <span className="text-primary/90 text-lg leading-relaxed">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </FadeIn>

      </div>
    </section>
  );
}
