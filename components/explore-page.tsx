import { Flame, Search, Sparkles, TrendingUp, Users } from "lucide-react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import MobileNavigation from "@/components/mobile-navigation";
import VideoCard from "@/components/video-card";
import { featuredVideos, trendingList, creators } from "@/lib/mock-data";

const exploreSections = [
  { title: "트렌딩", videos: featuredVideos.slice(0, 3) },
  { title: "게임 인기", videos: featuredVideos.slice(2, 5) },
  { title: "음악 추천", videos: featuredVideos.slice(1, 4) },
];

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <div className="mx-auto flex max-w-[1600px] gap-6 px-3 pb-24 pt-4 sm:px-4 lg:px-6">
        <Sidebar />

        <main className="min-w-0 flex-1 space-y-6">
          <div className="rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Search className="h-4 w-4" />
                </div>
                <h1 className="text-xl font-bold text-[var(--foreground)]">탐색</h1>
              </div>
              <div className="flex flex-wrap gap-2">
                {['게임', '음악', '스포츠', '밈', '애니', '테크'].map((tag) => (
                  <button key={tag} className="rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] hover:text-[var(--foreground)]">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[var(--accent)]" />
                <h2 className="text-lg font-bold text-[var(--foreground)]">실시간 검색어</h2>
              </div>
              <div className="space-y-2">
                {trendingList.map((item, index) => (
                  <div key={item} className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2.5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-bold text-[var(--accent)]">
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium text-[var(--foreground)]">{item}</span>
                    </div>
                    <span className="text-[11px] text-[var(--muted)]">급상승</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
              <div className="mb-4 flex items-center gap-2">
                <Users className="h-4 w-4 text-[var(--accent)]" />
                <h2 className="text-lg font-bold text-[var(--foreground)]">성장 중인 크리에이터</h2>
              </div>
              <div className="space-y-3">
                {creators.map((creator) => (
                  <div key={creator.id} className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--panel-strong)] p-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${creator.accent} text-xs font-bold text-white`}>
                        {creator.name.slice(0, 1)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--foreground)]">{creator.name}</p>
                        <p className="text-xs text-[var(--muted)]">{creator.handle}</p>
                      </div>
                    </div>
                    <button className="rounded-full bg-[var(--accent)] px-3 py-1.5 text-xs font-semibold text-white">구독</button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {exploreSections.map((section) => (
            <section key={section.title} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <h2 className="text-lg font-bold text-[var(--foreground)]">{section.title}</h2>
                </div>
                <button className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]">더보기</button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {section.videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
}
