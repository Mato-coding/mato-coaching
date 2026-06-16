import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-background py-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Obere Reihe: Navigation */}
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
          <Link
            href="/impressum"
            className="text-background/80 hover:text-background text-sm transition-colors"
          >
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            className="text-background/80 hover:text-background text-sm transition-colors"
          >
            Datenschutz
          </Link>
        </div>

        {/* Untere Reihe: Copyright */}
        <div className="border-background/10 mt-8 border-t pt-8 text-center">
          <p className="text-background/60 text-xs">
            © 2026 Lasse Klüver. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}