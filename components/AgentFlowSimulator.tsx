"use client";

import rules from "@/data/simulator-rules.json";
import { UsdtP2PFlow, deriveFlowFromTags } from "@/components/UsdtP2PFlow";
import { ChevronRight, Gauge, RotateCcw, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

type Step = (typeof rules.steps)[number];
type Option = Step["options"][number];

function collectTags(selections: Record<string, string | undefined>): Set<string> {
  const tags = new Set<string>();
  for (const step of rules.steps) {
    const optId = selections[step.id];
    const opt = step.options.find((o: Option) => o.id === optId);
    if (opt) for (const t of opt.tags) tags.add(t);
  }
  return tags;
}

function resolveOutcome(selections: Record<string, string | undefined>) {
  const tags = collectTags(selections);
  for (const o of rules.outcomes) {
    const need = o.when.allOf as string[];
    if (need.every((t) => tags.has(t))) return o;
  }
  return rules.defaultOutcome;
}

export function AgentFlowSimulator() {
  const [selections, setSelections] = useState<Record<string, string | undefined>>({});
  const [ratePct, setRatePct] = useState(100);

  const outcome = useMemo(() => resolveOutcome(selections), [selections]);
  const complete = rules.steps.every((s) => Boolean(selections[s.id]));
  const tags = useMemo(() => collectTags(selections), [selections]);

  const flowConfig = useMemo(() => deriveFlowFromTags(tags, complete), [tags, complete]);
  const rateMultiplier = ratePct / 100;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <UsdtP2PFlow config={flowConfig} rateMultiplier={rateMultiplier} />

      <div className="rounded-xl border border-white/10 bg-zinc-950/50 px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
            <Gauge className="size-4 text-cyan-400/80" aria-hidden />
            Flow rate
          </div>
          <span className="font-mono text-xs text-cyan-200/90">{ratePct}%</span>
        </div>
        <input
          type="range"
          min={40}
          max={220}
          step={5}
          value={ratePct}
          onChange={(e) => setRatePct(Number(e.target.value))}
          className="mt-2 h-2 w-full cursor-pointer accent-cyan-500"
          aria-label="Adjust animation speed of USDT flow"
        />
        <p className="mt-2 text-[11px] leading-snug text-zinc-600">
          Moves faster or slower — the topology and colors react to your answers below when the run is complete.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-6 backdrop-blur-md">
        <div className="flex items-center gap-2 text-cyan-200">
          <Sparkles className="size-5" aria-hidden />
          <h2 className="text-lg font-semibold text-white">Routing & settlement (UX only)</h2>
        </div>
        <p className="mt-2 text-sm text-zinc-500">
          Each choice updates tags that drive both the narrative outcome and the live flow visualization — no chain, no
          real transfers.
        </p>

        <ol className="mt-8 space-y-6">
          {rules.steps.map((step: Step, idx: number) => (
            <li key={step.id}>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Step {idx + 1}</p>
              <p className="mt-1 font-medium text-white">{step.title}</p>
              <div className="mt-3 flex flex-col gap-2">
                {step.options.map((opt: Option) => {
                  const active = selections[step.id] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelections((s) => ({ ...s, [step.id]: opt.id }))}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                        active
                          ? "border-cyan-400/40 bg-cyan-500/10 text-cyan-50"
                          : "border-white/10 bg-white/[0.02] text-zinc-300 hover:border-white/20"
                      }`}
                    >
                      {opt.label}
                      <ChevronRight className={`size-4 shrink-0 ${active ? "text-cyan-300" : "text-zinc-600"}`} />
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 border-t border-white/10 pt-6">
          {!complete ? (
            <p className="text-sm text-zinc-500">Finish all steps — the flow above previews a neutral mesh until then.</p>
          ) : (
            <div className="rounded-xl border border-fuchsia-500/25 bg-fuchsia-950/20 p-4">
              <span className="inline-block rounded-md border border-fuchsia-400/30 bg-fuchsia-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-fuchsia-200">
                {outcome.badge}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-white">{outcome.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{outcome.body}</p>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            setSelections({});
            setRatePct(100);
          }}
          className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-cyan-300"
        >
          <RotateCcw className="size-3.5" aria-hidden />
          Reset
        </button>
      </div>
    </div>
  );
}
