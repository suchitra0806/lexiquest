import { describe, expect, it } from "vitest";
import { buildComprehensionChallenges } from "../buildChallenges";
import type { Round } from "../types";

const round: Round = {
  theme: "animals",
  difficulty: "beginner",
  words: [
    { word: "dog", definition: "A friendly animal.", emoji: "🐶", syllables: ["dog"], distractors: ["cat", "sun", "run"] },
  ],
  sentences: [{ text: "The ___ barked.", answer: "dog", distractors: ["cat", "sun", "run"] }],
  passage: {
    text: "Sam has a small dog named Rex. Rex likes to run in the park.",
    question: "What does Rex like to do?",
    answer: "run in the park",
    distractors: ["sleep all day", "climb a tree", "eat fish"],
  },
};

describe("buildComprehensionChallenges", () => {
  it("builds exactly one challenge from the round's passage", () => {
    const challenges = buildComprehensionChallenges(round);
    expect(challenges).toHaveLength(1);
  });

  it("uses the passage's answer as the correct answer and includes all distractors as choices", () => {
    const [challenge] = buildComprehensionChallenges(round);
    expect(challenge.correctAnswer).toBe("run in the park");
    expect(challenge.choices).toEqual(["run in the park", "sleep all day", "climb a tree", "eat fish"]);
  });
});
