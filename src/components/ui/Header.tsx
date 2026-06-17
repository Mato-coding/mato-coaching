import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-background/95 border-primary/5 fixed top-0 z-50 w-full border-b py-2 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">

        {/* Logo-Symbol + Schriftzug */}
        <Link href="/" className="flex items-center gap-3.5">
          <Image
            src="/logo.svg"
            alt=""
            width={32}
            height={32}
            priority
            className="h-16 w-auto"
            style={{ width: "auto" }}   
             />
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