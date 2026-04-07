export type StackRow = {
  id: "qvac" | "openai" | "ollama" | "lmstudio" | "apple" | "bittensor";
  name: string;
  tagline: string;
  model: string;
  privacy: string;
  payments: string;
  infra: string;
  censorship: string;
  accent: string;
};

/** Multi-competitor stack comparison for local AI landscape. */
export const comparisonRows: StackRow[] = [
  {
    id: "qvac",
    name: "QVAC (Tether)",
    tagline: "Local-first · product suite · programmable agent value",
    model: "Agents and models on-device; Workbench + vertical apps",
    privacy: "Data and inference in a controlled perimeter (local / Tether-shaped policy)",
    payments: "Machine-to-machine settlement when the program needs programmable liquidity between agents",
    infra: "Tether AI division spanning models, apps, and rails you can sequence on one roadmap",
    censorship: "No cloud-only gatekeeper as default; per-vertical policy to define",
    accent: "qvac",
  },
  {
    id: "openai",
    name: "OpenAI Cloud",
    tagline: "Hosted API · subscriptions · vendor telemetry",
    model: "Closed API + usage billing",
    privacy: "Prompts and logs in vendor cloud — not local-first",
    payments: "Card / invoice — no first-class programmable agent-to-agent settlement rail",
    infra: "Hyperscaler regions, shared capacity",
    censorship: "High platform policy and safety surface area",
    accent: "openai",
  },
  {
    id: "ollama",
    name: "Ollama",
    tagline: "Local OSS · downloadable models · DIY",
    model: "Open runtime for local inference",
    privacy: "Strong local control; compliance hardening is on your team",
    payments: "No integrated machine-economy micropayment layer",
    infra: "User hardware / self-managed servers",
    censorship: "Minimal centralized policy; operational responsibility in-house",
    accent: "ollama",
  },
  {
    id: "lmstudio",
    name: "LM Studio",
    tagline: "Desktop-first · local GUI · model explorer",
    model: "Local runtime with UI and localhost serving",
    privacy: "Strong local handling for experimentation and eval loops",
    payments: "No native programmable value rail by default",
    infra: "Single-node desktop workflow, fast to evaluate many models",
    censorship: "Tool-level policy light; governance is mostly up to operator",
    accent: "lmstudio",
  },
  {
    id: "apple",
    name: "Apple Intelligence",
    tagline: "OS-integrated · consumer-scale · hybrid local/cloud",
    model: "On-device plus selective cloud augmentation in Apple stack",
    privacy: "Strong consumer privacy messaging with platform guardrails",
    payments: "No generalized agent-to-agent settlement layer",
    infra: "Tight integration with Apple hardware and operating systems",
    censorship: "Platform-governed policies and extension boundaries",
    accent: "apple",
  },
  {
    id: "bittensor",
    name: "Bittensor",
    tagline: "Open network · subnet incentives · TAO economics",
    model: "Distributed incentive market for machine intelligence",
    privacy: "Pseudonymous network dynamics with varied node practices",
    payments: "Token-native rewards and market-based incentives",
    infra: "Network-level architecture rather than single product suite",
    censorship: "Protocol-level openness with integration complexity",
    accent: "bittensor",
  },
];

export type RadarSeriesKey = "QVAC" | "OpenAI" | "Ollama" | "LMStudio" | "Apple" | "Bittensor";

export const radarSeries: { key: RadarSeriesKey; label: string; color: string; fillOpacity: number }[] = [
  { key: "QVAC", label: "QVAC", color: "#34d399", fillOpacity: 0.22 },
  { key: "OpenAI", label: "OpenAI", color: "#38bdf8", fillOpacity: 0.12 },
  { key: "Ollama", label: "Ollama", color: "#e879f9", fillOpacity: 0.14 },
  { key: "LMStudio", label: "LM Studio", color: "#f59e0b", fillOpacity: 0.12 },
  { key: "Apple", label: "Apple Intelligence", color: "#a3a3a3", fillOpacity: 0.1 },
  { key: "Bittensor", label: "Bittensor", color: "#22c55e", fillOpacity: 0.1 },
];

