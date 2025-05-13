const left = document.getElementById("irisleft");
const right = document.getElementById("irisright");

const sensitivity = 0.08;

// per-element offsets in px
const offsets = [
  { el: left, x: 60, y: 20 },
  { el: right, x: 40, y: 20 },
];

document.addEventListener("mousemove", (e) => {
  offsets.forEach(({ el, x, y }) => {
    const rect = el.getBoundingClientRect();
    // distance from element center
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    // scale by sensitivity, then add your custom offset
    const tx = dx * sensitivity + x;
    const ty = dy * sensitivity + y;

    el.style.transform = `translate(${tx}px, ${ty}px)`;
  });
});
