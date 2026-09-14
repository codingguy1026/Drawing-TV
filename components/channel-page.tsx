import { Bell, Bookmark, Play, Sparkles, Video, Users } from "lucide-react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import MobileNavigation from "@/components/mobile-navigation";
import VideoCard from "@/components/video-card";
import { featuredVideos } from "@/lib/mock-data";

const tabs = ["홈", "동영상", "Shorts", "라이브", "재생목록", "커뮤니티", "정보"];

export default function ChannelPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <div className="mx-auto flex max-w-[1600px] gap-6 px-3 pb-24 pt-4 sm:px-4 lg:px-6">
        <Sidebar />

        <main className="min-w-0 flex-1 space-y-6">
          <section className="overflow-hidden rounded-[30px] border border-[var(--border)] bg-[var(--panel)] shadow-sm">
            <div className="h-36 bg-[linear-gradient(135deg,#f59e0b,#ef4444,#7c3aed)] sm:h-44" />
            <div className="p-4 sm:p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-[var(--panel)] bg-gradient-to-br from-amber-400 to-orange-500 text-2xl font-bold text-white shadow-sm">
                    L
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-[var(--foreground)]">스튜디오 루미</h1>
                    <p className="text-sm text-[var(--muted)]">@lumi-studio</p>
                    <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">학생 개발자와 디자이너가 만드는 게임, 프로덕트, 그리고 개발 일기.</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2 text-sm font-medium text-[var(--foreground)]">
                    12.4만 구독자
                  </div>
                  <button className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white">구독</button>
                </div>
              </div>
            </div>
          </section>

          <nav className="rounded-[20px] border border-[var(--border)] bg-[var(--panel)] p-2 shadow-sm">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab, index) => (
                <button
                  key={tab}
                  className={`rounded-full px-3 py-2 text-sm font-medium ${
                    index === 0 ? "bg-[var(--accent-soft)] text-[var(--foreground)]" : "text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </nav>

          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                <Video className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-bold text-[var(--foreground)]">최근 업로드</h2>
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
