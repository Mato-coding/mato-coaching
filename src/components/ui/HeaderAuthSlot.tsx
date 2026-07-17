"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const stateClasses =
  "col-start-1 row-start-1 text-center transition-opacity duration-med ease-settle";

export default function HeaderAuthSlot() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data: { session } }) => {
      setLoggedIn(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const inProgramme = pathname?.startsWith("/programme") ?? false;
  const showTermin = !loggedIn;
  const showProgramme = loggedIn && !inProgramme;
  const showSignOut = loggedIn && inProgramme;

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setLoggedIn(false);
    router.push("/");
  }

  return (
    <span className="grid">
      <Link
        href="/termin"
        aria-hidden={!showTermin}
        tabIndex={showTermin ? undefined : -1}
        className={`${stateClasses} bg-accent text-background rounded-md px-5 py-2 text-sm font-medium hover:opacity-90 ${
          showTermin ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        Erstgespräch
      </Link>

      <Link
        href="/programme"
        aria-hidden={!showProgramme}
        tabIndex={showProgramme ? undefined : -1}
        className={`${stateClasses} bg-accent text-background rounded-md px-5 py-2 text-sm font-medium hover:opacity-90 ${
          showProgramme ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        Mein Programm
      </Link>

      <button
        type="button"
        onClick={handleSignOut}
        aria-hidden={!showSignOut}
        tabIndex={showSignOut ? undefined : -1}
        className={`${stateClasses} self-center text-muted hover:text-primary ${
          showSignOut ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        Abmelden
      </button>
    </span>
  );
}
