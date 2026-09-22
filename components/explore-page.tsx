import { ArrowRight, Flame, Search, Sparkles, TrendingUp, Users } from "lucide-react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import MobileNavigation from "@/components/mobile-navigation";
import VideoCard from "@/components/video-card";
import { featuredVideos, trendingList, creators } from "@/lib/mock-data";

const exploreSections = [
  { kicker: "Hot right now", title: "트렌딩", videos: featuredVideos.slice(0, 3) },
  { kicker: "Level up", title: "게임 인기", videos: featuredVideos.slice(2, 5) },
  { kicker: "Turn it up", title: "음악 추천", videos: featuredVideos.slice(1, 4) },
];

export default function ExplorePage() {
  return (
    <div className="min-h-screen text-[var(--foreground)]">
      <Header />

      <div className="mx-auto flex max-w-[1680px] gap-7 px-3 pb-28 pt-5 sm:px-5 lg:px-7">
        <Sidebar />

        <main className="min-w-0 flex-1 space-y-8">
          <section className="relative overflow-hidden rounded-[34px] bg-[var(--foreground)] p-5 text-[var(--background)] shadow-[var(--shadow)] sm:p-8">
            <div className="tv-grid absolute inset-0 opacity-[0.08]" />
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--accent)] opacity-20 blur-3xl" />
            <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-[var(--accent-2)] opacity-20 blur-3xl" />

            <div className="relative max-w-3xl">
              <p className="tv-kicker text-[var(--accent)]">Explore Drawing TV</p>
              <h1 className="mt-2 text-4xl font-black tracking-[-0.055em] sm:text-5xl">취향의 다음 장면을 찾아봐.</h1>
              <p className="mt-3 max-w-xl text-sm font-medium leading-6 opacity-60 sm:text-base">
                지금 뜨는 영상부터 아직 아무도 발견하지 못한 채널까지, 한 화면에서 깊게 탐색해.
              </p>

              <div className="mt-7 flex max-w-2xl items-center gap-3 rounded-[22px] bg-[var(--background)] p-2 text-[var(--foreground)]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[15px] bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Search className="h-4 w-4" />
                </div>
                <input
                  aria-label="Explore search"
                  placeholder="게임, 음악, 스포츠, 밈..."
                  className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-[var(--muted)]"
                />
                <button className="rounded-[15px] bg-[var(--foreground)] px-4 py-2.5 text-xs font-black text-[var(--background)]">
                  검색
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {["게임", "음악", "스포츠", "밈", "애니", "테크"].map((tag) => (
                  <button key={tag} className="rounded-full border border-current/10 px-3 py-1.5 text-xs font-bold opacity-60 transition hover:opacity-100">
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[30px] border border-[var(--border)] bg-[var(--panel)] p-5 shadow-sm backdrop-blur-xl">
              <div className="mb-5 flex items-end justify-between gap-3">
                <div>
                  <div className="mb-1 flex items-center gap-1.5 text-[var(--accent)]">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span className="tv-kicker">Live chart</span>
                  </div>
                  <h2 className="text-xl font-black tracking-[-0.035em]">실시간 검색어</h2>
                </div>
                <span className="text-[10px] font-bold text-[var(--muted)]">방금 업데이트</span>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {trendingList.map((item, index) => (
                  <button
                    key={item}
                    className="group flex items-center gap-3 rounded-[20px] border border-[var(--border)] bg-[var(--panel-soft)] p-3 text-left transition hover:-translate-y-0.5 hover:bg-[var(--panel)]"
                  >
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] text-xs font-black ${
                      index < 3 ? "bg-[var(--foreground)] text-[var(--background)]" : "bg-[var(--hover)] text-[var(--muted)]"
                    }`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-extrabold">{item}</span>
                      <span className="mt-0.5 block text-[10px] font-bold text-[var(--accent)]">{index < 3 ? "급상승" : "탐색 중"}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-[var(--border)] bg-[var(--panel)] p-5 shadow-sm backdrop-blur-xl">
              <div className="mb-5 flex items-end justify-between gap-3">
                <div>
                  <div className="mb-1 flex items-center gap-1.5 text-[var(--accent)]">
                    <Users className="h-3.5 w-3.5" />
                    <span className="tv-kicker">Rising creators</span>
                  </div>
                  <h2 className="text-xl font-black tracking-[-0.035em]">성장 중인 채널</h2>
                </div>
              </div>

              <div className="space-y-2">
                {creators.map((creator) => (
                  <div key={creator.id} className="group flex items-center gap-3 rounded-[20px] p-2.5 transition hover:bg-[var(--hover)]">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-gradient-to-br ${creator.accent} text-xs font-black text-white shadow-sm`}>
                      {creator.name.slice(0, 1)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-extrabold">{creator.name}</p>
                      <p className="mt-0.5 text-[11px] text-[var(--muted)]">{creator.subscribers} 구독자</p>
                    </div>
                    <button className="rounded-xl border border-[var(--border)] px-3 py-1.5 text-xs font-black transition group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)]">
                      구독
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {exploreSections.map((section, index) => (
            <section key={section.title} className="space-y-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="mb-1 flex items-center gap-1.5 text-[var(--accent)]">
                    {index === 0 ? <Flame className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
                    <span className="tv-kicker">{section.kicker}</span>
                  </div>
                  <h2 className="text-xl font-black tracking-[-0.035em] sm:text-2xl">{section.title}</h2>
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
