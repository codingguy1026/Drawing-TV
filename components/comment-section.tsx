import { MessageSquareText, ThumbsUp, MoreHorizontal } from "lucide-react";

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

function CommentRow({ comment }: { comment: CommentItemData }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400 text-xs font-bold text-white">
        {comment.author.slice(0, 1)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
          <span className="font-semibold text-[var(--foreground)]">{comment.author}</span>
          <span>{comment.handle}</span>
          <span>•</span>
          <span>{comment.time}</span>
        </div>
        <p className="mt-2 text-sm leading-6 text-[var(--foreground)]">{comment.text}</p>
        <div className="mt-3 flex items-center gap-4 text-xs text-[var(--muted)]">
          <button className="inline-flex items-center gap-1 hover:text-[var(--foreground)]">
            <ThumbsUp className="h-3.5 w-3.5" />
            {comment.likes}
          </button>
          <button className="hover:text-[var(--foreground)]">답글</button>
          <button className="hover:text-[var(--foreground)]">공유</button>
          <button className="ml-auto">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-2 border-l border-[var(--border)] pl-3">
            {comment.replies.map((reply) => (
              <CommentRow key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CommentSection({ comments }: CommentSectionProps) {
  return (
    <section className="space-y-4 rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
            <MessageSquareText className="h-4 w-4" />
          </div>
          <h2 className="text-lg font-bold text-[var(--foreground)]">댓글 {comments.length}</h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
          <button className="rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-2.5 py-1.5 font-medium text-[var(--foreground)]">인기순</button>
          <button className="rounded-full px-2.5 py-1.5 hover:text-[var(--foreground)]">최신순</button>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel-strong)] p-3">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-slate-500 to-slate-700 text-xs font-bold text-white">
            H
          </div>
          <textarea
            aria-label="Write a comment"
            rows={3}
            placeholder="생각을 남겨보세요..."
            className="w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
          />
        </div>
        <div className="mt-3 flex justify-end">
          <button className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white">댓글 작성</button>
        </div>
      </div>

      <div className="space-y-3">
        {comments.map((comment) => (
          <CommentRow key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  );
}
