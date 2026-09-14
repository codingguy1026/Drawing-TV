import { Heart, MessageSquareText, Share2, Sparkles, ThumbsDown, UserPlus } from "lucide-react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import MobileNavigation from "@/components/mobile-navigation";

const shortsFeed = [
  {
    id: "s-1",
    creator: "핏플래닛",
    handle: "@fitplanet",
    caption: "스쿼트 30초 루틴으로 하루 체력 회복",
    tags: ["#운동", "#루틴", "#초보자"],
    accent: "linear-gradient(135deg, #16a34a 0%, #84cc16 45%, #facc15 100%)",
    likes: "124만",
    comments: "21.4만",
  },
  {
    id: "s-2",
    creator: "레벨업에이전시",
    handle: "@levelupagency",
    caption: "게임 중간에 이 장면을 넣으면 확 살아난다",
    tags: ["#게임", "#디자인", "#창작"],
    accent: "linear-gradient(135deg, #7c3aed 0%, #2563eb 55%, #22d3ee 100%)",
    likes: "89만",
    comments: "8.8만",
  },
  {
    id: "s-3",
    creator: "먹거리 탐정",
    handle: "@guiltyeats",
    caption: "이 식당도 진짜 가야 될지 말아야 될지 고민되네",
    tags: ["#먹방", "#리뷰", "#맛집"],
    accent: "linear-gradient(135deg, #f59e0b 0%, #ef4444 55%, #7f1d1d 100%)",
    likes: "66만",
    comments: "14.1만",
  },
];

export default function ShortsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <div className="mx-auto flex max-w-[1600px] gap-6 px-3 pb-24 pt-4 sm:px-4 lg:px-6">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="flex items-center justify-between rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h1 className="text-xl font-bold text-[var(--foreground)]">Shorts</h1>
              </div>
              <button className="rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2 text-sm font-medium text-[var(--foreground)]">
                추천
              </button>
            </div>

            <div className="space-y-5">
              {shortsFeed.map((short) => (
                <article key={short.id} className="overflow-hidden rounded-[30px] border border-[var(--border)] bg-[var(--panel)] shadow-sm">
                  <div className="grid gap-4 p-4 md:grid-cols-[minmax(0,1fr)_260px] md:p-5">
                    <div className="relative aspect-[9/16] overflow-hidden rounded-[26px] border border-white/15" style={{ backgroundImage: short.accent }}>
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,23,42,0.75),transparent_38%)]" />
                      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 text-white">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-xs font-bold backdrop-blur-sm">
                            {short.creator.slice(0, 1)}
                          </div>
                          <div>
                            <p>{short.creator}</p>
                            <p className="text-[10px] text-white/70">{short.handle}</p>
                          </div>
                        </div>
                        <button className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
                          <UserPlus className="h-3.5 w-3.5" />
                          팔로우
                        </button>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                        <p className="mb-2 text-base font-semibold">{short.caption}</p>
                        <div className="mb-3 flex flex-wrap gap-2 text-[10px] text-white/80">
                          {short.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between gap-3 py-2">
                      <div className="space-y-3">
                        <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel-strong)] p-3">
                          <p className="mb-2 text-xs uppercase tracking-[0.14em] text-[var(--muted)]">통계</p>
                          <div className="space-y-2 text-sm text-[var(--foreground)]">
                            <div className="flex items-center justify-between">
                              <span className="inline-flex items-center gap-2"><Heart className="h-4 w-4 text-[var(--accent)]" /> 좋아요</span>
                              <span>{short.likes}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="inline-flex items-center gap-2"><MessageSquareText className="h-4 w-4 text-[var(--accent)]" /> 댓글</span>
                              <span>{short.comments}</span>
                            </div>
                          </div>
                        </div>
                        <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel-strong)] p-3">
                          <p className="mb-2 text-xs uppercase tracking-[0.14em] text-[var(--muted)]">반응</p>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { icon: Heart, label: "좋아요" },
                              { icon: ThumbsDown, label: "관심없음" },
                              { icon: Share2, label: "공유" },
                            ].map(({ icon: Icon, label }) => (
                              <button key={label} className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] px-2.5 py-1.5 text-xs text-[var(--foreground)] hover:bg-[var(--hover)]">
                                <Icon className="h-3.5 w-3.5" />
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
}
