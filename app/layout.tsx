import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import PlaybackProvider from "@/components/playback-provider";
import MiniPlayer from "@/components/mini-player";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Drawing TV",
  description: "영상·클립·커뮤니티 신호가 연결되는 창작 소셜 플랫폼. 피드는 2026년, 채널은 1996년.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased`}
      >
        <PlaybackProvider>
          {children}
          <MiniPlayer />
        </PlaybackProvider>
      </body>
    </html>
  );
}
