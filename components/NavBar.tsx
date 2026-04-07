import { Hexagon } from "lucide-react";
import Link from "next/link";

const links = [
  { href: "/#intro", label: "Intro" },
  { href: "/#analysis", label: "Compare" },
  { href: "/#news", label: "Sources" },
];

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030712]/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6 lg:px-10">
        <Link
          href="/#intro"
          className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold tracking-tight text-white whitespace-nowrap"
        >
          <Hexagon className="size-5 shrink-0 text-cyan-400" strokeWidth={1.5} aria-hidden />
          <span>QVAC · Local AI Lens</span>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-1 sm:gap-2" aria-label="Section">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-2 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-cyan-200 sm:text-sm"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/simulator"
            className="rounded-lg border border-cyan-500/25 bg-cyan-500/10 px-2 py-1.5 text-xs font-medium text-cyan-200 transition-colors hover:border-cyan-400/40 sm:text-sm"
          >
            Simulator
          </Link>
        </nav>
      </div>
    </header>
  );
}
