import type {
  AnalysisJobHandle,
  AnalysisJobRequest,
  AnalysisJobResult,
} from "@/types/analytics";

/**
 * Pluggable analysis engine boundary.
 * CourtCheck / internal CV / mock all implement this.
 */
export interface AnalysisProvider {
  readonly name: string;

  /** Submit a match recording for analysis. */
  createJob(request: AnalysisJobRequest): Promise<AnalysisJobHandle>;

  /** Poll job status (webhook-capable providers may still support this). */
  getJob(externalJobId: string): Promise<AnalysisJobResult>;

  /** Optional cancel — not all providers support it. */
  cancelJob?(externalJobId: string): Promise<void>;
}
