import { Play, Sparkles } from "lucide-react";
import { shorts } from "@/lib/mock-data";

export default function ShortsPreview() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
            <Sparkles className="h-4 w-4" />
          </div>
          <h2 className="text-lg font-bold text-[var(--foreground)]">Shorts</h2>
        </div>
        <button className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]">더보기</button>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {shorts.map((short) => (
          <article key={short.id} className="group">
            <div
              className="relative aspect-[9/16] overflow-hidden rounded-[1.5rem] border border-[var(--border)] shadow-sm transition duration-200 group-hover:translate-y-[-2px] group-hover:shadow-md"
              style={{ backgroundImage: short.accent }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,23,42,0.7),transparent_38%)]" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="mb-2 flex items-center justify-between text-[10px] text-white/80">
                  <span>{short.creator}</span>
                  <span>{short.views}</span>
                </div>
                <h3 className="line-clamp-3 text-sm font-semibold text-white">{short.title}</h3>
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/25 p-2 text-white backdrop-blur-sm">
                <Play className="h-4 w-4 fill-current" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
