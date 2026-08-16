export type MatchStatus =
  | "draft"
  | "claimed"
  | "recording"
  | "uploading"
  | "queued"
  | "analyzing"
  | "ready"
  | "failed"
  | "cancelled";

const ALLOWED: Record<MatchStatus, MatchStatus[]> = {
  draft: ["claimed", "cancelled"],
  claimed: ["recording", "cancelled"],
  recording: ["uploading", "cancelled", "failed"],
  uploading: ["queued", "failed"],
  queued: ["analyzing", "failed"],
  analyzing: ["ready", "failed"],
  ready: [],
  failed: ["queued"],
  cancelled: [],
};

export function canTransition(from: MatchStatus, to: MatchStatus): boolean {
  return ALLOWED[from].includes(to);
}

export function assertTransition(from: MatchStatus, to: MatchStatus): void {
  if (!canTransition(from, to)) {
    throw new Error(`Invalid match transition: ${from} → ${to}`);
  }
}
