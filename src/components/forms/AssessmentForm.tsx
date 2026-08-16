"use client";

import { useEffect, useRef, useState } from "react";
import {
  calculateResult,
  composeResult,
  questions,
  type Answer,
  type Cluster,
  type Question,
} from "@/lib/assessment-config";
import AssessmentResult from "@/components/forms/AssessmentResult";
import FadeIn from "@/components/ui/FadeIn";
import Eyebrow from "@/components/ui/Eyebrow";
import { scrollElementToTop } from "@/lib/scroll";

interface StepRecord {
  questionId: string;
  answerIds: string[];
  tags: string[];
  cluster?: Cluster;
}

export default function AssessmentForm() {
  const [cluster, setCluster] = useState<Cluster | null>(null);
  const [history, setHistory] = useState<StepRecord[]>([]);
  const [done, setDone] = useState(false);
  const [multiSelected, setMultiSelected] = useState<string[]>([]);
  const submittedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);
  const continueButtonRef = useRef<HTMLButtonElement>(null);
  const autoScrolledRef = useRef(false);

  const step = history.length;

  // Fragen gefiltert nach aktuellem Cluster
  const visibleQuestions: Question[] = questions.filter(
    (q) => !q.onlyForCluster || q.onlyForCluster === cluster
  );

  // Gesamtzahl: solange der Cluster unbekannt ist, schätzen wir 6 gemeinsame
  // Fragen plus eine Branching-Frage (F3).
  const totalSteps =
    cluster === null
      ? questions.filter((q) => !q.onlyForCluster).length + 1
      : visibleQuestions.length;

  const currentQ = visibleQuestions[step];
  const progress = Math.round((step / totalSteps) * 100);

  // Auswahl der Mehrfachauswahl-Frage zurücksetzen, sobald eine neue Frage
  // angezeigt wird: der von React sanktionierte "State während des Renderns
  // anpassen"-Vergleich (State statt Ref, keine setState-Aufrufe in einem
  // Effekt), siehe https://react.dev/learn/you-might-not-need-an-effect.
  const [shownQuestionId, setShownQuestionId] = useState(currentQ?.id);
  if (shownQuestionId !== currentQ?.id) {
    setShownQuestionId(currentQ?.id);
    if (multiSelected.length > 0) setMultiSelected([]);
  }

  // autoScrolledRef ist ein reiner Ref (kein UI-State), sein Reset gehört
  // deshalb in einen Effekt statt in den Render-Körper.
  useEffect(() => {
    autoScrolledRef.current = false;
  }, [currentQ?.id]);

  // Alle gesammelten Tags aus der History (fürs Scoring und die Ergebnis-Komposition)
  const collectedTags = history.flatMap((h) => h.tags);

  // Nach einem Fragenwechsel sicherstellen, dass die neue Frage oben im
  // Viewport steht (relevant, wenn die vorige Frage lang war und nach
  // unten gescrollt wurde). Beim ersten Rendern nicht auslösen.
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    if (containerRef.current) scrollElementToTop(containerRef.current);
  }, [currentQ?.id]);

  // Bei der ERSTEN Auswahl einer Mehrfachauswahl-Frage den Weiter-Button sanft
  // in den sichtbaren Bereich holen, damit sein Musterwechsel (kein
  // Auto-Advance) erkennbar bleibt. Nur einmal pro Frage.
  useEffect(() => {
    if (multiSelected.length !== 1 || autoScrolledRef.current) return;
    autoScrolledRef.current = true;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    continueButtonRef.current?.scrollIntoView({
      block: "nearest",
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [multiSelected]);

  // Abschluss genau einmal anonym tracken, sobald das Ergebnis feststeht
  useEffect(() => {
    if (!done || !cluster || submittedRef.current) return;
    submittedRef.current = true;
    const { route } = calculateResult(collectedTags);
    const answers = Object.fromEntries(
      history.map((h) => [h.questionId, h.questionId === "q4" ? h.answerIds : h.answerIds[0]])
    );
    fetch("/api/assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cluster, route, answers }),
    }).catch((err) => console.error("Assessment-Tracking-Fehler:", err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, cluster]);

  const advance = (record: StepRecord, newCluster?: Cluster) => {
    const effectiveCluster = newCluster ?? cluster;
    if (newCluster) setCluster(newCluster);

    const newHistory = [...history, record];
    setHistory(newHistory);

    const newVisibleQuestions = questions.filter(
      (q) => !q.onlyForCluster || q.onlyForCluster === effectiveCluster
    );
    if (newHistory.length >= newVisibleQuestions.length) {
      setDone(true);
    }
  };

  const handleAnswer = (answer: Answer) => {
    const record: StepRecord = {
      questionId: currentQ.id,
      answerIds: [answer.id],
      tags: answer.tags,
      cluster: answer.cluster,
    };
    advance(record, answer.cluster);
  };

  const toggleMultiAnswer = (answer: Answer) => {
    setMultiSelected((prev) => {
      if (answer.exclusive) {
        return prev.includes(answer.id) ? [] : [answer.id];
      }
      const withoutExclusive = prev.filter((id) => {
        const a = currentQ.answers.find((x) => x.id === id);
        return !a?.exclusive;
      });
      return withoutExclusive.includes(answer.id)
        ? withoutExclusive.filter((id) => id !== answer.id)
        : [...withoutExclusive, answer.id];
    });
  };

  const handleMultiNext = () => {
    if (multiSelected.length === 0) return;
    const chosenAnswers = currentQ.answers.filter((a) => multiSelected.includes(a.id));
    const record: StepRecord = {
      questionId: currentQ.id,
      answerIds: multiSelected,
      tags: chosenAnswers.flatMap((a) => a.tags),
    };
    advance(record);
  };

  const handleBack = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    // Cluster zurücksetzen, wenn wir zu Frage 1 zurückgehen
    if (history.length === 1) setCluster(null);
    else if (prev.cluster) {
      // Cluster des vorletzten Schritts wiederherstellen
      const prevCluster = history[history.length - 2]?.cluster ?? null;
      setCluster(prevCluster ?? null);
    }
    setHistory(history.slice(0, -1));
    setDone(false);
  };

  const handleRestart = () => {
    setCluster(null);
    setHistory([]);
    setDone(false);
    setMultiSelected([]);
    submittedRef.current = false;
  };

  // Ergebnis-Screen
  if (done && cluster) {
    const { route, careActive } = calculateResult(collectedTags);
    const { headline, paragraphs } = composeResult(history, cluster, route, careActive);

    return (
      <AssessmentResult
        headline={headline}
        paragraphs={paragraphs}
        cluster={cluster}
        route={route}
        onRestart={handleRestart}
      />
    );
  }

  // Fragen-Screen
  const isMulti = currentQ.mode === "multi";

  return (
    <div ref={containerRef} className="text-primary">
      {/* Fortschrittsbalken */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-muted">
            Frage {step + 1} von {totalSteps}
          </span>
          <span className="text-sm text-muted">{progress}%</span>
        </div>
        <div className="h-px w-full bg-primary/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-umber transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Eyebrow label="Kurz-Assessment" />

      <FadeIn key={currentQ.id} durationSec={isMulti ? 0.9 : 0.6} y={8}>
        <div>
          {/* Frage */}
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-primary leading-[1.2] mb-3">
            {currentQ.question}
          </h2>

          {currentQ.hint && <p className="text-sm text-muted mb-8">{currentQ.hint}</p>}
          {!currentQ.hint && <div className="mb-10" />}

          {/* Antworten */}
          {isMulti ? (
            <div className="flex flex-col gap-3 mb-6">
              {currentQ.answers.map((answer) => {
                const selected = multiSelected.includes(answer.id);
                return (
                  <button
                    key={answer.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleMultiAnswer(answer)}
                    className={`flex items-start gap-4 cursor-pointer rounded-md border p-6 text-left transition-all duration-200 ${
                      selected
                        ? "border-accent bg-accent/5"
                        : "border-hairline hover:border-accent hover:bg-accent/5"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border transition-colors duration-200 ${
                        selected ? "border-accent bg-accent" : "border-hairline"
                      }`}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                        className={`h-3 w-3 text-background transition-opacity duration-200 ${
                          selected ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <path
                          d="M3.5 8.5l3 3 6-7"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-primary/90 text-lg leading-relaxed">
                      {answer.label}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col gap-3 mb-8">
              {currentQ.answers.map((answer) => (
                <button
                  key={answer.id}
                  type="button"
                  onClick={() => handleAnswer(answer)}
                  className="border border-hairline hover:border-accent hover:bg-accent/5 cursor-pointer rounded-md p-6 text-left transition-all duration-200"
                >
                  <span className="text-primary/90 text-lg leading-relaxed">
                    {answer.label}
                  </span>
                </button>
              ))}
            </div>
          )}

          {isMulti && (
            <div className="mb-8">
              <button
                ref={continueButtonRef}
                type="button"
                onClick={handleMultiNext}
                disabled={multiSelected.length === 0}
                className="w-full sm:w-auto rounded-md bg-accent px-8 py-3 text-background transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Weiter zur nächsten Frage
              </button>
            </div>
          )}
        </div>
      </FadeIn>

      {/* Navigation: Zurück */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className="text-sm text-muted hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Zurück
        </button>
      </div>
    </div>
  );
}
