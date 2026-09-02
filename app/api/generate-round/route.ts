import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import type { Round, Difficulty } from "@/lib/types";
import { THEMES } from "@/lib/types";

const anthropic = new Anthropic();

function buildPrompt(difficulty: Difficulty, theme: string) {
  return `Generate one vocabulary and phonics quest round for someone learning English literacy (ESL / broad literacy learner).

Difficulty: ${difficulty}
Theme: ${theme}

Return ONLY valid JSON, no markdown fences, no commentary, matching exactly this shape:

{
  "theme": "${theme}",
  "difficulty": "${difficulty}",
  "words": [
    {
      "word": string,
      "definition": string (one short, simple sentence a ${difficulty} learner can understand),
      "emoji": string (a single emoji that represents the word),
      "syllables": string[] (the word split into its syllables, lowercase),
      "distractors": string[] (exactly 3 other simple, unrelated words of similar difficulty)
    }
  ],
  "sentences": [
    {
      "text": string (a short sentence about the theme with a blank shown as "___" where one of the words fits),
      "answer": string (must exactly match the word for this entry, lowercase),
      "distractors": string[] (exactly 3 other words that would NOT fit grammatically or logically in this sentence)
    }
  ]
}

Rules:
- Exactly 5 entries in "words" and exactly 5 entries in "sentences", in the same order, both about the theme "${theme}".
- Vocabulary and sentence complexity must be strictly appropriate for a ${difficulty} English learner.
- Do not repeat words across the round.
- Output nothing besides the JSON object.`;
}

export async function POST(req: NextRequest) {
  let body: { difficulty?: Difficulty; theme?: string } = {};
  try {
    body = await req.json();
  } catch {
    // no body provided, fall back to defaults below
  }

  const difficulty: Difficulty = body.difficulty ?? "beginner";
  const theme = body.theme ?? THEMES[Math.floor(Math.random() * THEMES.length)];

  try {
    const response = await anthropic.messages.create({
      model: "claude-opus-5",
      max_tokens: 4096,
      output_config: { effort: "low" },
      messages: [{ role: "user", content: buildPrompt(difficulty, theme) }],
    });

    const textBlock = response.content.find(
      (block): block is Anthropic.TextBlock => block.type === "text",
    );
    if (!textBlock) {
      return NextResponse.json({ error: "No content generated" }, { status: 502 });
    }

    const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Malformed AI response" }, { status: 502 });
    }

    const round = JSON.parse(jsonMatch[0]) as Round;
    if (!Array.isArray(round.words) || !Array.isArray(round.sentences)) {
      return NextResponse.json({ error: "Malformed round shape" }, { status: 502 });
    }

    return NextResponse.json(round);
  } catch (err) {
    console.error("generate-round failed:", err);
    return NextResponse.json({ error: "Failed to generate round" }, { status: 500 });
  }
}
