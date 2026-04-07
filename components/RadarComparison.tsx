"use client";

import { overallScoreBySeriesKey, radarMetrics, radarSeries, radarSeriesSorted } from "@/data/mock2026";
import type { RadarSeriesKey } from "@/data/mock2026";
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";

const chartData = radarMetrics;

const fillFor = (key: RadarSeriesKey, split: boolean) => {
  const base = radarSeries.find((r) => r.key === key)?.fillOpacity ?? 0.14;
  if (!split) return base;
  return Math.min(0.24, base * 1.2);
};

type Props = { variant?: "full" | "split" };

export function RadarComparison({ variant = "full" }: Props) {
  const split = variant === "split";
  const chartHeight = split ? 430 : 560;

  const inner = (
    <>
      {!split && (
        <>
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Multi-axis radar</h2>
          <p className="mt-3 max-w-2xl text-zinc-500">
            Same five dimensions for every stack. Overall score is the simple mean of the five axes on a 0–100 scale.
          </p>
        </>
      )}
      {split && <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-500">Radar &amp; legend</h3>}
      <div
        className={`radar-panel relative z-0 mt-2 w-full rounded-2xl border border-cyan-500/20 p-3 sm:p-4 ${split ? "" : "mt-10"}`}
      >
        <div className={split ? "grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(240px,280px)]" : ""}>
          <div className="relative z-10" style={{ height: chartHeight }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                cx="50%"
                cy="51%"
                outerRadius={split ? "80%" : "82%"}
                data={chartData}
                margin={{ top: 12, right: 12, bottom: split ? 6 : 24, left: 12 }}
              >
                <PolarGrid stroke="rgba(255,255,255,0.12)" radialLines strokeDasharray="0" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: "#a1a1aa", fontSize: split ? 11 : 11 }} tickLine={false} />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fill: "#71717a", fontSize: 9 }}
                  tickCount={6}
                  stroke="rgba(255,255,255,0.08)"
                />
                {radarSeriesSorted.map((s, idx) => (
                  <Radar
                    key={s.key}
                    name={s.label}
                    dataKey={s.key}
                    stroke={s.color}
                    fill={s.color}
                    fillOpacity={fillFor(s.key, split)}
                    strokeWidth={idx === 0 ? 3 : idx < 3 ? 2.4 : 1.8}
                    strokeOpacity={idx === 0 ? 1 : 0.9}
                    dot={{ r: split ? 2.7 : 3.2, fill: s.color, strokeWidth: 0 }}
                    activeDot={{ r: 6, stroke: "#fff", strokeWidth: 1 }}
                    isAnimationActive
                    animationDuration={900}
                    animationEasing="ease-out"
                  />
                ))}
                <Tooltip
                  contentStyle={{
                    background: "rgba(9,9,11,0.94)",
                    border: "1px solid rgba(34,211,238,0.2)",
                    borderRadius: "12px",
                    color: "#e4e4e7",
                    fontSize: 12,
                    boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
                  }}
                  labelStyle={{ color: "#a1a1aa", marginBottom: 4 }}
                />
                {!split && (
                  <Legend
                    wrapperStyle={{ paddingTop: 12, color: "#d4d4d8", fontSize: 11 }}
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                  />
                )}
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {split && (
            <div className="relative z-10 flex flex-col justify-center gap-2 lg:pl-1">
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-500">Overall ranking (0-100)</p>
              {radarSeriesSorted.map((s, idx) => {
                const score = overallScoreBySeriesKey[s.key];
                return (
                  <div
                    key={`legend-${s.key}`}
                    className="rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-[11px] backdrop-blur-sm"
                  >
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <span
                          className={`flex size-5 shrink-0 items-center justify-center rounded-md font-mono text-[10px] ${
                            idx === 0
                              ? "bg-amber-500/20 text-amber-200"
                              : idx === 1
                                ? "bg-zinc-500/25 text-zinc-200"
                                : idx === 2
                                  ? "bg-orange-900/30 text-orange-200"
                                  : "text-zinc-500"
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className="size-2 shrink-0 rounded-full shadow-[0_0_8px_currentColor]" style={{ color: s.color }} />
                        <span className="truncate font-medium text-zinc-200">{s.label}</span>
                      </div>
                      <span className="shrink-0 font-mono text-cyan-200/90 tabular-nums">{score}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${score}%`, background: `linear-gradient(90deg, ${s.color}80, ${s.color})` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {split && (
          <div className="relative z-10 mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1 border-t border-white/10 pt-2.5 text-[10px] text-zinc-500">
            <span>Local-first</span>
            <span className="text-zinc-700">·</span>
            <span>Data privacy</span>
            <span className="text-zinc-700">·</span>
            <span>Product suite</span>
            <span className="text-zinc-700">·</span>
            <span>Open stack</span>
            <span className="text-zinc-700">·</span>
            <span>Programmable value</span>
          </div>
        )}
      </div>
    </>
  );

  if (split) {
    return <div className="min-w-0">{inner}</div>;
  }

  return (
    <section id="radar" className="scroll-mt-8 px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-6xl">{inner}</div>
    </section>
  );
}
