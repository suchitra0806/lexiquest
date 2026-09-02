export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface QuestWord {
  word: string;
  definition: string;
  emoji: string;
  syllables: string[];
  distractors: string[];
}

export interface QuestSentence {
  text: string;
  answer: string;
  distractors: string[];
}

export interface Round {
  theme: string;
  difficulty: Difficulty;
  words: QuestWord[];
  sentences: QuestSentence[];
}

export const THEMES = [
  "animals",
  "food",
  "travel",
  "weather",
  "sports",
  "school",
  "family",
  "nature",
] as const;

export type Theme = (typeof THEMES)[number];
