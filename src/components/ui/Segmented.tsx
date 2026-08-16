"use client";

import { colors } from "@/styles/tokens";

export function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: Array<{ id: T; label: string }>;
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <div
      className="mb-4 flex rounded-xl p-1"
      style={{ background: colors.surface2 }}
    >
      {options.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className="flex-1 cursor-pointer rounded-[9px] border-0 py-2 text-xs font-bold"
            style={{
              background: active ? colors.lime : "transparent",
              color: active ? "#1A2200" : colors.textMuted,
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
