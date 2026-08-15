interface ListMarkProps {
  width?: string;
  className?: string;
}

// Umber-Hairline-Strich vor Listen- und Schrittpunkten. Der äußere Wrapper
// ist exakt eine Zeile hoch (h-[1lh]) und zentriert den Strich per
// items-center darin — das bildet verlässlich die vertikale Mitte der
// ersten Textzeile ab, unabhängig von Schriftgröße und Zeilenhöhe. Kein
// margin-top-Raten mehr.
//
// Voraussetzung am Aufrufer: das gemeinsame Elternelement (i. d. R. das
// <li>) trägt dieselbe Schriftgrößen-/Zeilenhöhen-Klasse wie der Text
// daneben, sonst bezieht sich 1lh auf die falsche Zeilenhöhe.
export default function ListMark({ width = "w-6", className = "" }: ListMarkProps) {
  return (
    <span
      className={`flex h-[1lh] shrink-0 items-center ${className}`.trim()}
      aria-hidden="true"
    >
      <span className={`h-px ${width} bg-umber`} />
    </span>
  );
}
