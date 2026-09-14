"use client";

import Link from "next/link";
import { Bookmark, Clapperboard, Clock3, Compass, Flame, History, House, PlaySquare, Sparkles, ThumbsUp, UserRound, Video } from "lucide-react";
import { usePathname } from "next/navigation";

const primary = [
  { label: "홈", icon: House, href: "/" },
  { label: "Shorts", icon: Clapperboard, href: "/shorts" },
  { label: "구독", icon: PlaySquare, href: "/subscriptions" },
  { label: "탐색", icon: Compass, href: "/explore" },
];

const personal = [
  { label: "시청 기록", icon: History, href: "/history" },
  { label: "나중에 볼 영상", icon: Clock3, href: "/library" },
  { label: "좋아요 표시한 영상", icon: ThumbsUp, href: "/library" },
  { label: "재생목록", icon: Bookmark, href: "/library" },
];

const creator = [
  { label: "내 채널", icon: UserRound, href: "/@me" },
  { label: "콘텐츠 관리", icon: Video, href: "/library" },
  { label: "업로드", icon: Sparkles, href: "/upload" },
];

function NavLink({ href, label, icon: Icon, active }: { href: string; label: string; icon: typeof House; active: boolean }) {
  return (
    <Link
      href={href}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
        active
          ? "bg-[var(--accent-soft)] text-[var(--foreground)]"
          : "text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]"
      }`}
    >
      <Icon className={`h-4 w-4 ${active ? "text-[var(--accent)]" : ""}`} />
      {label}
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <aside className="hidden w-[250px] shrink-0 border-r border-[var(--border)] bg-[var(--background)]/80 px-3 py-4 lg:block">
      <div className="sticky top-[75px] space-y-6">
        <nav className="space-y-1">
          {primary.map((item) => <NavLink key={item.label} {...item} active={isActive(item.href)} />)}
        </nav>

        <div className="space-y-2">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">개인</p>
          {personal.map((item) => <NavLink key={item.label} {...item} active={isActive(item.href)} />)}
        </div>

        <div className="space-y-2">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">크리에이터</p>
          {creator.map((item) => <NavLink key={item.label} {...item} active={isActive(item.href)} />)}
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-3">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
            <Flame className="h-4 w-4 text-[var(--accent)]" />
            인기 토픽
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-[var(--muted)]">
            {["게임", "스포츠", "음악", "애니", "밈"].map((tag) => (
              <span key={tag} className="rounded-full border border-[var(--border)] px-2 py-1">#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
