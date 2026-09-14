import { ListVideo, Plus, Sparkles, Trash2 } from "lucide-react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import MobileNavigation from "@/components/mobile-navigation";
import VideoCard from "@/components/video-card";
import { featuredVideos } from "@/lib/mock-data";

export default function PlaylistPage() {
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
                  <ListVideo className="h-4 w-4" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[var(--foreground)]">나중에 볼 영상</h1>
                  <p className="text-sm text-[var(--muted)]">8개 영상</p>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2 text-sm font-medium text-[var(--foreground)]">
                <Plus className="h-4 w-4" />
                새 재생목록
              </button>
            </div>
          </div>

          <section className="space-y-4 rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h2 className="text-lg font-bold text-[var(--foreground)]">플레이리스트 내용</h2>
              </div>
              <button className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]">
                <Trash2 className="h-4 w-4" />
                항목 삭제
              </button>
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
