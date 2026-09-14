import { BookOpen, Clock3, FolderHeart, ListVideo, PlayCircle } from "lucide-react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import MobileNavigation from "@/components/mobile-navigation";
import VideoCard from "@/components/video-card";
import { featuredVideos } from "@/lib/mock-data";

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <div className="mx-auto flex max-w-[1600px] gap-6 px-3 pb-24 pt-4 sm:px-4 lg:px-6">
        <Sidebar />

        <main className="min-w-0 flex-1 space-y-6">
          <div className="rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                <BookOpen className="h-4 w-4" />
              </div>
              <h1 className="text-xl font-bold text-[var(--foreground)]">보관함</h1>
            </div>
          </div>

          <section className="grid gap-4 md:grid-cols-3">
            {[
              { label: "좋아요 표시한 영상", icon: FolderHeart },
              { label: "나중에 볼 영상", icon: Clock3 },
              { label: "재생목록", icon: ListVideo },
            ].map(({ label, icon: Icon }) => (
              <div key={label} className="rounded-[24px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="mt-4 text-base font-semibold text-[var(--foreground)]">{label}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">최근 저장된 항목을 확인해보세요.</p>
              </div>
            ))}
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <PlayCircle className="h-4 w-4 text-[var(--accent)]" />
              <h2 className="text-lg font-bold text-[var(--foreground)]">최근 저장된 영상</h2>
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
