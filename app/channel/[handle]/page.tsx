"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import SiteThemeMenu from "../../components/SiteThemeMenu";
import { useDtvTheme } from "../../components/ThemeProvider";
import styles from "./channel.module.css";
import vhsStyles from "./vhs-upgrade.module.css";

const channelVideos = [
  { title: "한화는 대체 왜 이러는가", meta: "조회수 12만회 · 3시간 전", duration: "12:41", mark: "⚾", tone: "red" },
  { title: "오늘 경기 같이 보기 하이라이트", meta: "조회수 8.3만회 · 어제", duration: "18:02", mark: "LIVE", tone: "orange" },
  { title: "9회말에 이런 일이 일어날 수 있냐", meta: "조회수 24만회 · 2일 전", duration: "08:19", mark: "9", tone: "purple" },
  { title: "이번 주 KBO 한 번에 정리", meta: "조회수 6.1만회 · 4일 전", duration: "15:22", mark: "KBO", tone: "blue" },
];

const schedule = [
  ["18:00", "오늘의 야구 브리핑"],
  ["19:00", "경기 같이 보기 · LIVE"],
  ["22:30", "오늘 경기 10분 정리"],
];

export default function ChannelPage() {
  const params = useParams<{ handle: string }>();
  const handle = params?.handle ?? "dguy";
  const { theme } = useDtvTheme();
  const [following, setFollowing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 1800);
  };

  return (
    <main className={`${styles.page} ${styles[theme]} ${theme === "vhs" ? vhsStyles.vhsEnhanced : ""}`}>
      <div className={styles.scanlines} aria-hidden="true" />
      <div className={styles.noise} aria-hidden="true" />

      <header className={styles.topbar}>
        <a href="/" className={styles.brand} aria-label="DTV 홈으로 이동"><strong>D</strong><span>▶</span><b>TV</b></a>
        <div className={styles.channelSignal}><span className={styles.liveDot} /><span>CH.1026</span><em>ON AIR</em></div>
        <div className={styles.topActions}>
          <SiteThemeMenu />
          <button onClick={() => showToast("공유 링크를 준비했어요 📡")}>공유</button>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroSignal} aria-hidden="true">
          <span>CH 1026</span>
          <strong>{theme === "newsroom" ? "DTV NEWS" : theme === "vhs" ? "PLAY ▶" : "DGUY SPORTS"}</strong>
          <small>{theme === "analog" ? "UHF · STEREO" : theme === "vhs" ? "SEP. 03 2026 13:26" : "YOUR CHANNEL. YOUR BROADCAST."}</small>
        </div>
        <div className={styles.heroGlow} aria-hidden="true" />
      </section>

      {theme === "newsroom" && <div className={styles.breakingBar}><strong>BREAKING</strong><span>드가이 스포츠, 오늘 19:00 경기 같이 보기 LIVE 예정</span></div>}

      <section className={styles.channelInfo}>
        <div className={styles.avatar}>D</div>
        <div className={styles.identity}>
          <div className={styles.nameLine}><h1>드가이 스포츠</h1><span className={styles.verified}>✓</span><span className={styles.handle}>@{handle}</span></div>
          <p>구독자 12.4만 · 영상 186개</p>
          <p className={styles.bio}>한화 때문에 매일 고통받지만 또 야구를 봅니다. 경기, 분석, 그리고 같이 떠드는 방송국.</p>
        </div>
        <button className={`${styles.subscribe} ${following ? styles.subscribed : ""}`} onClick={() => setFollowing((value) => !value)}>{following ? "구독 중" : "구독"}</button>
      </section>

      <nav className={styles.tabs} aria-label="채널 메뉴">
        <button className={styles.activeTab}>홈</button><button>영상</button><button>D-Clips</button><button><span className={styles.liveDot} /> LIVE</button><button>프로그램</button><button>편성표</button><button>커뮤니티</button><button>정보</button>
      </nav>

      <section className={styles.body}>
        <div className={styles.mainColumn}>
          <article className={styles.liveCard}>
            <div className={styles.livePreview}>
              <span className={styles.liveBadge}>● LIVE</span>
              <div className={styles.liveCenter}><small>DTV CH.1026</small><strong>오늘 경기 같이 보기</strong><span>현재 1.2K명 시청 중</span></div>
            </div>
            <div className={styles.liveCopy}><span className={styles.eyebrow}>NOW BROADCASTING</span><h2>지금 방송 중입니다.</h2><p>오늘 경기의 모든 순간을 실시간으로 같이 보고 이야기해요.</p><button onClick={() => showToast("LIVE 시청 페이지는 다음 단계에서 연결됩니다 ▶")}>방송 입장</button></div>
          </article>

          <div className={styles.sectionHead}><div><span className={styles.eyebrow}>LATEST PROGRAMS</span><h2>최신 영상</h2></div><button>모두 보기 →</button></div>
          <div className={styles.videoGrid}>
            {channelVideos.map((video) => <button key={video.title} className={styles.videoCard} onClick={() => showToast(`“${video.title}” 시청 페이지 준비 중`)}><div className={`${styles.thumbnail} ${styles[`tone_${video.tone}`]}`}><span>{video.mark}</span><b>{video.duration}</b></div><strong>{video.title}</strong><small>{video.meta}</small></button>)}
          </div>
        </div>

        <aside className={styles.sideColumn}>
          <section className={styles.scheduleCard}>
            <div className={styles.cardHeading}><div><span className={styles.eyebrow}>TODAY</span><h3>오늘의 편성표</h3></div><span>CH.1026</span></div>
            <div className={styles.scheduleList}>{schedule.map(([time, title], index) => <div key={time} className={index === 1 ? styles.onNow : ""}><time>{time}</time><span>{title}</span>{index === 1 && <b>ON AIR</b>}</div>)}</div>
          </section>

          <section className={styles.programCard}><span className={styles.eyebrow}>PROGRAM</span><div className={styles.programPoster}>WEEKLY<br />BASEBALL</div><h3>이번 주 KBO</h3><p>매주 한 번, 일주일의 야구를 빠르게 정리합니다.</p></section>
        </aside>
      </section>

      {toast && <div className={styles.toast}>{toast}</div>}
    </main>
  );
}
