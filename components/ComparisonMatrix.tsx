import {
  comparisonRowsSorted,
  overallScoreBySeriesKey,
  radarMetrics,
  rowToSeriesKey,
  stackIdToEntitySlug,
} from "@/data/mock2026";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const accentRing: Record<string, string> = {
  qvac: "ring-emerald-400/35",
  openai: "ring-sky-400/35",
  ollama: "ring-fuchsia-400/35",
  lmstudio: "ring-amber-400/35",
  apple: "ring-zinc-400/35",
  bittensor: "ring-green-400/35",
};

type Props = { variant?: "full" | "split" };

export function ComparisonMatrix({ variant = "full" }: Props) {
  const split = variant === "split";
  const scoreFor = (id: (typeof comparisonRowsSorted)[number]["id"]) =>
    overallScoreBySeriesKey[rowToSeriesKey[id]];

  const localMetric = radarMetrics.find((m) => m.metric === "Local-first");
  const privacyMetric = radarMetrics.find((m) => m.metric === "Data privacy");
  const valueMetric = radarMetrics.find((m) => m.metric === "Programmable value");

  const inner = (
    <>
      {!split && (
        <>
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Comparison matrix
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-500">
            Ranked by composite score. One snapshot per stack — open the dossier for full write-ups.
          </p>
        </>
      )}
      {split && <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-500">Matrix</h3>}
      <div className={`mt-2 grid gap-2 sm:grid-cols-2 xl:grid-cols-3 ${split ? "" : "mt-10"}`}>
        {comparisonRowsSorted.map((row, idx) => {
          const key = rowToSeriesKey[row.id];
          const local = localMetric?.[key] ?? 0;
          const privacy = privacyMetric?.[key] ?? 0;
          const value = valueMetric?.[key] ?? 0;
          const overall = scoreFor(row.id);
          const ring = accentRing[row.id] ?? "ring-white/15";
          return (
            <article
              key={row.id}
              className={`card-glow flex flex-col rounded-xl border border-white/10 bg-zinc-950/60 p-3 ring-1 ${ring} backdrop-blur-sm transition-shadow hover:border-white/15 sm:rounded-2xl sm:p-3.5`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-mono text-[11px] text-zinc-500">#{idx + 1}</span>
                    <h3 className="truncate text-base font-semibold text-white">{row.name}</h3>
                  </div>
                  <p className="mt-0.5 text-[11px] text-zinc-500">{row.tagline}</p>
                </div>
                <span className="shrink-0 rounded-lg border border-cyan-500/25 bg-cyan-500/10 px-2 py-0.5 font-mono text-sm text-cyan-200">
                  {overall}
                </span>
              </div>

              <Link
                href={`/entities/${stackIdToEntitySlug[row.id]}`}
                className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg border border-cyan-400/35 bg-gradient-to-r from-cyan-500/20 to-emerald-500/10 py-2 text-xs font-semibold text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors hover:border-cyan-300/50 hover:from-cyan-500/30 hover:text-white"
              >
                Open full dossier
                <ArrowUpRight className="size-3.5 shrink-0 opacity-90" aria-hidden />
              </Link>

              <p className="mt-2 line-clamp-2 text-[12px] leading-snug text-zinc-400">{row.model}</p>
              <div className="mt-2 flex flex-wrap gap-1.5 text-[10px]">
                <span className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-zinc-400">
                  L <span className="tabular-nums text-zinc-300">{local}</span>
                </span>
                <span className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-zinc-400">
                  P <span className="tabular-nums text-zinc-300">{privacy}</span>
                </span>
                <span className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-zinc-400">
                  V <span className="tabular-nums text-zinc-300">{value}</span>
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400/85 to-emerald-300/80"
                  style={{ width: `${overall}%` }}
                />
              </div>
            </article>
          );
        })}
      </div>
    </>
  );

  if (split) {
    return <div className="min-w-0">{inner}</div>;
  }

  return (
    <section id="matrix" className="scroll-mt-8 px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-6xl">{inner}</div>
    </section>
  );
}
