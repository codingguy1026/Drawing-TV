import { ArrowRight, Search, Sparkles, TrendingUp, Users } from "lucide-react";
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
    <div className="min-h-screen text-[var(--foreground)]">
      <Header />

      <div className="mx-auto flex max-w-[1640px] gap-6 px-3 pb-28 pt-5 sm:px-5 lg:px-6">
        <Sidebar />

        <main className="min-w-0 flex-1 space-y-7">
          <section className="rounded-[26px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
              <div className="xl:w-[260px]">
                <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[var(--accent)]">Explore</p>
                <h1 className="mt-1 text-2xl font-black tracking-[-0.04em]">탐색</h1>
                <p className="mt-1 text-xs text-[var(--muted)]">새로운 영상과 채널을 찾아봐.</p>
              </div>

              <div className="flex flex-1 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2 shadow-sm">
                <Search className="h-4 w-4 text-[var(--muted)]" />
                <input
                  aria-label="Explore search"
                  placeholder="게임, 음악, 스포츠, 밈..."
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
                />
                <button className="rounded-full bg-[var(--foreground)] px-3 py-1.5 text-xs font-black text-[var(--background)]">검색</button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {["게임", "음악", "스포츠", "밈", "애니", "테크"].map((tag) => (
                <button
                  key={tag}
                  className="rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-1.5 text-xs font-semibold text-[var(--muted)] transition hover:text-[var(--foreground)]"
                >
                  {tag}
                </button>
              ))}
            </div>
          </section>

          <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[26px] border border-[var(--border)] bg-[var(--panel)] p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <h2 className="text-lg font-black">실시간 검색어</h2>
                </div>
                <span className="text-[10px] font-bold text-[var(--muted)]">방금 업데이트</span>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {trendingList.map((item, index) => (
                  <button
                    key={item}
                    className="group flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--panel-strong)] p-3 text-left transition hover:bg-[var(--hover)]"
                  >
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-black ${
                      index < 3 ? "bg-[var(--accent-soft)] text-[var(--accent)]" : "bg-[var(--hover)] text-[var(--muted)]"
                    }`}>
                      {index + 1}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-bold">{item}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[26px] border border-[var(--border)] bg-[var(--panel)] p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Users className="h-4 w-4" />
                </div>
                <h2 className="text-lg font-black">성장 중인 채널</h2>
              </div>

              <div className="space-y-2">
                {creators.map((creator) => (
                  <div key={creator.id} className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-[var(--hover)]">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${creator.accent} text-xs font-black text-white`}>
                      {creator.name.slice(0, 1)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold">{creator.name}</p>
                      <p className="mt-0.5 text-[11px] text-[var(--muted)]">{creator.subscribers} 구독자</p>
                    </div>
                    <button className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-black transition hover:bg-[var(--foreground)] hover:text-[var(--background)]">
                      구독
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {exploreSections.map((section) => (
            <section key={section.title} className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <h2 className="text-xl font-black tracking-[-0.03em]">{section.title}</h2>
                </div>
                <button className="flex items-center gap-1 text-xs font-bold text-[var(--muted)] transition hover:text-[var(--foreground)]">
                  더보기 <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="grid gap-x-4 gap-y-7 sm:grid-cols-2 xl:grid-cols-3">
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
