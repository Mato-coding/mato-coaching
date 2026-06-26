"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { smoothScrollToTop } from "@/lib/scroll";

export default function Header() {
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      smoothScrollToTop();
    }
  };

  return (
    <header className="bg-background/95 border-primary/5 fixed top-0 z-50 w-full border-b py-5 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">

        {/* Header-Lockup SVG */}
        <Link href="/" onClick={handleLogoClick} aria-label="Lasse Klüver, zur Startseite" className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm">
          <img src="/header-lockup-outlined.svg" alt="" aria-hidden="true" className="hidden sm:block h-10 w-auto" />
          <img src="/mark-symbol-tight.svg" alt="" aria-hidden="true" className="block sm:hidden h-9 w-auto" />
          <span className="sr-only">Lasse Klüver. Somatic Breathwork und IFS Coaching.</span>
        </Link>

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