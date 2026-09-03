"use client";

import { useMemo, useState, type CSSProperties } from "react";

type Video = {
  id: number;
  title: string;
  channel: string;
  views: string;
  age: string;
  duration: string;
  category: string;
  live?: boolean;
  watching?: string;
  verified?: boolean;
  gradient: string;
  accent: string;
};

const categories = ["전체", "LIVE", "게임", "스포츠", "음악", "그림", "IT", "일상", "뉴스"];

const videos: Video[] = [
  {
    id: 1,
    title: "한화는 대체 왜 이러는가 | 오늘 경기 같이 보기",
    channel: "드가이 스포츠",
    views: "12만회",
    age: "3시간 전",
    duration: "12:41",
    category: "스포츠",
    gradient: "linear-gradient(135deg,#ff3155 0%,#54102a 52%,#111119 100%)",
    accent: "⚾",
    verified: true,
  },
  {
    id: 2,
    title: "새벽 2시에 시작한 공포게임이 이상하다",
    channel: "404 플레이룸",
    views: "8.7만회",
    age: "6시간 전",
    duration: "24:08",
    category: "게임",
    gradient: "linear-gradient(135deg,#7657ff 0%,#241b55 50%,#09090d 100%)",
    accent: "👁",
  },
  {
    id: 3,
    title: "웹사이트 디자인, 여기 하나만 바꿔도 달라집니다",
    channel: "Pixel Lab",
    views: "3.1만회",
    age: "어제",
    duration: "09:32",
    category: "IT",
    gradient: "linear-gradient(135deg,#20c997 0%,#0b485b 56%,#0b0b0d 100%)",
    accent: "⌨",
    verified: true,
  },
  {
    id: 4,
    title: "10분 동안 아무 생각 없이 듣는 밤 라디오",
    channel: "새벽 주파수",
    views: "19만회",
    age: "2일 전",
    duration: "10:00",
    category: "음악",
    gradient: "linear-gradient(135deg,#1b2d63 0%,#40206a 50%,#0b0b0d 100%)",
    accent: "♫",
  },
  {
    id: 5,
    title: "태블릿 하나로 그림 작업 어디까지 가능할까?",
    channel: "모노 드로잉",
    views: "5.4만회",
    age: "2일 전",
    duration: "15:17",
    category: "그림",
    gradient: "linear-gradient(135deg,#ffb36b 0%,#e35d8d 48%,#362252 100%)",
    accent: "✎",
  },
  {
    id: 6,
    title: "오늘 꼭 알아야 할 테크 소식 7가지",
    channel: "D Tech",
    views: "22만회",
    age: "4시간 전",
    duration: "08:44",
    category: "뉴스",
    gradient: "linear-gradient(135deg,#216cff 0%,#16205a 54%,#0b0b0d 100%)",
    accent: "D",
    verified: true,
  },
  {
    id: 7,
    title: "친구들이랑 하루 종일 아무 계획 없이 돌아다녀봄",
    channel: "오늘의 우리",
    views: "14만회",
    age: "1일 전",
    duration: "18:29",
    category: "일상",
    gradient: "linear-gradient(135deg,#ffcf66 0%,#ff7b57 48%,#47283f 100%)",
    accent: "☀",
  },
  {
    id: 8,
    title: "이 장면 하나 그리는데 6시간 걸렸습니다",
    channel: "모노 드로잉",
    views: "4.8만회",
    age: "3일 전",
    duration: "11:56",
    category: "그림",
    gradient: "linear-gradient(135deg,#91f1ca 0%,#5d60d8 52%,#17172c 100%)",
    accent: "✦",
  },
];

const liveVideos: Video[] = [
  {
    id: 101,
    title: "지금 같이 보는 오늘의 야구",
    channel: "드가이 스포츠",
    views: "",
    age: "",
    duration: "LIVE",
    category: "LIVE",
    live: true,
    watching: "1.2K",
    gradient: "linear-gradient(135deg,#ff3155 0%,#8e1635 40%,#17171a 100%)",
    accent: "⚾",
  },
  {
    id: 102,
    title: "새 프로젝트 UI 같이 만들기",
    channel: "Pixel Lab",
    views: "",
    age: "",
    duration: "LIVE",
    category: "LIVE",
    live: true,
    watching: "428",
    gradient: "linear-gradient(135deg,#7657ff 0%,#2d347d 48%,#101014 100%)",
    accent: "⌘",
  },
  {
    id: 103,
    title: "신곡 작업실 LIVE",
    channel: "새벽 주파수",
    views: "",
    age: "",
    duration: "LIVE",
    category: "LIVE",
    live: true,
    watching: "3.8K",
    gradient: "linear-gradient(135deg,#ff5fa2 0%,#612c87 50%,#101014 100%)",
    accent: "♫",
  },
];

