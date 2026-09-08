import type { Difficulty } from "./types";

interface DifficultyRubric {
  cefrBand: string;
  wordGuidance: string;
  sentenceGuidance: string;
}

// Anchors "beginner/intermediate/advanced" to concrete, CEFR-inspired
// constraints instead of leaving word/sentence complexity entirely to the
// model's own judgment of what those labels mean.
export const DIFFICULTY_RUBRIC: Record<Difficulty, DifficultyRubric> = {
  beginner: {
    cefrBand: "CEFR A1",
    wordGuidance:
      "High-frequency, concrete, everyday words only (e.g. dog, run, happy, house). 1-2 syllables. No idioms, no abstract nouns, no words with multiple common meanings.",
    sentenceGuidance:
      '5-8 words per sentence. Simple present or simple past tense only. One clause - no conjunctions like "although" or "because", no subordinate clauses.',
  },
  intermediate: {
    cefrBand: "CEFR A2-B1",
    wordGuidance:
      "Common everyday and school vocabulary; 2-3 syllables allowed. Some common abstract nouns and adjectives are fine (e.g. excited, decision, careful). Avoid rare, literary, or technical words.",
    sentenceGuidance:
      "8-14 words per sentence. Simple past/present/future tenses. Basic conjunctions (and, but, because, so) are fine. At most one simple subordinate clause.",
  },
  advanced: {
    cefrBand: "CEFR B1-B2",
    wordGuidance:
      "A wider range of vocabulary is allowed, including multi-syllable and less frequent words - but still words a motivated learner would plausibly encounter, not obscure or highly technical terms.",
    sentenceGuidance:
      "12-20 words per sentence. Varied tenses and sentence structures are expected, including at least one subordinate or relative clause where natural.",
  },
};
