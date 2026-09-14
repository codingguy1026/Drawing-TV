"use client";

import Link from "next/link";
import { Bookmark, Check, MoreHorizontal, Scissors, Share2, Sparkles, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { watchDetail, recommendedVideos, comments } from "@/lib/mock-data";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import MobileNavigation from "@/components/mobile-navigation";
import VideoPlayer from "@/components/video-player";
import CommentSection from "@/components/comment-section";
import ClipModal from "@/components/clip-modal";
import { usePlayback, type PlaybackVideo } from "@/components/playback-provider";
import { timestampToSeconds } from "@/lib/time";

export default function WatchPage({ videoId }: { videoId: string }) {
  const video = { ...watchDetail, id: videoId };
  const [clipOpen, setClipOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { currentTime } = usePlayback();

  const playbackVideo: PlaybackVideo = {
    id: video.id,
    title: video.title,
    creator: video.creator,
    accent: video.accent,
    duration: timestampToSeconds(video.duration) ?? 0,
  };

  const shareFromCurrentTime = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set("t", String(Math.floor(currentTime)));

    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <div className="mx-auto flex max-w-[1600px] gap-6 px-3 pb-24 pt-4 sm:px-4 lg:px-6">
        <Sidebar />

        <div className="min-w-0 flex-1">
          <div className="grid gap-6 xl:grid-cols-[1.7fr_0.9fr]">
            <main className="space-y-6">
              <VideoPlayer
                id={video.id}
                title={video.title}
                accent={video.accent}
                creator={video.creator}
                durationLabel={video.duration}
              />

              <section className="rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${video.avatarColor} text-sm font-bold text-white`}>
                      {video.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-semibold text-[var(--foreground)]">{video.creator}</h2>
                        <span className="rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
                          인증
                        </span>
                      </div>
                      <p className="text-xs text-[var(--muted)]">{video.subscribers} 구독자</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button type="button" className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white">구독</button>
                    <button type="button" className="rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2 text-sm font-medium text-[var(--foreground)]">알림</button>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <button type="button" className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--hover)]">
                    <ThumbsUp className="h-4 w-4" /> 좋아요
                  </button>
                  <button type="button" onClick={shareFromCurrentTime} className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--hover)]">
                    {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Share2 className="h-4 w-4" />}
                    {copied ? "링크 복사됨" : "현재 시간 공유"}
                  </button>
                  <button type="button" onClick={() => setClipOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--accent)]/40 hover:bg-[var(--accent-soft)]">
                    <Scissors className="h-4 w-4 text-[var(--accent)]" /> 클립
                  </button>
                  <button type="button" className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--hover)]">
                    <Bookmark className="h-4 w-4" /> 저장
                  </button>
                  <button type="button" className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--hover)]">
                    <MoreHorizontal className="h-4 w-4" /> 더보기
                  </button>
                </div>
              </section>

              <section className="rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
                <div className="space-y-3 text-sm leading-6 text-[var(--foreground)]">
                  <p className="text-[var(--muted)]">
                    이번 영상은 학생이 직접 만든 게임 프로젝트의 핵심 기능을 공개하는 과정입니다.
                    현실적인 개발 흐름, 퀄리티가 올라가는 포인트, 그리고 제작 중 느낀 점까지 담았습니다.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {["#게임개발", "#학생개발자", "#프로젝트", "#디자인", "#개발일기"].map((tag) => (
                      <span key={tag} className="rounded-full bg-[var(--accent-soft)] px-2 py-1 font-medium text-[var(--accent)]">{tag}</span>
                    ))}
                  </div>
                </div>
              </section>

              <CommentSection comments={comments} />
            </main>

            <aside className="space-y-4">
              <div className="rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--foreground)]">추천 영상</h3>
                  </div>
                  <Link href="/explore" className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]">더보기</Link>
                </div>
                <div className="space-y-3">
                  {recommendedVideos.map((item) => (
                    <Link key={item.id} href={`/watch/${item.id}`} className="flex gap-3 rounded-2xl border border-[var(--border)] bg-[var(--panel-strong)] p-2 transition hover:bg-[var(--hover)]">
                      <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-xl" style={{ backgroundImage: item.accent }}>
                        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,23,42,0.7),transparent_35%)]" />
                        <span className="absolute bottom-2 right-2 rounded bg-black/50 px-1.5 py-0.5 text-[9px] font-medium text-white">{item.duration}</span>
                      </div>
                      <div className="min-w-0 flex-1 py-1">
                        <h4 className="line-clamp-2 text-sm font-semibold text-[var(--foreground)]">{item.title}</h4>
                        <p className="mt-1 text-xs text-[var(--muted)]">{item.creator}</p>
                        <div className="mt-1 flex items-center gap-2 text-[11px] text-[var(--muted)]">
                          <span>{item.views}</span><span>•</span><span>{item.published}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <MobileNavigation />
      <ClipModal open={clipOpen} onClose={() => setClipOpen(false)} video={playbackVideo} />
    </div>
  );
}
