"use client";

import { randomTickerLine } from "@/data/mock2026";
import { Radio } from "lucide-react";
import { useEffect, useState } from "react";

export function SettlementTicker() {
  const [line, setLine] = useState("Initializing local AI + payment-horizon ticker…");

  useEffect(() => {
    setLine(randomTickerLine());
    const id = window.setInterval(() => setLine(randomTickerLine()), 2800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <aside className="mx-6 mb-3 lg:mx-10">
      <div className="card-glow mx-auto max-w-6xl overflow-hidden rounded-xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/35 via-zinc-950/80 to-fuchsia-950/25 px-3 py-2.5 backdrop-blur-md sm:flex sm:items-center sm:gap-3 sm:px-4">
        <div className="flex shrink-0 items-center gap-2 text-cyan-300">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-400 opacity-40" />
            <span className="relative inline-flex size-2.5 rounded-full bg-cyan-400" />
          </span>
          <Radio className="size-4 opacity-90" aria-hidden />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/90">
            Telemetry (sim)
          </span>
        </div>
        <p className="mt-3 font-mono text-sm leading-relaxed text-zinc-200 sm:mt-0 sm:min-w-0 sm:flex-1 sm:truncate">
          <span className="text-zinc-500">// </span>
          {line}
        </p>
      </div>
    </aside>
  );
}
