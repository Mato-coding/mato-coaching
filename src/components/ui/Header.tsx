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

        {/* Logo-Symbol + Wortmarke */}
        <Link href="/" onClick={handleLogoClick} aria-label="Lasse Klüver, zur Startseite" className="flex items-center gap-3.5">
          <LogoMark className="h-8 w-8 text-navy" />
          <span className="flex flex-col">
            <span className="font-serif text-primary text-xl font-medium leading-tight">
              Lasse Klüver
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <span className="h-px w-4 bg-umber shrink-0" aria-hidden="true" />
              <span className="font-sans font-medium uppercase text-muted text-[0.8125rem] tracking-[0.12em]">
                Somatic Breathwork · IFS Coaching
              </span>
            </span>
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