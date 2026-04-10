/* ------------------------------------------------------------------ */
/*  Two-category comparison: SDKs/Frameworks  vs  Desktop Apps        */
/* ------------------------------------------------------------------ */

export type ComparisonCategory = "sdk" | "app";

/* ---- generic row (matrix card) ----------------------------------- */

export type StackRow = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  note?: string;
  accent: string;
};

/* ==================================================================
   SECTION A — SDKs & Frameworks
   ================================================================== */

export type SdkId =
  | "qvac-sdk"
  | "ollama"
  | "llamacpp"
  | "mlx"
  | "localai"
  | "vllm";

export const sdkRows: (StackRow & { id: SdkId })[] = [
  {
    id: "qvac-sdk",
    name: "QVAC SDK (Tether)",
    tagline: "On-device inference SDK · agent primitives · Tether-backed",
    description:
      "Tether's SDK for building local AI applications — models, agents, and value rails on consumer devices.",
    accent: "qvac",
  },
  {
    id: "ollama",
    name: "Ollama",
    tagline: "One-command local LLM runtime · OpenAI-compatible API",
    description:
      "Open-source CLI/runtime that downloads and serves LLMs locally. Powers many downstream tools and integrations.",
    accent: "ollama",
  },
  {
    id: "llamacpp",
    name: "llama.cpp",
    tagline: "C/C++ inference engine · the foundation layer",
    description:
      "Minimal-dependency C/C++ LLM inference. The engine underneath Ollama, LM Studio, and many others. GGUF format, broad hardware.",
    accent: "llamacpp",
  },
  {
    id: "mlx",
    name: "MLX (Apple)",
    tagline: "Apple Silicon ML framework · unified memory · Neural Accelerators",
    description:
      "Apple's open-source array framework for ML on Apple Silicon. Python, C++, and Swift APIs optimized for unified memory.",
    accent: "mlx",
  },
  {
    id: "localai",
    name: "LocalAI",
    tagline: "All-in-one OSS AI engine · 35+ backends · drop-in API",
    description:
      "Go-based engine supporting LLMs, vision, voice, image, and video — no GPU required. OpenAI and Anthropic API compatible.",
    accent: "localai",
  },
  {
    id: "vllm",
    name: "vLLM",
    tagline: "High-throughput inference · PagedAttention · production-grade",
    description:
      "Fast Python inference/serving library. Industry standard for GPU production workloads; Apple Silicon support via vllm-metal plugin.",
    note: "Primarily designed for production GPU servers. Consumer-device use is possible but not the primary target.",
    accent: "vllm",
  },
];

export type SdkRadarKey =
  | "QVAC_SDK"
  | "Ollama"
  | "LlamaCpp"
  | "MLX"
  | "LocalAI"
  | "vLLM";

export const sdkRadarSeries: {
  key: SdkRadarKey;
  label: string;
  color: string;
  fillOpacity: number;
}[] = [
  { key: "QVAC_SDK", label: "QVAC SDK", color: "#34d399", fillOpacity: 0.22 },
  { key: "Ollama", label: "Ollama", color: "#e879f9", fillOpacity: 0.14 },
  { key: "LlamaCpp", label: "llama.cpp", color: "#f59e0b", fillOpacity: 0.12 },
  { key: "MLX", label: "MLX", color: "#a3a3a3", fillOpacity: 0.12 },
  { key: "LocalAI", label: "LocalAI", color: "#38bdf8", fillOpacity: 0.12 },
  { key: "vLLM", label: "vLLM", color: "#fb923c", fillOpacity: 0.1 },
];

export const sdkIdToRadarKey: Record<SdkId, SdkRadarKey> = {
  "qvac-sdk": "QVAC_SDK",
  ollama: "Ollama",
  llamacpp: "LlamaCpp",
  mlx: "MLX",
  localai: "LocalAI",
  vllm: "vLLM",
};

export const sdkIdToEntitySlug: Record<SdkId, string> = {
  "qvac-sdk": "qvac-sdk",
  ollama: "ollama",
  llamacpp: "llamacpp",
  mlx: "mlx",
  localai: "localai",
  vllm: "vllm",
};

export type SdkRadarMetric = { metric: string } & Record<SdkRadarKey, number>;

