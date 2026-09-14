import { Captions, Fullscreen, Gauge, Maximize2, MessageSquareText, Pause, Play, Settings2, Volume2 } from "lucide-react";

type VideoPlayerProps = {
  title: string;
  accent: string;
  creator: string;
  durationLabel?: string;
};

export default function VideoPlayer({ title, accent, creator, durationLabel = "12:48" }: VideoPlayerProps) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--panel)] shadow-sm">
      <div className="relative aspect-video overflow-hidden" style={{ backgroundImage: accent }}>
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,23,42,0.72),transparent_30%,rgba(15,23,42,0.04))]" />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 text-white/90">
          <span className="rounded-full border border-white/20 bg-black/25 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur-sm">
            {creator}
          </span>
          <span className="rounded-full bg-red-500/90 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
            LIVE
          </span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-18 w-18 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white shadow-lg backdrop-blur-sm">
            <Play className="ml-1 h-8 w-8 fill-current" />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/20">
            <div className="h-full w-[42%] rounded-full bg-[var(--accent)]" />
          </div>

          <div className="flex items-center justify-between text-[11px] text-white/90">
            <div className="flex items-center gap-3">
              <button className="rounded-full bg-black/20 p-1.5 backdrop-blur-sm" aria-label="Play or pause">
                <Pause className="h-4 w-4" />
              </button>
              <button className="rounded-full bg-black/20 p-1.5 backdrop-blur-sm" aria-label="Mute audio">
                <Volume2 className="h-4 w-4" />
              </button>
              <span>1:14:26</span>
            </div>

            <div className="flex items-center gap-2">
              <button className="rounded-full bg-black/20 p-1.5 backdrop-blur-sm" aria-label="Playback speed">
                <Gauge className="h-4 w-4" />
              </button>
              <button className="rounded-full bg-black/20 p-1.5 backdrop-blur-sm" aria-label="Captions">
                <Captions className="h-4 w-4" />
              </button>
              <button className="rounded-full bg-black/20 p-1.5 backdrop-blur-sm" aria-label="Settings">
                <Settings2 className="h-4 w-4" />
              </button>
              <button className="rounded-full bg-black/20 p-1.5 backdrop-blur-sm" aria-label="Enter full screen">
                <Fullscreen className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--border)] bg-[var(--panel-strong)] px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[var(--foreground)] sm:text-2xl">{title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
              <span>42만 조회</span>
              <span>•</span>
              <span>3일 전</span>
              <span>•</span>
              <span>{durationLabel}</span>
            </div>
          </div>
          <div className="rounded-full border border-[var(--border)] bg-[var(--panel)] px-3 py-1.5 text-sm font-medium text-[var(--foreground)]">
            HD
          </div>
        </div>
      </div>
    </div>
  );
}
