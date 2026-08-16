"use client";

import { useState } from "react";
import { CourtSVG } from "@/components/court/CourtSVG";
import { DEMO_SHOT_DOTS } from "@/lib/mock-data";
import { colors } from "@/styles/tokens";

const PLAYERS = ["Nik", "Miguel", "Frankie", "Sam J."] as const;

function PctLabel({ value }: { value: string }) {
  return (
    <div className="flex-1 text-center">
      <div className="text-lg font-extrabold">{value}</div>
      <div className="text-[10px]" style={{ color: colors.textFaint }}>
        ↑ vuruş yönü
      </div>
    </div>
  );
}

export function ShotsTab() {
  const [selected, setSelected] = useState(1);

  return (
    <div>
      <div className="mb-3 flex gap-4">
        <PctLabel value="35%" />
        <PctLabel value="12%" />
        <PctLabel value="53%" />
      </div>
      <div
        className="rounded-2xl border p-3"
        style={{ background: colors.surface2, borderColor: colors.line }}
      >
        <CourtSVG>
          {DEMO_SHOT_DOTS.map(([x, y], i) => (
            <circle
              key={`${x}-${y}-${i}`}
              cx={x}
              cy={y}
              r="4.5"
              fill={i % 4 === 0 ? colors.lime : "#F2C94C"}
              opacity="0.9"
            />
          ))}
        </CourtSVG>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {PLAYERS.map((p, i) => (
          <button
            key={p}
            type="button"
            onClick={() => setSelected(i)}
            className="cursor-pointer rounded-full border px-3 py-1.5 text-xs font-bold"
            style={{
              background: i === selected ? colors.lime : colors.surface2,
              color: i === selected ? "#1A2200" : colors.textMuted,
              borderColor: i === selected ? colors.lime : colors.line,
            }}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
