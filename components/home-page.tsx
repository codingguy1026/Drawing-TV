import { ArrowRight, Flame, History, Play, TrendingUp, Users } from "lucide-react";
import { continueWatching, creators, featuredVideos, shorts, trendingList } from "@/lib/mock-data";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import MobileNavigation from "@/components/mobile-navigation";
import CategoryRail from "@/components/category-rail";
import VideoCard from "@/components/video-card";
import ShortsPreview from "@/components/shorts-preview";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <div className="mx-auto flex max-w-[1600px] gap-6 px-3 pb-24 pt-4 sm:px-4 lg:px-6">
        <Sidebar />

        <main className="min-w-0 flex-1 space-y-6">
          <div className="rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
            <CategoryRail />
          </div>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <h2 className="text-lg font-bold text-[var(--foreground)]">지금 뜨는 영상</h2>
              </div>
              <button className="inline-flex items-center gap-1 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]">
                더보기 <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {featuredVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                  <History className="h-4 w-4" />
                </div>
                <h2 className="text-lg font-bold text-[var(--foreground)]">계속 시청하기</h2>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {continueWatching.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>

          <ShortsPreview />

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Users className="h-4 w-4" />
                </div>
                <h2 className="text-lg font-bold text-[var(--foreground)]">새로운 크리에이터</h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {creators.map((creator) => (
                <div key={creator.id} className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm">
                  <div className="mb-3 flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${creator.accent} text-sm font-bold text-white`}>
                      {creator.name.slice(0, 1)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[var(--foreground)]">{creator.name}</p>
                      <p className="text-xs text-[var(--muted)]">{creator.handle}</p>
                    </div>
                  </div>
                  <div className="mb-3 flex items-center justify-between text-xs text-[var(--muted)]">
                    <span>구독자</span>
                    <span className="font-medium text-[var(--foreground)]">{creator.subscribers}</span>
                  </div>
                  <button className="w-full rounded-full bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-white transition hover:opacity-95">
                    구독
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4 rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Flame className="h-4 w-4" />
                  </div>
                  <h2 className="text-lg font-bold text-[var(--foreground)]">추천 키워드</h2>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingList.map((tag) => (
                  <button
                    key={tag}
                    className="rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2 text-sm text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--foreground)]"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Play className="h-4 w-4" />
                </div>
                <h2 className="text-lg font-bold text-[var(--foreground)]">지금 라이브</h2>
              </div>
              <div className="space-y-3">
                {[
                  { title: "클래시 로얄 시즌 2 정리 방송", viewers: "21.9만 시청 중" },
                  { title: "하이브리드 뮤직 라이브 스테이지", viewers: "8.7만 시청 중" },
                  { title: "학생 축구 토너먼트 상금전", viewers: "3.4만 시청 중" },
                ].map((live) => (
                  <div key={live.title} className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--panel-strong)] p-3">
                    <div>
                      <p className="text-sm font-semibold text-[var(--foreground)]">{live.title}</p>
                      <p className="text-xs text-[var(--muted)]">{live.viewers}</p>
                    </div>
                    <span className="rounded-full bg-red-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-red-500">
                      LIVE
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
}
