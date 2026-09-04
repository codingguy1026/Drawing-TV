"use client";

import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";

const clips = [
  { id: 1, code: "S-017", title: "이게 왜 홈런이 아니냐고", channel: "드가이 스포츠", handle: "@dguy", likes: "82K", comments: "1.4K", icon: "⚾", tag: "SPORTS", gradient: "linear-gradient(165deg,#ff765f 0%,#6f1936 48%,#110d14 100%)" },
  { id: 2, code: "S-028", title: "3초 뒤에 분위기 바뀜", channel: "404 플레이룸", handle: "@404play", likes: "41K", comments: "892", icon: "👁", tag: "GAME", gradient: "linear-gradient(165deg,#6675ff 0%,#34205d 50%,#0e0d15 100%)" },
  { id: 3, code: "S-041", title: "선 하나로 그림 살리는 법", channel: "모노 드로잉", handle: "@mono", likes: "120K", comments: "2.1K", icon: "✎", tag: "ART", gradient: "linear-gradient(165deg,#ffd09f 0%,#9a63cb 52%,#151124 100%)" },
  { id: 4, code: "S-052", title: "키보드 소리만 듣고 맞히기", channel: "D Tech", handle: "@dtech", likes: "67K", comments: "718", icon: "⌨", tag: "TECH", gradient: "linear-gradient(165deg,#41d5ba 0%,#15506b 50%,#0c1116 100%)" },
  { id: 5, code: "S-063", title: "오늘 하늘 진짜 미쳤다", channel: "오늘의 우리", handle: "@todayus", likes: "98K", comments: "1.8K", icon: "☀", tag: "DAILY", gradient: "linear-gradient(165deg,#6dc1ff 0%,#6557a4 52%,#171426 100%)" },
];

