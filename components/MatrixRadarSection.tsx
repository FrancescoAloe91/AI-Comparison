"use client";

import { ComparisonMatrix } from "@/components/ComparisonMatrix";
import { RadarComparison } from "@/components/RadarComparison";
import type { ComparisonCategory } from "@/data/mock2026";
import { useState } from "react";

const sdkGuide = [
  { k: "On-device perf", d: "Raw inference speed and efficiency on consumer hardware." },
  { k: "Hardware breadth", d: "Range of supported platforms: CPU, GPU, Apple Silicon, etc." },
  { k: "API maturity", d: "Quality and compatibility of APIs (OpenAI-compatible, SDKs)." },
  { k: "Ecosystem", d: "Community size, integrations, and third-party tooling." },
  { k: "Setup simplicity", d: "How easy it is to install and get running." },
  { k: "Backing", d: "Strength of corporate or organizational support behind the project." },
];

const appGuide = [
  { k: "Privacy & offline", d: "How private and fully-offline the experience is." },
  { k: "UX & polish", d: "Quality of the user interface and overall experience." },
  { k: "Model library", d: "Range and ease of model access — browsing, downloading, switching." },
  { k: "Extensibility", d: "Agents, plugins, tools, MCP, and customization surface." },
  { k: "Platform breadth", d: "Support for macOS, Windows, Linux, and mobile." },
  { k: "Backing", d: "Strength of corporate or organizational support behind the project." },
];

const tabs: { key: ComparisonCategory; label: string; sub: string }[] = [
  { key: "sdk", label: "SDKs & Frameworks", sub: "For developers building with local AI" },
  { key: "app", label: "Desktop Apps", sub: "For end-users running models locally" },
];

export function MatrixRadarSection() {
  const [cat, setCat] = useState<ComparisonCategory>("sdk");
  const guide = cat === "sdk" ? sdkGuide : appGuide;

  return (
    <section id="analysis" className="scroll-mt-8 border-b border-white/10 px-6 py-4 lg:px-10 lg:py-5">
      <div className="mx-auto max-w-6xl">
        {/* tab bar */}
        <div className="mb-3 flex gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setCat(t.key)}
              className={`flex-1 rounded-xl border px-4 py-2.5 text-left transition-colors ${
                cat === t.key
                  ? "border-cyan-500/40 bg-cyan-500/10 text-white"
                  : "border-white/10 bg-white/[0.02] text-zinc-500 hover:border-white/20 hover:text-zinc-300"
              }`}
            >
              <p className="text-sm font-semibold">{t.label}</p>
              <p className="mt-0.5 text-[11px] leading-snug opacity-70">{t.sub}</p>
            </button>
          ))}
        </div>

        {/* axes guide */}
        <div className="mb-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 sm:p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200/70">Compare</p>
          <h2 className="mt-0.5 text-lg font-semibold tracking-tight text-white sm:text-xl">
            {cat === "sdk" ? "SDKs & Frameworks" : "Desktop Apps"} — axes
          </h2>
          <p className="mt-1 text-[13px] leading-snug text-zinc-500">
            Six axes (0–100 each). Radar = shape; legend = composite mean; matrix = snapshot + dossier link.
          </p>
          <div className="mt-3 grid gap-1.5 sm:grid-cols-2 xl:grid-cols-3">
            {guide.map((g) => (
              <article key={g.k} className="rounded-lg border border-white/10 bg-zinc-950/40 p-2">
                <p className="text-[11px] font-semibold tracking-tight text-zinc-200">{g.k}</p>
                <p className="mt-0.5 text-[10px] leading-snug text-zinc-500">{g.d}</p>
              </article>
            ))}
          </div>
        </div>

        <div id="radar" className="scroll-mt-16">
          <RadarComparison variant="split" category={cat} />
        </div>
        <div id="matrix" className="scroll-mt-16 mt-4">
          <ComparisonMatrix variant="split" category={cat} />
        </div>
      </div>
    </section>
  );
}
