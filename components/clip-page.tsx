"use client";

import Link from "next/link";
import { ArrowUpRight, Copy, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Header from "@/components/header";
import { getClip, type ClipRecord } from "@/lib/clips";
import { formatTimestamp } from "@/lib/time";

export default function ClipPage({ clipId }: { clipId: string }) {
  const [clip, setClip] = useState<ClipRecord | null>(null);
  const [missing, setMissing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [copied, setCopied] = useState(false);
  const lastTick = useRef(Date.now());

  useEffect(() => {
    const stored = getClip(clipId);
    if (!stored) {
      setMissing(true);
      return;
    }
    setClip(stored);
    setCurrentTime(stored.startTime);
  }, [clipId]);

  useEffect(() => {
    if (!clip || !isPlaying) return;
    lastTick.current = Date.now();
    const timer = window.setInterval(() => {
      const now = Date.now();
      const delta = (now - lastTick.current) / 1000;
      lastTick.current = now;
      setCurrentTime((time) => Math.min(clip.endTime, time + delta));
    }, 250);
    return () => window.clearInterval(timer);
  }, [clip, isPlaying]);

  useEffect(() => {
    if (clip && currentTime >= clip.endTime && isPlaying) setIsPlaying(false);
  }, [clip, currentTime, isPlaying]);

  const togglePlay = () => {
    if (!clip) return;
    if (!isPlaying && currentTime >= clip.endTime) setCurrentTime(clip.startTime);
    lastTick.current = Date.now();
    setIsPlaying((playing) => !playing);
  };

  const shareClip = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  if (missing) {
    return (
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <Header />
        <main className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">클립을 찾을 수 없어요.</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">이 데모 클립은 현재 브라우저에만 저장돼요.</p>
          <Link href="/" className="mt-6 inline-flex rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white">홈으로</Link>
        </main>
      </div>
    );
  }

  if (!clip) return null;

  const clipDuration = clip.endTime - clip.startTime;
  const elapsed = Math.max(0, currentTime - clip.startTime);
  const progress = clipDuration > 0 ? (elapsed / clipDuration) * 100 : 0;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main className="mx-auto max-w-5xl space-y-5 px-3 pb-24 pt-5 sm:px-5">
        <section className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--panel)] shadow-sm">
          <div className="relative aspect-video overflow-hidden" style={{ backgroundImage: clip.accent }}>
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,23,42,0.68),transparent_45%)]" />
            <button type="button" onClick={togglePlay} className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-sm" aria-label={isPlaying ? "일시정지" : "재생"}>
              {isPlaying ? <Pause className="h-7 w-7 fill-current" /> : <Play className="ml-1 h-7 w-7 fill-current" />}
            </button>
            <div className="absolute inset-x-4 bottom-4">
              <div className="h-1.5 overflow-hidden rounded-full bg-white/20">
                <div className="h-full bg-[var(--accent)]" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-xs text-white/90">
                <span>{formatTimestamp(currentTime)}</span>
                <span>{formatTimestamp(clip.endTime)}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Drawing TV Clip</p>
              <h1 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">{clip.title}</h1>
              <p className="mt-2 text-sm text-[var(--muted)]">{clip.creator} · {Math.round(clipDuration)}초 클립</p>
            </div>
            <button type="button" onClick={shareClip} className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-4 py-2 text-sm font-semibold">
              {copied ? <Copy className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
              {copied ? "복사됨" : "공유"}
            </button>
          </div>

          <div className="mt-5 flex flex-col gap-3 rounded-2xl bg-[var(--panel-strong)] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-[var(--muted)]">원본 영상</p>
              <p className="mt-1 font-semibold text-[var(--foreground)]">{clip.originalTitle}</p>
            </div>
            <Link href={`/watch/${clip.videoId}?t=${Math.floor(clip.startTime)}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white">
              원본 영상 보기
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
