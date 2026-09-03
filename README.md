# LexiQuest 📖✨

An AI-powered vocabulary & phonics quest game for ESL and broad literacy learners — built for the [Nerdy AI Hackathon Challenge](https://hackathon.nerdy.com/) (English Reading Game track).

## What it does

LexiQuest generates an endless stream of themed vocabulary rounds using Claude, then turns each round into four short mini-games:

1. **Word Match** — match an emoji + definition to the right word
2. **Word Builder** — reassemble a word from its syllables
3. **Fill the Blank** — pick the word that completes a themed sentence
4. **Listen & Choose** — hear the word spoken aloud and pick it out (phonics/listening)

Difficulty adapts automatically: a perfect round nudges the learner up a level (beginner → intermediate → advanced), a rough round eases back down. XP, levels, streaks, and a personal "words to review" list persist locally between sessions.

## How it's built

- **Next.js (App Router) + TypeScript + Tailwind CSS**
- **Claude (`claude-opus-5`)** generates each round's words, definitions, syllable breakdowns, and fill-in-the-blank sentences as structured JSON via a server-side API route (`app/api/generate-round`)
- **Web Speech API** (`speechSynthesis`) for word pronunciation — no extra service needed
- **localStorage** for per-learner progress (no auth/backend required for the demo)
- **Vitest** unit tests for the leveling/progress logic

## Getting started

```bash
npm install
cp env.example .env.local   # add your ANTHROPIC_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), pick a level and theme, and start a quest.

## Testing

```bash
npm test
```

## What's next

- Speech-to-text read-aloud scoring for a fluency-coaching mode
- Spaced-repetition review sessions built from the "words to review" deck
- Shareable classroom/parent progress view
