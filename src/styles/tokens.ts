/** Courttak design tokens (from CourtDemo). */
export const colors = {
  bg: "#0A1022",
  surface: "#121B33",
  surface2: "#1B2645",
  line: "#2A3557",
  courtBlue: "#2454E8",
  courtBlueDeep: "#173A9E",
  lime: "#D7F238",
  limeDeep: "#8FA30F",
  coral: "#FF6B4A",
  textPrimary: "#F4F6FB",
  textMuted: "#8891AA",
  textFaint: "#5C6683",
} as const;

export type ColorToken = keyof typeof colors;
