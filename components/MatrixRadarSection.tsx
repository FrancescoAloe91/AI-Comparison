import { ComparisonMatrix } from "@/components/ComparisonMatrix";
import { RadarComparison } from "@/components/RadarComparison";

const scoreGuide = [
  {
    k: "Local-first",
    d: "How much inference runs on-device or on-prem without a standing cloud dependency.",
  },
  {
    k: "Data privacy",
    d: "How tightly data and inference stay inside a user- or team-controlled perimeter.",
  },
  {
    k: "Product suite",
    d: "Depth of shippable product surfaces—not only a runtime or raw API.",
  },
  {
    k: "Open stack",
    d: "Portability and ecosystem openness: lower lock-in, broader integration paths.",
  },
  {
    k: "Programmable value",
    d: "Ability to wire machine-to-machine settlement into the operational stack.",
  },
];

export function MatrixRadarSection() {
  return (
    <section id="analysis" className="scroll-mt-8 border-b border-white/10 px-6 py-4 lg:px-10 lg:py-5">
      <div className="mx-auto max-w-6xl">
        <div className="mb-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 sm:p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200/70">Compare</p>
          <h2 className="mt-0.5 text-lg font-semibold tracking-tight text-white sm:text-xl">Framework &amp; axes</h2>
          <p className="mt-1 text-[13px] leading-snug text-zinc-500">
            Five axes (0–100 each). Radar = shape; legend = composite mean; matrix = snapshot + dossier link.
          </p>
          <div className="mt-3 grid gap-1.5 sm:grid-cols-2 xl:grid-cols-5">
            {scoreGuide.map((g) => (
              <article key={g.k} className="rounded-lg border border-white/10 bg-zinc-950/40 p-2">
                <p className="text-[11px] font-semibold tracking-tight text-zinc-200">{g.k}</p>
                <p className="mt-0.5 text-[10px] leading-snug text-zinc-500">{g.d}</p>
              </article>
            ))}
          </div>
        </div>

        <div id="radar" className="scroll-mt-16">
          <RadarComparison variant="split" />
        </div>
        <div id="matrix" className="scroll-mt-16 mt-4">
          <ComparisonMatrix variant="split" />
        </div>
      </div>
    </section>
  );
}
