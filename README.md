# QVAC Local AI Lens

**Comparative dashboard for local-first AI stacks** — radar, ranking, matrix, and per-entity dossiers. Built as a static Next.js app: no database, no auth.

[![Live site — Vercel](https://img.shields.io/badge/Live-ai--comparison--lx2e.vercel.app-000000?style=for-the-badge&logo=vercel)](https://ai-comparison-lx2e.vercel.app/)

| | |
| --- | --- |
| **Live URL** | **[https://ai-comparison-lx2e.vercel.app/](https://ai-comparison-lx2e.vercel.app/)** |
| **Stack** | Next.js 16 (App Router), Tailwind v4, Recharts, Lucide |
| **Data** | Illustrative mock scores for narrative comparison — not audited metrics or live feeds |

---

## What it shows

- **Thesis block** — framing for two categories: SDKs/frameworks (QVAC SDK, Ollama, llama.cpp, MLX, LocalAI, vLLM) and desktop apps (QVAC Workbench, LM Studio, Jan, Osaurus, Apple Intelligence).
- **Radar + legend** — six normalized axes (0-100) per category and composite ranking.
- **Matrix** — short operational snapshot per entry with links to **full dossiers**.
- **Simulator** (`/simulator`) — UX-only flow lab: tags drive a P2P-style animation; no chain, no real payments.
- **Sources** — curated link-outs; optional RSS refresh via GitHub Actions (`scripts/fetch-rss.mjs`).

Company and product names are used for **comparative illustration** only.

---

## Why this exists (thesis)

- The local AI space has **two distinct layers**: SDKs/frameworks for developers and desktop apps for end-users. Mixing them hides the real trade-offs.
- **Contrast** matters: a **Tether-backed local-first** story (QVAC) sits next to **community OSS runtimes** and **independent desktop apps** so trade-offs read at a glance.

---

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

---

## Deploy

Production is hosted on **Vercel** at the URL above. Source lives on GitHub; pushes to `main` can trigger new deployments when the Vercel project is connected to this repo.

### Vercel CLI (from this folder)

```bash
npx vercel@latest login
npx vercel@latest
npx vercel@latest --prod
```

### GitHub to Vercel (continuous deployment)

1. Push this repository to GitHub (`main`).
2. [Vercel - New Project](https://vercel.com/new) - import the repo - framework **Next.js**, root **repository root**.
3. Optional: **Settings - Git** on Vercel to confirm automatic builds on push.

### Push to GitHub (if you clone fresh)

```bash
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

---

## GitHub repository settings (optional)

Paste these into **github.com - your repo - Settings - General** (or edit on the repo main page via the gear / "About"):

**Description (short, ~350 characters max):**

> Local AI comparison lens in two categories: SDKs & frameworks vs desktop apps. Next.js app with radar, matrix, dossiers, and a UX-only agent-flow simulator. Live: https://ai-comparison-lx2e.vercel.app/

**Topics / tags (suggested):**

`nextjs` `react` `vercel` `tailwindcss` `local-ai` `ai-comparison` `tether` `qvac` `dashboard`

**Website (homepage field):**

`https://ai-comparison-lx2e.vercel.app/`

---

## Disclaimer

This repository is a **design and narrative prototype**. Nothing here is financial, legal, or investment advice. Mock numbers are **not** sourced from live APIs.

## License

MIT — use freely for portfolios and demos; attribute if you fork publicly.
