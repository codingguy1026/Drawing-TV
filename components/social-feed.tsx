"use client";

import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";
import {
  ArrowUpRight, Bookmark, Clapperboard, Heart, MessageCircle, PenLine,
  Play, Radio, Send, Share2, Sparkles, UserPlus, Users, Video
} from "lucide-react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import MobileNavigation from "@/components/mobile-navigation";

type PostKind = "video" | "short" | "note";

type SocialPost = {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  accent: string;
  time: string;
  body: string;
  tags: string[];
  kind: PostKind;
  mediaTitle?: string;
  mediaHref?: string;
  mediaAccent?: string;
  likes: number;
};

type CommentItem = { id: string; body: string };
type SocialState = {
  ownPosts: SocialPost[];
  liked: string[];
  saved: string[];
  following: string[];
  comments: Record<string, CommentItem[]>;
};

const STORAGE_KEY = "drawing-tv-social-v1";

const demoPosts: SocialPost[] = [
  {
    id: "signal-lumi",
    author: "스튜디오 루미",
    handle: "@lumi-studio",
    avatar: "L",
    accent: "linear-gradient(135deg,#fb923c,#a855f7)",
    time: "20분 전",
    body: "우리의 첫 게임 제작기를 공개했어요! 실패한 장면도, 막판에 살아난 아이디어도 전부 담았습니다. 🎮",
    tags: ["#게임개발", "#크리에이터"],
    kind: "video",
    mediaTitle: "학생이 주말에 게임 하나 만들어봤습니다",
    mediaHref: "/watch/v1",
    mediaAccent: "linear-gradient(125deg,#fbbf24 0%,#f97316 46%,#7c3aed 100%)",
    likes: 248,
  },
  {
    id: "signal-motion",
    author: "모션미친",
    handle: "@motionmad",
    avatar: "M",
    accent: "linear-gradient(135deg,#fb7185,#8b5cf6)",
    time: "1시간 전",
    body: "15초짜리 짧은 신호 하나 보냅니다 📡 편집하다가 나 혼자 웃음 터짐ㅋㅋ",
    tags: ["#클립", "#영상편집"],
    kind: "short",
    mediaTitle: "오늘의 짧은 신호",
    mediaHref: "/shorts",
    mediaAccent: "linear-gradient(145deg,#ec4899,#7c3aed 55%,#0ea5e9)",
    likes: 1302,
  },
  {
    id: "signal-baseball",
    author: "야구감성",
    handle: "@baseballvibe",
    avatar: "Y",
    accent: "linear-gradient(135deg,#22d3ee,#2563eb)",
    time: "3시간 전",
    body: "9회말 2아웃. 이런 장면 때문에 야구를 못 끊지 ⚾ 오늘 경기 보고 다들 무슨 생각했어?",
    tags: ["#야구", "#스포츠"],
    kind: "video",
    mediaTitle: "9회말 2아웃에서 진짜 이게 된다고?",
    mediaHref: "/watch/v2",
    mediaAccent: "linear-gradient(135deg,#0f172a,#2563eb 55%,#67e8f9)",
    likes: 728,
  },
  {
    id: "signal-beat",
    author: "비트버킷",
    handle: "@beatbucket",
    avatar: "B",
    accent: "linear-gradient(135deg,#a855f7,#fb7185)",
    time: "어제",
    body: "요즘 작업할 때 어떤 음악 틀어? 🎧 새 플레이리스트 준비 중인데 추천받아 볼게!",
    tags: ["#음악", "#플레이리스트"],
    kind: "note",
    likes: 93,
  },
];

const startState: SocialState = {
  ownPosts: [],
  liked: [],
  saved: [],
  following: [],
  comments: {},
};

const suggestions = [
  { name: "스튜디오 루미", handle: "@lumi-studio", avatar: "L", accent: "linear-gradient(135deg,#fb923c,#a855f7)" },
  { name: "모션미친", handle: "@motionmad", avatar: "M", accent: "linear-gradient(135deg,#fb7185,#8b5cf6)" },
  { name: "야구감성", handle: "@baseballvibe", avatar: "Y", accent: "linear-gradient(135deg,#22d3ee,#2563eb)" },
];

const countText = (count: number) => count >= 10000 ? (count / 10000).toFixed(1) + "만" : count.toLocaleString("ko-KR");