export default function ClipsPage() {
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState<number[]>([]);
  const [muted, setMuted] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const current = clips[index];

  const tune = useCallback((direction: 1 | -1) => {
    setCommentsOpen(false);
    setIndex((value) => (value + direction + clips.length) % clips.length);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;
      if (isTyping) return;

      const nextKey = event.key === "ArrowDown" || event.key === "ArrowRight" || event.key.toLowerCase() === "j";
      const previousKey = event.key === "ArrowUp" || event.key === "ArrowLeft" || event.key.toLowerCase() === "k";

      if (nextKey) {
        event.preventDefault();
        tune(1);
      }
      if (previousKey) {
        event.preventDefault();
        tune(-1);
      }
      if (event.key.toLowerCase() === "m") setMuted((value) => !value);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tune]);

  const progress = useMemo(() => ((index + 1) / clips.length) * 100, [index]);

  const showToast = (text: string) => {
    setToast(text);
    window.setTimeout(() => setToast(null), 1800);
  };

  return (
    <main className="clip-shell">
      <style>{styles}</style>

      <header className="clip-topbar">
        <a href="/" className="clip-brand"><span>D</span><b>TV</b><i>CLIP SIGNAL</i></a>
        <div className="clip-mode"><span className="pulse" /> <b>LIVE FEED</b><em>{current.code}</em></div>
        <div className="clip-top-actions">
          <button onClick={() => setMuted((value) => !value)}>{muted ? "MUTED" : "SOUND ON"}</button>
          <a href="/">홈으로</a>
        </div>
      </header>

      <section className="clip-stage">
        <aside className="signal-queue" aria-label="클립 신호 목록">
          <div className="queue-head"><span>SIGNAL QUEUE</span><b>{String(index + 1).padStart(2, "0")} / {String(clips.length).padStart(2, "0")}</b></div>
          <div className="queue-list">
            {clips.map((clip, clipIndex) => (
              <button key={clip.id} className={clipIndex === index ? "active" : ""} onClick={() => { setIndex(clipIndex); setCommentsOpen(false); }}>
                <i style={{ "--thumb": clip.gradient } as CSSProperties}>{clip.icon}</i>
                <span><small>{clip.code} · {clip.tag}</small><b>{clip.title}</b><em>{clip.handle}</em></span>
                <strong>{clipIndex === index ? "●" : String(clipIndex + 1).padStart(2, "0")}</strong>
              </button>
            ))}
          </div>
          <div className="queue-tip"><kbd>↑</kbd><kbd>↓</kbd><kbd>←</kbd><kbd>→</kbd><span>또는 J / K로 신호 전환</span></div>
        </aside>

        <section className="signal-viewer">
          <div className="viewer-frame" style={{ "--signal-bg": current.gradient } as CSSProperties}>
            <div className="signal-noise" />
            <div className="viewer-status">
              <span><i /> SIGNAL LOCKED</span>
              <b>{current.tag} · {current.code}</b>
            </div>

            <button className="viewer-surface" aria-label="재생 또는 일시정지" onClick={() => showToast("재생 / 일시정지")}> 
              <span className="hero-icon">{current.icon}</span>
              <span className="fake-play">▶</span>
            </button>

            <div className="viewer-copy">
              <div className="creator-line"><span>{current.channel}</span><button onClick={() => showToast("채널 팔로우 완료 📡")}>＋ 팔로우</button></div>
              <h1>{current.title}</h1>
              <p>{current.handle} · 지금 DTV에서 뜨는 짧은 신호</p>
            </div>

            <div className="viewer-meter"><span style={{ width: `${progress}%` }} /></div>
            <div className="viewer-corners"><i>REC</i><i>9:16</i></div>
          </div>

          <div className="signal-console">
            <button className={liked.includes(current.id) ? "active" : ""} onClick={() => setLiked((items) => items.includes(current.id) ? items.filter((id) => id !== current.id) : [...items, current.id])}>
              <span>♥</span><b>{current.likes}</b><em>반응</em>
            </button>
            <button onClick={() => setCommentsOpen((value) => !value)}><span>◌</span><b>{current.comments}</b><em>대화</em></button>
            <button onClick={() => showToast("신호 링크를 복사했어요 ↗")}><span>↗</span><b>공유</b><em>보내기</em></button>
            <button onClick={() => showToast("보관함에 신호를 저장했어요 ▣")}><span>▣</span><b>저장</b><em>보관함</em></button>
          </div>

          <div className="tuner">
            <button className="tune-prev" onClick={() => tune(-1)}><span>↑</span><b>이전 신호</b><small>{clips[(index - 1 + clips.length) % clips.length].code}</small></button>
            <div className="dial">
              <span>TUNER</span>
              <div className="dial-track">
                {clips.map((clip, clipIndex) => <button key={clip.id} aria-label={`${clipIndex + 1}번 신호`} className={clipIndex === index ? "active" : ""} onClick={() => setIndex(clipIndex)}><i /></button>)}
              </div>
              <b>{current.code}</b>
            </div>
            <button className="tune-next" onClick={() => tune(1)}><span>↓</span><b>다음 신호</b><small>{clips[(index + 1) % clips.length].code}</small></button>
          </div>
        </section>

        <aside className={`comment-drawer ${commentsOpen ? "open" : ""}`}>
          <div className="comment-head"><span>ON SIGNAL</span><b>실시간 대화</b><button onClick={() => setCommentsOpen(false)}>×</button></div>
          <div className="comments">
            <p><b>@eagle26</b><span>아니 저게 왜 안 넘어가 ㅋㅋㅋㅋ</span><small>12초 전</small></p>
            <p><b>@signal404</b><span>다음 신호에서 또 터질 것 같은데</span><small>31초 전</small></p>
            <p><b>@mono</b><span>이 UI 채널 돌리는 느낌 좋다 📡</span><small>1분 전</small></p>
          </div>
          <form onSubmit={(event) => { event.preventDefault(); showToast("대화를 보냈어요"); }}><input placeholder="이 신호에 한마디..." /><button>전송</button></form>
        </aside>
      </section>

      <nav className="mobile-signal-nav">
        <button onClick={() => tune(-1)}>↑<span>이전</span></button>
        <button className="current"><b>{current.code}</b><span>{String(index + 1).padStart(2, "0")} / {String(clips.length).padStart(2, "0")}</span></button>
        <button onClick={() => tune(1)}>↓<span>다음 신호</span></button>
      </nav>

      {toast && <div className="clip-toast">{toast}</div>}
    </main>
  );
}

