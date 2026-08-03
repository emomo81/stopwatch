import { useId, useMemo } from "react";

// Decorative pattern shown before the first lap.
const IDLE_BARS = [34, 58, 26, 72, 30, 88, 40, 62, 24, 70, 36, 82, 28, 66, 44, 76, 26, 54, 38, 60];

/**
 * Animated pace bars drawn from real lap durations (oldest → newest).
 * Shorter (faster) lap = taller bar. The newest bar glows orange,
 * the fastest green, the slowest red. Bars gently wobble while running.
 */
export default function Waveform({ laps, isRunning }) {
  const gradientId = useId();

  const { bars, minIdx, maxIdx } = useMemo(() => {
    if (!laps.length) return { bars: IDLE_BARS, minIdx: -1, maxIdx: -1 };
    const durations = [...laps]
      .reverse()
      .map((l) => l.lapMs)
      .slice(-20);
    const min = Math.min(...durations);
    const max = Math.max(...durations);
    const norm = (d) => (max === min ? 58 : 26 + ((max - d) / (max - min)) * 66);
    return {
      bars: durations.map(norm),
      minIdx: durations.indexOf(min),
      maxIdx: durations.indexOf(max),
    };
  }, [laps]);

  const width = bars.length * 9 + 22;

  return (
    <div className={`wave${isRunning ? " running" : ""}`} aria-hidden="true">
      <svg viewBox={`0 0 ${width} 100`} height="96" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={`${gradientId}o`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffb37a" />
            <stop offset="100%" stopColor="#f76b1c" />
          </linearGradient>
          <linearGradient id={`${gradientId}b`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8fc2ff" />
            <stop offset="100%" stopColor="#3a84fd" />
          </linearGradient>
        </defs>

        <line className="wave-base" x1="4" y1="50" x2={width - 4} y2="50" />

        {bars.map((h, i) => {
          let cls = "bar";
          let style = { "--d": `${(i * 0.07).toFixed(2)}s` };
          if (laps.length) {
            if (i === bars.length - 1) cls += " bar-now";
            else if (i === minIdx) cls += " bar-best";
            else if (i === maxIdx) cls += " bar-worst";
          } else {
            if (i === 5) style.fill = `url(#${gradientId}o)`;
            if (i === 11) style.fill = `url(#${gradientId}b)`;
          }
          return (
            <rect
              key={i}
              className={cls}
              style={style}
              x={11 + i * 9}
              y={50 - h / 2}
              width="4"
              rx="2"
              height={h}
            />
          );
        })}
      </svg>
      <p className="wave-caption">
        {laps.length ? "Your pace · lap by lap" : "Take a lap to draw your rhythm"}
      </p>
    </div>
  );
}
