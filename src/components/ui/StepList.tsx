import ListMark from "@/components/ui/ListMark";

interface StepListItem {
  title: string;
  text: string;
}

interface StepListProps {
  items: StepListItem[];
  className?: string;
}

// Gemeinsame Schrittliste für BreathworkProcess.tsx und CoachingProgram.tsx:
// beide bauten dasselbe Muster (ListMark + fettes Titelwort + Fließtext,
// <ol> mit space-y-8) unabhängig voneinander nach (Audit 2.2). Breite kommt
// bewusst per className vom Aufrufer (i. d. R. max-w-measure), nicht fest
// verdrahtet, analog zu den übrigen Textspalten-Ausnahmen.
export default function StepList({ items, className = "" }: StepListProps) {
  return (
    <ol className={`space-y-8 ${className}`.trim()}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-6 text-lg leading-relaxed">
          <ListMark />
          <p className="text-primary/80 text-lg leading-relaxed">
            <strong className="font-medium text-primary">{item.title}</strong>{" "}
            {item.text}
          </p>
        </li>
      ))}
    </ol>
  );
}
