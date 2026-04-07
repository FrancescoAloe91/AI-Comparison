/**
 * Fetches public RSS feeds, merges unique items by URL into data/news.json.
 * Run locally: node scripts/fetch-rss.mjs
 * Intended for GitHub Actions (weekly). Feeds may block or change — failures are non-fatal per feed.
 */
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const newsPath = path.join(root, "data", "news.json");

const FEEDS = [
  { url: "https://www.coindesk.com/arc/outboundfeeds/rss/", sourceName: "CoinDesk" },
];

function slugifyId(url) {
  return createHash("sha256").update(url).digest("hex").slice(0, 12);
}

function parseRssItems(xml, sourceName) {
  const items = [];
  const re = /<item[\s\S]*?<\/item>/gi;
  let m;
  while ((m = re.exec(xml))) {
    const block = m[0];
    const title =
      block.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/i)?.[1]?.trim() ||
      block.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.replace(/<!\[CDATA\[|\]\]>/g, "").trim();
    const link =
      block.match(/<link>([\s\S]*?)<\/link>/i)?.[1]?.trim() ||
      block.match(/<guid[^>]*>([\s\S]*?)<\/guid>/i)?.[1]?.trim();
    const pubDate = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1]?.trim();
    if (!title || !link || !link.startsWith("http")) continue;
    const publishedAt = pubDate ? new Date(pubDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);
    items.push({
      id: `rss-${slugifyId(link)}`,
      title,
      url: link,
      publishedAt,
      entitySlugs: inferEntitySlugs(title),
      sourceName,
    });
  }
  return items;
}

function inferEntitySlugs(title) {
  const t = title.toLowerCase();
  const out = [];
  if (/\busdt\b|tether/.test(t)) out.push("tether");
  if (/\busdc\b|circle/.test(t)) out.push("circle-usdc");
  if (/paypal|pyusd/.test(t)) out.push("pyusd");
  if (/openai|chatgpt/.test(t)) out.push("openai");
  if (/bittensor|\btao\b/.test(t)) out.push("bittensor");
  return out.length ? out : [];
}

async function fetchFeed(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "tether-ai-nexus-news-bot/1.0 (+https://github.com)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

async function main() {
  const raw = await readFile(newsPath, "utf8");
  const existing = JSON.parse(raw);
  const byUrl = new Map();
  for (const it of existing.items || []) byUrl.set(it.url, it);

  for (const feed of FEEDS) {
    try {
      const xml = await fetchFeed(feed.url);
      const parsed = parseRssItems(xml, feed.sourceName).slice(0, 15);
      for (const it of parsed) {
        if (!byUrl.has(it.url)) byUrl.set(it.url, it);
      }
    } catch (e) {
      console.warn(`[fetch-rss] skip ${feed.url}:`, e.message);
    }
  }

  const merged = {
    lastFetched: new Date().toISOString().slice(0, 10),
    items: [...byUrl.values()].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1)),
  };

  await writeFile(newsPath, JSON.stringify(merged, null, 2) + "\n", "utf8");
  console.log(`[fetch-rss] wrote ${merged.items.length} items to data/news.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
