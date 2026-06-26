import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";

export default function Footer() {
  return (
    <footer className="bg-primary text-background py-12">
      <div className="mx-auto max-w-7xl px-6">

        {/* Markenname */}
        <div className="text-center mb-8">
          <LogoMark className="h-10 w-10 mx-auto mb-3" />
          <span className="font-serif text-background/90 text-lg font-medium">
            Lasse Klüver · Mato Coaching
            <p className="text-background/50 text-sm mt-2">
  Somatic Breathwork, Coaching & IFS · Hamburg und online
</p>
          </span>
        </div>

        {/* Disclaimer */}
        <div className="flex justify-center mb-8">
          <p className="text-background/50 text-xs leading-relaxed text-center max-w-md">
            Diese Arbeit dient der Persönlichkeitsentwicklung und
            Stressregulation und ersetzt keine psychotherapeutische oder
            ärztliche Behandlung.
          </p>
        </div>

        {/* Trennlinie mit Umber-Akzent */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="h-px flex-1 max-w-24 bg-background/10" aria-hidden="true" />
          <span className="h-px w-6 bg-umber" aria-hidden="true" />
          <span className="h-px flex-1 max-w-24 bg-background/10" aria-hidden="true" />
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row mb-8">
          <Link
            href="/journal"
            className="text-background/60 hover:text-background text-sm transition-colors"
          >
            Journal
          </Link>
          <Link
            href="/impressum"
            className="text-background/60 hover:text-background text-sm transition-colors"
          >
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            className="text-background/60 hover:text-background text-sm transition-colors"
          >
            Datenschutz
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-background/40 text-xs">
            © 2026 Lasse Klüver · Mato Coaching. Alle Rechte vorbehalten.
          </p>
        </div>

      </div>
    </footer>
  );
}