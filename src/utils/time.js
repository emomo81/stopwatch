/**
 * Split a millisecond duration into display parts.
 * @param {number} ms
 * @param {2|3} fracDigits 2 = centiseconds, 3 = full milliseconds
 */
export function splitParts(ms, fracDigits = 2) {
  const msInt = Math.max(0, Math.floor(ms));
  const frac =
    fracDigits === 3 ? msInt % 1000 : Math.floor(msInt / 10) % 100;
  const totalSec = Math.floor(msInt / 1000);
  const s = totalSec % 60;
  const m = Math.floor(totalSec / 60);
  return {
    m: String(m).padStart(2, "0"),
    s: String(s).padStart(2, "0"),
    frac: String(frac).padStart(fracDigits, "0"),
  };
}

/** "12:38.34" — used in the lap table, badges and sessions. */
export function formatTime(ms, fracDigits = 2) {
  const { m, s, frac } = splitParts(ms, fracDigits);
  return `${m}:${s}.${frac}`;
}

/** "Aug 3, 14:05" — used in the session history drawer. */
export function formatDate(at) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(at));
}
