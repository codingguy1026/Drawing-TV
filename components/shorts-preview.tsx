import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { shorts } from "@/lib/mock-data";

export default function ShortsPreview() {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="mb-1 flex items-center gap-1.5 text-[var(--accent)]">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="tv-kicker">Shorts</span>
          </div>
          <h2 className="text-xl font-black tracking-[-0.03em] text-[var(--foreground)]">짧게, 바로 보기</h2>
        </div>
        <Link href="/shorts" className="flex items-center gap-1 text-xs font-bold text-[var(--muted)] transition hover:text-[var(--foreground)]">
          더보기 <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {shorts.map((short) => (
          <Link href="/shorts" key={short.id} className="group block">
            <article
              className="relative aspect-[9/15] overflow-hidden rounded-[24px] border border-[var(--border)] shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow)]"
              style={{ backgroundImage: short.accent }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,5,8,0.78),rgba(4,5,8,0.03)_62%)]" />
              <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md transition group-hover:bg-white group-hover:text-black">
                <Play className="h-3.5 w-3.5 fill-current" />
              </div>
              <div className="absolute inset-x-3 bottom-3">
                <div className="mb-2 flex items-center justify-between text-[10px] font-bold text-white/70">
                  <span>{short.creator}</span>
                  <span>{short.views}</span>
                </div>
                <h3 className="line-clamp-3 text-sm font-extrabold leading-5 text-white">{short.title}</h3>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
