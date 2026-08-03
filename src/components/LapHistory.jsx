import { useMemo, useState } from "react";
import { formatTime } from "../utils/time.js";
import { IconChevron } from "./Icons.jsx";

/**
 * Collapsible lap table — newest lap on top, fastest/slowest badges.
 */
export default function LapHistory({ laps, digits = 2 }) {
  const [open, setOpen] = useState(true);

  const { fastId, slowId } = useMemo(() => {
    if (laps.length < 2) return { fastId: -1, slowId: -1 };
    let fast = laps[0];
    let slow = laps[0];
    for (const l of laps) {
      if (l.lapMs < fast.lapMs) fast = l;
      if (l.lapMs > slow.lapMs) slow = l;
    }
    return { fastId: fast.id, slowId: slow.id };
  }, [laps]);

  const total = laps.length;

  return (
    <section className="lap-section">
      <button
        type="button"
        className="lap-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        Lap history
        <span className="lap-count">{total}</span>
        <IconChevron className={open ? "chev" : "chev rot"} />
      </button>

      <div className="lap-collapse" data-open={open}>
        <div>
          {total === 0 ? (
            <p className="empty-laps">No laps yet — press Lap while the clock is running. 🏁</p>
          ) : (
            <div className="table-wrap">
              <table className="lap-table">
                <thead>
                  <tr>
                    <th scope="col">Lap</th>
                    <th scope="col">Time</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {laps.map((l, idx) => (
                    <tr key={l.id} className={idx === 0 ? "is-new" : ""}>
                      <td>Lap {total - idx}</td>
                      <td className="lap-time">
                        {formatTime(l.lapMs, digits)}
                        {l.id === fastId && <span className="badge badge-fast">Fastest</span>}
                        {l.id === slowId && <span className="badge badge-slow">Slowest</span>}
                      </td>
                      <td>{formatTime(l.totalMs, digits)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
