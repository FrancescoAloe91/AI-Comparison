"use client";

import { useEffect, useId, useMemo, useState } from "react";

export type P2PFlowConfig = {
  label: string;
  periodSec: number;
  reversePeriodSec: number;
  hue: string;
  particles: number;
  hub: boolean;
  congestion: number;
};

const defaultDemo: P2PFlowConfig = {
  label: "Live preview · P2P mesh",
  periodSec: 2.4,
  reversePeriodSec: 3.1,
  hue: "#22d3ee",
  particles: 3,
  hub: false,
  congestion: 0.15,
};

export function deriveFlowFromTags(tags: Set<string>, complete: boolean): P2PFlowConfig {
  if (!complete) return defaultDemo;

  const sovereign = tags.has("sovereign");
  const usdt = tags.has("usdt");
  const open = tags.has("open");
  const fiat = tags.has("fiat");
  const hosted = tags.has("hosted");
  const qvacShape = tags.has("qvac_shape");
  const oss = tags.has("oss_runtime");
  const kyc = tags.has("kyc");

  if (sovereign && qvacShape && usdt && open) {
    return {
      label: "Aligned: local suite + programmable settlement",
      periodSec: 1.9,
      reversePeriodSec: 2.2,
      hue: "#34d399",
      particles: 5,
      hub: true,
      congestion: 0.08,
    };
  }
  if (sovereign && oss && tags.has("no_rail")) {
    return {
      label: "Inference-first: value rail not in loop",
      periodSec: 4.5,
      reversePeriodSec: 5.2,
      hue: "#a78bfa",
      particles: 1,
      hub: false,
      congestion: 0.45,
    };
  }
  if (hosted && fiat && kyc) {
    return {
      label: "Heavy compliance: human gates between bursts",
      periodSec: 6.2,
      reversePeriodSec: 7.0,
      hue: "#fb7185",
      particles: 1,
      hub: true,
      congestion: 0.65,
    };
  }
  if (usdt && !sovereign) {
    return {
      label: "Remote runtime: settlement competes with latency",
      periodSec: 3.4,
      reversePeriodSec: 3.9,
      hue: "#38bdf8",
      particles: 2,
      hub: false,
      congestion: 0.35,
    };
  }

  return {
    label: "Hybrid routing · mixed automation",
    periodSec: 2.8,
    reversePeriodSec: 3.4,
    hue: "#e879f9",
    particles: 3,
    hub: false,
    congestion: 0.25,
  };
}

type Props = {
  config: P2PFlowConfig;
  rateMultiplier: number;
};

export function UsdtP2PFlow({ config, rateMultiplier }: Props) {
  const gid = useId();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 900);
    return () => window.clearInterval(id);
  }, []);

  const pathForward = "M 56 88 C 140 28 260 28 344 88";
  const pathBack = "M 344 92 C 260 152 140 152 56 92";

  const durF = (config.periodSec / rateMultiplier) * (1 + config.congestion);
  const durB = (config.reversePeriodSec / rateMultiplier) * (1 + config.congestion);

  const volume = useMemo(() => {
    const base = 12.4 + (tick % 17) * 0.31 + config.particles * 2.1;
    return base.toFixed(2);
  }, [tick, config.particles]);

  const tps = (config.particles / durF + Math.max(0, config.particles - 1) / durB).toFixed(2);

  const strokeGrad = `${gid}-stroke`;

  return (
    <div className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-zinc-950/90 to-zinc-950/50 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-cyan-200/80">USDT · P2P flow</p>
        <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-zinc-400">
          {config.label}
        </span>
      </div>

      <div className="relative mt-3">
        <svg viewBox="0 0 400 168" className="h-40 w-full" role="img" aria-label="Animated peer to peer USDT flow">
          <defs>
            <linearGradient id={strokeGrad} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={config.hue} stopOpacity="0.25" />
              <stop offset="100%" stopColor={config.hue} stopOpacity="0.75" />
            </linearGradient>
          </defs>

          <path d={pathForward} fill="none" stroke={`url(#${strokeGrad})`} strokeWidth="2" />
          <path d={pathBack} fill="none" stroke={config.hue} strokeWidth="1.25" strokeOpacity="0.35" />

          {config.hub && (
            <>
              <circle cx="200" cy="60" r="10" fill="#09090b" stroke={config.hue} strokeWidth="1.5" />
              <text x="200" y="64" textAnchor="middle" fill="#a1a1aa" style={{ fontSize: 9, fontFamily: "ui-monospace" }}>
                H
              </text>
              <path
                d="M 56 88 L 190 62 M 210 62 L 344 88"
                fill="none"
                stroke={config.hue}
                strokeWidth="1"
                strokeOpacity="0.28"
                strokeDasharray="4 4"
              />
            </>
          )}

          <circle cx="56" cy="88" r="14" fill="#09090b" stroke={config.hue} strokeWidth="1.5" />
          <text x="56" y="92" textAnchor="middle" fill="#e4e4e7" style={{ fontSize: 10, fontFamily: "ui-monospace" }}>
            A
          </text>
          <circle cx="344" cy="88" r="14" fill="#09090b" stroke={config.hue} strokeWidth="1.5" />
          <text x="344" y="92" textAnchor="middle" fill="#e4e4e7" style={{ fontSize: 10, fontFamily: "ui-monospace" }}>
            B
          </text>

          {Array.from({ length: config.particles }).map((_, i) => (
            <circle key={`f-${i}`} cx="0" cy="0" r="5" fill={config.hue} fillOpacity="0.95">
              <animateMotion
                dur={`${durF + i * 0.15}s`}
                repeatCount="indefinite"
                begin={`${i * 0.35}s`}
                path={pathForward}
                rotate="auto"
              />
            </circle>
          ))}
          {Array.from({ length: Math.max(1, config.particles - 1) }).map((_, i) => (
            <circle key={`b-${i}`} cx="0" cy="0" r="4" fill="#fafafa" fillOpacity="0.88">
              <animateMotion
                dur={`${durB + i * 0.2}s`}
                repeatCount="indefinite"
                begin={`${0.4 + i * 0.45}s`}
                path={pathBack}
                rotate="auto"
              />
            </circle>
          ))}
        </svg>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-1">
          <div className="rounded-full border border-white/10 bg-black/50 px-3 py-1 font-mono text-[10px] text-cyan-100/90 backdrop-blur-sm">
            <span className="text-zinc-500">Σ</span> {volume} USDT · <span className="text-zinc-500">λ</span> {tps} tx/s ·{" "}
            <span className="text-zinc-500">hub</span> {config.hub ? "on" : "off"}
          </div>
        </div>
      </div>
    </div>
  );
}
