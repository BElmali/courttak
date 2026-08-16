import { MatchCard } from "@/components/match/MatchCard";
import { DEMO_MATCHES } from "@/lib/mock-data";
import { colors } from "@/styles/tokens";

export default function MatchesPage() {
  return (
    <div className="flex-1 overflow-y-auto px-[18px] pb-[18px] pt-2.5">
      <div className="mb-4 text-xl font-extrabold" style={{ color: colors.textPrimary }}>
        Maçların
      </div>
      {DEMO_MATCHES.map((m) => (
        <MatchCard key={m.id} match={m} />
      ))}
    </div>
  );
}
