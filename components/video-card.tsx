import { Clock3, PlayCircle, Sparkles } from "lucide-react";
import type { VideoItem } from "@/lib/mock-data";

export default function VideoCard({ video }: { video: VideoItem }) {
  return (
    <article className="group flex min-w-0 flex-col gap-3">
      <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-zinc-200 transition duration-200 group-hover:translate-y-[-2px] group-hover:shadow-lg dark:bg-zinc-800">
        <div
          className="relative aspect-video w-full overflow-hidden bg-gradient-to-br"
          style={{ backgroundImage: video.accent }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,23,42,0.58),transparent_38%)]" />
          {video.progress !== undefined && (
            <div className="absolute inset-x-2 bottom-2 h-1.5 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-[var(--accent)]"
                style={{ width: `${video.progress}%` }}
              />
            </div>
          )}
          <div className="absolute right-3 top-3 rounded-full bg-black/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
            {video.duration}
          </div>
          <div className="absolute left-3 top-3 rounded-full border border-white/30 bg-black/30 px-2 py-1 text-[10px] font-semibold text-white">
            {video.category}
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-2 py-1 text-[10px] text-white backdrop-blur-sm">
            <PlayCircle className="h-3.5 w-3.5" />
            {video.isWatched ? "이어보기" : "재생"}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${video.avatarColor} text-xs font-bold text-white`}>
          {video.avatar}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-[var(--foreground)]">
              {video.title}
            </h3>
            {video.badge && (
              <span className="mt-0.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
                {video.badge}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-[var(--muted)]">{video.creator}</p>
          <div className="mt-1 flex items-center gap-2 text-[11px] text-[var(--muted)]">
            <span>{video.views} 조회</span>
            <span>•</span>
            <span>{video.published}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
