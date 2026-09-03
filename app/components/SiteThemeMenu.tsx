"use client";

import { useEffect, useRef, useState } from "react";
import { dtvThemes, useDtvTheme } from "./ThemeProvider";

export default function SiteThemeMenu({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useDtvTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const activeTheme = dtvThemes.find((item) => item.id === theme) ?? dtvThemes[0];

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="site-theme-control" ref={rootRef}>
      <button
        type="button"
        className={`site-theme-trigger ${compact ? "compact" : ""}`}
        aria-label="DTV 전체 테마 설정"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="site-theme-gear">⚙</span>
        {!compact && <span>테마</span>}
      </button>

      {open && (
        <div className="site-theme-menu" role="dialog" aria-label="DTV 전체 테마">
          <div className="site-theme-menu-head">
            <div>
              <small>DTV APPEARANCE</small>
              <strong>전체 방송 스타일</strong>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="닫기">×</button>
          </div>
          <p>선택한 스타일은 홈, 알림, 채널 등 DTV 전체에 적용됩니다.</p>

          <div className="site-theme-options">
            {dtvThemes.map((item) => (
              <button
                type="button"
                key={item.id}
                className={theme === item.id ? "active" : ""}
                onClick={() => setTheme(item.id)}
              >
                <span className="site-theme-icon">{item.icon}</span>
                <span className="site-theme-copy">
                  <strong>{item.label}</strong>
                  <small>{item.description}</small>
                </span>
                {theme === item.id && <b>✓</b>}
              </button>
            ))}
          </div>

          <div className="site-theme-current">
            현재 스타일 <strong>{activeTheme.label}</strong>
          </div>
        </div>
      )}
    </div>
  );
}
