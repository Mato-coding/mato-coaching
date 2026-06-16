"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  {
    question: "Wie zeigt sich die Unruhe in deinem Alltag am stärksten?",
    options: [
      "Gedankenkarussell & schlechter Schlaf",
      "Körperliche Anspannung (Druck, Enge)",
      "Schnelle Überforderung & Reizbarkeit",
    ],
  },
  {
    question: "Was hast du bisher versucht, um zur Ruhe zu kommen?",
    options: [
      "Kognitive Ansätze (z.B. Mindset, klassische Therapie)",
      "Entspannungstechniken (Apps, Yoga, Meditation)",
      "Ich habe das Gefühl, nichts funktioniert nachhaltig",
    ],
  },
  {
    question: "Was wünschst du dir von einer Begleitung am meisten?",
    options: [
      "Jemanden, der den Raum sicher hält",
      "Konkrete somatische Werkzeuge für den Alltag",
      "Klarheit über die Ursachen meiner Muster",
    ],
  },
];

export default function AssessmentForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (answer: string) => {
    setAnswers([...answers, answer]);
    setCurrentStep(currentStep + 1);
  };

  // Wenn alle Fragen beantwortet wurden (Zustand: currentStep === 3)
  if (currentStep === questions.length) {
    return (
      <div className="bg-background text-primary py-12 text-center">
        <h2 className="mb-6 text-2xl font-medium md:text-3xl">
          Dein System sucht nach Erdung, nicht nach weiteren Konzepten.
        </h2>
        <p className="text-primary/80 mb-10 text-lg">
          Deine Antworten zeigen, dass eine rein analytische Herangehensweise aktuell nicht ausreicht. Der Weg führt über die Regulation deines Körpers.
        </p>
        <Link
          href="/termin"
          className="bg-accent text-background hover:opacity-90 inline-block rounded-lg px-8 py-4 font-medium transition"
        >
          Erstgespräch vereinbaren
        </Link>
      </div>
    );
  }

  const currentQ = questions[currentStep];

  return (
    <div className="bg-background text-primary mx-auto max-w-2xl w-full">
      <p className="text-primary/60 mb-6 text-sm font-medium tracking-wide uppercase">
        Schritt {currentStep + 1} von {questions.length}
      </p>
      <h2 className="mb-10 text-2xl font-medium md:text-3xl">{currentQ.question}</h2>

      <div className="flex flex-col gap-4">
        {currentQ.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(option)}
            className="border-primary/20 hover:border-primary hover:bg-primary/5 cursor-pointer rounded-xl border p-6 text-left transition-all"
          >
            <span className="text-lg">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
}