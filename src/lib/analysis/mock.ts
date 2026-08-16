import type { AnalysisProvider } from "./provider";
import type {
  AnalysisJobHandle,
  AnalysisJobRequest,
  AnalysisJobResult,
  NormalizedAnalytics,
} from "@/types/analytics";
import { normalizeAnalytics } from "./normalize";

type StoredJob = {
  request: AnalysisJobRequest;
  status: AnalysisJobResult["status"];
  createdAt: number;
  analytics?: NormalizedAnalytics;
  error?: string;
};

const jobs = new Map<string, StoredJob>();

/** Simulated processing delay before a mock job becomes ready (ms). */
const MOCK_LATENCY_MS = 800;

function buildMockAnalytics(request: AnalysisJobRequest): NormalizedAnalytics {
  const names = request.participants.map((p) => p.displayName);
  const [a1, a2, b1, b2] = [
    names[0] ?? "Oyuncu A1",
    names[1] ?? "Oyuncu A2",
    names[2] ?? "Oyuncu B1",
    names[3] ?? "Oyuncu B2",
  ];

  const raw = {
    summary: {
      durationSec: 1506,
      ballInPlaySec: 63.0,
      longestRallyShots: 60,
      courtUsagePct: 68,
      dominantZone: "Alt-sağ",
      shotDirection: { left: 35, center: 12, right: 53 },
      winnerSide: "B" as const,
    },
    heatmaps: [
      {
        kind: "coverage" as const,
        blobs: [
          { x: 0.48, y: 0.72, rx: 0.32, ry: 0.2, intensity: 0.95 },
          { x: 0.68, y: 0.59, rx: 0.16, ry: 0.09, intensity: 0.7 },
        ],
      },
    ],
    shots: [
      [40, 210],
      [55, 240],
      [70, 200],
      [48, 260],
      [90, 230],
      [35, 190],
      [60, 270],
      [100, 245],
      [75, 215],
      [52, 225],
    ].map(([px, py], i) => ({
      tMs: 12_000 + i * 4500,
      x: px / 220,
      y: py / 320,
      displayName: [a1, a2, b1, b2][i % 4],
      shotType: i % 4 === 0 ? "winner" : "rally",
    })),
    highlights: [
      {
        label: "En uzun rally",
        detail: "60 vuruş",
        durationSec: 48,
        startMs: 420_000,
        endMs: 468_000,
        rank: 1,
      },
      {
        label: "En hızlı seri",
        detail: "9 vuruş / 6.2 sn",
        durationSec: 11,
        startMs: 780_000,
        endMs: 791_000,
        rank: 2,
      },
      {
        label: "Maç sarsıcı anı",
        detail: `Winner — ${b1}`,
        durationSec: 7,
        startMs: 1_200_000,
        endMs: 1_207_000,
        rank: 3,
      },
    ],
    playerStats: request.participants.map((p, i) => ({
      profileId: p.profileId ?? null,
      displayName: p.displayName,
      side: p.side,
      shots: 28 + i * 3,
      winners: 4 + (i % 3),
      errors: 2 + (i % 2),
      coveragePct: 55 + i * 4,
    })),
  };

  return normalizeAnalytics(raw);
}

/**
 * In-memory mock analysis engine for local UI / MVP wiring.
 * Not suitable for multi-instance production — replace with CourtCheck later.
 */
export class MockAnalysisProvider implements AnalysisProvider {
  readonly name = "mock";

  async createJob(request: AnalysisJobRequest): Promise<AnalysisJobHandle> {
    const externalJobId = `mock_${request.matchId}_${Date.now()}`;
    jobs.set(externalJobId, {
      request,
      status: "queued",
      createdAt: Date.now(),
    });

    // Advance to running then succeeded after a short delay.
    queueMicrotask(() => {
      const job = jobs.get(externalJobId);
      if (job) job.status = "running";
    });

    return { externalJobId, status: "queued" };
  }

  async getJob(externalJobId: string): Promise<AnalysisJobResult> {
    const job = jobs.get(externalJobId);
    if (!job) {
      return {
        externalJobId,
        status: "failed",
        error: "Unknown mock job id",
      };
    }

    const elapsed = Date.now() - job.createdAt;
    if (elapsed < MOCK_LATENCY_MS) {
      return { externalJobId, status: job.status === "queued" ? "queued" : "running" };
    }

    if (!job.analytics) {
      try {
        job.analytics = buildMockAnalytics(job.request);
        job.status = "succeeded";
      } catch (err) {
        job.status = "failed";
        job.error = err instanceof Error ? err.message : "Mock normalize failed";
      }
    }

    return {
      externalJobId,
      status: job.status,
      analytics: job.analytics,
      error: job.error,
      raw: { provider: "mock", matchId: job.request.matchId },
    };
  }

  async cancelJob(externalJobId: string): Promise<void> {
    const job = jobs.get(externalJobId);
    if (job && job.status !== "succeeded") {
      job.status = "failed";
      job.error = "Cancelled";
    }
  }
}

/** Singleton for app-wide mock usage during development. */
export const mockAnalysisProvider = new MockAnalysisProvider();