export const rowToSeriesKey: Record<StackRow["id"], RadarSeriesKey> = {
  qvac: "QVAC",
  openai: "OpenAI",
  ollama: "Ollama",
  lmstudio: "LMStudio",
  apple: "Apple",
  bittensor: "Bittensor",
};

/** Routes matrix rows to entity dossier slugs (some differ from internal ids). */
export const stackIdToEntitySlug: Record<StackRow["id"], string> = {
  qvac: "qvac",
  openai: "openai",
  ollama: "ollama",
  lmstudio: "lm-studio",
  apple: "apple-intelligence",
  bittensor: "bittensor",
};

export type RadarMetric = {
  metric: string;
} & Record<RadarSeriesKey, number>;

/** 0–100 illustrative scores for comparative readability. */
export const radarMetrics: RadarMetric[] = [
  {
    metric: "Local-first",
    QVAC: 93,
    OpenAI: 12,
    Ollama: 91,
    LMStudio: 86,
    Apple: 78,
    Bittensor: 62,
  },
  {
    metric: "Data privacy",
    QVAC: 90,
    OpenAI: 18,
    Ollama: 86,
    LMStudio: 79,
    Apple: 80,
    Bittensor: 71,
  },
  {
    metric: "Product suite",
    QVAC: 84,
    OpenAI: 95,
    Ollama: 44,
    LMStudio: 58,
    Apple: 90,
    Bittensor: 42,
  },
  {
    metric: "Open stack",
    QVAC: 68,
    OpenAI: 14,
    Ollama: 96,
    LMStudio: 72,
    Apple: 22,
    Bittensor: 88,
  },
  {
    metric: "Programmable value",
    QVAC: 81,
    OpenAI: 22,
    Ollama: 28,
    LMStudio: 24,
    Apple: 18,
    Bittensor: 86,
  },
];

export type OverallScore = {
  key: RadarSeriesKey;
  label: string;
  color: string;
  score: number;
};

function computeOverall(key: RadarSeriesKey): number {
  const sum = radarMetrics.reduce((acc, m) => acc + m[key], 0);
  return Number((sum / radarMetrics.length).toFixed(1));
}

export const overallScores: OverallScore[] = radarSeries
  .map((s) => ({
    key: s.key,
    label: s.label,
    color: s.color,
    score: computeOverall(s.key),
  }))
  .sort((a, b) => b.score - a.score);

export const overallScoreBySeriesKey: Record<RadarSeriesKey, number> = overallScores.reduce(
  (acc, s) => ({ ...acc, [s.key]: s.score }),
  {} as Record<RadarSeriesKey, number>,
);

export const radarSeriesSorted = [...overallScores];

export const comparisonRowsSorted = [...comparisonRows].sort(
  (a, b) => overallScoreBySeriesKey[rowToSeriesKey[b.id]] - overallScoreBySeriesKey[rowToSeriesKey[a.id]],
);

const tickerPool = [
  "EdgeAgent: Workbench-only inference — 0 tokens to cloud (sim)",
  "Fleet_2: on-device embedding batch; local policy hash OK",
  "CoderTwin: 120 tok/s on dedicated GPU — no vendor round-trip",
  "VoiceFlow: local diarization; transcript never leaves perimeter",
  "Future scenario: bot A → bot B 0.004 USDT for tool-call slice (sim)",
  "ResearchAgent: offline RAG; encrypted doc sync",
  "TraderBot: on-prem signals; USDT settlement sandbox only",
  "ComplianceTwin: local audit trail; export on demand (sim)",
];

export function randomTickerLine(): string {
  return tickerPool[Math.floor(Math.random() * tickerPool.length)];
}