export default function SocialFeed() {
  const [data, setData] = useState<SocialState>(startState);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<"discover" | "following" | "saved">("discover");
  const [draft, setDraft] = useState("");
  const [openComments, setOpenComments] = useState<string | null>(null);
  const [commentDraft, setCommentDraft] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw) as Partial<SocialState>;
        setData({
          ownPosts: Array.isArray(stored.ownPosts) ? stored.ownPosts : [],
          liked: Array.isArray(stored.liked) ? stored.liked : [],
          saved: Array.isArray(stored.saved) ? stored.saved : [],
          following: Array.isArray(stored.following) ? stored.following : [],
          comments: stored.comments && typeof stored.comments === "object" && !Array.isArray(stored.comments) ? stored.comments : {},
        });
      }
    } catch {
      // Corrupt local demo data should not prevent the feed from rendering.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Private browsing or storage quotas can disallow local persistence.
    }
  }, [data, ready]);

  function toggle(field: "liked" | "saved" | "following", value: string) {
    setData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  }

  function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = draft.trim();
    if (!body) return;
    const newPost: SocialPost = {
      id: "mine-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
      author: "나",
      handle: "@me",
      avatar: "N",
      accent: "linear-gradient(135deg,#ff6b50,#9078ff)",
      time: "방금 전",
      body,
      tags: Array.from(new Set(body.match(/#[^\s#]+/g) || [])).slice(0, 5),
      kind: "note",
      likes: 0,
    };
    setData((prev) => ({ ...prev, ownPosts: [newPost, ...prev.ownPosts] }));
    setTab("discover");
    setDraft("");
    setNotice("이 브라우저에 게시글을 저장했어요. 다른 사용자에게는 아직 공개되지 않아요.");
  }

  function addComment(event: FormEvent<HTMLFormElement>, postId: string) {
    event.preventDefault();
    const body = commentDraft.trim();
    if (!body) return;
    setData((prev) => ({
      ...prev,
      comments: {
        ...prev.comments,
        [postId]: [...(prev.comments[postId] || []), { id: "reply-" + Date.now(), body }],
      },
    }));
    setCommentDraft("");
  }

  async function sharePost(postId: string) {
    const url = window.location.origin + "/#post-" + encodeURIComponent(postId);
    try {
      await navigator.clipboard.writeText(url);
      setNotice("게시글 링크를 복사했어요!");
    } catch {
      setNotice("주소를 복사할 수 없어요. 브라우저의 공유 기능을 이용해 주세요.");
    }
  }

  const allPosts = [...data.ownPosts, ...demoPosts];
  const visible = allPosts.filter((post) =>
    tab === "discover" ? true :
    tab === "following" ? post.handle === "@me" || data.following.includes(post.handle) :
    data.saved.includes(post.id)
  );

  return (
    <div className="min-h-screen text-[var(--foreground)]">
      <Header />
      <div className="mx-auto flex max-w-[1640px] gap-6 px-3 pb-28 pt-5 sm:px-5 lg:px-6">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
            <div className="mx-auto w-full max-w-[760px] space-y-5">
              <section className="relative overflow-hidden rounded-[30px] border border-[var(--border)] bg-[var(--panel)] px-5 py-6 shadow-sm sm:px-7">
                <div className="pointer-events-none absolute -right-14 -top-20 h-56 w-56 rounded-full bg-[var(--accent-soft)] blur-3xl" />
                <div className="relative">
                  <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.17em] text-[var(--accent)]">
                    <Radio className="h-4 w-4" /> Drawing TV · Signal
                  </span>
                  <h1 className="mt-2 text-2xl font-black tracking-[-0.05em] sm:text-[32px]">모든 이야기가 하나의 신호가 되는 곳.</h1>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">영상도, 짧은 클립도, 소소한 생각도. 피드는 2026년, 채널은 1996년.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link href="/videos" className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3.5 py-2 text-xs font-bold hover:bg-[var(--hover)]">
                      <Video className="h-4 w-4 text-[var(--accent)]" /> 영상 둘러보기
                    </Link>
                    <Link href="/shorts" className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3.5 py-2 text-xs font-bold hover:bg-[var(--hover)]">
                      <Clapperboard className="h-4 w-4 text-[var(--accent)]" /> 짧은 신호
                    </Link>
                  </div>
                </div>
              </section>

              <section className="rounded-[26px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5" aria-label="새 글 작성">
                <form onSubmit={publish}>
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#ff6b50,#9078ff)] text-sm font-black text-white">N</div>
                    <div className="min-w-0 flex-1">
                      <label htmlFor="signal-draft" className="mb-2 block text-sm font-bold">오늘은 어떤 신호를 보낼까?</label>
                      <textarea
                        id="signal-draft"
                        value={draft}
                        maxLength={500}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder="만든 작품, 좋아하는 영상, 오늘의 생각을 공유해 봐!"
                        rows={3}
                        className="w-full resize-y rounded-2xl border border-[var(--border)] bg-[var(--panel-strong)] p-3 text-sm outline-none transition focus:border-[var(--accent)]"
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2 border-t border-[var(--border)] pt-3">
                    <span className="text-xs text-[var(--muted)]">텍스트 게시글 · 이 기기에서만 보이는 체험판</span>
                    <button disabled={!ready || !draft.trim()} type="submit" className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-black text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">
                      <PenLine className="h-4 w-4" /> 게시
                    </button>
                  </div>
                </form>
              </section>

              <section aria-label="피드">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-[var(--accent)]" />
                    <h2 className="text-xl font-black tracking-tight">Signal Feed</h2>
                  </div>
                  <span className="text-xs font-semibold text-[var(--muted)]">소셜 피드 미리보기</span>
                </div>
                <div className="mb-4 flex gap-2 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-1.5" role="tablist" aria-label="피드 필터">
                  {([
                    { key: "discover", label: "발견" },
                    { key: "following", label: "팔로잉" },
                    { key: "saved", label: "저장함" },
                  ] as const).map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      aria-selected={tab === key}
                      onClick={() => setTab(key)}
                      className={"flex-1 rounded-xl px-3 py-2.5 text-sm font-bold transition " + (tab === key ? "bg-[var(--accent-soft)] text-[var(--accent)]" : "text-[var(--muted)] hover:bg-[var(--hover)]")}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {notice && (
                  <div role="status" className="mb-4 flex items-start justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--panel)] px-4 py-3 text-xs text-[var(--muted)]">
                    <span>{notice}</span>
                    <button type="button" onClick={() => setNotice("")} className="shrink-0 font-bold text-[var(--accent)]">닫기</button>
                  </div>
                )}

                {visible.length === 0 ? (
                  <div className="rounded-[26px] border border-[var(--border)] bg-[var(--panel)] p-10 text-center">
                    <Users className="mx-auto h-9 w-9 text-[var(--accent)]" />
                    <h3 className="mt-3 text-lg font-black">{tab === "following" ? "아직 팔로잉한 채널이 없어요" : "저장한 게시글이 없어요"}</h3>
                    <p className="mt-2 text-sm text-[var(--muted)]">발견 피드에서 크리에이터를 팔로우하거나 마음에 드는 글을 저장해 보세요.</p>
                    <button onClick={() => setTab("discover")} className="mt-4 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-bold text-white">발견 피드로</button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {visible.map((post) => {
                      const followed = data.following.includes(post.handle);
                      const liked = data.liked.includes(post.id);
                      const saved = data.saved.includes(post.id);
                      const thread = data.comments[post.id] || [];
                      return (
                        <article id={"post-" + post.id} key={post.id} className="overflow-hidden rounded-[26px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
                          <div className="flex items-start gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-base font-black text-white" style={{ backgroundImage: post.accent }}>{post.avatar}</div>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                                <strong className="text-sm">{post.author}</strong>
                                <span className="text-xs text-[var(--muted)]">{post.handle}</span>
                                <span className="text-xs text-[var(--muted)]">· {post.time}</span>
                              </div>
                              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.13em] text-[var(--accent)]">{post.kind === "video" ? "VIDEO SIGNAL" : post.kind === "short" ? "SHORT SIGNAL" : "COMMUNITY SIGNAL"}</p>
                            </div>
                            {post.handle !== "@me" && (
                              <button
                                type="button"
                                aria-pressed={followed}
                                onClick={() => toggle("following", post.handle)}
                                className={"inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-black " + (followed ? "border-[var(--border)] bg-[var(--panel-strong)]" : "border-transparent bg-[var(--accent)] text-white")}
                              >
                                <UserPlus className="h-3.5 w-3.5" /> {followed ? "팔로잉" : "팔로우"}
                              </button>
                            )}
                          </div>
                          <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-7">{post.body}</p>
                          {post.tags.length > 0 && <p className="mt-2 break-words text-xs font-semibold text-[var(--accent)]">{post.tags.join("  ")}</p>}

                          {post.mediaHref && (
                            <Link
                              href={post.mediaHref}
                              className="group relative mt-4 flex aspect-[16/9] items-end overflow-hidden rounded-[23px] border border-white/10 p-5 text-white sm:p-6"
                              style={{ backgroundImage: post.mediaAccent }}
                              aria-label={post.mediaTitle + " 시청"}
                            >
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                              <div className="relative flex w-full items-end justify-between gap-3">
                                <div>
                                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/75">DTV ON AIR</span>
                                  <h3 className="mt-1 text-lg font-black leading-snug sm:text-2xl">{post.mediaTitle}</h3>
                                </div>
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md transition group-hover:scale-110">
                                  <Play className="h-6 w-6 fill-white" />
                                </span>
                              </div>
                            </Link>
                          )}
                          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[var(--border)] pt-3">
                            <button type="button" aria-pressed={liked} onClick={() => toggle("liked", post.id)} className={"inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold hover:bg-[var(--hover)] " + (liked ? "text-[var(--accent)]" : "text-[var(--muted)]")}>
                              <Heart className={"h-4 w-4 " + (liked ? "fill-current" : "")} /> {countText(post.likes + (liked ? 1 : 0))}
                            </button>
                            <button type="button" aria-expanded={openComments === post.id} onClick={() => { setOpenComments(openComments === post.id ? null : post.id); setCommentDraft(""); }} className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold text-[var(--muted)] hover:bg-[var(--hover)]">
                              <MessageCircle className="h-4 w-4" /> 댓글 {thread.length}
                            </button>
                            <button type="button" aria-pressed={saved} onClick={() => toggle("saved", post.id)} className={"inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold hover:bg-[var(--hover)] " + (saved ? "text-[var(--accent)]" : "text-[var(--muted)]")}>
                              <Bookmark className={"h-4 w-4 " + (saved ? "fill-current" : "")} /> {saved ? "저장됨" : "저장"}
                            </button>
                            <button type="button" onClick={() => void sharePost(post.id)} className="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold text-[var(--muted)] hover:bg-[var(--hover)]">
                              <Share2 className="h-4 w-4" /> 공유
                            </button>
                          </div>
                          {openComments === post.id && (
                            <section className="mt-3 space-y-3 rounded-2xl bg-[var(--hover)] p-3" aria-label="댓글">
                              {thread.length === 0 && <p className="text-xs text-[var(--muted)]">첫 댓글을 남겨보세요.</p>}
                              {thread.map((comment) => (
                                <p key={comment.id} className="rounded-xl bg-[var(--panel-strong)] p-3 text-sm"><span className="mr-2 font-black text-[var(--accent)]">나</span><span className="whitespace-pre-wrap break-words">{comment.body}</span></p>
                              ))}
                              <form onSubmit={(event) => addComment(event, post.id)} className="flex gap-2">
                                <input value={commentDraft} onChange={(event) => setCommentDraft(event.target.value)} maxLength={150} aria-label="댓글 입력" placeholder="따뜻한 댓글을 남겨요" className="min-w-0 flex-1 rounded-xl border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]" />
                                <button type="submit" disabled={!commentDraft.trim()} aria-label="댓글 작성" className="rounded-xl bg-[var(--accent)] p-2.5 text-white disabled:opacity-40"><Send className="h-4 w-4" /></button>
                              </form>
                            </section>
                          )}
                        </article>
                      );
                    })}
                  </div>
                )}
              </section>
            </div>

            <aside className="sticky top-24 hidden space-y-4 xl:block">
              <section className="rounded-[25px] border border-[var(--border)] bg-[var(--panel)] p-5 shadow-sm">
                <p className="text-[11px] font-black uppercase tracking-[0.17em] text-[var(--accent)]">DTV Frequency</p>
                <h2 className="mt-2 text-lg font-black">취향이 연결되는 주파수</h2>
                <p className="mt-2 text-xs leading-6 text-[var(--muted)]">구독보다 가볍게 팔로우하고, 즐겨 보는 크리에이터의 소식을 모아보세요.</p>
                <div className="mt-5 space-y-4">
                  {suggestions.map((creator) => {
                    const followed = data.following.includes(creator.handle);
                    return (
                      <div key={creator.handle} className="flex items-center gap-2.5">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white" style={{ backgroundImage: creator.accent }}>{creator.avatar}</span>
                        <span className="min-w-0 flex-1">
                          <strong className="block truncate text-xs">{creator.name}</strong>
                          <small className="block truncate text-[11px] text-[var(--muted)]">{creator.handle}</small>
                        </span>
                        <button type="button" aria-label={creator.name + (followed ? " 언팔로우" : " 팔로우")} aria-pressed={followed} onClick={() => toggle("following", creator.handle)} className={"rounded-full p-2 " + (followed ? "bg-[var(--accent-soft)] text-[var(--accent)]" : "bg-[var(--panel-strong)] text-[var(--muted)]")}>
                          <UserPlus className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>
              <Link href="/explore" className="flex items-center justify-between rounded-[22px] border border-[var(--border)] bg-[var(--panel)] p-4 text-sm font-bold shadow-sm">
                더 많은 신호 찾기 <ArrowUpRight className="h-4 w-4 text-[var(--accent)]" />
              </Link>
              <p className="px-1 text-[11px] leading-5 text-[var(--muted)]">현재 소셜 피드는 브라우저 내 체험판입니다. 계정 로그인, 실제 업로드, 사용자 간 동기화는 아직 연결되지 않았습니다.</p>
            </aside>
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
}