const styles = `
.clip-shell{--bg:#09090c;--panel:#121218;--line:rgba(255,255,255,.1);--muted:#858592;min-height:100vh;background:radial-gradient(circle at 50% -10%,#1a1722 0,transparent 35%),var(--bg);color:#f7f7fa;font-family:Inter,Pretendard,system-ui,-apple-system,sans-serif;overflow-x:hidden}.clip-shell *{box-sizing:border-box}.clip-shell button,.clip-shell input{font:inherit}.clip-topbar{height:66px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:0 24px;border-bottom:1px solid var(--line);background:rgba(9,9,12,.82);backdrop-filter:blur(22px);position:relative;z-index:20}.clip-brand{display:flex;align-items:center;gap:6px;text-decoration:none;color:white;width:max-content}.clip-brand>span{width:31px;height:31px;border-radius:10px;background:#ff3155;display:grid;place-items:center;font-size:19px;font-weight:950}.clip-brand>b{font-size:18px;letter-spacing:-1px}.clip-brand>i{font-style:normal;color:#666674;font-size:8px;letter-spacing:1.7px;margin-left:6px}.clip-mode{display:flex;align-items:center;gap:8px;border:1px solid var(--line);background:#141419;border-radius:999px;padding:7px 11px;font-size:9px;letter-spacing:1px}.clip-mode .pulse{width:6px;height:6px;border-radius:50%;background:#ff3155;box-shadow:0 0 12px #ff3155}.clip-mode em{font-style:normal;color:#777784}.clip-top-actions{display:flex;justify-content:flex-end;gap:7px}.clip-top-actions button,.clip-top-actions a{height:34px;border:1px solid var(--line);background:#15151b;color:#aaaab5;border-radius:10px;padding:0 10px;display:flex;align-items:center;text-decoration:none;font-size:9px;font-weight:800;cursor:pointer}.clip-stage{width:min(1420px,calc(100% - 40px));margin:0 auto;min-height:calc(100vh - 66px);display:grid;grid-template-columns:280px minmax(360px,650px) 310px;justify-content:center;gap:22px;padding:24px 0 30px}.signal-queue,.comment-drawer{border:1px solid var(--line);background:rgba(17,17,23,.82);border-radius:22px;overflow:hidden;align-self:start;position:sticky;top:90px}.queue-head{padding:16px 15px 12px;display:flex;justify-content:space-between;color:#757583;font-size:8px;letter-spacing:1.4px}.queue-list{padding:0 8px 8px}.queue-list button{width:100%;display:grid;grid-template-columns:43px 1fr auto;gap:9px;align-items:center;border:1px solid transparent;background:transparent;color:white;border-radius:13px;padding:8px;text-align:left;cursor:pointer}.queue-list button:hover{background:#1b1b22}.queue-list button.active{background:#202028;border-color:rgba(255,255,255,.12)}.queue-list button>i{width:43px;height:55px;border-radius:10px;background:var(--thumb);display:grid;place-items:center;font-style:normal;font-size:18px}.queue-list button>span{min-width:0;display:flex;flex-direction:column;gap:3px}.queue-list small{font-size:7px;letter-spacing:1px;color:#71717e}.queue-list b,.queue-list em{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.queue-list b{font-size:10px}.queue-list em{font-style:normal;font-size:8px;color:#777785}.queue-list strong{font-size:8px;color:#60606d}.queue-list button.active strong{color:#ff3155}.queue-tip{border-top:1px solid var(--line);padding:12px;display:flex;align-items:center;gap:5px;color:#686875;font-size:8px;flex-wrap:wrap}.queue-tip kbd{border:1px solid var(--line);background:#202027;border-radius:5px;padding:3px 5px;color:#aaa}.queue-tip span{margin-left:4px}.signal-viewer{min-width:0}.viewer-frame{--signal-bg:#222;position:relative;width:min(100%,520px);aspect-ratio:9/14.8;max-height:calc(100vh - 245px);min-height:560px;margin:0 auto;border-radius:28px;background:var(--signal-bg);overflow:hidden;border:1px solid rgba(255,255,255,.16);box-shadow:0 30px 90px rgba(0,0,0,.45)}.viewer-frame:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 75% 16%,rgba(255,255,255,.18),transparent 30%),linear-gradient(180deg,transparent 45%,rgba(0,0,0,.56));z-index:1}.signal-noise{position:absolute;inset:0;opacity:.05;background-image:repeating-linear-gradient(0deg,rgba(255,255,255,.6) 0,rgba(255,255,255,.6) 1px,transparent 1px,transparent 4px);z-index:2;pointer-events:none}.viewer-status{position:absolute;top:18px;left:18px;right:18px;z-index:5;display:flex;justify-content:space-between;font-size:8px;letter-spacing:1.3px;font-weight:900}.viewer-status span{display:flex;align-items:center;gap:6px}.viewer-status i{width:6px;height:6px;border-radius:50%;background:#62ffa7;box-shadow:0 0 10px #62ffa7}.viewer-surface{position:absolute;inset:0;border:0;background:transparent;z-index:3;cursor:pointer;color:white}.hero-icon{position:absolute;inset:0;display:grid;place-items:center;font-size:92px;filter:drop-shadow(0 15px 25px rgba(0,0,0,.25))}.fake-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:62px;height:62px;border-radius:50%;background:rgba(10,10,14,.42);border:1px solid rgba(255,255,255,.2);display:grid;place-items:center;opacity:0;transition:.2s}.viewer-surface:hover .fake-play{opacity:1}.viewer-copy{position:absolute;z-index:5;left:20px;right:20px;bottom:42px}.creator-line{display:flex;align-items:center;gap:9px;font-size:11px;font-weight:850}.creator-line button{border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.12);color:white;border-radius:999px;padding:5px 9px;font-size:8px;font-weight:800;cursor:pointer}.viewer-copy h1{font-size:25px;line-height:1.08;letter-spacing:-1.1px;margin:11px 0 7px;max-width:390px}.viewer-copy p{font-size:9px;color:#d0d0d6;margin:0}.viewer-meter{position:absolute;z-index:6;left:20px;right:20px;bottom:18px;height:2px;background:rgba(255,255,255,.18)}.viewer-meter span{height:100%;display:block;background:white;transition:.25s}.viewer-corners{position:absolute;z-index:5;left:18px;right:18px;top:48px;display:flex;justify-content:space-between}.viewer-corners i{font-style:normal;font-size:7px;letter-spacing:1px;color:rgba(255,255,255,.66)}.signal-console{width:min(100%,520px);margin:12px auto 0;display:grid;grid-template-columns:repeat(4,1fr);gap:7px}.signal-console button{height:58px;border:1px solid var(--line);background:#141419;border-radius:14px;color:#a4a4af;display:grid;grid-template-columns:auto 1fr;grid-template-rows:1fr 1fr;align-items:center;padding:8px 10px;cursor:pointer}.signal-console button>span{grid-row:1/3;font-size:17px;margin-right:8px}.signal-console button>b{align-self:end;text-align:left;font-size:10px;color:#ddd}.signal-console button>em{align-self:start;text-align:left;font-style:normal;font-size:7px;color:#686875}.signal-console button.active{background:#2a151d;border-color:#5a2736;color:#ff5a78}.tuner{width:min(100%,520px);margin:9px auto 0;display:grid;grid-template-columns:1fr 1.6fr 1fr;gap:7px}.tuner>button,.dial{height:64px;border:1px solid var(--line);background:#111116;border-radius:14px}.tuner>button{display:grid;grid-template-columns:auto 1fr;grid-template-rows:1fr 1fr;align-items:center;text-align:left;color:#aaa;cursor:pointer;padding:9px 11px}.tuner>button>span{grid-row:1/3;margin-right:8px;font-size:19px}.tuner>button>b{align-self:end;font-size:9px}.tuner>button>small{align-self:start;font-size:7px;color:#60606d}.dial{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:8px;padding:0 10px}.dial>span,.dial>b{font-size:7px;letter-spacing:1px;color:#6d6d79}.dial-track{display:flex;align-items:center;justify-content:center;gap:4px}.dial-track button{border:0;background:transparent;padding:4px 2px;cursor:pointer}.dial-track i{display:block;width:5px;height:13px;border-radius:3px;background:#34343d}.dial-track button.active i{height:24px;background:#ff3155;box-shadow:0 0 10px rgba(255,49,85,.5)}.comment-drawer{height:520px;display:flex;flex-direction:column;opacity:.38;transition:.25s}.comment-drawer.open{opacity:1;border-color:rgba(255,255,255,.16)}.comment-head{height:58px;border-bottom:1px solid var(--line);display:grid;grid-template-columns:1fr auto;grid-template-rows:1fr 1fr;padding:10px 12px}.comment-head span{font-size:7px;letter-spacing:1.2px;color:#ff5b77}.comment-head b{font-size:11px}.comment-head button{grid-column:2;grid-row:1/3;border:0;background:transparent;color:#777;font-size:20px;cursor:pointer}.comments{padding:9px;flex:1;overflow:auto}.comments p{margin:0 0 6px;padding:10px;border-radius:12px;background:#191920;display:grid;grid-template-columns:1fr auto;gap:4px}.comments b{font-size:9px}.comments span{grid-column:1/3;font-size:9px;color:#c0c0c8;line-height:1.45}.comments small{font-size:7px;color:#656571}.comment-drawer form{display:flex;gap:6px;padding:9px;border-top:1px solid var(--line)}.comment-drawer input{min-width:0;flex:1;border:1px solid var(--line);background:#1a1a21;color:white;border-radius:10px;padding:0 9px;font-size:9px;outline:none}.comment-drawer form button{border:0;background:#f3f3f5;color:#111;border-radius:9px;padding:9px;font-size:8px;font-weight:850;cursor:pointer}.mobile-signal-nav{display:none}.clip-toast{position:fixed;z-index:80;left:50%;bottom:26px;transform:translateX(-50%);background:#f3f3f5;color:#111;border-radius:12px;padding:10px 14px;font-size:10px;font-weight:850;box-shadow:0 15px 45px rgba(0,0,0,.45)}
@media(max-width:1150px){.clip-stage{grid-template-columns:230px minmax(360px,600px)}.comment-drawer{display:none}.viewer-frame{max-height:none}}
@media(max-width:800px){.clip-topbar{height:58px;padding:0 12px;grid-template-columns:1fr auto}.clip-brand>i,.clip-mode,.clip-top-actions button{display:none}.clip-top-actions a{height:31px}.clip-stage{width:100%;min-height:calc(100vh - 58px);display:block;padding:0}.signal-queue{display:none}.signal-viewer{width:100%}.viewer-frame{width:100%;height:calc(100vh - 158px);min-height:0;max-height:none;aspect-ratio:auto;border:0;border-radius:0}.viewer-copy{bottom:55px}.signal-console{position:absolute;z-index:10;right:10px;bottom:118px;width:auto;margin:0;display:flex;flex-direction:column}.signal-console button{width:54px;height:54px;border-radius:18px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4px;background:rgba(14,14,18,.54);backdrop-filter:blur(12px)}.signal-console button>span{margin:0;font-size:17px}.signal-console button>b{font-size:8px}.signal-console button>em{display:none}.tuner{display:none}.mobile-signal-nav{height:100px;position:fixed;z-index:30;left:0;right:0;bottom:0;display:grid;grid-template-columns:1fr 1.2fr 1fr;gap:1px;background:rgba(8,8,11,.92);backdrop-filter:blur(20px);border-top:1px solid var(--line);padding:9px 10px 14px}.mobile-signal-nav button{border:0;background:transparent;color:#888;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:4px;font-size:18px}.mobile-signal-nav button span{font-size:8px}.mobile-signal-nav .current{border-left:1px solid var(--line);border-right:1px solid var(--line)}.mobile-signal-nav .current b{color:#fff;font-size:13px}.viewer-copy h1{font-size:22px;padding-right:54px}.viewer-status{top:14px}.viewer-corners{top:42px}.clip-toast{bottom:116px}}
`;
