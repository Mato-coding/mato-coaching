"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Step = "email" | "code";
type Status = "idle" | "loading" | "error";
type ErrorKind = "rate_limit" | "generic" | "invalid_code";

export default function OtpLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/programme";

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorKind, setErrorKind] = useState<ErrorKind | null>(null);

  async function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorKind(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
      },
    });

    if (error) {
      console.error("OTP send error:", error.message);
      if (error.message.toLowerCase().includes("rate")) {
        setErrorKind("rate_limit");
        setStatus("error");
        return;
      }
      // For signup_disabled/otp_disabled or unknown addresses we still advance
      // to step 2 with a neutral message. The code check will fail for unknown
      // addresses — at that point enumeration is no longer a passive risk.
    }

    setStatus("idle");
    setStep("code");
  }

  async function handleCodeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorKind(null);

    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });

    if (error) {
      console.error("OTP verify error:", error.message);
      setErrorKind("invalid_code");
      setStatus("error");
      return;
    }

    router.push(next);
  }

  if (step === "code") {
    return (
      <form onSubmit={handleCodeSubmit} className="space-y-4">
        <p className="font-sans text-body text-muted">
          Wir haben dir einen 6-stelligen Code an{" "}
          <span className="text-primary">{email}</span> geschickt.
        </p>

        <div>
          <label htmlFor="otp-code" className="sr-only">
            6-stelliger Code
          </label>
          <input
            id="otp-code"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            required
            autoFocus
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="123456"
            className="w-full rounded-md border border-primary/15 bg-surface px-4 py-4 text-center font-serif text-3xl tracking-widest text-primary outline-none transition focus:border-accent"
          />
        </div>

        {status === "error" && errorKind === "invalid_code" && (
          <div className="space-y-2">
            <p className="font-sans text-small text-umber">
              Der Code ist falsch oder abgelaufen. Fordere einen neuen an.
            </p>
            <button
              type="button"
              onClick={() => {
                setCode("");
                setStatus("idle");
                setErrorKind(null);
                setStep("email");
              }}
              className="font-sans text-small text-accent underline underline-offset-2"
            >
              Neuen Code anfordern
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading" || code.length !== 6}
          className="w-full rounded-md bg-accent px-6 py-3 font-sans text-background transition hover:opacity-90 disabled:opacity-60"
        >
          {status === "loading" ? "Wird geprüft …" : "Bestätigen"}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleEmailSubmit} className="space-y-4">
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

      {status === "error" && errorKind === "rate_limit" && (
        <p className="font-sans text-small text-umber">
          Zu viele Versuche. Bitte warte kurz und versuche es erneut.
        </p>
      )}

      {status === "error" && errorKind === "generic" && (
        <p className="font-sans text-small text-umber">
          Ein technisches Problem ist aufgetreten. Bitte versuche es erneut.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-md bg-accent px-6 py-3 font-sans text-background transition hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading" ? "Wird gesendet …" : "Code anfordern"}
      </button>
    </form>
  );
}
