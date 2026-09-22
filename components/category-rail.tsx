import { categories } from "@/lib/mock-data";

export default function CategoryRail() {
  return (
    <div className="-mx-1 overflow-x-auto px-1 pb-1">
      <div className="flex min-w-max gap-2">
        {categories.map((category, index) => (
          <button
            key={category.id}
            className={`rounded-full border px-3.5 py-2 text-sm font-semibold transition ${
              index === 0
                ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--foreground)]"
                : "border-[var(--border)] bg-[var(--panel-strong)] text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
