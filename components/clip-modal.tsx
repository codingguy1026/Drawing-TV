"use client";

import { Play, RotateCcw, Scissors, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { PlaybackVideo } from "@/components/playback-provider";
import { usePlayback } from "@/components/playback-provider";
import { saveClip, type ClipRecord } from "@/lib/clips";
import { clamp, formatTimestamp } from "@/lib/time";

const MIN_CLIP_SECONDS = 5;
const MAX_CLIP_SECONDS = 60;

type ClipModalProps = {
  open: boolean;
  onClose: () => void;
  video: PlaybackVideo;
};

export default function ClipModal({ open, onClose, video }: ClipModalProps) {
  const router = useRouter();
  const { currentTime, isPlaying, play, pause, seek } = usePlayback();
  const [title, setTitle] = useState(`${video.title} 클립`);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(Math.min(20, video.duration));

  const resetSelection = () => {
    const desiredStart = clamp(currentTime - 5, 0, Math.max(0, video.duration - MIN_CLIP_SECONDS));
    let desiredEnd = Math.min(video.duration, desiredStart + 20);
    let adjustedStart = desiredStart;

    if (desiredEnd - adjustedStart < MIN_CLIP_SECONDS) {
      adjustedStart = Math.max(0, desiredEnd - MIN_CLIP_SECONDS);
    }
    if (desiredEnd - adjustedStart > MAX_CLIP_SECONDS) {
      desiredEnd = adjustedStart + MAX_CLIP_SECONDS;
    }

    setStartTime(adjustedStart);
    setEndTime(desiredEnd);
  };

  useEffect(() => {
    if (!open) return;
    setTitle(`${video.title} 클립`);
    resetSelection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, video.id]);

  useEffect(() => {
    if (!open || !isPlaying) return;
    if (currentTime >= endTime) {
      pause();
      seek(startTime);
    }
  }, [currentTime, endTime, isPlaying, open, pause, seek, startTime]);

  if (!open) return null;

  const selectedDuration = endTime - startTime;
  const isValid = selectedDuration >= MIN_CLIP_SECONDS && selectedDuration <= MAX_CLIP_SECONDS;

  const updateStart = (nextValue: number) => {
    let nextStart = clamp(nextValue, 0, Math.max(0, endTime - MIN_CLIP_SECONDS));
    let nextEnd = endTime;
    if (nextEnd - nextStart > MAX_CLIP_SECONDS) nextEnd = nextStart + MAX_CLIP_SECONDS;
    setStartTime(nextStart);
    setEndTime(Math.min(nextEnd, video.duration));
  };

  const updateEnd = (nextValue: number) => {
    let nextEnd = clamp(nextValue, startTime + MIN_CLIP_SECONDS, video.duration);
    if (nextEnd - startTime > MAX_CLIP_SECONDS) nextEnd = startTime + MAX_CLIP_SECONDS;
    setEndTime(nextEnd);
  };

  const preview = () => {
    seek(startTime);
    play();
  };

  const createClip = () => {
    if (!isValid || !title.trim()) return;

    pause();
    const clip: ClipRecord = {
      id: `clip-${Date.now().toString(36)}`,
      videoId: video.id,
      title: title.trim(),
      originalTitle: video.title,
      creator: video.creator,
      accent: video.accent,
      startTime,
      endTime,
      createdAt: new Date().toISOString(),
      viewCount: 0,
    };

    saveClip(clip);
    onClose();
    router.push(`/clip/${clip.id}`);
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label="클립 만들기">
      <div className="w-full max-w-2xl rounded-t-[28px] border border-[var(--border)] bg-[var(--panel-strong)] shadow-2xl sm:rounded-[28px]">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-4 sm:px-5">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
              <Scissors className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-bold text-[var(--foreground)]">클립 만들기</h2>
              <p className="text-xs text-[var(--muted)]">5초에서 60초 사이로 골라보세요.</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]" aria-label="클립 창 닫기">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 p-4 sm:p-5">
          <div className="relative aspect-video overflow-hidden rounded-2xl" style={{ backgroundImage: video.accent }}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white">
              <button type="button" onClick={preview} className="flex h-12 w-12 items-center justify-center rounded-full bg-black/35 backdrop-blur-sm" aria-label="선택 구간 미리보기">
                <Play className="ml-0.5 h-5 w-5 fill-current" />
              </button>
              <span className="rounded-full bg-black/35 px-3 py-1 text-xs tabular-nums backdrop-blur-sm">
                {formatTimestamp(startTime)} → {formatTimestamp(endTime)}
              </span>
            </div>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[var(--foreground)]">클립 제목</span>
            <input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={80} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30" />
          </label>

          <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-[var(--foreground)]">선택 구간</span>
              <span className={`font-semibold tabular-nums ${isValid ? "text-[var(--accent)]" : "text-red-500"}`}>{Math.round(selectedDuration)}초</span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-2 text-xs text-[var(--muted)]">
                <span>시작 {formatTimestamp(startTime)}</span>
                <input type="range" min={0} max={Math.max(video.duration - MIN_CLIP_SECONDS, 0)} step={1} value={startTime} onChange={(event) => updateStart(Number(event.target.value))} className="w-full cursor-pointer accent-[var(--accent)]" />
              </label>
              <label className="space-y-2 text-xs text-[var(--muted)]">
                <span>끝 {formatTimestamp(endTime)}</span>
                <input type="range" min={Math.min(startTime + MIN_CLIP_SECONDS, video.duration)} max={video.duration} step={1} value={endTime} onChange={(event) => updateEnd(Number(event.target.value))} className="w-full cursor-pointer accent-[var(--accent)]" />
              </label>
            </div>

            {!isValid && <p className="text-xs text-red-500">클립은 5초 이상, 최대 60초까지 만들 수 있어요.</p>}

            <button type="button" onClick={resetSelection} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-[var(--muted)] transition hover:bg-[var(--hover)] hover:text-[var(--foreground)]">
              <RotateCcw className="h-3.5 w-3.5" />
              현재 재생 위치 기준으로 다시 선택
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-[var(--border)] p-4 sm:p-5">
          <button type="button" onClick={onClose} className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--foreground)]">취소</button>
          <button type="button" onClick={createClip} disabled={!isValid || !title.trim()} className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">클립 만들기</button>
        </div>
      </div>
    </div>
  );
}
