import { XP_PER_LEVEL } from "@/lib/progress";
import type { Progress } from "@/lib/progress";

export default function ProgressHeader({ progress }: { progress: Progress }) {
  const xpIntoLevel = progress.xp % XP_PER_LEVEL;
  const pct = (xpIntoLevel / XP_PER_LEVEL) * 100;

  return (
    <div className="w-full max-w-xl mx-auto flex items-center gap-4 mb-6">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-400 text-white font-bold text-lg shrink-0 shadow">
        {progress.level}
      </div>
      <div className="flex-1">
        <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-amber-400 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="text-xs text-slate-500 mt-1">
          Level {progress.level} · {progress.xp} XP
          {progress.streak > 1 ? ` · 🔥 ${progress.streak} round streak` : ""}
        </div>
      </div>
    </div>
  );
}
