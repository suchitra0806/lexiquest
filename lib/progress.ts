import type { Difficulty } from "./types";

export interface Progress {
  xp: number;
  level: number;
  difficulty: Difficulty;
  streak: number;
  bestStreak: number;
  roundsCompleted: number;
  missedWords: string[];
}

const STORAGE_KEY = "lexiquest-progress-v1";

const DEFAULT_PROGRESS: Progress = {
  xp: 0,
  level: 1,
  difficulty: "beginner",
  streak: 0,
  bestStreak: 0,
  roundsCompleted: 0,
  missedWords: [],
};

const XP_PER_LEVEL = 100;
const DIFFICULTY_ORDER: Difficulty[] = ["beginner", "intermediate", "advanced"];

export function loadProgress(): Progress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) } as Progress;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: Progress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function levelForXp(xp: number): number {
  return Math.max(1, Math.floor(xp / XP_PER_LEVEL) + 1);
}

function nextDifficulty(current: Difficulty, accuracy: number): Difficulty {
  const idx = DIFFICULTY_ORDER.indexOf(current);
  if (accuracy >= 0.9 && idx < DIFFICULTY_ORDER.length - 1) {
    return DIFFICULTY_ORDER[idx + 1];
  }
  if (accuracy < 0.5 && idx > 0) {
    return DIFFICULTY_ORDER[idx - 1];
  }
  return current;
}

export function applyRoundResult(
  progress: Progress,
  correctCount: number,
  totalCount: number,
  missedWords: string[],
): Progress {
  const accuracy = totalCount === 0 ? 0 : correctCount / totalCount;
  const earnedXp = correctCount * 10 + (accuracy === 1 ? 20 : 0);
  const xp = progress.xp + earnedXp;
  const streak = accuracy === 1 ? progress.streak + 1 : 0;

  return {
    ...progress,
    xp,
    level: levelForXp(xp),
    difficulty: nextDifficulty(progress.difficulty, accuracy),
    streak,
    bestStreak: Math.max(progress.bestStreak, streak),
    roundsCompleted: progress.roundsCompleted + 1,
    missedWords: Array.from(new Set([...progress.missedWords, ...missedWords])).slice(-20),
  };
}

export function clearMissedWord(progress: Progress, word: string): Progress {
  return { ...progress, missedWords: progress.missedWords.filter((w) => w !== word) };
}

export function applyReviewResult(
  progress: Progress,
  correctCount: number,
  reviewedWords: string[],
  stillMissed: string[],
): Progress {
  const earnedXp = correctCount * 5;
  const xp = progress.xp + earnedXp;
  const cleared = new Set(reviewedWords.filter((w) => !stillMissed.includes(w)));

  return {
    ...progress,
    xp,
    level: levelForXp(xp),
    missedWords: Array.from(new Set([...progress.missedWords.filter((w) => !cleared.has(w)), ...stillMissed])),
  };
}

export { XP_PER_LEVEL };
