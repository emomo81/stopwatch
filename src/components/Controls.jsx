import { IconFlag, IconPlay, IconRestart, IconStop } from "./Icons.jsx";

/**
 * Start / Stop toggle · Lap · Reset — the hero buttons.
 */
export default function Controls({ isRunning, canReset, onToggle, onLap, onReset }) {
  return (
    <div className="controls">
      <button
        type="button"
        className={`btn ${isRunning ? "btn-stop" : "btn-start"}`}
        onClick={onToggle}
        aria-pressed={isRunning}
      >
        {isRunning ? (
          <>
            <IconStop /> Stop
          </>
        ) : (
          <>
            <IconPlay /> Start
          </>
        )}
      </button>

      <button
        type="button"
        className="btn btn-lap"
        onClick={onLap}
        disabled={!isRunning}
        title={isRunning ? "Mark a lap (L)" : "Start the timer to take laps"}
      >
        <IconFlag /> Lap
      </button>

      <button
        type="button"
        className="btn btn-reset"
        onClick={onReset}
        disabled={!canReset}
        title="Stop and reset (R)"
      >
        <IconRestart /> Reset
      </button>
    </div>
  );
}
