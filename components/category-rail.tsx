import { categories } from "@/lib/mock-data";

export default function CategoryRail() {
  return (
    <div className="-mx-1 overflow-x-auto px-1 pb-1">
      <div className="flex min-w-max gap-2">
        {categories.map((category, index) => (
          <button
            key={category.id}
            className={`rounded-2xl px-3.5 py-2 text-sm font-bold transition ${
              index === 0
                ? "bg-[var(--foreground)] text-[var(--background)] shadow-sm"
                : "border border-[var(--border)] bg-[var(--panel-soft)] text-[var(--muted)] backdrop-blur-xl hover:-translate-y-0.5 hover:bg-[var(--panel)] hover:text-[var(--foreground)]"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
