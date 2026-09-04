"use client";

<<<<<<< Updated upstream
=======
import { useRef, useState } from "react";
import Link from "next/link";
>>>>>>> Stashed changes
import { useParams } from "next/navigation";
import { useState } from "react";

<<<<<<< Updated upstream
const tabs=["홈","영상","클립","LIVE","재생목록","정보"];
export default function ChannelPage(){
 const params=useParams<{handle:string}>(); const handle=params?.handle||"dguy"; const [tab,setTab]=useState("홈"); const [follow,setFollow]=useState(false); const [bell,setBell]=useState("전체");
 return <main className="pf-shell"><div className="pf-wrap"><div className="pf-cover"/><section className="pf-card" style={{marginTop:-44,position:"relative"}}><div className="pf-between"><div className="pf-row"><div className="pf-avatar" style={{width:82,height:82,fontSize:28}}>D</div><div><span className="pf-kicker">DTV CHANNEL</span><h1 className="pf-title" style={{fontSize:32}}>드가이 스포츠</h1><p className="pf-sub">@{handle} · 구독자 12.8만 · 영상 184개</p></div></div><div className="pf-actions"><button className={`pf-btn ${follow?"":"primary"}`} onClick={()=>setFollow(v=>!v)}>{follow?"주파수 저장됨 ✓":"주파수 저장"}</button><select className="pf-btn" value={bell} onChange={e=>setBell(e.target.value)}><option>전체 알림</option><option>맞춤 알림</option><option>알림 없음</option></select><button className="pf-btn">↗ 공유</button></div></div><div className="pf-tabs" style={{marginTop:18,marginBottom:0}}>{tabs.map(x=><button key={x} className={`pf-tab ${tab===x?"active":""}`} onClick={()=>setTab(x)}>{x}</button>)}</div></section>
 <div style={{height:14}}/>
 {tab==="홈"&&<div className="pf-grid"><section className="pf-card pf-span8"><span className="pf-kicker">FEATURED BROADCAST</span><div className="pf-player" style={{marginTop:10}}><span className="pf-playicon">⚾</span></div><h2 style={{marginTop:12}}>이번 주 대표 방송</h2><p>한화 경기 흐름 같이 보기 · 조회수 12만</p><a className="pf-btn primary" href="/watch/1">재생</a></section><aside className="pf-card pf-span4"><h2>채널 정보</h2><p>야구, 스포츠, 가끔 코딩. DTV에서 켜지는 개인 방송국.</p><div className="pf-divider"/><div className="pf-stack"><div className="pf-between"><span>총 조회수</span><b>18.4M</b></div><div className="pf-between"><span>가입일</span><b>2026</b></div><div className="pf-between"><span>콘텐츠 등급</span><b>전체/12+</b></div></div></aside></div>}
 {tab==="영상"&&<div className="pf-grid">{["⚾","⌨","D","👁","♫","✎"].map((icon,i)=><article className="pf-card pf-span4" key={i}><div className="pf-thumb" style={{height:150,fontSize:45}}>{icon}</div><h3 style={{marginTop:12}}>채널 영상 #{i+1}</h3><p>{i+2}.4만회 · {i+1}일 전</p><a className="pf-btn" href={`/watch/${i+1}`}>보기</a></article>)}</div>}
 {tab==="클립"&&<section className="pf-card"><div className="pf-between"><h2>짧은 신호</h2><a className="pf-btn primary" href="/clips">클립 피드 열기</a></div><p>세로형, 정사각형, 가로형 등 원본 비율을 유지하는 DTV 클립.</p></section>}
 {tab==="LIVE"&&<section className="pf-card"><div className="pf-between"><div><span className="pf-status good">ON AIR</span><h2 style={{marginTop:10}}>오늘 경기 같이 보기</h2><p>1.2K명 시청 중 · 라이브 채팅 활성</p></div><a className="pf-btn red" href="/watch/101">LIVE 입장</a></div></section>}
 {tab==="재생목록"&&<div className="pf-grid">{[["경기 같이보기","22개"],["야구 이슈","34개"],["DTV 제작기","12개"]].map(x=><article className="pf-card pf-span4" key={x[0]}><div className="pf-thumb" style={{height:120}}>▤</div><h2 style={{marginTop:12}}>{x[0]}</h2><p>{x[1]} · 공개</p><button className="pf-btn">열기</button></article>)}</div>}
 {tab==="정보"&&<section className="pf-card"><h2>채널 소개</h2><p>이 채널은 스포츠와 제작 콘텐츠를 중심으로 방송합니다. 채널 운영자가 지정한 기본 콘텐츠 등급은 전체 이용가이며 일부 LIVE/영상은 별도 등급이 적용될 수 있습니다.</p><div className="pf-divider"/><div className="pf-actions"><button className="pf-btn">채널 공유</button><button className="pf-btn">채널 신고</button><button className="pf-btn danger">채널 차단</button></div></section>}
 </div></main>
=======
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

const channelProfiles: Record<string, { name: string; initial: string; subscribers: string; bio: string; signal: string }> = {
  dguy: { name: "드가이 스포츠", initial: "D", subscribers: "12.4만", bio: "한화 때문에 매일 고통받지만 또 야구를 봅니다. 경기, 분석, 그리고 같이 떠드는 방송국.", signal: "DGUY SPORTS" },
  "404play": { name: "404 플레이룸", initial: "4", subscribers: "8.1만", bio: "늦은 밤 시작한 게임에서 예상하지 못한 장면을 기록합니다.", signal: "404 PLAYROOM" },
  pixellab: { name: "Pixel Lab", initial: "P", subscribers: "19.7만", bio: "더 나은 화면과 더 선명한 인터랙션을 함께 만듭니다.", signal: "PIXEL LAB" },
  midnightfm: { name: "새벽 주파수", initial: "새", subscribers: "31.2만", bio: "잠들기 전, 조용히 틀어두는 음악과 이야기를 보냅니다.", signal: "MIDNIGHT FM" },
  mono: { name: "모노 드로잉", initial: "M", subscribers: "14.8만", bio: "선과 색으로 하루의 장면을 기록합니다.", signal: "MONO DRAWING" },
  dtech: { name: "D Tech", initial: "D", subscribers: "42.6만", bio: "오늘 필요한 기술 소식을 빠르고 쉽게 정리합니다.", signal: "D TECH" },
  todayus: { name: "오늘의 우리", initial: "오", subscribers: "27.5만", bio: "계획 없이 떠난 하루의 장면을 함께 나눕니다.", signal: "TODAY US" },
};

export default function ChannelPage() {
  const params = useParams<{ handle: string }>();
  const handle = params?.handle ?? "dguy";
  const { theme } = useDtvTheme();
  const [following, setFollowing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("홈");
  const toastTimerRef = useRef<number | null>(null);
  const profile = channelProfiles[handle];

  const showToast = (message: string) => {
    if (toastTimerRef.current !== null) window.clearTimeout(toastTimerRef.current);
    setToast(message);
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 1800);
  };

  if (!profile) {
    return <main className={styles.page}><section className={styles.channelInfo}><div className={styles.identity}><h1>채널을 찾을 수 없습니다.</h1><p>주소를 확인하거나 홈에서 다른 채널을 선택해 주세요.</p><Link href="/">홈으로 돌아가기</Link></div></section></main>;
  }

  return (
    <main className={`${styles.page} ${styles[theme]} ${theme === "vhs" ? vhsStyles.vhsEnhanced : ""}`}>
      <div className={styles.scanlines} aria-hidden="true" />
      <div className={styles.noise} aria-hidden="true" />

      <header className={styles.topbar}>
        <Link href="/" className={styles.brand} aria-label="DTV 홈으로 이동"><strong>D</strong><span>▶</span><b>TV</b></Link>
        <div className={styles.channelSignal}><span className={styles.liveDot} /><span>CH.1026</span><em>ON AIR</em></div>
        <div className={styles.topActions}>
          <SiteThemeMenu />
          <button onClick={() => showToast("공유 링크를 준비했어요 📡")}>공유</button>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroSignal} aria-hidden="true">
          <span>CH 1026</span>
          <strong>{theme === "newsroom" ? "DTV NEWS" : theme === "vhs" ? "PLAY ▶" : profile.signal}</strong>
          <small>{theme === "analog" ? "UHF · STEREO" : theme === "vhs" ? "SEP. 03 2026 13:26" : "YOUR CHANNEL. YOUR BROADCAST."}</small>
        </div>
        <div className={styles.heroGlow} aria-hidden="true" />
      </section>

      {theme === "newsroom" && <div className={styles.breakingBar}><strong>BREAKING</strong><span>{profile.name}, 오늘 19:00 라이브 예정</span></div>}

      <section className={styles.channelInfo}>
        <div className={styles.avatar}>{profile.initial}</div>
        <div className={styles.identity}>
          <div className={styles.nameLine}><h1>{profile.name}</h1><span className={styles.verified}>✓</span><span className={styles.handle}>@{handle}</span></div>
          <p>구독자 {profile.subscribers} · 영상 186개</p>
          <p className={styles.bio}>{profile.bio}</p>
        </div>
        <button className={`${styles.subscribe} ${following ? styles.subscribed : ""}`} onClick={() => setFollowing((value) => !value)}>{following ? "구독 중" : "구독"}</button>
      </section>

      <nav className={styles.tabs} aria-label="채널 메뉴">
        {["홈", "영상", "D-Clips", "LIVE", "프로그램", "편성표", "커뮤니티", "정보"].map((tab) => <button key={tab} className={activeTab === tab ? styles.activeTab : ""} aria-current={activeTab === tab ? "page" : undefined} onClick={() => { setActiveTab(tab); if (tab !== "홈") showToast(`${tab} 탭은 다음 단계에서 연결됩니다.`); }}>{tab === "LIVE" && <span className={styles.liveDot} />} {tab}</button>)}
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

          <div className={styles.sectionHead}><div><span className={styles.eyebrow}>LATEST PROGRAMS</span><h2>최신 영상</h2></div><button onClick={() => showToast("전체 영상 목록은 다음 단계에서 연결됩니다.")}>모두 보기 →</button></div>
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
>>>>>>> Stashed changes
}
