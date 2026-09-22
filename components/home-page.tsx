import Link from "next/link";
import { ArrowRight, Clock3, Flame, Play, Radio, TrendingUp, Users } from "lucide-react";
import { continueWatching, creators, featuredVideos, trendingList } from "@/lib/mock-data";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import MobileNavigation from "@/components/mobile-navigation";
import CategoryRail from "@/components/category-rail";
import VideoCard from "@/components/video-card";
import ShortsPreview from "@/components/shorts-preview";

function SectionHeading({
  title,
  icon: Icon,
  href,
}: {
  title: string;
  icon: typeof TrendingUp;
  href?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
          <Icon className="h-4 w-4" />
        </div>
        <h2 className="text-xl font-black tracking-[-0.03em] text-[var(--foreground)]">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="flex items-center gap-1 text-xs font-bold text-[var(--muted)] transition hover:text-[var(--foreground)]">
          더보기 <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}

export default function HomePage() {
  const hero = featuredVideos[0];
  const upNext = featuredVideos.slice(1, 4);

  return (
    <div className="min-h-screen text-[var(--foreground)]">
      <Header />

      <div className="mx-auto flex max-w-[1640px] gap-6 px-3 pb-28 pt-5 sm:px-5 lg:px-6">
        <Sidebar />

        <main className="min-w-0 flex-1 space-y-7">
          <section className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--panel)] shadow-sm">
            <div className="grid lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.55fr)]">
              <div
                className="relative flex min-h-[330px] items-end overflow-hidden p-5 sm:p-7 lg:min-h-[360px]"
                style={{ backgroundImage: hero.accent }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,12,0.84)_0%,rgba(5,7,12,0.5)_55%,rgba(5,7,12,0.12)_100%)]" />

                <div className="relative z-10 max-w-xl text-white">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-black">추천</span>
                    <span className="text-xs font-bold text-white/70">{hero.category}</span>
                  </div>

                  <h1 className="text-3xl font-black leading-[1.05] tracking-[-0.045em] sm:text-4xl lg:text-5xl">
                    {hero.title}
                  </h1>
                  <p className="mt-3 max-w-lg text-sm font-medium leading-6 text-white/70">
                    오늘 Drawing TV에서 먼저 볼 만한 영상.
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-2.5">
                    <Link
                      href={`/watch/${hero.id}`}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-black text-black shadow-lg transition hover:-translate-y-0.5"
                    >
                      <Play className="h-4 w-4 fill-current" />
                      재생
                    </Link>
                    <span className="text-xs font-semibold text-white/65">{hero.creator} · {hero.views} 조회</span>
                  </div>
                </div>
              </div>

              <aside className="border-t border-[var(--border)] bg-[var(--panel)] p-4 lg:border-l lg:border-t-0">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[var(--accent)]">Up next</p>
                    <h2 className="mt-0.5 text-base font-black">다음 추천</h2>
                  </div>
                  <span className="rounded-full bg-[var(--hover)] px-2 py-1 text-[10px] font-bold text-[var(--muted)]">자동</span>
                </div>

                <div className="space-y-1.5">
                  {upNext.map((video) => (
                    <Link
                      href={`/watch/${video.id}`}
                      key={video.id}
                      className="group grid grid-cols-[104px_1fr] gap-3 rounded-2xl p-2 transition hover:bg-[var(--hover)]"
                    >
                      <div className="relative aspect-video overflow-hidden rounded-xl" style={{ backgroundImage: video.accent }}>
                        <span className="absolute bottom-1 right-1 rounded-md bg-black/60 px-1.5 py-0.5 text-[9px] font-bold text-white">
                          {video.duration}
                        </span>
                      </div>
                      <div className="min-w-0 py-0.5">
                        <p className="line-clamp-2 text-sm font-extrabold leading-5 tracking-[-0.01em] group-hover:text-[var(--accent)]">
                          {video.title}
                        </p>
                        <p className="mt-1 truncate text-[11px] text-[var(--muted)]">{video.creator}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link
                  href="/explore"
                  className="mt-3 flex items-center justify-center gap-1 rounded-xl border border-[var(--border)] py-2 text-xs font-bold text-[var(--muted)] transition hover:bg-[var(--hover)] hover:text-[var(--foreground)]"
                >
                  탐색에서 더 보기 <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </aside>
            </div>
          </section>

          <div className="rounded-[22px] border border-[var(--border)] bg-[var(--panel)] p-2.5 shadow-sm">
            <CategoryRail />
          </div>

          <section className="space-y-4">
            <SectionHeading title="지금 뜨는 영상" icon={TrendingUp} href="/explore" />
            <div className="grid gap-x-4 gap-y-7 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {featuredVideos.slice(1).map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <SectionHeading title="계속 시청하기" icon={Clock3} />
            <div className="grid gap-x-4 gap-y-7 md:grid-cols-2">
              {continueWatching.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>

          <ShortsPreview />

          <section className="space-y-4">
            <SectionHeading title="새로운 크리에이터" icon={Users} />
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {creators.map((creator) => (
                <article
                  key={creator.id}
                  className="group rounded-[22px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[var(--shadow)]"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${creator.accent} text-xs font-black text-white`}>
                      {creator.name.slice(0, 1)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-black">{creator.name}</h3>
                      <p className="mt-0.5 text-xs text-[var(--muted)]">{creator.handle}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-[var(--border)] pt-3">
                    <span className="text-xs font-semibold text-[var(--muted)]">구독자 {creator.subscribers}</span>
                    <button className="rounded-full bg-[var(--accent)] px-3 py-1.5 text-xs font-black text-white transition hover:opacity-90">
                      구독
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[26px] border border-[var(--border)] bg-[var(--panel)] p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Flame className="h-4 w-4" />
                </div>
                <h2 className="text-lg font-black tracking-[-0.02em]">추천 키워드</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingList.map((tag) => (
                  <button
                    key={tag}
                    className="rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2 text-sm font-semibold text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--foreground)]"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[26px] border border-[var(--border)] bg-[var(--panel)] p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                    <Radio className="h-4 w-4" />
                  </div>
                  <h2 className="text-lg font-black tracking-[-0.02em]">지금 라이브</h2>
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.12em] text-red-500">Live</span>
              </div>
              <div className="space-y-2">
                {[
                  { title: "클래시 로얄 시즌 2 정리 방송", viewers: "21.9만 시청 중" },
                  { title: "하이브리드 뮤직 라이브 스테이지", viewers: "8.7만 시청 중" },
                  { title: "학생 축구 토너먼트 상금전", viewers: "3.4만 시청 중" },
                ].map((live) => (
                  <div key={live.title} className="flex items-center justify-between rounded-xl bg-[var(--hover)] px-3 py-2.5">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">{live.title}</p>
                      <p className="mt-0.5 text-[11px] text-[var(--muted)]">{live.viewers}</p>
                    </div>
                    <span className="ml-3 h-2 w-2 shrink-0 rounded-full bg-red-500" />
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
