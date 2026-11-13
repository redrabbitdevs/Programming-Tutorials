import { getHeapStatistics } from "node:v8";

const N = 1_000_000;
const heapUsed = () => getHeapStatistics().used_heap_size;
const external = () => getHeapStatistics().external_memory;

let before = heapUsed();
const points = Array.from({ length: N }, (_, i) => ({ x: i / 2, y: i / 4 }));
const objectBytes = heapUsed() - before;

before = external();
const xs = new Float64Array(N);
const ys = new Float64Array(N);
for (let i = 0; i < N; i++) {
  xs[i] = i / 2;
  ys[i] = i / 4;
}
const typedBytes = external() - before;

console.log("same last point:", points[N - 1].y === ys[N - 1]);
console.log("typed arrays:", (typedBytes / 2 ** 20).toFixed(2), "MB");
console.log("objects over twice as large:", objectBytes > 2 * typedBytes);
