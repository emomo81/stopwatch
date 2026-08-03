<!-- # Project 4 — Stopwatch ⏱️

A beautiful, glassy dark-theme stopwatch app built with **React + Vite** — millisecond-accurate timing, lap history with fastest/slowest highlighting, a live lap "pace" waveform, session history saved to local storage, keyboard shortcuts, and subtle sound feedback.

## ✨ Features

- **Precision engine** — `performance.now()` + `requestAnimationFrame` for drift-free, frame-smooth timing (centisecond or full millisecond display).
- **Big glowing display** — minutes : seconds : milliseconds, with a pulsing colon while running.
- **Lap history** — scrollable mono-font table with **fastest** 🟢 / **slowest** 🔴 lap badges, collapsible panel.
- **Pace waveform** — an animated SVG bar chart drawn from your real lap durations.
- **Session history** — every reset saves a session (total time, lap count, best lap) to `localStorage`, viewable in the side drawer.
- **Settings** — millisecond precision, keyboard shortcuts, and sound feedback toggles (persisted).
- **Keyboard shortcuts** — `Space` start/stop · `L` lap · `R` reset.
- **Polish** — glassmorphism card, ambient orbs, noise texture, live document title, focus states, reduced-motion support.

## 🚀 Getting started

```bash
cd project-4-stopwatch
npm install
npm run dev      # opens http://localhost:5173
```

Build for production:

```bash
npm run build
npm run preview
```

## 🗂 Project structure

```
project-4-stopwatch/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                  # React entry
    ├── App.jsx                   # layout + state wiring
    ├── index.css                 # all styles (design tokens at the top)
    ├── hooks/
    │   └── useStopwatch.js       # precision timing engine + laps
    ├── utils/
    │   ├── time.js               # ms → MM:SS.xx formatting
    │   ├── storage.js            # safe localStorage helpers
    │   └── sound.js              # tiny WebAudio beeps
    └── components/
        ├── Icons.jsx             # inline SVG icon set
        ├── TimeDisplay.jsx       # big glowing digits
        ├── Controls.jsx          # Start/Stop · Lap · Reset buttons
        ├── Waveform.jsx          # animated lap-pace bars
        ├── LapHistory.jsx        # collapsible lap table
        ├── SettingsModal.jsx     # precision / shortcuts / sound
        └── SessionDrawer.jsx     # saved sessions panel
```

## 🎨 Customizing the look

All colors, radii and glows live as CSS custom properties at the top of `src/index.css` (`--accent`, `--bg`, `--card-border`, …). Change one token and the whole app follows.

---

⌨️ **Tip:** press `Space` to start, `L` for a lap, `R` to reset — watch the waveform draw itself. -->
