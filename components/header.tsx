import { Bell, Mic, Plus, Search, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[color:rgba(245,247,251,0.78)]/80 backdrop-blur-xl dark:bg-[color:rgba(9,13,19,0.78)]/80">
      <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-3 py-3 sm:px-4 lg:px-6">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)] text-sm font-black text-white shadow-sm">
            D
          </div>
          <div className="min-w-0">
            <p className="text-base font-bold tracking-tight text-[var(--foreground)]">Drawing TV</p>
          </div>
        </div>

        <div className="hidden flex-1 items-center gap-3 xl:flex">
          <div className="flex w-full items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-sm text-[var(--muted)] shadow-sm">
            <Search className="h-4 w-4" />
            <input
              aria-label="Search"
              placeholder="영상, 채널, 재생목록 검색"
              className="w-full bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none"
            />
            <button className="rounded-full border border-[var(--border)] p-1.5 text-[var(--foreground)] transition hover:bg-[var(--hover)]" aria-label="Voice search">
              <Mic className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-2.5">
          <button className="hidden items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-sm font-medium text-[var(--foreground)] shadow-sm transition hover:bg-[var(--hover)] sm:inline-flex">
            <Sparkles className="h-4 w-4 text-[var(--accent)]" />
            <span className="hidden lg:inline">만들기</span>
          </button>
          <button className="rounded-full border border-[var(--border)] bg-[var(--panel)] p-2.5 text-[var(--foreground)] shadow-sm transition hover:bg-[var(--hover)]" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </button>
          <button className="hidden items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-sm font-medium text-[var(--foreground)] shadow-sm transition hover:bg-[var(--hover)] md:inline-flex">
            <Plus className="h-4 w-4 text-[var(--accent)]" />
            업로드
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-orange-400 to-pink-500 text-sm font-semibold text-white shadow-sm ring-2 ring-white/70 dark:ring-slate-900/70">
            H
          </button>
        </div>
      </div>
    </header>
  );
}