const clips = [
  { id: 201, title: "이게 왜 홈런이 아니냐고", channel: "@dguy", stat: "82K", gradient: "linear-gradient(180deg,#ff795e,#421629 55%,#0d0d12)" },
  { id: 202, title: "3초 뒤에 분위기 바뀜", channel: "@404play", stat: "41K", gradient: "linear-gradient(180deg,#5264ff,#26174a 55%,#0d0d12)" },
  { id: 203, title: "선 하나로 그림 살리는 법", channel: "@mono", stat: "120K", gradient: "linear-gradient(180deg,#ffd6a3,#a36ad5 55%,#111119)" },
  { id: 204, title: "키보드 소리만 듣고 맞히기", channel: "@dtech", stat: "67K", gradient: "linear-gradient(180deg,#45d4bb,#154d64 55%,#0d0d12)" },
  { id: 205, title: "오늘 하늘 진짜 미쳤다", channel: "@todayus", stat: "98K", gradient: "linear-gradient(180deg,#68b8ff,#6653a1 55%,#171725)" },
];

const sideItems = [
  ["⌂", "홈"],
  ["ϟ", "D-Clips"],
  ["◉", "구독"],
  ["▣", "라이브"],
  ["▤", "보관함"],
  ["↺", "시청 기록"],
  ["▱", "나중에 볼 영상"],
];

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [category, setCategory] = useState("전체");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  const filteredVideos = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return videos.filter((video) => {
      const categoryMatch = category === "전체" || category === "LIVE" ? category !== "LIVE" : video.category === category;
      const searchMatch = !normalized || `${video.title} ${video.channel} ${video.category}`.toLowerCase().includes(normalized);
      return categoryMatch && searchMatch;
    });
  }, [category, query]);

  const showNotice = (text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(null), 2200);
  };

  return (
    <main className="dtv-app">
      <header className="topbar">
        <div className="brand-zone">
          <button className="icon-button menu-button" aria-label="사이드바 열기" onClick={() => setSidebarOpen((value) => !value)}>
            <span></span><span></span><span></span>
          </button>
          <a className="brand" href="#home" aria-label="DTV 홈">
            <span className="brand-d">D</span>
            <span className="brand-play">▶</span>
            <span className="brand-tv">TV</span>
          </a>
        </div>

        <form className="search" onSubmit={(event) => event.preventDefault()}>
          <span className="search-icon">⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="무엇을 보고 싶나요?" aria-label="영상 검색" />
          {query && <button type="button" className="search-clear" onClick={() => setQuery("")} aria-label="검색어 지우기">×</button>}
          <button className="search-submit" type="submit">검색</button>
        </form>

        <div className="top-actions">
          <button className="upload-button" onClick={() => showNotice("업로드 스튜디오는 다음 단계에서 연결할게요 📼")}>＋ <span>업로드</span></button>
          <button className="icon-button notification-button" aria-label="알림" onClick={() => showNotice("새 알림이 없습니다 🔔")}>♢<span className="notification-dot" /></button>
          <button className="profile-button" aria-label="프로필" onClick={() => showNotice("프로필 페이지 준비 중 👤")}>D</button>
        </div>
      </header>

      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <nav>
          {sideItems.map(([icon, label], index) => (
            <button key={label} className={`side-item ${index === 0 ? "active" : ""}`} onClick={() => showNotice(`${label} 메뉴는 곧 연결됩니다.`)}>
              <span className="side-icon">{icon}</span>
              <span className="side-label">{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-divider" />
        <div className="sidebar-section">
          <p>내 구독</p>
          <button className="subscription"><span className="avatar avatar-red">D</span><span>드가이 스포츠</span><i>●</i></button>
          <button className="subscription"><span className="avatar avatar-purple">P</span><span>Pixel Lab</span></button>
          <button className="subscription"><span className="avatar avatar-blue">4</span><span>404 플레이룸</span><i>●</i></button>
        </div>
        <div className="sidebar-footer">DTV Prototype · 2026</div>
      </aside>

      <section id="home" className={`content ${sidebarOpen ? "with-sidebar" : "without-sidebar"}`}>
        <div className="category-row" aria-label="카테고리">
          {categories.map((item) => (
            <button key={item} onClick={() => setCategory(item)} className={category === item ? "active" : ""}>
              {item === "LIVE" && <span className="live-dot" />}{item}
            </button>
          ))}
        </div>

        {category === "LIVE" ? (
          <section className="live-focus">
            <div className="section-heading">
              <div><span className="eyebrow live-text">● ON AIR</span><h1>지금 방송 중</h1></div>
              <p>실시간으로 열려 있는 DTV 채널을 만나보세요.</p>
            </div>
            <div className="live-grid large">
              {liveVideos.map((video) => <VideoCard key={video.id} video={video} onOpen={() => showNotice(`“${video.title}” 시청 페이지 준비 중 ▶`)} />)}
            </div>
          </section>
        ) : (
          <>
            <section className="welcome-strip">
              <div>
                <span className="eyebrow">DTV ORIGINAL EXPERIENCE</span>
                <h1>보고 싶은 순간이<br /><strong>방송이 되는 곳.</strong></h1>
                <p>영상부터 라이브까지, 새로운 채널을 발견하고 당신의 방송을 시작하세요.</p>
                <div className="welcome-actions">
                  <button onClick={() => document.getElementById("recommend")?.scrollIntoView({ behavior: "smooth" })}>추천 영상 보기</button>
                  <button className="secondary" onClick={() => setCategory("LIVE")}><span className="live-dot" /> LIVE 둘러보기</button>
                </div>
              </div>
              <div className="signal-art" aria-hidden="true">
                <div className="signal-screen">
                  <span className="screen-live">● LIVE</span>
                  <span className="screen-logo">D▶TV</span>
                  <div className="signal-line one" /><div className="signal-line two" /><div className="signal-line three" />
                </div>
              </div>
            </section>

            <section className="section-block">
              <div className="section-heading compact"><div><span className="eyebrow live-text">● LIVE NOW</span><h2>지금 방송 중</h2></div><button className="text-button" onClick={() => setCategory("LIVE")}>모두 보기 →</button></div>
              <div className="live-grid">
                {liveVideos.map((video) => <VideoCard key={video.id} video={video} onOpen={() => showNotice(`“${video.title}” 시청 페이지 준비 중 ▶`)} />)}
              </div>
            </section>

            <section className="section-block clips-section">
              <div className="section-heading compact"><div><span className="eyebrow">QUICK MOMENTS</span><h2><span className="clip-bolt">ϟ</span> D-Clips</h2></div><button className="text-button" onClick={() => showNotice("D-Clips 세로 피드는 다음 단계에서 만나요 ϟ")}>더 보기 →</button></div>
              <div className="clips-row">
                {clips.map((clip) => (
                  <button className="clip-card" key={clip.id} onClick={() => showNotice(`“${clip.title}” 재생 준비 중 ϟ`)}>
                    <div className="clip-art" style={{ "--clip-gradient": clip.gradient } as CSSProperties}>
                      <span className="clip-play">▶</span><span className="clip-stat">♥ {clip.stat}</span>
                    </div>
                    <strong>{clip.title}</strong><span>{clip.channel}</span>
                  </button>
                ))}
              </div>
            </section>

            <section id="recommend" className="section-block">
              <div className="section-heading compact"><div><span className="eyebrow">FOR YOU</span><h2>{query ? `“${query}” 검색 결과` : category === "전체" ? "오늘의 추천" : category}</h2></div><span className="result-count">{filteredVideos.length}개 영상</span></div>
              {filteredVideos.length > 0 ? (
                <div className="video-grid">
                  {filteredVideos.map((video) => <VideoCard key={video.id} video={video} onOpen={() => showNotice(`“${video.title}” 시청 페이지 준비 중 ▶`)} />)}
                </div>
              ) : (
                <div className="empty-state"><div>⌕</div><h3>아직 잡히는 신호가 없어요</h3><p>다른 검색어나 카테고리를 선택해 보세요.</p><button onClick={() => { setQuery(""); setCategory("전체"); }}>전체 영상으로 돌아가기</button></div>
              )}
            </section>
          </>
        )}

        <footer className="footer"><strong>D▶TV</strong><span>Your channel. Your broadcast.</span><span>Prototype v0.1</span></footer>
      </section>

      {notice && <div className="toast" role="status">{notice}</div>}
    </main>
  );
}

function VideoCard({ video, onOpen }: { video: Video; onOpen: () => void }) {
  return (
    <button className={`video-card ${video.live ? "is-live" : ""}`} onClick={onOpen}>
      <div className="thumbnail" style={{ "--thumb-gradient": video.gradient } as CSSProperties}>
        <span className="thumbnail-accent">{video.accent}</span>
        <div className="thumbnail-shine" />
        {video.live ? <><span className="live-badge">● LIVE</span><span className="watching-badge">{video.watching} watching</span></> : <span className="duration">{video.duration}</span>}
        <span className="hover-play">▶</span>
      </div>
      <div className="video-info">
        <span className={`avatar mini ${video.live ? "avatar-live" : ""}`}>{video.channel.slice(0, 1)}</span>
        <div className="video-copy">
          <h3>{video.title}</h3>
          <p>{video.channel} {video.verified && <span className="verified">✓</span>}</p>
          {video.live ? <p className="live-meta"><span className="live-dot" /> 실시간 · {video.watching}명 시청 중</p> : <p>{video.views} · {video.age}</p>}
        </div>
        <span className="more">⋮</span>
      </div>
    </button>
  );
}
