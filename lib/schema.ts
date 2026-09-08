import { z } from "zod";
import type { Difficulty } from "./types";

const questWordSchema = z.object({
  word: z.string().min(1),
  definition: z.string().min(1),
  emoji: z.string().min(1),
  syllables: z.array(z.string().min(1)).min(1),
  distractors: z.array(z.string().min(1)).length(3),
});

const questSentenceSchema = z.object({
  text: z.string().min(1).refine((t) => t.includes("___"), "sentence must contain a ___ blank"),
  answer: z.string().min(1),
  distractors: z.array(z.string().min(1)).length(3),
});

const difficultySchema = z.custom<Difficulty>(
  (v) => v === "beginner" || v === "intermediate" || v === "advanced",
);

export function buildRoundSchema(expectedWordCount: number) {
  return z.object({
    theme: z.string().min(1),
    difficulty: difficultySchema,
    words: z.array(questWordSchema).length(expectedWordCount),
    sentences: z.array(questSentenceSchema).length(expectedWordCount),
  });
}
