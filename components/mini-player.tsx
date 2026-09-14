"use client";

import { Maximize2, Pause, Play, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePlayback } from "@/components/playback-provider";
import { formatTimestamp } from "@/lib/time";

export default function MiniPlayer() {
  const router = useRouter();
  const {
    currentVideo,
    currentTime,
    duration,
    isPlaying,
    miniPlayerVisible,
    togglePlay,
    closeMiniPlayer,
    returnToMainPlayer,
  } = usePlayback();

  if (!currentVideo || !miniPlayerVisible) return null;

  const returnToVideo = () => {
    returnToMainPlayer();
    router.push(`/watch/${currentVideo.id}?t=${Math.floor(currentTime)}`);
  };

  return (
    <aside
      className="fixed bottom-20 left-3 right-3 z-[70] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--panel-strong)] shadow-2xl md:left-auto md:right-5 md:w-[370px] lg:bottom-5"
      aria-label="미니 플레이어"
    >
      <div className="flex min-w-0 items-stretch">
        <button
          type="button"
          onClick={returnToVideo}
          className="relative h-24 w-36 shrink-0 overflow-hidden text-left"
          style={{ backgroundImage: currentVideo.accent }}
          aria-label="영상으로 돌아가기"
        >
          <div className="absolute inset-0 bg-black/15" />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <Maximize2 className="h-5 w-5 drop-shadow" />
          </div>
        </button>

        <div className="min-w-0 flex-1 p-3">
          <button type="button" onClick={returnToVideo} className="block w-full text-left">
            <p className="truncate text-sm font-semibold text-[var(--foreground)]">{currentVideo.title}</p>
            <p className="mt-0.5 truncate text-xs text-[var(--muted)]">{currentVideo.creator}</p>
          </button>
          <p className="mt-2 text-[11px] tabular-nums text-[var(--muted)]">
            {formatTimestamp(currentTime)} / {formatTimestamp(duration)}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1 pr-2">
          <button
            type="button"
            onClick={togglePlay}
            className="rounded-full p-2 text-[var(--foreground)] transition hover:bg-[var(--hover)]"
            aria-label={isPlaying ? "일시정지" : "재생"}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
          <button
            type="button"
            onClick={closeMiniPlayer}
            className="rounded-full p-2 text-[var(--muted)] transition hover:bg-[var(--hover)] hover:text-[var(--foreground)]"
            aria-label="미니 플레이어 닫기"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="h-1 bg-[var(--border)]">
        <div
          className="h-full bg-[var(--accent)] transition-[width] duration-200"
          style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
        />
      </div>
    </aside>
  );
}
