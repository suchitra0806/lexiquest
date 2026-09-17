import { describe, expect, it } from "vitest";
import { DIFFICULTY_RUBRIC } from "../difficultyRubric";
import type { Difficulty } from "../types";

const DIFFICULTIES: Difficulty[] = ["beginner", "intermediate", "advanced"];

describe("DIFFICULTY_RUBRIC", () => {
  it("defines concrete word and sentence guidance for every difficulty level", () => {
    for (const level of DIFFICULTIES) {
      const rubric = DIFFICULTY_RUBRIC[level];
      expect(rubric.cefrBand.length).toBeGreaterThan(0);
      expect(rubric.wordGuidance.length).toBeGreaterThan(0);
      expect(rubric.sentenceGuidance.length).toBeGreaterThan(0);
    }
  });

  it("escalates CEFR band from beginner to advanced", () => {
    expect(DIFFICULTY_RUBRIC.beginner.cefrBand).toContain("A1");
    expect(DIFFICULTY_RUBRIC.advanced.cefrBand).toContain("B2");
  });
});
