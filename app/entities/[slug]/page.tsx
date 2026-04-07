import { NavBar } from "@/components/NavBar";
import { SiteFooter } from "@/components/SiteFooter";
import type { EntityRecord } from "@/data/types";
import { getEntities, getEntityBySlug, getNewsForEntity } from "@/lib/data";
import { ExternalLink, FileText } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getEntities().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const e = getEntityBySlug(slug);
  if (!e) return { title: "Entity" };
  return {
    title: `${e.name} — QVAC Local AI Lens`,
    description: e.tagline,
  };
}

function AxisBlock({ e }: { e: EntityRecord }) {
  const rows: { label: string; value: number }[] = [
    { label: "Local control / custody", value: e.axes.selfCustody },
    { label: "Open stack (models & tooling)", value: e.axes.openStack },
    { label: "Regulatory posture (curated)", value: e.axes.regulatoryPosture },
    { label: "Interoperability", value: e.axes.interoperability },
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/50 p-5">
      <h2 className="text-sm font-semibold text-white">Axes (0–100)</h2>
      <ul className="mt-4 space-y-4">
        {rows.map((r) => (
          <li key={r.label}>
            <div className="flex justify-between text-xs text-zinc-500">
              <span>{r.label}</span>
              <span className="tabular-nums text-zinc-400">{r.value}</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500/70 to-cyan-500/70"
                style={{ width: `${r.value}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function EntityPage({ params }: Props) {
  const { slug } = await params;
  const e = getEntityBySlug(slug);
  if (!e) notFound();

  const news = getNewsForEntity(slug);

  return (
    <div className="flex min-h-full flex-col">
      <NavBar />
      <main className="flex-1 px-6 py-8 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <Link href="/#intro" className="text-sm text-cyan-400 hover:text-cyan-300">
            ← Home
          </Link>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">{e.category}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{e.name}</h1>
          <p className="mt-3 text-lg text-zinc-400">{e.tagline}</p>
          {e.officialUrl && (
            <a
              href={e.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300"
            >
              <ExternalLink className="size-4" aria-hidden />
              Official site
            </a>
          )}

          <div className="mt-10 grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <AxisBlock e={e} />
              <p className="mt-4 text-xs text-zinc-600">
                Last reviewed: <span className="tabular-nums text-zinc-500">{e.lastReviewed}</span>
              </p>
            </div>
            <div className="space-y-8 lg:col-span-3">
              <section>
                <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
                  <FileText className="size-4 text-zinc-500" aria-hidden />
                  Facts (curated)
                </h2>
                <dl className="mt-3 space-y-2">
                  {e.facts.map((f) => (
                    <div key={f.label} className="flex flex-col rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 sm:flex-row sm:gap-4">
                      <dt className="text-xs uppercase tracking-wider text-zinc-500">{f.label}</dt>
                      <dd className="text-sm text-zinc-300">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold text-emerald-200/90">Pros</h3>
                  <ul className="mt-3 space-y-4">
                    {e.pros.map((p, i) => (
                      <li key={i} className="text-sm leading-relaxed text-zinc-400">
                        <p>{p.text}</p>
                        <ul className="mt-2 space-y-1">
                          {p.sources.map((s) => (
                            <li key={s.url}>
                              <a
                                href={s.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-cyan-500/90 underline-offset-2 hover:underline"
                              >
                                {s.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-rose-200/90">Cons / risks</h3>
                  <ul className="mt-3 space-y-4">
                    {e.cons.map((c, i) => (
                      <li key={i} className="text-sm leading-relaxed text-zinc-400">
                        <p>{c.text}</p>
                        <ul className="mt-2 space-y-1">
                          {c.sources.map((s) => (
                            <li key={s.url}>
                              <a
                                href={s.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-cyan-500/90 underline-offset-2 hover:underline"
                              >
                                {s.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-sm font-semibold text-white">Related links</h2>
                {news.length === 0 ? (
                  <p className="mt-2 text-sm text-zinc-500">No curated news rows for this entity yet.</p>
                ) : (
                  <ul className="mt-3 divide-y divide-white/10 rounded-xl border border-white/10">
                    {news.map((n) => (
                      <li key={n.id} className="px-4 py-3">
                        <a
                          href={n.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-white hover:text-cyan-200"
                        >
                          {n.title}
                        </a>
                        <p className="mt-1 text-xs text-zinc-500">
                          {n.sourceName} · <span className="tabular-nums">{n.publishedAt}</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
