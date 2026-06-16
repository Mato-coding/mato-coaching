function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

export default function Transformation() {
  const benefits = [
    "Wieder tief schlafen und morgens erholt aufwachen.",
    "Körperliche und mentale Erschöpfung durch echte Regeneration ersetzen.",
    "Den engen Tunnelblick verlassen und wieder Weite und echte Verbindung spüren.",
  ];

  return (
    <section className="bg-background px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-primary mb-6 text-3xl font-medium md:text-4xl">
          Zurück in ein Leben, das von Klarheit statt von Alarm geführt wird.
        </h2>
        
        <p className="text-primary/80 mb-8 text-lg">
          Symptombehandlung kratzt nur an der Oberfläche. Das Ziel unserer Arbeit
          ist nicht, dich wieder „funktionstüchtig“ für den Stress zu machen. Es
          geht darum, das dysregulierte Nervensystem nachhaltig zu entlasten.
        </p>

        <ul className="space-y-4">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckIcon className="text-accent mt-1 h-5 w-5 shrink-0" />
              <span className="text-primary/90 text-lg">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}