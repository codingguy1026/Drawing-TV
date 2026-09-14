import { Bell, Search, SlidersHorizontal, X } from "lucide-react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import MobileNavigation from "@/components/mobile-navigation";
import VideoCard from "@/components/video-card";
import { featuredVideos } from "@/lib/mock-data";

const recentSearches = ["학생 게임 리뷰", "야구 하이라이트", "모든 개편", "음악 추천"];

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <div className="mx-auto flex max-w-[1600px] gap-6 px-3 pb-24 pt-4 sm:px-4 lg:px-6">
        <Sidebar />

        <main className="min-w-0 flex-1 space-y-6">
          <div className="rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
            <div className="flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-3">
              <Search className="h-4 w-4 text-[var(--muted)]" />
              <input
                aria-label="Search content"
                defaultValue="학생 게임 프로젝트"
                className="w-full bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none"
              />
              <button className="rounded-full border border-[var(--border)] p-2 text-[var(--muted)] hover:text-[var(--foreground)]" aria-label="Clear search">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {['전체', '동영상', 'Shorts', '채널', '재생목록'].map((filter, index) => (
                <button
                  key={filter}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                    index === 0
                      ? 'bg-[var(--accent)] text-white'
                      : 'border border-[var(--border)] bg-[var(--panel-strong)] text-[var(--muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {filter}
                </button>
              ))}
              <button className="ml-auto inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-1.5 text-sm text-[var(--foreground)]">
                <SlidersHorizontal className="h-4 w-4" />
                필터
              </button>
            </div>
          </div>

          <section className="rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
            <h2 className="mb-3 text-lg font-bold text-[var(--foreground)]">최근 검색어</h2>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((item) => (
                <button key={item} className="rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
                  {item}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[var(--foreground)]">결과</h2>
              <span className="text-sm text-[var(--muted)]">약 204개</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {featuredVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
}
