import { describe, expect, it } from "vitest";
import { buildRoundSchema } from "../schema";
import { FALLBACK_ROUNDS, pickFallbackRound } from "../fallbackRounds";

const validWord = {
  word: "cat",
  definition: "A small furry animal.",
  emoji: "🐱",
  syllables: ["cat"],
  distractors: ["hat", "big", "top"],
};

const validSentence = {
  text: "The ___ sat on the mat.",
  answer: "cat",
  distractors: ["hat", "big", "top"],
};

function roundOf(count: number) {
  return {
    theme: "animals",
    difficulty: "beginner",
    words: Array.from({ length: count }, (_, i) => ({ ...validWord, word: `word${i}` })),
    sentences: Array.from({ length: count }, () => validSentence),
  };
}

describe("buildRoundSchema", () => {
  it("accepts a round with the expected word count", () => {
    const schema = buildRoundSchema(5);
    expect(schema.safeParse(roundOf(5)).success).toBe(true);
  });

  it("rejects a round with the wrong word count", () => {
    const schema = buildRoundSchema(5);
    expect(schema.safeParse(roundOf(3)).success).toBe(false);
  });

  it("rejects a sentence with no blank", () => {
    const schema = buildRoundSchema(1);
    const bad = roundOf(1);
    bad.sentences[0] = { ...validSentence, text: "The cat sat on the mat." };
    expect(schema.safeParse(bad).success).toBe(false);
  });

  it("rejects distractor arrays that aren't exactly length 3", () => {
    const schema = buildRoundSchema(1);
    const bad = roundOf(1);
    bad.words[0] = { ...validWord, distractors: ["only", "two"] };
    expect(schema.safeParse(bad).success).toBe(false);
  });
});

describe("fallback rounds", () => {
  const schema5 = buildRoundSchema(5);

  it("every fallback round is itself schema-valid", () => {
    for (const round of FALLBACK_ROUNDS) {
      expect(schema5.safeParse(round).success).toBe(true);
    }
  });

  it("picks one of the known fallback rounds", () => {
    const picked = pickFallbackRound();
    expect(FALLBACK_ROUNDS).toContain(picked);
  });
});
