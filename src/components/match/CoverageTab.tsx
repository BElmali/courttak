import { Flame, Target } from "lucide-react";
import { CourtSVG } from "@/components/court/CourtSVG";
import { StatChip } from "@/components/ui/StatChip";
import { colors } from "@/styles/tokens";

export function CoverageTab() {
  return (
    <div>
      <div
        className="mb-2.5 text-xs font-bold"
        style={{ color: colors.textMuted }}
      >
        Kort kapsama alanı — 63.0 sn top içi süre
      </div>
      <div
        className="rounded-2xl border p-3"
        style={{ background: colors.surface2, borderColor: colors.line }}
      >
        <CourtSVG>
          <ellipse cx="105" cy="230" rx="70" ry="65" fill="url(#hot1)" />
          <ellipse cx="150" cy="190" rx="35" ry="30" fill="url(#hot2)" />
        </CourtSVG>
      </div>
      <div className="mt-3.5 flex gap-2.5">
        <StatChip label="Baskın bölge" value="Alt-sağ" Icon={Flame} />
        <StatChip label="Kort kullanımı" value="%68" Icon={Target} />
      </div>
    </div>
  );
}
