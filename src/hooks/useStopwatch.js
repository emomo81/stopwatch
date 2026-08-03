import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Precision stopwatch engine.
 *
 * Uses `performance.now()` timestamps (drift-free — intervals alone would drift)
 * and `requestAnimationFrame` for frame-smooth centisecond/millisecond updates.
 *
 * @returns {{
 *   elapsedMs: number,
 *   isRunning: boolean,
 *   laps: Array<{ id: number, lapMs: number, totalMs: number }>, // newest first
 *   start: () => void,
 *   stop: () => void,
 *   toggle: () => void,
 *   lap: () => void,
 *   reset: () => void,
 * }}
 */
export function useStopwatch() {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const runningRef = useRef(false);
  const accumulatedRef = useRef(0); // ms banked from previous runs
  const startedAtRef = useRef(0); // performance.now() of current run's start
  const frameRef = useRef(null);
  const lapCounterRef = useRef(0);
  const lapsRef = useRef([]);

  const current = useCallback(
    () =>
      runningRef.current
        ? accumulatedRef.current + performance.now() - startedAtRef.current
        : accumulatedRef.current,
    []
  );

  const loop = useCallback(() => {
    setElapsedMs(current());
    frameRef.current = requestAnimationFrame(loop);
  }, [current]);

  const start = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    setIsRunning(true);
    startedAtRef.current = performance.now();
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(loop);
  }, [loop]);

  const stop = useCallback(() => {
    if (!runningRef.current) return;
    runningRef.current = false;
    setIsRunning(false);
    cancelAnimationFrame(frameRef.current);
    accumulatedRef.current = current();
    setElapsedMs(accumulatedRef.current);
  }, [current]);

  const toggle = useCallback(() => {
    if (runningRef.current) stop();
    else start();
  }, [start, stop]);

  const lap = useCallback(() => {
    if (!runningRef.current) return;
    const total = current();
    const prevTotal = lapsRef.current[0]?.totalMs ?? 0;
    lapCounterRef.current += 1;
    const entry = {
      id: lapCounterRef.current,
      lapMs: total - prevTotal,
      totalMs: total,
    };
    setLaps((prev) => [entry, ...prev]);
  }, [current]);

  const reset = useCallback(() => {
    runningRef.current = false;
    setIsRunning(false);
    cancelAnimationFrame(frameRef.current);
    accumulatedRef.current = 0;
    setElapsedMs(0);
    setLaps([]);
  }, []);

  // Keep a fresh ref copy of laps for synchronous reads inside lap().
  useEffect(() => {
    lapsRef.current = laps;
  }, [laps]);

  // Freeze-frame when the tab is backgrounded; snap back on return.
  useEffect(() => {
    const onVisibility = () => setElapsedMs(current());
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [current]);

  // Final cleanup.
  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  return { elapsedMs, isRunning, laps, start, stop, toggle, lap, reset };
}
