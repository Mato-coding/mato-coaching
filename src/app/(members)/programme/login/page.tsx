import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";
import OtpLoginForm from "@/components/forms/OtpLoginForm";

export const metadata = {
  title: "Anmelden",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/programme");
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2">
          <h1 className="font-serif text-h1 font-medium leading-h1 text-ink">
            Anmelden
          </h1>
          <p className="font-sans text-body text-muted">
            Dieser Bereich ist für Klienten der 1:1-Begleitung. Den
            Zugangscode erhältst du per E-Mail.
          </p>
          <p className="font-sans text-body text-muted">
            Gib die E-Mail-Adresse ein, mit der du zur Begleitung angemeldet
            bist. Du bekommst einen 6-stelligen Code per Mail.
          </p>
        </div>

        <Suspense>
          <OtpLoginForm />
        </Suspense>

        <p className="pt-4 font-sans text-small text-muted">
          Du bist noch kein Klient?{" "}
          <Link
            href="/termin"
            className="underline underline-offset-2 hover:text-ink transition-colors"
          >
            Vereinbare ein Erstgespräch.
          </Link>
        </p>
      </div>
    </div>
  );
}
