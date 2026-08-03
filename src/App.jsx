import { useEffect, useRef, useState } from "react";
import { useStopwatch } from "./hooks/useStopwatch.js";
import { loadJSON, saveJSON } from "./utils/storage.js";
import { playClick } from "./utils/sound.js";
import { formatTime } from "./utils/time.js";
import TimeDisplay from "./components/TimeDisplay.jsx";
import Controls from "./components/Controls.jsx";
import Waveform from "./components/Waveform.jsx";
import LapHistory from "./components/LapHistory.jsx";
import SettingsModal from "./components/SettingsModal.jsx";
import SessionDrawer from "./components/SessionDrawer.jsx";
import { IconGear, IconHistory } from "./components/Icons.jsx";

const SETTINGS_KEY = "p4-settings";
const SESSIONS_KEY = "p4-sessions";
const DEFAULT_SETTINGS = {
  precision: 2, // 2 = 1/100s display, 3 = full ms
  shortcuts: true,
  sound: true,
  saveSessions: true,
};

export default function App() {
  const { elapsedMs, isRunning, laps, toggle, lap, reset } = useStopwatch();

  const [settings, setSettings] = useState(() => loadJSON(SETTINGS_KEY, DEFAULT_SETTINGS));
  const [sessions, setSessions] = useState(() => loadJSON(SESSIONS_KEY, []));
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const toastTimer = useRef(null);

  /* ---------- persistence ---------- */
  useEffect(() => saveJSON(SETTINGS_KEY, settings), [settings]);
  useEffect(() => saveJSON(SESSIONS_KEY, sessions), [sessions]);

  /* ---------- live document title ---------- */
  useEffect(() => {
    document.title =
      elapsedMs > 0
        ? `${formatTime(elapsedMs)} · Stopwatch — Project 4`
        : "Project 4 — Stopwatch";
  }, [elapsedMs]);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  };
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  /* ---------- actions ---------- */
  const sfx = (type) => settings.sound && playClick(type);

  const handleToggle = () => {
    sfx(isRunning ? "stop" : "start");
    toggle();
  };

  const handleLap = () => {
    if (!isRunning) return;
    sfx("lap");
    lap();
  };

  const canReset = elapsedMs > 0 && !isRunning;

  const handleReset = () => {
    if (!canReset) return;
    sfx("reset");
    if (settings.saveSessions) {
      const lapTimes = [...laps].reverse().map((l) => l.lapMs);
      const session = {
        id: Date.now(),
        at: Date.now(),
        totalMs: elapsedMs,
        count: lapTimes.length,
        bestMs: lapTimes.length ? Math.min(...lapTimes) : null,
      };
      setSessions((prev) => [session, ...prev].slice(0, 30));
      showToast("✓ Session saved to history");
    }
    reset();
  };

  /* ---------- keyboard shortcuts ---------- */
  const handlersRef = useRef({});
  handlersRef.current = { handleToggle, handleLap, handleReset };
  const flagsRef = useRef({});
  flagsRef.current = {
    shortcuts: settings.shortcuts,
    panelsOpen: settingsOpen || historyOpen,
  };

  useEffect(() => {
    const onKey = (e) => {
      const f = flagsRef.current;
      if (!f.shortcuts || f.panelsOpen) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.code === "Space") {
        e.preventDefault();
        handlersRef.current.handleToggle();
      } else if (e.code === "KeyL") {
        handlersRef.current.handleLap();
      } else if (e.code === "KeyR") {
        handlersRef.current.handleReset();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ---------- render ---------- */
  return (
    <div className="app">
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />
      <div className="bg-grid" />
      <div className="bg-noise" />

      <header className="topbar">
        <div>
          <p className="brand">
            PROJECT <span>4</span>
          </p>
          <p className="brand-sub">SF Pro · Chrono Suite</p>
        </div>
        <div className="topbar-right">
          <span className={`status-dot${isRunning ? " on" : ""}`} />
          <p className="page-title">{isRunning ? "Running…" : "Stopwatch"}</p>
        </div>
      </header>

      <main className="card">
        <div className="card-spark">✦</div>

        <TimeDisplay ms={elapsedMs} digits={settings.precision} running={isRunning} />
        <p className="total-caption">Total elapsed time</p>

        <Controls
          isRunning={isRunning}
          canReset={canReset}
          onToggle={handleToggle}
          onLap={handleLap}
          onReset={handleReset}
        />

        {settings.shortcuts && (
          <div className="hints" aria-hidden="true">
            <span>
              <kbd>Space</kbd> start / stop
            </span>
            <span>
              <kbd>L</kbd> lap
            </span>
            <span>
              <kbd>R</kbd> reset
            </span>
          </div>
        )}

        <div className="lap-grid">
          <Waveform laps={laps} isRunning={isRunning} />
          <LapHistory laps={laps} digits={settings.precision} />
        </div>
      </main>

      <footer className="footer-links">
        <button type="button" className="footer-link" onClick={() => setSettingsOpen(true)}>
          <IconGear /> Settings
        </button>
        <button type="button" className="footer-link" onClick={() => setHistoryOpen(true)}>
          <IconHistory /> Session history
        </button>
      </footer>

      {settingsOpen && (
        <SettingsModal
          settings={settings}
          onChange={setSettings}
          onClose={() => setSettingsOpen(false)}
        />
      )}

      {historyOpen && (
        <SessionDrawer
          sessions={sessions}
          onClear={() => {
            setSessions([]);
            showToast("Session history cleared");
          }}
          onClose={() => setHistoryOpen(false)}
        />
      )}

      <div className={`toast${toast ? " show" : ""}`} role="status">
        {toast}
      </div>
    </div>
  );
}
