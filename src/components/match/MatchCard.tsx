import Link from "next/link";
import type { DemoMatch } from "@/lib/mock-data";
import { InitialsAvatar } from "@/components/ui/InitialsAvatar";
import { colors } from "@/styles/tokens";

export function MatchCard({ match }: { match: DemoMatch }) {
  return (
    <div
      className="mb-3 rounded-2xl border p-3.5"
      style={{ background: colors.surface2, borderColor: colors.line }}
    >
      <div
        className="mb-2.5 flex justify-between text-[11px] font-semibold tracking-wide"
        style={{ color: colors.textMuted }}
      >
        <span>{match.date.toUpperCase()}</span>
        <span>{match.venue}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex">
          <InitialsAvatar name={match.teamA[0]} />
          <div className="-ml-2">
            <InitialsAvatar name={match.teamA[1]} />
          </div>
        </div>
        <span className="text-[11px] font-bold" style={{ color: colors.textFaint }}>
          VS
        </span>
        <div className="flex">
          <InitialsAvatar name={match.teamB[0]} />
          <div className="-ml-2">
            <InitialsAvatar name={match.teamB[1]} />
          </div>
        </div>
        <span className="text-[13px] font-semibold" style={{ color: colors.textMuted }}>
          {match.time}
        </span>
      </div>

      <Link
        href={`/matches/${match.id}`}
        className="mt-3 block w-full rounded-[10px] py-2.5 text-center text-[13px] font-bold"
        style={{ background: colors.lime, color: "#1A2200" }}
      >
        Maçı görüntüle
      </Link>
    </div>
  );
}
