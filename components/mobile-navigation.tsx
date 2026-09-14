import { Clapperboard, Home, Plus, UserRound, PlaySquare } from "lucide-react";

const items = [
  { label: "홈", icon: Home, active: true },
  { label: "Shorts", icon: Clapperboard },
  { label: "만들기", icon: Plus },
  { label: "구독", icon: PlaySquare },
  { label: "내 페이지", icon: UserRound },
];

export default function MobileNavigation() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border)] bg-[color:rgba(245,247,251,0.92)] backdrop-blur-xl dark:bg-[color:rgba(9,13,19,0.92)] lg:hidden">
      <div className="grid grid-cols-5 gap-2 px-2 py-2">
        {items.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition ${
              active ? "text-[var(--foreground)]" : "text-[var(--muted)]"
            }`}
          >
            <Icon className={`h-5 w-5 ${active ? "text-[var(--accent)]" : ""}`} />
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
