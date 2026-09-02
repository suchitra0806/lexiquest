"use client";

import { useMemo, useState } from "react";
import { shuffle } from "@/lib/shuffle";

export interface Challenge {
  key: string;
  prompt: React.ReactNode;
  correctAnswer: string;
  choices: string[];
}

export default function ChallengeRound({
  title,
  icon,
  challenges,
  onComplete,
}: {
  title: string;
  icon: string;
  challenges: Challenge[];
  onComplete: (correctCount: number, missedAnswers: string[]) => void;
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [missed, setMissed] = useState<string[]>([]);

  const current = challenges[index];
  const shuffledChoices = useMemo(() => shuffle(current.choices), [current]);

  function handleChoice(choice: string) {
    if (selected) return;
    setSelected(choice);
    const isCorrect = choice === current.correctAnswer;
    if (isCorrect) {
      setCorrectCount((c) => c + 1);
    } else {
      setMissed((m) => [...m, current.correctAnswer]);
    }

    setTimeout(() => {
      if (index + 1 < challenges.length) {
        setIndex((i) => i + 1);
        setSelected(null);
      } else {
        onComplete(isCorrect ? correctCount + 1 : correctCount, isCorrect ? missed : [...missed, current.correctAnswer]);
      }
    }, 900);
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 font-bold text-slate-700">
          <span className="text-2xl">{icon}</span> {title}
        </div>
        <div className="text-sm text-slate-400">
          {index + 1} / {challenges.length}
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 mb-4 min-h-[120px] flex items-center justify-center text-center">
        {current.prompt}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {shuffledChoices.map((choice) => {
          const isSelected = selected === choice;
          const isCorrectChoice = choice === current.correctAnswer;
          const showState = selected !== null;

          let stateClasses = "border-slate-200 bg-white hover:border-amber-300";
          if (showState && isCorrectChoice) {
            stateClasses = "border-emerald-400 bg-emerald-50 text-emerald-700";
          } else if (showState && isSelected && !isCorrectChoice) {
            stateClasses = "border-rose-400 bg-rose-50 text-rose-700";
          }

          return (
            <button
              key={choice}
              disabled={showState}
              onClick={() => handleChoice(choice)}
              className={`rounded-xl border-2 py-3 px-4 font-semibold capitalize transition ${stateClasses}`}
            >
              {choice}
            </button>
          );
        })}
      </div>
    </div>
  );
}
