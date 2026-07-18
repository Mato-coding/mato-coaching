"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { smoothScrollToTop } from "@/lib/scroll";
import HeaderAuthSlot from "@/components/ui/HeaderAuthSlot";

export default function Header() {
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      smoothScrollToTop();
    }
  };

  const inWorkbook = pathname?.startsWith("/programme") ?? false;

  return (
    <header className="bg-background/95 border-primary/5 fixed top-0 z-50 w-full border-b py-5 backdrop-blur-md">
      <div
        className={[
          "mx-auto flex items-center justify-between",
          inWorkbook ? "max-w-[1140px] px-5 md:px-6" : "max-w-7xl px-6",
        ].join(" ")}
      >

        {/* Header-Lockup SVG */}
        <Link href="/" onClick={handleLogoClick} aria-label="Lasse Klüver, zur Startseite" className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm">
          <img src="/header-lockup-outlined.svg" alt="" aria-hidden="true" width="239" height="40" className="hidden sm:block h-10 w-auto" />
          <img src="/mark-symbol-tight.svg" alt="" aria-hidden="true" width="19" height="36" className="block sm:hidden h-9 w-auto" />
          <span className="sr-only">Lasse Klüver. Somatic Breathwork und IFS Coaching.</span>
        </Link>

        {/* Primär-CTA / Auth-Status */}
        <HeaderAuthSlot />

      </div>
    </header>
  );
}