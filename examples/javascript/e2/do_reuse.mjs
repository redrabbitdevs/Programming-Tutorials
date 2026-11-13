import { getHeapStatistics } from "node:v8";

// Megabytes allocated by one run of `work`, after three warm-up runs.
function allocatedMB(work) {
  for (let i = 0; i < 3; i++) work();
  const before = getHeapStatistics().total_allocated_bytes;
  work();
  return (getHeapStatistics().total_allocated_bytes - before) / 2 ** 20;
}

const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });

function addInto(out, a, b) {
  out.x = a.x + b.x;
  out.y = a.y + b.y;
  return out;
}

const step = { x: 1, y: 2 };
let fresh, reused;

const freshMB = allocatedMB(() => {
  fresh = { x: 0, y: 0 };
  for (let i = 0; i < 1_000_000; i++) fresh = add(fresh, step);
});
const reusedMB = allocatedMB(() => {
  reused = { x: 0, y: 0 };
  for (let i = 0; i < 1_000_000; i++) addInto(reused, reused, step);
});

console.log("same result:", fresh.x === reused.x && fresh.y === reused.y);
console.log("new objects, over 10 MB:", freshMB > 10);
console.log("reused object, under 1 MB:", reusedMB < 1);
