"use client";

import { useState } from "react";
import { THEMES } from "@/lib/types";
import type { Difficulty } from "@/lib/types";

const DIFFICULTIES: { value: Difficulty; label: string; hint: string }[] = [
  { value: "beginner", label: "Beginner", hint: "Simple words, short sentences" },
  { value: "intermediate", label: "Intermediate", hint: "Everyday vocabulary" },
  { value: "advanced", label: "Advanced", hint: "Richer words and phrasing" },
];

export default function StartScreen({
  defaultDifficulty,
  onStart,
}: {
  defaultDifficulty: Difficulty;
  onStart: (difficulty: Difficulty, theme: string) => void;
}) {
  const [difficulty, setDifficulty] = useState<Difficulty>(defaultDifficulty);
  const [theme, setTheme] = useState<string>("random");

  return (
    <div className="max-w-xl mx-auto text-center">
      <div className="text-6xl mb-4">📖✨</div>
      <h1 className="text-4xl font-extrabold text-slate-800 mb-2">LexiQuest</h1>
      <p className="text-slate-500 mb-8">
        A vocabulary &amp; phonics quest that grows with you. New words, every round.
      </p>

      <div className="mb-6">
        <div className="text-sm font-semibold text-slate-600 mb-2 text-left">Level</div>
        <div className="grid grid-cols-3 gap-2">
          {DIFFICULTIES.map((d) => (
            <button
              key={d.value}
              onClick={() => setDifficulty(d.value)}
              className={`rounded-xl border-2 p-3 text-left transition ${
                difficulty === d.value
                  ? "border-amber-400 bg-amber-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="font-bold text-slate-800">{d.label}</div>
              <div className="text-xs text-slate-500">{d.hint}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="text-sm font-semibold text-slate-600 mb-2 text-left">Theme</div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTheme("random")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border-2 transition ${
              theme === "random"
                ? "border-amber-400 bg-amber-50 text-amber-700"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            🎲 Surprise me
          </button>
          {THEMES.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border-2 capitalize transition ${
                theme === t
                  ? "border-amber-400 bg-amber-50 text-amber-700"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() =>
          onStart(difficulty, theme === "random" ? THEMES[Math.floor(Math.random() * THEMES.length)] : theme)
        }
        className="w-full rounded-xl bg-amber-400 hover:bg-amber-500 text-white font-bold text-lg py-3 shadow transition"
      >
        Start Quest
      </button>
    </div>
  );
}
