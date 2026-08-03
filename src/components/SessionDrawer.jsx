import { useEffect } from "react";
import { formatDate, formatTime } from "../utils/time.js";
import { IconClose, IconTrash } from "./Icons.jsx";

/**
 * Side drawer listing saved sessions (newest first).
 */
export default function SessionDrawer({ sessions, onClear, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Session history">
        <div className="panel-head">
          <h2>Sessions</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close history">
            <IconClose />
          </button>
        </div>

        {sessions.length === 0 ? (
          <p className="empty-panel">
            No sessions yet.
            <br />
            Run the stopwatch and press Reset —
            <br />
            your session will land here. ⏱️
          </p>
        ) : (
          <>
            {sessions.map((s, i) => (
              <div className="session-item" key={s.id}>
                <div className="session-idx">{String(sessions.length - i).padStart(2, "0")}</div>
                <div className="session-main">
                  <div className="session-total">{formatTime(s.totalMs)}</div>
                  <div className="session-meta">
                    {formatDate(s.at)} · {s.count} {s.count === 1 ? "lap" : "laps"}
                    {s.bestMs != null && <> · best {formatTime(s.bestMs)}</>}
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="clear-btn" onClick={onClear}>
              <IconTrash /> Clear history
            </button>
          </>
        )}
      </aside>
    </>
  );
}
