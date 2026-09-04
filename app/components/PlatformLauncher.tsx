"use client";

import { useState } from "react";

const links = [
  ["⌂", "홈", "/"],
  ["⌕", "검색", "/search"],
  ["↥", "업로드", "/upload"],
  ["▣", "보관함", "/library"],
  ["↗", "트렌딩", "/trending"],
  ["▤", "스튜디오", "/studio"],
  ["◎", "계정", "/account"],
  ["◆", "관리자", "/admin"],
] as const;

export default function PlatformLauncher() {
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoplay, setAutoplay] = useState(true);
  const [captions, setCaptions] = useState(true);
  const [restrictedMode, setRestrictedMode] = useState(false);
  const [quality, setQuality] = useState("자동");

  const openSettings = () => {
    setOpen(false);
    setSettingsOpen(true);
  };

  return (
    <>
      <div className="pf-launcher">
        {open && (
          <div className="pf-launch-menu">
            <strong>DTV PLATFORM</strong>
            {links.map(([icon, label, href]) => (
              <a key={href} href={href}><i>{icon}</i><span>{label}</span></a>
            ))}
            <button className="pf-launch-settings" onClick={openSettings}>
              <i>⚙</i><span>설정</span><b>빠른 설정</b>
            </button>
          </div>
        )}
        <button aria-label="DTV 플랫폼 메뉴" onClick={() => setOpen(v => !v)}>{open ? "×" : "D+"}</button>
      </div>

      {settingsOpen && (
        <div className="pf-settings-layer" role="dialog" aria-modal="true" aria-label="DTV 설정">
          <button className="pf-settings-backdrop" aria-label="설정 닫기" onClick={() => setSettingsOpen(false)} />
          <section className="pf-settings-modal">
            <header className="pf-settings-head">
              <div><span>DTV SETTINGS</span><h2>빠른 설정</h2><p>현재 화면을 떠나지 않고 바로 적용합니다.</p></div>
              <button aria-label="닫기" onClick={() => setSettingsOpen(false)}>×</button>
            </header>

            <div className="pf-settings-body">
              <label className="pf-settings-row">
                <span><b>알림</b><small>새 영상, LIVE, 답글 알림</small></span>
                <input type="checkbox" checked={notifications} onChange={e => setNotifications(e.target.checked)} />
              </label>

              <label className="pf-settings-row">
                <span><b>자동재생</b><small>추천 영상을 이어서 재생</small></span>
                <input type="checkbox" checked={autoplay} onChange={e => setAutoplay(e.target.checked)} />
              </label>

              <label className="pf-settings-row">
                <span><b>기본 자막</b><small>지원 영상에서 자막 자동 표시</small></span>
                <input type="checkbox" checked={captions} onChange={e => setCaptions(e.target.checked)} />
              </label>

              <div className="pf-settings-row select-row">
                <span><b>기본 화질</b><small>네트워크 상황에 따라 실제 화질은 달라질 수 있음</small></span>
                <select value={quality} onChange={e => setQuality(e.target.value)}>
                  <option>자동</option><option>2160p</option><option>1080p</option><option>720p</option><option>480p</option>
                </select>
              </div>

              <label className="pf-settings-row">
                <span><b>제한 모드</b><small>민감할 수 있는 콘텐츠를 줄여 표시</small></span>
                <input type="checkbox" checked={restrictedMode} onChange={e => setRestrictedMode(e.target.checked)} />
              </label>
            </div>

            <footer className="pf-settings-foot">
              <span>변경사항은 이 데모 세션에 즉시 적용됨</span>
              <button onClick={() => setSettingsOpen(false)}>완료</button>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}
