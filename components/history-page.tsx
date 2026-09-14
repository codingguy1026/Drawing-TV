import { History, Trash2, Clock3, SearchX, PauseCircle } from "lucide-react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import MobileNavigation from "@/components/mobile-navigation";
import VideoCard from "@/components/video-card";
import { featuredVideos } from "@/lib/mock-data";

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <div className="mx-auto flex max-w-[1600px] gap-6 px-3 pb-24 pt-4 sm:px-4 lg:px-6">
        <Sidebar />

        <main className="min-w-0 flex-1 space-y-6">
          <div className="rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                  <History className="h-4 w-4" />
                </div>
                <h1 className="text-xl font-bold text-[var(--foreground)]">시청 기록</h1>
              </div>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2 text-sm font-medium text-[var(--foreground)]">
                  <PauseCircle className="h-4 w-4" />
                  기록 일시정지
                </button>
                <button className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2 text-sm font-medium text-[var(--foreground)]">
                  <Trash2 className="h-4 w-4" />
                  모두 삭제
                </button>
              </div>
            </div>
          </div>

          <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4 rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-[var(--accent)]" />
                <h2 className="text-lg font-bold text-[var(--foreground)]">최근 시청</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {featuredVideos.map((video) => (
                  <div key={video.id} className="group rounded-2xl border border-[var(--border)] bg-[var(--panel-strong)] p-2">
                    <VideoCard video={video} />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
              <div className="flex items-center gap-2">
                <SearchX className="h-4 w-4 text-[var(--accent)]" />
                <h2 className="text-lg font-bold text-[var(--foreground)]">검색 기록</h2>
              </div>
              <div className="space-y-2">
                {['학생 게임 리뷰', '야구 하이라이트', '코딩 루틴', '스포츠 밈'].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2.5 text-sm text-[var(--foreground)]">
                    <span>{item}</span>
                    <button className="text-[var(--muted)] hover:text-[var(--foreground)]">삭제</button>
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
