"use client";

import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";
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
    <header className="bg-background/95 border-primary/5 fixed top-0 z-50 w-full border-b py-2 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">

        {/* Logo-Symbol + Schriftzug */}
        <Link href="/" onClick={handleLogoClick} aria-label="Zur Startseite" className="flex items-center gap-3.5">
          <LogoMark className="h-8 w-8 text-navy" />
          <span className="font-serif text-primary text-xl font-medium">
            Mato Coaching
          </span>
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