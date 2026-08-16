import { NextResponse } from "next/server";
import { getAnalysisProvider } from "@/lib/analysis";
import { DEMO_MATCHES } from "@/lib/mock-data";

/**
 * Demo endpoint: run MockAnalysisProvider against a sample match.
 * GET /api/analysis/demo
 */
export async function GET() {
  const provider = getAnalysisProvider("mock");
  const match = DEMO_MATCHES[0];

  const handle = await provider.createJob({
    matchId: match.id,
    sport: "padel",
    videoUrl: "mock://recordings/demo-match-1.mp4",
    courtId: "court-demo-2",
    participants: [
      { displayName: match.teamA[0], side: "A", slot: 1 },
      { displayName: match.teamA[1], side: "A", slot: 2 },
      { displayName: match.teamB[0], side: "B", slot: 1 },
      { displayName: match.teamB[1], side: "B", slot: 2 },
    ],
  });

  // Poll until mock latency completes
  let result = await provider.getJob(handle.externalJobId);
  const deadline = Date.now() + 3000;
  while (
    (result.status === "queued" || result.status === "running") &&
    Date.now() < deadline
  ) {
    await new Promise((r) => setTimeout(r, 200));
    result = await provider.getJob(handle.externalJobId);
  }

  return NextResponse.json({
    provider: provider.name,
    handle,
    result,
  });
}