export const sdkRadarMetrics: SdkRadarMetric[] = [
  {
    metric: "On-device perf",
    QVAC_SDK: 80,
    Ollama: 78,
    LlamaCpp: 95,
    MLX: 92,
    LocalAI: 72,
    vLLM: 86,
  },
  {
    metric: "Hardware breadth",
    QVAC_SDK: 72,
    Ollama: 82,
    LlamaCpp: 96,
    MLX: 22,
    LocalAI: 88,
    vLLM: 78,
  },
  {
    metric: "API maturity",
    QVAC_SDK: 62,
    Ollama: 90,
    LlamaCpp: 70,
    MLX: 65,
    LocalAI: 92,
    vLLM: 90,
  },
  {
    metric: "Ecosystem",
    QVAC_SDK: 40,
    Ollama: 94,
    LlamaCpp: 88,
    MLX: 58,
    LocalAI: 76,
    vLLM: 82,
  },
  {
    metric: "Setup simplicity",
    QVAC_SDK: 74,
    Ollama: 96,
    LlamaCpp: 40,
    MLX: 78,
    LocalAI: 68,
    vLLM: 35,
  },
  {
    metric: "Backing",
    QVAC_SDK: 95,
    Ollama: 55,
    LlamaCpp: 62,
    MLX: 98,
    LocalAI: 40,
    vLLM: 78,
  },
];

/* ---- computed SDK scores ----------------------------------------- */

function computeMean(
  metrics: { metric: string; [k: string]: number | string }[],
  key: string,
): number {
  const sum = metrics.reduce((acc, m) => acc + (m[key] as number), 0);
  return Number((sum / metrics.length).toFixed(1));
}

export type OverallScore = {
  key: string;
  label: string;
  color: string;
  score: number;
};

export const sdkOverallScores: OverallScore[] = sdkRadarSeries
  .map((s) => ({
    key: s.key,
    label: s.label,
    color: s.color,
    score: computeMean(sdkRadarMetrics, s.key),
  }))
  .sort((a, b) => b.score - a.score);

export const sdkOverallByKey: Record<string, number> = Object.fromEntries(
  sdkOverallScores.map((s) => [s.key, s.score]),
);

export const sdkSeriesSorted = [...sdkOverallScores];

export const sdkRowsSorted = [...sdkRows].sort(
  (a, b) =>
    (sdkOverallByKey[sdkIdToRadarKey[b.id]] ?? 0) -
    (sdkOverallByKey[sdkIdToRadarKey[a.id]] ?? 0),
);

/* ==================================================================
   SECTION B — Desktop Apps
   ================================================================== */

export type AppId =
  | "qvac-workbench"
  | "lmstudio"
  | "jan"
  | "osaurus"
  | "apple";

export const appRows: (StackRow & { id: AppId })[] = [
  {
    id: "qvac-workbench",
    name: "QVAC Workbench (Tether)",
    tagline: "Local AI desktop app · vertical apps · agent workflows",
    description:
      "Tether's end-user AI application — Workbench plus vertical apps (Health, Translate) with on-device inference and data sovereignty.",
    accent: "qvac",
  },
  {
    id: "lmstudio",
    name: "LM Studio",
    tagline: "Desktop-first · model browser · localhost API",
    description:
      "Polished GUI for downloading, evaluating, and serving LLMs locally. Closed-source, free for personal use. Mac/Win/Linux.",
    accent: "lmstudio",
  },
  {
    id: "jan",
    name: "Jan",
    tagline: "Open-source ChatGPT replacement · agents · CLI",
    description:
      "Apache 2.0 desktop app with built-in models, agents, and OpenAI-compatible API. Mac/Win/Linux. 5M+ downloads.",
    accent: "jan",
  },
  {
    id: "osaurus",
    name: "Osaurus",
    tagline: "Native macOS AI harness · agents · memory · identity",
    description:
      "Swift-native macOS app for local AI. Agents with persistent memory, crypto identity, MCP server, 20+ plugins. MIT licensed.",
    accent: "osaurus",
  },
  {
    id: "apple",
    name: "Apple Intelligence",
    tagline: "OS-integrated · consumer-scale · hybrid local/cloud",
    description:
      "On-device models plus selective Private Cloud Compute. Tight Apple hardware integration, platform-governed policies.",
    accent: "apple",
  },
];

