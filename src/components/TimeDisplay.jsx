import { splitParts } from "../utils/time.js";

/**
 * The big glowing MM : SS : FF readout with a label above each segment.
 */
export default function TimeDisplay({ ms, digits = 2, running = false }) {
  const { m, s, frac } = splitParts(ms, digits);
  const a11y = `${Number(m)} minutes, ${Number(s)} seconds and ${digits === 3 ? Number(frac) + " milliseconds" : Number(frac) + " centiseconds"}`;

  return (
    <div
      className={`display${running ? " running" : ""}`}
      role="timer"
      aria-live="off"
      aria-label={`Elapsed time: ${a11y}`}
    >
      <div className="segment">
        <span className="segment-label">Minutes</span>
        <span className="segment-digits">{m}</span>
      </div>
      <span className="colon">:</span>
      <div className="segment">
        <span className="segment-label">Seconds</span>
        <span className="segment-digits">{s}</span>
      </div>
      <span className="colon">:</span>
      <div className="segment">
        <span className="segment-label">{digits === 3 ? "Milliseconds" : "Hundredths"}</span>
        <span className="segment-digits">{frac}</span>
      </div>
    </div>
  );
}
