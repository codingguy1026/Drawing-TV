import { BellRing, Clock3, PlaySquare, Sparkles, Users } from "lucide-react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import MobileNavigation from "@/components/mobile-navigation";
import VideoCard from "@/components/video-card";
import { featuredVideos } from "@/lib/mock-data";

const creatorList = [
  { name: "스튜디오 루미", live: true },
  { name: "비트버킷", live: false },
  { name: "야구감성", live: true },
  { name: "핏플래닛", live: false },
];

export default function SubscriptionsPage() {
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
                  <PlaySquare className="h-4 w-4" />
                </div>
                <h1 className="text-xl font-bold text-[var(--foreground)]">구독</h1>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <Clock3 className="h-4 w-4" />
                최근 업로드
              </div>
            </div>
          </div>

          <section className="rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
            <div className="mb-4 flex items-center gap-2">
              <Users className="h-4 w-4 text-[var(--accent)]" />
              <h2 className="text-lg font-bold text-[var(--foreground)]">구독한 채널</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {creatorList.map((creator) => (
                <button
                  key={creator.name}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2 text-sm font-medium text-[var(--foreground)]"
                >
                  <span>{creator.name}</span>
                  {creator.live && (
                    <span className="rounded-full bg-red-500/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-red-500">
                      LIVE
                    </span>
                  )}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                  <BellRing className="h-4 w-4" />
                </div>
                <h2 className="text-lg font-bold text-[var(--foreground)]">최근 업로드</h2>
              </div>
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
