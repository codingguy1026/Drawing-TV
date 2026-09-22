import Link from "next/link";
import { ArrowRight, Clock3, Flame, Play, Radio, Sparkles, TrendingUp, Users } from "lucide-react";
import { continueWatching, creators, featuredVideos, trendingList } from "@/lib/mock-data";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import MobileNavigation from "@/components/mobile-navigation";
import CategoryRail from "@/components/category-rail";
import VideoCard from "@/components/video-card";
import ShortsPreview from "@/components/shorts-preview";

function SectionHeading({
  eyebrow,
  title,
  icon: Icon,
  href,
}: {
  eyebrow: string;
  title: string;
  icon: typeof TrendingUp;
  href?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <div className="mb-1 flex items-center gap-1.5 text-[var(--accent)]">
          <Icon className="h-3.5 w-3.5" />
          <span className="tv-kicker">{eyebrow}</span>
        </div>
        <h2 className="text-xl font-black tracking-[-0.035em] text-[var(--foreground)] sm:text-2xl">{title}</h2>
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

      <div className="mx-auto flex max-w-[1680px] gap-7 px-3 pb-28 pt-5 sm:px-5 lg:px-7">
        <Sidebar />

        <main className="min-w-0 flex-1 space-y-8">
          <section className="relative overflow-hidden rounded-[34px] border border-[var(--border)] bg-[var(--panel)] shadow-[var(--shadow)]">
            <div className="grid min-h-[430px] lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.65fr)]">
              <div
                className="relative flex min-h-[390px] items-end overflow-hidden p-5 sm:p-8 lg:min-h-[470px] lg:p-10"
                style={{ backgroundImage: hero.accent }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.18),transparent_28%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,5,8,0.88)_0%,rgba(4,5,8,0.58)_48%,rgba(4,5,8,0.05)_100%)]" />
                <div className="tv-grid absolute inset-0 opacity-20" />

                <div className="relative z-10 max-w-2xl text-white">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-black">Drawing pick</span>
                    <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[10px] font-bold text-white/80 backdrop-blur-md">
                      {hero.category}
                    </span>
                  </div>

                  <h1 className="max-w-xl text-4xl font-black leading-[0.98] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                    {hero.title}
                  </h1>
                  <p className="mt-4 max-w-lg text-sm font-medium leading-6 text-white/68 sm:text-base">
                    오늘의 추천을 크게 틀어두고, 그 다음 장면은 네 취향이 고르게.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/watch/${hero.id}`}
                      className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-black shadow-xl transition hover:-translate-y-0.5"
                    >
                      <Play className="h-4 w-4 fill-current" />
                      지금 재생
                    </Link>
                    <Link
                      href="/explore"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/15"
                    >
                      더 둘러보기
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-white/58">
                    <span>{hero.creator}</span>
                    <span>{hero.views} 조회</span>
                    <span>{hero.duration}</span>
                  </div>
                </div>
              </div>

              <aside className="flex flex-col bg-[var(--panel)] p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="tv-kicker text-[var(--accent)]">Up next</p>
                    <h2 className="mt-1 text-lg font-black tracking-[-0.025em]">다음에 볼 장면</h2>
                  </div>
                  <span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[10px] font-bold text-[var(--muted)]">AUTO</span>
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  {upNext.map((video, index) => (
                    <Link
                      href={`/watch/${video.id}`}
                      key={video.id}
                      className="group grid grid-cols-[112px_1fr] gap-3 rounded-[22px] p-2 transition hover:bg-[var(--hover)]"
                    >
                      <div className="relative aspect-video overflow-hidden rounded-[16px]" style={{ backgroundImage: video.accent }}>
                        <div className="absolute inset-0 bg-black/10" />
                        <span className="absolute bottom-1.5 right-1.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[9px] font-bold text-white">{video.duration}</span>
                      </div>
                      <div className="min-w-0 py-0.5">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-[10px] font-black text-[var(--accent)]">0{index + 2}</span>
                          <span className="text-[10px] font-bold text-[var(--muted)]">{video.category}</span>
                        </div>
                        <p className="line-clamp-2 text-sm font-extrabold leading-5 tracking-[-0.015em] group-hover:text-[var(--accent)]">{video.title}</p>
                        <p className="mt-1 truncate text-[11px] text-[var(--muted)]">{video.creator}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-auto rounded-[22px] bg-[var(--foreground)] p-4 text-[var(--background)]">
                  <div className="flex items-center gap-2">
                    <Radio className="h-4 w-4 text-red-500" />
                    <span className="tv-kicker">Live pulse</span>
                  </div>
                  <p className="mt-2 text-sm font-black">지금 12개 채널이 생방송 중</p>
                  <p className="mt-1 text-xs opacity-60">게임 · 음악 · 스포츠 · 토크</p>
                </div>
              </aside>
            </div>
          </section>

          <div className="rounded-[24px] border border-[var(--border)] bg-[var(--panel-soft)] p-2.5 backdrop-blur-xl">
            <CategoryRail />
          </div>

          <section className="space-y-4">
            <SectionHeading eyebrow="Trending now" title="지금 뜨는 영상" icon={TrendingUp} href="/explore" />
            <div className="grid gap-x-4 gap-y-7 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {featuredVideos.slice(1).map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <SectionHeading eyebrow="Pick up where you left" title="계속 시청하기" icon={Clock3} />
            <div className="grid gap-x-4 gap-y-7 md:grid-cols-2">
              {continueWatching.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>

          <ShortsPreview />

          <section className="space-y-4">
            <SectionHeading eyebrow="Fresh voices" title="새로운 크리에이터" icon={Users} />
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {creators.map((creator, index) => (
                <article
                  key={creator.id}
                  className="group overflow-hidden rounded-[26px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[var(--shadow)]"
                >
                  <div className="mb-5 flex items-start justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br ${creator.accent} text-sm font-black text-white shadow-sm`}>
                      {creator.name.slice(0, 1)}
                    </div>
                    <span className="text-[10px] font-black text-[var(--muted)]">0{index + 1}</span>
                  </div>
                  <h3 className="truncate text-base font-black tracking-[-0.025em]">{creator.name}</h3>
                  <p className="mt-1 text-xs text-[var(--muted)]">{creator.handle}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3">
                    <span className="text-xs font-semibold text-[var(--muted)]">구독자 {creator.subscribers}</span>
                    <button className="rounded-xl bg-[var(--foreground)] px-3 py-1.5 text-xs font-black text-[var(--background)] transition group-hover:bg-[var(--accent)] group-hover:text-white">
                      구독
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="overflow-hidden rounded-[30px] border border-[var(--border)] bg-[var(--panel)] p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-1.5 text-[var(--accent)]">
                    <Flame className="h-3.5 w-3.5" />
                    <span className="tv-kicker">Search heat</span>
                  </div>
                  <h2 className="text-xl font-black tracking-[-0.035em]">오늘의 키워드</h2>
                </div>
                <Sparkles className="h-5 w-5 text-[var(--muted)]" />
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingList.map((tag, index) => (
                  <button
                    key={tag}
                    className="group rounded-2xl border border-[var(--border)] bg-[var(--panel-soft)] px-3 py-2.5 text-left text-sm font-bold text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--foreground)]"
                  >
                    <span className="mr-2 text-[10px] font-black text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</span>
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[30px] bg-[linear-gradient(135deg,#ff5b36,#7c5cff)] p-5 text-white shadow-[var(--shadow)]">
              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full border border-white/20" />
              <div className="absolute -bottom-14 right-10 h-40 w-40 rounded-full border border-white/15" />
              <div className="relative">
                <p className="tv-kicker text-white/70">Drawing studio</p>
                <h2 className="mt-2 max-w-xs text-2xl font-black leading-tight tracking-[-0.04em]">보는 사람에서 만드는 사람으로.</h2>
                <p className="mt-3 max-w-sm text-sm font-medium leading-6 text-white/72">클립, 영상, 라이브를 한 곳에서 시작해봐.</p>
                <Link href="/upload" className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-black text-black">
                  콘텐츠 만들기 <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>

      <MobileNavigation />
    </div>
  );
}
