"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import SiteThemeMenu from "../../components/SiteThemeMenu";
import { useDtvTheme } from "../../components/ThemeProvider";
import styles from "./watch.module.css";

type WatchVideo = {
  id: string;
  title: string;
  channel: string;
  handle: string;
  views: string;
  age: string;
  duration: number;
  durationLabel: string;
  accent: string;
  gradient: string;
  description: string;
  subscribers: string;
};

const catalog: WatchVideo[] = [
  { id: "1", title: "한화는 대체 왜 이러는가 | 오늘 경기 같이 보기", channel: "드가이 스포츠", handle: "dguy", views: "12만회", age: "3시간 전", duration: 761, durationLabel: "12:41", accent: "⚾", gradient: "linear-gradient(135deg,#ff3155 0%,#54102a 52%,#111119 100%)", description: "오늘 경기의 흐름을 같이 보고, 왜 이렇게 됐는지 차근차근 뜯어봅니다. 편집하다가 또 한숨 쉼.", subscribers: "12.4만" },
  { id: "2", title: "새벽 2시에 시작한 공포게임이 이상하다", channel: "404 플레이룸", handle: "404play", views: "8.7만회", age: "6시간 전", duration: 1448, durationLabel: "24:08", accent: "👁", gradient: "linear-gradient(135deg,#7657ff 0%,#241b55 50%,#09090d 100%)", description: "그냥 가볍게 시작했는데 중간부터 분위기가 완전히 바뀌었습니다.", subscribers: "8.1만" },
  { id: "3", title: "웹사이트 디자인, 여기 하나만 바꿔도 달라집니다", channel: "Pixel Lab", handle: "pixellab", views: "3.1만회", age: "어제", duration: 572, durationLabel: "09:32", accent: "⌨", gradient: "linear-gradient(135deg,#20c997 0%,#0b485b 56%,#0b0b0d 100%)", description: "복잡한 UI를 정리할 때 가장 먼저 손대면 좋은 부분들을 짧게 정리했습니다.", subscribers: "19.7만" },
  { id: "4", title: "10분 동안 아무 생각 없이 듣는 밤 라디오", channel: "새벽 주파수", handle: "midnightfm", views: "19만회", age: "2일 전", duration: 600, durationLabel: "10:00", accent: "♫", gradient: "linear-gradient(135deg,#1b2d63 0%,#40206a 50%,#0b0b0d 100%)", description: "조용한 밤에 틀어두기 좋은 짧은 라디오 방송입니다.", subscribers: "31.2만" },
  { id: "5", title: "태블릿 하나로 그림 작업 어디까지 가능할까?", channel: "모노 드로잉", handle: "mono", views: "5.4만회", age: "2일 전", duration: 917, durationLabel: "15:17", accent: "✎", gradient: "linear-gradient(135deg,#ffb36b 0%,#e35d8d 48%,#362252 100%)", description: "태블릿 하나만 들고 나가서 스케치부터 마무리까지 해봤습니다.", subscribers: "14.8만" },
  { id: "6", title: "오늘 꼭 알아야 할 테크 소식 7가지", channel: "D Tech", handle: "dtech", views: "22만회", age: "4시간 전", duration: 524, durationLabel: "08:44", accent: "D", gradient: "linear-gradient(135deg,#216cff 0%,#16205a 54%,#0b0b0d 100%)", description: "오늘 나온 기술 소식을 빠르게 훑어보는 D Tech 데일리 브리핑.", subscribers: "42.6만" },
  { id: "7", title: "친구들이랑 하루 종일 아무 계획 없이 돌아다녀봄", channel: "오늘의 우리", handle: "todayus", views: "14만회", age: "1일 전", duration: 1109, durationLabel: "18:29", accent: "☀", gradient: "linear-gradient(135deg,#ffcf66 0%,#ff7b57 48%,#47283f 100%)", description: "계획 0%, 즉흥 100%로 돌아다닌 하루.", subscribers: "27.5만" },
  { id: "8", title: "이 장면 하나 그리는데 6시간 걸렸습니다", channel: "모노 드로잉", handle: "mono", views: "4.8만회", age: "3일 전", duration: 716, durationLabel: "11:56", accent: "✦", gradient: "linear-gradient(135deg,#91f1ca 0%,#5d60d8 52%,#17172c 100%)", description: "한 장면을 완성하는 과정을 처음부터 끝까지 압축해서 보여드립니다.", subscribers: "14.8만" },
];

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
  const video = useMemo(() => catalog.find((item) => item.id === params?.id) ?? catalog[0], [params?.id]);
  const recommendations = useMemo(() => catalog.filter((item) => item.id !== video.id).slice(0, 6), [video.id]);
  const playerFrameRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [position, setPosition] = useState(Math.min(76, video.duration));
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

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

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 1800);
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
        <a href="/" className={styles.brand} aria-label="DTV 홈"><strong>D</strong><span>▶</span><b>TV</b></a>
        <form className={styles.search} onSubmit={(event) => event.preventDefault()}>
          <input aria-label="DTV 검색" placeholder="무엇을 보고 싶나요?" />
          <button type="submit">검색</button>
        </form>
        <div className={styles.topActions}>
          <SiteThemeMenu compact />
          <button type="button" onClick={() => notify("알림 센터는 홈에서 확인할 수 있어요 🔔")}>◇</button>
          <a href="/channel/dguy" className={styles.profile}>D</a>
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
            <a href={`/channel/${video.handle}`} className={styles.channelCard}>
              <span className={styles.channelAvatar}>{video.channel.slice(0, 1)}</span>
              <span><strong>{video.channel} ✓</strong><small>구독자 {video.subscribers}</small></span>
            </a>
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
            <a href={`/watch/${item.id}`} className={styles.recommendation} key={item.id}>
              <div className={styles.recThumb} style={{ background: item.gradient }}><span>{item.accent}</span><b>{item.durationLabel}</b></div>
              <div><strong>{item.title}</strong><span>{item.channel}</span><small>{item.views} · {item.age}</small></div>
            </a>
          ))}
        </aside>
      </div>

      {toast && <div className={styles.toast}>{toast}</div>}
    </main>
  );
}
