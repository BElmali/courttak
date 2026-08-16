/** Normalized analytics contract shared across AnalysisProviders. */

export type ShotDirection = {
  left: number;
  center: number;
  right: number;
};

export type NormalizedSummary = {
  durationSec: number;
  ballInPlaySec: number;
  longestRallyShots: number;
  courtUsagePct: number;
  dominantZone: string;
  shotDirection: ShotDirection;
  winnerSide: "A" | "B" | null;
};

export type NormalizedHeatmap = {
  kind: "coverage" | "player_position" | "shot_density";
  /** Court-normalized blob centers for mock / lightweight rendering */
  blobs?: Array<{ x: number; y: number; rx: number; ry: number; intensity: number }>;
  /** Optional dense grid (row-major, values 0..1) */
  grid?: number[][];
  profileId?: string | null;
};

export type NormalizedShot = {
  tMs: number;
  /** Court-normalized 0..1 */
  x: number;
  y: number;
  profileId?: string | null;
  displayName?: string;
  shotType?: string;
  outcome?: string;
};

export type NormalizedHighlight = {
  label: string;
  detail: string;
  durationSec: number;
  startMs: number;
  endMs: number;
  rank: number;
};

export type NormalizedPlayerStats = {
  profileId?: string | null;
  displayName: string;
  side: "A" | "B";
  shots: number;
  winners: number;
  errors: number;
  coveragePct: number;
};

export type NormalizedAnalytics = {
  summary: NormalizedSummary;
  heatmaps: NormalizedHeatmap[];
  shots: NormalizedShot[];
  highlights: NormalizedHighlight[];
  playerStats: NormalizedPlayerStats[];
};

export type AnalysisJobRequest = {
  matchId: string;
  sport: "padel" | "tennis";
  /** Signed URL or local path to the recording */
  videoUrl: string;
  courtId: string;
  participants: Array<{
    profileId?: string | null;
    displayName: string;
    side: "A" | "B";
    slot: 1 | 2;
  }>;
  /** Optional court calibration payload for CV providers */
  calibration?: Record<string, unknown>;
};

export type AnalysisJobStatus =
  | "queued"
  | "running"
  | "succeeded"
  | "failed";

export type AnalysisJobHandle = {
  externalJobId: string;
  status: AnalysisJobStatus;
};

export type AnalysisJobResult = {
  externalJobId: string;
  status: AnalysisJobStatus;
  analytics?: NormalizedAnalytics;
  error?: string;
  /** Provider-specific raw payload for archival */
  raw?: unknown;
};
