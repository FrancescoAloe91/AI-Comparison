"use client";

import { overallScores } from "@/data/mock2026";

export function OverallRankingBars() {
  return (
    <section className="min-w-0">
      <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-500">Overall ranking</h3>
      <div className="radar-panel relative z-0 mt-3 rounded-2xl border border-white/10 p-4">
        <div className="relative z-10 space-y-3.5">
          {overallScores.map((row, idx) => (
            <div key={row.key}>
              <div className="mb-1.5 flex items-center justify-between gap-2 text-xs">
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded-md font-mono text-[10px] font-semibold ${
                      idx === 0
                        ? "bg-gradient-to-br from-amber-400/25 to-amber-600/10 text-amber-100"
                        : idx === 1
                          ? "bg-zinc-600/30 text-zinc-100"
                          : idx === 2
                            ? "bg-orange-900/40 text-orange-100"
                            : "bg-white/5 text-zinc-500"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span
                    className="size-2 shrink-0 rounded-full shadow-[0_0_10px_currentColor]"
                    style={{ color: row.color }}
                  />
                  <span className="truncate font-medium text-zinc-200">{row.label}</span>
                </div>
                <span className="shrink-0 font-mono text-zinc-300 tabular-nums">{row.score}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-black/40 ring-1 ring-white/10">
                <div
                  className="h-full rounded-full transition-[width] duration-500"
                  style={{
                    width: `${row.score}%`,
                    background: `linear-gradient(90deg, ${row.color}55, ${row.color})`,
                    boxShadow: `0 0 20px ${row.color}44`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
