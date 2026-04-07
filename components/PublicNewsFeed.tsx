import { getNews, getNewsMeta } from "@/lib/data";
import { Newspaper } from "lucide-react";

export function PublicNewsFeed() {
  const items = getNews();
  const meta = getNewsMeta();

  return (
    <section id="news" className="scroll-mt-8 border-t border-white/10 px-6 py-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-fuchsia-200/80">
          <Newspaper className="size-3.5" aria-hidden />
          Sources
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Primary links (QVAC & comparators)
        </h2>
        <p className="mt-3 max-w-2xl text-zinc-500">
          Curated primaries for entities above — swap in RSS-fed rows when you wire the Action. Last curated:{" "}
          <span className="tabular-nums text-zinc-400">{meta.lastFetched}</span>.
        </p>

        <ul className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-zinc-950/40">
          {items.map((n) => (
            <li key={n.id} className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <a
                  href={n.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-white underline-offset-2 hover:text-cyan-200 hover:underline"
                >
                  {n.title}
                </a>
                <p className="mt-1 text-xs text-zinc-500">
                  <span className="text-zinc-400">{n.sourceName}</span>
                  {" · "}
                  <time className="tabular-nums" dateTime={n.publishedAt}>
                    {n.publishedAt}
                  </time>
                  {" · "}
                  {n.entitySlugs.join(", ")}
                </p>
              </div>
              <span className="shrink-0 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                Level B — link-out
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
