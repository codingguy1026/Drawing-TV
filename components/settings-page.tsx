import { Bell, Lock, ShieldCheck, UserRound, Volume2 } from "lucide-react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import MobileNavigation from "@/components/mobile-navigation";

const settingsGroups = [
  {
    title: "계정",
    items: [
      { label: "프로필 정보", icon: UserRound },
      { label: "비밀번호 및 보안", icon: Lock },
      { label: "개인정보 관리", icon: ShieldCheck },
    ],
  },
  {
    title: "알림",
    items: [
      { label: "영상 업데이트 알림", icon: Bell },
      { label: "소리 및 접근성", icon: Volume2 },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <div className="mx-auto flex max-w-[1600px] gap-6 px-3 pb-24 pt-4 sm:px-4 lg:px-6">
        <Sidebar />

        <main className="min-w-0 flex-1 space-y-6">
          <div className="rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                <UserRound className="h-4 w-4" />
              </div>
              <h1 className="text-xl font-bold text-[var(--foreground)]">설정</h1>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            {settingsGroups.map((group) => (
              <section key={group.title} className="rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
                <h2 className="mb-4 text-lg font-bold text-[var(--foreground)]">{group.title}</h2>
                <div className="space-y-3">
                  {group.items.map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      className="flex w-full items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-3 text-left text-sm font-medium text-[var(--foreground)] hover:bg-[var(--hover)]"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Icon className="h-4 w-4 text-[var(--accent)]" />
                        {label}
                      </span>
                      <span className="text-[var(--muted)]">→</span>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
}
