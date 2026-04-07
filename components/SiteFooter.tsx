import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-xl text-sm text-zinc-500">
            <strong className="font-medium text-zinc-400">Disclaimer:</strong> Axes, scores, and copy are
            curated for a QVAC / local AI demo — not investment, legal, or compliance advice. Verify facts
            via linked primary sources.
          </p>
          <p className="text-sm text-zinc-500">
            <Link href="/simulator" className="text-cyan-400 hover:text-cyan-300">
              Agent flow simulator
            </Link>
            {" · "}
            <a
              href="https://vercel.com/new"
              className="text-cyan-400 underline-offset-2 hover:text-cyan-300 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Deploy on Vercel
            </a>
            {" or "}
            <a
              href="https://pages.github.com/"
              className="text-cyan-400 underline-offset-2 hover:text-cyan-300 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Pages
            </a>
            .
          </p>
        </div>
        <p className="text-xs text-zinc-600">
          Static Next.js app — optional weekly RSS refresh via GitHub Actions (see{" "}
          <code className="text-zinc-500">scripts/fetch-rss.mjs</code>
          ).
        </p>
      </div>
    </footer>
  );
}
