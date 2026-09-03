"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./notification-panel.module.css";

type NotificationKind = "live" | "video" | "comment" | "system";

type DtvNotification = {
  id: number;
  kind: NotificationKind;
  title: string;
  detail: string;
  time: string;
  avatar: string;
  unread: boolean;
  badge?: string;
};

const initialNotifications: DtvNotification[] = [
  {
    id: 1,
    kind: "live",
    title: "Pixel Lab이 방송을 시작했습니다",
    detail: "새 프로젝트 UI 같이 만들기",
    time: "방금",
    avatar: "P",
    unread: true,
    badge: "LIVE",
  },
  {
    id: 2,
    kind: "comment",
    title: "@baseball_26님이 회원님의 댓글에 답글을 남겼습니다",
    detail: "“9회말 그 장면은 진짜 다시 봐도…”",
    time: "8분 전",
    avatar: "B",
    unread: true,
  },
  {
    id: 3,
    kind: "video",
    title: "404 플레이룸에 새 영상이 올라왔습니다",
    detail: "새벽 2시에 시작한 공포게임이 이상하다",
    time: "42분 전",
    avatar: "4",
    unread: true,
  },
  {
    id: 4,
    kind: "video",
    title: "모노 드로잉이 새 영상을 게시했습니다",
    detail: "태블릿 하나로 그림 작업 어디까지 가능할까?",
    time: "2시간 전",
    avatar: "M",
    unread: false,
  },
  {
    id: 5,
    kind: "system",
    title: "DTV Studio 업데이트",
    detail: "채널에 Modern, Analog, VHS, Newsroom 방송 테마가 추가되었습니다.",
    time: "어제",
    avatar: "D",
    unread: false,
  },
];

const kindIcon: Record<NotificationKind, string> = {
  live: "●",
  video: "▶",
  comment: "↩",
  system: "✦",
};

export default function NotificationPanel({
  open,
  onClose,
  onUnreadChange,
}: {
  open: boolean;
  onClose: () => void;
  onUnreadChange?: (hasUnread: boolean) => void;
}) {
  const [items, setItems] = useState(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = items.filter((item) => item.unread).length;
  const visibleItems = useMemo(
    () => (filter === "unread" ? items.filter((item) => item.unread) : items),
    [filter, items],
  );

  useEffect(() => {
    onUnreadChange?.(unreadCount > 0);
  }, [onUnreadChange, unreadCount]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const markOneRead = (id: number) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, unread: false } : item)));
  };

  const markAllRead = () => {
    setItems((current) => current.map((item) => ({ ...item, unread: false })));
  };

  return (
    <>
      <button className={styles.backdrop} aria-label="알림 닫기" onClick={onClose} />
      <aside className={styles.panel} aria-label="알림" role="dialog" aria-modal="true">
        <div className={styles.signalBar}>
          <span>DTV SIGNAL CENTER</span>
          <span>{unreadCount > 0 ? `${unreadCount} NEW` : "ALL CLEAR"}</span>
        </div>

        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>NOTIFICATIONS</span>
            <h2>알림</h2>
          </div>
          <div className={styles.headerActions}>
            {unreadCount > 0 && <button onClick={markAllRead}>모두 읽음</button>}
            <button className={styles.close} onClick={onClose} aria-label="알림 닫기">×</button>
          </div>
        </header>

        <div className={styles.filters}>
          <button className={filter === "all" ? styles.active : ""} onClick={() => setFilter("all")}>전체</button>
          <button className={filter === "unread" ? styles.active : ""} onClick={() => setFilter("unread")}>읽지 않음 <span>{unreadCount}</span></button>
        </div>

        <div className={styles.list}>
          {visibleItems.length > 0 ? visibleItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.item} ${item.unread ? styles.unread : ""}`}
              onClick={() => markOneRead(item.id)}
            >
              <span className={`${styles.avatar} ${styles[`kind_${item.kind}`]}`}>{item.avatar}</span>
              <span className={styles.copy}>
                <span className={styles.titleLine}>
                  <strong>{item.title}</strong>
                  {item.badge && <b>{item.badge}</b>}
                </span>
                <span className={styles.detail}>{item.detail}</span>
                <span className={styles.meta}><i>{kindIcon[item.kind]}</i>{item.time}</span>
              </span>
              {item.unread && <span className={styles.unreadDot} aria-label="읽지 않음" />}
            </button>
          )) : (
            <div className={styles.empty}>
              <span>✓</span>
              <strong>새 신호가 없습니다</strong>
              <p>새 영상이나 LIVE가 시작되면 여기에 표시됩니다.</p>
            </div>
          )}
        </div>

        <footer className={styles.footer}>
          <button>알림 설정</button>
          <span>CH · PERSONAL FEED</span>
        </footer>
      </aside>
    </>
  );
}
