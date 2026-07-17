"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "loading" | "success" | "error";

export default function MagicLinkForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/programme`,
      },
    });

    if (error) {
      console.error("Magic link error:", error.message);
      setStatus("error");
      return;
    }

    // Always show the same neutral message, even for unknown addresses.
    setStatus("success");
  }

  if (status === "success") {
    return (
      <p className="font-sans text-body text-muted">
        Wenn deine Adresse registriert ist, findest du in wenigen Minuten einen
        Login-Link in deinem Postfach.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="sr-only">
          E-Mail-Adresse
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Deine E-Mail-Adresse"
          className="w-full rounded-md border border-primary/15 bg-surface px-4 py-3 font-sans text-primary outline-none transition focus:border-accent"
        />
      </div>

      {status === "error" && (
        <p className="font-sans text-small text-umber">
          Ein technisches Problem ist aufgetreten. Bitte versuche es erneut.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-md bg-accent px-6 py-3 font-sans text-background transition hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading" ? "Wird gesendet …" : "Login-Link senden"}
      </button>
    </form>
  );
}
