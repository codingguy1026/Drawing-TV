export type ClipRecord = {
  id: string;
  videoId: string;
  title: string;
  originalTitle: string;
  creator: string;
  accent: string;
  startTime: number;
  endTime: number;
  createdAt: string;
  viewCount: number;
};

const STORAGE_KEY = "drawing-tv-clips";

export function saveClip(clip: ClipRecord) {
  if (typeof window === "undefined") return;

  const existing = readClips();
  const next = [clip, ...existing.filter((item) => item.id !== clip.id)];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function readClips(): ClipRecord[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getClip(id: string) {
  return readClips().find((clip) => clip.id === id) ?? null;
}
