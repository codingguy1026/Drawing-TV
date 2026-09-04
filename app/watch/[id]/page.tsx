"use client";

<<<<<<< Updated upstream
=======
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
>>>>>>> Stashed changes
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

const comments=[
 {user:"@eagle26",text:"오늘은 진짜 끝까지 본다 ㅋㅋㅋ",time:"2분 전",pinned:true},
 {user:"@pixel",text:"플레이어 UI 깔끔해졌네",time:"8분 전",pinned:false},
 {user:"@radio",text:"자막도 잘 보임",time:"14분 전",pinned:false},
];
<<<<<<< Updated upstream
export default function WatchPage(){
 const params=useParams<{id:string}>(); const id=Number(params?.id||1); const isLive=id>=101;
 const [liked,setLiked]=useState(false); const [disliked,setDisliked]=useState(false); const [subscribed,setSubscribed]=useState(false); const [saved,setSaved]=useState(false); const [captions,setCaptions]=useState(true); const [quality,setQuality]=useState("1080p"); const [speed,setSpeed]=useState("1x"); const [mini,setMini]=useState(false); const [share,setShare]=useState(false); const [report,setReport]=useState(false); const [toast,setToast]=useState<string|null>(null); const [chat,setChat]=useState(["@dguy: 시작한다 📡","@viewer12: 오늘 화질 좋다","@eagle26: 가자아아"]);
 const title=useMemo(()=>isLive?"오늘 경기 같이 보기 LIVE":"한화는 대체 왜 이러는가 | 오늘 경기 같이 보기",[isLive]); const show=(x:string)=>{setToast(x);setTimeout(()=>setToast(null),1600)};
 return <main className="pf-shell"><div className="pf-wrap"><header className="pf-head"><div><span className="pf-kicker">DTV WATCH · {isLive?"ON AIR":"VIDEO"}</span><h1 className="pf-title" style={{fontSize:"clamp(25px,3vw,42px)"}}>{title}</h1></div><div className="pf-actions"><a className="pf-btn" href="/">홈</a><a className="pf-btn" href="/library">보관함</a></div></header>
 <div className="pf-grid"><section className={`pf-card ${isLive?"pf-span8":"pf-span12"}`} style={{padding:12}}><div className="pf-player" style={mini?{maxWidth:520,marginLeft:"auto"}:{}}><span className="pf-playicon">{isLive?"●":"⚾"}</span><div className="pf-playerbar"><button onClick={()=>show("재생 / 일시정지")}>▶</button><div className="grow"><i/></div><button onClick={()=>setCaptions(v=>!v)}>CC {captions?"ON":"OFF"}</button><select value={quality} onChange={e=>setQuality(e.target.value)}><option>자동</option><option>2160p</option><option>1080p</option><option>720p</option><option>480p</option></select><select value={speed} onChange={e=>setSpeed(e.target.value)} disabled={isLive}><option>0.75x</option><option>1x</option><option>1.25x</option><option>1.5x</option><option>2x</option></select><button onClick={()=>setMini(v=>!v)}>▣</button><button onClick={()=>show("전체화면 전환")}>⛶</button></div></div></section>
 {isLive&&<aside className="pf-card pf-span4"><div className="pf-between"><h2>LIVE 채팅</h2><span className="pf-status good">1.2K 접속</span></div><div className="pf-chat" style={{marginTop:10}}>{chat.map((x,i)=><p key={i}>{x}</p>)}</div><form className="pf-row" onSubmit={e=>{e.preventDefault();setChat(v=>[...v,"@me: 채팅 전송 테스트"]);}}><input className="pf-search" placeholder="메시지 보내기"/><button className="pf-btn primary">전송</button></form></aside>}
 <section className="pf-card pf-span8"><div className="pf-between"><div><div className="pf-row"><div className="pf-avatar">D</div><div><h3>드가이 스포츠</h3><p style={{margin:0}}>구독자 12.8만 · CH 01</p></div><button className={`pf-btn ${subscribed?"":"primary"}`} onClick={()=>setSubscribed(v=>!v)}>{subscribed?"주파수 고정됨 ✓":"주파수 저장"}</button></div></div><div className="pf-actions"><button className={`pf-btn ${liked?"red":""}`} onClick={()=>{setLiked(v=>!v);setDisliked(false)}}>♥ 8.2K</button><button className={`pf-btn ${disliked?"danger":""}`} onClick={()=>{setDisliked(v=>!v);setLiked(false)}}>싫어요</button><button className={`pf-btn ${saved?"primary":""}`} onClick={()=>setSaved(v=>!v)}>▣ {saved?"저장됨":"보관"}</button></div></div><div className="pf-divider"/><p>조회수 128,403회 · 3시간 전 · #스포츠 #야구 #DTV</p><p>오늘 경기 흐름을 같이 보면서 이야기합니다. 자막, 화질, 배속, 전체화면, 미니플레이어를 지원하는 DTV 플레이어 데모입니다.</p><div className="pf-actions"><button className="pf-btn" onClick={()=>setShare(true)}>↗ 공유</button><button className="pf-btn" onClick={()=>show("임베드 코드 복사됨 <iframe …>")}>⌘ 임베드</button><button className="pf-btn" onClick={()=>show("이 영상은 추천에서 덜 보이게 됩니다")}>관심 없음</button><button className="pf-btn" onClick={()=>show("이 채널을 추천에서 제외했습니다")}>채널 추천 안 함</button><button className="pf-btn danger" onClick={()=>setReport(true)}>신고 / 차단</button></div></section>
 <aside className="pf-card pf-span4"><h2>다음 신호</h2><div className="pf-list" style={{marginTop:10}}>{[["⌨","웹사이트 디자인 하나만 바꿔도 달라집니다"],["👁","새벽 2시에 시작한 공포게임이 이상하다"],["♫","10분 밤 라디오"]].map((x,i)=><a className="pf-item" href={`/watch/${i+2}`} key={x[1]} style={{textDecoration:"none",color:"inherit"}}><div className="pf-thumb">{x[0]}</div><div><b>{x[1]}</b><small>DTV 추천</small></div><span>▶</span></a>)}</div></aside>
 <section className="pf-card pf-span8"><div className="pf-between"><h2>댓글 1,428</h2><select className="pf-btn"><option>인기순</option><option>최신순</option></select></div><form className="pf-row" style={{margin:"12px 0"}} onSubmit={e=>{e.preventDefault();show("댓글 등록")}}><input className="pf-search" placeholder="댓글 추가..."/><button className="pf-btn primary">등록</button></form>{comments.map((c,i)=><article className={`pf-comment ${c.pinned?"pinned":""}`} key={i}>{c.pinned&&<span className="pf-kicker">📌 고정 댓글</span>}<b>{c.user}</b><p>{c.text}</p><div className="pf-actions"><button className="pf-btn">♥ 좋아요</button><button className="pf-btn">답글</button><button className="pf-btn">⋯</button><small>{c.time}</small></div>{i===0&&<div className="pf-note" style={{marginTop:8}}>↳ @dguy: 같이 봐줘서 고마워요 📡</div>}</article>)}</section>
 </div>
 {share&&<div className="pf-card" style={{position:"fixed",zIndex:150,left:"50%",top:"50%",transform:"translate(-50%,-50%)",width:"min(440px,90vw)"}}><div className="pf-between"><h2>공유</h2><button className="pf-btn" onClick={()=>setShare(false)}>×</button></div><div className="pf-field" style={{marginTop:12}}><label>영상 링크</label><input readOnly value={`https://dtv.example/watch/${id}`}/></div><div className="pf-actions" style={{marginTop:12}}><button className="pf-btn primary" onClick={()=>show("링크 복사됨")}>링크 복사</button><button className="pf-btn">메시지</button><button className="pf-btn">커뮤니티</button></div></div>}
 {report&&<div className="pf-card" style={{position:"fixed",zIndex:150,left:"50%",top:"50%",transform:"translate(-50%,-50%)",width:"min(440px,90vw)"}}><div className="pf-between"><h2>신고 · 차단</h2><button className="pf-btn" onClick={()=>setReport(false)}>×</button></div><div className="pf-stack" style={{marginTop:12}}>{["스팸 또는 오해의 소지가 있는 콘텐츠","괴롭힘 또는 혐오 표현","부적절한 연령 등급","저작권 문제"].map(x=><button className="pf-btn" key={x} onClick={()=>{setReport(false);show("신고가 접수되었습니다")}}>{x}</button>)}<button className="pf-btn danger" onClick={()=>{setReport(false);show("이 채널을 차단했습니다")}}>이 채널 차단</button></div></div>}
 {toast&&<div className="pf-badge" style={{position:"fixed",zIndex:180,left:"50%",bottom:28,transform:"translateX(-50%)",padding:"11px 15px",background:"#f4f4f6",color:"#111"}}>{toast}</div>}
 </div></main>
=======

const comments = [
  { user: "야구보는사람", avatar: "야", time: "2시간 전", text: "03:42 여기서 표정 굳는 거 너무 현실적임 ㅋㅋㅋㅋ", stamp: 222, likes: 842 },
  { user: "PixelFan", avatar: "P", time: "1시간 전", text: "07:18 설명 들어보니까 왜 흐름이 꼬였는지 바로 이해됨", stamp: 438, likes: 310 },
  { user: "DTV시청자", avatar: "D", time: "48분 전", text: "다음 방송도 알림 켜놨습니다 📺", likes: 126 },
];

function formatTime(seconds: number) {
  const safe = Math.max(0, Math.floor(seconds));
  const min = Math.floor(safe / 60);
  const sec = safe % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

export default function WatchPage() {
  const params = useParams<{ id: string }>();
  const { theme } = useDtvTheme();
  const video = useMemo(() => catalog.find((item) => item.id === params?.id), [params?.id]);
  const recommendations = useMemo(() => catalog.filter((item) => item.id !== video?.id).slice(0, 6), [video?.id]);
  const playerFrameRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [position, setPosition] = useState(76);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const syncFullscreen = () => {
      const fullscreenElement = document.fullscreenElement ?? (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement;
      setIsFullscreen(fullscreenElement === playerFrameRef.current);
    };

    document.addEventListener("fullscreenchange", syncFullscreen);
    document.addEventListener("webkitfullscreenchange", syncFullscreen);
    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreen);
      document.removeEventListener("webkitfullscreenchange", syncFullscreen);
    };
  }, []);

  if (!video) {
    return <main className={styles.page}><section className={styles.titleBlock}><h1>영상을 찾을 수 없습니다.</h1><p>주소를 확인하거나 홈에서 다른 방송을 선택해 주세요.</p><Link href="/">홈으로 돌아가기</Link></section></main>;
  }

  const notify = (message: string) => {
    if (toastTimerRef.current !== null) window.clearTimeout(toastTimerRef.current);
    setToast(message);
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 1800);
  };

  const jumpTo = (seconds: number) => {
    setPosition(Math.min(seconds, video.duration));
    setPlaying(true);
  };

  const toggleFullscreen = async () => {
    const frame = playerFrameRef.current;
    if (!frame) return;

    const fullscreenElement = document.fullscreenElement ?? (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement;

    try {
      if (fullscreenElement) {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else {
          const legacyDocument = document as Document & { webkitExitFullscreen?: () => Promise<void> | void };
          await legacyDocument.webkitExitFullscreen?.();
        }
        return;
      }

      if (frame.requestFullscreen) {
        await frame.requestFullscreen();
      } else {
        const legacyFrame = frame as HTMLDivElement & { webkitRequestFullscreen?: () => Promise<void> | void };
        if (legacyFrame.webkitRequestFullscreen) {
          await legacyFrame.webkitRequestFullscreen();
        } else {
          notify("이 브라우저는 전체화면을 지원하지 않아요.");
        }
      }
    } catch {
      notify("전체화면 전환에 실패했어요. 브라우저 권한을 확인해 주세요.");
    }
  };

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <Link href="/" className={styles.brand} aria-label="DTV 홈"><strong>D</strong><span>▶</span><b>TV</b></Link>
        <form className={styles.search} onSubmit={(event) => event.preventDefault()}>
          <input aria-label="DTV 검색" placeholder="무엇을 보고 싶나요?" />
          <button type="submit">검색</button>
        </form>
        <div className={styles.topActions}>
          <SiteThemeMenu compact />
          <button type="button" onClick={() => notify("알림 센터는 홈에서 확인할 수 있어요 🔔")}>◇</button>
          <Link href="/channel/dguy" className={styles.profile}>D</Link>
        </div>
      </header>

      {theme === "newsroom" && <div className={styles.newsTicker}><strong>DTV LIVE DESK</strong><span>현재 시청 중 · {video.title}</span><b>CH.1026</b></div>}

      <div className={styles.shell}>
        <section className={styles.mainColumn}>
          <div
            ref={playerFrameRef}
            className={styles.playerFrame}
            style={isFullscreen ? { width: "100vw", height: "100vh", display: "flex", flexDirection: "column", borderRadius: 0 } : undefined}
          >
            <div
              className={styles.player}
              style={{
                background: video.gradient,
                ...(isFullscreen ? { flex: "1 1 auto", minHeight: 0, aspectRatio: "auto" } : {}),
              }}
              onClick={() => setPlaying((value) => !value)}
              role="button"
              tabIndex={0}
              aria-label={playing ? "일시정지" : "재생"}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setPlaying((value) => !value);
                }
              }}
              onDoubleClick={(event) => {
                event.stopPropagation();
                void toggleFullscreen();
              }}
            >
              <div className={styles.scanlines} aria-hidden="true" />
              <div className={styles.playerOsd}>
                <span>{theme === "vhs" ? "PLAY   SP" : theme === "analog" ? "CH 1026 · STEREO" : theme === "newsroom" ? "DTV NEWS FEED" : "DTV PLAYER"}</span>
                <span>{theme === "vhs" ? "SEP.03 2026" : "HD"}</span>
              </div>
              <div className={styles.playerCenter}>
                <span className={styles.playerAccent}>{video.accent}</span>
                {!playing && <button type="button" className={styles.bigPlay} aria-label="재생" onClick={(event) => { event.stopPropagation(); setPlaying(true); }}>▶</button>}
                {playing && <span className={styles.nowPlaying}>NOW PLAYING</span>}
              </div>
              {theme === "vhs" && <><div className={styles.vhsTrack} /><div className={styles.vhsTime}>00:{formatTime(position)}</div></>}
              {theme === "analog" && <div className={styles.analogMark}>DTV UHF 26</div>}
            </div>

            <div className={styles.controls}>
              <button type="button" onClick={() => setPlaying((value) => !value)}>{playing ? "Ⅱ" : "▶"}</button>
              <button type="button" onClick={() => setMuted((value) => !value)}>{muted ? "🔇" : "🔊"}</button>
              <span>{formatTime(position)} / {video.durationLabel}</span>
              <input aria-label="재생 위치" type="range" min={0} max={video.duration} value={position} onChange={(event) => setPosition(Number(event.target.value))} />
              <button type="button" aria-label={isFullscreen ? "전체화면 종료" : "전체화면"} title={isFullscreen ? "전체화면 종료" : "전체화면"} onClick={() => void toggleFullscreen()}>{isFullscreen ? "↙" : "⛶"}</button>
              <button type="button" onClick={() => notify("화질: 1080p (프로토타입)")}>HD</button>
            </div>
          </div>

          <div className={styles.titleBlock}>
            <span className={styles.signalLabel}>{theme === "newsroom" ? "CURRENT REPORT" : theme === "vhs" ? "TAPE 01" : "NOW WATCHING"}</span>
            <h1>{video.title}</h1>
          </div>

          <div className={styles.metaRow}>
            <Link href={`/channel/${video.handle}`} className={styles.channelCard}>
              <span className={styles.channelAvatar}>{video.channel.slice(0, 1)}</span>
              <span><strong>{video.channel} ✓</strong><small>구독자 {video.subscribers}</small></span>
            </Link>
            <button type="button" className={`${styles.subscribe} ${subscribed ? styles.activeButton : ""}`} onClick={() => setSubscribed((value) => !value)}>{subscribed ? "구독 중" : "구독"}</button>
            <div className={styles.actions}>
              <button type="button" className={liked ? styles.activeButton : ""} onClick={() => setLiked((value) => !value)}>♥ {liked ? "1.3만" : "1.2만"}</button>
              <button type="button" onClick={() => notify("공유 링크를 준비했어요 📡")}>↗ 공유</button>
              <button type="button" className={saved ? styles.activeButton : ""} onClick={() => setSaved((value) => !value)}>{saved ? "✓ 저장됨" : "＋ 저장"}</button>
              <button type="button" onClick={() => notify("더보기 메뉴 준비 중")}>•••</button>
            </div>
          </div>

          <section className={styles.description}>
            <strong>{video.views} · {video.age}</strong>
            <p>{video.description}</p>
            {descriptionOpen && <p>📡 DTV CH.1026 · 프로그램: 경기 같이 보기 / #야구 #스포츠 #DTV</p>}
            <button type="button" onClick={() => setDescriptionOpen((value) => !value)}>{descriptionOpen ? "간략히" : "더보기"}</button>
          </section>

          <section className={styles.comments}>
            <div className={styles.sectionHead}><h2>댓글 <span>1,842</span></h2><button type="button">정렬 ▾</button></div>
            <div className={styles.commentComposer}><span>D</span><input placeholder="댓글 추가..." /><button type="button" onClick={() => notify("댓글 작성 기능은 계정 연결 후 활성화됩니다.")}>등록</button></div>
            <div className={styles.commentList}>
              {comments.map((comment) => (
                <article key={`${comment.user}-${comment.time}`} className={styles.comment}>
                  <span className={styles.commentAvatar}>{comment.avatar}</span>
                  <div>
                    <div className={styles.commentMeta}><strong>@{comment.user}</strong><span>{comment.time}</span></div>
                    <p>{comment.text.split(/(\d{1,2}:\d{2})/).map((part, index) => /^\d{1,2}:\d{2}$/.test(part) && comment.stamp ? <button key={index} type="button" className={styles.timestamp} onClick={() => jumpTo(comment.stamp!)}>{part}</button> : <span key={index}>{part}</span>)}</p>
                    <div className={styles.commentActions}><button type="button">♥ {comment.likes}</button><button type="button">답글</button></div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>

        <aside className={styles.recommendations}>
          <div className={styles.upNext}><span>UP NEXT</span><strong>다음 방송 신호</strong></div>
          {recommendations.map((item) => (
            <Link href={`/watch/${item.id}`} className={styles.recommendation} key={item.id}>
              <div className={styles.recThumb} style={{ background: item.gradient }}><span>{item.accent}</span><b>{item.durationLabel}</b></div>
              <div><strong>{item.title}</strong><span>{item.channel}</span><small>{item.views} · {item.age}</small></div>
            </Link>
          ))}
        </aside>
      </div>

      {toast && <div className={styles.toast}>{toast}</div>}
    </main>
  );
>>>>>>> Stashed changes
}
