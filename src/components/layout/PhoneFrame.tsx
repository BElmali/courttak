import type { ReactNode } from "react";
import { colors } from "@/styles/tokens";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="mx-auto"
      style={{
        width: 360,
        height: 740,
        background: "#000",
        borderRadius: 44,
        padding: 10,
        boxShadow: `0 0 0 1px ${colors.line}`,
      }}
    >
      <div
        className="relative flex h-full w-full flex-col overflow-hidden"
        style={{
          background: colors.bg,
          borderRadius: 34,
          color: colors.textPrimary,
          fontFamily:
            "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {children}
      </div>
    </div>
  );
}
