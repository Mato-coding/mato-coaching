import type { Metadata } from "next";
import Link from "next/link";
import { signOut } from "./programme/actions";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <header className="border-b border-hairline px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            href="/programme"
            className="font-sans text-sm font-medium tracking-wide text-ink hover:opacity-70 transition-opacity"
          >
            Lasse Klüver
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="font-sans text-sm text-muted hover:text-ink transition-colors"
            >
              Abmelden
            </button>
          </form>
        </div>
      </header>

      <main className="flex-1 px-6 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">{children}</div>
      </main>

      <footer className="border-t border-hairline px-6 py-6">
        <p className="text-center font-sans text-small text-muted">
          Lasse Klüver
        </p>
      </footer>
    </div>
  );
}
