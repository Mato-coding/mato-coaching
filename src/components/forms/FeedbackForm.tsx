"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import ProgressBar from "@/components/ui/ProgressBar";
import FadeIn from "@/components/ui/FadeIn";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import FeedbackThankYou from "@/components/forms/FeedbackThankYou";
import { scrollElementToTop } from "@/lib/scroll";
import { isValidEmail } from "@/lib/mail";
import {
  STEP_ORDER,
  TOTAL_STEPS,
  AUTO_ADVANCE_DELAY_MS,
  intro,
  formatQuestion,
  ratingQuestion,
  descriptorsQuestion,
  bestQuestion,
  improveQuestion,
  contactStep,
  type Format,
  type StepId,
  type ChoiceOption,
  type ScaleQuestion,
} from "@/lib/feedback-config";

// Eine beantwortete Frage (Schritte 1–5). "contact" (Schritt 6) ist
// terminal: kein Auto-Advance, sondern der POST selbst, deshalb kein
// eigener History-Eintrag nötig.
type AnswerStep = Exclude<StepId, "contact">;
interface HistoryEntry {
  step: AnswerStep;
  value: Format | number | string[] | string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

// Antwort eines Auto-Advance-Schritts (format, rating) im
// Bestätigungsfenster: sichtbar gewählt, aber noch nicht in die History
// übernommen. Siehe AUTO_ADVANCE_DELAY_MS in feedback-config.ts.
interface PendingAnswer {
  step: AnswerStep;
  value: HistoryEntry["value"];
}

interface FeedbackFormProps {
  initialFormat: Format | null;
  source: string | null;
  audioUrl: string | null;
  googleReviewUrl: string | null;
  showEnvHints: boolean;
}

export default function FeedbackForm({
  initialFormat,
  source,
  audioUrl,
  googleReviewUrl,
  showEnvHints,
}: FeedbackFormProps) {
  const [history, setHistory] = useState<HistoryEntry[]>(() =>
    initialFormat ? [{ step: "format", value: initialFormat }] : []
  );
  const [pendingAnswer, setPendingAnswer] = useState<PendingAnswer | null>(null);
  const [liveMessage, setLiveMessage] = useState("");
  const [descriptorsDraft, setDescriptorsDraft] = useState<string[]>([]);
  const [descriptorLimitHint, setDescriptorLimitHint] = useState(false);
  const [bestDraft, setBestDraft] = useState("");
  const [improveDraft, setImproveDraft] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactConsent, setContactConsent] = useState(false);
  const [quoteConsent, setQuoteConsent] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);

  const currentStepId: StepId = STEP_ORDER[history.length] ?? "contact";
  const stepNumber = history.length + 1;

  // Auswahl-Entwürfe zurücksetzen, sobald ein neuer Schritt angezeigt wird.
  // Von React sanktioniertes "State während des Renderns anpassen" (State
  // statt Ref, kein setState in einem Effekt), Muster aus AssessmentForm.tsx.
  const [shownStepId, setShownStepId] = useState<StepId>(currentStepId);
  if (shownStepId !== currentStepId) {
    setShownStepId(currentStepId);
    if (descriptorsDraft.length > 0) setDescriptorsDraft([]);
    if (descriptorLimitHint) setDescriptorLimitHint(false);
    if (bestDraft !== "") setBestDraft("");
    if (improveDraft !== "") setImproveDraft("");
    if (liveMessage !== "") setLiveMessage("");
  }

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    if (containerRef.current) scrollElementToTop(containerRef.current);
  }, [currentStepId]);

  // Bestätigungsfenster für Auto-Advance-Fragen: die Antwort wird erst nach
  // AUTO_ADVANCE_DELAY_MS in die History übernommen, damit sie sichtbar
  // gewählt bleibt, bevor der nächste Schritt erscheint. Timer läuft in
  // einem eigenen Effekt mit Cleanup, damit Zurück oder ein Unmount ihn
  // sicher löschen.
  useEffect(() => {
    if (!pendingAnswer) return;
    const timer = setTimeout(() => {
      pushAnswer(pendingAnswer.step, pendingAnswer.value);
      setPendingAnswer(null);
    }, AUTO_ADVANCE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [pendingAnswer]);

  function pushAnswer(step: AnswerStep, value: HistoryEntry["value"]) {
    setHistory((prev) => [...prev, { step, value }]);
  }

  // Für format/rating: setzt die Antwort erst als "pending" (sichtbar
  // gewählt), der Effekt oben übernimmt sie nach dem Bestätigungsfenster.
  // Weitere Klicks während des Fensters werden ignoriert (kein Doppeltipp,
  // der zwei Schritte auslöst).
  function selectPending(step: AnswerStep, value: HistoryEntry["value"]) {
    if (pendingAnswer) return;
    setPendingAnswer({ step, value });
    setLiveMessage("Antwort gespeichert");
  }

  function handleBack() {
    if (history.length === 0) return;
    setPendingAnswer(null);
    setHistory((prev) => prev.slice(0, -1));
  }

  function answerFor<T>(step: AnswerStep): T | undefined {
    return history.find((h) => h.step === step)?.value as T | undefined;
  }

  function toggleDescriptor(id: string) {
    setDescriptorsDraft((prev) => {
      if (prev.includes(id)) {
        setDescriptorLimitHint(false);
        return prev.filter((x) => x !== id);
      }
      const max = descriptorsQuestion.maxSelect ?? Infinity;
      if (prev.length >= max) {
        setDescriptorLimitHint(true);
        return prev;
      }
      return [...prev, id];
    });
  }

  async function handleSubmit() {
    if (status === "loading") return;

    const trimmedEmail = email.trim();
    if (trimmedEmail && !isValidEmail(trimmedEmail)) {
      setStatus("error");
      setErrorMessage("Bitte gib eine gültige E-Mail-Adresse ein, oder lass das Feld leer.");
      return;
    }
    if (trimmedEmail && !contactConsent) {
      setStatus("error");
      setErrorMessage(
        "Bitte bestätige, dass ich dich kontaktieren darf, wenn du eine E-Mail-Adresse angibst."
      );
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          format: answerFor<Format>("format"),
          rating: answerFor<number>("rating"),
          descriptors: answerFor<string[]>("descriptors"),
          best: answerFor<string>("best"),
          improve: answerFor<string>("improve") || null,
          name: name.trim() || null,
          email: trimmedEmail || null,
          contactConsent,
          quoteConsent,
          source,
          pagePath: window.location.pathname,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Etwas ist schiefgelaufen. Bitte versuche es später erneut.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Etwas ist schiefgelaufen. Bitte versuche es später erneut.");
    }
  }

  if (status === "success") {
    return (
      <FeedbackThankYou
        audioUrl={audioUrl}
        googleReviewUrl={googleReviewUrl}
        showEnvHints={showEnvHints}
      />
    );
  }

  return (
    <div ref={containerRef} className="text-primary">
      <span aria-live="polite" className="sr-only">
        {liveMessage}
      </span>

      <Eyebrow label={intro.eyebrow} />
      <Heading variant="section" as="h1">
        {intro.heading}
      </Heading>
      <p className="mt-4 max-w-measure text-lg leading-relaxed text-muted">{intro.text}</p>

      <ProgressBar current={stepNumber} total={TOTAL_STEPS} className="mt-12" />

      <FadeIn key={currentStepId} durationSec={0.6} y={8}>
        <div>
          {currentStepId === "format" && (
            <QuestionHeader index={1} question={formatQuestion.question}>
              <ChoiceRows
                options={formatQuestion.options}
                value={pendingAnswer?.step === "format" ? (pendingAnswer.value as Format) : null}
                pending={pendingAnswer !== null}
                onSelect={(id) => selectPending("format", id as Format)}
              />
            </QuestionHeader>
          )}

          {currentStepId === "rating" && (
            <QuestionHeader index={2} question={ratingQuestion.question}>
              <ScaleInput
                question={ratingQuestion}
                value={pendingAnswer?.step === "rating" ? (pendingAnswer.value as number) : null}
                pending={pendingAnswer !== null}
                onSelect={(n) => selectPending("rating", n)}
              />
            </QuestionHeader>
          )}

          {currentStepId === "descriptors" && (
            <QuestionHeader index={3} question={descriptorsQuestion.question} hint={descriptorsQuestion.hint}>
              <ChoicePills
                options={descriptorsQuestion.options}
                selected={descriptorsDraft}
                onToggle={toggleDescriptor}
              />
              <div className="mt-3 min-h-[20px] text-sm text-umber">
                {descriptorLimitHint && "Du kannst höchstens drei Worte wählen."}
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => pushAnswer("descriptors", descriptorsDraft)}
                  disabled={descriptorsDraft.length === 0}
                  className="w-full sm:w-auto rounded-md bg-accent px-8 py-3 text-background transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Weiter
                </button>
              </div>
            </QuestionHeader>
          )}

          {currentStepId === "best" && (
            <QuestionHeader index={4} question={bestQuestion.question}>
              <FreetextInput
                value={bestDraft}
                onChange={setBestDraft}
                placeholder={bestQuestion.placeholder}
                maxLength={bestQuestion.maxLength}
                autoFocus
              />
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => pushAnswer("best", bestDraft.trim())}
                  disabled={bestDraft.trim().length < (bestQuestion.minLength ?? 1)}
                  className="w-full sm:w-auto rounded-md bg-accent px-8 py-3 text-background transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Weiter
                </button>
              </div>
            </QuestionHeader>
          )}

          {currentStepId === "improve" && (
            <QuestionHeader index={5} question={improveQuestion.question}>
              <FreetextInput
                value={improveDraft}
                onChange={setImproveDraft}
                placeholder={improveQuestion.placeholder}
                maxLength={improveQuestion.maxLength}
                autoFocus
              />
              <div className="mt-6 flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => pushAnswer("improve", improveDraft.trim())}
                  disabled={improveDraft.trim().length === 0}
                  className="w-full sm:w-auto rounded-md bg-accent px-8 py-3 text-background transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Weiter
                </button>
                <button
                  type="button"
                  onClick={() => pushAnswer("improve", "")}
                  className="text-sm text-muted hover:text-primary transition-colors"
                >
                  Überspringen
                </button>
              </div>
            </QuestionHeader>
          )}

          {currentStepId === "contact" && (
            <div>
              <div className="mb-8">
                <span className="font-serif text-lg font-medium text-muted">06</span>
                <h2 className="mt-4 font-serif text-xl md:text-2xl font-medium text-primary leading-[1.3]">
                  {contactStep.heading}
                </h2>
                <p className="mt-3 max-w-measure text-muted">{contactStep.intro}</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="feedback-name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="feedback-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={contactStep.namePlaceholder}
                    className="w-full rounded-md border border-hairline bg-surface px-4 py-3 text-primary outline-none transition focus:border-accent"
                  />
                </div>

                <div>
                  <label htmlFor="feedback-email" className="sr-only">
                    E-Mail-Adresse
                  </label>
                  <input
                    id="feedback-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={contactStep.emailPlaceholder}
                    className="w-full rounded-md border border-hairline bg-surface px-4 py-3 text-primary outline-none transition focus:border-accent"
                  />
                </div>

                <label className="flex items-start gap-3 text-sm text-muted">
                  <input
                    type="checkbox"
                    checked={contactConsent}
                    onChange={(e) => setContactConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 accent-accent"
                  />
                  <span>{contactStep.contactConsentLabel}</span>
                </label>

                <label className="flex items-start gap-3 text-sm text-muted">
                  <input
                    type="checkbox"
                    checked={quoteConsent}
                    onChange={(e) => setQuoteConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 accent-accent"
                  />
                  <span>{contactStep.quoteConsentLabel}</span>
                </label>

                <p className="text-sm text-muted">
                  {contactStep.privacyPrefix}{" "}
                  <Link href="/datenschutz" className="underline hover:text-accent">
                    {contactStep.privacyLinkLabel}
                  </Link>
                  .
                </p>

                {status === "error" && <p className="text-sm text-umber">{errorMessage}</p>}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-md bg-accent px-6 py-3 text-background transition hover:opacity-90 disabled:opacity-60"
                >
                  {status === "loading" ? contactStep.submitLoadingLabel : contactStep.submitLabel}
                </button>
              </form>
            </div>
          )}
        </div>
      </FadeIn>

      <div className="flex items-center justify-between pt-6">
        <button
          onClick={handleBack}
          disabled={history.length === 0}
          className="text-sm text-muted hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Zurück
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Frage-Anatomie (design-system.md Abschnitt 8.3): zweistellige Nummer in
// Cormorant, gefolgt von der Frage in Cormorant Italic. Dieselbe Optik wie im
// Workbook-Blocksystem (aktuell nur auf feature/workbook), hier neu gebaut,
// weil /feedback keine Abhängigkeit auf Workbook-Code haben soll.
// ─────────────────────────────────────────────────────────────────────────────

function QuestionHeader({
  index,
  question,
  hint,
  children,
}: {
  index: number;
  question: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-8 flex items-baseline gap-4">
        <span className="font-serif text-lg font-medium text-muted">
          {String(index).padStart(2, "0")}
        </span>
        <h2 className="font-serif italic text-[1.1875rem] md:text-[1.3125rem] font-medium text-primary leading-[1.4]">
          {question}
        </h2>
      </div>
      {hint && <p className="mb-6 text-sm text-muted">{hint}</p>}
      {children}
    </div>
  );
}

// choice, Variante rows (design-system.md 8.4): Zeilen mit führendem Kreis,
// 1px-Rand in Navy, bei Auswahl gefüllt. Bewusste Ausnahme von der
// border-hairline-Konvention: dieser Kreis ist kein Trennstrich/Kartenrand/
// Eingabefeld, sondern der vom Blocksystem vorgegebene Auswahl-Indikator.
// `pending` (Auto-Advance-Bestätigungsfenster, s. FeedbackForm) markiert die
// Optionen als aria-disabled statt disabled, damit der Fokus nicht springt;
// die Füllung bleibt sichtbar, weitere Klicks ignoriert der Aufrufer.
function ChoiceRows({
  options,
  value,
  pending = false,
  onSelect,
}: {
  options: ChoiceOption[];
  value: string | null;
  pending?: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => {
        const selected = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            aria-pressed={selected}
            aria-disabled={pending || undefined}
            onClick={() => onSelect(opt.id)}
            className="flex min-h-12 items-center gap-4 py-2 text-left"
          >
            <span
              aria-hidden="true"
              className={`h-[18px] w-[18px] shrink-0 rounded-full border border-accent motion-safe:transition-colors motion-safe:duration-150 ${
                selected ? "bg-accent" : "bg-transparent"
              }`}
            />
            <span className="text-lg text-primary">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// choice, Variante pills (design-system.md 8.4).
function ChoicePills({
  options,
  selected,
  onToggle,
}: {
  options: ChoiceOption[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => {
        const isSelected = selected.includes(opt.id);
        return (
          <button
            key={opt.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onToggle(opt.id)}
            className={`min-h-11 rounded-full px-5 py-[10px] text-base transition-colors duration-200 ${
              isSelected
                ? "bg-accent text-background"
                : "border border-hairline bg-surface text-primary hover:border-accent/50"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// scale (design-system.md 8.4): Punkte auf einer Hairline, Endpunkt-Labels
// mittig darunter, keine Zwischenbeschriftung. `pending` s. ChoiceRows.
function ScaleInput({
  question,
  value,
  pending = false,
  onSelect,
}: {
  question: ScaleQuestion;
  value: number | null;
  pending?: boolean;
  onSelect: (n: number) => void;
}) {
  const steps = Array.from(
    { length: question.max - question.min + 1 },
    (_, i) => question.min + i
  );

  return (
    <div className="px-[22px]">
      <div className="relative h-px bg-hairline">
        <div className="flex justify-between">
          {steps.map((n) => {
            const selected = value === n;
            return (
              <button
                key={n}
                type="button"
                aria-pressed={selected}
                aria-disabled={pending || undefined}
                aria-label={`Stufe ${n} von ${question.max}`}
                onClick={() => onSelect(n)}
                className="relative -mt-[22px] flex h-11 w-11 items-center justify-center"
              >
                <span
                  aria-hidden="true"
                  className={`rounded-full motion-safe:transition-[transform,background-color] motion-safe:duration-150 ${
                    selected ? "h-4 w-4 bg-accent" : "h-2 w-2 bg-primary/55"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-3 flex justify-between text-[13px] text-muted">
        <span>{question.minLabel}</span>
        <span>{question.maxLabel}</span>
      </div>
    </div>
  );
}

// freetext (design-system.md 8.4): randloses Feld, untere Hairline als
// Schreiblinie, bei Fokus 2px Navy statt eines zusätzlichen Fokus-Rings.
function FreetextInput({
  value,
  onChange,
  placeholder,
  maxLength,
  autoFocus,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  maxLength: number;
  autoFocus?: boolean;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      autoFocus={autoFocus}
      rows={3}
      className="min-h-[100px] w-full resize-none border-0 border-b border-hairline bg-transparent py-2 text-lg text-primary outline-none transition-colors duration-200 placeholder:text-muted/65 focus:border-b-2 focus:border-accent"
    />
  );
}
