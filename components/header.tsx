import Link from "next/link";
import { Bell, ChevronDown, Mic, Plus, Search, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--header)] backdrop-blur-2xl">
      <div className="mx-auto flex h-[68px] max-w-[1680px] items-center gap-3 px-3 sm:px-5 lg:px-7">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5">
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-[14px] bg-[var(--foreground)] text-white shadow-sm dark:text-black">
            <div className="absolute inset-0 bg-[linear-gradient(145deg,var(--accent),var(--accent-2))] opacity-95" />
            <span className="relative text-sm font-black tracking-[-0.08em]">DT</span>
          </div>
          <div className="hidden min-w-0 sm:block">
            <div className="flex items-center gap-1">
              <span className="text-[15px] font-black tracking-[-0.035em] text-[var(--foreground)]">Drawing TV</span>
              <ChevronDown className="h-3.5 w-3.5 text-[var(--muted)] transition group-hover:translate-y-0.5" />
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">watch different</p>
          </div>
        </Link>

        <div className="mx-auto hidden w-full max-w-[620px] xl:block">
          <div className="flex h-11 items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--panel)] px-3 shadow-sm backdrop-blur-xl transition focus-within:border-[color:var(--accent)]">
            <Search className="h-4 w-4 shrink-0 text-[var(--muted)]" />
            <input
              aria-label="Search"
              placeholder="영상, 크리에이터, 순간을 검색"
              className="w-full bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
            />
            <div className="hidden rounded-lg border border-[var(--border)] px-1.5 py-0.5 text-[9px] font-bold text-[var(--muted)] 2xl:block">⌘ K</div>
            <button className="rounded-xl p-1.5 text-[var(--muted)] transition hover:bg-[var(--hover)] hover:text-[var(--foreground)]" aria-label="Voice search">
              <Mic className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <button className="rounded-2xl p-2.5 text-[var(--foreground)] transition hover:bg-[var(--hover)] xl:hidden" aria-label="Search">
            <Search className="h-[18px] w-[18px]" />
          </button>
          <Link
            href="/upload"
            className="hidden items-center gap-2 rounded-2xl bg-[var(--foreground)] px-3.5 py-2.5 text-sm font-bold text-[var(--background)] shadow-sm transition hover:-translate-y-0.5 sm:inline-flex"
          >
            <Plus className="h-4 w-4" />
            만들기
          </Link>
          <button className="relative rounded-2xl p-2.5 text-[var(--foreground)] transition hover:bg-[var(--hover)]" aria-label="Notifications">
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)] ring-2 ring-[var(--background)]" />
          </button>
          <button className="flex h-10 items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--panel)] px-1.5 pr-2.5 shadow-sm backdrop-blur-xl">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[linear-gradient(145deg,var(--accent-2),var(--accent))] text-xs font-black text-white">H</span>
            <Sparkles className="hidden h-3.5 w-3.5 text-[var(--muted)] sm:block" />
          </button>
        </div>
      </div>
    </header>
  );
}
