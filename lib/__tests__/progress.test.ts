import { describe, expect, it } from "vitest";
import { applyRoundResult } from "../progress";
import type { Progress } from "../progress";

const base: Progress = {
  xp: 0,
  level: 1,
  difficulty: "beginner",
  streak: 0,
  bestStreak: 0,
  roundsCompleted: 0,
  missedWords: [],
};

describe("applyRoundResult", () => {
  it("awards XP proportional to correct answers plus a perfect-round bonus", () => {
    const result = applyRoundResult(base, 20, 20, []);
    expect(result.xp).toBe(20 * 10 + 20);
  });

  it("levels up once enough XP accumulates", () => {
    const result = applyRoundResult({ ...base, xp: 90 }, 5, 5, []);
    expect(result.level).toBeGreaterThan(1);
  });

  it("promotes difficulty on a perfect round", () => {
    const result = applyRoundResult(base, 5, 5, []);
    expect(result.difficulty).toBe("intermediate");
  });

  it("demotes difficulty on a poor round", () => {
    const result = applyRoundResult({ ...base, difficulty: "intermediate" }, 1, 5, []);
    expect(result.difficulty).toBe("beginner");
  });

  it("keeps difficulty steady on a mediocre round", () => {
    const result = applyRoundResult({ ...base, difficulty: "intermediate" }, 3, 5, []);
    expect(result.difficulty).toBe("intermediate");
  });

  it("resets streak on any miss and increments it on a perfect round", () => {
    const streaking = applyRoundResult({ ...base, streak: 2 }, 5, 5, []);
    expect(streaking.streak).toBe(3);

    const broken = applyRoundResult({ ...base, streak: 2 }, 3, 5, []);
    expect(broken.streak).toBe(0);
  });

  it("tracks missed words, deduping and capping at the most recent 20", () => {
    const manyMisses = Array.from({ length: 25 }, (_, i) => `word${i}`);
    const result = applyRoundResult(base, 0, 5, manyMisses);
    expect(result.missedWords).toHaveLength(20);
    expect(result.missedWords).toEqual(manyMisses.slice(-20));
  });
});
