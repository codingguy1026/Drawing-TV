import Link from "next/link";
import { ArrowUpRight, Play, Sparkles } from "lucide-react";
import { shorts } from "@/lib/mock-data";

export default function ShortsPreview() {
  return (
    <section className="overflow-hidden rounded-[30px] border border-[var(--border)] bg-[var(--foreground)] p-4 text-[var(--background)] shadow-[var(--shadow)] sm:p-5">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <div className="mb-1 flex items-center gap-2 text-[var(--accent)]">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="tv-kicker">Fast lane</span>
          </div>
          <h2 className="text-xl font-black tracking-[-0.035em]">Shorts, 한 번에 훑기</h2>
        </div>
        <Link href="/shorts" className="flex items-center gap-1 text-xs font-bold opacity-65 transition hover:opacity-100">
          모두 보기 <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {shorts.map((short, index) => (
          <Link href="/shorts" key={short.id} className="group block">
            <article
              className={`relative aspect-[9/14] overflow-hidden rounded-[22px] transition duration-300 group-hover:-translate-y-1 md:${index % 2 ? "translate-y-4" : ""}`}
              style={{ backgroundImage: short.accent }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,5,8,0.82),rgba(4,5,8,0.02)_64%)]" />
              <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition group-hover:bg-white group-hover:text-black">
                <Play className="h-3.5 w-3.5 fill-current" />
              </div>
              <div className="absolute inset-x-3 bottom-3">
                <div className="mb-2 flex items-center justify-between text-[10px] font-bold text-white/65">
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
