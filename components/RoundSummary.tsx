import type { Round } from "@/lib/types";

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
      <div className="text-6xl mb-4">{perfect ? "🏆" : accuracy >= 60 ? "🎉" : "💪"}</div>
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