export type AppRadarKey =
  | "QVAC_WB"
  | "LMStudio"
  | "Jan"
  | "Osaurus"
  | "Apple";

export const appRadarSeries: {
  key: AppRadarKey;
  label: string;
  color: string;
  fillOpacity: number;
}[] = [
  {
    key: "QVAC_WB",
    label: "QVAC Workbench",
    color: "#34d399",
    fillOpacity: 0.22,
  },
  {
    key: "LMStudio",
    label: "LM Studio",
    color: "#f59e0b",
    fillOpacity: 0.12,
  },
  { key: "Jan", label: "Jan", color: "#e879f9", fillOpacity: 0.14 },
  { key: "Osaurus", label: "Osaurus", color: "#38bdf8", fillOpacity: 0.12 },
  {
    key: "Apple",
    label: "Apple Intelligence",
    color: "#a3a3a3",
    fillOpacity: 0.1,
  },
];

export const appIdToRadarKey: Record<AppId, AppRadarKey> = {
  "qvac-workbench": "QVAC_WB",
  lmstudio: "LMStudio",
  jan: "Jan",
  osaurus: "Osaurus",
  apple: "Apple",
};

export const appIdToEntitySlug: Record<AppId, string> = {
  "qvac-workbench": "qvac-workbench",
  lmstudio: "lm-studio",
  jan: "jan",
  osaurus: "osaurus",
  apple: "apple-intelligence",
};

export type AppRadarMetric = { metric: string } & Record<AppRadarKey, number>;

export const appRadarMetrics: AppRadarMetric[] = [
  {
    metric: "Privacy & offline",
    QVAC_WB: 92,
    LMStudio: 88,
    Jan: 86,
    Osaurus: 95,
    Apple: 82,
  },
  {
    metric: "UX & polish",
    QVAC_WB: 74,
    LMStudio: 92,
    Jan: 78,
    Osaurus: 86,
    Apple: 96,
  },
  {
    metric: "Model library",
    QVAC_WB: 62,
    LMStudio: 94,
    Jan: 82,
    Osaurus: 70,
    Apple: 30,
  },
  {
    metric: "Extensibility",
    QVAC_WB: 72,
    LMStudio: 52,
    Jan: 84,
    Osaurus: 92,
    Apple: 38,
  },
  {
    metric: "Platform breadth",
    QVAC_WB: 65,
    LMStudio: 86,
    Jan: 90,
    Osaurus: 18,
    Apple: 35,
  },
  {
    metric: "Backing",
    QVAC_WB: 95,
    LMStudio: 55,
    Jan: 48,
    Osaurus: 32,
    Apple: 98,
  },
];

/* ---- computed App scores ----------------------------------------- */

export const appOverallScores: OverallScore[] = appRadarSeries
  .map((s) => ({
    key: s.key,
    label: s.label,
    color: s.color,
    score: computeMean(appRadarMetrics, s.key),
  }))
  .sort((a, b) => b.score - a.score);

export const appOverallByKey: Record<string, number> = Object.fromEntries(
  appOverallScores.map((s) => [s.key, s.score]),
);

export const appSeriesSorted = [...appOverallScores];

export const appRowsSorted = [...appRows].sort(
  (a, b) =>
    (appOverallByKey[appIdToRadarKey[b.id]] ?? 0) -
    (appOverallByKey[appIdToRadarKey[a.id]] ?? 0),
);

/* ---- ticker (unchanged) ------------------------------------------ */

const tickerPool = [
  "EdgeAgent: Workbench-only inference — 0 tokens to cloud (sim)",
  "Fleet_2: on-device embedding batch; local policy hash OK",
  "CoderTwin: 120 tok/s on dedicated GPU — no vendor round-trip",
  "VoiceFlow: local diarization; transcript never leaves perimeter",
  "ResearchAgent: offline RAG; encrypted doc sync",
  "ComplianceTwin: local audit trail; export on demand (sim)",
];

export function randomTickerLine(): string {
  return tickerPool[Math.floor(Math.random() * tickerPool.length)];
}
