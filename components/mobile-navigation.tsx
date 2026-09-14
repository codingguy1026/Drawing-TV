"use client";

import Link from "next/link";
import { Clapperboard, Home, Plus, UserRound, PlaySquare } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  { label: "홈", icon: Home, href: "/" },
  { label: "Shorts", icon: Clapperboard, href: "/shorts" },
  { label: "만들기", icon: Plus, href: "/upload" },
  { label: "구독", icon: PlaySquare, href: "/subscriptions" },
  { label: "내 페이지", icon: UserRound, href: "/library" },
];

export default function MobileNavigation() {
  const pathname = usePathname();
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border)] bg-[color:rgba(245,247,251,0.92)] backdrop-blur-xl dark:bg-[color:rgba(9,13,19,0.92)] lg:hidden">
      <div className="grid grid-cols-5 gap-2 px-2 py-2">
        {items.map(({ label, icon: Icon, href }) => {
          const active = isActive(href);
          return (
            <Link
              key={label}
              href={href}
              className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition ${active ? "text-[var(--foreground)]" : "text-[var(--muted)]"}`}
            >
              <Icon className={`h-5 w-5 ${active ? "text-[var(--accent)]" : ""}`} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
