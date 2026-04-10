import type { ComparisonCategory } from "@/data/mock2026";
import {
  sdkRowsSorted,
  sdkOverallByKey,
  sdkIdToRadarKey,
  sdkIdToEntitySlug,
  appRowsSorted,
  appOverallByKey,
  appIdToRadarKey,
  appIdToEntitySlug,
} from "@/data/mock2026";
import type { SdkId, AppId } from "@/data/mock2026";
import { AlertTriangle, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const accentRing: Record<string, string> = {
  qvac: "ring-emerald-400/35",
  ollama: "ring-fuchsia-400/35",
  llamacpp: "ring-amber-400/35",
  mlx: "ring-zinc-400/35",
  localai: "ring-sky-400/35",
  vllm: "ring-orange-400/35",
  lmstudio: "ring-amber-400/35",
  jan: "ring-fuchsia-400/35",
  osaurus: "ring-sky-400/35",
  apple: "ring-zinc-400/35",
};

type Props = { variant?: "full" | "split"; category?: ComparisonCategory };

export function ComparisonMatrix({ variant = "full", category = "sdk" }: Props) {
  const split = variant === "split";

  const rows = category === "sdk" ? sdkRowsSorted : appRowsSorted;
  const overallByKey = category === "sdk" ? sdkOverallByKey : appOverallByKey;
  const idToRadarKey = category === "sdk" ? sdkIdToRadarKey : appIdToRadarKey;
  const idToSlug = category === "sdk" ? sdkIdToEntitySlug : appIdToEntitySlug;

  const scoreFor = (id: string) => {
    const key = (idToRadarKey as Record<string, string>)[id];
    return overallByKey[key] ?? 0;
  };

  const slugFor = (id: string) =>
    (idToSlug as Record<string, string>)[id] ?? id;

  const inner = (
    <>
      {!split && (
        <>
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Comparison matrix</h2>
          <p className="mt-3 max-w-2xl text-zinc-500">
            Ranked by composite score. One snapshot per entry — open the dossier for full write-ups.
          </p>
        </>
      )}
      {split && <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-500">Matrix</h3>}
      <div className={`mt-2 grid gap-2 sm:grid-cols-2 xl:grid-cols-3 ${split ? "" : "mt-10"}`}>
        {rows.map((row, idx) => {
          const overall = scoreFor(row.id);
          const ring = accentRing[row.accent] ?? "ring-white/15";
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
                href={`/entities/${slugFor(row.id)}`}
                className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg border border-cyan-400/35 bg-gradient-to-r from-cyan-500/20 to-emerald-500/10 py-2 text-xs font-semibold text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors hover:border-cyan-300/50 hover:from-cyan-500/30 hover:text-white"
              >
                Open full dossier
                <ArrowUpRight className="size-3.5 shrink-0 opacity-90" aria-hidden />
              </Link>

              <p className="mt-2 line-clamp-2 text-[12px] leading-snug text-zinc-400">{row.description}</p>

              {row.note && (
                <p className="mt-1.5 flex items-start gap-1.5 rounded-md border border-amber-500/20 bg-amber-500/5 px-2 py-1.5 text-[10px] leading-snug text-amber-200/80">
                  <AlertTriangle className="mt-0.5 size-3 shrink-0" aria-hidden />
                  {row.note}
                </p>
              )}

              <div className="mt-auto pt-2">
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400/85 to-emerald-300/80"
                    style={{ width: `${overall}%` }}
                  />
                </div>
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
