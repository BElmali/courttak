import type { AnalysisProvider } from "./provider";
import { mockAnalysisProvider } from "./mock";

export type { AnalysisProvider } from "./provider";
export { normalizeAnalytics, normalizedAnalyticsSchema } from "./normalize";
export { MockAnalysisProvider, mockAnalysisProvider } from "./mock";

export type AnalysisProviderId = "mock";

/**
 * Resolve the active analysis provider.
 * CourtCheck will be added here later — do not call external APIs yet.
 */
export function getAnalysisProvider(
  id: AnalysisProviderId = "mock",
): AnalysisProvider {
  switch (id) {
    case "mock":
      return mockAnalysisProvider;
    default: {
      const _exhaustive: never = id;
      throw new Error(`Unknown analysis provider: ${_exhaustive}`);
    }
  }
}
