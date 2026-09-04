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
  ["⚙", "설정", "/settings"],
  ["◆", "관리자", "/admin"],
] as const;

export default function PlatformLauncher() {
  const [open, setOpen] = useState(false);
  return (
    <div className="pf-launcher">
      {open && <div className="pf-launch-menu"><strong>DTV PLATFORM</strong>{links.map(([icon,label,href]) => <a key={href} href={href}><i>{icon}</i><span>{label}</span></a>)}</div>}
      <button aria-label="DTV 플랫폼 메뉴" onClick={() => setOpen(v => !v)}>{open ? "×" : "D+"}</button>
    </div>
  );
}
