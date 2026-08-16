import { colors } from "@/styles/tokens";

export function StatusBar({ label = "Kort 2 · Canlı" }: { label?: string }) {
  return (
    <div
      className="flex justify-between px-[22px] pb-1.5 pt-3.5 text-[13px] font-semibold"
      style={{ color: colors.textPrimary }}
    >
      <span>11:02</span>
      <span>{label}</span>
    </div>
  );
}
