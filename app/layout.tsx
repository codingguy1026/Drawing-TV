import type { Metadata } from "next";
import "./globals.css";
import "./site-themes.css";
import "./platform.css";
import "./brand.css";
import "./global-navbar.css";
import "./settings-modal.css";
import ThemeProvider from "./components/ThemeProvider";
import PlatformLauncher from "./components/PlatformLauncher";
import GlobalNavbar from "./components/GlobalNavbar";

export const metadata: Metadata = {
  title: "DTV | Your channel. Your broadcast.",
  description: "영상을 발견하고, 올리고, 자신의 채널을 방송하는 영상 플랫폼 DTV.",
};

const themeBootScript = `
(() => {
  try {
    const allowed = ['modern', 'analog', 'vhs', 'newsroom'];
    const saved = localStorage.getItem('dtv-site-theme');
    const legacy = localStorage.getItem('dtv-channel-theme');
    const theme = allowed.includes(saved) ? saved : allowed.includes(legacy) ? legacy : 'modern';
    document.documentElement.dataset.dtvTheme = theme;
  } catch (_) {
    document.documentElement.dataset.dtvTheme = 'modern';
  }
})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" data-dtv-theme="modern" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeBootScript }} /></head>
      <body>
        <ThemeProvider>
          <GlobalNavbar />
          {children}
          <PlatformLauncher />
        </ThemeProvider>
      </body>
    </html>
  );
}
