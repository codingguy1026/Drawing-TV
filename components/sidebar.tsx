import { Clapperboard, Compass, Clock3, History, House, ListVideo, PlaySquare, Sparkles, ThumbsUp, UserRound, Video, Flame, Bookmark } from "lucide-react";

const primary = [
  { label: "홈", icon: House, active: true },
  { label: "Shorts", icon: Clapperboard },
  { label: "구독", icon: PlaySquare },
  { label: "탐색", icon: Compass },
];

const personal = [
  { label: "시청 기록", icon: History },
  { label: "나중에 볼 영상", icon: Clock3 },
  { label: "좋아요 표시한 영상", icon: ThumbsUp },
  { label: "재생목록", icon: Bookmark },
];

const creator = [
  { label: "내 채널", icon: UserRound },
  { label: "콘텐츠 관리", icon: Video },
  { label: "업로드", icon: Sparkles },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-[250px] shrink-0 border-r border-[var(--border)] bg-[var(--background)]/80 px-3 py-4 lg:block">
      <div className="sticky top-[75px] space-y-6">
        <nav className="space-y-1">
          {primary.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                active
                  ? "bg-[var(--accent-soft)] text-[var(--foreground)]"
                  : "text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="space-y-2">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
            개인
          </p>
          {personal.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-[var(--muted)] transition hover:bg-[var(--hover)] hover:text-[var(--foreground)]"
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
            크리에이터
          </p>
          {creator.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-[var(--muted)] transition hover:bg-[var(--hover)] hover:text-[var(--foreground)]"
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-3">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
            <Flame className="h-4 w-4 text-[var(--accent)]" />
            인기 토픽
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-[var(--muted)]">
            {['게임', '스포츠', '음악', '애니', '밈'].map((tag) => (
              <span key={tag} className="rounded-full border border-[var(--border)] px-2 py-1">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
