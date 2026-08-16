import type { LucideIcon } from "lucide-react";
import { colors } from "@/styles/tokens";

export function StatChip({
  label,
  value,
  Icon,
}: {
  label: string;
  value: string;
  Icon: LucideIcon;
}) {
  return (
    <div
      className="flex-1 rounded-xl border p-3"
      style={{ background: colors.surface2, borderColor: colors.line }}
    >
      <Icon size={16} color={colors.lime} />
      <div className="mt-1.5 text-base font-extrabold">{value}</div>
      <div className="text-[11px]" style={{ color: colors.textMuted }}>
        {label}
      </div>
    </div>
  );
}
