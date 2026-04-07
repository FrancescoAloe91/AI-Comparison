"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "qvac-lens-welcome-v1";

export function WelcomeDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      if (window.localStorage.getItem(STORAGE_KEY)) return;
      setOpen(true);
    } catch {
      /* ignore */
    }
  }, []);

  function dismiss() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Close welcome dialog"
        onClick={dismiss}
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-cyan-500/25 bg-zinc-950/95 p-5 shadow-[0_0_60px_-12px_rgba(34,211,238,0.35)]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200/80">QVAC Local AI Lens</p>
        <h2 id="welcome-title" className="mt-2 text-lg font-semibold tracking-tight text-white">
          What this site is
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          A static comparison lens for local-first AI stacks: radar, composite ranking, and short matrix rows, plus
          per-entity dossiers with curated facts and links. Scores are illustrative—not a vendor benchmark or investment
          advice.
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="mt-5 w-full rounded-xl border border-cyan-500/35 bg-cyan-500/15 py-2.5 text-sm font-medium text-cyan-100 transition-colors hover:border-cyan-400/50 hover:bg-cyan-500/25"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
