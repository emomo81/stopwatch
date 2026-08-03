/** Inline SVG icon set — stroke-based, inherits currentColor. */

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export const IconPlay = (props) => (
  <svg {...base} {...props}>
    <path d="M7 4.8v14.4c0 .9 1 1.5 1.8 1L20 12.9a1.2 1.2 0 0 0 0-2L8.8 3.8c-.8-.4-1.8.1-1.8 1z" fill="currentColor" stroke="none" />
  </svg>
);

export const IconStop = (props) => (
  <svg {...base} {...props}>
    <rect x="6" y="6" width="12" height="12" rx="2.5" fill="currentColor" stroke="none" />
  </svg>
);

export const IconFlag = (props) => (
  <svg {...base} {...props}>
    <path d="M5 21V4" />
    <path d="M5 4h12.2a.5.5 0 0 1 .4.8L14.5 9l3.1 4.2a.5.5 0 0 1-.4.8H5" />
  </svg>
);

export const IconRestart = (props) => (
  <svg {...base} {...props}>
    <path d="M4 5v5h5" />
    <path d="M4.3 10a8 8 0 1 1-1 5.4" />
  </svg>
);

export const IconGear = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="3.1" />
    <path d="M19 12a7 7 0 0 0-.14-1.4l2.02-1.57-2-3.46-2.38.96a7 7 0 0 0-2.42-1.4L13.7 2.6h-3.4L9.92 5.13a7 7 0 0 0-2.42 1.4l-2.38-.96-2 3.46 2.02 1.57A7 7 0 0 0 5 12c0 .48.05.95.14 1.4l-2.02 1.57 2 3.46 2.38-.96a7 7 0 0 0 2.42 1.4l.38 2.53h3.4l.38-2.53a7 7 0 0 0 2.42-1.4l2.38.96 2-3.46-2.02-1.57c.09-.45.14-.92.14-1.4z" />
  </svg>
);

export const IconHistory = (props) => (
  <svg {...base} {...props}>
    <path d="M3.5 12a8.5 8.5 0 1 1 2.4 5.9" />
    <path d="M3.5 12H1.7M3.5 12l1.8-1.8" opacity="0" />
    <path d="M12 8v4.2l3 1.8" />
  </svg>
);

export const IconClose = (props) => (
  <svg {...base} {...props}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const IconChevron = (props) => (
  <svg {...base} {...props}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const IconTrash = (props) => (
  <svg {...base} {...props}>
    <path d="M4 7h16M9.5 7V4.8c0-.4.36-.8.8-.8h3.4c.44 0 .8.36.8.8V7M6.5 7l1 12.2c.05.7.65 1.3 1.35 1.3h6.3c.7 0 1.3-.6 1.35-1.3l1-12.2" />
  </svg>
);

export const IconClock = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="13" r="7.5" />
    <path d="M12 9.5V13l2.6 1.6" />
    <path d="M9.5 3h5" />
  </svg>
);
