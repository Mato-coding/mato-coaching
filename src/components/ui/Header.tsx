import Link from "next/link";
import HeaderLogoLink from "@/components/ui/HeaderLogoLink";

// Server-Komponente: nur der Logo-Link braucht Client-JS (usePathname plus
// smoothScrollToTop), siehe HeaderLogoLink.tsx. Der Rest des Headers bleibt
// statisch und läuft ohne eigenes Client-Bundle auf jeder Seite mit.
export default function Header() {
  return (
    <header className="bg-background/95 border-b border-hairline fixed top-0 z-50 w-full py-5 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">

        <HeaderLogoLink />

        {/* Primär-CTA */}
        <Link
          href="/termin"
          className="bg-accent text-background rounded-md px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Erstgespräch
        </Link>

      </div>
    </header>
  );
}
