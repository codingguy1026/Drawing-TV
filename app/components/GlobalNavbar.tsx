"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import NotificationPanel from "./NotificationPanel";
import SiteThemeMenu from "./SiteThemeMenu";

const links = [
  { href: "/", label: "홈" },
  { href: "/#on-air", label: "LIVE" },
  { href: "/clips", label: "클립" },
  { href: "/trending", label: "인기" },
];

export default function GlobalNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };

  const active = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="global-nav">
        <div className="global-nav__inner">
          <Link href="/" className="global-nav__brand" aria-label="DTV 홈">
            <img src="/dtv-mark.svg" alt="" aria-hidden="true" />
            <strong>DTV</strong>
            <span>● SIGNAL ON</span>
          </Link>

          <nav className="global-nav__links" aria-label="DTV 주요 메뉴">
            {links.map((item) => (
              <Link key={item.href} href={item.href} className={active(item.href) ? "active" : ""}>
                {item.label}
              </Link>
            ))}
          </nav>

          <form className="global-nav__search" onSubmit={submitSearch}>
            <span>⌕</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="영상, 채널, LIVE 검색" aria-label="DTV 검색" />
            <button type="submit">검색</button>
          </form>

          <div className="global-nav__actions">
            <Link href="/upload" className="global-nav__create">＋ <span>업로드</span></Link>
            <SiteThemeMenu compact />
            <button className="global-nav__icon" aria-label="알림" onClick={() => setNotificationsOpen((value) => !value)}>
              ♢{hasUnread && <i />}
            </button>
            <Link href="/account" className="global-nav__profile" aria-label="내 계정">D</Link>
          </div>
        </div>
      </header>

      <NotificationPanel open={notificationsOpen} onClose={() => setNotificationsOpen(false)} onUnreadChange={setHasUnread} />
    </>
  );
}
