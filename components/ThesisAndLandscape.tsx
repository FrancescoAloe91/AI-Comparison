import { Activity, ArrowRight, Cpu, Layers, Shield, Sparkles } from "lucide-react";
import Link from "next/link";

export function ThesisAndLandscape() {
  return (
    <section id="intro" className="scroll-mt-8 border-b border-white/10 px-6 py-4 sm:py-5 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="card-glow relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-950/95 via-zinc-950/80 to-cyan-950/25 p-4 sm:p-5">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-cyan-500/10 blur-3xl"
          />
          <div className="relative grid gap-5 lg:grid-cols-12 lg:gap-6">
            <div id="top" className="lg:col-span-7">
              <p className="mb-1.5 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200/90">
                <Activity className="size-3" aria-hidden />
                Thesis
              </p>
              <h1 className="text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                <span className="bg-gradient-to-r from-cyan-200 via-emerald-200 to-fuchsia-200 bg-clip-text text-transparent">
                  Local-first AI
                </span>{" "}
                — comparative lens
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
                This page compares the local AI landscape in two categories that
                match how the market actually works:{" "}
                <strong className="text-zinc-300">SDKs &amp; frameworks</strong>{" "}
                for developers building with local inference, and{" "}
                <strong className="text-zinc-300">desktop apps</strong> for
                end-users running models on their own hardware. Each category
                has its own radar, axes, and matrix — so you&apos;re always
                comparing apples to apples.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-zinc-400">
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1">0–100 scale</span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1">
                  Overall = mean of six axes
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1">
                  Illustrative dataset
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  { icon: Layers, t: "Two categories", s: "SDKs/frameworks and desktop apps — compared separately." },
                  { icon: Cpu, t: "Profile", s: "Radar maps the six-axis trade-off surface per category." },
                  { icon: Shield, t: "Backing", s: "Each entry shows who's behind it — corporate, community, or indie." },
                  { icon: Sparkles, t: "Context", s: "Matrix adds one operational snapshot per entry + dossier link." },
                ].map(({ icon: Icon, t, s }) => (
                  <div key={t} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 backdrop-blur-sm">
                    <Icon className="size-4 text-cyan-400/90" strokeWidth={1.25} aria-hidden />
                    <p className="mt-1 text-xs font-medium text-zinc-200">{t}</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-zinc-500">{s}</p>
                  </div>
                ))}
              </div>
              <Link
                href="#analysis"
                className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 hover:text-cyan-200"
              >
                View analysis
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
