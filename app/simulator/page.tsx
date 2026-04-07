import { AgentFlowSimulator } from "@/components/AgentFlowSimulator";
import { NavBar } from "@/components/NavBar";
import { SiteFooter } from "@/components/SiteFooter";
import { Info } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agent flow (UX) — QVAC Local AI Lens",
  description:
    "Interactive flow lab: animated P2P routing choices and narrative outcomes — UX demo only, no on-chain execution.",
};

export default function SimulatorPage() {
  return (
    <div className="flex min-h-full flex-col">
      <NavBar />
      <main className="flex-1 px-6 py-8 lg:px-10 lg:py-10">
        <div className="mx-auto mb-6 max-w-3xl">
          <Link href="/" className="text-sm text-cyan-400 hover:text-cyan-300">
            ← Back to home
          </Link>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">Agent flow simulator</h1>
          <p className="mt-2 text-zinc-500">
            A standalone UX lab: your answers tag a fictional routing story, drive colors and copy, and animate a
            mesh-style flow. Nothing here executes on-chain or moves real funds.
          </p>
        </div>

        <div className="mx-auto mb-8 max-w-3xl rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-4 backdrop-blur-sm">
          <div className="flex gap-3">
            <Info className="mt-0.5 size-5 shrink-0 text-cyan-400/90" aria-hidden />
            <div className="min-w-0 text-sm leading-relaxed text-zinc-400">
              <p className="font-medium text-zinc-200">What you are looking at</p>
              <ul className="mt-2 list-inside list-disc space-y-1.5 text-[13px] text-zinc-500">
                <li>
                  <span className="text-zinc-400">Purpose:</span> illustrate how different infra + settlement choices
                  might feel in a product narrative—not a performance or compliance model.
                </li>
                <li>
                  <span className="text-zinc-400">Mechanics:</span> each wizard step adds tags; tags pick an outcome
                  paragraph and tune the animated flow (rate slider only changes speed).
                </li>
                <li>
                  <span className="text-zinc-400">Scope:</span> no wallet, no API keys, no server-side execution—purely
                  front-end demo.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <AgentFlowSimulator />
      </main>
      <SiteFooter />
    </div>
  );
}
