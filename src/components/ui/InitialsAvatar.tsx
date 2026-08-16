import { colors } from "@/styles/tokens";

export function InitialsAvatar({
  name,
  size = 30,
}: {
  name: string;
  size?: number;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-bold"
      style={{
        width: size,
        height: size,
        background: colors.courtBlueDeep,
        border: `1px solid ${colors.courtBlue}`,
        fontSize: size * 0.38,
        color: colors.lime,
      }}
    >
      {initials}
    </div>
  );
}
