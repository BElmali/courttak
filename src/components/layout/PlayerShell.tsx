"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/layout/BottomNav";
import { PhoneFrame } from "@/components/layout/PhoneFrame";
import { StatusBar } from "@/components/layout/StatusBar";
import { colors } from "@/styles/tokens";

export function PlayerShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideNav = /^\/matches\/[^/]+$/.test(pathname);

  return (
    <div
      className="flex min-h-full flex-1 flex-col items-center justify-center py-6"
      style={{
        background: `radial-gradient(ellipse at top, ${colors.surface} 0%, ${colors.bg} 55%, #050814 100%)`,
      }}
    >
      <PhoneFrame>
        <StatusBar />
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {children}
        </div>
        {!hideNav && <BottomNav />}
      </PhoneFrame>
    </div>
  );
}
