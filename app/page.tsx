"use client";

import { useMemo, useState, type CSSProperties } from "react";
import NotificationPanel from "./components/NotificationPanel";
import SiteThemeMenu from "./components/SiteThemeMenu";

type Video = {
  id: number;
  title: string;
  channel: string;
  meta: string;
  duration: string;
  category: string;
  gradient: string;
  icon: string;
};

const videos: Video[] = [
  { id: 1, title: "한화는 대체 왜 이러는가 | 오늘 경기 같이 보기", channel: "드가이 스포츠", meta: "12만회 · 3시간 전", duration: "12:41", category: "스포츠", gradient: "linear-gradient(135deg,#ff3155,#54102a 54%,#111119)", icon: "⚾" },
  { id: 2, title: "새벽 2시에 시작한 공포게임이 이상하다", channel: "404 플레이룸", meta: "8.7만회 · 6시간 전", duration: "24:08", category: "게임", gradient: "linear-gradient(135deg,#7657ff,#241b55 52%,#09090d)", icon: "👁" },
  { id: 3, title: "웹사이트 디자인, 여기 하나만 바꿔도 달라집니다", channel: "Pixel Lab", meta: "3.1만회 · 어제", duration: "09:32", category: "IT", gradient: "linear-gradient(135deg,#20c997,#0b485b 56%,#0b0b0d)", icon: "⌨" },
  { id: 4, title: "10분 동안 아무 생각 없이 듣는 밤 라디오", channel: "새벽 주파수", meta: "19만회 · 2일 전", duration: "10:00", category: "음악", gradient: "linear-gradient(135deg,#1b2d63,#40206a 50%,#0b0b0d)", icon: "♫" },
  { id: 5, title: "태블릿 하나로 그림 작업 어디까지 가능할까?", channel: "모노 드로잉", meta: "5.4만회 · 2일 전", duration: "15:17", category: "그림", gradient: "linear-gradient(135deg,#ffb36b,#e35d8d 48%,#362252)", icon: "✎" },
  { id: 6, title: "오늘 꼭 알아야 할 테크 소식 7가지", channel: "D Tech", meta: "22만회 · 4시간 전", duration: "08:44", category: "뉴스", gradient: "linear-gradient(135deg,#216cff,#16205a 54%,#0b0b0d)", icon: "D" },
  { id: 7, title: "친구들이랑 하루 종일 아무 계획 없이 돌아다녀봄", channel: "오늘의 우리", meta: "14만회 · 1일 전", duration: "18:29", category: "일상", gradient: "linear-gradient(135deg,#ffcf66,#ff7b57 48%,#47283f)", icon: "☀" },
  { id: 8, title: "이 장면 하나 그리는데 6시간 걸렸습니다", channel: "모노 드로잉", meta: "4.8만회 · 3일 전", duration: "11:56", category: "그림", gradient: "linear-gradient(135deg,#91f1ca,#5d60d8 52%,#17172c)", icon: "✦" },
];

const liveChannels = [
  { id: 101, channel: "드가이 스포츠", title: "오늘 경기, 같이 멸망하거나 살아남기", viewers: "1.2K", icon: "⚾", gradient: "linear-gradient(135deg,#ff3155,#77152f 52%,#141418)" },
  { id: 102, channel: "Pixel Lab", title: "새 프로젝트 UI 같이 만들기", viewers: "428", icon: "⌘", gradient: "linear-gradient(135deg,#7657ff,#2d347d 50%,#101014)" },
  { id: 103, channel: "새벽 주파수", title: "신곡 작업실 LIVE", viewers: "3.8K", icon: "♫", gradient: "linear-gradient(135deg,#ff5fa2,#612c87 50%,#101014)" },
];

const clips = [
  { id: 201, title: "이게 왜 홈런이 아니냐고", channel: "@dguy", stat: "82K", gradient: "linear-gradient(180deg,#ff795e,#421629 55%,#0d0d12)" },
  { id: 202, title: "3초 뒤에 분위기 바뀜", channel: "@404play", stat: "41K", gradient: "linear-gradient(180deg,#5264ff,#26174a 55%,#0d0d12)" },
  { id: 203, title: "선 하나로 그림 살리는 법", channel: "@mono", stat: "120K", gradient: "linear-gradient(180deg,#ffd6a3,#a36ad5 55%,#111119)" },
  { id: 204, title: "키보드 소리만 듣고 맞히기", channel: "@dtech", stat: "67K", gradient: "linear-gradient(180deg,#45d4bb,#154d64 55%,#0d0d12)" },
  { id: 205, title: "오늘 하늘 진짜 미쳤다", channel: "@todayus", stat: "98K", gradient: "linear-gradient(180deg,#68b8ff,#6653a1 55%,#171725)" },
];

