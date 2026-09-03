"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type DtvTheme = "modern" | "analog" | "vhs" | "newsroom";

export const dtvThemes = [
  { id: "modern" as const, label: "Modern", icon: "✦", description: "깔끔한 디지털 DTV" },
  { id: "analog" as const, label: "Analog", icon: "▣", description: "CRT 공중파와 오래된 방송 감성" },
  { id: "vhs" as const, label: "VHS", icon: "▶", description: "캠코더, 테이프, 트래킹 노이즈" },
  { id: "newsroom" as const, label: "Newsroom", icon: "●", description: "속보와 라이브 뉴스 네트워크" },
];

type ThemeContextValue = {
  theme: DtvTheme;
  setTheme: (theme: DtvTheme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isTheme(value: string | null): value is DtvTheme {
  return dtvThemes.some((theme) => theme.id === value);
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<DtvTheme>("modern");

  useEffect(() => {
    const current = document.documentElement.dataset.dtvTheme;
    const saved = window.localStorage.getItem("dtv-site-theme");
    const legacy = window.localStorage.getItem("dtv-channel-theme");
    const initial = isTheme(current ?? null)
      ? current as DtvTheme
      : isTheme(saved)
        ? saved
        : isTheme(legacy)
          ? legacy
          : "modern";

    setThemeState(initial);
    document.documentElement.dataset.dtvTheme = initial;
    window.localStorage.setItem("dtv-site-theme", initial);
  }, []);

  const setTheme = (nextTheme: DtvTheme) => {
    setThemeState(nextTheme);
    document.documentElement.dataset.dtvTheme = nextTheme;
    window.localStorage.setItem("dtv-site-theme", nextTheme);
  };

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useDtvTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useDtvTheme must be used inside ThemeProvider");
  return context;
}
