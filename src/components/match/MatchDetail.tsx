"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Clock, Flame } from "lucide-react";
import type { DemoMatch } from "@/lib/mock-data";
import { CoverageTab } from "@/components/match/CoverageTab";
import { HighlightsTab } from "@/components/match/HighlightsTab";
import { ShotsTab } from "@/components/match/ShotsTab";
import { InitialsAvatar } from "@/components/ui/InitialsAvatar";
import { Segmented } from "@/components/ui/Segmented";
import { StatChip } from "@/components/ui/StatChip";
import { colors } from "@/styles/tokens";

type DetailTab = "coverage" | "shots" | "highlights";

export function MatchDetail({ match }: { match: DemoMatch }) {
  const [tab, setTab] = useState<DetailTab>("coverage");

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center gap-2.5 px-[18px] pb-1 pt-2">
        <Link
          href="/matches"
          className="cursor-pointer p-1"
          style={{ color: colors.textPrimary }}
          aria-label="Geri"
        >
          <ChevronLeft size={22} />
        </Link>
        <div className="text-[15px] font-extrabold">Maç özeti</div>
      </div>

      <div className="px-[18px] py-2">
        <div
          className="mb-3.5 rounded-2xl p-4"
          style={{
            background: `linear-gradient(135deg, ${colors.courtBlueDeep}, ${colors.courtBlue})`,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex">
              <InitialsAvatar name={match.teamA[0]} size={34} />
              <div className="-ml-2">
                <InitialsAvatar name={match.teamA[1]} size={34} />
              </div>
            </div>
            <div className="text-center">
              <div className="text-[11px] font-bold text-[#C9D6FF]">
                {match.winner === "B" ? "TAKIM B KAZANDI" : "TAKIM A KAZANDI"}
              </div>
              <div className="mt-0.5 text-[11px] text-[#C9D6FF]">
                {match.duration}
              </div>
            </div>
            <div className="flex">
              <InitialsAvatar name={match.teamB[0]} size={34} />
              <div className="-ml-2">
                <InitialsAvatar name={match.teamB[1]} size={34} />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 flex gap-2.5">
          <StatChip label="Maç süresi" value={match.duration} Icon={Clock} />
          <StatChip label="En uzun rally" value="60 vuruş" Icon={Flame} />
        </div>

        <Segmented
          value={tab}
          onChange={setTab}
          options={[
            { id: "coverage", label: "Kort kapsama" },
            { id: "shots", label: "Vuruşlar" },
            { id: "highlights", label: "Öne çıkanlar" },
          ]}
        />
      </div>

      <div className="flex-1 overflow-y-auto px-[18px] pb-5">
        {tab === "coverage" && <CoverageTab />}
        {tab === "shots" && <ShotsTab />}
        {tab === "highlights" && <HighlightsTab />}
      </div>
    </div>
  );
}