const categories = ["전체", "스포츠", "게임", "IT", "음악", "그림", "뉴스", "일상"];
const dockItems = [["⌂", "홈"], ["◉", "LIVE"], ["▷", "클립"], ["▦", "채널"], ["◎", "MY"]] as const;

export default function Home() {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [category, setCategory] = useState("전체");
  const [dock, setDock] = useState("홈");
  const [notice, setNotice] = useState<string | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return videos.filter((video) => {
      const categoryMatch = category === "전체" || video.category === category;
      const queryMatch = !q || `${video.title} ${video.channel} ${video.category}`.toLowerCase().includes(q);
      return categoryMatch && queryMatch;
    });
  }, [category, query]);

  const showNotice = (text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(null), 2200);
  };

  const goDock = (label: string) => {
    setDock(label);
    if (label === "홈") window.scrollTo({ top: 0, behavior: "smooth" });
    else if (label === "LIVE") document.getElementById("on-air")?.scrollIntoView({ behavior: "smooth" });
    else if (label === "클립") window.location.href = "/clips";
    else if (label === "채널") document.getElementById("channels")?.scrollIntoView({ behavior: "smooth" });
    else showNotice("MY 페이지는 다음 단계에서 연결할게요 ◎");
  };

  return (
    <main className="d2-shell">
      <style>{homeStyles}</style>

      <header className="d2-topbar">
        <div className="d2-brand-wrap">
          <a href="#top" className="d2-brand" aria-label="DTV 홈">
            <span className="d2-brand-mark">D</span><span className="d2-brand-tv">TV</span><i>● SIGNAL ON</i>
          </a>
        </div>

        <button className="d2-search-trigger" onClick={() => setSearchOpen(true)}>
          <span>⌕</span><b>무엇을 보고 싶어?</b><kbd>⌘ K</kbd>
        </button>

        <div className="d2-actions">
          <button className="d2-create" onClick={() => showNotice("방송 만들기는 다음 단계에서 연결할게요 📡")}>＋ <span>방송 만들기</span></button>
          <SiteThemeMenu compact />
          <button className="d2-icon" aria-label="알림" onClick={() => setNotificationsOpen((value) => !value)}>
            ♢{hasUnreadNotifications && <span className="d2-unread" />}
          </button>
          <button className="d2-profile" onClick={() => showNotice("프로필 준비 중 ◎")}>D</button>
        </div>
      </header>

      <NotificationPanel open={notificationsOpen} onClose={() => setNotificationsOpen(false)} onUnreadChange={setHasUnreadNotifications} />

      {searchOpen && (
        <div className="d2-search-layer" role="dialog" aria-modal="true" aria-label="DTV 검색">
          <button className="d2-search-backdrop" aria-label="검색 닫기" onClick={() => setSearchOpen(false)} />
          <section className="d2-search-panel">
            <div className="d2-search-input">
              <span>⌕</span>
              <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="영상, 채널, LIVE를 한 번에 검색" />
              <button onClick={() => setSearchOpen(false)}>ESC</button>
            </div>
            <div className="d2-search-columns">
              <div><small>VIDEO SIGNALS</small>{filtered.slice(0, 3).map((video) => <a key={video.id} href={`/watch/${video.id}`}><i style={{ background: video.gradient }}>{video.icon}</i><span><b>{video.title}</b><em>{video.channel} · {video.meta}</em></span></a>)}</div>
              <div><small>LIVE NOW</small>{liveChannels.slice(0, 2).map((live) => <button key={live.id} onClick={() => { setSearchOpen(false); document.getElementById("on-air")?.scrollIntoView({ behavior: "smooth" }); }}><i className="live">●</i><span><b>{live.channel}</b><em>{live.title}</em></span></button>)}</div>
            </div>
          </section>
        </div>
      )}

      <div id="top" className="d2-page">
        <section className="d2-hero" id="on-air">
          <div className="d2-hero-copy">
            <span className="d2-kicker"><i /> ON AIR · CHANNEL 01</span>
            <h1>지금, 이 순간이<br /><strong>방송이 된다.</strong></h1>
            <p>영상 창고가 아니라 살아 움직이는 인터넷 방송국. 지금 켜진 신호부터 들어가 보세요.</p>
            <div className="d2-hero-buttons">
              <a href="/watch/101">▶ 지금 방송 보기</a>
              <button onClick={() => document.getElementById("signal-feed")?.scrollIntoView({ behavior: "smooth" })}>내 신호 둘러보기 ↓</button>
            </div>
          </div>

          <a href="/watch/101" className="d2-main-broadcast" style={{ "--broadcast": liveChannels[0].gradient } as CSSProperties}>
            <div className="d2-broadcast-top"><span>● LIVE</span><span>DTV SPORTS · CH 01</span></div>
            <div className="d2-broadcast-center"><b>⚾</b><span>오늘 경기<br />같이 봅시다</span></div>
            <div className="d2-broadcast-bottom"><span><b>드가이 스포츠</b><em>1.2K명 시청 중</em></span><i>▶</i></div>
          </a>

          <aside className="d2-live-rail">
            <div className="d2-rail-title"><span>지금 뜨는 채널</span><b>3 SIGNALS</b></div>
            {liveChannels.map((live, index) => (
              <a href={`/watch/${live.id}`} key={live.id} className={index === 0 ? "active" : ""}>
                <i style={{ background: live.gradient }}>{live.icon}</i>
                <span><b>{live.channel}</b><em>{live.title}</em></span>
                <small>{live.viewers}</small>
              </a>
            ))}
          </aside>
        </section>

        <section className="d2-section d2-now" id="channels">
          <div className="d2-section-head">
            <div><span className="d2-kicker"><i /> CHANNEL SURF</span><h2>주파수 맞추기</h2></div>
            <p>카테고리를 고르면 홈 전체가 그 신호에 맞춰집니다.</p>
          </div>
          <div className="d2-frequency-row">
            {categories.map((item, index) => (
              <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>
                <small>{String(index + 1).padStart(2, "0")}</small><b>{item}</b><span>{category === item ? "● TUNED" : "TUNE"}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="d2-section" id="clips">
          <div className="d2-section-head">
            <div><span className="d2-kicker purple">FLASH SIGNALS</span><h2>지금 이 장면이 뜬다</h2></div>
            <button className="d2-link" onClick={() => { window.location.href = "/clips"; }}>클립 신호 열기 →</button>
          </div>
          <div className="d2-clips">
            {clips.map((clip, index) => (
              <button key={clip.id} className={`d2-clip c${index + 1}`} onClick={() => { window.location.href = "/clips"; }}>
                <div style={{ "--clip": clip.gradient } as CSSProperties}><span>CLIP {String(index + 1).padStart(2, "0")}</span><b>▶</b><small>♥ {clip.stat}</small></div>
                <strong>{clip.title}</strong><em>{clip.channel}</em>
              </button>
            ))}
          </div>
        </section>

        <section className="d2-section" id="signal-feed">
          <div className="d2-section-head">
            <div><span className="d2-kicker blue">YOUR SIGNAL</span><h2>{query ? `“${query}”에서 잡힌 신호` : category === "전체" ? "당신에게 들어온 방송" : `${category} 주파수`}</h2></div>
            <span className="d2-result-count">{filtered.length} SIGNALS</span>
          </div>

          {filtered.length ? (
            <div className="d2-signal-grid">
              {filtered.map((video, index) => (
                <a href={`/watch/${video.id}`} className={`d2-signal-card s${(index % 6) + 1}`} key={video.id}>
                  <div className="d2-signal-art" style={{ "--signal": video.gradient } as CSSProperties}>
                    <span>{video.category.toUpperCase()} · CH {String(video.id).padStart(2, "0")}</span>
                    <b>{video.icon}</b>
                    <small>{video.duration}</small>
                    <i>▶</i>
                  </div>
                  <div className="d2-signal-info"><strong>{video.title}</strong><span>{video.channel}</span><em>{video.meta}</em></div>
                </a>
              ))}
            </div>
          ) : (
            <div className="d2-empty"><b>NO SIGNAL</b><p>이 주파수에서는 아직 방송이 잡히지 않아요.</p><button onClick={() => { setCategory("전체"); setQuery(""); }}>전체 신호로 복귀</button></div>
          )}
        </section>
      </div>

      <nav className="d2-dock" aria-label="DTV 주요 메뉴">
        {dockItems.map(([icon, label]) => <button key={label} className={dock === label ? "active" : ""} onClick={() => goDock(label)}><span>{icon}</span><b>{label}</b></button>)}
      </nav>

      {notice && <div className="d2-toast">{notice}</div>}
    </main>
  );
}

const homeStyles = `
.d2-shell{--ink:#f7f7fb;--muted:#9c9ca9;--line:rgba(255,255,255,.09);--panel:#15151b;--panel2:#1c1c24;min-height:100vh;background:#0b0b0e;color:var(--ink);font-family:Inter,Pretendard,system-ui,-apple-system,sans-serif;padding-bottom:110px}.d2-shell *{box-sizing:border-box}.d2-shell button,.d2-shell input{font:inherit}.d2-shell button{color:inherit}.d2-topbar{height:72px;position:sticky;top:0;z-index:60;display:grid;grid-template-columns:1fr minmax(260px,520px) 1fr;align-items:center;padding:0 34px;border-bottom:1px solid var(--line);background:rgba(11,11,14,.86);backdrop-filter:blur(24px)}.d2-brand{display:flex;align-items:center;gap:7px;color:white;text-decoration:none;width:max-content}.d2-brand-mark{display:grid;place-items:center;width:34px;height:34px;border-radius:11px;background:#ff3155;font-size:21px;font-weight:950;box-shadow:0 0 28px rgba(255,49,85,.26)}.d2-brand-tv{font-size:20px;font-weight:950;letter-spacing:-1px}.d2-brand i{font-style:normal;font-size:9px;letter-spacing:1.6px;color:#6e6e7d;margin-left:5px}.d2-search-trigger{height:42px;border:1px solid var(--line);background:#141419;border-radius:14px;padding:0 11px 0 15px;display:flex;align-items:center;gap:10px;cursor:pointer;color:#777785}.d2-search-trigger>b{font-weight:650;flex:1;text-align:left}.d2-search-trigger kbd{border:1px solid var(--line);background:#202028;color:#8b8b99;border-radius:7px;padding:4px 7px;font-size:10px}.d2-actions{display:flex;justify-content:flex-end;align-items:center;gap:8px}.d2-create,.d2-icon,.d2-profile{border:1px solid var(--line);background:#17171d;cursor:pointer}.d2-create{height:38px;border-radius:12px;padding:0 13px;font-weight:750}.d2-icon,.d2-profile{width:38px;height:38px;border-radius:12px;position:relative}.d2-profile{border-radius:50%;background:linear-gradient(135deg,#ff3155,#7657ff);font-weight:900}.d2-unread{position:absolute;width:7px;height:7px;background:#ff3155;border-radius:50%;right:7px;top:7px}.d2-page{width:min(1500px,calc(100% - 64px));margin:0 auto}.d2-hero{min-height:620px;padding:54px 0 50px;display:grid;grid-template-columns:.92fr 1.45fr .78fr;gap:20px;align-items:stretch;border-bottom:1px solid var(--line)}.d2-hero-copy{display:flex;flex-direction:column;justify-content:center;padding:10px 26px 10px 4px}.d2-kicker{font-size:10px;letter-spacing:2.4px;font-weight:900;color:#a3a3b1}.d2-kicker i{display:inline-block;width:7px;height:7px;background:#ff3155;border-radius:50%;margin-right:7px;box-shadow:0 0 14px #ff3155}.d2-kicker.purple{color:#bdafff}.d2-kicker.blue{color:#81b6ff}.d2-hero-copy h1{font-size:clamp(44px,5vw,76px);line-height:.98;letter-spacing:-4px;margin:20px 0 22px}.d2-hero-copy h1 strong{color:#ff3155;font-weight:950}.d2-hero-copy p{color:var(--muted);font-size:15px;line-height:1.75;max-width:430px;margin:0}.d2-hero-buttons{display:flex;gap:10px;margin-top:31px}.d2-hero-buttons a,.d2-hero-buttons button{height:45px;padding:0 16px;border-radius:13px;border:1px solid var(--line);display:flex;align-items:center;text-decoration:none;font-weight:800;cursor:pointer}.d2-hero-buttons a{background:#f6f6f8;color:#111116}.d2-hero-buttons button{background:#18181f}.d2-main-broadcast{--broadcast:#222;position:relative;overflow:hidden;border-radius:28px;border:1px solid rgba(255,255,255,.14);background:var(--broadcast);color:white;text-decoration:none;min-height:510px;padding:24px;display:flex;flex-direction:column;box-shadow:0 28px 80px rgba(0,0,0,.35)}.d2-main-broadcast:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 80% 10%,rgba(255,255,255,.18),transparent 34%),linear-gradient(180deg,transparent 48%,rgba(0,0,0,.48))}.d2-broadcast-top,.d2-broadcast-center,.d2-broadcast-bottom{position:relative;z-index:1}.d2-broadcast-top{display:flex;justify-content:space-between;font-size:10px;font-weight:900;letter-spacing:1.4px}.d2-broadcast-top span:first-child{background:#ff3155;border-radius:7px;padding:5px 7px}.d2-broadcast-center{margin:auto;display:flex;align-items:center;gap:22px}.d2-broadcast-center b{font-size:74px}.d2-broadcast-center span{font-size:clamp(28px,3vw,48px);font-weight:950;line-height:1.03;letter-spacing:-2px}.d2-broadcast-bottom{display:flex;align-items:end;justify-content:space-between}.d2-broadcast-bottom span{display:flex;flex-direction:column;gap:4px}.d2-broadcast-bottom b{font-size:16px}.d2-broadcast-bottom em{font-size:11px;color:#ddd;font-style:normal}.d2-broadcast-bottom>i{font-style:normal;width:56px;height:56px;background:white;color:#111;border-radius:50%;display:grid;place-items:center;font-size:20px}.d2-live-rail{border:1px solid var(--line);background:#121217;border-radius:24px;padding:17px;display:flex;flex-direction:column;gap:8px}.d2-rail-title{display:flex;justify-content:space-between;align-items:center;padding:7px 5px 12px}.d2-rail-title span{font-size:13px;font-weight:850}.d2-rail-title b{font-size:8px;letter-spacing:1.5px;color:#676775}.d2-live-rail a{display:grid;grid-template-columns:48px 1fr auto;gap:11px;align-items:center;padding:10px;border:1px solid transparent;border-radius:15px;color:white;text-decoration:none;min-width:0}.d2-live-rail a:hover,.d2-live-rail a.active{background:#1c1c24;border-color:var(--line)}.d2-live-rail a>i{width:48px;height:48px;border-radius:14px;display:grid;place-items:center;font-style:normal;font-size:20px}.d2-live-rail a>span{min-width:0;display:flex;flex-direction:column;gap:4px}.d2-live-rail a b,.d2-live-rail a em{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.d2-live-rail a b{font-size:12px}.d2-live-rail a em{font-size:10px;color:#858594;font-style:normal}.d2-live-rail a small{font-size:9px;color:#ff6c83;font-weight:800}.d2-section{padding:54px 0;border-bottom:1px solid var(--line)}.d2-section-head{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:22px}.d2-section-head h2{font-size:28px;letter-spacing:-1.3px;margin:7px 0 0}.d2-section-head p,.d2-result-count{color:#777785;font-size:11px}.d2-link{border:0;background:none;color:#aaaab7;cursor:pointer;font-weight:750;font-size:12px}.d2-frequency-row{display:grid;grid-template-columns:repeat(8,1fr);gap:8px}.d2-frequency-row button{height:96px;border:1px solid var(--line);border-radius:17px;background:#141419;display:grid;grid-template-columns:auto 1fr;grid-template-rows:1fr 1fr;padding:14px;text-align:left;cursor:pointer;transition:.2s}.d2-frequency-row button:hover{transform:translateY(-2px);background:#1b1b22}.d2-frequency-row button.active{background:#f2f2f5;color:#111116}.d2-frequency-row small{font-size:9px;color:#70707c}.d2-frequency-row b{justify-self:end;font-size:13px}.d2-frequency-row span{grid-column:1/3;align-self:end;font-size:8px;letter-spacing:1.3px;color:#747481}.d2-frequency-row button.active span{color:#ff3155}.d2-clips{display:grid;grid-template-columns:1.25fr .8fr .8fr .8fr .8fr;gap:12px;align-items:start}.d2-clip{border:0;background:none;padding:0;text-align:left;cursor:pointer;min-width:0}.d2-clip>div{height:260px;border-radius:22px;background:var(--clip);position:relative;overflow:hidden;padding:15px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:inset 0 0 0 1px rgba(255,255,255,.1)}.d2-clip.c1>div{height:326px}.d2-clip>div:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.07),transparent 35%,rgba(0,0,0,.25))}.d2-clip div span,.d2-clip div b,.d2-clip div small{position:relative;z-index:1}.d2-clip div span{font-size:9px;letter-spacing:1.5px;font-weight:900}.d2-clip div b{margin:auto;font-size:26px}.d2-clip div small{font-size:10px}.d2-clip strong,.d2-clip em{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.d2-clip strong{font-size:12px;margin:11px 1px 5px}.d2-clip em{font-size:10px;color:#777785;font-style:normal}.d2-signal-grid{display:grid;grid-template-columns:repeat(12,1fr);gap:14px}.d2-signal-card{grid-column:span 4;color:white;text-decoration:none;min-width:0}.d2-signal-card.s1,.d2-signal-card.s6{grid-column:span 7}.d2-signal-card.s2,.d2-signal-card.s5{grid-column:span 5}.d2-signal-card.s3,.d2-signal-card.s4{grid-column:span 6}.d2-signal-art{height:260px;background:var(--signal);border-radius:23px;position:relative;overflow:hidden;padding:17px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.1)}.d2-signal-card.s1 .d2-signal-art,.d2-signal-card.s6 .d2-signal-art{height:330px}.d2-signal-art:after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 75% 20%,rgba(255,255,255,.17),transparent 30%)}.d2-signal-art>span,.d2-signal-art>small,.d2-signal-art>i,.d2-signal-art>b{position:absolute;z-index:1}.d2-signal-art>span{top:16px;left:17px;font-size:9px;letter-spacing:1.5px;font-weight:900}.d2-signal-art>b{position:relative;font-size:56px}.d2-signal-art>small{bottom:15px;right:15px;background:rgba(0,0,0,.52);border-radius:7px;padding:4px 6px}.d2-signal-art>i{bottom:15px;left:15px;width:37px;height:37px;background:rgba(255,255,255,.9);color:#111;border-radius:50%;display:grid;place-items:center;font-style:normal}.d2-signal-info{padding:12px 4px 5px;display:grid;grid-template-columns:1fr auto;gap:5px 12px}.d2-signal-info strong{grid-column:1/3;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.d2-signal-info span,.d2-signal-info em{font-size:10px;color:#858594;font-style:normal}.d2-empty{border:1px dashed #33333e;border-radius:25px;padding:70px;text-align:center;color:#777785}.d2-empty b{font-size:26px;color:#444451;letter-spacing:4px}.d2-empty button{border:1px solid var(--line);background:#1b1b22;border-radius:10px;padding:9px 12px;cursor:pointer}.d2-dock{position:fixed;z-index:70;left:50%;bottom:18px;transform:translateX(-50%);display:flex;gap:5px;padding:7px;border:1px solid rgba(255,255,255,.12);background:rgba(20,20,26,.87);backdrop-filter:blur(24px);border-radius:20px;box-shadow:0 18px 50px rgba(0,0,0,.45)}.d2-dock button{border:0;background:transparent;border-radius:14px;min-width:68px;height:52px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;color:#7b7b89;cursor:pointer}.d2-dock button span{font-size:17px}.d2-dock button b{font-size:9px}.d2-dock button.active{background:#f4f4f6;color:#111116}.d2-toast{position:fixed;z-index:90;left:50%;bottom:90px;transform:translateX(-50%);background:#f4f4f6;color:#111116;border-radius:13px;padding:11px 15px;font-size:12px;font-weight:800;box-shadow:0 15px 40px rgba(0,0,0,.4)}.d2-search-layer{position:fixed;inset:0;z-index:100;display:grid;place-items:start center;padding-top:90px}.d2-search-backdrop{position:absolute;inset:0;border:0;background:rgba(0,0,0,.68);backdrop-filter:blur(10px)}.d2-search-panel{position:relative;width:min(760px,calc(100% - 32px));border:1px solid rgba(255,255,255,.13);background:#15151b;border-radius:22px;box-shadow:0 30px 100px rgba(0,0,0,.6);overflow:hidden}.d2-search-input{height:66px;display:flex;align-items:center;gap:11px;padding:0 15px;border-bottom:1px solid var(--line)}.d2-search-input input{flex:1;background:none;border:0;outline:0;color:white;font-size:16px}.d2-search-input button{border:1px solid var(--line);background:#22222a;border-radius:7px;font-size:9px;padding:5px 7px;cursor:pointer}.d2-search-columns{display:grid;grid-template-columns:1.15fr .85fr;gap:1px;background:var(--line)}.d2-search-columns>div{background:#15151b;padding:18px}.d2-search-columns small{display:block;color:#696977;font-size:9px;letter-spacing:1.5px;margin-bottom:8px}.d2-search-columns a,.d2-search-columns button{width:100%;border:0;background:none;color:white;text-decoration:none;display:grid;grid-template-columns:42px 1fr;gap:10px;padding:8px;border-radius:11px;text-align:left;cursor:pointer}.d2-search-columns a:hover,.d2-search-columns button:hover{background:#202027}.d2-search-columns i{width:42px;height:42px;border-radius:10px;display:grid;place-items:center;font-style:normal}.d2-search-columns i.live{color:#ff3155;background:#26141a}.d2-search-columns span{min-width:0;display:flex;flex-direction:column;justify-content:center;gap:3px}.d2-search-columns b,.d2-search-columns em{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.d2-search-columns b{font-size:11px}.d2-search-columns em{font-size:9px;font-style:normal;color:#81818f}
@media(max-width:1100px){.d2-topbar{grid-template-columns:auto 1fr auto;padding:0 18px}.d2-brand i,.d2-create span{display:none}.d2-search-trigger{margin:0 15px}.d2-page{width:min(100% - 36px,1000px)}.d2-hero{grid-template-columns:1fr 1.25fr}.d2-live-rail{grid-column:1/3;display:grid;grid-template-columns:repeat(3,1fr)}.d2-rail-title{grid-column:1/4}.d2-frequency-row{grid-template-columns:repeat(4,1fr)}.d2-clips{grid-template-columns:1.2fr 1fr 1fr}.d2-clip:nth-child(n+4){display:none}}
@media(max-width:720px){.d2-shell{padding-bottom:92px}.d2-topbar{height:62px;padding:0 12px}.d2-brand-mark{width:31px;height:31px}.d2-brand-tv{font-size:18px}.d2-search-trigger{justify-content:center;width:40px;margin-left:auto;padding:0}.d2-search-trigger b,.d2-search-trigger kbd{display:none}.d2-create,.d2-actions>div{display:none}.d2-page{width:calc(100% - 24px)}.d2-hero{padding:28px 0 35px;display:block;min-height:0}.d2-hero-copy{padding:12px 4px 28px}.d2-hero-copy h1{font-size:48px;letter-spacing:-3px}.d2-main-broadcast{min-height:390px;border-radius:22px}.d2-live-rail{display:none}.d2-section{padding:38px 0}.d2-section-head{align-items:start}.d2-section-head p{display:none}.d2-frequency-row{display:flex;overflow:auto;padding-bottom:5px}.d2-frequency-row button{min-width:105px}.d2-clips{display:flex;overflow-x:auto}.d2-clip,.d2-clip.c1{min-width:180px}.d2-clip>div,.d2-clip.c1>div{height:285px}.d2-signal-grid{display:block}.d2-signal-card{display:block;margin-bottom:22px}.d2-signal-art,.d2-signal-card.s1 .d2-signal-art,.d2-signal-card.s6 .d2-signal-art{height:220px;border-radius:18px}.d2-dock{width:calc(100% - 24px);bottom:10px;justify-content:space-between}.d2-dock button{min-width:0;flex:1}.d2-search-columns{grid-template-columns:1fr}.d2-search-columns>div:nth-child(2){display:none}}
`;
