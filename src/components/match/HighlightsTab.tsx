import { Play } from "lucide-react";
import { DEMO_HIGHLIGHTS } from "@/lib/mock-data";
import { colors } from "@/styles/tokens";

export function HighlightsTab() {
  return (
    <div className="flex flex-col gap-2.5">
      {DEMO_HIGHLIGHTS.map((h) => (
        <div
          key={h.id}
          className="flex items-center gap-3 rounded-[14px] border p-3"
          style={{ background: colors.surface2, borderColor: colors.line }}
        >
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px]"
            style={{ background: colors.courtBlueDeep }}
          >
            <Play size={18} color={colors.lime} fill={colors.lime} />
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-bold">{h.label}</div>
            <div className="text-[11px]" style={{ color: colors.textMuted }}>
              {h.detail}
            </div>
          </div>
          <div
            className="text-xs font-semibold"
            style={{ color: colors.textFaint }}
          >
            {h.duration}
          </div>
        </div>
      ))}
    </div>
  );
}
