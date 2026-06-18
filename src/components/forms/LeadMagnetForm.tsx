"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function LeadMagnetForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, consent }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Etwas ist schiefgelaufen.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setMessage("Etwas ist schiefgelaufen. Bitte versuche es später erneut.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-md border border-umber/30 bg-surface p-8 text-center">
        <p className="font-display text-2xl text-accent">Schau in dein Postfach</p>
        <p className="mt-3 text-muted">
          Dein Audio ist unterwegs zu dir. Falls es nicht gleich da ist, wirf
          auch einen Blick in den Spam-Ordner.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="sr-only">
          Vorname
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Vorname (optional)"
          className="w-full rounded-md border border-primary/15 bg-surface px-4 py-3 text-primary outline-none transition focus:border-accent"
        />
      </div>

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
          className="w-full rounded-md border border-primary/15 bg-surface px-4 py-3 text-primary outline-none transition focus:border-accent"
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-muted">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-accent"
        />
        <span>
          Ja, schick mir das Audio per E-Mail. Ich bin damit einverstanden, dass
          meine Angaben zu diesem Zweck gespeichert werden. Mehr dazu in der{" "}
          <a href="/datenschutz" className="underline hover:text-accent">
            Datenschutzerklärung
          </a>
          .
        </span>
      </label>

      {status === "error" && (
        <p className="text-sm text-umber">{message}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-md bg-accent px-6 py-3 text-background transition hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading" ? "Wird gesendet …" : "Audio kostenlos erhalten"}
      </button>
    </form>
  );
}
