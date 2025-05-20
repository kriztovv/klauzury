// CONFIGURATION

// Sensitivity scaling (if you want extra damping)
// e.g. 1 = full travel, <1 slows movement, >1 exaggerates it
const sensitivity = 2;

const irisConfigs = [
  {
    selector: "#irisleft",
    baseXPct: 0.6,
    baseYPct: 0.02,
    maxMoveXPct: 0.3,
    maxMoveYPct: 0.25,
  },
  {
    selector: "#irisright",
    baseXPct: 0.4,
    baseYPct: 0.02,
    maxMoveXPct: 0.25,
    maxMoveYPct: 0.25,
  },
];

// INITIALIZATION

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
    el.style.transform = `translate(${tx}px, ${ty + (1 / 100) * vh * -1}px)`;
  });
});
