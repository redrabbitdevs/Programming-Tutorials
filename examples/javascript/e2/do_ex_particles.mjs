import { getHeapStatistics } from "node:v8";

const N = 10_000;
const STEPS = 100;
const allocated = () => getHeapStatistics().total_allocated_bytes;

// Version 1: an array of particle objects, replaced on every step.
function simulateObjects() {
  let particles = Array.from({ length: N }, (_, i) =>
    ({ x: i, y: 0, vx: (i % 7) - 3, vy: (i % 5) - 2 }));
  for (let s = 0; s < STEPS; s++) {
    particles = particles.map((p) => {
      const vy = p.vy - 0.1;
      return { x: p.x + p.vx, y: Math.max(0, p.y + vy), vx: p.vx, vy };
    });
  }
  return particles.reduce((sum, p) => sum + p.x + p.y, 0);
}

// Version 2: one typed array per field, updated in place.
function simulateTyped() {
  const x = new Float64Array(N), y = new Float64Array(N);
  const vx = new Float64Array(N), vy = new Float64Array(N);
  for (let i = 0; i < N; i++) {
    x[i] = i;
    vx[i] = (i % 7) - 3;
    vy[i] = (i % 5) - 2;
  }
  for (let s = 0; s < STEPS; s++) {
    for (let i = 0; i < N; i++) {
      vy[i] -= 0.1;
      x[i] += vx[i];
      y[i] = Math.max(0, y[i] + vy[i]);
    }
  }
  let sum = 0;
  for (let i = 0; i < N; i++) sum += x[i] + y[i];
  return sum;
}

function measure(simulate) {
  simulate();
  const before = allocated();
  const checksum = simulate();
  return { checksum, mb: (allocated() - before) / 2 ** 20 };
}

const objects = measure(simulateObjects);
const typed = measure(simulateTyped);
console.log("same checksum:", objects.checksum === typed.checksum);
console.log("objects allocate over 20 MB:", objects.mb > 20);
console.log("typed arrays allocate under 1 MB:", typed.mb < 1);
