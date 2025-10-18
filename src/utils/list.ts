export function formatDateRange(startISO: string, endISO: string) {
  const start = new Date(startISO);
  const end = new Date(endISO);
  const optsDate: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short" };
  const optsTime: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" };
  const sameDay = start.toDateString() === end.toDateString();
  if (sameDay) {
    return `${start.toLocaleDateString(undefined, optsDate)} · ${start.toLocaleTimeString(undefined, optsTime)}–${end.toLocaleTimeString(undefined, optsTime)}`;
  }
  return `${start.toLocaleDateString(undefined, optsDate)} ${start.toLocaleTimeString(undefined, optsTime)} → ${end.toLocaleDateString(undefined, optsDate)} ${end.toLocaleTimeString(undefined, optsTime)}`;
}