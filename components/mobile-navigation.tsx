"use client";

import Link from "next/link";
import { Clapperboard, Home, Plus, UserRound, PlaySquare } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  { label: "홈", icon: Home, href: "/" },
  { label: "Shorts", icon: Clapperboard, href: "/shorts" },
  { label: "만들기", icon: Plus, href: "/upload", create: true },
  { label: "구독", icon: PlaySquare, href: "/subscriptions" },
  { label: "내 페이지", icon: UserRound, href: "/library" },
];

export default function MobileNavigation() {
  const pathname = usePathname();
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 rounded-[22px] border border-[var(--border)] bg-[var(--header)] p-1.5 shadow-[var(--shadow)] backdrop-blur-xl lg:hidden">
      <div className="grid grid-cols-5 items-center gap-1">
        {items.map(({ label, icon: Icon, href, create }) => {
          const active = isActive(href);

          if (create) {
            return (
              <Link key={label} href={href} className="flex -translate-y-2 flex-col items-center gap-1 text-[10px] font-bold text-[var(--foreground)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-[linear-gradient(145deg,var(--accent),var(--accent-2))] text-white shadow-md">
                  <Icon className="h-5 w-5" />
                </span>
                {label}
              </Link>
            );
          }

          return (
            <Link
              key={label}
              href={href}
              className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-[16px] px-1 text-[10px] font-bold transition ${
                active ? "bg-[var(--accent-soft)] text-[var(--foreground)]" : "text-[var(--muted)]"
              }`}
            >
              <Icon className={`h-[18px] w-[18px] ${active ? "text-[var(--accent)]" : ""}`} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
