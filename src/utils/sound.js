/**
 * Tiny WebAudio click/beep feedback — no audio assets needed.
 * The context is created lazily on the first user gesture, which
 * keeps autoplay policies happy.
 */

let ctx = null;

function audio() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  ctx = ctx || new AC();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

const PATTERNS = {
  start: [
    [660, 0],
    [880, 0.07],
  ],
  stop: [
    [520, 0],
    [380, 0.08],
  ],
  lap: [
    [990, 0],
    [1320, 0.06],
  ],
  reset: [[300, 0]],
};

export function playClick(type) {
  try {
    const a = audio();
    if (!a) return;
    const notes = PATTERNS[type] || [[800, 0]];
    const t = a.currentTime;
    notes.forEach(([freq, offset]) => {
      const osc = a.createOscillator();
      const gain = a.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      osc.connect(gain);
      gain.connect(a.destination);
      const t0 = t + offset;
      gain.gain.setValueAtTime(0, t0);
      gain.gain.linearRampToValueAtTime(0.06, t0 + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.12);
      osc.start(t0);
      osc.stop(t0 + 0.14);
    });
  } catch {
    /* audio not available — stay silent */
  }
}
