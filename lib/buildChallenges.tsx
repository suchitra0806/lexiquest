import type { Round } from "./types";
import type { Challenge } from "@/components/ChallengeRound";

export function buildMatchChallenges(round: Round): Challenge[] {
  return round.words.map((w) => ({
    key: `match-${w.word}`,
    prompt: (
      <div>
        <div className="text-5xl mb-3">{w.emoji}</div>
        <div className="text-slate-600">{w.definition}</div>
      </div>
    ),
    correctAnswer: w.word,
    choices: [w.word, ...w.distractors],
  }));
}

export function buildBuilderChallenges(round: Round): Challenge[] {
  return round.words.map((w) => ({
    key: `build-${w.word}`,
    prompt: (
      <div>
        <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">
          Which word do these syllables spell?
        </div>
        <div className="text-3xl font-bold text-amber-600 tracking-widest">
          {w.syllables.join(" · ")}
        </div>
      </div>
    ),
    correctAnswer: w.word,
    choices: [w.word, ...w.distractors],
  }));
}

export function buildBlankChallenges(round: Round): Challenge[] {
  return round.sentences.map((s) => ({
    key: `blank-${s.answer}`,
    prompt: (
      <div className="text-xl font-medium text-slate-700">
        {s.text.split("___").map((part, i, arr) => (
          <span key={i}>
            {part}
            {i < arr.length - 1 && (
              <span className="inline-block px-3 border-b-2 border-amber-400 text-amber-500">
                ?
              </span>
            )}
          </span>
        ))}
      </div>
    ),
    correctAnswer: s.answer,
    choices: [s.answer, ...s.distractors],
  }));
}

export function buildPhonicsChallenges(round: Round): Challenge[] {
  return round.words.map((w) => ({
    key: `phonics-${w.word}`,
    prompt: <PhonicsPrompt word={w.word} />,
    correctAnswer: w.word,
    choices: [w.word, ...w.distractors],
  }));
}

function PhonicsPrompt({ word }: { word: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-xs uppercase tracking-wide text-slate-400">Listen, then pick the word</div>
      <button
        type="button"
        onClick={async () => {
          const { speak } = await import("./tts");
          speak(word);
        }}
        className="w-16 h-16 rounded-full bg-amber-400 hover:bg-amber-500 text-white text-2xl flex items-center justify-center shadow transition"
        aria-label={`Play pronunciation`}
      >
        🔊
      </button>
    </div>
  );
}
