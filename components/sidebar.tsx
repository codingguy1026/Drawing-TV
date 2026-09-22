"use client";

import Link from "next/link";
import { Bookmark, Clapperboard, Clock3, Compass, History, House, PlaySquare, Radio, Sparkles, UserRound, Video } from "lucide-react";
import { usePathname } from "next/navigation";

const primary = [
  { label: "홈", icon: House, href: "/" },
  { label: "탐색", icon: Compass, href: "/explore" },
  { label: "Shorts", icon: Clapperboard, href: "/shorts" },
  { label: "구독", icon: PlaySquare, href: "/subscriptions" },
];

const personal = [
  { label: "시청 기록", icon: History, href: "/history" },
  { label: "나중에 볼 영상", icon: Clock3, href: "/library" },
  { label: "재생목록", icon: Bookmark, href: "/library" },
];

const creator = [
  { label: "내 채널", icon: UserRound, href: "/@me" },
  { label: "콘텐츠", icon: Video, href: "/library" },
  { label: "업로드", icon: Sparkles, href: "/upload" },
];

function NavLink({ href, label, icon: Icon, active }: { href: string; label: string; icon: typeof House; active: boolean }) {
  return (
    <Link
      href={href}
      className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition ${
        active
          ? "bg-[var(--foreground)] text-[var(--background)] shadow-sm"
          : "text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]"
      }`}
    >
      <span className={`flex h-8 w-8 items-center justify-center rounded-xl transition ${
        active ? "bg-white/10 dark:bg-black/10" : "bg-transparent group-hover:bg-[var(--panel)]"
      }`}>
        <Icon className="h-4 w-4" />
      </span>
      <span>{label}</span>
      {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />}
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <aside className="hidden w-[224px] shrink-0 lg:block">
      <div className="sticky top-[84px] space-y-5">
        <nav className="space-y-1">
          {primary.map((item) => <NavLink key={item.label} {...item} active={isActive(item.href)} />)}
        </nav>

        <div className="h-px bg-[var(--border)]" />

        <div className="space-y-1">
          <p className="px-3 pb-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--muted)]">Your space</p>
          {personal.map((item) => <NavLink key={item.label} {...item} active={isActive(item.href)} />)}
        </div>

        <div className="space-y-1">
          <p className="px-3 pb-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--muted)]">Studio</p>
          {creator.map((item) => <NavLink key={item.label} {...item} active={isActive(item.href)} />)}
        </div>

        <div className="overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between">
            <span className="tv-kicker text-[var(--muted)]">On air</span>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
              <Radio className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-bold leading-5 text-[var(--foreground)]">라이브 지금 12개</p>
              <p className="mt-0.5 text-xs leading-5 text-[var(--muted)]">게임, 음악, 스포츠 채널이 방송 중</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
