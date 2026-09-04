"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

type SettingsView = "main" | "quality" | "speed" | "captions";

const comments = [
  { user: "@eagle26", text: "오늘은 진짜 끝까지 본다 ㅋㅋㅋ", time: "2분 전", pinned: true },
  { user: "@pixel", text: "플레이어 UI 깔끔해졌네", time: "8분 전", pinned: false },
  { user: "@radio", text: "자막도 잘 보임", time: "14분 전", pinned: false },
];

export default function WatchPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params?.id || 1);
  const isLive = id >= 101;

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [saved, setSaved] = useState(false);
  const [captions, setCaptions] = useState(true);
  const [captionLanguage, setCaptionLanguage] = useState("한국어");
  const [quality, setQuality] = useState("1080p");
  const [speed, setSpeed] = useState("1x");
  const [autoplay, setAutoplay] = useState(true);
  const [mini, setMini] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsView, setSettingsView] = useState<SettingsView>("main");
  const [share, setShare] = useState(false);
  const [report, setReport] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [chat, setChat] = useState([
    "@dguy: 시작한다 📡",
    "@viewer12: 오늘 화질 좋다",
    "@eagle26: 가자아아",
  ]);

  const title = useMemo(
    () => (isLive ? "오늘 경기 같이 보기 LIVE" : "한화는 대체 왜 이러는가 | 오늘 경기 같이 보기"),
    [isLive],
  );

  const show = (text: string) => {
    setToast(text);
    window.setTimeout(() => setToast(null), 1600);
  };

  const closeSettings = () => {
    setSettingsOpen(false);
    setSettingsView("main");
  };

  const choose = (label: string, action: () => void) => {
    action();
    setSettingsView("main");
    show(`${label} 설정 적용됨`);
  };

  useEffect(() => {
    if (!settingsOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSettings();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [settingsOpen]);

  return (
    <main className="pf-shell">
      <style>{watchStyles}</style>
      <div className="pf-wrap">
        <header className="pf-head">
          <div>
            <span className="pf-kicker">DTV WATCH · {isLive ? "ON AIR" : "VIDEO"}</span>
            <h1 className="pf-title" style={{ fontSize: "clamp(25px,3vw,42px)" }}>{title}</h1>
          </div>
          <div className="pf-actions">
            <a className="pf-btn" href="/">홈</a>
            <a className="pf-btn" href="/library">보관함</a>
          </div>
        </header>

        <div className="pf-grid">
          <section className={`pf-card ${isLive ? "pf-span8" : "pf-span12"}`} style={{ padding: 12 }}>
            <div className="pf-player wv-player" style={mini ? { maxWidth: 520, marginLeft: "auto" } : {}}>
              <span className="pf-playicon">{isLive ? "●" : "⚾"}</span>
              <div className="pf-playerbar">
                <button onClick={() => show("재생 / 일시정지")}>▶</button>
                <div className="grow"><i /></div>
                <button onClick={() => setCaptions((value) => !value)}>CC {captions ? "ON" : "OFF"}</button>
                <button
                  aria-label="재생 설정"
                  className={settingsOpen ? "wv-setting-active" : ""}
                  onClick={() => {
                    setSettingsView("main");
                    setSettingsOpen(true);
                  }}
                >
                  ⚙
                </button>
                <button onClick={() => setMini((value) => !value)}>▣</button>
                <button onClick={() => show("전체화면 전환")}>⛶</button>
              </div>
            </div>
          </section>

          {isLive && (
            <aside className="pf-card pf-span4">
              <div className="pf-between"><h2>LIVE 채팅</h2><span className="pf-status good">1.2K 접속</span></div>
              <div className="pf-chat" style={{ marginTop: 10 }}>{chat.map((item, index) => <p key={index}>{item}</p>)}</div>
              <form
                className="pf-row"
                onSubmit={(event) => {
                  event.preventDefault();
                  setChat((value) => [...value, "@me: 채팅 전송 테스트"]);
                }}
              >
                <input className="pf-search" placeholder="메시지 보내기" />
                <button className="pf-btn primary">전송</button>
              </form>
            </aside>
          )}

          <section className="pf-card pf-span8">
            <div className="pf-between">
              <div>
                <div className="pf-row">
                  <div className="pf-avatar">D</div>
                  <div><h3>드가이 스포츠</h3><p style={{ margin: 0 }}>구독자 12.8만 · CH 01</p></div>
                  <button className={`pf-btn ${subscribed ? "" : "primary"}`} onClick={() => setSubscribed((value) => !value)}>
                    {subscribed ? "주파수 고정됨 ✓" : "주파수 저장"}
                  </button>
                </div>
              </div>
              <div className="pf-actions">
                <button className={`pf-btn ${liked ? "red" : ""}`} onClick={() => { setLiked((value) => !value); setDisliked(false); }}>♥ 8.2K</button>
                <button className={`pf-btn ${disliked ? "danger" : ""}`} onClick={() => { setDisliked((value) => !value); setLiked(false); }}>싫어요</button>
                <button className={`pf-btn ${saved ? "primary" : ""}`} onClick={() => setSaved((value) => !value)}>▣ {saved ? "저장됨" : "보관"}</button>
              </div>
            </div>
            <div className="pf-divider" />
            <p>조회수 128,403회 · 3시간 전 · #스포츠 #야구 #DTV</p>
            <p>오늘 경기 흐름을 같이 보면서 이야기합니다. 재생 설정은 영상을 떠나지 않고 플레이어 위 팝업에서 바꿀 수 있습니다.</p>
            <div className="pf-actions">
              <button className="pf-btn" onClick={() => setShare(true)}>↗ 공유</button>
              <button className="pf-btn" onClick={() => show("임베드 코드 복사됨 <iframe …>")}>⌘ 임베드</button>
              <button className="pf-btn" onClick={() => show("이 영상은 추천에서 덜 보이게 됩니다")}>관심 없음</button>
              <button className="pf-btn" onClick={() => show("이 채널을 추천에서 제외했습니다")}>채널 추천 안 함</button>
              <button className="pf-btn danger" onClick={() => setReport(true)}>신고 / 차단</button>
            </div>
          </section>

          <aside className="pf-card pf-span4">
            <h2>다음 신호</h2>
            <div className="pf-list" style={{ marginTop: 10 }}>
              {[
                ["⌨", "웹사이트 디자인 하나만 바꿔도 달라집니다"],
                ["👁", "새벽 2시에 시작한 공포게임이 이상하다"],
                ["♫", "10분 밤 라디오"],
              ].map((item, index) => (
                <a className="pf-item" href={`/watch/${index + 2}`} key={item[1]} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="pf-thumb">{item[0]}</div><div><b>{item[1]}</b><small>DTV 추천</small></div><span>▶</span>
                </a>
              ))}
            </div>
          </aside>

          <section className="pf-card pf-span8">
            <div className="pf-between"><h2>댓글 1,428</h2><select className="pf-btn"><option>인기순</option><option>최신순</option></select></div>
            <form className="pf-row" style={{ margin: "12px 0" }} onSubmit={(event) => { event.preventDefault(); show("댓글 등록"); }}>
              <input className="pf-search" placeholder="댓글 추가..." /><button className="pf-btn primary">등록</button>
            </form>
            {comments.map((comment, index) => (
              <article className={`pf-comment ${comment.pinned ? "pinned" : ""}`} key={index}>
                {comment.pinned && <span className="pf-kicker">📌 고정 댓글</span>}
                <b>{comment.user}</b><p>{comment.text}</p>
                <div className="pf-actions"><button className="pf-btn">♥ 좋아요</button><button className="pf-btn">답글</button><button className="pf-btn">⋯</button><small>{comment.time}</small></div>
                {index === 0 && <div className="pf-note" style={{ marginTop: 8 }}>↳ @dguy: 같이 봐줘서 고마워요 📡</div>}
              </article>
            ))}
          </section>
        </div>

        {settingsOpen && (
          <div className="wv-settings-layer">
            <button className="wv-settings-backdrop" aria-label="재생 설정 닫기" onClick={closeSettings} />
            <section className="wv-settings-window" role="dialog" aria-modal="true" aria-label="재생 설정">
              <header className="wv-settings-head">
                <div>
                  <small>DTV PLAYBACK</small>
                  <strong>{settingsView === "main" ? "재생 설정" : settingsView === "quality" ? "화질" : settingsView === "speed" ? "재생 속도" : "자막"}</strong>
                </div>
                <button aria-label="닫기" onClick={closeSettings}>×</button>
              </header>

              {settingsView === "main" && (
                <div className="wv-settings-list">
                  <button onClick={() => setSettingsView("quality")}><span>화질</span><b>{quality}</b><i>›</i></button>
                  <button disabled={isLive} onClick={() => setSettingsView("speed")}><span>재생 속도</span><b>{isLive ? "LIVE" : speed}</b><i>›</i></button>
                  <button onClick={() => setSettingsView("captions")}><span>자막</span><b>{captions ? captionLanguage : "사용 안 함"}</b><i>›</i></button>
                  <label className="wv-toggle">
                    <span><b>자동재생</b><small>다음 추천 영상을 이어서 재생</small></span>
                    <input type="checkbox" checked={autoplay} onChange={(event) => setAutoplay(event.target.checked)} />
                  </label>
                  <a className="wv-advanced" href="/settings">고급 설정 <span>›</span></a>
                </div>
              )}

              {settingsView === "quality" && (
                <SettingsOptions
                  current={quality}
                  items={["자동", "2160p", "1080p", "720p", "480p"]}
                  onBack={() => setSettingsView("main")}
                  onPick={(value) => choose(`화질 ${value}`, () => setQuality(value))}
                />
              )}

              {settingsView === "speed" && (
                <SettingsOptions
                  current={speed}
                  items={["0.75x", "1x", "1.25x", "1.5x", "2x"]}
                  onBack={() => setSettingsView("main")}
                  onPick={(value) => choose(`배속 ${value}`, () => setSpeed(value))}
                />
              )}

              {settingsView === "captions" && (
                <div className="wv-options">
                  <button className="wv-back" onClick={() => setSettingsView("main")}>‹ 재생 설정</button>
                  <button className={!captions ? "selected" : ""} onClick={() => choose("자막 끄기", () => setCaptions(false))}>
                    <span>사용 안 함</span>{!captions && <b>✓</b>}
                  </button>
                  {["한국어", "English", "日本語"].map((language) => (
                    <button
                      key={language}
                      className={captions && captionLanguage === language ? "selected" : ""}
                      onClick={() => choose(`자막 ${language}`, () => { setCaptions(true); setCaptionLanguage(language); })}
                    >
                      <span>{language}</span>{captions && captionLanguage === language && <b>✓</b>}
                    </button>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {share && (
          <div className="pf-card wv-center-modal">
            <div className="pf-between"><h2>공유</h2><button className="pf-btn" onClick={() => setShare(false)}>×</button></div>
            <div className="pf-field" style={{ marginTop: 12 }}><label>영상 링크</label><input readOnly value={`https://dtv.example/watch/${id}`} /></div>
            <div className="pf-actions" style={{ marginTop: 12 }}><button className="pf-btn primary" onClick={() => show("링크 복사됨")}>링크 복사</button><button className="pf-btn">메시지</button><button className="pf-btn">커뮤니티</button></div>
          </div>
        )}

        {report && (
          <div className="pf-card wv-center-modal">
            <div className="pf-between"><h2>신고 · 차단</h2><button className="pf-btn" onClick={() => setReport(false)}>×</button></div>
            <div className="pf-stack" style={{ marginTop: 12 }}>
              {["스팸 또는 오해의 소지가 있는 콘텐츠", "괴롭힘 또는 혐오 표현", "부적절한 연령 등급", "저작권 문제"].map((item) => (
                <button className="pf-btn" key={item} onClick={() => { setReport(false); show("신고가 접수되었습니다"); }}>{item}</button>
              ))}
              <button className="pf-btn danger" onClick={() => { setReport(false); show("이 채널을 차단했습니다"); }}>이 채널 차단</button>
            </div>
          </div>
        )}

        {toast && <div className="wv-toast">{toast}</div>}
      </div>
    </main>
  );
}

function SettingsOptions({
  current,
  items,
  onBack,
  onPick,
}: {
  current: string;
  items: string[];
  onBack: () => void;
  onPick: (value: string) => void;
}) {
  return (
    <div className="wv-options">
      <button className="wv-back" onClick={onBack}>‹ 재생 설정</button>
      {items.map((item) => (
        <button key={item} className={current === item ? "selected" : ""} onClick={() => onPick(item)}>
          <span>{item}</span>{current === item && <b>✓</b>}
        </button>
      ))}
    </div>
  );
}

const watchStyles = `
.wv-player{position:relative}.pf-playerbar .wv-setting-active{background:rgba(255,255,255,.18);color:#fff}
.wv-settings-layer{position:fixed;inset:0;z-index:230;pointer-events:none}.wv-settings-backdrop{position:fixed;inset:0;z-index:231;border:0;background:rgba(0,0,0,.24);backdrop-filter:blur(1px);pointer-events:auto}.wv-settings-window{position:fixed;right:28px;bottom:86px;z-index:232;width:min(350px,calc(100vw - 32px));max-height:min(520px,calc(100vh - 120px));overflow:auto;background:#18181e;border:1px solid rgba(255,255,255,.16);border-radius:20px;color:#f7f7fa;box-shadow:0 28px 90px rgba(0,0,0,.55);pointer-events:auto;animation:wvPop .16s ease-out}.wv-settings-head{height:64px;padding:11px 14px 10px 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.09)}.wv-settings-head div{display:flex;flex-direction:column;gap:2px}.wv-settings-head small{font-size:8px;letter-spacing:1.5px;color:#777784}.wv-settings-head strong{font-size:14px}.wv-settings-head>button{width:34px;height:34px;border:0;border-radius:10px;background:rgba(255,255,255,.06);color:#aaa;font-size:22px;cursor:pointer}.wv-settings-list,.wv-options{padding:8px}.wv-settings-list>button,.wv-options>button,.wv-advanced{width:100%;min-height:50px;padding:0 12px;border:0;border-radius:12px;background:transparent;color:#ededf1;display:grid;grid-template-columns:1fr auto auto;align-items:center;gap:10px;text-align:left;text-decoration:none;cursor:pointer}.wv-settings-list>button:hover,.wv-options>button:hover,.wv-advanced:hover{background:rgba(255,255,255,.07)}.wv-settings-list>button:disabled{opacity:.42;cursor:not-allowed}.wv-settings-list span,.wv-options span{font-size:11px;font-weight:750}.wv-settings-list b{font-size:10px;color:#a4a4af}.wv-settings-list i{font-style:normal;font-size:20px;color:#666}.wv-toggle{min-height:62px;margin:3px 0;padding:9px 12px;border-radius:12px;display:flex;align-items:center;justify-content:space-between;gap:14px}.wv-toggle:hover{background:rgba(255,255,255,.05)}.wv-toggle>span{display:flex;flex-direction:column;gap:3px}.wv-toggle b{font-size:11px}.wv-toggle small{font-size:8px;color:#777784}.wv-toggle input{width:36px;height:20px;accent-color:#5f78ff}.wv-advanced{border-top:1px solid rgba(255,255,255,.08);border-radius:0;margin-top:4px;color:#90909c;font-size:10px}.wv-advanced span{font-size:18px}.wv-options>button{grid-template-columns:1fr auto}.wv-options>button b{color:#5f8cff}.wv-options>button.selected{background:rgba(95,120,255,.13)}.wv-options .wv-back{display:block;color:#92929e;font-size:9px;border-radius:0;border-bottom:1px solid rgba(255,255,255,.08)}.wv-options .wv-back:hover{background:transparent;color:#fff}.wv-center-modal{position:fixed;z-index:240;left:50%;top:50%;transform:translate(-50%,-50%);width:min(440px,90vw)}.wv-toast{position:fixed;z-index:260;left:50%;bottom:28px;transform:translateX(-50%);padding:11px 15px;border-radius:12px;background:#f4f4f6;color:#111;font-size:11px;font-weight:850;box-shadow:0 16px 50px rgba(0,0,0,.45)}
@keyframes wvPop{from{transform:translateY(8px) scale(.98);opacity:.3}to{transform:translateY(0) scale(1);opacity:1}}
@media(max-width:700px){.wv-settings-backdrop{background:rgba(0,0,0,.45);backdrop-filter:blur(4px)}.wv-settings-window{left:0;right:0;bottom:0;width:100%;max-height:72dvh;border-radius:24px 24px 0 0;border-left:0;border-right:0;border-bottom:0;padding-bottom:max(12px,env(safe-area-inset-bottom));animation:wvSheet .2s ease-out}.wv-settings-head{height:68px;padding-left:18px;padding-right:16px}.wv-settings-list,.wv-options{padding:8px 11px}.wv-settings-list>button,.wv-options>button,.wv-advanced{min-height:54px}.wv-toggle{min-height:66px}@keyframes wvSheet{from{transform:translateY(28px);opacity:.35}to{transform:translateY(0);opacity:1}}}
`;
