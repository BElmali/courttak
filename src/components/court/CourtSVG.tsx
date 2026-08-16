import type { ReactNode } from "react";
import { colors } from "@/styles/tokens";

export function CourtSVG({ children }: { children?: ReactNode }) {
  return (
    <svg viewBox="0 0 220 320" width="100%" height="260">
      <defs>
        <radialGradient id="hot1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={colors.coral} stopOpacity="0.95" />
          <stop offset="55%" stopColor="#F2C94C" stopOpacity="0.55" />
          <stop offset="100%" stopColor={colors.courtBlue} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hot2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F2C94C" stopOpacity="0.8" />
          <stop offset="100%" stopColor={colors.courtBlue} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="4" y="4" width="212" height="312" rx="6" fill={colors.courtBlue} />
      <rect
        x="4"
        y="4"
        width="212"
        height="312"
        rx="6"
        fill="none"
        stroke="#7FA3F5"
        strokeWidth="2"
      />
      <line x1="4" y1="160" x2="216" y2="160" stroke="#7FA3F5" strokeWidth="2" />
      <line
        x1="110"
        y1="4"
        x2="110"
        y2="316"
        stroke="#7FA3F5"
        strokeWidth="1.4"
        strokeDasharray="4 4"
      />
      {children}
    </svg>
  );
}
