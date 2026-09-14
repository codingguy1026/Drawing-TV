"use client";

import { Clock3, MessageSquareText, MoreHorizontal, ThumbsUp } from "lucide-react";
import { useRef, useState } from "react";
import { usePlayback } from "@/components/playback-provider";
import { formatTimestamp, timestampToSeconds } from "@/lib/time";

export type CommentItemData = {
  id: string;
  author: string;
  handle: string;
  time: string;
  text: string;
  likes: number;
  replies?: CommentItemData[];
};

type CommentSectionProps = {
  comments: CommentItemData[];
};

const timestampPattern = /\b(?:(\d{1,2}):)?(\d{1,2}):([0-5]\d)\b/g;

function CommentText({ text, duration, onSeek }: { text: string; duration: number; onSeek: (seconds: number) => void }) {
  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(timestampPattern)) {
    const index = match.index ?? 0;
    if (index > cursor) nodes.push(text.slice(cursor, index));

    const label = match[0];
    const seconds = timestampToSeconds(label);
    const valid = seconds !== null && seconds <= duration;

    nodes.push(
      valid ? (
        <button
          type="button"
          key={`${index}-${label}`}
          onClick={() => onSeek(seconds)}
          className="rounded px-1 font-semibold text-[var(--accent)] transition hover:bg-[var(--accent-soft)]"
          aria-label={`${label} 시점으로 이동`}
        >
          {label}
        </button>
      ) : (
        <span key={`${index}-${label}`}>{label}</span>
      ),
    );

    cursor = index + label.length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return <>{nodes}</>;
}

function CommentRow({ comment, duration, onSeek }: { comment: CommentItemData; duration: number; onSeek: (seconds: number) => void }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400 text-xs font-bold text-white">
        {comment.author.slice(0, 1)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
          <span className="font-semibold text-[var(--foreground)]">{comment.author}</span>
          <span>{comment.handle}</span>
          <span>•</span>
          <span>{comment.time}</span>
        </div>
        <p className="mt-2 text-sm leading-6 text-[var(--foreground)]">
          <CommentText text={comment.text} duration={duration} onSeek={onSeek} />
        </p>
        <div className="mt-3 flex items-center gap-4 text-xs text-[var(--muted)]">
          <button type="button" className="inline-flex items-center gap-1 hover:text-[var(--foreground)]">
            <ThumbsUp className="h-3.5 w-3.5" />
            {comment.likes}
          </button>
          <button type="button" className="hover:text-[var(--foreground)]">답글</button>
          <button type="button" className="hover:text-[var(--foreground)]">공유</button>
          <button type="button" className="ml-auto" aria-label="댓글 더보기">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-2 border-l border-[var(--border)] pl-3">
            {comment.replies.map((reply) => (
              <CommentRow key={reply.id} comment={reply} duration={duration} onSeek={onSeek} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CommentSection({ comments }: CommentSectionProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [draft, setDraft] = useState("");
  const [items, setItems] = useState<CommentItemData[]>(comments);
  const [sort, setSort] = useState<"popular" | "latest">("popular");
  const { currentTime, duration, seek, play } = usePlayback();

  const jumpToTimestamp = (seconds: number) => {
    seek(seconds);
    play();
    document.querySelector("[data-video-player]")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const insertCurrentTimestamp = () => {
    const textarea = textareaRef.current;
    const stamp = `${formatTimestamp(currentTime)} `;
    const start = textarea?.selectionStart ?? draft.length;
    const end = textarea?.selectionEnd ?? draft.length;
    const next = `${draft.slice(0, start)}${stamp}${draft.slice(end)}`;
    setDraft(next);

    requestAnimationFrame(() => {
      textarea?.focus();
      const cursor = start + stamp.length;
      textarea?.setSelectionRange(cursor, cursor);
    });
  };

  const submitComment = () => {
    const text = draft.trim();
    if (!text) return;
    setItems((previous) => [
      {
        id: `local-${Date.now()}`,
        author: "나",
        handle: "@me",
        time: "방금 전",
        text,
        likes: 0,
      },
      ...previous,
    ]);
    setDraft("");
  };

  const visibleItems = sort === "popular" ? [...items].sort((a, b) => b.likes - a.likes) : items;

  return (
    <section className="space-y-4 rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
            <MessageSquareText className="h-4 w-4" />
          </div>
          <h2 className="text-lg font-bold text-[var(--foreground)]">댓글 {items.length}</h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
          <button type="button" onClick={() => setSort("popular")} className={`rounded-full px-2.5 py-1.5 font-medium ${sort === "popular" ? "border border-[var(--border)] bg-[var(--panel-strong)] text-[var(--foreground)]" : "hover:text-[var(--foreground)]"}`}>인기순</button>
          <button type="button" onClick={() => setSort("latest")} className={`rounded-full px-2.5 py-1.5 font-medium ${sort === "latest" ? "border border-[var(--border)] bg-[var(--panel-strong)] text-[var(--foreground)]" : "hover:text-[var(--foreground)]"}`}>최신순</button>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel-strong)] p-3">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-500 to-slate-700 text-xs font-bold text-white">H</div>
          <textarea
            ref={textareaRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            aria-label="댓글 작성"
            rows={3}
            placeholder="생각을 남겨보세요..."
            className="w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={insertCurrentTimestamp}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-[var(--accent)] transition hover:bg-[var(--accent-soft)]"
          >
            <Clock3 className="h-4 w-4" />
            현재 시간 {formatTimestamp(currentTime)} 추가
          </button>
          <button type="button" onClick={submitComment} className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white">댓글 작성</button>
        </div>
      </div>

      <div className="space-y-3">
        {visibleItems.map((comment) => (
          <CommentRow key={comment.id} comment={comment} duration={duration} onSeek={jumpToTimestamp} />
        ))}
      </div>
    </section>
  );
}
