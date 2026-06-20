"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  questions,
  calculateResult,
  results,
  type Cluster,
  type Question,
} from "@/lib/assessment-config";
import ResultActions from "@/components/forms/ResultActions";

interface StepRecord {
  questionId: string;
  tags: string[];
  cluster?: Cluster;
}

export default function AssessmentForm() {
  const [cluster, setCluster] = useState<Cluster | null>(null);
  const [history, setHistory] = useState<StepRecord[]>([]);
  const [done, setDone] = useState(false);
  const submittedRef = useRef(false);

  const step = history.length;

  // Fragen gefiltert nach aktuellem Cluster
  const visibleQuestions: Question[] = questions.filter(
    (q) => !q.onlyForCluster || q.onlyForCluster === cluster
  );

  // Gesamtzahl: wenn Cluster noch unbekannt, schätzen wir 5 (4 gemeinsam + 1 Branching)
  const totalSteps =
    cluster === null
      ? questions.filter((q) => !q.onlyForCluster).length + 1
      : visibleQuestions.length;

  const currentQ = visibleQuestions[step];
  const progress = Math.round((step / totalSteps) * 100);

  // Alle gesammelten Tags aus der History
  const collectedTags = history.flatMap((h) => h.tags);

  // Abschluss genau einmal anonym tracken, sobald das Ergebnis feststeht
  useEffect(() => {
    if (!done || !cluster || submittedRef.current) return;
    submittedRef.current = true;
    const route = calculateResult(collectedTags, cluster);
    fetch("/api/assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cluster, route, answers: collectedTags }),
    }).catch((err) => console.error("Assessment-Tracking-Fehler:", err));
  }, [done, cluster, collectedTags]);

  const handleAnswer = (answer: (typeof currentQ.answers)[number]) => {
    const newCluster = answer.cluster ?? cluster;
    if (answer.cluster) setCluster(answer.cluster);

    const record: StepRecord = {
      questionId: currentQ.id,
      tags: answer.tags,
      cluster: answer.cluster,
    };

    const newHistory = [...history, record];
    setHistory(newHistory);

    // Prüfen ob fertig (nach dem Update)
    const newVisibleQuestions = questions.filter(
      (q) => !q.onlyForCluster || q.onlyForCluster === newCluster
    );
    if (newHistory.length >= newVisibleQuestions.length) {
      setDone(true);
    }
  };

  const handleBack = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    // Cluster zurücksetzen wenn wir zu Frage 1 zurück
    if (history.length === 1) setCluster(null);
    else if (prev.cluster) {
      // Cluster des vorletzten Schritts wiederherstellen
      const prevCluster = history[history.length - 2]?.cluster ?? null;
      setCluster(prevCluster ?? null);
    }
    setHistory(history.slice(0, -1));
    setDone(false);
  };

  const handleSkip = () => {
    const record: StepRecord = {
      questionId: currentQ.id,
      tags: [],
    };
    const newHistory = [...history, record];
    setHistory(newHistory);

    const newVisibleQuestions = questions.filter(
      (q) => !q.onlyForCluster || q.onlyForCluster === cluster
    );
    if (newHistory.length >= newVisibleQuestions.length) {
      setDone(true);
    }
  };

  // Ergebnis-Screen
  if (done && cluster) {
    const route = calculateResult(collectedTags, cluster);
    const result = results[route];
    const headline = result.headlines[cluster] ?? result.headlines.default;

    return (
      <div className="text-primary">
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-6 bg-umber" aria-hidden="true" />
          <span className="text-sm font-medium tracking-[0.15em] uppercase text-muted">
            Dein Ergebnis
          </span>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary leading-[1.15] mb-6">
          {headline}
        </h2>

        <p className="text-primary/80 text-lg leading-relaxed mb-10">
          {result.body}
        </p>

        {result.videoUrl && (
          <div className="mb-10 rounded-md overflow-hidden aspect-video bg-surface">
            <video
              src={result.videoUrl}
              controls
              className="w-full h-full object-cover"
            />
          </div>
        )}

       <ResultActions
  ctaHref={result.ctaHref}
  ctaLabel={result.ctaLabel}
  cluster={cluster}
  result={route}
/>
      </div>
    );
  }

  // Fragen-Screen
  return (
    <div className="text-primary">
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

      {/* Eyebrow */}
      <div className="flex items-center gap-3 mb-6">
        <span className="h-px w-6 bg-umber" aria-hidden="true" />
        <span className="text-sm font-medium tracking-[0.15em] uppercase text-muted">
          Kurz-Assessment
        </span>
      </div>

      {/* Frage */}
      <h2 className="font-serif text-2xl md:text-3xl font-medium text-primary leading-[1.2] mb-10">
        {currentQ.question}
      </h2>

      {/* Antworten */}
      <div className="flex flex-col gap-3 mb-8">
        {currentQ.answers.map((answer, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(answer)}
            className="border border-primary/15 hover:border-accent hover:bg-accent/5 cursor-pointer rounded-md p-6 text-left transition-all duration-200"
          >
            <span className="text-primary/90 text-lg leading-relaxed">
              {answer.label}
            </span>
          </button>
        ))}
      </div>

      {/* Navigation: Zurück + Überspringen */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className="text-sm text-muted hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Zurück
        </button>
        <button
          onClick={handleSkip}
          className="text-sm text-muted hover:text-primary transition-colors"
        >
          Frage überspringen
        </button>
      </div>
    </div>
  );
}