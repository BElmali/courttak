import { z } from "zod";
import type { NormalizedAnalytics } from "@/types/analytics";

const shotDirectionSchema = z.object({
  left: z.number(),
  center: z.number(),
  right: z.number(),
});

const summarySchema = z.object({
  durationSec: z.number(),
  ballInPlaySec: z.number(),
  longestRallyShots: z.number().int(),
  courtUsagePct: z.number(),
  dominantZone: z.string(),
  shotDirection: shotDirectionSchema,
  winnerSide: z.enum(["A", "B"]).nullable(),
});

const heatmapSchema = z.object({
  kind: z.enum(["coverage", "player_position", "shot_density"]),
  blobs: z
    .array(
      z.object({
        x: z.number(),
        y: z.number(),
        rx: z.number(),
        ry: z.number(),
        intensity: z.number(),
      }),
    )
    .optional(),
  grid: z.array(z.array(z.number())).optional(),
  profileId: z.string().nullable().optional(),
});

const shotSchema = z.object({
  tMs: z.number().int(),
  x: z.number(),
  y: z.number(),
  profileId: z.string().nullable().optional(),
  displayName: z.string().optional(),
  shotType: z.string().optional(),
  outcome: z.string().optional(),
});

const highlightSchema = z.object({
  label: z.string(),
  detail: z.string(),
  durationSec: z.number(),
  startMs: z.number().int(),
  endMs: z.number().int(),
  rank: z.number().int(),
});

const playerStatsSchema = z.object({
  profileId: z.string().nullable().optional(),
  displayName: z.string(),
  side: z.enum(["A", "B"]),
  shots: z.number().int(),
  winners: z.number().int(),
  errors: z.number().int(),
  coveragePct: z.number(),
});

export const normalizedAnalyticsSchema = z.object({
  summary: summarySchema,
  heatmaps: z.array(heatmapSchema),
  shots: z.array(shotSchema),
  highlights: z.array(highlightSchema),
  playerStats: z.array(playerStatsSchema),
});

/**
 * Validate and coerce provider output into the Courttak contract.
 * Throws ZodError if the payload is invalid.
 */
export function normalizeAnalytics(input: unknown): NormalizedAnalytics {
  return normalizedAnalyticsSchema.parse(input);
}
