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
  description: "A standalone youth-focused video platform for discovery, creators, and community.",
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
