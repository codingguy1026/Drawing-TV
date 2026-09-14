"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { clamp } from "@/lib/time";

export type PlaybackVideo = {
  id: string;
  title: string;
  creator: string;
  duration: number;
  accent: string;
};

type PlaybackContextValue = {
  currentVideo: PlaybackVideo | null;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  playbackRate: number;
  miniPlayerVisible: boolean;
  loadVideo: (video: PlaybackVideo, startAt?: number) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  seek: (seconds: number) => void;
  toggleMuted: () => void;
  setVolume: (volume: number) => void;
  setPlaybackRate: (rate: number) => void;
  closeMiniPlayer: () => void;
  returnToMainPlayer: () => void;
};

const PlaybackContext = createContext<PlaybackContextValue | null>(null);

export default function PlaybackProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  const currentVideoId = useRef<string | null>(null);
  const lastTick = useRef(Date.now());
  const [currentVideo, setCurrentVideo] = useState<PlaybackVideo | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(1);
  const [playbackRate, setPlaybackRateState] = useState(1);
  const [miniPlayerVisible, setMiniPlayerVisible] = useState(false);
  const [miniPlayerDismissed, setMiniPlayerDismissed] = useState(false);

  const loadVideo = useCallback((video: PlaybackVideo, startAt?: number) => {
    const isSameVideo = currentVideoId.current === video.id;
    currentVideoId.current = video.id;
    setCurrentVideo(video);

    if (!isSameVideo) {
      setCurrentTime(clamp(startAt ?? 0, 0, video.duration));
      setIsPlaying(false);
    } else if (startAt !== undefined) {
      setCurrentTime(clamp(startAt, 0, video.duration));
    }

    setDuration(video.duration);
    setMiniPlayerVisible(false);
    setMiniPlayerDismissed(false);
  }, []);

  const play = useCallback(() => {
    if (!currentVideo || duration <= 0) return;
    if (currentTime >= duration) setCurrentTime(0);
    lastTick.current = Date.now();
    setIsPlaying(true);
  }, [currentTime, currentVideo, duration]);

  const pause = useCallback(() => setIsPlaying(false), []);
  const togglePlay = useCallback(() => {
    if (!currentVideo || duration <= 0) return;
    setIsPlaying((playing) => {
      if (!playing) lastTick.current = Date.now();
      return !playing;
    });
  }, [currentVideo, duration]);

  const seek = useCallback((seconds: number) => {
    setCurrentTime(clamp(seconds, 0, duration));
    lastTick.current = Date.now();
  }, [duration]);

  const toggleMuted = useCallback(() => setIsMuted((muted) => !muted), []);
  const setVolume = useCallback((nextVolume: number) => {
    setVolumeState(clamp(nextVolume, 0, 1));
    if (nextVolume > 0) setIsMuted(false);
  }, []);
  const setPlaybackRate = useCallback((rate: number) => setPlaybackRateState(clamp(rate, 0.25, 2)), []);
  const closeMiniPlayer = useCallback(() => {
    setIsPlaying(false);
    setMiniPlayerVisible(false);
    setMiniPlayerDismissed(true);
  }, []);
  const returnToMainPlayer = useCallback(() => setMiniPlayerVisible(false), []);

  useEffect(() => {
    if (!isPlaying || !currentVideo || duration <= 0) return;

    lastTick.current = Date.now();
    const timer = window.setInterval(() => {
      const now = Date.now();
      const delta = ((now - lastTick.current) / 1000) * playbackRate;
      lastTick.current = now;
      setCurrentTime((time) => Math.min(duration, time + delta));
    }, 250);

    return () => window.clearInterval(timer);
  }, [currentVideo, duration, isPlaying, playbackRate]);

  useEffect(() => {
    if (duration > 0 && currentTime >= duration && isPlaying) {
      setIsPlaying(false);
      setMiniPlayerVisible(false);
    }
  }, [currentTime, duration, isPlaying]);

  useEffect(() => {
    const previous = previousPath.current;
    const wasWatchPage = previous?.startsWith("/watch/") ?? false;
    const isWatchPage = pathname?.startsWith("/watch/") ?? false;

    if (isWatchPage) {
      setMiniPlayerVisible(false);
    } else if (wasWatchPage && isPlaying && currentVideo && !miniPlayerDismissed) {
      setMiniPlayerVisible(true);
    }

    previousPath.current = pathname;
  }, [currentVideo, isPlaying, miniPlayerDismissed, pathname]);

  const value = useMemo<PlaybackContextValue>(() => ({
    currentVideo,
    currentTime,
    duration,
    isPlaying,
    isMuted,
    volume,
    playbackRate,
    miniPlayerVisible,
    loadVideo,
    play,
    pause,
    togglePlay,
    seek,
    toggleMuted,
    setVolume,
    setPlaybackRate,
    closeMiniPlayer,
    returnToMainPlayer,
  }), [
    closeMiniPlayer,
    currentTime,
    currentVideo,
    duration,
    isMuted,
    isPlaying,
    loadVideo,
    miniPlayerVisible,
    pause,
    play,
    playbackRate,
    returnToMainPlayer,
    seek,
    setPlaybackRate,
    setVolume,
    toggleMuted,
    togglePlay,
    volume,
  ]);

  return <PlaybackContext.Provider value={value}>{children}</PlaybackContext.Provider>;
}

export function usePlayback() {
  const context = useContext(PlaybackContext);
  if (!context) throw new Error("usePlayback must be used inside PlaybackProvider");
  return context;
}
