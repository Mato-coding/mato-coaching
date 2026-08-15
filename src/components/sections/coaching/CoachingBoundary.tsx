import Section from "@/components/ui/Section";

// size="compact" (py-10 md:py-12) entspricht exakt dem bisherigen,
// abweichenden Padding dieser Sektion, siehe design-system.md Abschnitt 3.
export default function CoachingBoundary() {
  return (
    <Section size="compact" className="bg-surface">
      {/*
        Bewusst kein Container-Primitive: diese Textspalte ist max-w-2xl
        (672px), keine der drei Container-Breiten (prose/narrow/default)
        trifft diesen Wert, siehe CTA.tsx.
      */}
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-muted text-sm leading-relaxed">
          Diese Begleitung ist Persönlichkeitsentwicklung und
          Stressregulation. Sie ersetzt keine psychotherapeutische oder
          ärztliche Behandlung. Wenn du in einer akuten Krise bist, ist ein
          Erstgespräch trotzdem willkommen, dann klären wir gemeinsam, welche
          Unterstützung du jetzt wirklich brauchst.
        </p>
      </div>
    </Section>
  );
}
