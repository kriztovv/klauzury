// iris-follow.js
// This script makes two “iris” elements follow the cursor in a normalized, responsive way.

// ————————————————
// CONFIGURATION
// ————————————————

// Sensitivity scaling (if you want extra damping)
// e.g. 1 = full travel, <1 slows movement, >1 exaggerates it
const sensitivity = 1;

// Define each iris’s “rest” position and max travel as fractions of its own size.
const irisConfigs = [
  {
    selector: "#irisleft",
    baseXPct: 0.6, // 60% from left when cursor is centered
    baseYPct: 0.2, // 20% from top  when cursor is centered
    maxMoveXPct: 0.3, // ±30% of iris width
    maxMoveYPct: 0.25, // ±25% of iris height
  },
  {
    selector: "#irisright",
    baseXPct: 0.4,
    baseYPct: 0.2,
    maxMoveXPct: 0.25,
    maxMoveYPct: 0.25,
  },
];

// ————————————————
// INITIALIZATION
// ————————————————

// Cache DOM elements
const irises = irisConfigs.map((cfg) => ({
  ...cfg,
  el: document.querySelector(cfg.selector),
}));

// Track viewport dimensions & center
let vw = window.innerWidth;
let vh = window.innerHeight;
let cx = vw / 2;
let cy = vh / 2;

// Update viewport vars on resize
window.addEventListener("resize", () => {
  vw = window.innerWidth;
  vh = window.innerHeight;
  cx = vw / 2;
  cy = vh / 2;
});

// MOUSEMOVE HANDLER
document.addEventListener("mousemove", (e) => {
  // Normalize cursor into [-1, +1] range
  const nx = (e.clientX - cx) / cx;
  const ny = (e.clientY - cy) / cy;

  irises.forEach(({ el, baseXPct, baseYPct, maxMoveXPct, maxMoveYPct }) => {
    const rect = el.getBoundingClientRect();
    const w = rect.width,
      h = rect.height;

    // Compute pixel-based “rest” point and max travel
    const baseX = w * baseXPct;
    const baseY = h * baseYPct;
    const maxX = w * maxMoveXPct;
    const maxY = h * maxMoveYPct;

    // Calculate final translation
    const tx = baseX + nx * maxX * sensitivity;
    const ty = baseY + ny * maxY * sensitivity;

    // Apply
    el.style.transform = `translate(${tx}px, ${ty}px)`;
  });
});
