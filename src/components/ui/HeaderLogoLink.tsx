"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { smoothScrollToTop } from "@/lib/scroll";

// Einziger Client-Teil des Headers: der Logo-Link braucht usePathname, um auf
// der Startseite sanft nach oben zu scrollen statt zu navigieren.
export default function HeaderLogoLink() {
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      smoothScrollToTop();
    }
  };

  return (
    <Link href="/" onClick={handleLogoClick} aria-label="Lasse Klüver, zur Startseite" className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm">
      {/* priority: Logo ist im fixen Header immer above-the-fold, next/image
          preloadet es dadurch wie bisher (matcht die bisherige <img>-Praxis).
          unoptimized: SVG, next/image-Optimierung würde hier nichts bringen. */}
      <Image src="/header-lockup-outlined.svg" alt="" aria-hidden="true" width={239} height={40} priority unoptimized className="hidden sm:block h-10 w-auto" />
      <Image src="/mark-symbol-tight.svg" alt="" aria-hidden="true" width={19} height={36} priority unoptimized className="block sm:hidden h-9 w-auto" />
      <span className="sr-only">Lasse Klüver. Somatic Breathwork und IFS Coaching.</span>
    </Link>
  );
}
