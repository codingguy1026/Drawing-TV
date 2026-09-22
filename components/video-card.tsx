import Link from "next/link";
import { Play, Radio } from "lucide-react";
import type { VideoItem } from "@/lib/mock-data";

export default function VideoCard({ video }: { video: VideoItem }) {
  return (
    <article className="group min-w-0">
      <Link href={`/watch/${video.id}`} className="block">
        <div className="relative overflow-hidden rounded-[24px] bg-zinc-200 shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow)] dark:bg-zinc-800">
          <div
            className="relative aspect-video w-full overflow-hidden"
            style={{ backgroundImage: video.accent }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,5,8,0.68),transparent_56%)] opacity-80 transition group-hover:opacity-100" />
            <div className="absolute inset-0 bg-white/0 transition duration-300 group-hover:bg-white/[0.04]" />

            <div className="absolute left-3 top-3 flex items-center gap-1.5">
              <span className="rounded-xl border border-white/15 bg-black/25 px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white backdrop-blur-md">
                {video.category}
              </span>
              {video.badge === "LIVE" && (
                <span className="flex items-center gap-1 rounded-xl bg-red-500 px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white">
                  <Radio className="h-3 w-3" />
                  Live
                </span>
              )}
            </div>

            <span className="absolute right-3 top-3 rounded-xl bg-black/45 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-md">
              {video.duration}
            </span>

            <div className="absolute bottom-3 left-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <Play className="h-4 w-4 fill-current" />
            </div>

            {video.progress !== undefined && (
              <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
                <div className="h-full bg-[var(--accent)]" style={{ width: `${video.progress}%` }} />
              </div>
            )}
          </div>
        </div>
      </Link>

      <div className="mt-3 flex gap-3 px-0.5">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[13px] bg-gradient-to-br ${video.avatarColor} text-[11px] font-black text-white shadow-sm`}>
          {video.avatar}
        </div>
        <div className="min-w-0 flex-1">
          <Link href={`/watch/${video.id}`}>
            <h3 className="line-clamp-2 text-[14px] font-extrabold leading-5 tracking-[-0.015em] text-[var(--foreground)] transition group-hover:text-[var(--accent)]">
              {video.title}
            </h3>
          </Link>
          <p className="mt-1 truncate text-xs font-medium text-[var(--muted)]">{video.creator}</p>
          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[var(--muted)]">
            <span>{video.views} 조회</span>
            <span className="h-0.5 w-0.5 rounded-full bg-current" />
            <span>{video.published}</span>
            {video.badge && video.badge !== "LIVE" && (
              <span className="ml-1 rounded-md bg-[var(--accent-soft)] px-1.5 py-0.5 text-[9px] font-black text-[var(--accent)]">
                {video.badge}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
