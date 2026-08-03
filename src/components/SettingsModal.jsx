import { useEffect } from "react";
import { IconClose } from "./Icons.jsx";

function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className="switch"
      onClick={() => onChange(!checked)}
    />
  );
}

/**
 * Settings: millisecond precision, keyboard shortcuts, sound feedback.
 */
export default function SettingsModal({ settings, onChange, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const set = (patch) => onChange({ ...settings, ...patch });

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Settings"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="panel-head">
          <h2>Settings</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close settings">
            <IconClose />
          </button>
        </div>

        <div className="setting-row" style={{ borderTop: "none" }}>
          <div className="setting-info">
            <strong>Precision</strong>
            <span>Centiseconds or full milliseconds on the readout.</span>
          </div>
          <div className="segmented">
            <button
              type="button"
              className={settings.precision === 2 ? "active" : ""}
              onClick={() => set({ precision: 2 })}
            >
              &frac12;100
            </button>
            <button
              type="button"
              className={settings.precision === 3 ? "active" : ""}
              onClick={() => set({ precision: 3 })}
            >
              &frac12;1000
            </button>
          </div>
        </div>

        <div className="setting-row">
          <div className="setting-info">
            <strong>Keyboard shortcuts</strong>
            <span>Space = start/stop · L = lap · R = reset.</span>
          </div>
          <Switch
            checked={settings.shortcuts}
            onChange={(v) => set({ shortcuts: v })}
            label="Keyboard shortcuts"
          />
        </div>

        <div className="setting-row">
          <div className="setting-info">
            <strong>Sound feedback</strong>
            <span>Subtle beeps on start, lap and reset.</span>
          </div>
          <Switch
            checked={settings.sound}
            onChange={(v) => set({ sound: v })}
            label="Sound feedback"
          />
        </div>

        <div className="setting-row">
          <div className="setting-info">
            <strong>Session saving</strong>
            <span>Store a session in history whenever you reset.</span>
          </div>
          <Switch
            checked={settings.saveSessions}
            onChange={(v) => set({ saveSessions: v })}
            label="Session saving"
          />
        </div>
      </div>
    </div>
  );
}
