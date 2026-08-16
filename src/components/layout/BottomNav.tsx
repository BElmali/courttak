"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Home, User } from "lucide-react";
import { colors } from "@/styles/tokens";

const items = [
  { href: "/", label: "Ana sayfa", Icon: Home },
  { href: "/matches", label: "Maçlar", Icon: BarChart3 },
  { href: "/profile", label: "Profil", Icon: User },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="flex border-t px-2 pb-4 pt-2.5"
      style={{ borderColor: colors.line, background: colors.surface }}
    >
      {items.map(({ href, label, Icon }) => {
        const active =
          href === "/"
            ? pathname === "/"
            : pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            key={href}
            href={href}
            className="flex flex-1 flex-col items-center gap-1 text-[11px] font-semibold"
            style={{ color: active ? colors.lime : colors.textFaint }}
          >
            <Icon size={20} strokeWidth={2} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
