import Link from "next/link";
import { Bell, Mic, Plus, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--header)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1640px] items-center gap-4 px-3 sm:px-5 lg:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-[13px] bg-[linear-gradient(145deg,var(--accent),var(--accent-2))] text-xs font-black text-white shadow-sm">
            DT
          </div>
          <span className="hidden text-base font-black tracking-[-0.035em] text-[var(--foreground)] sm:block">
            Drawing TV
          </span>
        </Link>

        <div className="mx-auto hidden w-full max-w-[640px] xl:block">
          <div className="flex h-10 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)] px-3 shadow-sm transition focus-within:border-[var(--accent)]">
            <Search className="h-4 w-4 shrink-0 text-[var(--muted)]" />
            <input
              aria-label="Search"
              placeholder="영상, 채널, 재생목록 검색"
              className="w-full bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
            />
            <button
              className="rounded-full p-1.5 text-[var(--muted)] transition hover:bg-[var(--hover)] hover:text-[var(--foreground)]"
              aria-label="Voice search"
            >
              <Mic className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <button className="rounded-full p-2.5 text-[var(--foreground)] transition hover:bg-[var(--hover)] xl:hidden" aria-label="Search">
            <Search className="h-[18px] w-[18px]" />
          </button>

          <Link
            href="/upload"
            className="hidden items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)] px-3.5 py-2 text-sm font-bold text-[var(--foreground)] shadow-sm transition hover:bg-[var(--hover)] sm:inline-flex"
          >
            <Plus className="h-4 w-4 text-[var(--accent)]" />
            만들기
          </Link>

          <button
            className="relative rounded-full border border-[var(--border)] bg-[var(--panel)] p-2.5 text-[var(--foreground)] shadow-sm transition hover:bg-[var(--hover)]"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)] ring-2 ring-[var(--panel-strong)]" />
          </button>

          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(145deg,var(--accent-2),var(--accent))] text-xs font-black text-white shadow-sm">
            H
          </button>
        </div>
      </div>
    </header>
  );
}
