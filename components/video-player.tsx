"use client";

import { Captions, Fullscreen, Gauge, Pause, Play, Settings2, Volume2, VolumeX } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { usePlayback } from "@/components/playback-provider";
import { formatTimestamp, timestampToSeconds } from "@/lib/time";

type VideoPlayerProps = {
  id: string;
  title: string;
  accent: string;
  creator: string;
  durationLabel?: string;
};

export default function VideoPlayer({ id, title, accent, creator, durationLabel = "12:48" }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    currentVideo,
    currentTime,
    duration,
    isPlaying,
    isMuted,
    playbackRate,
    loadVideo,
    play,
    pause,
    togglePlay,
    seek,
    toggleMuted,
    setPlaybackRate,
  } = usePlayback();

  const durationSeconds = useMemo(() => timestampToSeconds(durationLabel) ?? 0, [durationLabel]);

  useEffect(() => {
    const startParam = new URLSearchParams(window.location.search).get("t");
    const parsed = startParam ? timestampToSeconds(startParam) : null;
    const startAt = parsed === null ? undefined : Math.min(parsed, durationSeconds);
    loadVideo({ id, title, creator, accent, duration: durationSeconds }, startAt);
  }, [accent, creator, durationSeconds, id, loadVideo, title]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, [contenteditable='true']")) return;

      if (event.code === "Space") {
        event.preventDefault();
        togglePlay();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        seek(currentTime - 5);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        seek(currentTime + 5);
      } else if (event.key.toLowerCase() === "m") {
        toggleMuted();
      } else if (event.key.toLowerCase() === "f") {
        void containerRef.current?.requestFullscreen?.();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentTime, seek, toggleMuted, togglePlay]);

  const active = currentVideo?.id === id;
  const shownTime = active ? currentTime : 0;
  const shownDuration = active ? duration : durationSeconds;
  const progress = shownDuration > 0 ? (shownTime / shownDuration) * 100 : 0;

  const cyclePlaybackRate = () => {
    const rates = [1, 1.25, 1.5, 2];
    const index = rates.indexOf(playbackRate);
    setPlaybackRate(rates[(index + 1) % rates.length]);
  };

  return (
    <div
      ref={containerRef}
      data-video-player
      className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--panel)] shadow-sm"
    >
      <div className="relative aspect-video overflow-hidden" style={{ backgroundImage: accent }}>
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,23,42,0.72),transparent_30%,rgba(15,23,42,0.04))]" />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 text-white/90">
          <span className="rounded-full border border-white/20 bg-black/25 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur-sm">
            {creator}
          </span>
          <span className="rounded-full border border-white/15 bg-black/25 px-2 py-1 text-[10px] font-semibold tracking-[0.08em] backdrop-blur-sm">
            HD
          </span>
        </div>

        <button
          type="button"
          onClick={isPlaying ? pause : play}
          className="absolute inset-0 m-auto flex h-18 w-18 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white shadow-lg backdrop-blur-sm transition hover:scale-105"
          aria-label={isPlaying ? "일시정지" : "재생"}
        >
          {isPlaying ? <Pause className="h-8 w-8 fill-current" /> : <Play className="ml-1 h-8 w-8 fill-current" />}
        </button>

        <div className="absolute inset-x-0 bottom-0 p-4">
          <input
            aria-label="재생 위치"
            type="range"
            min={0}
            max={Math.max(shownDuration, 1)}
            step={1}
            value={Math.min(shownTime, Math.max(shownDuration, 1))}
            onChange={(event) => seek(Number(event.target.value))}
            className="mb-3 h-1.5 w-full cursor-pointer accent-[var(--accent)]"
          />

          <div className="flex items-center justify-between text-[11px] text-white/90">
            <div className="flex items-center gap-3">
              <button type="button" onClick={togglePlay} className="rounded-full bg-black/20 p-1.5 backdrop-blur-sm" aria-label={isPlaying ? "일시정지" : "재생"}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <button type="button" onClick={toggleMuted} className="rounded-full bg-black/20 p-1.5 backdrop-blur-sm" aria-label={isMuted ? "음소거 해제" : "음소거"}>
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <span className="tabular-nums">{formatTimestamp(shownTime)} / {formatTimestamp(shownDuration)}</span>
            </div>

            <div className="flex items-center gap-2">
              <button type="button" onClick={cyclePlaybackRate} className="inline-flex items-center gap-1 rounded-full bg-black/20 px-2 py-1.5 backdrop-blur-sm" aria-label="재생 속도">
                <Gauge className="h-4 w-4" />
                <span>{playbackRate}x</span>
              </button>
              <button type="button" className="rounded-full bg-black/20 p-1.5 backdrop-blur-sm" aria-label="자막">
                <Captions className="h-4 w-4" />
              </button>
              <button type="button" className="rounded-full bg-black/20 p-1.5 backdrop-blur-sm" aria-label="설정">
                <Settings2 className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => void containerRef.current?.requestFullscreen?.()} className="rounded-full bg-black/20 p-1.5 backdrop-blur-sm" aria-label="전체 화면">
                <Fullscreen className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-[58px] h-1 bg-white/10">
          <div className="h-full bg-[var(--accent)]" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="border-t border-[var(--border)] bg-[var(--panel-strong)] px-4 py-4">
        <h1 className="text-xl font-bold tracking-tight text-[var(--foreground)] sm:text-2xl">{title}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
          <span>42만 조회</span>
          <span>•</span>
          <span>3일 전</span>
          <span>•</span>
          <span>{durationLabel}</span>
        </div>
      </div>
    </div>
  );
}
