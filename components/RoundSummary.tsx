import type { Round } from "@/lib/types";

const CONFETTI_EMOJI = ["🎉", "✨", "⭐", "🎊"];
const CONFETTI_COUNT = 14;

// Deterministic spread (not Math.random) so this stays a pure render - the
// varied prime-step offsets still read as scattered confetti.
const CONFETTI_PIECES = Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
  id: i,
  left: (i * 37) % 100,
  delay: (i % 7) * 0.05,
  emoji: CONFETTI_EMOJI[i % CONFETTI_EMOJI.length],
}));

function ConfettiBurst() {
  return (
    <div className="relative h-0 pointer-events-none select-none" aria-hidden="true">
      {CONFETTI_PIECES.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 text-xl animate-confetti-fall"
          style={{ left: `${p.left}%`, animationDelay: `${p.delay}s` }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}

export default function RoundSummary({
  round,
  correctCount,
  totalCount,
  missedWords,
  xpEarned,
  onContinue,
}: {
  round: Round;
  correctCount: number;
  totalCount: number;
  missedWords: string[];
  xpEarned: number;
  onContinue: () => void;
}) {
  const accuracy = Math.round((correctCount / totalCount) * 100);
  const perfect = correctCount === totalCount;

  return (
    <div className="max-w-xl mx-auto text-center">
      {perfect && <ConfettiBurst />}
      <div className="text-6xl mb-4 animate-trophy-pop">
        {perfect ? "🏆" : accuracy >= 60 ? "🎉" : "💪"}
      </div>
      <h2 className="text-2xl font-extrabold text-slate-800 mb-1 capitalize">
        {round.theme} quest complete!
      </h2>
      <p className="text-slate-500 mb-6">
        {correctCount} / {totalCount} correct · +{xpEarned} XP
      </p>

      {missedWords.length > 0 && (
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 mb-6 text-left">
          <div className="text-sm font-semibold text-slate-600 mb-2">Words to review</div>
          <div className="flex flex-wrap gap-2">
            {missedWords.map((w) => (
              <span
                key={w}
                className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-sm font-medium capitalize"
              >
                {w}
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onContinue}
        className="w-full rounded-xl bg-amber-400 hover:bg-amber-500 text-white font-bold text-lg py-3 shadow transition"
      >
        Next Quest
      </button>
    </div>
  );
}
