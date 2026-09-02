"use client";

import { useEffect, useMemo, useState } from "react";
import type { Difficulty, Round } from "@/lib/types";
import { applyRoundResult, loadProgress, saveProgress } from "@/lib/progress";
import type { Progress } from "@/lib/progress";
import {
  buildMatchChallenges,
  buildBuilderChallenges,
  buildBlankChallenges,
  buildPhonicsChallenges,
} from "@/lib/buildChallenges";
import StartScreen from "@/components/StartScreen";
import LoadingQuest from "@/components/LoadingQuest";
import ProgressHeader from "@/components/ProgressHeader";
import ChallengeRound from "@/components/ChallengeRound";
import RoundSummary from "@/components/RoundSummary";

type Phase = "start" | "loading" | "match" | "build" | "blank" | "phonics" | "summary" | "error";

const STAGES: { phase: Phase; title: string; icon: string }[] = [
  { phase: "match", title: "Word Match", icon: "🔍" },
  { phase: "build", title: "Word Builder", icon: "🧩" },
  { phase: "blank", title: "Fill the Blank", icon: "✏️" },
  { phase: "phonics", title: "Listen & Choose", icon: "🔊" },
];

export default function Home() {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [phase, setPhase] = useState<Phase>("start");
  const [round, setRound] = useState<Round | null>(null);
  const [roundCorrect, setRoundCorrect] = useState(0);
  const [roundMissed, setRoundMissed] = useState<string[]>([]);
  const [xpEarned, setXpEarned] = useState(0);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const challengeSets = useMemo(() => {
    if (!round) return null;
    return {
      match: buildMatchChallenges(round),
      build: buildBuilderChallenges(round),
      blank: buildBlankChallenges(round),
      phonics: buildPhonicsChallenges(round),
    };
  }, [round]);

  async function startQuest(difficulty: Difficulty, theme: string) {
    setPhase("loading");
    setRoundCorrect(0);
    setRoundMissed([]);
    try {
      const res = await fetch("/api/generate-round", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ difficulty, theme }),
      });
      if (!res.ok) throw new Error("generation failed");
      const data: Round = await res.json();
      setRound(data);
      setPhase("match");
    } catch {
      setPhase("error");
    }
  }

  function handleStageComplete(correct: number, missed: string[]) {
    setRoundCorrect((c) => c + correct);
    setRoundMissed((m) => [...m, ...missed]);

    const currentIndex = STAGES.findIndex((s) => s.phase === phase);
    const next = STAGES[currentIndex + 1];

    if (next) {
      setPhase(next.phase);
    } else if (progress) {
      const totalCorrect = roundCorrect + correct;
      const totalMissed = [...roundMissed, ...missed];
      const totalQuestions = STAGES.length * (round?.words.length ?? 5);
      const updated = applyRoundResult(progress, totalCorrect, totalQuestions, totalMissed);
      setXpEarned(updated.xp - progress.xp);
      setProgress(updated);
      saveProgress(updated);
      setPhase("summary");
    }
  }

  if (!progress) return null;

  return (
    <main className="flex-1 flex flex-col px-4 py-10 bg-gradient-to-b from-amber-50 via-white to-white">
      {phase !== "start" && phase !== "loading" && <ProgressHeader progress={progress} />}

      {phase === "start" && (
        <StartScreen defaultDifficulty={progress.difficulty} onStart={startQuest} />
      )}

      {phase === "loading" && <LoadingQuest />}

      {phase === "error" && (
        <div className="max-w-xl mx-auto text-center">
          <div className="text-5xl mb-4">😕</div>
          <p className="text-slate-600 mb-6">
            Couldn&apos;t generate a quest. Check your Anthropic API key and try again.
          </p>
          <button
            onClick={() => setPhase("start")}
            className="rounded-xl bg-amber-400 hover:bg-amber-500 text-white font-bold px-6 py-3 shadow transition"
          >
            Back to Start
          </button>
        </div>
      )}

      {round &&
        challengeSets &&
        STAGES.map(
          (stage) =>
            phase === stage.phase && (
              <ChallengeRound
                key={stage.phase}
                title={stage.title}
                icon={stage.icon}
                challenges={challengeSets[stage.phase as keyof typeof challengeSets]}
                onComplete={handleStageComplete}
              />
            ),
        )}

      {phase === "summary" && round && (
        <RoundSummary
          round={round}
          correctCount={roundCorrect}
          totalCount={STAGES.length * round.words.length}
          missedWords={Array.from(new Set(roundMissed))}
          xpEarned={xpEarned}
          onContinue={() => setPhase("start")}
        />
      )}
    </main>
  );
}
