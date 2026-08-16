"use client";

import { useState } from "react";
import { Check, QrCode } from "lucide-react";
import { MatchCard } from "@/components/match/MatchCard";
import { DEMO_MATCHES } from "@/lib/mock-data";
import { colors } from "@/styles/tokens";

export function HomeScreen() {
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    window.setTimeout(() => setScanning(false), 2600);
  };

  return (
    <div className="flex-1 overflow-y-auto px-[18px] pb-[18px] pt-1">
      <div className="mb-[22px] mt-1.5">
        <div className="text-[13px] font-semibold" style={{ color: colors.textMuted }}>
          Hoş geldin
        </div>
        <div className="text-[22px] font-extrabold">Burak</div>
      </div>

      <button
        type="button"
        onClick={handleScan}
        className="mb-6 flex w-full cursor-pointer flex-col items-center gap-2.5 rounded-[20px] border-0 px-5 py-[26px]"
        style={{
          background: `linear-gradient(135deg, ${colors.courtBlueDeep}, ${colors.courtBlue})`,
        }}
      >
        {scanning ? (
          <>
            <Check size={30} color={colors.lime} strokeWidth={2.5} />
            <div className="text-[15px] font-extrabold" style={{ color: colors.textPrimary }}>
              Kayıt başladı — iyi maçlar
            </div>
          </>
        ) : (
          <>
            <QrCode size={30} color={colors.lime} strokeWidth={2} />
            <div className="text-[15px] font-extrabold" style={{ color: colors.textPrimary }}>
              Kort QR&apos;ını okut
            </div>
            <div className="text-xs text-[#C9D6FF]">
              Kamerayı başlatır, maçını sana bağlar
            </div>
          </>
        )}
      </button>

      <div
        className="mb-2.5 text-[13px] font-bold tracking-wide"
        style={{ color: colors.textMuted }}
      >
        Son maçlar
      </div>
      {DEMO_MATCHES.map((m) => (
        <MatchCard key={m.id} match={m} />
      ))}
    </div>
  );
}
