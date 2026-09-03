import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DTV | Your channel. Your broadcast.",
  description: "영상을 발견하고, 올리고, 자신의 채널을 방송하는 영상 플랫폼 DTV.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
