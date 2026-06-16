import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-background/95 border-primary/5 fixed top-0 z-50 w-full border-b py-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">

        {/* Logo / Name in Spectral */}
        <Link href="/" className="font-serif text-primary text-lg font-medium">
          Lasse Klüver
        </Link>

        {/* Primär-CTA — konsistent mit allen anderen Buttons */}
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