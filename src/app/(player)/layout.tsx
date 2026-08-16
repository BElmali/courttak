import type { ReactNode } from "react";
import { PlayerShell } from "@/components/layout/PlayerShell";

export default function PlayerLayout({ children }: { children: ReactNode }) {
  return <PlayerShell>{children}</PlayerShell>;
}
