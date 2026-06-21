"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type Status = "idle" | "loading" | "success" | "error";

export default function LeadMagnetForm({
  autoFocus = false,
  source = "lead_magnet",
  assessmentCluster = null,
  assessmentResult = null,
  onSuccess,
}: {
  autoFocus?: boolean;
  source?: string;
  assessmentCluster?: string | null;
  assessmentResult?: string | null;
  onSuccess?: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Beim Einblenden sanft hinscrollen und den Cursor ins erste Feld setzen.
  useEffect(() => {
    if (autoFocus && nameRef.current) {
      nameRef.current.focus({ preventScroll: true });
      nameRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [autoFocus]);

  // Bei Erfolg so weit nach oben scrollen, dass Eyebrow und Überschrift sichtbar sind.
  useEffect(() => {
    if (status === "success") {
      onSuccess?.();
      if (rootRef.current) {
        const section = rootRef.current.closest("section");
        const target = section ?? rootRef.current;
        const y = target.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          consent,
          source,
          pagePath: window.location.pathname,
          referrer: document.referrer,
          assessmentCluster,
          assessmentResult,
        }),
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

  return (
    <div ref={rootRef}>
      {status === "success" ? (
        <div className="rounded-md border border-umber/30 bg-surface p-8 text-center">
          <p className="font-display text-2xl text-accent">Schau in dein Postfach</p>
          <p className="mt-3 text-muted">
            Dein Audio ist unterwegs zu dir. Falls es nicht gleich da ist, wirf
            auch einen Blick in den Spam-Ordner.
          </p>

          <div className="mt-8 border-t border-umber/20 pt-8 text-left">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-6 bg-umber" aria-hidden="true" />
              <span className="text-sm uppercase tracking-widest text-umber">
                Wie es für dich weitergehen kann
              </span>
            </div>

            <ul className="space-y-4">
              <li>
                <p className="text-muted">
                  Im Journal findest du Hintergründe zu Nervensystem, Somatic
                  Breathwork und innerer Ruhe.
                </p>
                <Link
                  href="/journal"
                  className="text-accent underline underline-offset-2 hover:opacity-80"
                >
                  Zum Journal
                </Link>
              </li>
              <li>
                <p className="text-muted">
                  Wenn du spürst, dass du dir Begleitung wünschst, lass uns
                  unverbindlich sprechen.
                </p>
                <Link
                  href="/termin"
                  className="text-accent underline underline-offset-2 hover:opacity-80"
                >
                  Erstgespräch vereinbaren
                </Link>
              </li>
            </ul>

            {/* TODO: Instagram-Kanal aktivieren, sobald er existiert.
            <p className="mt-4 text-sm text-muted">
              Mehr Impulse findest du auf{" "}
              <a
                href="https://instagram.com/..."
                className="text-accent underline underline-offset-2 hover:opacity-80"
              >
                Instagram
              </a>
              .
            </p>
            */}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="sr-only">
              Vorname
            </label>
            <input
              id="name"
              ref={nameRef}
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
              Ja, schick mir bitte das Audio per E-Mail. Ich bin damit einverstanden,
              dass meine Angaben zu diesem Zweck gespeichert werden. Mehr dazu in
              der{" "}
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
      )}
    </div>
  );
}