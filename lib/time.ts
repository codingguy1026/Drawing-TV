export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function timestampToSeconds(input: string): number | null {
  const value = input.trim().toLowerCase();
  if (!value) return null;

  if (value.includes(":")) {
    const parts = value.split(":").map((part) => Number(part));
    if ((parts.length !== 2 && parts.length !== 3) || parts.some((part) => !Number.isFinite(part) || part < 0)) {
      return null;
    }

    if (parts.length === 2) {
      const [minutes, seconds] = parts;
      if (seconds >= 60) return null;
      return minutes * 60 + seconds;
    }

    const [hours, minutes, seconds] = parts;
    if (minutes >= 60 || seconds >= 60) return null;
    return hours * 3600 + minutes * 60 + seconds;
  }

  if (/^\d+$/.test(value)) {
    return Number(value);
  }

  const human = value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
  if (!human || (!human[1] && !human[2] && !human[3])) return null;

  return Number(human[1] ?? 0) * 3600 + Number(human[2] ?? 0) * 60 + Number(human[3] ?? 0);
}

export function formatTimestamp(totalSeconds: number) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
