"use client";

import { useState } from "react";
import LeadMagnetForm from "@/components/forms/LeadMagnetForm";

export default function LeadMagnetCTA({ source = "startseite" }: { source?: string }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
        Ein geführtes Breathwork-Audio, das dir in wenigen Minuten hilft,
        dein Nervensystem zu beruhigen. Du kannst es jederzeit nutzen, wenn
        die innere Anspannung größer wird.
        {!submitted && " Trag dich ein, und du bekommst es direkt per E-Mail."}
      </p>

      <div className="mt-10 max-w-md">
        <LeadMagnetForm source={source} onSuccess={() => setSubmitted(true)} />
      </div>
    </>
  );
}
