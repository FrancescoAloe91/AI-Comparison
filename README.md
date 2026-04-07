# Tether AI Nexus 2026

A **single-page, pure-frontend** dashboard that argues a simple 2026 thesis: **stablecoins (especially USDT) are the settlement layer — the “gas” — for an economy of autonomous AI agents.** The UI is intentionally cinematic: dark cyberpunk aesthetics, a comparison matrix, a simulated settlement ticker, and an interactive radar chart. **All figures are illustrative mock data** for storytelling, not audited metrics or live market feeds.

## Why this exists

- **Agents do not behave like SaaS users.** They spawn subtasks, rent compute, and pay in milliseconds. Card rails and monthly subscriptions are a poor fit.
- **Stable settlement** gives machines a common denomination with predictable volatility, while **private or sovereign rails** let operators align capital, policy, and hardware.
- **Contrast matters.** This page juxtaposes a **USDT-native, privacy-forward stack** with **centralized API clouds** and **decentralized incentive networks** so the trade-offs read at a glance.

## Stack

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Lucide React](https://lucide.dev/) (icons)
- [Recharts](https://recharts.org/) (interactive radar)

No database, no auth, no server-side data layer — deploy anywhere static hosting works.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy (Vercel)

1. Push this folder to a GitHub repository.
2. Import the repo in [Vercel](https://vercel.com/new) with default Next.js settings.
3. Ship — you get a production URL in minutes.

## Disclaimer

This repository is a **design and narrative prototype**. Company names are used for **comparative illustration** only. Nothing here is financial, legal, or investment advice. Mock numbers are **not** sourced from live APIs.

## License

MIT — use freely for portfolios and demos; attribute if you fork publicly.
